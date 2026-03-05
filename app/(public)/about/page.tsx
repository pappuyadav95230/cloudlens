import AboutSection from "../_components/AboutSection";
import CTASection from "../_components/CTASection";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-[72px] bg-white dark:bg-[#1e293b] transition-colors duration-500">
            <AboutSection />
            <CTASection />
        </div>
    );
}
