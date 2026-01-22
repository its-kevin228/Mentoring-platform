import { ctaDetails } from "@/data/landing";
import { AppStoreButton, PlayStoreButton } from "@/components/common/StoreButtons";

const MainCTA: React.FC = () => {
    return (
        <section id="cta" className="mt-10 mb-5 lg:my-20">
            <div className="container mx-auto px-4 md:px-8">
                <div className="relative h-full w-full z-10 mx-auto py-12 sm:py-24 overflow-hidden rounded-[3rem]">
                    <div className="h-full w-full">
                        {/* Premium Grid Background adapted to brand colors */}
                        <div className="absolute inset-0 -z-10 h-full w-full bg-[#042f2e] bg-[linear-gradient(to_right,#0f3b39_1px,transparent_1px),linear-gradient(to_bottom,#0f3b39_1px,transparent_1px)] bg-[size:6rem_4rem]">
                            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_50%_500px,rgba(45,212,191,0.15),transparent)]"></div>
                        </div>

                        <div className="h-full flex flex-col items-center justify-center text-white text-center px-5 space-y-8">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl md:leading-tight font-black mb-4 max-w-4xl tracking-tight">
                                {ctaDetails.heading}
                            </h2>

                            <p className="mx-auto max-w-2xl text-lg md:text-xl opacity-80 font-medium">
                                {ctaDetails.subheading}
                            </p>

                            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <AppStoreButton />
                                <PlayStoreButton />
                            </div>

                            <p className="text-sm opacity-50 font-bold uppercase tracking-widest pt-4">UniMentor est disponible partout</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainCTA;
