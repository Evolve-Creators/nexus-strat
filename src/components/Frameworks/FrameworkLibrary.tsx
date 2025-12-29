import { Framework } from '../../types';

interface FrameworkLibraryProps {
    frameworks: Framework[];
    onSelectFramework: (id: string) => void;
}

function FrameworkLibrary({ frameworks, onSelectFramework }: FrameworkLibraryProps) {
    const generalFrameworks = frameworks.filter(f => f.category === 'general');
    const caseSpecificFrameworks = frameworks.filter(f => f.category === 'case-specific');

    const FrameworkCard = ({ framework }: { framework: Framework }) => (
        <div
            onClick={() => onSelectFramework(framework.id)}
            className="group relative flex flex-col justify-between p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1"
            style={{
                background: 'rgba(24, 24, 27, 0.4)', // zinc-900 with opacity
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                height: '200px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.background = 'rgba(24, 24, 27, 0.6)';
                e.currentTarget.style.boxShadow = '0 20px 40px -5px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.background = 'rgba(24, 24, 27, 0.4)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }}
        >
            {/* Glossy highlight effect on top right */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 duration-500"></div>

            <div className="z-10 flex flex-col h-full justify-center">
                <h4 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-emerald-400 transition-colors">
                    {framework.name}
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                    {framework.description}
                </p>
            </div>

            <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                </svg>
            </div>
        </div>
    );

    return (
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 40px' }}>
            {/* Intro */}
            <div className="relative py-20 text-center border-b border-white/5 mb-16">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none opacity-50"></div>
                <h2 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 tracking-tight relative z-10">
                    Framework Gallery
                </h2>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto relative z-10 font-light">
                    Visual models to structure your strategic analysis
                </p>
            </div>

            {/* Case-Specific Section */}
            <section className="mb-20">
                <div className="flex items-center gap-6 mb-10">
                    <h3 className="text-3xl font-extrabold text-white tracking-tight">
                        Case-Specific Models
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-zinc-700 to-transparent"></div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '32px'
                }}>
                    {caseSpecificFrameworks.map(framework => (
                        <FrameworkCard key={framework.id} framework={framework} />
                    ))}
                </div>
            </section>

            {/* General Section */}
            <section className="pb-20">
                <div className="flex items-center gap-6 mb-10">
                    <h3 className="text-3xl font-extrabold text-white tracking-tight">
                        General Strategic Models
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-zinc-700 to-transparent"></div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '32px'
                }}>
                    {generalFrameworks.map(framework => (
                        <FrameworkCard key={framework.id} framework={framework} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default FrameworkLibrary;
