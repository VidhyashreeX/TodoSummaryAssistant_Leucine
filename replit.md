# Todo Summary Assistant Project Guide

## Overview

This project is a full-stack Todo application with AI-powered summary capabilities. It allows users to manage their tasks and get AI-generated summaries of their pending tasks. The application also includes integration with Slack for sharing these summaries.

The system uses a modern tech stack:
- Frontend: React with TypeScript, TailwindCSS, and Shadcn/UI components
- Backend: Express.js server with REST API endpoints
- Database: PostgreSQL with Drizzle ORM
- AI Integration: OpenAI API for task summarization
- External Services: Slack API for sharing summaries

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a classic client-server architecture:

1. **Client**: React SPA that communicates with the backend through REST API calls
2. **Server**: Express.js API server that handles data operations and external integrations
3. **Database**: PostgreSQL database managed through Drizzle ORM
4. **External Services**: Integration with OpenAI for summarization and Slack for sharing

The application is built with a modular approach:
- `client/`: Contains the React frontend
- `server/`: Contains the Express.js backend
- `shared/`: Contains shared code between client and server (like data schemas)

### Database Schema

The database schema includes two main entities:
- `users`: For user authentication
- `todos`: For storing task information

## Key Components

### Frontend Components

1. **Pages**
   - `HomePage`: Main interface for task management
   - `NotFound`: 404 error page

2. **Core Components**
   - `Sidebar`: Navigation sidebar
   - `TaskControls`: UI for searching, filtering, and adding tasks
   - `TasksList`: Displays the list of tasks
   - `SummaryPanel`: Shows AI-generated summary of tasks
   - `TaskModal`: Modal for adding/editing tasks
   - `ConfirmationModal`: For confirming destructive actions

3. **UI Components**
   - Extensive set of UI components from Shadcn/UI library

### Backend Components

1. **API Routes**
   - Todo management (CRUD operations)
   - Summary generation
   - Slack integration

2. **Services**
   - `storage.ts`: Data access layer
   - `openai.ts`: Integration with OpenAI API
   - `slack.ts`: Integration with Slack API

## Data Flow

1. **Todo Management Flow**
   - Client sends CRUD requests to the server
   - Server processes these requests using the storage service
   - Server responds with updated data
   - Client updates the UI accordingly

2. **Summary Generation Flow**
   - User requests a summary from the client
   - Client sends request to the server
   - Server retrieves todos and calls OpenAI API
   - Server returns generated summary
   - Client displays the summary

3. **Slack Integration Flow**
   - User requests to share summary to Slack
   - Client sends request to the server
   - Server calls Slack API with the summary
   - Server returns result to client
   - Client shows success/failure notification

## External Dependencies

### Frontend Dependencies
- React for UI framework
- React Query for data fetching and state management
- Tailwind CSS for styling
- Shadcn/UI for component library
- Wouter for routing

### Backend Dependencies
- Express.js for API server
- Drizzle ORM for database operations
- OpenAI SDK for AI integration
- Slack SDK for Slack integration

### Environment Variables
The application requires the following environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: API key for OpenAI
- `SLACK_BOT_TOKEN`: Bot token for Slack integration
- `SLACK_CHANNEL_ID`: Channel ID for posting to Slack

## Deployment Strategy

The application is configured for deployment on Replit:
1. Build process: `npm run build` compiles both frontend and backend
2. Start command: `npm run start` runs the production server
3. Development mode: `npm run dev` runs the development server

The server is configured to serve the static frontend files in production.

## Development Workflow

1. **Local Development**
   - Run `npm run dev` to start the development server
   - Frontend changes are hot-reloaded
   - API calls are proxied to the backend

2. **Database Schema Changes**
   - Modify the schema in `shared/schema.ts`
   - Run `npm run db:push` to apply changes to the database

3. **Adding New Features**
   - For frontend features, add components in `client/src/components`
   - For backend features, add routes in `server/routes.ts`
   - For shared types or schemas, add to `shared/` directory