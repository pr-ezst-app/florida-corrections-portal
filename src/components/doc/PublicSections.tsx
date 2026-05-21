import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FACILITIES, FAQ_ITEMS, POLICIES, MAP_POSITIONS } from "./data";

interface PublicSectionsProps {
  scrollTo: (id: string) => void;
}

export default function PublicSections({ scrollTo }: PublicSectionsProps) {
  const [lookupQuery, setLookupQuery] = useState("");
  const [lookupResults, setLookupResults] = useState<null | "empty" | "results">(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<typeof FACILITIES[0] | null>(null);
  const [visitForm, setVisitForm] = useState({ inmateId: "", date: "", time: "", relationship: "", name: "", type: "In-Person" });
  const [visitSubmitted, setVisitSubmitted] = useState(false);

  const handleLookup = () => {
    if (!lookupQuery.trim()) return;
    setLookupResults(lookupQuery.trim().length < 3 ? "empty" : "results");
  };

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitSubmitted(true);
  };

  return (
    <>
      {/* ===== INMATE LOOKUP ===== */}
      <section id="lookup" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-[#c8a847]" />
              <h2 className="font-barlow text-4xl font-bold text-[#0f2447] tracking-wide uppercase">Inmate Lookup</h2>
            </div>
            <p className="text-gray-500 text-sm ml-4">Search the statewide inmate database by name, ID number, or date of birth.</p>
          </div>

          <div className="bg-[#f4f5f7] border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-1.5">Inmate Name</label>
                <input className="input-doc" placeholder="Last, First" value={lookupQuery} onChange={(e) => setLookupQuery(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-1.5">DOC ID Number</label>
                <input className="input-doc" placeholder="e.g. DOC-00123456" />
              </div>
              <div>
                <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-1.5">Date of Birth</label>
                <input className="input-doc" type="date" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLookup}
                className="bg-[#0f2447] text-[#e8c96a] px-6 py-2.5 font-barlow font-semibold text-sm tracking-widest uppercase hover:bg-[#1a3a6e] transition-all flex items-center gap-2"
              >
                <Icon name="Search" size={14} />
                Search Database
              </button>
              <button onClick={() => { setLookupQuery(""); setLookupResults(null); }} className="text-sm text-gray-500 hover:text-gray-700">
                Clear
              </button>
            </div>
          </div>

          {lookupResults === "results" && (
            <div className="section-fade">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-barlow font-bold text-[#0f2447] text-lg tracking-wide uppercase">Search Results</h3>
                <span className="text-xs text-gray-500">3 records found</span>
              </div>
              <div className="border border-gray-200 overflow-hidden overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#0f2447] text-[#c8a847]">
                    <tr>
                      {["DOC ID", "Full Name", "Facility", "Status", "Projected Release", ""].map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-barlow text-xs tracking-widest uppercase whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { id: "DOC-00048291", name: "Johnson, Marcus T.", facility: "Harlow State Prison", status: "Active", release: "2028-03-15" },
                      { id: "DOC-00074120", name: "Johnson, Derek L.", facility: "Cedar Valley Facility", status: "Active", release: "2027-11-02" },
                      { id: "DOC-00031874", name: "Johnston, Marcus A.", facility: "Rockport Correctional", status: "Transferred", release: "2031-07-19" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.id}</td>
                        <td className="px-4 py-3 font-semibold text-[#0f2447]">{row.name}</td>
                        <td className="px-4 py-3 text-gray-600">{row.facility}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 text-xs font-barlow tracking-widest uppercase ${row.status === "Active" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 font-mono text-xs">{row.release}</td>
                        <td className="px-4 py-3">
                          <button className="text-[#0f2447] hover:text-[#c8a847] text-xs font-barlow tracking-widest uppercase transition-colors">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3">Updated daily. Discrepancies? Contact records@doc.state.gov</p>
            </div>
          )}

          {lookupResults === "empty" && (
            <div className="section-fade bg-red-50 border border-red-200 p-5 flex items-start gap-3">
              <Icon name="XCircle" size={18} className="text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-barlow font-bold text-red-800 tracking-wide">No Records Found</p>
                <p className="text-sm text-red-600 mt-1">No inmates matching your search criteria. Verify the information or contact the Records Office.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== VISITATION ===== */}
      <section id="visitation" className="py-16 bg-[#f4f5f7]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-[#c8a847]" />
              <h2 className="font-barlow text-4xl font-bold text-[#0f2447] tracking-wide uppercase">Visitation Scheduling</h2>
            </div>
            <p className="text-gray-500 text-sm ml-4">Book in-person or video visitation. You must be on the approved visitor list prior to scheduling.</p>
          </div>

          {!visitSubmitted ? (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white border border-gray-200 p-6">
                <h3 className="font-barlow font-bold text-[#0f2447] text-xl tracking-wide uppercase mb-5">Book a Visit</h3>
                <form onSubmit={handleVisitSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-1.5">Your Full Name *</label>
                      <input required className="input-doc" placeholder="Last, First" value={visitForm.name} onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-1.5">Relationship *</label>
                      <select required className="input-doc" value={visitForm.relationship} onChange={(e) => setVisitForm({ ...visitForm, relationship: e.target.value })}>
                        <option value="">Select...</option>
                        <option>Spouse / Partner</option>
                        <option>Parent</option>
                        <option>Child</option>
                        <option>Sibling</option>
                        <option>Legal Counsel</option>
                        <option>Other Approved</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-1.5">Inmate DOC ID *</label>
                    <input required className="input-doc" placeholder="DOC-XXXXXXXX" value={visitForm.inmateId} onChange={(e) => setVisitForm({ ...visitForm, inmateId: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-1.5">Preferred Date *</label>
                      <input required type="date" className="input-doc" value={visitForm.date} onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-1.5">Preferred Time *</label>
                      <select required className="input-doc" value={visitForm.time} onChange={(e) => setVisitForm({ ...visitForm, time: e.target.value })}>
                        <option value="">Select slot...</option>
                        <option>09:00 AM – 10:00 AM</option>
                        <option>10:30 AM – 11:30 AM</option>
                        <option>01:00 PM – 02:00 PM</option>
                        <option>02:30 PM – 03:30 PM</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-2">Visit Type *</label>
                    <div className="flex gap-5">
                      {["In-Person", "Video Call"].map((t) => (
                        <label key={t} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                          <input
                            type="radio"
                            name="visittype"
                            className="accent-[#0f2447]"
                            checked={visitForm.type === t}
                            onChange={() => setVisitForm({ ...visitForm, type: t })}
                          />
                          {t}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-[#0f2447] text-[#e8c96a] py-3 font-barlow font-semibold text-sm tracking-widest uppercase hover:bg-[#1a3a6e] transition-all flex items-center gap-2 justify-center">
                    <Icon name="CalendarCheck" size={16} />
                    Submit Visitation Request
                  </button>
                </form>
              </div>

              <div className="space-y-4">
                <div className="bg-[#0f2447] text-white p-5">
                  <h4 className="font-barlow font-bold text-[#c8a847] tracking-widest uppercase text-sm mb-3">Visitation Hours</h4>
                  <div className="space-y-2 text-sm text-white/80">
                    {[["Saturday", "8:00 AM – 4:00 PM"], ["Sunday", "8:00 AM – 4:00 PM"], ["Mon – Fri", "By Appointment"], ["Holidays", "Check Facility"]].map(([day, time]) => (
                      <div key={day} className="flex justify-between border-b border-white/10 pb-1.5">
                        <span className="font-barlow tracking-wide">{day}</span>
                        <span>{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4">
                  <div className="flex items-start gap-2">
                    <Icon name="Info" size={14} className="text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-barlow font-bold text-amber-800 tracking-wide uppercase mb-1">Before You Visit</p>
                      <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
                        <li>Bring valid government-issued photo ID</li>
                        <li>Arrive 30 minutes before your slot</li>
                        <li>No outside food or beverages</li>
                        <li>All visitors subject to search</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-4">
                  <p className="text-xs font-barlow font-bold text-[#0f2447] tracking-wide uppercase mb-1">Need Help?</p>
                  <p className="text-xs text-gray-600">Visitation support line:</p>
                  <p className="font-barlow font-bold text-[#0f2447] text-lg mt-0.5">(555) 000-8823</p>
                  <p className="text-xs text-gray-400 mt-1">Mon–Fri, 8AM–5PM</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="section-fade bg-green-50 border border-green-300 p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Icon name="CheckCircle" size={32} className="text-green-600" />
              </div>
              <h3 className="font-barlow font-bold text-green-900 text-2xl tracking-wide uppercase mb-2">Request Submitted</h3>
              <p className="text-green-700 max-w-md text-sm mb-4">
                Your visitation request has been received. You will be notified by email within 2–3 business days with a confirmation or alternative time options.
              </p>
              <p className="text-xs text-green-600 font-mono">Confirmation #: VIS-{Date.now().toString().slice(-8)}</p>
              <button className="mt-6 bg-[#0f2447] text-[#e8c96a] px-6 py-2.5 font-barlow font-semibold text-sm tracking-widest uppercase hover:bg-[#1a3a6e] transition-all" onClick={() => setVisitSubmitted(false)}>
                Book Another Visit
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== FACILITY MAP ===== */}
      <section id="map" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-[#c8a847]" />
              <h2 className="font-barlow text-4xl font-bold text-[#0f2447] tracking-wide uppercase">DOC Facilities</h2>
            </div>
            <p className="text-gray-500 text-sm ml-4">Statewide correctional facilities — select a facility for details and directions.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              {FACILITIES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFacility(f)}
                  className={`w-full text-left p-4 border transition-all ${selectedFacility?.id === f.id ? "border-[#c8a847] bg-[#0f2447]" : "border-gray-200 bg-white hover:border-[#0f2447]/30 hover:bg-gray-50"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`font-barlow font-bold text-sm tracking-wide ${selectedFacility?.id === f.id ? "text-[#c8a847]" : "text-[#0f2447]"}`}>{f.name}</p>
                      <p className={`text-xs mt-0.5 ${selectedFacility?.id === f.id ? "text-white/70" : "text-gray-500"}`}>{f.city}</p>
                    </div>
                    <span className={`shrink-0 text-xs px-2 py-0.5 font-barlow tracking-wide whitespace-nowrap ${
                      f.type === "Maximum Security" ? "bg-red-100 text-red-700" :
                      f.type === "Medium Security" ? "bg-amber-100 text-amber-700" :
                      f.type === "Minimum Security" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>{f.type}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="relative bg-[#dce4ef] border border-gray-200 h-64 overflow-hidden mb-4">
                <div className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: `linear-gradient(#0f2447 1px, transparent 1px), linear-gradient(90deg, #0f2447 1px, transparent 1px)`,
                    backgroundSize: "40px 40px"
                  }}
                />
                {FACILITIES.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFacility(f)}
                    style={{ position: "absolute", top: MAP_POSITIONS[i].top, left: MAP_POSITIONS[i].left }}
                    className={`group transform -translate-x-1/2 -translate-y-1/2 transition-all ${selectedFacility?.id === f.id ? "z-10 scale-150" : "z-0"}`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md transition-all ${selectedFacility?.id === f.id ? "bg-[#c8a847]" : "bg-[#0f2447]"}`} />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-[#0f2447] text-white text-xs px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-barlow tracking-wide">
                      {f.name}
                    </div>
                  </button>
                ))}
                <div className="absolute bottom-2 right-2 text-xs text-gray-500 font-barlow tracking-wide bg-white/80 px-2 py-1">
                  Click pins for details
                </div>
              </div>

              {selectedFacility ? (
                <div className="section-fade bg-[#0f2447] text-white p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-barlow font-extrabold text-[#c8a847] text-2xl tracking-wide uppercase">{selectedFacility.name}</h3>
                      <p className="text-white/60 text-sm">{selectedFacility.city} · {selectedFacility.type}</p>
                    </div>
                    <span className="bg-white/10 px-3 py-1 text-xs font-barlow tracking-widest text-white">
                      POP: {selectedFacility.population.toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm text-white/80 mb-4">
                    {[
                      ["Address", "1 Corrections Way, " + selectedFacility.city],
                      ["Phone", "(555) 000-" + (2000 + selectedFacility.id * 111)],
                      ["Visitation Days", "Sat – Sun, by appointment"],
                      ["Warden", "Captain R. Morrison"],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <p className="text-[#c8a847] text-xs font-barlow tracking-widest uppercase mb-0.5">{label}</p>
                        <p>{val}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => scrollTo("visitation")}
                    className="bg-[#c8a847] text-[#0f2447] px-5 py-2 font-barlow font-bold text-sm tracking-widest uppercase hover:bg-[#e8c96a] transition-all"
                  >
                    Schedule Visitation Here
                  </button>
                </div>
              ) : (
                <div className="bg-gray-50 border border-dashed border-gray-300 p-8 flex items-center justify-center text-center">
                  <div>
                    <Icon name="MapPin" size={32} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm font-barlow tracking-wide">Select a facility to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== POLICY RESOURCES ===== */}
      <section id="policy" className="py-16 bg-[#f4f5f7]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-[#c8a847]" />
              <h2 className="font-barlow text-4xl font-bold text-[#0f2447] tracking-wide uppercase">Policy Resources for Families</h2>
            </div>
            <p className="text-gray-500 text-sm ml-4">Official DOC policies and family guidance documents.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {POLICIES.map((p, i) => (
              <div key={i} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 p-4 group cursor-pointer">
                <div className="w-12 h-12 bg-[#0f2447] flex items-center justify-center shrink-0">
                  <Icon name={p.icon} fallback="FileText" size={20} className="text-[#c8a847]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-barlow font-bold text-[#0f2447] text-base tracking-wide group-hover:text-[#1a3a6e] transition-colors">{p.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.desc}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="bg-red-100 text-red-700 text-xs px-1.5 py-0.5 font-barlow font-bold tracking-wide">{p.tag}</span>
                  <Icon name="Download" size={16} className="text-gray-400 group-hover:text-[#0f2447] transition-colors" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-[#0f2447] p-5 flex items-start gap-4">
            <Icon name="Phone" size={20} className="text-[#c8a847] mt-0.5 shrink-0" />
            <div>
              <p className="font-barlow font-bold text-[#c8a847] tracking-widest uppercase text-sm">Family Services Hotline</p>
              <p className="text-white text-xl font-barlow font-bold mt-0.5">(555) 000-DOCS</p>
              <p className="text-white/60 text-xs mt-0.5">Mon–Fri 8AM–6PM · Español disponible · TTY: 711</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-[#c8a847]" />
              <h2 className="font-barlow text-4xl font-bold text-[#0f2447] tracking-wide uppercase">Community FAQ</h2>
            </div>
            <p className="text-gray-500 text-sm ml-4">Frequently asked questions for families and community members.</p>
          </div>
          <div className="divide-y divide-gray-100 border border-gray-200">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-barlow font-bold text-[#0f2447] text-base tracking-wide pr-4">{item.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16} className={`shrink-0 transition-colors ${openFaq === i ? "text-[#c8a847]" : "text-gray-400"}`} />
                </button>
                {openFaq === i && (
                  <div className="section-fade px-5 pb-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed pt-3">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            Still have questions?{" "}
            <button onClick={() => scrollTo("contact")} className="text-[#0f2447] underline hover:text-[#1a3a6e]">
              Contact us
            </button>{" "}
            or call (555) 000-DOCS.
          </p>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-16 bg-[#f4f5f7]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-[#c8a847]" />
              <h2 className="font-barlow text-4xl font-bold text-[#0f2447] tracking-wide uppercase">Contact Information</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: "Building2", label: "Headquarters", lines: ["1 Justice Plaza, Suite 100", "Capitol City, ST 00001", "Mon–Fri, 8AM–5PM"] },
              { icon: "Phone", label: "Main Switchboard", lines: ["(555) 000-0000", "Toll-Free: 1-800-000-DOCS", "TTY: 711"] },
              { icon: "Mail", label: "General Inquiries", lines: ["info@doc.state.gov", "records@doc.state.gov", "Response within 5–7 days"] },
            ].map((c) => (
              <div key={c.label} className="bg-white border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-[#0f2447] flex items-center justify-center">
                    <Icon name={c.icon} fallback="CircleAlert" size={16} className="text-[#c8a847]" />
                  </div>
                  <h3 className="font-barlow font-bold text-[#0f2447] tracking-wide uppercase text-sm">{c.label}</h3>
                </div>
                {c.lines.map((l, i) => (
                  <p key={i} className={`text-sm ${i === 0 ? "text-[#0f2447] font-semibold" : "text-gray-500"} ${i < c.lines.length - 1 ? "mb-0.5" : ""}`}>{l}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <h3 className="font-barlow font-bold text-[#0f2447] text-xl tracking-wide uppercase mb-4">Send a Message</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-1.5">Your Name</label>
                <input className="input-doc" placeholder="Full Name" />
              </div>
              <div>
                <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-1.5">Email Address</label>
                <input className="input-doc" type="email" placeholder="you@email.com" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-1.5">Subject</label>
              <select className="input-doc">
                <option>Select a topic...</option>
                <option>Inmate Records Inquiry</option>
                <option>Visitation Issue</option>
                <option>Complaint / Grievance</option>
                <option>Media Inquiry</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-barlow font-semibold tracking-widest uppercase text-gray-600 mb-1.5">Message</label>
              <textarea className="input-doc resize-none h-24" placeholder="Describe your inquiry in detail..." />
            </div>
            <button className="bg-[#0f2447] text-[#e8c96a] px-6 py-2.5 font-barlow font-semibold text-sm tracking-widest uppercase hover:bg-[#1a3a6e] transition-all flex items-center gap-2">
              <Icon name="Send" size={14} />
              Submit Message
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
