import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8 z-10">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                            <Star size={16} fill="currentColor" />
                            <span>Plus de 500 mentors experts inscrits</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                            Propulsez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Carrière</span> avec un Mentor
                        </h1>

                        <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            Connectez-vous avec des leaders d'opinion et des experts du secteur pour un accompagnement personnalisé. Atteignez vos objectifs plus rapidement.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                            <Link href="/signup" className="btn btn-primary text-white btn-lg rounded-full px-12 shadow-2xl shadow-primary/30 group border-none">
                                Trouver mon mentor
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="#how-it-works" className="btn btn-ghost btn-lg rounded-full px-8 font-bold">
                                Comment ça marche ?
                            </Link>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-base-content/60">
                            <div className="avatar-group -space-x-4">
                                <div className="avatar border-2 border-base-100"><div className="w-8"> <img src="https://i.pravatar.cc/100?u=1" /></div></div>
                                <div className="avatar border-2 border-base-100"><div className="w-8"> <img src="https://i.pravatar.cc/100?u=2" /></div></div>
                                <div className="avatar border-2 border-base-100"><div className="w-8"> <img src="https://i.pravatar.cc/100?u=3" /></div></div>
                                <div className="avatar border-2 border-base-100"><div className="w-8 bg-neutral text-neutral-content"><span>+50</span></div></div>
                            </div>
                            <span>Rejoignez une communauté de pro ambitieux</span>
                        </div>
                    </div>

                    {/* Image/Visual */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 animate-float">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                alt="Mentoring session"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-blob"></div>
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-secondary/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
