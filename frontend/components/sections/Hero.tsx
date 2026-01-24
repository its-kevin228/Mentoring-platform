import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-base-100">
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Centered Content Block */}
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-10">

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-neutral">
                        Réussissez votre entrée dans le <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">supérieur avec l'aide de vos aînés</span>
                    </h1>

                    <p className="text-lg md:text-xl text-base-content/60 max-w-2xl leading-relaxed font-medium">
                        UniMentor connecte lycéens et nouveaux étudiants avec des mentors universitaires expérimentés pour une orientation éclairée et sans stress.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        <Link href="/signup" className="btn btn-primary text-white btn-lg rounded-full px-12 shadow-2xl shadow-primary/20 group border-none hover:scale-105 active:scale-95 transition-all">
                            Démarrer maintenant
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="#how-it-works" className="btn btn-ghost btn-lg rounded-full px-8 font-bold hover:bg-base-200">
                            En savoir plus
                        </Link>
                    </div>

                    {/* Centered Illustration */}
                    <div className="w-full max-w-5xl pt-12 ">
                        <div className="relative group">
                            <img
                                src="/images/hero-illustration.png"
                                alt="Mentoring Collaboration Illustration"
                                className="w-full h-auto object-contain "
                            />
                            {/* Decorative background glow */}
                            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10 group-hover:bg-primary/10 transition-colors"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[150px]"></div>
            </div>
        </section>
    );
}
