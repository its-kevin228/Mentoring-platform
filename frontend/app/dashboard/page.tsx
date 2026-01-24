"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
    Users,
    MessageSquare,
    Calendar,
    BookOpen,
    TrendingUp,
    ArrowRight,
    Clock,
    CheckCircle2,
    AlertCircle,
    GraduationCap
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
                <div className="text-center space-y-4">
                    <AlertCircle size={48} className="mx-auto text-error opacity-50" />
                    <h1 className="text-2xl font-black">Accès restreint</h1>
                    <p className="text-base-content/60">Veuillez vous connecter pour accéder à votre tableau de bord.</p>
                    <Link href="/login" className="btn btn-primary rounded-xl px-8">Connexion</Link>
                </div>
            </div>
        );
    }

    const isMentor = user.role === 'MENTOR';

    return (
        <div className="flex flex-col min-h-screen bg-base-200">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 md:px-8 py-10">
                {/* Header de bienvenue */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-black text-neutral">
                        Ravi de vous revoir, <span className="text-primary italic">{user.firstName}</span> ! 👋
                    </h1>
                    <p className="text-base-content/60 mt-2 font-medium">
                        Voici ce qui se passe aujourd'hui sur votre plateforme de mentoring.
                    </p>
                </div>

                {/* Grille de statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        icon={<Users className="text-blue-500" />}
                        title={isMentor ? "Mes Mentorés" : "Mes Mentors"}
                        value="0"
                        trend="+0 cette semaine"
                    />
                    <StatCard
                        icon={<MessageSquare className="text-purple-500" />}
                        title="Messages"
                        value="0"
                        trend="Aucun nouveau"
                    />
                    <StatCard
                        icon={<Calendar className="text-pink-500" />}
                        title="Sessions"
                        value="0"
                        trend="À venir"
                    />
                    <StatCard
                        icon={<TrendingUp className="text-emerald-500" />}
                        title="Progression"
                        value="0%"
                        trend="Objectifs"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne principale : Activité */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl shadow-base-300/20 border border-base-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black text-neutral flex items-center gap-2">
                                    <Clock size={22} className="text-primary" />
                                    Demandes récentes
                                </h3>
                                <Link href="/requests" className="text-xs font-black uppercase text-primary hover:underline">Voir tout</Link>
                            </div>

                            <div className="text-center py-10 space-y-4 bg-base-50 rounded-3xl border border-dashed border-base-200">
                                <p className="text-base-content/40 font-medium">Vous n'avez aucune demande pour le moment.</p>
                                {!isMentor && (
                                    <Link href="/mentors" className="btn btn-primary btn-sm rounded-full px-6">Trouver un mentor</Link>
                                )}
                            </div>
                        </div>

                        <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl shadow-base-300/20 border border-base-200">
                            <h3 className="text-xl font-black text-neutral mb-6 flex items-center gap-2">
                                <BookOpen size={22} className="text-primary" />
                                Ressources suggérées
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ResourceSmallCard title="Méthodologie : La prise de notes en amphi" category="Orientation" />
                                <ResourceSmallCard title="Guide : Gérer son budget étudiant" category="Vie Étudiante" />
                            </div>
                        </div>
                    </div>

                    {/* Colonne latérale : Profil & Actions */}
                    <div className="space-y-8">
                        <div className="bg-primary text-white p-8 rounded-[2.5rem] shadow-2xl shadow-primary/20 relative overflow-hidden group">
                            <div className="relative z-10 space-y-4">
                                <h3 className="text-xl font-black italic">Votre Profil Académique</h3>
                                <p className="text-sm opacity-90 leading-relaxed font-medium">
                                    Complétez votre profil pour améliorer la qualité des recommandations.
                                </p>
                                <Link href="/profile" className="btn btn-secondary w-full rounded-2xl border-none shadow-lg">
                                    Modifier mon profil
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                                <GraduationCap size={120} />
                            </div>
                        </div>

                        <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl shadow-base-300/20 border border-base-200">
                            <h3 className="text-lg font-black text-neutral mb-4 flex items-center gap-2">
                                <CheckCircle2 size={20} className="text-success" />
                                Checklist
                            </h3>
                            <ul className="space-y-3">
                                <CheckItem text="Vérifier mon adresse email" done={user.isVerified} />
                                <CheckItem text="Ajouter une photo de profil" done={!!user.avatarUrl} />
                                <CheckItem text="Préciser ma filière" done={false} />
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function StatCard({ icon, title, value, trend }: { icon: React.ReactNode, title: string, value: string, trend: string }) {
    return (
        <div className="bg-base-100 p-6 rounded-[2rem] shadow-xl shadow-base-300/20 border border-base-200">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-base-50">
                    {icon}
                </div>
            </div>
            <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest">{title}</p>
            <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-black text-neutral">{value}</p>
                <span className="text-[10px] font-black text-success uppercase">{trend}</span>
            </div>
        </div>
    );
}

function ResourceSmallCard({ title, category }: { title: string, category: string }) {
    return (
        <div className="p-4 bg-base-50 rounded-2xl border border-base-200 hover:border-primary/30 transition-colors cursor-pointer group">
            <p className="text-[10px] font-black text-primary uppercase tracking-tighter mb-1">{category}</p>
            <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-neutral group-hover:text-primary transition-colors">{title}</p>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
        </div>
    );
}

function CheckItem({ text, done }: { text: string, done: boolean }) {
    return (
        <li className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${done ? 'bg-success border-success text-white' : 'border-base-300'}`}>
                {done && <CheckCircle2 size={12} />}
            </div>
            <span className={`text-sm font-medium ${done ? 'line-through opacity-40' : 'text-neutral/80'}`}>{text}</span>
        </li>
    );
}
