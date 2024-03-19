import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Modal, Typography, Box, TextField, Button, Avatar } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MicIcon from '@mui/icons-material/Mic';
import './css/Chatbot.css';
import botAvatar from './assets/botAvatar.png';
import bot from './assets/new1.png';
import userAvatar from './assets/userAvatar.png';
import SendIcon from '@mui/icons-material/Send';


function Chatbot() {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const recognition = useRef(null);
    const audioRecorder = useRef(null);


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
        // prompt the user for access to their microphone ({ audio: true })
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                const chunks = [];
                console.log("Microphone access granted");
                mediaRecorder.addEventListener('dataavailable', event => {
                    chunks.push(event.data);
                });
    
                mediaRecorder.addEventListener('stop', () => {
                    const blob = new Blob(chunks, { type: 'audio/wav' });
                    const formData = new FormData();
                    formData.append('file', blob, 'audio.wav'); // Adjust filename and type accordingly
    
                    // Send audio file to the backend for transcription
                    handleAudioInput(formData);
                });
    
                // Start recording
                mediaRecorder.start();
    
                // Stop recording after some duration (e.g., 5 seconds)
                setTimeout(() => {
                    mediaRecorder.stop();
                }, 5000); // Adjust duration as needed
            })
            .catch(error => {
                console.error('Error accessing microphone:', error);
            });
    };
    
    const handleAudioInput = async (formData) => {
        try {
            setLoading(true); //indicate that the audio submission is in progress.
    
            // Send the recorded audio to the backend for transcription
            const res = await axios.post('http://localhost:3001/chat', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            // Assuming the response contains transcribed text, update the messages state
            const audioUrl = URL.createObjectURL(formData.get('file'));
            const botResponse = { text: res.data, sender: 'bot' };
            //containing the audio URL, the audio file itself, and sets the sender as 'user'.
            const userAudioMessage = { audioUrl: audioUrl, audioFile: formData.get('file'), sender: 'user' };
            setMessages((currentMessages) => [...currentMessages, userAudioMessage, botResponse]);
    
            setLoading(false); //indicate that the audio submission is complete.
        } catch (error) {
            console.error('Error submitting audio:', error);
            setLoading(false);
        }
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
                                 
                                 {message.sender === 'user' ? (
                                    <div className="user-avatar avatar-container">
                                        <Avatar src={userAvatar} className="message-avatar" />
                                    </div>
                                ) : (
                                    <div className="bot1-avatar avatar-container">
                                        <Avatar src={bot} className="message-avatar" style={{ width: '40px', height: '60px' }} />
                                    </div>
                                )}

                                <div className="message-content">
                                    {message.text && <span>{message.text}</span>}
                                    {message.imageUrl && <img src={message.imageUrl} alt="User uploaded" className="uploaded-image" />}
                                    {message.audioUrl && (
                                        <audio controls>
                                            <source src={message.audioUrl} type="audio/wav" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    )}
                                    </div>
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
                        <CameraAltIcon className="icon camera-icon" onClick={handleCameraClick} />
                        <MicIcon className="icon mic-icon" onClick={handleMicClick} />
                        <Button
                            type="submit"
                            color="primary"
                            disabled={loading}
                            className="submit-button"
                            endIcon={<SendIcon />}
                        >
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
