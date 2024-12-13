# Technology Ethics Chatbot Research Project

This project implements a web-based chatbot platform designed to study how people's opinions about technological ethical dilemmas are influenced by interactions with AI. The system presents philosophical perspectives on technology-related ethical issues through a guided chat experience, collecting data about users' views before and after the interaction.

## Project Overview

The application facilitates a structured conversation flow:
1. Users complete a pre-chat survey about their views on technology
2. Users engage in a philosophical discussion about technological ethical dilemmas
3. Users complete a post-chat survey to measure potential changes in their perspectives

The chatbot can discuss topics like autonomous vehicles and algorithmic bias from different philosophical viewpoints including Mill's Liberalism, Luddism, and Futurism.

## Technical Architecture

### Frontend (React)
- Built with React and React Router for navigation
- Uses Tailwind CSS for styling
- Implements a session-based context system
- Features three main components:
  - Pre-chat survey form
  - Chat interface
  - Post-chat survey form

### Backend (Node.js/Express)
- RESTful API built with Express
- SQLite database for data persistence
- Endpoints for:
  - Session management
  - Survey response collection
  - Chat message handling
  - Conversation state management

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Database Setup
```bash
# The database will be automatically initialized when you start the server
# Database file will be created at: src/db/chatbot.db
```

### Backend Setup
```bash
# Install dependencies
cd server
npm install

# Start the server
npm start
```

### Frontend Setup
```bash
# Install dependencies
cd client
npm install

# Start the development server
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
project-root/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   └── App.js         # Main application component
│   └── package.json
└── server/
    ├── config/            # Configuration files
    ├── routes/            # API route handlers
    ├── db/               # Database files
    └── index.js          # Server entry point
```

## Key Features

### Pre-Chat Survey
- Collects initial opinions on technology ethics
- Gathers self-assessment of openness to new ideas
- Links responses to unique user sessions

### Chat Interface
- Topic selection (Autonomous Vehicles, Algorithmic Bias)
- Philosophical perspective selection (Mill/Liberalism, Luddism, Futurism)
- Real-time message exchange
- Session persistence

### Post-Chat Survey
- Measures changes in opinions
- Collects qualitative feedback
- Links responses to pre-chat survey and chat session

## Data Collection

The system collects:
- Pre and post-chat survey responses
- Chat messages and interactions
- Session metadata
- User topic and perspective selections

All data is stored in SQLite with the following schema:
- users: Tracks unique user sessions
- conversations: Records chat sessions and their parameters
- messages: Stores chat interactions
- form_responses: Captures survey responses

## Development Notes

### API Endpoints
- POST /api/sessions: Create new user session
- POST /api/pre-chat-responses: Save pre-chat survey
- POST /api/conversations: Initialize chat session
- POST /api/messages: Save chat messages
- POST /api/post-chat-responses: Save post-chat survey

### Security Considerations
- Sessions are managed using unique identifiers
- No personal information is collected
- Data is stored locally in SQLite
- Form submissions are validated server-side

## Future Improvements

Potential enhancements:
- Deploy website for broader accessibility
- Add more philosophical perspectives
- Expand topic coverage
- Implement advanced data visualization
- Add real-time chat features
- Enhance error handling and validation

## Contributing

This is a research project with a specific focus on studying how AI interactions influence opinions about technology ethics. While it's not currently open for contributions, the code can be used as a reference for similar research projects.


