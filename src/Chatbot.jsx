import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Modal, Typography, Box, TextField, Button, Avatar } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MicIcon from '@mui/icons-material/Mic';
import './css/Chatbot.css';
import botAvatar from './assets/botAvatar.png';

function Chatbot() {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        const userMessage = { text: prompt, sender: 'user' };
        setMessages([...messages, userMessage]);
        setPrompt('');

        try {
            const res = await axios.post('http://localhost:3001/chat', { prompt });
            const botResponse = { text: res.data, sender: 'bot' };
            setMessages((currentMessages) => [...currentMessages, botResponse]);
        } catch (error) {
            console.error('Error submitting query:', error);
        }

        setLoading(false);
    };

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            // Add the user's uploaded image to the chat history
            const userImage = { imageUrl: URL.createObjectURL(file), sender: 'user' };
            setMessages((currentMessages) => [...currentMessages, userImage]);
            
            const res = await axios.post('http://localhost:3001/chat', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const botResponse = { text: res.data, sender: 'bot' };
            setMessages((currentMessages) => [...currentMessages, botResponse]);
        } catch (error) {
            console.error('Error submitting image:', error);
        }

        setLoading(false);
    };

    const handleCameraClick = () => {
        const inputElement = document.getElementById('fileInput');
        if (inputElement) {
            inputElement.click();
        }
    };

    const handleMicClick = () => {
        // Handle microphone click functionality
        console.log('Microphone icon clicked');
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
                                {message.text && <span>{message.text}</span>}
                                {message.imageUrl && <img src={message.imageUrl} alt="User uploaded" className="uploaded-image" />}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <Box className="input-area" component="form" onSubmit={handleSubmit}>
                        <TextField
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            id="outlined-basic"
                            label="Query"
                            variant="outlined"
                            className="input-field"
                            disabled={loading}
                            fullWidth
                        />
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                        <CameraAltIcon className="icon" onClick={handleCameraClick} />
                        <MicIcon className="icon" onClick={handleMicClick} />
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
