import { XCircle, CheckCircle2 } from "lucide-react";

export default function ProblemSolution() {
    const points = [
        {
            problem: "Sensation d'être bloqué dans sa progression.",
            solution: "Un regard extérieur expert pour débloquer votre potentiel.",
            icon: "🚀"
        },
        {
            problem: "Difficulté à prendre des décisions stratégiques.",
            solution: "L'expérience d'un mentor qui a déjà traversé vos défis.",
            icon: "🎯"
        },
        {
            problem: "Manque de réseau dans votre industrie.",
            solution: "Accès privilégié à un écosystème de professionnels.",
            icon: "🤝"
        }
    ];

    return (
        <section id="problem" className="py-24 bg-base-100">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-primary font-bold uppercase tracking-wider text-sm italic">Problème & Solution</h2>
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Pourquoi avez-vous besoin d'un mentor ?</h3>
                    <p className="text-lg text-base-content/70">La solitude du leader ou de l'apprenant est le plus grand frein à la réussite. Nous comblons ce fossé.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {points.map((point, index) => (
                        <div key={index} className="card bg-base-200 border border-base-300 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 group">
                            <div className="p-8 space-y-6">
                                <div className="text-4xl bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    {point.icon}
                                </div>

                                <div className="space-y-4">
                                    <div className="flex gap-3 text-error/80">
                                        <XCircle className="flex-shrink-0" size={20} />
                                        <p className="font-medium text-sm md:text-base italic">{point.problem}</p>
                                    </div>

                                    <div className="divider opacity-10"></div>

                                    <div className="flex gap-3 text-success">
                                        <CheckCircle2 className="flex-shrink-0" size={20} />
                                        <p className="font-bold text-sm md:text-base">{point.solution}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
