# Todo Summary Assistant

A full-stack application that allows you to manage tasks, generate AI-powered summaries, and share them to Slack.

![Todo Summary Assistant](https://github.com/yourusername/todo-summary-assistant/raw/main/screenshot.png)

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

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/todo-summary-assistant.git
   cd todo-summary-assistant
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # DeepSeek API for AI summaries (optional but recommended)
   DEEPSEEK_API_KEY=your_deepseek_api_key
   
   # Slack integration (optional)
   SLACK_WEBHOOK_URL=your_slack_webhook_url
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`

## Setting Up Integrations

### DeepSeek AI Integration

The application uses DeepSeek's API to generate intelligent summaries of your tasks. To set this up:

1. Sign up for an account at [DeepSeek AI](https://www.deepseek.com/)
2. Navigate to API keys section and create a new API key
3. Add your API key to the `.env` file:
   ```
   DEEPSEEK_API_KEY=your_deepseek_api_key
   ```

If you don't provide a DeepSeek API key, the application will fall back to a basic summary generator, which will still work but won't provide AI-powered insights.

### Slack Integration

To enable sending summaries to Slack:

1. Go to [Slack API Apps Page](https://api.slack.com/apps)
2. Click "Create New App" and choose "From scratch"
3. Name your app and select your workspace
4. From the sidebar, select "Incoming Webhooks" and toggle "Activate Incoming Webhooks" to ON
5. Click "Add New Webhook to Workspace" and select the channel where summaries should be posted
6. Copy the Webhook URL provided
7. Add your webhook URL to the `.env` file:
   ```
   SLACK_WEBHOOK_URL=your_slack_webhook_url
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

### UI/UX Decisions

1. **Color Scheme**: 
   - Primary color for main actions
   - Accent (green) color for task creation
   - Clear contrast between interactive and static elements
   - Dark mode support for user preference

2. **Interaction Design**:
   - Modal-based task creation/editing for focused interaction
   - Immediate feedback for all user actions
   - Clear loading states during async operations

3. **Information Architecture**:
   - Tasks are central to the experience
   - Summary panel provides AI-generated insights
   - Simple, focused sidebar navigation

## Deployment

This application can be deployed to any Node.js hosting platform:

1. **Vercel/Netlify**: Ideal for frontend deployment
2. **Heroku/Railway**: Good options for full-stack deployment
3. **Docker**: Container setup available for custom deployments

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.