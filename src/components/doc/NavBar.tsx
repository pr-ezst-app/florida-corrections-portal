import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";

interface NavBarProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function NavBar({ activeSection, mobileMenuOpen, setMobileMenuOpen, scrollTo }: NavBarProps) {
  return (
    <>
      {/* TOP BAR */}
      <div className="bg-[#0f2447] text-[#c8a847] text-xs font-source py-1.5 px-4 flex items-center justify-between">
        <span className="tracking-widest uppercase font-semibold">Official Government Website</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Icon name="Lock" size={11} />
            <span>Secure Connection</span>
          </span>
          <span className="text-white/50">|</span>
          <span className="text-white/70">Emergency: (555) 000-1911</span>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="bg-[#0f2447] shadow-lg sticky top-0 z-50 border-b-2 border-[#c8a847]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => scrollTo("home")} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#c8a847] flex items-center justify-center font-barlow font-extrabold text-[#0f2447] text-lg">
                DOC
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-barlow text-white font-bold text-lg leading-tight tracking-wide">
                  Department of Corrections
                </div>
                <div className="text-[#c8a847] text-xs tracking-widest uppercase">Official State Portal</div>
              </div>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-2 text-xs font-barlow font-semibold tracking-wider uppercase transition-all ${
                    item.id === "staff"
                      ? "bg-[#c8a847] text-[#0f2447] hover:bg-[#e8c96a] ml-2"
                      : activeSection === item.id
                      ? "text-[#c8a847] border-b-2 border-[#c8a847]"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1a3a6e] border-t border-[#c8a847]/30 px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left px-3 py-2.5 text-sm font-barlow tracking-wider uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
