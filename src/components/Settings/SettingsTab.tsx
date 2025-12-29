import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, LogOut, User, Shield } from 'lucide-react';

export default function SettingsTab() {
    const { user, isGuest, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = async () => {
        // Debugging for user
        if (isGuest) alert('Stopping Guest Session...');
        console.log('Logout clicked - forcing exit');
        await logout();
        localStorage.removeItem('nexus-strat-guest');
        window.location.reload();
    };

    return (
        <div className="p-8 h-full overflow-y-auto bg-canvas text-primary transition-colors duration-300">
            <div className="max-w-3xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">Settings</h1>
                    <p className="text-muted text-lg">Manage your preferences and account.</p>
                </header>

                <div className="space-y-8">
                    {/* Appearance Section */}
                    <section
                        className="bg-zinc-900/20 backdrop-blur-xl border border-zinc-800 rounded-[24px] p-6 shadow-sm"
                    >
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            Appearance
                        </h2>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-lg">Theme</h3>
                                <p className="text-sm text-muted">Toggle between light and dark mode.</p>
                            </div>

                            <button
                                onClick={toggleTheme}
                                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${theme === 'dark' ? 'bg-emerald-500' : 'bg-zinc-300'
                                    }`}
                            >
                                <span
                                    className={`${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                                        } inline-block h-6 w-6 transform rounded-full bg-white transition duration-300 flex items-center justify-center`}
                                >
                                    {theme === 'dark' ? (
                                        <Moon size={14} className="text-emerald-500" />
                                    ) : (
                                        <Sun size={14} className="text-yellow-500" />
                                    )}
                                </span>
                            </button>
                        </div>
                    </section>

                    {/* Account Section */}
                    <section
                        className="bg-zinc-900/20 backdrop-blur-xl border border-zinc-800 rounded-[24px] p-6 shadow-sm"
                    >
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            Account
                        </h2>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <User size={32} />
                            </div>
                            <div>
                                {user ? (
                                    <>
                                        <h3 className="font-bold text-lg">{user.name}</h3>
                                        <p className="text-muted">{user.email}</p>
                                    </>
                                ) : isGuest ? (
                                    <>
                                        <h3 className="font-bold text-lg">Guest User</h3>
                                        <p className="text-muted">Local Session</p>
                                    </>
                                ) : (
                                    <p className="text-muted">Not logged in</p>
                                )}
                                {/* This button was incomplete in the original snippet, assuming it's for logout */}
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
                                >
                                    <LogOut className="inline-block mr-2" size={18} />
                                    <span>{user ? 'Log Out' : 'Exit Guest Mode'}</span>
                                </button>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-zinc-800">
                        </div>
                    </section>

                    {/* Pro Badge (Visual Only for now) */}
                    {/* <section className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-500 rounded-lg text-white">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-indigo-400">Upgrade to Pro</h3>
                                <p className="text-muted text-sm max-w-md">Get access to unlimited AI generation, premium frameworks, and team collaboration.</p>
                            </div>
                            <button className="ml-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
                                Upgrade
                            </button>
                        </div>
                    </section> */}
                </div>
            </div >
        </div >
    );
}
