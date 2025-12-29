import { useState, useCallback, useRef } from 'react';
import { CaseStudy, CaseSourceType } from '../../types';
import * as pdfjs from 'pdfjs-dist';

// Set up PDF.js worker using local copy
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

interface CaseUploadProps {
    onCaseAdded: (caseStudy: CaseStudy) => void;
}

type UploadTab = 'file' | 'url' | 'text';

function CaseUpload({ onCaseAdded }: CaseUploadProps) {
    const [activeTab, setActiveTab] = useState<UploadTab>('file');
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragOver, setDragOver] = useState(false);

    // For file upload
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [filePreview, setFilePreview] = useState<{ name: string; type: CaseSourceType; content: string } | null>(null);

    // For URL
    const [url, setUrl] = useState('');

    // For text
    const [textContent, setTextContent] = useState('');

    const extractTextFromPDF = async (file: File): Promise<string> => {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((item: any) => item.str)
                .join(' ');
            fullText += pageText + '\n\n';
        }

        return fullText.trim();
    };

    const handleFileSelect = useCallback(async (file: File) => {
        setError(null);
        setIsLoading(true);

        try {
            const fileType = file.type;
            let sourceType: CaseSourceType;
            let content: string;

            if (fileType === 'application/pdf') {
                sourceType = 'pdf';
                content = await extractTextFromPDF(file);
            } else if (fileType.startsWith('image/')) {
                sourceType = 'image';
                // Convert image to base64
                content = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            } else {
                throw new Error('Unsupported file type. Please upload a PDF or image.');
            }

            setFilePreview({
                name: file.name,
                type: sourceType,
                content
            });

            if (!title) {
                setTitle(file.name.replace(/\.[^/.]+$/, '')); // Remove extension
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to process file');
        } finally {
            setIsLoading(false);
        }
    }, [title]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    }, [handleFileSelect]);

    const handleSubmit = useCallback(() => {
        if (!title.trim()) {
            setError('Please enter a title for the case');
            return;
        }

        let caseStudy: CaseStudy;

        switch (activeTab) {
            case 'file':
                if (!filePreview) {
                    setError('Please upload a file first');
                    return;
                }
                caseStudy = {
                    id: crypto.randomUUID(),
                    title: title.trim(),
                    sourceType: filePreview.type,
                    content: filePreview.type === 'pdf' ? filePreview.content : '',
                    fileData: filePreview.type === 'image' ? filePreview.content : undefined,
                    fileName: filePreview.name,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                break;

            case 'url':
                if (!url.trim()) {
                    setError('Please enter a URL');
                    return;
                }
                caseStudy = {
                    id: crypto.randomUUID(),
                    title: title.trim(),
                    sourceType: 'url',
                    content: '', // Would need server-side fetching for actual content
                    sourceUrl: url.trim(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                break;

            case 'text':
                if (!textContent.trim()) {
                    setError('Please enter the case content');
                    return;
                }
                caseStudy = {
                    id: crypto.randomUUID(),
                    title: title.trim(),
                    sourceType: 'text',
                    content: textContent.trim(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                break;
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        onCaseAdded(caseStudy!);

        // Reset form
        setTitle('');
        setFilePreview(null);
        setUrl('');
        setTextContent('');
    }, [activeTab, title, filePreview, url, textContent, onCaseAdded]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Title Input */}
            <div style={{ marginBottom: 'var(--space-xl)' }}>
                <label style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    marginBottom: 'var(--space-sm)'
                }}>
                    Case Title
                </label>
                <input
                    type="text"
                    className="input"
                    placeholder="Enter a descriptive title for this case..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ fontSize: 'var(--text-base)' }}
                />
            </div>

            {/* Tabs */}
            <div className="tabs" style={{ marginBottom: 'var(--space-lg)' }}>
                <button
                    className={`tab ${activeTab === 'file' ? 'active' : ''}`}
                    onClick={() => setActiveTab('file')}
                >
                    📄 File Upload
                </button>
                <button
                    className={`tab ${activeTab === 'url' ? 'active' : ''}`}
                    onClick={() => setActiveTab('url')}
                >
                    URL Link
                </button>
                <button
                    className={`tab ${activeTab === 'text' ? 'active' : ''}`}
                    onClick={() => setActiveTab('text')}
                >
                    Paste Text
                </button>
            </div>

            {/* Tab Content */}
            <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-xl)'
            }}>
                {activeTab === 'file' && (
                    <div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                        />

                        <div
                            className={`dropzone ${dragOver ? 'dragover' : ''}`}
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                        >
                            {isLoading ? (
                                <div>
                                    <div style={{ fontSize: '32px', marginBottom: 'var(--space-md)' }}>⏳</div>
                                    <p>Processing file...</p>
                                </div>
                            ) : filePreview ? (
                                <div>
                                    <div style={{ fontSize: '32px', marginBottom: 'var(--space-md)' }}>
                                        {filePreview.type === 'pdf' ? '📄' : '🖼️'}
                                    </div>
                                    <p style={{ fontWeight: 500 }}>{filePreview.name}</p>
                                    <p style={{ color: 'var(--color-text-tertiary)', marginTop: 'var(--space-xs)' }}>
                                        {filePreview.type.toUpperCase()} • Click to replace
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ fontSize: '48px', marginBottom: 'var(--space-md)', opacity: 0.5 }}>📤</div>
                                    <p style={{ fontWeight: 500, marginBottom: 'var(--space-sm)' }}>
                                        Drop your file here or click to browse
                                    </p>
                                    <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
                                        Supports PDF and Image files
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* PDF Preview */}
                        {filePreview?.type === 'pdf' && (
                            <div style={{
                                marginTop: 'var(--space-lg)',
                                padding: 'var(--space-md)',
                                background: 'var(--color-bg-tertiary)',
                                borderRadius: 'var(--radius-md)',
                                maxHeight: '200px',
                                overflow: 'auto'
                            }}>
                                <div style={{
                                    fontSize: 'var(--text-xs)',
                                    color: 'var(--color-text-tertiary)',
                                    marginBottom: 'var(--space-sm)'
                                }}>
                                    EXTRACTED TEXT PREVIEW
                                </div>
                                <p style={{
                                    fontSize: 'var(--text-sm)',
                                    whiteSpace: 'pre-wrap',
                                    color: 'var(--color-text-secondary)'
                                }}>
                                    {filePreview.content.slice(0, 500)}
                                    {filePreview.content.length > 500 && '...'}
                                </p>
                            </div>
                        )}

                        {/* Image Preview */}
                        {filePreview?.type === 'image' && (
                            <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
                                <img
                                    src={filePreview.content}
                                    alt="Preview"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '300px',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)'
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'url' && (
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-text-tertiary)',
                            marginBottom: 'var(--space-sm)'
                        }}>
                            Enter the URL of the case study
                        </label>
                        <input
                            type="url"
                            className="input"
                            placeholder="https://example.com/case-study"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <p style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-text-tertiary)',
                            marginTop: 'var(--space-md)'
                        }}>
                            💡 The URL will be saved for reference. You can copy-paste the content in the analysis view.
                        </p>
                    </div>
                )}

                {activeTab === 'text' && (
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-text-tertiary)',
                            marginBottom: 'var(--space-sm)'
                        }}>
                            Paste or type the case study content
                        </label>
                        <textarea
                            className="input"
                            placeholder="Paste your case study content here..."
                            rows={12}
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            style={{ resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6 }}
                        />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-text-tertiary)',
                            marginTop: 'var(--space-sm)'
                        }}>
                            <span>{textContent.length} characters</span>
                            <span>~{Math.ceil(textContent.split(/\s+/).filter(Boolean).length / 200)} min read</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div style={{
                    marginTop: 'var(--space-md)',
                    padding: 'var(--space-md)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    color: '#ef4444',
                    fontSize: 'var(--text-sm)'
                }}>
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <div style={{ marginTop: 'var(--space-xl)', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>
                    Start Analysis →
                </button>
            </div>
        </div>
    );
}

export default CaseUpload;
