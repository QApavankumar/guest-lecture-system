const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Seed Users (with hashed passwords)
  const salt = await bcrypt.genSalt(10);
  const adminHashedPassword = await bcrypt.hash('admin123', salt);
  const vtHashedPassword = await bcrypt.hash('vt123', salt);

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: adminHashedPassword,
      name: 'State Academic Officer (Vocational)',
      role: 'ADMIN',
      roleLabel: 'State Administrator',
      department: 'Samagra Shiksha, Govt of Telangana',
      mobile: '9440198765'
    }
  });

  const vt = await prisma.user.upsert({
    where: { username: 'vt' },
    update: {},
    create: {
      username: 'vt',
      password: vtHashedPassword,
      name: 'K. Srikanth Rao',
      role: 'VT',
      roleLabel: 'Vocational Trainer',
      department: 'Department of School Education • ZPHS Medchal',
      trade: 'Information Technology (ITES)',
      schoolName: 'ZPHS Medchal High School',
      udiseCode: '28120100101',
      mobile: '9849012345'
    }
  });

  console.log('✅ Users seeded: admin & vt');

  // 2. Seed Verified Guest Lecturers
  const lecturers = [
    {
      id: "spk-it-01",
      name: "Ramesh Varma",
      organization: "Tech Mahindra (Hyderabad)",
      designation: "Principal Solutions Architect",
      phone: "9849123456",
      trade: "Information Technology",
      tradeKeywords: "information technology,ites,it,computer,cloud,python",
      isVerified: true
    },
    {
      id: "spk-it-02",
      name: "Dr. Ananya Reddy",
      organization: "Microsoft India R&D",
      designation: "Lead AI & Cloud Engineer",
      phone: "9849234567",
      trade: "Information Technology",
      tradeKeywords: "information technology,ites,it,ai,cloud",
      isVerified: true
    },
    {
      id: "spk-hc-01",
      name: "Dr. K. Srinivas",
      organization: "Yashoda Hospitals (Secunderabad)",
      designation: "Chief Medical Officer",
      phone: "9849345678",
      trade: "Healthcare",
      tradeKeywords: "healthcare,general duty,medical,hospital,nursing",
      isVerified: true
    },
    {
      id: "spk-hc-02",
      name: "Sister Mary Varghese",
      organization: "Apollo Institute of Nursing",
      designation: "Clinical Nursing Superintendent",
      phone: "9849456781",
      trade: "Healthcare",
      tradeKeywords: "healthcare,nursing,patient care,first aid",
      isVerified: true
    },
    {
      id: "spk-auto-01",
      name: "M. Venkat Rao",
      organization: "Mahindra & Mahindra (Zaheerabad)",
      designation: "Senior Technical Trainer (EV & Powertrain)",
      phone: "9849456789",
      trade: "Automotive",
      tradeKeywords: "automotive,two-wheeler,vehicle,automobile,ev",
      isVerified: true
    },
    {
      id: "spk-auto-02",
      name: "K. Suresh Babu",
      organization: "Bosch Authorized Service Center",
      designation: "Master Diagnostic Technician",
      phone: "9849567892",
      trade: "Automotive",
      tradeKeywords: "automotive,mechanic,engine,diagnostics",
      isVerified: true
    },
    {
      id: "spk-ret-01",
      name: "S. Lavanya",
      organization: "Reliance Retail Ltd (Telangana Region)",
      designation: "Regional Operations Manager",
      phone: "9849567890",
      trade: "Retail Management",
      tradeKeywords: "retail,store,merchandise,pos,customer service",
      isVerified: true
    },
    {
      id: "spk-elec-01",
      name: "P. Rajesh",
      organization: "ECIL (Electronics Corporation of India)",
      designation: "Lead Embedded Hardware Engineer",
      phone: "9849678901",
      trade: "Electronics & Hardware",
      tradeKeywords: "electronics,hardware,circuit,embedded,pcb",
      isVerified: true
    },
    {
      id: "spk-agri-01",
      name: "Dr. G. Ramana",
      organization: "PJTSAU (Prof. Jayashankar Agri University)",
      designation: "Senior Agronomist & Micro-Irrigation Specialist",
      phone: "9849789012",
      trade: "Agriculture",
      tradeKeywords: "agriculture,gardening,floriculture,irrigation,farming",
      isVerified: true
    },
    {
      id: "spk-beauty-01",
      name: "K. Sandhya",
      organization: "Naturals Academy (Telangana)",
      designation: "Master Esthetician & Salon Manager",
      phone: "9849890123",
      trade: "Beauty & Wellness",
      tradeKeywords: "beauty,wellness,salon,skincare,hair styling",
      isVerified: true
    },
    {
      id: "spk-solar-01",
      name: "B. Suresh Kumar",
      organization: "TSREDCO (Telangana Renewable Energy Corp)",
      designation: "Senior Solar Project Engineer",
      phone: "9849901234",
      trade: "Solar Energy",
      tradeKeywords: "solar,renewable,photovoltaic,energy,panel",
      isVerified: true
    }
  ];

  for (const lecturer of lecturers) {
    await prisma.guestLecturer.upsert({
      where: { id: lecturer.id },
      update: lecturer,
      create: lecturer
    });
  }
  console.log(`✅ Seeded ${lecturers.length} verified guest lecturers`);

  // 3. Seed Initial Sample Requisitions
  const requests = [
    {
      id: "GLR-2026-001",
      district: "Medchal-Malkajgiri",
      mandal: "Medchal",
      village: "Medchal Town",
      schoolName: "ZPHS Boys Medchal",
      udiseCode: "36210100501",
      trade: "Information Technology / ITeS",
      tradeCode: "IT-402",
      vtName: "K. Sravan Kumar",
      vtMobile: "9848022338",
      lectureDate: "2026-03-24",
      topic: "Cloud Computing Basics & Python in IT Services",
      status: "Pending",
      assignedSpeaker: "",
      notes: "Requires projector and internet setup in the computer lab."
    },
    {
      id: "GLR-2026-002",
      district: "Rangareddy",
      mandal: "Serilingampally",
      village: "Madhapur",
      schoolName: "ZPHS Serilingampally",
      udiseCode: "36200201001",
      trade: "Healthcare / General Duty Assistant",
      tradeCode: "HC-413",
      vtName: "M. Radhika",
      vtMobile: "9959144820",
      lectureDate: "2026-03-26",
      topic: "Emergency First Aid & Patient Triage Demonstration",
      status: "Approved",
      assignedSpeaker: "Dr. B. Raman (Apollo Hospitals Community Outreach)",
      notes: "Session scheduled for 10th class vocational students."
    },
    {
      id: "GLR-2026-003",
      district: "Hyderabad",
      mandal: "Khairatabad",
      village: "Somajiguda",
      schoolName: "Govt High School Punjagutta",
      udiseCode: "36010100101",
      trade: "Retail Management",
      tradeCode: "RM-401",
      vtName: "P. Rajeshwari",
      vtMobile: "9440156789",
      lectureDate: "2026-03-28",
      topic: "Point-of-Sale (POS) Operations & Modern Store Display",
      status: "Approved",
      assignedSpeaker: "Sri G. Naresh (Retail Operations Head, D-Mart)",
      notes: "Invited speaker will bring sample barcodes and scanner devices."
    },
    {
      id: "GLR-2026-004",
      district: "Warangal",
      mandal: "Warangal",
      village: "Hanamkonda",
      schoolName: "Govt Markazi High School Hanamkonda",
      udiseCode: "36230101301",
      trade: "Automotive / Two-Wheeler Tech",
      tradeCode: "AT-404",
      vtName: "T. Srinivas",
      vtMobile: "9866123450",
      lectureDate: "2026-04-02",
      topic: "Electric Vehicle (EV) Powertrain Maintenance & Safety",
      status: "Pending",
      assignedSpeaker: "",
      notes: "Hands-on EV kit requested from district resource center."
    },
    {
      id: "GLR-2026-005",
      district: "Karimnagar",
      mandal: "Karimnagar",
      village: "Kothapally",
      schoolName: "ZPHS Kothapally",
      udiseCode: "36240101602",
      trade: "Agriculture / Floriculture & Gardening",
      tradeCode: "AG-408",
      vtName: "Ch. Anitha",
      vtMobile: "9701445566",
      lectureDate: "2026-03-20",
      topic: "Hydroponics & Drip Irrigation Micro-Gardening",
      status: "Completed",
      assignedSpeaker: "Dr. K. Sudheer (KVK Karimnagar)",
      notes: "Completed successfully with 48 students in attendance."
    }
  ];

  for (const req of requests) {
    await prisma.requisition.upsert({
      where: { id: req.id },
      update: req,
      create: req
    });
  }
  console.log(`✅ Seeded ${requests.length} sample requisitions`);

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

