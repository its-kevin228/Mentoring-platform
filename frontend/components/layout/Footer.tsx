import Link from "next/link";
import { Twitter, Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-base-100 pt-20 pb-10 border-t border-base-200">
            <div className="container mx-auto px-4 md:px-8">
                {/* Top Section: Brand & Large Links */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
                    <div className="space-y-6 max-w-sm">
                        <Link href="/" className="flex items-center gap-3">
                            <img src="/logo/unimentor.png" alt="UniMentor Logo" className="h-24 w-auto object-contain" />
                        </Link>
                        <p className="text-lg text-base-content/60 leading-relaxed font-medium">
                            La plateforme qui connecte les esprits brillants pour forger l'avenir du travail.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </Link>
                            <Link href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary transition-colors">
                                <Linkedin size={20} />
                            </Link>
                            <Link href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary transition-colors">
                                <Github size={20} />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
                        <div className="space-y-6">
                            <p className="text-primary font-bold tracking-widest uppercase text-xs">Produit</p>
                            <ul className="space-y-4 font-semibold text-base-content/80">
                                <li><Link href="#problem" className="hover:text-primary transition-colors flex items-center gap-1">Pourquoi nous <ArrowUpRight size={14} /></Link></li>
                                <li><Link href="#how-it-works" className="hover:text-primary transition-colors flex items-center gap-1">Fonctionnement <ArrowUpRight size={14} /></Link></li>
                                <li><Link href="#mentors" className="hover:text-primary transition-colors flex items-center gap-1">Nos Mentors <ArrowUpRight size={14} /></Link></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <p className="text-primary font-bold tracking-widest uppercase text-xs">Support</p>
                            <ul className="space-y-4 font-semibold text-base-content/80">
                                <li><Link href="#faq" className="hover:text-primary transition-colors flex items-center gap-1">FAQ <ArrowUpRight size={14} /></Link></li>
                                <li><Link href="/terms" className="hover:text-primary transition-colors flex items-center gap-1">Conditions <ArrowUpRight size={14} /></Link></li>
                                <li><Link href="/privacy" className="hover:text-primary transition-colors flex items-center gap-1">Confidentialité <ArrowUpRight size={14} /></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Brand Call to Action (Inspiration Finwise style) */}
                <div className="bg-base-200 rounded-[2rem] p-8 md:p-12 mb-16 flex flex-col md:flex-row justify-between items-center gap-8 border border-base-300">
                    <div className="space-y-2 text-center md:text-left">
                        <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest">Des questions ?</p>
                        <h3 className="text-2xl md:text-3xl font-black">Besoin d'un accompagnement sur mesure ?</h3>
                    </div>
                    <a
                        href="mailto:contact@mentorplatform.com"
                        className="text-lg md:text-2xl font-black text-primary hover:underline flex items-center gap-4 transition-all"
                    >
                        <Mail className="w-8 h-8 md:w-10 md:h-10" />
                        Nous écrire
                    </a>
                </div>

                {/* Copyright & Bottom Bar */}
                <div className="pt-10 border-t border-base-200 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm font-bold text-base-content/40">
                        © 2026 UNIMENTOR. TOUS DROITS RÉSERVÉS.
                    </p>

                </div>
            </div>
        </footer>
    );
}
