export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "lookup", label: "Inmate Lookup" },
  { id: "visitation", label: "Visitation" },
  { id: "map", label: "Facilities" },
  { id: "policy", label: "Policy Resources" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
  { id: "staff", label: "Staff Portal" },
];

export const FACILITIES = [
  { id: 1, name: "Rockport Correctional Center", type: "Maximum Security", city: "Rockport", population: 1842 },
  { id: 2, name: "Harlow State Prison", type: "Medium Security", city: "Harlow", population: 1204 },
  { id: 3, name: "Cedar Valley Facility", type: "Minimum Security", city: "Cedar Valley", population: 680 },
  { id: 4, name: "Westgate Detention Center", type: "Pre-Trial", city: "Westgate", population: 540 },
  { id: 5, name: "Northfield Women's Facility", type: "Women's Facility", city: "Northfield", population: 390 },
];

export const FAQ_ITEMS = [
  {
    q: "How do I schedule a visitation appointment?",
    a: "Visitation appointments can be scheduled through this portal using the Visitation section. You must be on the approved visitor list for the inmate before scheduling. Allow 3–5 business days for list approval."
  },
  {
    q: "How do I get added to an inmate's approved visitor list?",
    a: "Submit a Visitor Application Form (DOC-V1) to the facility directly or via certified mail. Processing typically takes 7–10 business days. Background checks are required for all visitors 18 and older."
  },
  {
    q: "What are the visitation dress code requirements?",
    a: "Visitors must wear appropriate clothing that does not resemble DOC staff or inmate uniforms. Revealing clothing, camouflage patterns, and blue/grey denim may be prohibited at certain facilities."
  },
  {
    q: "Can I send money to an inmate?",
    a: "Yes. Funds can be deposited through our approved vendor portal or by money order sent directly to the facility. Cash deposits are not accepted. See the Policy Resources section for deposit limits."
  },
  {
    q: "What should I do if an inmate is moved to a different facility?",
    a: "Transfers are tracked in our Inmate Lookup database. You can search by name or ID number. Notification letters are also mailed to the inmate's listed emergency contact within 48 hours of transfer."
  },
  {
    q: "How do I file a grievance or complaint?",
    a: "Formal complaints can be submitted in writing to the facility's Inmate Relations Office. Family members may contact the Family Services Hotline at (555) 000-DOCS. All grievances are reviewed within 15 business days."
  },
];

export const POLICIES = [
  { icon: "FileText", title: "Visitation Policy Manual", desc: "DOC-POL-001 — Updated Jan 2026", tag: "PDF" },
  { icon: "Package", title: "Approved Package Contents List", desc: "DOC-POL-002 — Updated Dec 2025", tag: "PDF" },
  { icon: "DollarSign", title: "Inmate Funds & Deposit Guidelines", desc: "DOC-POL-003 — Updated Jan 2026", tag: "PDF" },
  { icon: "Phone", title: "Phone & Communication Rights", desc: "DOC-POL-004 — Updated Nov 2025", tag: "PDF" },
  { icon: "Heart", title: "Family Reunification Program", desc: "DOC-POL-005 — Updated Oct 2025", tag: "PDF" },
  { icon: "Scale", title: "Grievance & Appeals Process", desc: "DOC-POL-006 — Updated Jan 2026", tag: "PDF" },
];

export const MAP_POSITIONS = [
  { top: "40%", left: "55%" },
  { top: "60%", left: "65%" },
  { top: "25%", left: "35%" },
  { top: "55%", left: "25%" },
  { top: "20%", left: "60%" },
];
