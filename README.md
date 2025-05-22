# Todo Summary Assistant

A full-stack application that allows you to manage tasks, generate AI-powered summaries, and share them to Slack.

## Demo
(https://shorturl.at/yEydQ)

## Features

- ✅ Create, edit, and delete tasks with title, description, due date, and category
- ✅ Mark tasks as complete or pending
- ✅ Filter and search through your tasks
- ✅ Generate AI-powered summaries of your pending tasks
- ✅ Send summaries to Slack with a single click
- ✅ Light and dark mode support

## Tech Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- Shadcn/UI component library
- React Query for data fetching

### Backend
- Node.js with Express
- RESTful API architecture
- In-memory data storage (extensible to databases)

### Integrations
- DeepSeek AI for task summarization
- Slack webhooks for sharing summaries

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

## Design and Architecture Decisions

### Frontend Architecture

The frontend is built with React and follows a component-based architecture. Key design decisions include:

1. **Component Structure**: Components are organized by functionality:
   - UI components for reusable UI elements
   - Page components for full pages
   - Feature components for specific features

2. **State Management**: Using React Query for server state and local state for UI state:
   - Task data is fetched and cached with React Query
   - Form state is managed with React Hook Form
   - UI state (modals, filters) is managed with local state

3. **Styling Approach**: Using Tailwind CSS for utility-based styling:
   - Consistent design through tailwind.config.js customization
   - Dark mode support via CSS variables and class-based toggling
   - Responsive design for mobile and desktop

### Backend Architecture

The backend follows a RESTful API architecture with these key decisions:

1. **API Design**: Clear endpoint structure:
   - `GET /api/todos` - Retrieve all todos
   - `POST /api/todos` - Create a new todo
   - `PUT /api/todos/:id` - Update a todo
   - `DELETE /api/todos/:id` - Delete a todo
   - `POST /api/summarize` - Generate a summary
   - `POST /api/send-to-slack` - Send to Slack

2. **Data Storage**: Using in-memory storage for simplicity:
   - Easy to replace with a real database as needed
   - Clear interface with CRUD operations

3. **External Integrations**:
   - DeepSeek AI for intelligent summarization with fallback mechanism
   - Slack webhooks for simple, reliable message sending
