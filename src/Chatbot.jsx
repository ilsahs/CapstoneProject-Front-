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
    // const [isBotTyping, setIsBotTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const [value, setValue] = useState('');
    const [ws, setWs] = useState(null);
    let text = ''

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const newWs = new WebSocket('ws://localhost:3002');
        setWs(newWs);

        return () => {
        };
    }, []);

    useEffect(() => {
        if (!ws) return;

        ws.onmessage = (event) => {
            const receivedData = event.data;
            if (receivedData === '{"type":"endConversation"}'){
                text = ''
                setLoading(false);
            }
            else {
                text += receivedData;
                setValue((prevValue) => prevValue + receivedData); // Concatenate without newline
                setMessages(messages => messages.slice(0, -1).concat({ ...messages[messages.length - 1], text: text }));
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setLoading(false);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            setLoading(false);
        };
    }, [ws]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const baseURL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!prompt.trim()) return;

        setLoading(true);
        const userMessage = { text: prompt, sender: 'user' };
        setMessages((currentMessages) => [...currentMessages, userMessage]);
        // setPrompt('');

        try {
            // const res = await axios.post(baseURL +'/chat', { prompt });            
            ws.send(JSON.stringify({ type: 'text', content: prompt }));            
            setPrompt(''); // Clear input after sending
            // setIsBotTyping(true);
            const botResponse = { text: "", sender: 'bot' };
            setMessages((currentMessages) => [...currentMessages, botResponse]);
        } catch (error) {
            console.error('Error submitting query:', error);
        }
    };

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        console.log(formData);

        const reader = new FileReader();


        try {
            setLoading(true);
            const userImage = { imageUrl: URL.createObjectURL(file), sender: 'user' };
            setMessages((currentMessages) => [...currentMessages, userImage]);

            reader.onloadend = function() {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
    
                ws.send(JSON.stringify({
                    type: 'file',
                    mimeType: file.type,
                    content: base64String,
                    fileName: file.name
                }));
                
                const botResponse = { text: "", sender: 'bot' };
                setMessages((currentMessages) => [...currentMessages, botResponse]);
            };
            reader.readAsDataURL(file);
            
        } catch (error) {
            console.error('Error submitting image:', error);
        }
    };

    const handleCameraClick = () => {
        const inputElement = document.getElementById('fileInput');
        if (inputElement) {
            inputElement.click();
        }
    };

    const handleMicClick = () => {
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
                    formData.append('file', blob, 'audio.wav');
                    handleAudioInput(formData);
                });
    
                mediaRecorder.start();
                setTimeout(() => {
                    mediaRecorder.stop();
                }, 5000);
            })
            .catch(error => {
                console.error('Error accessing microphone:', error);
            });
    };
    
    const handleAudioInput = async (formData) => {
        const file = formData.get('file')
        try {
            setLoading(true);
            if (!file) return;

            const audioUrl = URL.createObjectURL(formData.get('file'));
            const botResponse = { text: '', sender: 'bot' };
            const userAudioMessage = { audioUrl: audioUrl, audioFile: formData.get('file'), sender: 'user' };
            setMessages((currentMessages) => [...currentMessages, userAudioMessage, botResponse]);

            const reader = new FileReader();
            reader.onloadend = function() {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

                ws.send(JSON.stringify({
                    type: 'file',
                    mimeType: file.type,
                    content: base64String,
                    fileName: file.name
                }));
            };
            reader.readAsDataURL(file);
           
        } catch (error) {
            console.error('Error submitting audio:', error);
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
                        {console.log(messages)}
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
                                {message.sender === "user" ? (
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
                                    ): <div className="message-content">
                                        {message.text === ''? (
                                            <span>Typing...</span> )
                                        : (
                                        <>
                                            {console.log(messages)}
                                            <span>{message.text}</span>
                                            {message.imageUrl && <img src={message.imageUrl} alt="User uploaded" className="uploaded-image" />}
                                            {message.audioUrl && (
                                                <audio controls>
                                                    <source src={message.audioUrl} type="audio/wav" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                                
                                            )}
                                        </>
                                        )}
                                    </div>
                                }
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <Box className="input-area" component="form" onSubmit={handleSubmit}>
                        {/* Typing indicator */}
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
                        <CameraAltIcon className="icon camera-icon" onClick={handleCameraClick} style={{ pointerEvents: loading ? 'none' : 'auto' }} />
                        <MicIcon className="icon mic-icon" onClick={handleMicClick} style={{ pointerEvents: loading ? 'none' : 'auto' }} />
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
