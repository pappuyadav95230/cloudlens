import HeroSection from "./_components/HeroSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import DashboardShowcase from "./_components/DashboardShowcase";
import FeaturesSection from "./_components/FeaturesSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import FAQSection from "./_components/FAQSection";
import CTASection from "./_components/CTASection";

export default function HomePage() {
    return (
        <div className="min-h-screen overflow-x-hidden">
            <HeroSection />
            <HowItWorksSection />
            <DashboardShowcase />
            <FeaturesSection />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
        </div>
    );
}

