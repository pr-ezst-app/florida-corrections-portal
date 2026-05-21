import { useState } from "react";
import NavBar from "@/components/doc/NavBar";
import HeroSection from "@/components/doc/HeroSection";
import PublicSections from "@/components/doc/PublicSections";
import StaffSection from "@/components/doc/StaffSection";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] font-source">
      <NavBar
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollTo={scrollTo}
      />
      <HeroSection scrollTo={scrollTo} />
      <PublicSections scrollTo={scrollTo} />
      <StaffSection />
    </div>
  );
}
