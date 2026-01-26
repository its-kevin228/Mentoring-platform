"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, Loader2, BadgeCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { apiRequest } from '@/lib/api';

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!token) {
            setError("Le lien de réinitialisation est invalide ou manquant.");
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError("Les mots de passe ne correspondent pas.");
        }

        if (password.length < 6) {
            return setError("Le mot de passe doit contenir au moins 6 caractères.");
        }

        setIsLoading(true);

        try {
            await apiRequest('/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify({ token, password }),
            });
            setIsSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 3000);
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
                        <img src="/logo/unimentor.png" alt="UniMentor Logo" className="h-24 w-auto object-contain" />
                    </Link>
                </div>

                <div className="mt-8 bg-base-100 py-10 px-4 shadow-2xl shadow-base-300/50 rounded-[3rem] border border-base-200 sm:px-10 relative overflow-hidden">

                    {!isSuccess ? (
                        <>
                            <div className="mb-8">
                                <h2 className="text-3xl font-black text-neutral italic text-center leading-tight">
                                    Nouveau <br /> <span className="text-primary">mot de passe</span>
                                </h2>
                                <p className="mt-4 text-center text-sm text-base-content/60 font-medium">
                                    Choisissez un mot de passe sécurisé pour retrouver l'accès à votre compte.
                                </p>
                            </div>

                            {error ? (
                                <div className="alert alert-error text-xs py-3 rounded-xl border-none font-bold text-white shadow-lg shadow-error/20 mb-6 flex items-start gap-2">
                                    <AlertCircle size={16} className="shrink-0" />
                                    <span>{error}</span>
                                </div>
                            ) : null}

                            {!token && !error ? (
                                <div className="text-center py-4 text-error font-bold">Lien de réinitialisation invalide.</div>
                            ) : (
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="form-control">
                                        <label className="label py-1">
                                            <span className="label-text font-black text-[10px] uppercase tracking-widest opacity-50">Nouveau Mot de passe</span>
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                className="input input-bordered w-full pl-11 pr-12 bg-base-50/30 border-base-200 rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all font-medium h-14"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label py-1">
                                            <span className="label-text font-black text-[10px] uppercase tracking-widest opacity-50">Confirmer le mot de passe</span>
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                className="input input-bordered w-full pl-11 bg-base-50/30 border-base-200 rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all font-medium h-14"
                                                placeholder="••••••••"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading || !token}
                                        className="btn btn-primary w-full rounded-2xl text-white font-black text-lg h-16 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all border-none group"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            <>
                                                Enregistrer le mot de passe
                                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-success/10 text-success mx-auto rounded-full flex items-center justify-center">
                                <BadgeCheck size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-neutral italic">Succès !</h3>
                                <p className="text-sm text-base-content/60 font-medium px-4">
                                    Votre mot de passe a été réinitialisé. Vous allez être redirigé vers la page de connexion...
                                </p>
                            </div>
                            <div className="pt-4">
                                <span className="loading loading-dots loading-md text-primary/30"></span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
