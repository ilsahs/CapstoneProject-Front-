import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Modal, Typography, Box, TextField, Button, Avatar } from '@mui/material';
import './css/Chatbot.css';
import botAvatar from "./assets/botAvatar.png";

function Chatbot() {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;
    
        setLoading(true);
        const userMessage = { text: prompt, sender: 'user' };
        setMessages([...messages, userMessage]);
        setPrompt("");
    
        try {
            const res = await axios.post("http://localhost:3001/chat", { prompt });
            const botResponse = { text: res.data, sender: 'bot' };
            setMessages(currentMessages => [...currentMessages, botResponse]);
        } catch (error) {
            console.error("Error submitting query:", error);
        }
    
        setLoading(false);
    };

    return (
        <div className="App">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="chatgpt-modal"
            >
                <Box className="container">
                    <Box className="chat-header">
                        <Avatar src={botAvatar} className="bot-avatar" />
                        <Typography variant="h6" component="div" className="header-title">
                            Event Bot Support
                        </Typography>
                    </Box>
                    <div className="messages-container">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender}-message`}>
                                <span>{message.text}</span>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <Box className="input-area" component="form" onSubmit={handleSubmit}>
                        <TextField
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            id="outlined-basic"
                            label="Query"
                            variant="outlined"
                            className="input-field"
                            disabled={loading}
                            fullWidth
                        />
                        <Button type="submit" color="primary" disabled={loading} className="submit-button">
                            Send
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <button 
                onClick={handleOpen} 
                className="floating-chat-btn"
                style={{ backgroundImage: `url(${botAvatar})` }}
            />
        </div>
    );
}

export default Chatbot;
