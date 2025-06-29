import React from 'react';

const PostQuoteCard = () => {
    return (
        <div className="h-full flex flex-col cursor-pointer p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <div className="text-3xl mb-2">💰</div>
            <h2 className="text-xl font-bold mb-1">Post a bid</h2>
            <p className="text-gray-600 mb-2 whitespace-pre-line">Multiple quotes, choose the best</p>
            <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded mt-auto w-fit">comparison shopping</span>
        </div>
    );
}

export default PostQuoteCard