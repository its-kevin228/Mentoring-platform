"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
    User,
    GraduationCap,
    BookOpen,
    FileText,
    Tags,
    Save,
    Loader2,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

export default function ProfilePage() {
    const { user, isLoading: authLoading, updateUser } = useAuth();
    const [profile, setProfile] = useState({
        institution: '',
        fieldOfStudy: '',
        studyLevel: '',
        bio: '',
        skills: [] as string[],
        isAvailable: true,
        objectives: '',
        difficulties: '',
        academicPath: '',
        avatarUrl: '',
    });
    const [skillInput, setSkillInput] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const data = await apiRequest<any>(`/users/${user.id}`);
                    setProfile({
                        institution: data.profile?.institution || '',
                        fieldOfStudy: data.profile?.fieldOfStudy || '',
                        studyLevel: data.profile?.studyLevel || '',
                        bio: data.profile?.bio || '',
                        skills: data.profile?.skills || [],
                        isAvailable: data.profile?.isAvailable ?? true,
                        objectives: data.profile?.objectives || '',
                        difficulties: data.profile?.difficulties || '',
                        academicPath: data.profile?.academicPath || '',
                        avatarUrl: data.avatarUrl || '',
                    });
                } catch (error) {
                    console.error('Erreur lors du chargement du profil:', error);
                }
            }
        };
        fetchProfile();
    }, [user]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        setStatus(null);
        try {
            await apiRequest('/users/profile', {
                method: 'PATCH',
                body: JSON.stringify(profile),
            });

            // Mise à jour du state global pour que l'avatar change partout
            updateUser({ avatarUrl: profile.avatarUrl });

            setStatus({ type: 'success', message: 'Profil mis à jour avec succès !' });
            setTimeout(() => setStatus(null), 3000);
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message });
        } finally {
            setIsUpdating(false);
        }
    };

    const addSkill = () => {
        if (skillInput && !profile.skills.includes(skillInput)) {
            setProfile({ ...profile, skills: [...profile.skills, skillInput] });
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setProfile({ ...profile, skills: profile.skills.filter(s => s !== skillToRemove) });
    };

    if (authLoading) return null;
    if (!user) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-xl font-bold">Veuillez vous connecter.</p>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-base-200">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 md:px-8 py-12">
                <div className="max-w-4xl mx-auto">

                    <div className="bg-base-100 rounded-[3rem] shadow-2xl shadow-base-300/30 overflow-hidden border border-base-200">
                        {/* Header Profil - Motif bleu plus visible */}
                        <div className="relative p-12 border-b border-base-100 overflow-hidden bg-primary/[0.02]">
                            {/* Motif de fond décoratif (Points géométriques) */}
                            <div className="absolute inset-0 pointer-events-none">
                                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <pattern id="dotPattern" width="24" height="24" patternUnits="userSpaceOnUse">
                                            <circle cx="2" cy="2" r="1" fill="currentColor" className="text-primary/20" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#dotPattern)" />
                                </svg>
                                {/* Effet de dégradé pour adoucir le motif */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/60"></div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                                <div className="group relative">
                                    <div className="w-32 h-32 rounded-[2.5rem] bg-white border-2 border-primary/20 flex items-center justify-center font-black text-5xl shadow-xl overflow-hidden relative">
                                        {profile.avatarUrl ? (
                                            <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={64} className="text-primary/40" />
                                        )}

                                        <label className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white p-4">
                                            <Save size={20} className="mb-1" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-center">Changer la photo</span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setProfile({ ...profile, avatarUrl: reader.result as string });
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="text-center md:text-left space-y-3 flex-1">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-primary tracking-[0.2em]">Mon Compte</p>
                                        <h1 className="text-4xl font-black text-neutral italic">{user.firstName} {user.lastName}</h1>
                                    </div>

                                    <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center">
                                        <span className="badge badge-primary font-bold px-4 py-3 rounded-xl border-none text-white shadow-lg shadow-primary/20">{user.role}</span>
                                        <span className="text-sm font-medium text-base-content/50">{user.email}</span>

                                        {user.role === 'MENTOR' && (
                                            <div className="flex items-center gap-2 ml-4 bg-white/50 backdrop-blur-md px-4 py-2 rounded-2xl border border-primary/10 shadow-sm">
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-success toggle-sm"
                                                    checked={profile.isAvailable}
                                                    onChange={(e) => setProfile({ ...profile, isAvailable: e.target.checked })}
                                                />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                                                    {profile.isAvailable ? 'Disponible' : 'Occupé'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleUpdate} className="p-8 md:p-12 space-y-10">

                            {status && (
                                <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'} text-white font-bold rounded-2xl shadow-lg border-none animate-in fade-in slide-in-from-top-4 duration-300`}>
                                    {status.type === 'success' ? <CheckCircle2 /> : <AlertCircle />}
                                    <span>{status.message}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Infos Académiques */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-black text-neutral flex items-center gap-3">
                                        <GraduationCap className="text-primary" />
                                        Parcours académique
                                    </h3>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-50">Établissement / Université</span>
                                        </label>
                                        <div className="relative">
                                            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                                            <input
                                                type="text"
                                                className="input input-bordered w-full pl-11 rounded-2xl bg-base-50/50 border-base-200 focus:border-primary transition-all font-medium"
                                                placeholder="Ex: Sorbonne, HEC, etc."
                                                value={profile.institution}
                                                onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-50">Filière d'étude</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full rounded-2xl bg-base-50/50 border-base-200 focus:border-primary transition-all font-medium"
                                            placeholder="Ex: Droit, Informatique, Médecine..."
                                            value={profile.fieldOfStudy}
                                            onChange={(e) => setProfile({ ...profile, fieldOfStudy: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-50">Niveau actuel</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full rounded-2xl bg-base-50/50 border-base-200 focus:border-primary transition-all font-bold"
                                            value={profile.studyLevel}
                                            onChange={(e) => setProfile({ ...profile, studyLevel: e.target.value })}
                                        >
                                            <option value="">Sélectionner votre niveau</option>
                                            <option value="L1">Licence 1 (L1)</option>
                                            <option value="L2">Licence 2 (L2)</option>
                                            <option value="L3">Licence 3 (L3)</option>
                                            <option value="Master 1">Master 1 (M1)</option>
                                            <option value="Master 2">Master 2 (M2)</option>
                                            <option value="Doctorat">Doctorat</option>
                                        </select>
                                    </div>

                                    {user.role === 'MENTORE' ? (
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-50">Difficultés rencontrées</span>
                                            </label>
                                            <textarea
                                                className="textarea textarea-bordered h-32 rounded-2xl bg-base-50/50 border-base-200 focus:border-primary transition-all font-medium"
                                                placeholder="Quelles sont vos principales difficultés scolaires ?"
                                                value={profile.difficulties}
                                                onChange={(e) => setProfile({ ...profile, difficulties: e.target.value })}
                                            ></textarea>
                                        </div>
                                    ) : (
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-50">Expérience de Mentoring</span>
                                            </label>
                                            <textarea
                                                className="textarea textarea-bordered h-32 rounded-2xl bg-base-50/50 border-base-200 focus:border-primary transition-all font-medium"
                                                placeholder="Avez-vous déjà aidé d'autres étudiants ? Expliquez votre approche."
                                                value={profile.academicPath} // On recycle academicPath pour l'expérience
                                                onChange={(e) => setProfile({ ...profile, academicPath: e.target.value })}
                                            ></textarea>
                                        </div>
                                    )}
                                </div>

                                {/* Bio & Skills */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-black text-neutral flex items-center gap-3">
                                        <FileText className="text-primary" />
                                        Ma présentation
                                    </h3>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-50">Ma Bio</span>
                                        </label>
                                        <textarea
                                            className="textarea textarea-bordered h-40 rounded-2xl bg-base-50/50 border-base-200 focus:border-primary transition-all font-medium leading-relaxed"
                                            placeholder="Parlez-nous de vous, de vos passions et de ce que vous pouvez apporter en tant que mentor."
                                            value={profile.bio}
                                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-50">Mes Objectifs</span>
                                        </label>
                                        <textarea
                                            className="textarea textarea-bordered h-32 rounded-2xl bg-base-50/50 border-base-200 focus:border-primary transition-all font-medium leading-relaxed"
                                            placeholder={user.role === 'MENTORE' ? "Quels sont vos objectifs académiques ?" : "Quels objectifs voulez-vous fixer pour vos mentorés ?"}
                                            value={profile.objectives}
                                            onChange={(e) => setProfile({ ...profile, objectives: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-black uppercase text-[10px] tracking-widest opacity-50">Compétences / Tags</span>
                                        </label>
                                        <div className="flex gap-2 mb-4">
                                            <input
                                                type="text"
                                                className="input input-bordered flex-1 rounded-2xl bg-base-50/50 border-base-200 focus:border-primary font-medium"
                                                placeholder="Ex: Python, Public Speaking..."
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                            />
                                            <button type="button" onClick={addSkill} className="btn btn-primary rounded-xl px-4">Ajouter</button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {profile.skills.map((skill, index) => (
                                                <div key={index} className="badge badge-primary gap-2 p-4 font-bold rounded-xl border-none text-white">
                                                    {skill}
                                                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-error transition-colors">
                                                        <XCircle size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="divider opacity-50"></div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="btn btn-primary btn-lg rounded-2xl px-12 text-white font-black shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all border-none"
                                >
                                    {isUpdating ? <Loader2 className="animate-spin" /> : (
                                        <>
                                            Enregistrer les modifications
                                            <Save size={20} className="ml-3" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function XCircle({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
    );
}
