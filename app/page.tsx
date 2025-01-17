import React from 'react';
import QueryBox from './components/QueryBox';
import ChatBox from './components/ChatBox';

const HomePage = () => {
    return (
        <div className="App min-h-screen flex justify-center items-center bg-gray-200">
            <div className="flex space-x-6 gap-4 w-full max-w-6xl p-6">
                <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
                    <QueryBox/>
                </div>
                <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
                    <ChatBox/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
