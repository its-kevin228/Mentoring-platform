"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User, LogOut, LayoutDashboard, MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/mentors') || pathname.startsWith('/profile');

    return (
        <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 border-b border-base-200">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-2xl w-52 border border-base-200">
                        {user ? (
                            <>
                                <li><Link href="/dashboard">Tableau de bord</Link></li>
                                {user.role === 'MENTORE' && <li><Link href="/mentors">Trouver un Mentor</Link></li>}
                                <li><Link href="/requests">{user.role === 'MENTOR' ? 'Mes Mentorés' : 'Mes Demandes'}</Link></li>
                                <li><Link href="/messages">Messages</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link href="/#problem">Pourquoi nous ?</Link></li>
                                <li><Link href="/#how-it-works">Comment ça marche</Link></li>
                                <li><Link href="/mentors">Nos Mentors</Link></li>
                                <li><Link href="/#faq">FAQ</Link></li>
                            </>
                        )}
                    </ul>
                </div>
                <Link href={user ? "/dashboard" : "/"} className="flex items-center">
                    <img src="/logo/unimentor.png" alt="UniMentor Logo" className="h-40 w-auto object-contain" />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-bold gap-2">
                    {user ? (
                        <>
                            <li>
                                <Link href="/dashboard" className={pathname === '/dashboard' ? 'text-primary' : ''}>
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </Link>
                            </li>
                            {user.role === 'MENTORE' && (
                                <li>
                                    <Link href="/mentors" className={pathname === '/mentors' ? 'text-primary' : ''}>
                                        <Users size={18} />
                                        Annuaire
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link href="/requests" className={pathname === '/requests' ? 'text-primary' : ''}>
                                    <Users size={18} />
                                    {user.role === 'MENTOR' ? 'Mes Mentorés' : 'Demandes'}
                                </Link>
                            </li>
                            <li>
                                <Link href="/messages" className={pathname === '/messages' ? 'text-primary' : ''}>
                                    <MessageSquare size={18} />
                                    Messages
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link href="/#problem">Pourquoi nous ?</Link></li>
                            <li><Link href="/#how-it-works">Comment ça marche</Link></li>
                            <li><Link href="/mentors">Nos Mentors</Link></li>
                            <li><Link href="/#faq">FAQ</Link></li>
                        </>
                    )}
                </ul>
            </div>

            <div className="navbar-end gap-2">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost gap-2 rounded-full border border-base-200 h-auto py-1 px-2">
                            <div className="hidden md:block text-right">
                                <p className="text-[10px] font-black uppercase opacity-60 tracking-tighter leading-none">{user.role}</p>
                                <p className="text-sm font-bold leading-tight">{user.firstName}</p>
                            </div>
                            <div className="avatar placeholder">
                                <div className="bg-primary text-primary-content rounded-full w-8">
                                    <span className="text-xs font-bold">{user.firstName[0]}{user.lastName[0]}</span>
                                </div>
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu dropdown-content z-[2] p-2 shadow-2xl bg-base-100 rounded-2xl w-60 mt-4 border border-base-200">
                            <div className="px-4 py-3 border-b border-base-100">
                                <p className="font-black text-neutral">{user.firstName} {user.lastName}</p>
                                <p className="text-xs text-base-content/50 truncate font-medium">{user.email}</p>
                            </div>
                            <li>
                                <Link href="/profile" className="flex items-center gap-2 py-3">
                                    <User size={18} />
                                    <span>Mon Profil Académique</span>
                                </Link>
                            </li>
                            <div className="divider my-0 opacity-50"></div>
                            <li>
                                <button onClick={logout} className="flex items-center gap-2 py-3 text-error">
                                    <LogOut size={18} />
                                    <span>Déconnexion</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link href="/login" className="btn btn-ghost btn-sm hidden md:flex font-bold">Connexion</Link>
                        <Link href="/signup" className="btn btn-primary btn-sm rounded-full px-6 text-white font-bold shadow-lg shadow-primary/20">S'inscrire</Link>
                    </>
                )}
            </div>
        </div>
    );
}
