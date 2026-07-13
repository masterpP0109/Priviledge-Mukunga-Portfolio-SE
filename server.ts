import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { Project, Lead, AnalyticsEvent, SiteContent, DashboardStats } from "./src/types";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// Path to JSON persistent store
const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "db.json");

// Ensure DB directory and file exist
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const defaultProjects: Project[] = [
  {
    id: "project-1",
    title: "Illuvium Gaming Site",
    category: "Web Systems",
    description: "A dynamic gaming website featuring interactive elements, stunning visuals, and immersive user experience for gamers.",
    videoUrl: "vids/project1.mp4",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    tags: ["HTML", "CSS", "Javascript", "Gaming"],
    metrics: { views: "45K", retention: "89%", engagement: "Web" }
  },
  {
    id: "project-2",
    title: "Prinor Ecommerce",
    category: "Web Systems",
    description: "A modern e-commerce platform with secure payment integration, product catalog, and seamless shopping experience.",
    videoUrl: "vids/project2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    tags: ["E-Commerce", "React", "Payment Gateways", "MySQL"],
    metrics: { views: "72K", retention: "92%", engagement: "Web" }
  },
  {
    id: "project-3",
    title: "Joy Coffee",
    category: "Web Systems",
    description: "A cozy coffee shop website showcasing menu items, location details, and an inviting atmosphere for coffee lovers.",
    videoUrl: "vids/project3.mp4",
    thumbnail: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    tags: ["CSS Grid", "Animations", "Aesthetics", "Responsive"],
    metrics: { views: "34K", retention: "85%", engagement: "Web" }
  },
  {
    id: "project-4",
    title: "Zara News Website",
    category: "Systems Engineering",
    description: "A responsive news website with clean design, categorized articles, and optimized for fast loading and readability.",
    videoUrl: "vids/project2 (1).mp4",
    thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
    tags: ["News", "Publishing", "Optimizations", "API"],
    metrics: { views: "65K", retention: "88%", engagement: "Web" }
  },
  {
    id: "project-5",
    title: "Stylish Portfolio Website",
    category: "Interactive Canvas",
    description: "An elegant portfolio website template featuring smooth animations, responsive design, and professional presentation.",
    videoUrl: "vids/project1.mp4",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    tags: ["CSS3", "Creative Coding", "GSAP Animations", "UX"],
    metrics: { views: "88K", retention: "91%", engagement: "Web" }
  },
  {
    id: "project-6",
    title: "Modern Portfolio Website",
    category: "Interactive Canvas",
    description: "A contemporary portfolio design with minimalist aesthetics, interactive elements, and optimized user interface.",
    videoUrl: "vids/project2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    tags: ["Minimalism", "Portfolio", "Framer Motion", "Tailwind"],
    metrics: { views: "56K", retention: "94%", engagement: "Web" }
  },
  {
    id: "project-7",
    title: "Movie Landing Page",
    category: "Systems Engineering",
    description: "A cinematic landing page for movie promotions with trailer integration, cast information, and engaging visuals.",
    videoUrl: "vids/project3.mp4",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    tags: ["Cinematic", "HTML5 Video", "Landing Page", "Animations"],
    metrics: { views: "94K", retention: "97%", engagement: "Web" }
  }
];

const defaultSiteContent: SiteContent = {
  name: "Priviledge Mukunga",
  title: "Full Stack Developer Portfolio",
  bio: "I,m a Full Stack developer with Experience in website, Mobile And Software development. Check Out my Projects and skills",
  email: "mukungapriviledge@gmail.com",
  skills: ["Full Stack Engineering", "Cloud Architecture", "Interactive Visualizations", "PostgreSQL & Redis", "TypeScript & React", "High-Throughput APIs", "AI Integrations"],
  projects: defaultProjects,
  seoKeywords: ["Priviledge Mukunga", "Software Engineer", "Full Stack Developer", "Systems Architect", "Creative Developer Portfolio", "Interactive Canvas React"],
  metaDescription: "Professional software engineering and creative development portfolio of Priviledge Mukunga. High-performance full-stack web applications, distributed systems, and real-time interactive canvases."
};

interface LocalDB {
  leads: Lead[];
  analytics: AnalyticsEvent[];
  siteContent: SiteContent;
}

// Initialize database with default structure if missing
function readDatabase(): LocalDB {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const data = JSON.parse(raw);
      let siteContent = data.siteContent || defaultSiteContent;
      
      // Upgrade logic if the db contains Video Editor/Design content or is missing the 7 projects
      if (
        !siteContent.title || 
        siteContent.title.includes("Video") || 
        siteContent.title.includes("Designer") ||
        !siteContent.projects.some(p => p.title.includes("Illuvium"))
      ) {
        console.log("Upgrading database schema with user's exact 7 projects...");
        const upgradedData: LocalDB = {
          leads: data.leads || [],
          analytics: data.analytics || [],
          siteContent: defaultSiteContent
        };
        writeDatabase(upgradedData);
        return upgradedData;
      }
      return {
        leads: data.leads || [],
        analytics: data.analytics || [],
        siteContent: siteContent
      };
    }
  } catch (err) {
    console.error("Error reading database:", err);
  }
  
  const initData: LocalDB = { leads: [], analytics: [], siteContent: defaultSiteContent };
  writeDatabase(initData);
  return initData;
}

function writeDatabase(data: LocalDB) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing database:", err);
  }
}

// Lazy Gemini client init
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      ai = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return ai;
}

// API Routes

// Get current portfolio content
app.get("/api/content", (req, res) => {
  const db = readDatabase();
  res.json(db.siteContent);
});

// Update dynamic site content (Admin panel)
app.post("/api/admin/content", (req, res) => {
  const db = readDatabase();
  const updatedContent: SiteContent = req.body;
  
  db.siteContent = {
    ...db.siteContent,
    ...updatedContent
  };
  
  writeDatabase(db);
  res.json({ success: true, siteContent: db.siteContent });
});

// Record user engagement metrics
app.post("/api/analytics/event", (req, res) => {
  const db = readDatabase();
  const { sessionId, eventType, eventData } = req.body;
  
  if (!sessionId || !eventType) {
    return res.status(400).json({ error: "Missing sessionId or eventType" });
  }
  
  const newEvent: AnalyticsEvent = {
    id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    sessionId,
    eventType,
    eventData: eventData ? JSON.stringify(eventData) : "",
    timestamp: new Date().toISOString()
  };
  
  db.analytics.push(newEvent);
  writeDatabase(db);
  res.json({ success: true, event: newEvent });
});

// Submit Contact Form & generate Gemini-powered Automated Lead Response
app.post("/api/contact", async (req, res) => {
  const db = readDatabase();
  const { name, email, company, projectType, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }
  
  const leadId = `lead-${Date.now()}`;
  const newLead: Lead = {
    id: leadId,
    name,
    email,
    company: company || "None",
    projectType: projectType || "General Video Project",
    message,
    submittedAt: new Date().toISOString(),
    status: "pending",
    responseSent: false
  };
  
  // Attempt to generate a personalized response using Gemini 3.5 Flash
  try {
    const aiClient = getGeminiClient();
    if (aiClient) {
      console.log(`Generating automated lead response for ${name}...`);
      const response = await aiClient.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `You are Priviledge Mukunga's personal AI Assistant. A client has just submitted a contact form on his creative portfolio.
        Write a professional, encouraging, and highly customized automated email reply on behalf of Priviledge.
        
        Client Details:
        - Name: ${name}
        - Email: ${email}
        - Company: ${company || 'Independent Creator'}
        - Project Type Focus: ${projectType}
        - Message: "${message}"

        Your goals in the email:
        1. Thank them enthusiastically for reaching out.
        2. Specifically acknowledge their project type (${projectType}) and reference aspects of their message to make it feel human and fully customized (not like a generic bot).
        3. Explain that Priviledge has received their inquiry and is already reviewing their requirements.
        4. State that he will follow up with a detailed project proposal, timeline, or video consultation link within 24 hours.
        5. Provide a warm, professional sign-off as "Priviledge's AI Assistant on behalf of Priviledge Mukunga".

        Rules:
        - Write only the plain-text body of the email.
        - Do not include standard markdown formatting blocks or subject headings.
        - Sound polished, premium, and creative.`,
        config: {
          temperature: 0.7,
        }
      });
      
      if (response && response.text) {
        newLead.aiResponseDraft = response.text.trim();
        newLead.status = "responded";
        newLead.responseSent = true; // Mark as automatically sent
      }
    } else {
      // Fallback response if API key is missing
      newLead.aiResponseDraft = `Hi ${name},\n\nThank you so much for reaching out! This is an automated confirmation that I have received your message regarding a ${projectType} system.\n\nI am thrilled about the opportunity to build with you. I am currently reviewing your engineering requirements and details: "${message}".\n\nI will follow up with you personally within 24 hours with a detailed technical architectural outline!\n\nBest regards,\nPriviledge Mukunga\nFull Stack Software Engineer & Creative Systems Developer`;
      newLead.status = "responded";
      newLead.responseSent = true;
    }
  } catch (error) {
    console.error("Gemini API lead response generation failed:", error);
    newLead.aiResponseDraft = `Hi ${name},\n\nThank you so much for reaching out! This is an automated confirmation that I have received your message regarding a ${projectType} system.\n\nI am thrilled about the opportunity to build with you. I am currently reviewing your engineering requirements and details: "${message}".\n\nI will follow up with you personally within 24 hours with a detailed technical architectural outline!\n\nBest regards,\nPriviledge Mukunga\nFull Stack Software Engineer & Creative Systems Developer`;
    newLead.status = "responded";
    newLead.responseSent = true;
  }
  
  db.leads.push(newLead);
  writeDatabase(db);
  
  res.json({
    success: true,
    lead: newLead,
    automatedResponse: newLead.aiResponseDraft
  });
});

// Admin Dashboard stats & data
app.get("/api/admin/stats", (req, res) => {
  const db = readDatabase();
  
  const leads = db.leads;
  const events = db.analytics;
  
  // Filter for pageview events to count unique/total visits
  const pageviews = events.filter(e => e.eventType === "pageview");
  const totalVisits = pageviews.length || 1; // avoid divide by zero
  const totalLeads = leads.length;
  const conversionRate = parseFloat(((totalLeads / totalVisits) * 100).toFixed(2));
  
  // Aggregate leads by project type
  const leadsByType: Record<string, number> = {};
  leads.forEach(l => {
    const type = l.projectType || "Other";
    leadsByType[type] = (leadsByType[type] || 0) + 1;
  });
  
  // Aggregate events by day (last 7 days)
  const eventsByDay: Record<string, number> = {};
  events.forEach(e => {
    try {
      const dateStr = e.timestamp.split("T")[0]; // YYYY-MM-DD
      eventsByDay[dateStr] = (eventsByDay[dateStr] || 0) + 1;
    } catch (err) {}
  });
  
  // Aggregate events by type
  const eventsByType: Record<string, number> = {};
  events.forEach(e => {
    eventsByType[e.eventType] = (eventsByType[e.eventType] || 0) + 1;
  });
  
  const stats: DashboardStats = {
    totalVisits,
    totalLeads,
    conversionRate,
    leadsByType,
    eventsByDay,
    eventsByType
  };
  
  res.json({
    stats,
    leads: leads.sort((a,b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()),
    events: events.slice(-100) // return last 100 events
  });
});

// Admin update lead status
app.post("/api/admin/lead/:id/status", (req, res) => {
  const db = readDatabase();
  const { id } = req.params;
  const { status } = req.body;
  
  const leadIndex = db.leads.findIndex(l => l.id === id);
  if (leadIndex === -1) {
    return res.status(404).json({ error: "Lead not found" });
  }
  
  db.leads[leadIndex].status = status;
  writeDatabase(db);
  res.json({ success: true, lead: db.leads[leadIndex] });
});

// Handle serving the frontend
async function startServer() {
  // Vite dev server or static distribution build
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    // Serve with Vite middleware
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static frontend files
    app.use(express.static(distPath));
    
    // Serve index.html for all other routing requests (SPA routing)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
  
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer().catch(err => {
  console.error("Failed to start fullstack server:", err);
});
