import { useState, useRef, useEffect, useCallback } from 'react';
import * as pdfjs from 'pdfjs-dist';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

interface PDFViewerProps {
    file: File | null;
    onTextSelect?: (text: string, rect: DOMRect) => void;
}

// TextItem type for PDF.js
interface TextItem {
    str: string;
    transform: number[];
    width: number;
    height: number;
}

function PDFViewer({ file, onTextSelect }: PDFViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pdfDoc, setPdfDoc] = useState<pdfjs.PDFDocumentProxy | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [scale, setScale] = useState(1.0); // Start at 100%
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textLayerRef = useRef<HTMLDivElement>(null);
    const [toolbarVisible, setToolbarVisible] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let toolbarTimeout: any;

    // Load PDF document
    useEffect(() => {
        if (!file) return;

        const loadPDF = async () => {
            setLoading(true);
            setError(null);

            try {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
                setPdfDoc(pdf);
                setTotalPages(pdf.numPages);
                setCurrentPage(1);
            } catch (err) {
                setError('Failed to load PDF: ' + (err instanceof Error ? err.message : 'Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        loadPDF();
    }, [file]);

    // Render current page
    useEffect(() => {
        if (!pdfDoc || !canvasRef.current) return;

        const renderPage = async () => {
            try {
                const page = await pdfDoc.getPage(currentPage);
                const viewport = page.getViewport({ scale });

                const canvas = canvasRef.current!;
                const context = canvas.getContext('2d')!;

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({
                    canvasContext: context,
                    viewport: viewport,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any).promise;

                // Render text layer for selection
                if (textLayerRef.current) {
                    textLayerRef.current.innerHTML = '';
                    textLayerRef.current.style.width = `${viewport.width}px`;
                    textLayerRef.current.style.height = `${viewport.height}px`;

                    const textContent = await page.getTextContent();

                    textContent.items.forEach((item) => {
                        const textItem = item as TextItem;
                        if (!textItem.str) return;

                        const tx = pdfjs.Util.transform(
                            viewport.transform,
                            textItem.transform
                        );

                        const span = document.createElement('span');
                        span.textContent = textItem.str;
                        span.style.position = 'absolute';
                        span.style.left = `${tx[4]}px`;
                        span.style.top = `${viewport.height - tx[5] - textItem.height * scale}px`;
                        span.style.fontSize = `${textItem.height * scale}px`;
                        span.style.fontFamily = 'sans-serif';
                        span.style.color = 'transparent';
                        span.style.userSelect = 'text';
                        span.style.whiteSpace = 'pre';
                        span.style.transformOrigin = 'left bottom';

                        textLayerRef.current!.appendChild(span);
                    });
                }
            } catch (err) {
                console.error('Failed to render page:', err);
            }
        };

        renderPage();
    }, [pdfDoc, currentPage, scale]);

    // Handle text selection
    const handleMouseUp = useCallback(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || !selection.toString().trim()) {
            return;
        }

        const text = selection.toString().trim();
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        if (onTextSelect) {
            onTextSelect(text, rect);
        }
    }, [onTextSelect]);

    // Handle idle mouse to hide toolbar
    const handleMouseMove = () => {
        setToolbarVisible(true);
        clearTimeout(toolbarTimeout);
        toolbarTimeout = setTimeout(() => {
            setToolbarVisible(false);
        }, 3000);
    };

    // Navigation functions
    const goToPrevPage = () => setCurrentPage(p => Math.max(1, p - 1));
    const goToNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));
    const zoomIn = () => setScale(s => Math.min(3, s + 0.1));
    const zoomOut = () => setScale(s => Math.max(0.5, s - 0.1));

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                goToPrevPage();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                goToNextPage();
            } else if (e.key === '+' || e.key === '=') {
                zoomIn();
            } else if (e.key === '-') {
                zoomOut();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [totalPages]);

    if (!file) {
        return (
            <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-bg-primary)',
            }}>
                <div style={{ textAlign: 'center', opacity: 0.5 }}>
                    <div style={{ fontSize: '64px', marginBottom: 'var(--space-md)' }}>📄</div>
                    <p>Load a PDF to view</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                Error: {error}
            </div>
        );
    }

    if (loading) {
        return (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Loading...
            </div>
        );
    }

    return (
        <div
            style={{
                position: 'relative',
                height: '100%',
                background: '#0a0a0b', // Deep black background
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}
            onMouseMove={handleMouseMove}
        >
            {/* Ambient Background Glow - subtle color based on page */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%)',
                pointerEvents: 'none'
            }} />

            {/* Canvas Container */}
            <div
                ref={containerRef}
                style={{
                    flex: 1,
                    overflow: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '60px 20px 100px 20px', // Extra bottom padding for floating bar
                }}
                onMouseUp={handleMouseUp}
            >
                <div style={{
                    position: 'relative',
                    boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)',
                    borderRadius: '4px',
                    transition: 'transform 0.2s ease',
                }}>
                    <canvas
                        ref={canvasRef}
                        style={{ display: 'block', borderRadius: '2px' }}
                    />
                    <div
                        ref={textLayerRef}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                    />
                </div>
            </div>

            {/* Floating Dynamic Island Toolbar */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '50%',
                transform: `translateX(-50%) translateY(${toolbarVisible ? '0' : '100px'})`,
                background: 'rgba(20, 20, 22, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '9999px',
                padding: '8px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: 10
            }}>
                {/* Page Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={goToPrevPage} disabled={currentPage <= 1} className="btn-icon-glass">
                        ◀
                    </button>
                    <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 500, minWidth: '40px', textAlign: 'center' }}>
                        {currentPage} <span style={{ opacity: 0.4 }}>/</span> {totalPages}
                    </span>
                    <button onClick={goToNextPage} disabled={currentPage >= totalPages} className="btn-icon-glass">
                        ▶
                    </button>
                </div>

                <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />

                {/* Zoom */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={zoomOut} className="btn-icon-glass" disabled={scale <= 0.5}>−</button>
                    <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: '36px', textAlign: 'center', fontSize: '12px' }}>
                        {Math.round(scale * 100)}%
                    </span>
                    <button onClick={zoomIn} className="btn-icon-glass" disabled={scale >= 3}>+</button>
                </div>
            </div>

            <style>{`
                .btn-icon-glass {
                    background: transparent;
                    border: none;
                    color: white;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background 0.2s;
                    font-size: 14px;
                }
                .btn-icon-glass:hover:not(:disabled) {
                    background: rgba(255,255,255,0.1);
                }
                .btn-icon-glass:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
}

export default PDFViewer;
