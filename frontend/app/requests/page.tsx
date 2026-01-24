"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
    Clock,
    CheckCircle2,
    XCircle,
    MessageSquare,
    User,
    Calendar,
    Loader2,
    ChevronRight,
    GraduationCap,
    MapPin,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface Request {
    id: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
    message: string | null;
    createdAt: string;
    mentor?: any;
    mentore?: any;
}

export default function RequestsPage() {
    const { user, isLoading: authLoading } = useAuth();
    const [requests, setRequests] = useState<Request[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'ACCEPTED'>('ALL');

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const data = await apiRequest<Request[]>('/mentorship/my-requests');
            setRequests(data);
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading && user) {
            fetchRequests();
        }
    }, [user, authLoading]);

    const handleUpdateStatus = async (requestId: string, newStatus: string) => {
        try {
            await apiRequest(`/mentorship/request/${requestId}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus }),
            });
            // Rafraîchir la liste
            fetchRequests();
        } catch (error: any) {
            alert(error.message);
        }
    };

    if (authLoading) return null;

    const filteredRequests = requests.filter(req => {
        if (filter === 'ALL') return true;
        return req.status === filter;
    });

    return (
        <div className="flex flex-col min-h-screen bg-base-200">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 md:px-8 py-12">
                <div className="max-w-5xl mx-auto space-y-10">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-black text-neutral italic">Mes <span className="text-primary">Demandes</span></h1>
                            <p className="text-base-content/60 font-medium">Gérez vos mises en relation et votre historique de mentoring.</p>
                        </div>
                        <div className="flex bg-base-100 p-1 rounded-2xl border border-base-200 shadow-sm">
                            <FilterButton active={filter === 'ALL'} label="Tout" onClick={() => setFilter('ALL')} />
                            <FilterButton active={filter === 'PENDING'} label="En attente" onClick={() => setFilter('PENDING')} />
                            <FilterButton active={filter === 'ACCEPTED'} label="Acceptées" onClick={() => setFilter('ACCEPTED')} />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-24 space-y-4">
                            <Loader2 className="w-12 h-12 text-primary animate-spin" />
                            <p className="font-bold text-base-content/40 uppercase tracking-widest">Récupération des demandes...</p>
                        </div>
                    ) : filteredRequests.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            {filteredRequests.map((req) => (
                                <RequestCard
                                    key={req.id}
                                    request={req}
                                    isMentor={user?.role === 'MENTOR'}
                                    onAction={handleUpdateStatus}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-base-100 rounded-[3rem] border border-dashed border-base-300 shadow-xl shadow-base-300/20">
                            <div className="w-20 h-20 bg-base-50 text-base-content/20 mx-auto rounded-full flex items-center justify-center mb-6">
                                <Clock size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-neutral">Aucune demande trouvée</h3>
                            <p className="text-base-content/50 mt-2 px-8">Vous n'avez pas encore de demandes correspondant à ce filtre.</p>
                            {user?.role === 'MENTORE' && (
                                <Link href="/mentors" className="btn btn-primary mt-8 rounded-2xl px-8 shadow-lg shadow-primary/20">Explorer les mentors</Link>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

function FilterButton({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-base-content/40 hover:text-base-content/70'
                }`}
        >
            {label}
        </button>
    );
}

function RequestCard({ request, isMentor, onAction }: { request: Request, isMentor: boolean, onAction: (id: string, s: string) => void }) {
    const otherUser = isMentor ? request.mentore : request.mentor;
    const statusColors = {
        PENDING: 'bg-warning/10 text-warning border-warning/20',
        ACCEPTED: 'bg-success/10 text-success border-success/20',
        REJECTED: 'bg-error/10 text-error border-error/20',
        CANCELLED: 'bg-base-200 text-base-content/40 border-base-300',
    };

    const statusLabels = {
        PENDING: 'En attente',
        ACCEPTED: 'Acceptée',
        REJECTED: 'Refusée',
        CANCELLED: 'Annulée',
    };

    return (
        <div className="bg-base-100 rounded-[2.5rem] p-8 shadow-xl shadow-base-300/20 border border-base-200 group hover:border-primary/30 transition-all">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Infos Utilisateur */}
                <div className="flex items-start gap-5 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-base-100 pb-6 lg:pb-0 lg:pr-8">
                    <div className="w-16 h-16 rounded-2xl bg-base-50 flex items-center justify-center font-black text-2xl text-primary border border-base-200">
                        {otherUser.firstName[0]}
                    </div>
                    <div className="space-y-2">
                        <div className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border w-fit ${statusColors[request.status]}`}>
                            {statusLabels[request.status]}
                        </div>
                        <h4 className="text-xl font-black text-neutral">{otherUser.firstName} {otherUser.lastName}</h4>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-base-content/50">
                                <GraduationCap size={14} className="text-primary" />
                                {otherUser.profile?.fieldOfStudy || 'Filière non précisée'}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-base-content/50">
                                <MapPin size={14} className="text-primary" />
                                {otherUser.profile?.institution || 'Établissement non précisé'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message & Détails */}
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-black uppercase text-base-content/30 tracking-widest">
                        <Calendar size={14} />
                        Envoyée le {new Date(request.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>

                    <div className="bg-base-50 p-6 rounded-3xl border border-base-100 relative">
                        <MessageSquare size={16} className="absolute -top-2 -left-2 text-primary opacity-20" />
                        <p className="text-sm font-medium leading-relaxed text-neutral/80 italic">
                            "{request.message || 'Aucun message accompagnant la demande.'}"
                        </p>
                    </div>

                    {/* Actions contextuelles */}
                    <div className="flex flex-wrap items-center justify-end gap-3 pt-4">
                        {isMentor && request.status === 'PENDING' ? (
                            <>
                                <button
                                    onClick={() => onAction(request.id, 'REJECTED')}
                                    className="btn btn-ghost btn-sm rounded-xl text-error font-bold flex gap-2"
                                >
                                    <XCircle size={18} /> Refuser
                                </button>
                                <button
                                    onClick={() => onAction(request.id, 'ACCEPTED')}
                                    className="btn btn-success btn-sm rounded-xl text-white font-bold flex gap-2 shadow-lg shadow-success/20 px-6"
                                >
                                    <CheckCircle2 size={18} /> Accepter la demande
                                </button>
                            </>
                        ) : request.status === 'ACCEPTED' ? (
                            <Link href="/messages" className="btn btn-primary rounded-xl font-bold flex gap-2 px-8 shadow-lg shadow-primary/20">
                                <MessageSquare size={18} /> Démarrer la discussion
                            </Link>
                        ) : (
                            <div className="text-xs font-bold text-base-content/30 italic">L'historique est conservé à titre informatif.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
