import ClientsSection from "../_components/ClientsSection";
import CTASection from "../_components/CTASection";

export default function ClientsPage() {
    return (
        <div className="min-h-screen pt-[72px] bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500">
            <ClientsSection />
            <CTASection />
        </div>
    );
}
