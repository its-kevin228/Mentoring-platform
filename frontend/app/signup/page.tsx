"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, UserCircle, ArrowRight, Loader2, Mail, Lock, User } from 'lucide-react';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'MENTORE' as 'MENTORE' | 'MENTOR',
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
            const result = await apiRequest<{ user: any; token: string }>('/auth/register', {
                method: 'POST',
                body: JSON.stringify(formData),
            });

            login(result.user, result.token);
            router.push('/'); // Rediriger vers l'accueil ou le tableau de bord
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
                    Rejoignez <span className="text-primary italic">UniMentor</span>
                </h2>
                <p className="mt-2 text-center text-sm text-base-content/60 font-medium">
                    Déjà un compte ?{' '}
                    <Link href="/login" className="font-bold text-primary hover:underline">
                        Connectez-vous ici
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-base-100 py-8 px-4 shadow-xl shadow-base-300/50 rounded-[2rem] border border-base-200 sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="alert alert-error text-sm py-3 rounded-xl border-none font-medium">
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-xs uppercase tracking-wider opacity-60">Prénom</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                                    <input
                                        type="text"
                                        required
                                        className="input input-bordered w-full pl-11 bg-base-50/50 border-base-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-bold text-xs uppercase tracking-wider opacity-60">Nom</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered w-full bg-base-50/50 border-base-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-medium"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-bold text-xs uppercase tracking-wider opacity-60">Adresse Email</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                                <input
                                    type="email"
                                    required
                                    className="input input-bordered w-full pl-11 bg-base-50/50 border-base-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-bold text-xs uppercase tracking-wider opacity-60">Mot de passe</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                                <input
                                    type="password"
                                    required
                                    className="input input-bordered w-full pl-11 bg-base-50/50 border-base-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-bold text-xs uppercase tracking-wider opacity-60">Vous êtes ?</span>
                            </label>
                            <div className="grid grid-cols-2 gap-4 mt-1">
                                <button
                                    type="button"
                                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all group ${formData.role === 'MENTORE'
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-base-200 hover:border-primary/30'
                                        }`}
                                    onClick={() => setFormData({ ...formData, role: 'MENTORE' })}
                                >
                                    <UserCircle className={`w-8 h-8 mb-2 ${formData.role === 'MENTORE' ? 'text-primary' : 'text-base-content/30 group-hover:text-primary/50'}`} />
                                    <span className="text-sm font-bold">Mentoré</span>
                                    <span className="text-[10px] opacity-60 uppercase font-black">Lycéen / L1-L2</span>
                                </button>
                                <button
                                    type="button"
                                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all group ${formData.role === 'MENTOR'
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-base-200 hover:border-primary/30'
                                        }`}
                                    onClick={() => setFormData({ ...formData, role: 'MENTOR' })}
                                >
                                    <GraduationCap className={`w-8 h-8 mb-2 ${formData.role === 'MENTOR' ? 'text-primary' : 'text-base-content/30 group-hover:text-primary/50'}`} />
                                    <span className="text-sm font-bold">Mentor</span>
                                    <span className="text-[10px] opacity-60 uppercase font-black">L3 / Master / Dr</span>
                                </button>
                            </div>
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
                                        S'inscrire
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
