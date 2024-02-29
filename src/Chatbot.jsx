import bot from "./assets/chatbot.jpg";
import './css/Chatbot.css';
import { Modal, Typography, Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import axios from "axios";

function Chatbot() {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:3001/chat", { prompt });
            setResponse(res.data); // Assuming the response contains data property
            setLoading(false);
            console.log(res);
        } catch (error) {
            console.error("Error submitting query:", error);
            setLoading(false);
        }
    }

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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Drop your Questions
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <TextField value={prompt} onChange={e => setPrompt(e.target.value)} id="outlined-basic" label="Query" variant="outlined" sx={{ margin: "15px 0", width: "100%" }} />
                            <Button type="submit" className="btn" disabled={loading}>
                                {loading ? "Loading..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                    {response && (
                        <div className="response">
                            <p>{response}</p>
                        </div>
                    )}
                </Box>
            </Modal>
        {/* Floating chat button */}
        <button 
        onClick={handleOpen} 
        className="floating-chat-btn"
        style={{ backgroundImage: `url(${bot})` }} // Set the image as background
        />
        </div>
    )
}

export default Chatbot;