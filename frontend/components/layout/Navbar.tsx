"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 border-b border-base-200">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href="#problem">Pourquoi nous ?</Link></li>
                        <li><Link href="#how-it-works">Comment ça marche</Link></li>
                        <li><Link href="#mentors">Nos Mentors</Link></li>
                        <li><Link href="#faq">FAQ</Link></li>
                    </ul>
                </div>
                <Link href="/" className="flex items-center">
                    <img src="/logo/unimentor.png" alt="UniMentor Logo" className="h-40 w-auto object-contain" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium gap-2">
                    <li><Link href="#problem">Pourquoi nous ?</Link></li>
                    <li><Link href="#how-it-works">Comment ça marche</Link></li>
                    <li><Link href="#mentors">Nos Mentors</Link></li>
                    <li><Link href="#faq">FAQ</Link></li>
                </ul>
            </div>
            <div className="navbar-end gap-2">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost gap-2 rounded-full border border-base-200">
                            <div className="hidden md:block text-right">
                                <p className="text-xs font-black uppercase opacity-60 tracking-tighter">{user.role}</p>
                                <p className="text-sm font-bold">{user.firstName}</p>
                            </div>
                            <div className="avatar placeholder">
                                <div className="bg-primary text-primary-content rounded-full w-8">
                                    <span className="text-xs font-bold">{user.firstName[0]}{user.lastName[0]}</span>
                                </div>
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow-xl bg-base-100 rounded-2xl w-52 mt-4 border border-base-200">
                            <li>
                                <Link href="/dashboard" className="flex items-center gap-2 py-3">
                                    <LayoutDashboard size={18} />
                                    <span>Tableau de bord</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="flex items-center gap-2 py-3">
                                    <User size={18} />
                                    <span>Mon Profil</span>
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
