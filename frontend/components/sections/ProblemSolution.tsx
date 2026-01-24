import { problemPoints } from "@/data/landing";
import { TrendingUp, Target, Users, CheckCircle2 } from "lucide-react";

const iconsMap = [TrendingUp, Target, Users];

export default function ProblemSolution() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header contextuelle centroé */}
                <div className="max-w-3xl mb-16 text-center mx-auto">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Pourquoi UniMentor ?</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-neutral leading-tight">
                        Transformez vos obstacles en <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-500 to-teal-400 italic">opportunités</span>
                    </h3>
                </div>

                {/* Layout Alternatif : Liste épurée sans bordures de cartes */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
                    {problemPoints.map((point, index) => {
                        const Icon = iconsMap[index] || CheckCircle2;
                        return (
                            <div key={index} className="flex flex-col items-center text-center space-y-6 group">
                                {/* Icon with subtle accent */}
                                <div className="w-16 h-16 mx-auto flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300  group-hover:shadow-lg group-hover:shadow-primary/20">
                                    <Icon size={32} strokeWidth={1.5} />
                                </div>

                                {/* Content without card box */}
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <span className="text-xs font-bold text-error/60 uppercase tracking-tighter">Le problème</span>
                                        <h4 className="text-xl font-bold text-neutral group-hover:text-primary transition-colors">
                                            {point.problem}
                                        </h4>
                                    </div>

                                    <div className="flex flex-col items-center space-y-2 pt-4 border-t border-base-100">
                                        <div className="flex items-center justify-center gap-2">
                                            <CheckCircle2 size={16} className="text-primary" />
                                            <span className="text-xs font-bold text-primary uppercase tracking-tighter">Notre solution</span>
                                        </div>
                                        <p className="text-base-content/70 leading-relaxed font-medium">
                                            {point.solution}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Subtle brand divider */}
                <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-base-200 to-transparent"></div>
            </div>
        </section>
    );
}
