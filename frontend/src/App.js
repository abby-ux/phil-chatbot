// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import HomePage from './components/HomePage';
import PreChatForm from './components/PreChatForm';
import PhilosophyChat from './components/PhilosophyChat';
import PostChatForm from './components/PostChatForm';

function App() {
    return (
        <SessionProvider>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/pre-chat-form" element={<PreChatForm />} />
                        <Route path="/chat" element={<PhilosophyChat />} />
                        <Route path="/post-chat-form" element={<PostChatForm />} />
                    </Routes>
                </div>
            </Router>
        </SessionProvider>
    );
}

export default App;