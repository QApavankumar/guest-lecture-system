export const VERIFIED_GUEST_LECTURERS = [
  // IT / ITeS
  {
    id: "spk-it-01",
    name: "Ramesh Varma",
    organization: "Tech Mahindra (Hyderabad)",
    designation: "Principal Solutions Architect",
    phone: "9849123456",
    trade: "Information Technology",
    tradeKeywords: ["information technology", "ites", "it", "computer", "cloud", "python"]
  },
  {
    id: "spk-it-02",
    name: "Dr. Ananya Reddy",
    organization: "Microsoft India R&D",
    designation: "Lead AI & Cloud Engineer",
    phone: "9849234567",
    trade: "Information Technology",
    tradeKeywords: ["information technology", "ites", "it", "ai", "cloud"]
  },

  // Healthcare
  {
    id: "spk-hc-01",
    name: "Dr. K. Srinivas",
    organization: "Yashoda Hospitals (Secunderabad)",
    designation: "Chief Medical Officer",
    phone: "9849345678",
    trade: "Healthcare",
    tradeKeywords: ["healthcare", "general duty", "medical", "hospital", "nursing"]
  },
  {
    id: "spk-hc-02",
    name: "Sister Mary Varghese",
    organization: "Apollo Institute of Nursing",
    designation: "Clinical Nursing Superintendent",
    phone: "9849456781",
    trade: "Healthcare",
    tradeKeywords: ["healthcare", "nursing", "patient care", "first aid"]
  },

  // Automotive
  {
    id: "spk-auto-01",
    name: "M. Venkat Rao",
    organization: "Mahindra & Mahindra (Zaheerabad)",
    designation: "Senior Technical Trainer (EV & Powertrain)",
    phone: "9849456789",
    trade: "Automotive",
    tradeKeywords: ["automotive", "two-wheeler", "vehicle", "automobile", "ev"]
  },
  {
    id: "spk-auto-02",
    name: "K. Suresh Babu",
    organization: "Bosch Authorized Service Center",
    designation: "Master Diagnostic Technician",
    phone: "9849567892",
    trade: "Automotive",
    tradeKeywords: ["automotive", "mechanic", "engine", "diagnostics"]
  },

  // Retail Management
  {
    id: "spk-ret-01",
    name: "S. Lavanya",
    organization: "Reliance Retail Ltd (Telangana Region)",
    designation: "Regional Operations Manager",
    phone: "9849567890",
    trade: "Retail Management",
    tradeKeywords: ["retail", "store", "merchandise", "pos", "customer service"]
  },

  // Electronics & Hardware
  {
    id: "spk-elec-01",
    name: "P. Rajesh",
    organization: "ECIL (Electronics Corporation of India)",
    designation: "Lead Embedded Hardware Engineer",
    phone: "9849678901",
    trade: "Electronics & Hardware",
    tradeKeywords: ["electronics", "hardware", "circuit", "embedded", "pcb"]
  },

  // Agriculture & Floriculture
  {
    id: "spk-agri-01",
    name: "Dr. G. Ramana",
    organization: "PJTSAU (Prof. Jayashankar Agri University)",
    designation: "Senior Agronomist & Micro-Irrigation Specialist",
    phone: "9849789012",
    trade: "Agriculture",
    tradeKeywords: ["agriculture", "gardening", "floriculture", "irrigation", "farming"]
  },

  // Beauty & Wellness
  {
    id: "spk-beauty-01",
    name: "K. Sandhya",
    organization: "Naturals Academy (Telangana)",
    designation: "Master Esthetician & Salon Manager",
    phone: "9849890123",
    trade: "Beauty & Wellness",
    tradeKeywords: ["beauty", "wellness", "salon", "skincare", "hair styling"]
  },

  // Solar & Renewable Energy
  {
    id: "spk-solar-01",
    name: "B. Suresh Kumar",
    organization: "TSREDCO (Telangana Renewable Energy Corp)",
    designation: "Senior Solar Project Engineer",
    phone: "9849901234",
    trade: "Solar Energy",
    tradeKeywords: ["solar", "renewable", "photovoltaic", "energy", "panel"]
  }
];

export const getLecturersForTrade = (tradeName = "") => {
  if (!tradeName) return VERIFIED_GUEST_LECTURERS;
  const lower = tradeName.toLowerCase();
  const matched = VERIFIED_GUEST_LECTURERS.filter(spk => 
    spk.tradeKeywords.some(kw => lower.includes(kw)) ||
    lower.includes(spk.trade.toLowerCase())
  );
  return matched.length > 0 ? matched : VERIFIED_GUEST_LECTURERS;
};

