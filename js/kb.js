/* ============================================================
   Knowledge base for "Ask my résumé".
   Single source of truth for the chat panel. Every answer the
   local engine gives is composed ONLY from `facts` text below.
   ============================================================ */

window.RESUME_KB = {
  meta: {
    name: "Prabin Mishra",
    email: "prabinmishra87@gmail.com",
    linkedin: "https://www.linkedin.com/in/prabinmishra",
    github: "https://github.com/prabin-mishra"
  },

  anchors: {
    "#top": "Top of page",
    "#impact": "Impact metrics",
    "#strengths": "Signature strengths",
    "#supply-chain": "Supply chain, end to end",
    "#progression": "Career progression",
    "#experience": "Career timeline",
    "#projects": "Project case studies",
    "#side-projects": "Side projects",
    "#skills": "Skills",
    "#credentials": "Certifications & education",
    "#contact": "Contact"
  },

  /* Map query-token variants to canonical tags used in facts. */
  synonyms: {
    llm: "ai", genai: "ai", ml: "ai", chatgpt: "gpt", gpts: "gpt", intelligence: "ai",
    copilot: "ai", agents: "agent", agentic: "agent", bots: "agent", bot: "agent",
    dubai: "uae", emirates: "uae", relocate: "relocation", relocating: "relocation",
    abroad: "relocation", move: "relocation", moving: "relocation",
    university: "education", college: "education", degree: "education", mba: "education",
    school: "education", studied: "education", study: "education", academic: "education",
    certified: "certification", certifications: "certification", certificate: "certification",
    certs: "certification", credentials: "certification",
    executives: "stakeholder", executive: "stakeholder", cxo: "stakeholder",
    cfo: "stakeholder", csuite: "stakeholder", leadership: "stakeholder", board: "stakeholder",
    apis: "api", endpoints: "api", endpoint: "api", integrations: "api", integration: "api",
    headless: "api", composable: "api",
    squad: "team", engineers: "team", engineer: "team", managed: "team", manage: "team",
    lead: "team", led: "team", leading: "team", people: "team", reports: "team",
    lastmile: "logistics", parcel: "logistics", parcels: "logistics", delivery: "logistics",
    deliveries: "logistics", shipping: "logistics", ports: "logistics", port: "logistics",
    freight: "logistics", transport: "logistics", transportation: "logistics", cep: "logistics",
    warehouse: "logistics", warehousing: "logistics", warehouses: "logistics", terminal: "logistics",
    terminals: "logistics", ocean: "logistics", carrier: "logistics", carriers: "logistics",
    forwarder: "logistics", forwarding: "logistics", yard: "logistics", container: "logistics",
    containers: "logistics", "supplychain": "logistics", chain: "logistics",
    kpi: "impact", kpis: "impact", metrics: "impact", metric: "impact", numbers: "impact",
    results: "impact", outcomes: "impact", quantified: "impact",
    scrum: "agile", safe: "agile", kanban: "agile", sprint: "agile", sprints: "agile",
    jira: "agile", ceremonies: "agile", refinement: "agile",
    tableau: "data", sql: "data", dashboards: "data", dashboard: "data", analytics: "data",
    azure: "cloud", aws: "cloud", migration: "cloud", saas: "cloud",
    tata: "tcs", bistrack: "epicor", erp: "erp",
    progression: "career", progress: "career", promoted: "career", promotion: "career",
    promotions: "career", trajectory: "career", ladder: "career", path: "career",
    achievements: "achievement", accomplishment: "achievement", accomplishments: "achievement",
    wins: "achievement", highlight: "achievement", highlights: "achievement",
    backlog: "product", roadmap: "product", stories: "product", prioritization: "product"
  },

  facts: [
    { id: "identity", tags: ["who", "profile", "summary", "product", "owner", "manager"], anchor: "#top",
      text: "Prabin Mishra is a Senior Product Owner / Product Manager focused on supply chain & logistics software and the enterprise B2B SaaS ERP underneath it — now AI-forward. He's based in Whitefield, Bengaluru, India, and at home working anywhere in the world." },

    { id: "chain-coverage", tags: ["supply", "chain", "logistics", "ocean", "freight", "port", "terminal", "warehouse", "lastmile", "domain", "coverage"], anchor: "#supply-chain",
      text: "He has shipped product against every link of the physical chain: ocean freight and carriers (Maersk, UPS, DHL Global Forwarding, AET Tankers), ports and terminals (transport-document digitization for port operators), warehousing and distribution (inventory, stock receipts, purchasing / AP and order management on Epicor BisTrack Web), transport and distribution planning, and last-mile / CEP execution for PostNord." },

    { id: "experience-years", tags: ["experience", "years", "career", "long"], anchor: "#experience",
      text: "He has 15+ years of total experience (since 2010), with 8+ years focused on product ownership and product management." },

    { id: "timeline-summary", tags: ["career", "timeline", "history", "companies", "employers"], anchor: "#experience",
      text: "Career path: TCS, Systems Engineer (2010–14) → Great Lakes Institute of Management, PGPM/MBA (2014–15) → TCS, Business Consultant / Business Analyst, Transportation Practice (2015–18) → TCS, Technical Product Owner, Nordic Distribution Mobility (2018–21) → Accenture, Associate Manager (Apr–Sep 2021) → Epicor, Product Owner, BisTrack Web (Sep 2021–present)." },

    { id: "progression", tags: ["career", "progression", "timeline", "seniority", "levels", "growth"], anchor: "#progression",
      text: "The progression is five steps and one deliberate pause: Step 1 operate — Systems Engineer running 320+ middleware interfaces 24×7 (TCS, 2010–14); a pivot to retool — full-time PGPM/MBA, Magna Cum Laude (Great Lakes, 2014–15); Step 2 analyse — Business Consultant / BA in TCS's Transportation Practice, 10+ strategic customers and a $50M business case adopted (2015–18); Step 3 own a product — Technical Product Owner for PostNord, 2–4 products and up to 10,000 daily users across 3 countries (TCS, 2018–21); Step 4 lead teams — Associate Manager leading consulting teams (Accenture, 2021); Step 5 own a platform — Product Owner of BisTrack Web at Epicor, where he leads the web product (vision, roadmap and a 1,400+ story backlog, now live at 50+ branches across 20+ customers), built and trained the business-analyst and design team that carried the migration, directs 10–20 engineers and is delivering the ~6,000-endpoint API platform (2021–present). Each step added a layer of ownership: the system, then the analysis, then the product, then the team, then the platform." },

    { id: "case-studies", tags: ["projects", "cases", "work", "portfolio", "builds", "achievement"], anchor: "#projects",
      text: "Five project case studies carry the record: (1) the BisTrack API platform — ~6,000 endpoints across 1,000 API groups, specified with an AI agent he built, now in controlled release with a pilot customer seeing success; (2) the on-prem → cloud SaaS migration of BisTrack — vision, roadmap and a 1,400+ story backlog, a BA and design team built and trained to carry it, the web product now live at 50+ branches across 20+ customers, order creation ~7% faster, journey planning +4%, two new categories live; (3) PostNord last-mile and distribution planning — 6% fewer failed deliveries, ~4% loading-time efficiency per parcel, 10,000 daily users; (4) the $50M transport-document digitization business case — adopted by leadership and converted into a customer deal; (5) the AET Tankers executive BI platform — Power BI dashboards the CFO and CXOs were trained on and moved onto." },

    { id: "current-role", tags: ["epicor", "erp", "current", "role", "job", "product", "cloud"], anchor: "#experience",
      text: "Since Sep 2021 he is Product Owner of BisTrack Web at Epicor — the cloud SaaS successor to BisTrack, Epicor's distribution ERP for wholesale distribution & building materials, whose legacy product still serves 1,300+ customers. He leads the web product, owning its vision, roadmap and 1,400+ user-story backlog and prioritizing the legacy on-prem → cloud SaaS migration with C-suite/VP stakeholders across Product, Engineering and Sales — and the web product is now live at 50+ branches across 20+ customers. He also delivers enhancements to the legacy BisTrack product in parallel, so the 1,300+ customers still on it keep improving while the migration runs." },

    { id: "api-platform", tags: ["api", "achievement", "flagship", "epicor", "agent", "ai"], anchor: "#experience",
      text: "Flagship: he leads design → specification → delivery of BisTrack's API platform — ~6,000 endpoints across 1,000 API groups — exposing the full ERP for integrations, partner extensibility and composable / headless ERP. He built an AI agent that automates endpoint analysis and specification authoring, compressing the design cycle for a platform of this scale. The platform is in controlled release, with a pilot customer already seeing success." },

    { id: "team", tags: ["team", "epicor", "hiring", "mentoring", "design"], anchor: "#experience",
      text: "At Epicor he directs a cross-functional squad of 10–20 engineers through sprint planning, backlog refinement and release ceremonies — and he built the team that carried the web migration itself: a group of business analysts and a designer who moved legacy features onto the new Web UX, whom he trained to analyze and implement new requirements on their own." },

    { id: "epicor-metrics", tags: ["impact", "epicor", "order", "achievement"], anchor: "#impact",
      text: "At Epicor he improved order creation time by ~7% and advanced journey planning by 4%, addressing top customer pain points." },

    { id: "ai-tools", tags: ["ai", "gpt", "agent", "automation", "tools"], anchor: "#experience",
      text: "He built and championed Custom GPTs and Copilot Studio agents that automate backlog-grooming support, release-note drafting and internal knowledge management — plus an AI agent that automates API endpoint analysis and specification authoring." },

    { id: "epicor-categories", tags: ["epicor", "product", "category", "growth", "revenue"], anchor: "#experience",
      text: "He onboarded two new product categories post web-migration: appliances (to win new customers) and rolled goods (to grow revenue from existing distribution segments)." },

    { id: "epicor-ap-edi", tags: ["epicor", "erp", "edi", "invoice", "stock", "ux"], anchor: "#experience",
      text: "He enabled manual order-line processing within AP automation, improved stock-receipt creation via EDI, eliminated duplicate stock-receipt creation, and shipped UX theming to distinguish production vs non-production environments." },

    { id: "erp-depth", tags: ["erp", "domain", "inventory", "order", "distribution"], anchor: "#strengths",
      text: "His ERP depth covers order-to-cash, order management, distribution, purchasing / AP and inventory — on a distribution ERP whose legacy product serves 1,300+ customers, with the cloud web successor live at 50+ branches across 20+ customers." },

    { id: "nordic-role", tags: ["tcs", "logistics", "mobile", "nordic", "postnord", "product", "team", "user"], anchor: "#experience",
      text: "Nov 2018 – Apr 2021, as Technical Product Owner at TCS (Nordic Distribution Mobility) he owned 2–4 simultaneous products (iOS / Android + web) for distribution planning and last-mile execution for PostNord, the Nordic logistics / CEP leader — up to 10,000 daily users across 3 countries." },

    { id: "nordic-metrics", tags: ["impact", "logistics", "tcs", "achievement", "stakeholder", "agile"], anchor: "#experience",
      text: "In the Nordic role he achieved ~4% loading-time efficiency per parcel and a 6% reduction in failed deliveries via root-cause analysis on poor KPIs, ran roadmap reviews with C-suite/VP stakeholders in Stockholm, and ran full Agile / Scrum ceremonies across distributed India–Sweden teams." },

    { id: "business-case", tags: ["achievement", "business", "case", "tcs", "logistics", "consulting", "impact"], anchor: "#experience",
      text: "At TCS Transportation Practice (Jun 2015 – Nov 2018) he built a $50M business case for a logistics technology product (transport-document digitization) targeting Shipping, Port Operators and Postal / Logistics customers — adopted by leadership and it led to a customer deal." },

    { id: "consulting", tags: ["consulting", "tcs", "customer", "o2c", "analysis", "maersk", "dhl"], anchor: "#experience",
      text: "He partnered with 10+ strategic customers across geographies — including Maersk, UPS and DHL Global Forwarding — on O2C / R2R process consulting, business analysis and product management." },

    { id: "bi-platform", tags: ["data", "tcs", "stakeholder", "microsoft", "aet"], anchor: "#experience",
      text: "In 2017–18 (Singapore / Houston) he gathered requirements for a digital BI platform on the Microsoft BI stack, designed executive Power BI dashboards, and trained the Executive Leadership Team (incl. CFO / CXOs) of AET Tankers, a global tanker owner-operator." },

    { id: "logistics-clients", tags: ["clients", "maersk", "dhl", "postnord", "aet", "logistics", "brands"], anchor: "#strengths",
      text: "His logistics & supply chain track record spans the industry's biggest names: Maersk, UPS and DHL Global Forwarding (TCS Transportation Practice consulting), PostNord (Nordic distribution mobility products) and AET Tankers (executive BI platform)." },

    { id: "accenture", tags: ["accenture", "consulting", "healthcare", "pharma", "retail"], anchor: "#experience",
      text: "Apr – Sep 2021 he was Associate Manager at Accenture (Living Systems Advisory), leading consulting teams on maturity assessments and business-transformation engagements for pharma, retail and US healthcare clients." },

    { id: "tcs-early", tags: ["tcs", "engineer", "middleware", "automotive", "technical"], anchor: "#experience",
      text: "Aug 2010 – Mar 2014, as Systems Engineer at TCS (Global Integration Factory) he ran the offshore team operating 320+ middleware interfaces for the world's largest automaker, ensuring 24×7 near-zero-downtime trade-management." },

    { id: "education-mba", tags: ["education", "greatlakes", "marketing"], anchor: "#credentials",
      text: "PGPM / MBA — Great Lakes Institute of Management, Chennai (2014–2015). CGPA 3.6/4, Magna Cum Laude, Dean's List. Major: Marketing; Minor: Business Analytics." },

    { id: "education-btech", tags: ["education", "kiit", "engineering"], anchor: "#credentials",
      text: "B.Tech in Electronics & Telecommunication Engineering — KIIT University, Bhubaneswar (2006–2010). CGPA 8.55/10, Honours." },

    { id: "certs-ai", tags: ["certification", "ai", "agent", "gpt"], anchor: "#credentials",
      text: "AI credentials: Professional Scrum Product Owner — AI Essentials (Scrum.org); Agentic AI and AI Agents: A Primer for Leaders (Vanderbilt, 2025); Prompt Engineering for ChatGPT (Vanderbilt, 2025); Getting Started with Autonomous Agents in Copilot Studio (LinkedIn Learning, 2025)." },

    { id: "certs-product", tags: ["certification", "product", "cloud"], anchor: "#credentials",
      text: "Product & other credentials: PSPO I (Scrum.org), CSPO (Scrum Alliance), Product-led Certification (Pendo.io, 2025), Microsoft Azure Fundamentals AZ-900 (2022), CSCMP Supply Chain Foundations, ITIL v3 Foundation, IIBA-endorsed Business Analysis, Corporate Finance Essentials (IESE / Coursera)." },

    { id: "skills-product", tags: ["skills", "product", "strategy", "discovery", "okr"], anchor: "#skills",
      text: "Product skills: strategy & vision, roadmapping, backlog ownership & prioritization, release / sprint planning, story mapping, OKRs, stakeholder management (C-suite / VP), product discovery, requirements decomposition, acceptance criteria." },

    { id: "skills-ai", tags: ["skills", "ai", "gpt", "agent", "prompt"], anchor: "#skills",
      text: "AI & automation skills: Custom GPTs, Microsoft Copilot Studio (autonomous agents), agentic AI, prompt engineering, AI adoption & change management, data-driven product management." },

    { id: "skills-agile", tags: ["skills", "agile", "tools"], anchor: "#skills",
      text: "Agile & delivery: Scrum, SAFe, Kanban — with Jira, Confluence, Aha! and Kendis." },

    { id: "skills-data", tags: ["skills", "data", "powerbi"], anchor: "#skills",
      text: "Data & analytics: Power BI, Tableau, SQL, UML, executive dashboard design." },

    { id: "skills-cloud", tags: ["skills", "cloud", "process", "bpm"], anchor: "#skills",
      text: "Cloud & process: Microsoft Azure (AZ-900), AWS, SaaS delivery, cloud-migration strategy; Visio, Bizagi, draw.io, fit-gap analysis, O2C / R2R consulting." },

    { id: "domains", tags: ["domain", "industries", "logistics", "erp", "retail", "supply"], anchor: "#skills",
      text: "Domain experience: B2B SaaS ERP, wholesale distribution, lumber & building materials, supply chain, logistics / last-mile / CEP, shipping & ports, transportation, retail & ecommerce, order management and BI — plus exposure to pharma & healthcare and automotive." },

    { id: "side-projects", tags: ["projects", "side", "builder", "github", "diplodash", "finance"], anchor: "#side-projects",
      text: "Side projects: a Personal Finance Tracker app built from scratch (household income, expenses, savings goals and budgets — data model, taxonomy and reporting views defined end-to-end), and DiploDash — an open-source public-accountability dashboard tracking the Indian PM's foreign visits, diplomatic costs and outcomes (github.com/prabin-mishra/india-pm-foreign-visits-dashboard)." },

    { id: "this-site", tags: ["projects", "website", "site", "chat", "ai"], anchor: "#side-projects",
      text: "This website is itself a proof of work: a static, no-backend résumé whose 'Ask my résumé' chat runs entirely in the browser over a structured knowledge base — no trackers, no cookies." },

    { id: "stakeholders", tags: ["stakeholder", "roadmap"], anchor: "#experience",
      text: "He works directly with C-suite / VP stakeholders: roadmap prioritization at Epicor across Product, Engineering and Sales; roadmap reviews in Stockholm for a Nordic logistics enterprise; and Power BI training for a CFO / CXO leadership team." },

    { id: "strengths-summary", tags: ["strengths", "why", "value", "unique"], anchor: "#strengths",
      text: "Three signature strengths: (1) enterprise B2B SaaS ERP depth — order-to-cash through inventory on a live cloud ERP; (2) end-to-end product ownership at scale — 1,400+ story backlog, squads of 10–20 engineers, platforms serving up to 10,000 daily users across 3 countries; (3) AI-forward operator — stacked AI/PM certifications plus real internal AI tooling built and adopted." },

    { id: "contact", tags: ["contact", "email", "linkedin", "github", "hire", "reach"], anchor: "#contact",
      text: "Email: prabinmishra87@gmail.com · LinkedIn: linkedin.com/in/prabinmishra · GitHub: github.com/prabin-mishra." },

    { id: "location-relocation", tags: ["relocation", "uae", "location", "bengaluru", "bangalore", "india", "roles"], anchor: "#contact",
      text: "He's based in Whitefield, Bengaluru, India, and geographically flexible — he has delivered from India, Sweden, Denmark, Singapore and the US, and is open to international locations in general. For the right senior product conversation in B2B SaaS or an AI-forward company (think Lead / Principal Product Manager, Senior / Lead Product Owner, Lead / Principal Business Analyst), his inbox is always open: prabinmishra87@gmail.com." }
  ],

  /* Curated intents, checked in order. `match` is tested against the
     normalized question; `facts` are composed verbatim into the answer. */
  intents: [
    { id: "greeting", match: /^(hi|hey|hello|yo|namaste|good\s(morning|afternoon|evening))\b/,
      lead: "Hi! Ask me anything about Prabin's experience — ERP, AI tooling, achievements, education, location. I answer only from the verified profile on this page.",
      facts: [] },

    { id: "who", match: /\b(who is|who's|about (him|prabin)|introduce|elevator|overview|profile|summary|background)\b/,
      lead: "Here's the short version:",
      facts: ["identity", "experience-years", "current-role"] },

    { id: "logistics", match: /\b(logistics?|supply chain|last.?mile|cep|parcels?|delivery|deliveries|shipping|ports?|terminals?|warehous\w*|freight|ocean|transport\w*)\b/,
      lead: "Supply chain & logistics run through his whole career:",
      facts: ["chain-coverage", "logistics-clients", "nordic-role", "business-case"] },

    { id: "achievement", match: /\b(achievements?|biggest|greatest|proud|flagship|impressive|notable|best work)\b/,
      lead: "His flagship achievement:",
      facts: ["api-platform", "business-case"] },

    { id: "erp", match: /\b(erp|epicor|bistrack|order.to.cash|o2c|inventory|purchasing|accounts payable|invoice|distribution software|wholesale)\b/,
      lead: "Yes — enterprise ERP is his core depth.",
      facts: ["erp-depth", "current-role", "api-platform"] },

    { id: "ai", match: /\b(ai|artificial intelligence|gpts?|copilot|agents?|agentic|llms?|prompt|machine learning|genai|automation)\b/,
      lead: "AI is his differentiator — built and adopted, not just certified:",
      facts: ["ai-tools", "certs-ai", "this-site"] },

    { id: "api", match: /\b(apis?|endpoints?|integrations?|headless|composable|platform work)\b/,
      lead: "The API platform is his flagship:",
      facts: ["api-platform"] },

    { id: "progression", match: /\b(progression|career (path|growth|arc|trajectory)|promot\w*|how did he (grow|progress)|levels?|trajector\w*|seniority|moved up|career move)\b/,
      lead: "The trajectory, step by step:",
      facts: ["progression", "timeline-summary"] },

    { id: "years", match: /\b(how long|how many years|years of experience|total experience|experience does|seniority)\b/,
      lead: "",
      facts: ["experience-years", "timeline-summary"] },

    { id: "relocation", match: /\b(relocat\w*|uae|dubai|abroad|willing to move|visas?|work permits?|where is he|based|locations?|remote|international\w*)\b/,
      lead: "",
      facts: ["location-relocation"],
      note: q => /\b(visa|permit|sponsor)\b/.test(q)
        ? "Visa / work-permit specifics aren't covered in this profile — best to email him directly."
        : null },

    { id: "contact", match: /\b(contact|email|reach|phone|call|linkedin|github|connect|get in touch|hire him|interview)\b/,
      lead: "Reaching him is easy:",
      facts: ["contact", "location-relocation"] },

    { id: "education", match: /\b(education|educational|degree|mba|pgpm|university|college|btech|b\.tech|school|study|studied|cgpa|academic|great lakes|kiit)\b/,
      lead: "",
      facts: ["education-mba", "education-btech"] },

    { id: "certification", match: /\b(certif\w*|credentials?|pspo|cspo|az.?900|azure fundamentals|scrum\.org|pendo|vanderbilt|itil|iiba|cscmp)\b/,
      lead: "Certifications, AI-first:",
      facts: ["certs-ai", "certs-product"] },

    { id: "team", match: /\b(teams?|squads?|engineers?|manage|managed|leadership style|direct reports|people|how many engineers|led)\b/,
      lead: "",
      facts: ["team", "nordic-role", "stakeholders"] },

    { id: "stakeholder", match: /\b(stakeholders?|c.?suite|cxos?|cfo|executives?|vps?|board|senior leadership)\b/,
      lead: "Yes — regularly, at three different organizations:",
      facts: ["stakeholders"] },

    { id: "impact", match: /\b(impact|metrics?|kpis?|numbers?|results?|outcomes?|quantif\w*|data.?driven|measurable)\b/,
      lead: "The quantified wins:",
      facts: ["epicor-metrics", "nordic-metrics", "business-case"] },

    { id: "clients", match: /\b(maersk|postnord|aet|dhl|clients?|logos?|brands?)\b|(^|[^-\w])ups\b/,
      lead: "Named enterprises he has delivered for:",
      facts: ["logistics-clients", "consulting"] },

    { id: "agile", match: /\b(agile|scrum|safe|kanban|sprints?|ceremon\w*|jira|confluence|backlogs?|refinement|story mapping)\b/,
      lead: "",
      facts: ["skills-agile", "team", "current-role"] },

    { id: "data", match: /\b(power ?bi|tableau|sql|dashboard|analytics|data skills|bi experience)\b/,
      lead: "",
      facts: ["skills-data", "bi-platform"] },

    { id: "cloud", match: /\b(azure|aws|cloud|saas migration|migration)\b/,
      lead: "",
      facts: ["skills-cloud", "current-role"] },

    { id: "case-studies", match: /\b(case stud\w*|projects?|project work|portfolio|builds|shipped|what has he (built|shipped)|examples? of (his )?work)\b/,
      lead: "Five case studies, problem \u2192 action \u2192 outcome:",
      facts: ["case-studies", "api-platform"] },

    { id: "projects", match: /\b(side projects?|diplodash|finance tracker|builder|hands.?on|outside work|personal projects?)\b/,
      lead: "He builds outside work hours too:",
      facts: ["side-projects", "this-site"] },

    { id: "why-hire", match: /\b(why (should|hire)|strengths?|unique|differentiat\w*|stand out|value|good at|uvp|superpowers?)\b/,
      lead: "",
      facts: ["strengths-summary", "ai-tools"] },

    { id: "resume-pdf", match: /\b(resume|cv|pdf|download|print)\b/,
      lead: "This page is the résumé — it's print-friendly if you need a paper copy (the timeline expands automatically in print). For a formal PDF, email him and he'll send one over.",
      facts: ["contact"] },

    { id: "tcs", match: /\btcs\b/,
      lead: "Three chapters at TCS:",
      facts: ["tcs-early", "consulting", "nordic-role"] },

    { id: "accenture", match: /\baccenture\b/,
      lead: "",
      facts: ["accenture"] },

    { id: "salary", match: /\b(salary|compensation|ctc|pay|rate|notice period|when can (he|you) (start|join)|availability|joining)\b/,
      lead: null, /* triggers honest fallback with contact pointer */
      facts: [] }
  ],

  responses: {
    seed: "Hi — I'm the \"Ask my résumé\" assistant. I answer questions about Prabin using only the verified profile on this page — experience, achievements, AI tooling, education, location. Try a suggestion below, or ask your own.",
    noAnswer: "That's outside what this profile covers, and I don't guess — I only answer from the verified facts on this page. For anything else, email Prabin at prabinmishra87@gmail.com — he replies fast."
  }
};
