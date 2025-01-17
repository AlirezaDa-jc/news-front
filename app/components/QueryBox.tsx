'use client';

import React, { useState } from 'react';
import axios from 'axios';

const QueryBox = () => {
    const [input, setInput] = useState<any>({
        query: '',
        limit: 15,
    });
    const [response, setResponse] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleQuery = async () => {
        setLoading(true); // Start loading
        try {
            const res = await axios.post('http://localhost:5000/query', { input });
            setResponse(res.data);
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
                    value={input.query}
                    onChange={(e) => setInput((prevState) => ({ ...prevState, query: e.target.value }))}
                    placeholder="Keywords ..."
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
                    onClick={handleQuery}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    disabled={loading} // Disable button during loading
                >
                    {loading ? 'Loading...' : 'Search News'}
                </button>
            </div>
            <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
                {loading ? (
                    <p className="text-blue-500">Loading results...</p>
                ) : response.length > 0 ? (
                    <div className="space-y-4">
                        {response.map((item, index) => (
                            <div key={index}>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {item.properties?.headline || 'No headline'}
                                </h3>
                                <p className="text-gray-600 mt-1">
                                    {item.properties?.short_description || 'No description'}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    {item.properties?.date || 'No date'}
                                </p>
                                {item.properties?.link && (
                                    <a
                                        href={item.properties?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline mt-2 block"
                                    >
                                        Read more
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No results to display.</p>
                )}
            </div>
        </>
    );
};

export default QueryBox;
