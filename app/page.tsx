import { Hero } from "../components/home/Hero";
import { QuickActions } from "../components/home/QuickActions";
import { ServicesSection } from "../components/home/ServicesSection";
import { PopularTestsSection } from "../components/home/PopularTestsSection";
import { PackagesSection } from "../components/home/PackagesSection";
import { FaqPreview } from "../components/home/FaqPreview";
import { ContactMapSection } from "../components/ContactMapSection";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickActions />
      <ServicesSection />
      <PopularTestsSection />
      <PackagesSection />
      <FaqPreview />
      <ContactMapSection />
    </>
  );
}
