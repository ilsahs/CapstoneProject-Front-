import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {
    const [value, setValue] = useState('');
    const [inputMessage, setInputMessage] = useState('');
    const [ws, setWs] = useState(null);

    // Ref for the hidden file input
    const fileInputRef = React.useRef(null);

    useEffect(() => {
        const newWs = new WebSocket('ws://localhost:3002');
        setWs(newWs);

        return () => {
            newWs.close();
        };
    }, []);

    useEffect(() => {
        if (!ws) return;

        ws.onmessage = (event) => {
            const receivedData = event.data;
            setValue((prevValue) => prevValue + receivedData); // Concatenate without newline
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }, [ws]);

    const handleChange = (event) => {
        setInputMessage(event.target.value);
    };

    const handleTextSubmit = () => {
        try {
            ws.send(JSON.stringify({ type: 'text', content: inputMessage }));
            setInputMessage(''); // Clear input after sending
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };

    const handleKeyPress = (event) => {
        // Detect "Enter" key without Shift key to send message
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleTextSubmit();
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

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
    };

    // Trigger the file input when the user wishes to upload a file
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <p>Streaming response:</p>
            <br />
            <div style={{ whiteSpace: 'pre-wrap' }}>{value}</div>
            <textarea
                value={inputMessage}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message or click 'Upload' for files..."
                rows={4}
            />
            <button onClick={handleTextSubmit}>Submit Text</button>
            <button onClick={triggerFileInput}>Upload File</button>
            {/* Hidden file input */}
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} accept="image/*,audio/*" />
        </div>
    );
};

export default Page;
