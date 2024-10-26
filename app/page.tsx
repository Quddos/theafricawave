import Image from "next/image";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LatestNews from "@/components/LatestNews";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import PreviousNews from "@/components/PreviousNews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <LatestNews />
      <Services/>
      <PreviousNews />
      <FAQ />
      {/* We'll add more components here as we create them */}

      <Footer />
    </main>
    
  );
}



