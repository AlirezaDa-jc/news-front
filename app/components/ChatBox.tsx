'use client';

import React, { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
    const [input, setInput] = useState<any>({
        prompt: '',
        limit: 15,
    });
    const [responseGenerative, setResponseGenerative] = useState<any>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handlePrompt = async () => {
        setLoading(true); // Start loading
        try {
            const res = await axios.post('http://localhost:5000/prompt', { input });
            setResponseGenerative(res.data.response);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            <div className="flex flex-col space-y-4">
                <input
                    type="text"
                    value={input.prompt}
                    onChange={(e) => setInput((prevState) => ({ ...prevState, prompt: e.target.value }))}
                    placeholder="Prompt ..."
                    className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    value={input.limit}
                    onChange={(e) => setInput((prevState) => ({ ...prevState, limit: e.target.value }))}
                    placeholder="limit"
                    className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handlePrompt}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </div>

            <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
                {loading ? (
                    <p className="text-blue-500">Loading response...</p>
                ) : responseGenerative ? (
                    <div
                        className="prose prose-sm max-w-none" // Tailwind prose styles applied
                        dangerouslySetInnerHTML={{
                            __html: responseGenerative, // The HTML content coming from responseGenerative
                        }}
                    />
                ) : (
                    <p className="text-gray-500">No generative response available.</p>
                )}
            </div>
        </>
    );
};

export default ChatBox;
