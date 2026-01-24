"use client";

import React, { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { Search, Filter, BookOpen, GraduationCap, MapPin, MessageCircle, BadgeCheck, Loader2, Send, X } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface Mentor {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    profile: {
        institution: string;
        fieldOfStudy: string;
        studyLevel: string;
        bio: string;
        skills: string[];
    };
}

export default function MentorsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        fieldOfStudy: '',
        institution: '',
    });

    // Modal state
    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
    const [requestMessage, setRequestMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchMentors = async () => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams(filters).toString();
            const data = await apiRequest<Mentor[]>(`/users/mentors?${query}`);
            setMentors(data);
        } catch (error) {
            console.error('Erreur lors du chargement des mentors:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMentors();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchMentors();
    };

    const handleContactClick = (mentor: Mentor) => {
        if (!user) {
            router.push('/login');
            return;
        }
        setSelectedMentor(mentor);
    };

    const sendMentorshipRequest = async () => {
        if (!selectedMentor) return;
        setIsSending(true);
        try {
            await apiRequest('/mentorship/request', {
                method: 'POST',
                body: JSON.stringify({
                    mentorId: selectedMentor.id,
                    message: requestMessage,
                }),
            });
            setSuccessMessage(`Votre demande a été envoyée à ${selectedMentor.firstName} !`);
            setTimeout(() => {
                setSelectedMentor(null);
                setSuccessMessage('');
                setRequestMessage('');
            }, 3000);
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-base-100 italic">
            <Navbar />

            <main className="flex-grow">
                {/* Search Header */}
                <section className="bg-primary/5 py-12 border-b border-base-200">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <h1 className="text-4xl md:text-5xl font-black text-neutral uppercase">
                                Trouvez votre <span className="text-primary italic">Mentor Idéal</span>
                            </h1>
                            <p className="text-lg text-base-content/60 font-medium">
                                Explorez les profils d'étudiants expérimentés prêts à vous guider dans votre filière.
                            </p>

                            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 bg-white p-2 rounded-2xl shadow-xl shadow-primary/5 border border-base-200">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Filière (ex: Droit, Médecine...)"
                                        className="input w-full pl-12 border-none focus:ring-0 font-medium"
                                        value={filters.fieldOfStudy}
                                        onChange={(e) => setFilters({ ...filters, fieldOfStudy: e.target.value })}
                                    />
                                </div>
                                <div className="divider md:divider-horizontal hidden md:flex my-2"></div>
                                <div className="flex-1 relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Établissement"
                                        className="input w-full pl-12 border-none focus:ring-0 font-medium"
                                        value={filters.institution}
                                        onChange={(e) => setFilters({ ...filters, institution: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary rounded-xl px-8 text-white font-bold">
                                    Rechercher
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Mentors Grid */}
                <div className="container mx-auto px-4 md:px-8 py-16">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <h2 className="text-2xl font-black text-neutral flex items-center gap-2">
                            <Filter size={24} className="text-primary" />
                            {mentors.length} Mentor{mentors.length > 1 ? 's' : ''} trouvé{mentors.length > 1 ? 's' : ''}
                        </h2>
                        <div className="flex gap-2">
                            <select className="select select-bordered select-sm rounded-full font-bold">
                                <option disabled selected>Niveau d'étude</option>
                                <option>L3</option>
                                <option>Master</option>
                                <option>Doctorat</option>
                            </select>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-24 space-y-4">
                            <Loader2 className="w-12 h-12 text-primary animate-spin" />
                            <p className="font-bold text-base-content/40 uppercase tracking-widest">Chargement des mentors...</p>
                        </div>
                    ) : mentors.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {mentors.map((mentor) => (
                                <div key={mentor.id} className="card bg-base-100 border border-base-200 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col h-full rounded-[2rem] overflow-hidden">
                                    <div className="p-8 pb-0 flex items-start gap-4">
                                        <div className="avatar">
                                            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-2xl">
                                                {mentor.avatarUrl ? (
                                                    <img src={mentor.avatarUrl} alt={mentor.firstName} />
                                                ) : (
                                                    <span>{mentor.firstName[0]}{mentor.lastName[0]}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xl font-black text-neutral">{mentor.firstName} {mentor.lastName}</h3>
                                                <BadgeCheck size={18} className="text-primary fill-primary/10" />
                                            </div>
                                            <p className="text-sm font-bold text-primary uppercase tracking-tighter">{mentor.profile.fieldOfStudy}</p>
                                        </div>
                                    </div>

                                    <div className="p-8 py-6 flex-1 space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm font-medium text-base-content/60">
                                                <GraduationCap size={16} />
                                                {mentor.profile.studyLevel}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm font-medium text-base-content/60">
                                                <BookOpen size={16} />
                                                {mentor.profile.institution}
                                            </div>
                                        </div>

                                        <p className="text-base-content/70 line-clamp-3 text-sm leading-relaxed italic">
                                            "{mentor.profile.bio}"
                                        </p>

                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {mentor.profile.skills.map((skill, i) => (
                                                <span key={i} className="badge badge-ghost rounded-md text-[10px] font-black uppercase tracking-wider px-2 py-3 border-none bg-base-200/50">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-8 pt-0 mt-auto">
                                        <div className="divider opacity-5 my-0 mb-6"></div>
                                        <button
                                            onClick={() => handleContactClick(mentor)}
                                            className="btn btn-primary w-full rounded-2xl text-white font-bold group-hover:scale-[1.02] transition-transform"
                                        >
                                            Contacter ce Mentor
                                            <MessageCircle size={18} className="ml-2" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-base-200/30 rounded-[3rem] border border-dashed border-base-300">
                            <h3 className="text-xl font-bold text-neutral">Aucun mentor trouvé</h3>
                            <p className="text-base-content/50 mt-2">Essayez d'ajuster vos filtres de recherche.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal de Demande de Mentoring */}
            {selectedMentor && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-base-100 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-200 animate-in zoom-in-95 duration-300">
                        {successMessage ? (
                            <div className="p-12 text-center space-y-6">
                                <div className="w-20 h-20 bg-success/10 text-success mx-auto rounded-full flex items-center justify-center">
                                    <BadgeCheck size={40} />
                                </div>
                                <h3 className="text-2xl font-black text-neutral italic">C'est envoyé !</h3>
                                <p className="text-base-content/60 font-medium">{successMessage}</p>
                            </div>
                        ) : (
                            <>
                                <div className="bg-primary p-8 text-white relative">
                                    <button
                                        onClick={() => setSelectedMentor(null)}
                                        className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center font-black text-2xl">
                                            {selectedMentor.firstName[0]}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest opacity-70">Demande de mentoring à</p>
                                            <h3 className="text-2xl font-black italic">{selectedMentor.firstName} {selectedMentor.lastName}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-50">Expliquez votre besoin (Motivation, questions...)</span>
                                        </label>
                                        <textarea
                                            className="textarea textarea-bordered h-32 rounded-2xl bg-base-50/50 border-base-200 focus:border-primary transition-all font-medium text-sm leading-relaxed"
                                            placeholder="Bonjour, j'aimerais échanger avec vous car..."
                                            value={requestMessage}
                                            onChange={(e) => setRequestMessage(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <button
                                        onClick={sendMentorshipRequest}
                                        disabled={isSending || !requestMessage}
                                        className="btn btn-primary w-full rounded-2xl text-white font-bold h-14 shadow-lg shadow-primary/20"
                                    >
                                        {isSending ? <Loader2 className="animate-spin" /> : (
                                            <> Envoyer ma demande <Send size={18} className="ml-2" /> </>
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
