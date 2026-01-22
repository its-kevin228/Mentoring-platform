import { UserPlus, Search, CalendarCheck } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            title: "Créez votre profil",
            description: "Dites-nous qui vous êtes et quels sont vos objectifs de carrière.",
            icon: <UserPlus className="w-10 h-10" />,
            color: "bg-blue-500"
        },
        {
            title: "Trouvez votre Mentor",
            description: "Parcourez notre catalogue d'experts triés sur le volet par industrie.",
            icon: <Search className="w-10 h-10" />,
            color: "bg-purple-500"
        },
        {
            title: "Commencez l'échange",
            description: "Réservez votre première session et commencez à progresser ensemble.",
            icon: <CalendarCheck className="w-10 h-10" />,
            color: "bg-pink-500"
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-base-200">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">Comment ça marche ?</h2>
                    <p className="text-base-content/70">Une approche simplifiée pour vous connecter au bon savoir au bon moment.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center max-w-xs relative">
                            {/* Step Number Badge */}
                            <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-xl shadow-lg z-20">
                                {index + 1}
                            </div>

                            <div className={`w-24 h-24 rounded-3xl ${step.color} text-white flex items-center justify-center mb-6 shadow-2xl shadow-inner transform rotate-3 hover:rotate-0 transition-transform`}>
                                {step.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-base-content/60 leading-relaxed">{step.description}</p>

                            {/* Connector line for large screens */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 -right-16 w-16 h-0.5 bg-base-300"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
