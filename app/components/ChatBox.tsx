// /app/components/Chatbox.tsx
import React, { useState } from 'react';
import axios from 'axios';

const Chatbox = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [responseGenerative, setResponseGenerative] = useState<string>('');

    const handlePrompt = async () => {
        try {
            const res = await axios.post('http://localhost:5000/prompt', { prompt });
            setResponseGenerative(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Prompt ..."
                    className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handlePrompt}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Search
                </button>
            </div>

            <div className="mt-6">
                {responseGenerative ? (
                    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md">
                        <p>{responseGenerative}</p>
                    </div>
                ) : (
                    <p className="text-gray-500">No generative response available.</p>
                )}
            </div>
        </div>
    );
};

export default Chatbox;
