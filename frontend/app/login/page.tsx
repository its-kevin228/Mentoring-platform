"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, ArrowRight, Loader2, Mail, Lock } from 'lucide-react';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await apiRequest<{ user: any; token: string; refreshToken: string }>('/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData),
            });

            login(result.user, result.token, result.refreshToken);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Link href="/">
                        <img src="/logo/unimentor.png" alt="UniMentor Logo" className="h-32 w-auto object-contain" />
                    </Link>
                </div>
                <h2 className="mt-2 text-center text-3xl font-black text-neutral tracking-tight">
                    Heureux de vous revoir !
                </h2>
                <p className="mt-2 text-center text-sm text-base-content/60 font-medium">
                    Pas encore de compte ?{' '}
                    <Link href="/signup" className="font-bold text-primary hover:underline">
                        Inscrivez-vous gratuitement
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-base-100 py-8 px-4 shadow-xl shadow-base-300/50 rounded-[2rem] border border-base-200 sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="alert alert-error text-sm py-3 rounded-xl border-none font-medium text-white shadow-lg shadow-error/20">
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-bold text-xs uppercase tracking-wider opacity-60">Adresse Email</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                                <input
                                    type="email"
                                    required
                                    className="input input-bordered w-full pl-11 bg-base-50/50 border-base-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-medium"
                                    placeholder="nom@exemple.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <div className="flex justify-between items-center px-1">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-xs uppercase tracking-wider opacity-60">Mot de passe</span>
                                </label>
                                <Link href="/forgot-password" title="Réinitialiser mon mot de passe" className="text-[10px] font-black uppercase text-primary/60 hover:text-primary transition-colors cursor-pointer">
                                    Oublié ?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                                <input
                                    type="password"
                                    required
                                    className="input input-bordered w-full pl-11 bg-base-50/50 border-base-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-medium"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="checkbox checkbox-primary checkbox-sm rounded-md"
                            />
                            <label htmlFor="remember-me" className="ml-3 block text-sm font-bold text-neutral/70">
                                Se souvenir de moi
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-primary w-full rounded-xl text-white font-bold text-lg h-14 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all border-none"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        Se connecter
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-base-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase font-black tracking-widest">
                                <span className="px-3 bg-base-100 text-base-content/30 italic">UniMentor Connect</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
