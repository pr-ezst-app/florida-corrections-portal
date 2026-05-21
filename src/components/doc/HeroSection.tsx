import Icon from "@/components/ui/icon";

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        className="h-[520px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(https://cdn.ezst.app/projects/31a973a9-3f53-4d92-9bb0-9338c5245c3f/files/657ceb96-c2c7-4fad-a94c-a6d7ca74b660.jpg)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2447]/92 via-[#0f2447]/70 to-[#0f2447]/25" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl section-fade">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-[#c8a847]" />
              <span className="text-[#c8a847] text-xs tracking-widest uppercase font-barlow font-semibold">
                State Department of Corrections
              </span>
            </div>
            <h1 className="font-barlow text-5xl md:text-6xl font-extrabold text-white leading-none mb-4 tracking-wide">
              SERVING JUSTICE.<br />
              <span className="text-[#c8a847]">SUPPORTING FAMILIES.</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl font-source font-light mb-8 leading-relaxed">
              The official portal for inmate information, visitation scheduling, facility resources, and family services.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("lookup")}
                className="bg-[#c8a847] text-[#0f2447] px-6 py-3 font-barlow font-bold text-sm tracking-widest uppercase hover:bg-[#e8c96a] transition-all"
              >
                Inmate Lookup
              </button>
              <button
                onClick={() => scrollTo("visitation")}
                className="bg-[#0f2447] text-[#e8c96a] px-6 py-3 font-barlow font-semibold text-sm tracking-widest uppercase border border-[#c8a847]/40 hover:bg-[#1a3a6e] transition-all"
              >
                Schedule Visitation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Bar */}
      <div className="bg-[#1a3a6e] border-b border-[#c8a847]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#c8a847]/20">
            {[
              { icon: "Search", label: "Inmate Lookup", id: "lookup" },
              { icon: "Calendar", label: "Book Visitation", id: "visitation" },
              { icon: "MapPin", label: "Find Facility", id: "map" },
              { icon: "FileText", label: "Policy Resources", id: "policy" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex flex-col items-center gap-2 py-5 px-4 text-white/70 hover:text-[#c8a847] hover:bg-white/5 transition-all group"
              >
                <Icon name={item.icon} fallback="CircleAlert" size={22} />
                <span className="text-xs font-barlow tracking-widest uppercase">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Banner */}
      <div className="bg-amber-50 border-b-2 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-start gap-3">
          <Icon name="AlertTriangle" size={16} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <span className="font-barlow font-bold text-amber-800 text-sm tracking-wide uppercase">Notice: </span>
            <span className="text-amber-800 text-sm">
              Visitation at Rockport Correctional Center is suspended May 22–24 for facility maintenance. All pre-booked visits will be rescheduled automatically.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
