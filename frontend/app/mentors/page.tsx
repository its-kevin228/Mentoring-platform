"use client";

import React, { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { Search, Filter, BookOpen, GraduationCap, MapPin, MessageCircle, BadgeCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        fieldOfStudy: '',
        institution: '',
    });

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
                                        <button className="btn btn-primary w-full rounded-2xl text-white font-bold group-hover:scale-[1.02] transition-transform">
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

            <Footer />
        </div>
    );
}
