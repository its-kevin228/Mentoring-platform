"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { apiRequest } from '@/lib/api';
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
    GraduationCap,
    ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const { user, isLoading: authLoading } = useAuth();
    const [requests, setRequests] = React.useState<any[]>([]);
    const [profile, setProfile] = React.useState<any>(null);
    const [isDataLoading, setIsDataLoading] = React.useState(true);

    const fetchData = async () => {
        setIsDataLoading(true);
        try {
            const [requestsData, userData] = await Promise.all([
                apiRequest<any[]>('/mentorship/my-requests'),
                apiRequest<any>(`/users/${user?.id}`)
            ]);
            setRequests(requestsData);
            setProfile(userData.profile);
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setIsDataLoading(false);
        }
    };

    React.useEffect(() => {
        if (!authLoading && user) {
            fetchData();
        }
    }, [user, authLoading]);

    if (authLoading) {
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
    const pendingRequests = requests.filter(r => r.status === 'PENDING').length;
    const acceptedRequests = requests.filter(r => r.status === 'ACCEPTED').length;

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
                        value={acceptedRequests.toString()}
                        trend={`+${acceptedRequests} au total`}
                    />
                    <StatCard
                        icon={<MessageSquare className="text-purple-500" />}
                        title="Demandes en attente"
                        value={pendingRequests.toString()}
                        trend={pendingRequests > 0 ? "Réponse requise" : "À jour"}
                    />
                    <StatCard
                        icon={<Calendar className="text-pink-500" />}
                        title="Sessions"
                        value="0"
                        trend="Prochainement"
                    />
                    <StatCard
                        icon={<TrendingUp className="text-emerald-500" />}
                        title="Progression"
                        value="10%"
                        trend="Profil"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne principale : Activité */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl shadow-base-300/20 border border-base-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black text-neutral flex items-center gap-2">
                                    <Clock size={22} className="text-primary" />
                                    {isMentor ? "Demandes reçues" : "Mes demandes envoyées"}
                                </h3>
                                <Link href="/requests" className="text-xs font-black uppercase text-primary hover:underline">Voir tout</Link>
                            </div>

                            {isDataLoading ? (
                                <div className="flex justify-center py-10">
                                    <span className="loading loading-dots loading-md text-primary/30"></span>
                                </div>
                            ) : requests.length > 0 ? (
                                <div className="space-y-4">
                                    {requests.slice(0, 3).map((req) => (
                                        <div key={req.id} className="flex items-center justify-between p-4 bg-base-50 rounded-2xl border border-base-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                                    {(isMentor ? req.mentore : req.mentor).firstName[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-neutral">{(isMentor ? req.mentore : req.mentor).firstName} {(isMentor ? req.mentore : req.mentor).lastName}</p>
                                                    <p className="text-[10px] uppercase font-black opacity-40 italic">{req.status}</p>
                                                </div>
                                            </div>
                                            <Link href="/requests" className="btn btn-ghost btn-sm btn-circle">
                                                <ChevronRight size={18} />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 space-y-4 bg-base-50 rounded-3xl border border-dashed border-base-200">
                                    <p className="text-base-content/40 font-medium">Vous n'avez aucune demande pour le moment.</p>
                                    {!isMentor && (
                                        <Link href="/mentors" className="btn btn-primary btn-sm rounded-full px-6">Trouver un mentor</Link>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl shadow-base-300/20 border border-base-200">
                            <h3 className="text-xl font-black text-neutral mb-6 flex items-center gap-2">
                                <BookOpen size={22} className="text-primary" />
                                {isMentor ? "Conseils de Coaching" : "Mes Objectifs & Difficultés"}
                            </h3>

                            {!isMentor ? (
                                <div className="space-y-4">
                                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                        <p className="text-[10px] font-black text-primary uppercase mb-1">Objectifs</p>
                                        <p className="text-sm font-medium text-neutral leading-relaxed">
                                            {profile?.objectives || "Aucun objectif défini. Modifiez votre profil pour en ajouter."}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-error/5 rounded-2xl border border-error/10">
                                        <p className="text-[10px] font-black text-error uppercase mb-1">Difficultés</p>
                                        <p className="text-sm font-medium text-neutral leading-relaxed">
                                            {profile?.difficulties || "Aucune difficulté listée. Modifiez votre profil pour préciser vos besoins."}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ResourceSmallCard title="Comment motiver un étudiant en difficulté" category="Pédagogie" />
                                    <ResourceSmallCard title="Structurer sa première séance de mentoring" category="Méthodologie" />
                                </div>
                            )}
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
                        {isMentor && (
                            <div className={`p-6 rounded-[2rem] border-2 transition-all ${profile?.isAvailable ? 'border-success bg-success/5' : 'border-base-200 bg-base-100'}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-black text-neutral italic">État de disponibilité</p>
                                    <div className={`w-3 h-3 rounded-full animate-pulse ${profile?.isAvailable ? 'bg-success' : 'bg-base-300'}`}></div>
                                </div>
                                <p className="text-xs font-medium text-base-content/60 mb-4">
                                    {profile?.isAvailable
                                        ? "Vous êtes actuellement visible dans l'annuaire."
                                        : "Votre profil est masqué pour les nouveaux mentorés."}
                                </p>
                                <Link href="/profile" className="btn btn-sm btn-ghost border-base-200 w-full rounded-xl">Changer l'état</Link>
                            </div>
                        )}
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
