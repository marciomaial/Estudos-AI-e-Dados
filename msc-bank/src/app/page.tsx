import { Buyers } from "@/components/site/Buyers";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Impact } from "@/components/site/Impact";
import { Navbar } from "@/components/site/Navbar";
import { Problem } from "@/components/site/Problem";
import { Security } from "@/components/site/Security";
import { Simulator } from "@/components/site/Simulator";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-6 pb-6 sm:gap-10 sm:pb-10">
        <Hero />
        <Problem />
        <HowItWorks />
        <Simulator />
        <Buyers />
        <Impact />
        <Security />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
