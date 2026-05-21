import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function StaffSection() {
  const [staffForm, setStaffForm] = useState({ badge: "", password: "" });
  const [staffAttempted, setStaffAttempted] = useState(false);

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffAttempted(true);
  };

  return (
    <>
      {/* ===== STAFF LOGIN ===== */}
      <section id="staff" className="py-16 bg-[#0f2447] doc-stripe">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#c8a847] flex items-center justify-center mx-auto mb-4 font-barlow font-extrabold text-[#0f2447] text-2xl">
              DOC
            </div>
            <h2 className="font-barlow text-4xl font-bold text-white tracking-wide uppercase">Staff Portal</h2>
            <p className="text-white/50 text-sm mt-2">Restricted access — authorized personnel only</p>
          </div>

          <div className="bg-white p-6">
            {staffAttempted ? (
              <div className="section-fade text-center py-4">
                <Icon name="ShieldX" size={36} className="text-red-400 mx-auto mb-3" />
                <p className="font-barlow font-bold text-red-700 text-lg tracking-wide uppercase">Access Denied</p>
                <p className="text-gray-500 text-sm mt-2 mb-4">Invalid credentials. This attempt has been logged.</p>
                <button className="text-xs text-[#0f2447] underline" onClick={() => setStaffAttempted(false)}>Try Again</button>
              </div>
            ) : (
              <form onSubmit={handleStaffLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-1.5">Badge / Employee ID</label>
                  <input required className="input-doc" placeholder="e.g. BDG-00000" value={staffForm.badge} onChange={(e) => setStaffForm({ ...staffForm, badge: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-1.5">Password</label>
                  <input required type="password" className="input-doc" placeholder="••••••••••" value={staffForm.password} onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })} />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="rem" className="accent-[#0f2447]" />
                  <label htmlFor="rem" className="text-xs text-gray-500">Remember this device (30 days)</label>
                </div>
                <button type="submit" className="w-full bg-[#0f2447] text-[#e8c96a] py-3 font-barlow font-semibold text-sm tracking-widest uppercase hover:bg-[#1a3a6e] transition-all flex items-center gap-2 justify-center">
                  <Icon name="LogIn" size={16} />
                  Secure Sign In
                </button>
                <div className="text-center">
                  <button type="button" className="text-xs text-gray-400 hover:text-gray-600 underline">
                    Forgot password? Contact IT Support
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-white/30 text-xs">
            <Icon name="Lock" size={12} />
            <span>256-bit encrypted · All activity logged · Unauthorized access is a felony</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#08172e] text-white/60 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#c8a847] flex items-center justify-center font-barlow font-extrabold text-[#0f2447] text-sm">
                DOC
              </div>
              <div>
                <p className="text-white text-sm font-barlow font-bold tracking-wide">Department of Corrections</p>
                <p className="text-white/40 text-xs">State Government Official Portal</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              {["Privacy Policy", "Accessibility", "Terms of Use", "Sitemap"].map((l) => (
                <button key={l} className="hover:text-white transition-colors">{l}</button>
              ))}
            </div>
            <p className="text-xs text-white/30">© 2026 State DOC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
