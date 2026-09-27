import BenefitsSection from "@/src/components/homepage/sections/BenefitsSection";
import CtaSection from "@/src/components/homepage/sections/CtaSection";
import HomeSection from "@/src/components/homepage/sections/HomeSection";
import OptimizedSection from "@/src/components/homepage/sections/OptimizedSection";
import WorkSection from "@/src/components/homepage/sections/WorkSection";

export default function Homepage() {
  return (
    <main className="flex-1 bg-background text-foreground selection:bg-emerald-500/20 selection:text-emerald-400">
      <HomeSection />
      <OptimizedSection />
      <WorkSection />
      <BenefitsSection />
      <CtaSection />
    </main>
  );
}
