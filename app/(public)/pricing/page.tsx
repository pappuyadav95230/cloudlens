import PricingSection from "../_components/PricingSection";
import CTASection from "../_components/CTASection";

export default function PricingPage() {
    return (
        <div className="min-h-screen pt-[72px] bg-white dark:bg-[#1e293b] transition-colors duration-500">
            <PricingSection />
            <CTASection />
        </div>
    );
}
