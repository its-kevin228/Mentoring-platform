"use client";

import Link from 'next/link';
import { Mail, ArrowRight, Home } from 'lucide-react';

export default function CheckEmailPage() {
    return (
        <div className="min-h-screen bg-base-200 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <Link href="/">
                        <img src="/logo/unimentor.png" alt="UniMentor Logo" className="h-20 w-auto object-contain" />
                    </Link>
                </div>

                <div className="bg-base-100 py-12 px-6 shadow-2xl shadow-base-300/50 rounded-[3rem] border border-base-200 text-center relative overflow-hidden">

                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-5 text-primary rotate-12">
                        <Mail size={150} />
                    </div>

                    <div className="space-y-8 animate-in zoom-in fade-in duration-500">
                        <div className="relative inline-block">
                            <div className="absolute inset-0 animate-ping bg-primary/20 rounded-full scale-110"></div>
                            <div className="w-24 h-24 bg-primary/10 text-primary mx-auto rounded-full flex items-center justify-center relative z-10">
                                <Mail size={48} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-neutral italic tracking-tight">Vérifiez vos emails !</h2>
                            <p className="text-base-content/60 font-medium px-2 leading-relaxed">
                                Un lien de confirmation vient d'être envoyé à votre adresse. <br />
                                Cliquez dessus pour activer votre compte et commencer l'aventure.
                            </p>
                        </div>

                        <div className="pt-6 space-y-4">
                            <a href="mailto:" className="btn btn-primary w-full rounded-2xl h-14 text-lg font-black italic shadow-xl shadow-primary/20 border-none group">
                                Ouvrir ma boîte mail
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </a>

                            <Link href="/" className="btn btn-ghost w-full rounded-2xl font-bold text-base-content/50">
                                <Home size={18} className="mr-2" /> Retour à l'accueil
                            </Link>
                        </div>

                        <p className="text-xs text-base-content/30 font-medium italic pt-4">
                            Pensez à vérifier vos spams si vous ne voyez rien.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
