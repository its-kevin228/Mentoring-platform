"use client";

import { motion } from "framer-motion";
import { howItWorksSteps } from "@/data/landing";

const illustrations = [
    "/images/profile.svg",
    "/images/how-it-works-2.png",
    "/images/echange.svg"
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-base-50 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Le Processus</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-neutral">
                        Comment ça marche sur <span className="text-primary italic">UniMentor</span> ?
                    </h3>
                    <p className="text-base-content/60 text-lg">
                        Un parcours simple et structuré pour vous mener vers la réussite professionnelle.
                    </p>
                </div>

                {/* Steps with Zig-Zag Layout and Scroll Animations */}
                <div className="space-y-32">
                    {howItWorksSteps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                                } items-center gap-12 lg:gap-24`}
                        >
                            {/* Illustration Side */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-primary/5   transition-transform duration-500"></div>
                                    <img
                                        src={illustrations[index]}
                                        alt={step.title}
                                        className="relative rounded-[2rem] w-full h-auto object-cover"
                                    />
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-black text-xl shadow-lg shadow-primary/30">
                                    {index + 1}
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-3xl md:text-4xl font-black text-neutral">
                                        {step.title}
                                    </h4>
                                    <p className="text-lg md:text-xl text-base-content/60 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Bullet points or tiny details to add "sobriety" and "depth" */}
                                <ul className="space-y-3 pt-4">
                                    <li className="flex items-center gap-3 justify-center lg:justify-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        <span className="text-sm font-bold text-neutral/70 uppercase tracking-wider tabular-nums">Étape {index + 1}.1 — Validation</span>
                                    </li>
                                    <li className="flex items-center gap-3 justify-center lg:justify-start text-base-content/40">
                                        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                                        <span className="text-sm font-bold uppercase tracking-wider">Processus certifié</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
