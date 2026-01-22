import Link from "next/link";
import { Zap } from "lucide-react";

export default function MainCTA() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-8">
                <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-primary-content relative overflow-hidden flex flex-col items-center text-center space-y-8 shadow-2xl">
                    {/* Background Decorative patterns */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

                    <Zap className="w-16 h-16 animate-bounce" fill="currentColor" />

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl leading-tight">
                        Prêt à transformer votre avenir professionnel ?
                    </h2>

                    <p className="text-xl md:text-2xl opacity-90 max-w-2xl font-medium">
                        Rejoignez des milliers de professionnels qui progressent chaque jour grâce au mentoring.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link href="/signup" className="btn btn-neutral btn-lg rounded-full px-12 text-lg shadow-xl shadow-black/20 border-none hover:scale-105 active:scale-95 transition-transform">
                            S'inscrire gratuitement
                        </Link>
                    </div>

                    <p className="text-sm opacity-70">Aucune carte bancaire requise pour démarrer.</p>
                </div>
            </div>
        </section>
    );
}
