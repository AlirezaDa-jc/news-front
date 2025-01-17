import React, { useState } from 'react';
import axios from 'axios';

interface NewsResponse {
    properties: {
        headline: string;
        short_description: string;
        date: string;
        link?: string;
    };
}

interface QueryInputProps {
    setResponse: React.Dispatch<React.SetStateAction<NewsResponse[]>>;
}

const QueryInput: React.FC<QueryInputProps> = ({ setResponse }) => {
    const [query, setQuery] = useState<string>('');

    const handleQuery = async () => {
        try {
            const res = await axios.post('http://localhost:5000/query', { query });
            setResponse(res.data); // Assuming the response is an array of news objects
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Keywords ..."
                className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleQuery}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Search News
            </button>
        </div>
    );
};

export default QueryInput;
