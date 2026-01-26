"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BadgeCheck, Loader2, XCircle, ChevronRight, Mail } from 'lucide-react';
import { apiRequest } from '@/lib/api';

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verify = async () => {
            if (!token) {
                setStatus('error');
                setMessage('Lien de vérification invalide ou manquant.');
                return;
            }

            try {
                await apiRequest(`/auth/verify-email?token=${token}`, { method: 'GET' });
                setStatus('success');
            } catch (err: any) {
                setStatus('error');
                setMessage(err.message || 'Une erreur est survenue lors de la vérification.');
            }
        };

        verify();
    }, [token]);

    return (
        <div className="min-h-screen bg-base-200 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <Link href="/">
                        <img src="/logo/unimentor.png" alt="UniMentor Logo" className="h-20 w-auto object-contain" />
                    </Link>
                </div>

                <div className="bg-base-100 py-12 px-6 shadow-2xl shadow-base-300/50 rounded-[3rem] border border-base-200 text-center relative overflow-hidden">

                    {/* Background decoration */}
                    <div className="absolute -bottom-10 -left-10 opacity-5 text-primary">
                        <BadgeCheck size={150} />
                    </div>

                    {status === 'loading' && (
                        <div className="space-y-6">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 animate-ping bg-primary/20 rounded-full scale-150"></div>
                                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center relative z-10">
                                    <Loader2 size={40} className="animate-spin" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-black text-neutral italic">Vérification en cours...</h2>
                                <p className="text-sm text-base-content/60 font-medium">Nous validons votre compte UniMentor.</p>
                            </div>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="space-y-8 animate-in zoom-in fade-in duration-500">
                            <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 mx-auto rounded-full flex items-center justify-center shadow-inner">
                                <BadgeCheck size={48} />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-3xl font-black text-neutral italic tracking-tight">Compte Actif !</h2>
                                <p className="text-base-content/60 font-medium px-4">
                                    Félicitations ! Votre adresse email a été vérifiée avec succès. Vous pouvez maintenant profiter pleinement de la plateforme.
                                </p>
                            </div>
                            <div className="pt-4 px-4">
                                <Link href="/login" className="btn btn-primary w-full rounded-2xl h-14 text-lg font-black italic shadow-xl shadow-primary/20 border-none group">
                                    Se connecter
                                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
                            <div className="w-24 h-24 bg-error/10 text-error mx-auto rounded-full flex items-center justify-center">
                                <XCircle size={48} />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-2xl font-black text-neutral italic tracking-tight underline decoration-error/30 decoration-4">Oups...</h2>
                                <p className="text-base-content/60 font-medium px-4">
                                    {message}
                                </p>
                            </div>
                            <div className="pt-4 px-4 space-y-4">
                                <Link href="/login" className="btn btn-ghost w-full rounded-2xl h-14 font-bold border-2 border-base-200">
                                    Retour à la connexion
                                </Link>
                                <p className="text-xs text-base-content/40 font-medium italic">
                                    Besoin d'aide ? <a href="mailto:support@unimentor.fr" className="link link-primary">Contactez le support</a>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
