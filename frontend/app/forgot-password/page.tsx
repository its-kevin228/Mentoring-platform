"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Loader2, CheckCircle2, ChevronLeft } from 'lucide-react';
import { apiRequest } from '@/lib/api';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await apiRequest('/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email }),
            });
            setIsSent(true);
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
                    {/* Background Decorative Motif */}
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-5 text-primary rotate-12">
                        <Mail size={120} />
                    </div>

                    {!isSent ? (
                        <>
                            <div className="mb-8">
                                <h2 className="text-3xl font-black text-neutral italic text-center leading-tight">
                                    Mot de passe <br /> <span className="text-primary">oublié ?</span>
                                </h2>
                                <p className="mt-4 text-center text-sm text-base-content/60 font-medium">
                                    Pas de panique ! Entrez votre email et nous vous enverrons un lien de récupération.
                                </p>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="alert alert-error text-xs py-3 rounded-xl border-none font-bold text-white shadow-lg shadow-error/20">
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="form-control">
                                    <label className="label py-1">
                                        <span className="label-text font-black text-[10px] uppercase tracking-widest opacity-50">Adresse Email</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                                        <input
                                            type="email"
                                            required
                                            className="input input-bordered w-full pl-11 bg-base-50/30 border-base-200 rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all font-medium h-14"
                                            placeholder="john.doe@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || !email}
                                    className="btn btn-primary w-full rounded-2xl text-white font-black text-lg h-16 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all border-none group"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            Envoyer le lien
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-6 space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-600 mx-auto rounded-full flex items-center justify-center">
                                <CheckCircle2 size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-neutral italic">Email envoyé !</h3>
                                <p className="text-sm text-base-content/60 font-medium">
                                    Vérifiez votre boîte de réception (et vos spams) pour réinitialiser votre accès.
                                </p>
                            </div>
                            <div className="pt-4">
                                <Link href="/login" className="btn btn-ghost rounded-xl font-bold gap-2">
                                    <ChevronLeft size={18} /> Retour à la connexion
                                </Link>
                            </div>
                        </div>
                    )}

                    <div className="mt-10 pt-6 border-t border-base-100 flex justify-center">
                        <Link href="/login" className="text-xs font-black uppercase tracking-widest text-base-content/30 hover:text-primary transition-colors flex items-center gap-2">
                            <ChevronLeft size={14} /> Revenir à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
