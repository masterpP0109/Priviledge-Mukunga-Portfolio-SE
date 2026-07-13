export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  tags: string[];
  metrics: {
    views: string;
    retention: string;
    engagement: string;
  };
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  submittedAt: string;
  status: 'pending' | 'responded' | 'archived';
  aiResponseDraft?: string;
  responseSent?: boolean;
}

export interface AnalyticsEvent {
  id: string;
  sessionId: string;
  eventType: 'pageview' | 'click_project' | 'play_video' | 'form_focus' | 'form_submit';
  eventData: string; // JSON string or simple text
  timestamp: string;
}

export interface SiteContent {
  name: string;
  title: string;
  bio: string;
  email: string;
  skills: string[];
  projects: Project[];
  seoKeywords: string[];
  metaDescription: string;
}

export interface DashboardStats {
  totalVisits: number;
  totalLeads: number;
  conversionRate: number;
  leadsByType: Record<string, number>;
  eventsByDay: Record<string, number>;
  eventsByType: Record<string, number>;
}
