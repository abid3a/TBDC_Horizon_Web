# TBDC Horizon Web Application

## Overview
A comprehensive responsive web application for managing sessions, meetings, connections, and mentorship within the TBDC Horizon platform.

## Component Hierarchy

### Main Application Structure
- App.tsx - Main application component with routing logic
- index.css - Global styles with Tailwind CSS

### Layout Components
- components/Layout/Sidebar.tsx - Left navigation sidebar with TBDC branding
- components/Layout/Header.tsx - Top header bar with search, notifications, and user controls

### Common Components
- components/Common/SidePeekPanel.tsx - Reusable side panel for detailed views
- components/Common/FilterBar.tsx - Search and filter functionality

### Page Components
- components/Pages/Overview.tsx - Dashboard with KPIs, charts, and recent activity
- components/Pages/Sessions.tsx - Session management with card grid and detail panel
- components/Pages/Meetings.tsx - Meeting management similar to sessions
- components/Pages/Connections.tsx - Professional network management
- components/Pages/Surge.tsx - Mentor discovery and booking interface
- components/Pages/Reports.tsx - Business reports and analytics
- components/Pages/Favorites.tsx - Favorite connections display
- components/Pages/Admin.tsx - User management and admin panel

## Mock Data Location
- src/data/mockData.json - Comprehensive JSON file containing:
  - 3 sessions with mentor information
  - 3 meetings with attendee details
  - 4 connections with professional profiles
  - 6 mentors across different categories
  - 2 business reports
  - 2 users (admin and regular)
  - Dashboard analytics data
  - Favorites list

## Navigation & Panel Behavior

### Sidebar Navigation
- Click any menu item to navigate between pages
- Active page is highlighted with amber accent color
- Smooth hover animations for better UX

### Side-Peek Panel System
- Used in Sessions, Meetings, and Connections pages
- Click any card to open detailed view in right-side panel
- Panel slides in from right with smooth transition
- Semi-transparent overlay dims background content
- Click outside panel or X button to close
- Panel contains full entity details and action buttons

### Surge Mentor Discovery
- Horizontal scrollable mentor cards by category
- Click mentor card to open modal with full profile
- "Book a Session" button for mentor booking
- Modal closes on backdrop click or close button

### Filter System
- Dynamic search functionality across all list pages
- Type-based filtering with toggle tags
- Real-time filtering without page refresh

## Styling & Branding
- Primary Color: Amber (#F59E0B) - Used for TBDC branding, active states, and primary buttons
- Secondary Color: Emerald (#10B981) - Used for success states and secondary actions
- Neutral grays for text hierarchy and backgrounds
- Rounded corners (8px-12px) for modern card aesthetic
- Subtle shadows for depth and visual hierarchy
- Responsive breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)

## Key Features
- Fully responsive design with mobile-first approach
- Interactive dashboard with mock analytics
- Card-based interface for easy scanning
- Professional networking tools
- Mentor discovery and booking system
- Admin panel for user management
- Comprehensive search and filtering
- Smooth animations and micro-interactions

## Development Notes
- Built with React 18, TypeScript, and Tailwind CSS
- Uses Lucide React for consistent iconography
- All data is client-side mocked for demonstration
- No external API dependencies
- Modular component architecture for maintainability
- Responsive design tested across device sizes

## Getting Started
1. npm install
2. npm run dev
3. Navigate through the sidebar to explore different features
4. Click cards to see detailed side panels
5. Test responsive behavior by resizing window

The application demonstrates a production-ready interface suitable for professional mentorship and business development platforms.