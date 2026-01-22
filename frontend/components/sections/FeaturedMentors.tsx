import { BadgeCheck, MessageCircle } from "lucide-react";
import { mentors } from "@/data/landing";

export default function FeaturedMentors() {

    return (
        <section id="mentors" className="py-24 bg-base-100">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl space-y-4">
                        <h2 className="text-4xl font-bold tracking-tight italic text-blue-500">Mentors en vedette</h2>
                        <p className="text-base-content/70">Apprenez des meilleurs professionnels du secteur, prêts à partager leur expertise avec vous.</p>
                    </div>
                    <button className="btn btn-outline btn-primary rounded-full px-8">Voir tous les mentors</button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {mentors.map((mentor, index) => (
                        <div key={index} className="card bg-base-100 border border-base-200 group overflow-hidden">
                            <figure className="relative h-64">
                                <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="badge badge-primary gap-1 py-3 px-4 shadow-lg border-none">
                                        <BadgeCheck size={14} />
                                        Vérifié
                                    </span>
                                </div>
                            </figure>
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="card-title text-xl">{mentor.name}</h3>
                                        <p className="text-sm text-base-content/60 font-medium">{mentor.role} @ {mentor.company}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 my-4">
                                    {mentor.tags.map((tag, tIndex) => (
                                        <div key={tIndex} className="badge badge-outline badge-sm opacity-70">{tag}</div>
                                    ))}
                                </div>

                                <div className="divider opacity-10 my-1"></div>

                                <div className="card-actions justify-between items-center mt-2">
                                    <span className="text-xs font-bold text-base-content/50 uppercase tracking-widest">{mentor.experience}</span>
                                    <button className="btn btn-ghost btn-sm btn-circle group-hover:bg-primary group-hover:text-white transition-colors">
                                        <MessageCircle size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
