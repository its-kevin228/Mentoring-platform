"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ProblemSolution from "@/components/sections/ProblemSolution";
import HowItWorks from "@/components/sections/HowItWorks";
import FeaturedMentors from "@/components/sections/FeaturedMentors";
import MainCTA from "@/components/sections/MainCTA";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-100 scroll-smooth">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <FeaturedMentors />
        <MainCTA />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
