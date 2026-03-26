export interface Doctor {
  id: string
  name: string
  credentials: string
  role: string
  tagline: string
  bio: string
  image: string | null
  socialLinks?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
    website?: string
  }
  specialties: string[]
  education: {
    degree: string
    institution: string
    year?: string
    details?: string
  }[]
  experience: {
    title: string
    organization: string
    period: string
    location?: string
    responsibilities?: string[]
  }[]
  certifications: {
    name: string
    issuer?: string
    year?: string
  }[]
  trainings: {
    name: string
    provider?: string
    year?: string
  }[]
  skills: string[]
  languages: string[]
  volunteerWork: {
    role: string
    organization: string
    period?: string
    description?: string
  }[]
  publications?: string[]
  contact?: {
    email?: string
    phone?: string
    linkedin?: string
  }
  references?: {
    name: string
    title: string
    organization: string
    email?: string
    phone?: string
  }[]
  memberships?: {
    organization: string
    role?: string
    since?: string
  }[]
}

export const doctors: Doctor[] = [
  {
    id: "dr-melat",
    name: "Dr. Melat Mesfin",
    credentials: "MD, MPH",
    role: "Co-Founder & Co-host",
    tagline: "Public Health Expert | AI in Medicine | Research & Data Analysis",
    bio: "Dr. Melat Mesfin is a medical and public health expert with extensive experience in research, data analysis, and emergency response. Skilled in evaluating complex medical data and ensuring the accuracy of health-related content, she is passionate about the intersection of AI and medicine. With experience in qualitative research, data validation, and evidence-based medical assessments, Dr. Melat brings a unique blend of clinical expertise and public health knowledge to እነሆ እኛ (Eneho Egna).",
    image: "/dr-melat.jpg",
    specialties: [
      "Public Health",
      "Reproductive Health",
      "AI in Medicine",
      "Medical Research",
      "Data Analysis",
      "Health Communication"
    ],
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Yekatit 12 Hospital Medical College",
        year: "2022",
        details: "Addis Ababa, Ethiopia"
      },
      {
        degree: "Master of Public Health (MPH)",
        institution: "Addis Ababa University",
        year: "2019",
        details: "Reproductive and Family Health"
      },
      {
        degree: "Bachelor of Science (BSc)",
        institution: "University of Gondar",
        year: "2014",
        details: "Public Health"
      }
    ],
    experience: [
      {
        title: "Co-host & Co-producer",
        organization: "እነሆ እኛ (Eneho Egna) Medical Podcast",
        period: "June 2024 - Present",
        location: "Addis Ababa",
        responsibilities: [
          "Utilizing AI-assisted tools for medical data analysis and research",
          "AI applications in healthcare including prompt-based information retrieval",
          "Content validation and ethical considerations in AI-driven decision-making"
        ]
      },
      {
        title: "GBV Consultant",
        organization: "Viamo Inc, World Bank UPSNJP Project",
        period: "April - August 2024",
        location: "Addis Ababa",
        responsibilities: [
          "Technical assistance in collecting and entering data during calls",
          "Escalating issues under grievance/CRM tools direction",
          "Providing advice on healthy behaviours and recommended practices",
          "Maintaining database of cases/grievances and executing GBV trainings"
        ]
      },
      {
        title: "Training Coordinator & SRH Counselor",
        organization: "Private Health Care Consultancy & YWCA",
        period: "May 2023 - March 2024",
        location: "Addis Ababa",
        responsibilities: [
          "Designed and developed training materials and manuals",
          "Coordinated training initiatives including scheduling and logistics",
          "Facilitated interactive workshops and seminars on public health topics",
          "Safe Space Volunteer Counselor for young women on GBV, SRH, HIV and STI"
        ]
      },
      {
        title: "Research Assistant",
        organization: "AMREF, ACEPS, Engender Health",
        period: "2019 - 2025",
        location: "Addis Ababa",
        responsibilities: [
          "Conducted qualitative and quantitative data analysis to validate medical information",
          "Evaluated research findings for accuracy and reliability",
          "Expert review of medical and epidemiological data",
          "Disease surveillance reports with high accuracy standards"
        ]
      },
      {
        title: "National Public Health Emergency Contact Center Officer",
        organization: "Ethiopian Public Health Institute (EPHI)",
        period: "September 2020 - September 2022",
        location: "Addis Ababa",
        responsibilities: [
          "COVID-19 Response Team member",
          "Received and documented rumors related to COVID-19 and reportable diseases",
          "Real-time health data assessment and accurate information dissemination",
          "Collaborated with government and non-government officials on strategic initiatives"
        ]
      },
      {
        title: "OPD Physician & Family Planning Service Provider",
        organization: "Emmanuel Development Association",
        period: "November 2014 - November 2015",
        location: "Ethiopia",
        responsibilities: [
          "Diagnosis and treatment of communicable and non-communicable diseases",
          "Counselling and informed decision making support for women on family planning"
        ]
      }
    ],
    certifications: [
      { name: "Disability Inclusion in Humanitarian Coordination", issuer: "Certified" },
      { name: "Mental Health and Psychosocial Support on E-Counseling", issuer: "Certified" },
      { name: "Risk Communication and Community Engagement", issuer: "Certified" }
    ],
    trainings: [
      { name: "Medical Content Review & Evaluation" },
      { name: "AI-generated Content Validation" },
      { name: "Medical Data Interpretation & Accuracy Assessment" },
      { name: "SPSS, STATA, Epi-Info Statistical Analysis" },
      { name: "KoBoCollect Data Collection" },
      { name: "Gender-Based Violence (GBV) Training" }
    ],
    skills: [
      "Medical Research",
      "Data Analysis (SPSS, STATA, Epi-Info)",
      "AI in Healthcare",
      "Public Health",
      "Reproductive Health",
      "Medical Content Creation",
      "Training & Facilitation",
      "Leadership & Team Management",
      "Problem Solving",
      "Microsoft Office Suite"
    ],
    languages: ["Amharic (Native)", "English (Fluent)", "Spanish (Beginner)"],
    volunteerWork: [
      {
        role: "Co-host & Medical Expert",
        organization: "እነሆ እኛ (Eneho Egna) Podcast",
        period: "June 2024 - Present",
        description: "Co-founder and host of health education podcast reaching 57K+ followers across YouTube, TikTok, and social media"
      },
      {
        role: "Safe Space Volunteer Counselor",
        organization: "Young Women's Christian Association (YWCA)",
        period: "2023 - 2024",
        description: "Providing psychosocial support on GBV, SRH, HIV and STI; peer dialogue facilitation for girls and young women"
      },
      {
        role: "Community Health Trainer",
        organization: "Various Organizations",
        description: "Menstrual health and hygiene trainings, cancer awareness programs, and health education sessions"
      }
    ],
    contact: {
      email: "Mesfinmelat1@gmail.com",
      phone: "+251913846500",
      linkedin: "linkedin.com/in/melat-mesfin"
    },
    references: [
      {
        name: "Dr. Ashenafi Zelalem",
        title: "Public Health and Research Coordinator, Former National Public Health Emergency Contact Center Supervisor",
        organization: "Myung Sung Medical College / Ethiopian Public Health Institute",
        email: "emailofashenafi@gmail.com",
        phone: "+251912045664"
      },
      {
        name: "Dr. Bisratemariam Gebre",
        title: "Safe Space Focal Person",
        organization: "Young Women Christian Association (YWCA)",
        email: "bisratemariamgebre3@gmail.com",
        phone: "+251913602260"
      },
      {
        name: "Dr. Simon Yigremachew",
        title: "Research Coordinator",
        organization: "AMREF",
        email: "simonyigremachew8@gmail.com",
        phone: "+251921618677"
      }
    ]
  },
  {
    id: "dr-tigist",
    name: "Dr. Tigist Kahsay",
    credentials: "MD",
    role: "Co-Founder & Co-host",
    tagline: "Emergency & Dialysis Specialist | Telemedicine Expert | Health Advocate",
    bio: "Dr. Tigist Kahsay is an accomplished physician specializing in emergency medicine and dialysis care at Girum Hospital. With extensive experience in both emergency and non-emergency care, she has developed expertise in telemedicine, providing healthcare services to individuals with limited access to health facilities. As a co-founder of እነሆ እኛ (Eneho Egna), she combines her clinical expertise with a passion for health education, reaching thousands through digital platforms.",
    image: "/dr-tigist.jpg",
    specialties: [
      "Emergency Medicine",
      "Dialysis Care",
      "Telemedicine",
      "Internal Medicine",
      "TB/HIV Care",
      "Primary Care"
    ],
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Jimma University Medical College",
        year: "2014 - 2021",
        details: "Including Medical Internship with research on Medical Interns' attitudes towards future practice"
      },
      {
        degree: "Virtual Assistants Program",
        institution: "ALX Africa",
        year: "2022",
        details: "Digital skills and virtual assistance training"
      },
      {
        degree: "Guideline Based Hemodialysis",
        institution: "Ethiopian Kidney Association",
        year: "2023",
        details: "Specialized dialysis training"
      },
      {
        degree: "National Comprehensive TBL and TB/HIV",
        institution: "Menelik II Medical College & Addis Ababa Health Bureau & CDC",
        year: "2023"
      }
    ],
    experience: [
      {
        title: "General Practitioner - Emergency Room & Dialysis Center",
        organization: "Girum Hospital",
        period: "March 2023 - Present",
        location: "Addis Ababa",
        responsibilities: [
          "First line physician at Emergency Room and Dialysis Center",
          "Conducting physical examinations and reviewing medical histories",
          "Ordering diagnostic tests to diagnose and treat wide range of conditions",
          "Comprehensive patient care including preventive medicine and primary care",
          "Collaborating with multidisciplinary teams for optimal treatment outcomes"
        ]
      },
      {
        title: "Head of Emergency Unit & General Practitioner",
        organization: "St Urael Internal Medicine Specialty Clinic",
        period: "March 2022 - March 2023",
        location: "Addis Ababa",
        responsibilities: [
          "Developed manuals and policies for Emergency Department operations",
          "Provided emergency and non-emergency care with critical decisions in fast-paced environment",
          "Medical care and follow-up for TB patients",
          "Stabilized patients with life-threatening conditions and facilitated specialty referrals"
        ]
      },
      {
        title: "Telemedicine Specialist",
        organization: "St Urael Internal Medicine Specialty Clinic",
        period: "November 2022 - March 2023",
        location: "Addis Ababa",
        responsibilities: [
          "Provided remote healthcare services for individuals with limited access to health facilities",
          "Served patients in rural areas and those with mobility constraints"
        ]
      },
      {
        title: "Medical Intern",
        organization: "Jimma University Medical College",
        period: "September 2020 - September 2021",
        location: "Jimma",
        responsibilities: [
          "History taking and physical examination",
          "Diagnostic and therapeutic procedures",
          "Patient management across departments"
        ]
      }
    ],
    certifications: [
      { name: "Guideline-Based Hemodialysis", issuer: "Ethiopian Kidney Association", year: "2023" },
      { name: "National Comprehensive TBL and TB/HIV", issuer: "Menelik II Medical College & CDC", year: "2023" },
      { name: "Virtual Assistants Certificate", issuer: "ALX Africa", year: "2022" }
    ],
    trainings: [
      { name: "Emergency Medicine Protocols & Manual Development" },
      { name: "Telemedicine Service Delivery" },
      { name: "TB Patient Care and Follow-up" },
      { name: "Dialysis Care Management" }
    ],
    skills: [
      "Emergency Medicine",
      "Dialysis Care",
      "Telemedicine",
      "Critical Decision Making",
      "Team Leadership",
      "Patient Communication",
      "Microsoft Office Suite",
      "Social Media",
      "Critical Thinking",
      "Time Management"
    ],
    languages: [
      "Amharic (Native)",
      "English (Proficient - C1/C2)",
      "Oromifa (Basic - A2)",
      "Tigrigna (Intermediate - B1/B2)"
    ],
    volunteerWork: [
      {
        role: "Co-host & Medical Expert",
        organization: "እነሆ እኛ (Eneho Egna) Podcast",
        period: "2024 - Present",
        description: "Co-founder and host of health education podcast reaching 57K+ followers"
      },
      {
        role: "Health Education Volunteer",
        organization: "GIV Ethiopia",
        period: "November 2021",
        description: "Awarded certificate of appreciation for volunteering and providing health education on neural tube defects at World Spinal Bifida and Hydrocephalus Day"
      },
      {
        role: "Life Time Member",
        organization: "Ethiopia Red Cross Society",
        period: "November 2023 - Present",
        description: "Active member contributing to humanitarian health initiatives"
      }
    ],
    publications: [
      "Perspective of Medical Interns In Jimma University Medical Center towards Their Future Medical Practice (2021) - Research on Medical Interns' Attitude towards future practice and Associated Factors"
    ],
    contact: {
      email: "tigistkahsay946@gmail.com",
      phone: "+251913581430"
    },
    references: [
      {
        name: "Dr. Demosew Amenu (MD)",
        title: "Associate Professor of Obstetrics & Gynecology, Urogynecologist",
        organization: "Jimma University",
        email: "demisew5@gmail.com",
        phone: "+251911811468"
      },
      {
        name: "Dr. Tilahun Habte (MD)",
        title: "Associate Professor of GI Surgery and GI Oncology",
        organization: "Medical University",
        email: "doittlishun@gmail.com",
        phone: "+924823760"
      },
      {
        name: "Dr. Murad Muhammed (MD)",
        title: "Internist, Medical Director",
        organization: "St Urael Internal Medicine Specialty Clinic",
        email: "Wishmed@gmail.com",
        phone: "+251911829370"
      }
    ],
    memberships: [
      {
        organization: "Ethiopian Kidney Association",
        role: "Member",
        since: "October 2023"
      },
      {
        organization: "Ethiopian Medical Association",
        role: "Member",
        since: "January 2015"
      }
    ]
  },
  {
    id: "dr-birucketawit",
    name: "Dr. Birucketawit Alebachew",
    credentials: "MD, BSc",
    role: "Co-Founder & Co-host",
    tagline: "Public Health Professional | Quality Control Expert | Project Management",
    bio: "Dr. Birucketawit Alebachew is a medical doctor and public health professional with strong experience in healthcare service delivery, quality control, academic support, and project management. Skilled in analyzing complex systems, coordinating teams, and improving processes, she is passionate about leveraging problem-solving, leadership, and project management expertise to drive innovation in health and technology. As a co-founder of እነሆ እኛ (Eneho Egna), she combines her clinical expertise with a commitment to health education and community wellness.",
    image: "/dr-birucketawit.jpg",
    specialties: [
      "Public Health",
      "Quality Control",
      "Project Management",
      "Healthcare Delivery",
      "Medical Education",
      "Health Policy"
    ],
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Yirgalem Hospital Medical College",
        year: "2018 - 2023",
        details: "Ethiopia"
      },
      {
        degree: "Bachelor of Science in Public Health (BSc)",
        institution: "University of Gondar",
        year: "2011 - 2014",
        details: "Ethiopia"
      }
    ],
    experience: [
      {
        title: "General Practitioner",
        organization: "Kotebe Health Center",
        period: "January 2025 - Present",
        location: "Addis Ababa",
        responsibilities: [
          "Delivered patient-centered care through diagnosis and management of illnesses",
          "Counseled on preventive health strategies, exercise, and nutrition",
          "Coordinated schedules and departmental activities to improve service efficiency"
        ]
      },
      {
        title: "Graduate Assistant in Medicine",
        organization: "Pioneer College",
        period: "November 2023 - January 2025",
        location: "Addis Ababa",
        responsibilities: [
          "Supported students in research proposal and manuscript development",
          "Collaborated with faculty on academic projects and training sessions",
          "Designed and facilitated laboratory sessions, assignments, and assessments",
          "Streamlined administrative tasks to enhance faculty productivity"
        ]
      },
      {
        title: "Health Facilities Quality Control Officer",
        organization: "Kirkos Sub-City Woreda 07, FMHACA Office",
        period: "October 2015 - November 2018",
        location: "Addis Ababa",
        responsibilities: [
          "Conducted inspections of health facilities to ensure compliance with national standards",
          "Implemented corrective actions and enforced licensing requirements",
          "Evaluated infrastructure, personnel, and service delivery against benchmarks",
          "Investigated non-compliance issues and drove improvements"
        ]
      }
    ],
    certifications: [
      { name: "Project Management", issuer: "Addis Ababa University, College of Commerce" },
      { name: "Effective Teaching Skills", issuer: "Pioneer College CPD Center" },
      { name: "Video Editing", issuer: "Donkey Tube" }
    ],
    trainings: [
      { name: "Project Management & Process Optimization" },
      { name: "Healthcare Quality Control Standards" },
      { name: "Medical Education & Teaching Methods" },
      { name: "Research & Data Analysis" }
    ],
    skills: [
      "Project Management",
      "Process Optimization",
      "Leadership",
      "Team Facilitation",
      "Communication",
      "Problem Solving",
      "Critical Thinking",
      "Research & Data Analysis",
      "Quality Control",
      "Healthcare Management"
    ],
    languages: [
      "Amharic (Native)",
      "English (Fluent)",
      "French (Beginner)"
    ],
    volunteerWork: [
      {
        role: "Co-founder & Co-host",
        organization: "እነሆ እኛ (Eneho Egna) Podcast",
        period: "2024 - Present",
        description: "Co-founder of health and lifestyle awareness podcast reaching 57K+ followers across social media platforms"
      },
      {
        role: "Active Member",
        organization: "Ethiopian Orthodox Tewahedo Medical Association (EOTMA)",
        description: "Contributing to faith-based medical community initiatives and healthcare outreach"
      }
    ],
    contact: {
      email: "burekthana@gmail.com",
      phone: "+251920006807",
      linkedin: "linkedin.com/in/BirucketawitAlebachew"
    },
    references: [
      {
        name: "Dr. Biniam Sirak",
        title: "Gynecologist & Urogynecology Subspecialist",
        organization: "Hamlin Fistula Center, Yirgalem Hospital Medical College",
        email: "biniam.s@hamlinfistula.org",
        phone: "+251911384899"
      },
      {
        name: "Dr. Melat Mesfin",
        title: "General Manager",
        organization: "Tena First Plus",
        email: "Mesfinmelat1@gmail.com",
        phone: "+251913846500"
      },
      {
        name: "Henok Hailu",
        title: "Healthcare Accreditation Program Lead",
        organization: "Ministry of Health Ethiopia",
        email: "henok.hailu@moh.gov.et",
        phone: "+251912233637"
      }
    ],
    memberships: [
      {
        organization: "Ethiopian Orthodox Tewahedo Medical Association (EOTMA)",
        role: "Active Member"
      }
    ]
  }
]

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find(doctor => doctor.id === id)
}

export function getAllDoctorIds(): string[] {
  return doctors.map(doctor => doctor.id)
}
