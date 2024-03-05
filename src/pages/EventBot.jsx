import React from 'react';
import Chatbot from '../Chatbot'; // Import the Chatbot component

function EventBot() {
    const userAvatarPath = "path_to_user_avatar"; // Define the path to the user avatar image

    return (
        <>
            <Chatbot/> {/* Pass the user avatar path as a prop */}
        </>
    );
}

export default EventBot;
