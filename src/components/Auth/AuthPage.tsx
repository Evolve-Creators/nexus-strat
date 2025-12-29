import { useState } from 'react';
import { account } from '../lib/appwrite';
import { ID } from 'appwrite';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AuthPage() {
    const { checkAuth } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isLogin) {
                await account.createEmailPasswordSession(email, password);
            } else {
                await account.create(ID.unique(), email, password, name);
                await account.createEmailPasswordSession(email, password);
            }
            await checkAuth(); // Refresh global auth state
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-canvas p-4 text-primary transition-colors duration-300">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-card p-10 shadow-xl border border-border">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-3xl shadow-lg shadow-emerald-500/20">
                        ⚡
                    </div>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight">
                        Nexus Strat
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                        {isLogin ? 'Sign in to access your projects' : 'Create an account to get started'}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-muted">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full rounded-lg border border-border bg-hover px-4 py-2 text-primary focus:border-emerald-500 focus:ring-emerald-500 outline-none transition-all placeholder:text-zinc-500"
                                    placeholder="John Doe"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-muted">Email address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-lg border border-border bg-hover px-4 py-2 text-primary focus:border-emerald-500 focus:ring-emerald-500 outline-none transition-all placeholder:text-zinc-500"
                                placeholder="you@domain.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-lg border border-border bg-hover px-4 py-2 text-primary focus:border-emerald-500 focus:ring-emerald-500 outline-none transition-all placeholder:text-zinc-500"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-sm font-medium text-red-500 text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20"
                        >
                            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                            {isLogin ? 'Sign in' : 'Create account'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm font-medium text-muted hover:text-emerald-500 transition-colors"
                        >
                            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
