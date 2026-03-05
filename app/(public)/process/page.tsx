import HowItWorksSection from "../_components/HowItWorksSection";
import CTASection from "../_components/CTASection";

export default function ProcessPage() {
    return (
        <div className="min-h-screen pt-[72px] bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
            <HowItWorksSection />
            <CTASection />
        </div>
    );
}
