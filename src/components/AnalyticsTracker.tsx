import { useEffect } from 'react';

// Client-side helper to get or create a session ID
export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('portfolio_session_id');
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem('portfolio_session_id', sessionId);
  }
  return sessionId;
};

// Global event logger
export const logEvent = async (
  eventType: 'pageview' | 'click_project' | 'play_video' | 'form_focus' | 'form_submit',
  eventData?: any
) => {
  try {
    const sessionId = getSessionId();
    await fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        eventType,
        eventData: eventData || {},
      }),
    });
  } catch (err) {
    console.error('Failed to log analytics event:', err);
  }
};

export default function AnalyticsTracker() {
  useEffect(() => {
    // Log pageview on mount
    logEvent('pageview', {
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      referrer: document.referrer,
      path: window.location.pathname,
    });

    // Track click on any link or button with an ID or data attribute
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('button, a, [data-analytics]');
      if (clickable) {
        const id = clickable.id || clickable.getAttribute('id') || clickable.textContent?.trim().substring(0, 20);
        const type = clickable.tagName.toLowerCase();
        logEvent('click_project', {
          elementId: id,
          elementType: type,
          text: clickable.textContent?.trim().substring(0, 30),
        });
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return null;
}
