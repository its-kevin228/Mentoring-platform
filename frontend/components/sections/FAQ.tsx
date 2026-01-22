"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Plus, Minus, Mail } from "lucide-react";
import { faqs } from "@/data/landing";

export default function FAQ() {
    return (
        <section id="faq" className="py-20 lg:py-32 bg-base-100">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Column: Title & Contact */}
                    <div className="lg:w-1/3 space-y-6 text-center lg:text-left">
                        <p className="text-primary font-bold tracking-widest uppercase text-sm">FAQ'S</p>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                            Questions Fréquemment Posées
                        </h2>
                        <div className="space-y-4 pt-6">
                            <p className="text-base-content/60 text-lg">
                                Vous avez une question spécifique ? N'hésitez pas à nous contacter directement.
                            </p>
                            <a
                                href="mailto:help@mentorplatform.com"
                                className="inline-flex items-center gap-2 text-xl md:text-2xl font-bold text-primary hover:underline transition-all"
                            >
                                <Mail className="w-6 h-6" />
                                help@mentorplatform.com
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="lg:w-2/3">
                        <div className="border-b border-base-300">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-t border-base-300">
                                    <Disclosure>
                                        {({ open }) => (
                                            <>
                                                <DisclosureButton className="flex items-center justify-between w-full py-8 text-left group">
                                                    <span className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors pr-8">
                                                        {faq.question}
                                                    </span>
                                                    <span className="flex-shrink-0">
                                                        {open ? (
                                                            <Minus className="w-6 h-6 text-primary scale-110 transition-transform" />
                                                        ) : (
                                                            <Plus className="w-6 h-6 text-base-content/40 group-hover:text-primary transition-all" />
                                                        )}
                                                    </span>
                                                </DisclosureButton>
                                                <DisclosurePanel className="pb-8 text-lg text-base-content/70 leading-relaxed max-w-2xl font-medium animate-in fade-in slide-in-from-top-2 duration-300">
                                                    {faq.answer}
                                                </DisclosurePanel>
                                            </>
                                        )}
                                    </Disclosure>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
