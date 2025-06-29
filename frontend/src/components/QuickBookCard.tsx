import React from 'react';


const QuickBookCard = () => {
    return (
        <div className="h-full flex flex-col cursor-pointer p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <div className="text-3xl mb-2">⚡</div>
            <h2 className="text-xl font-bold mb-1">Quick Book</h2>
            <p className="text-gray-600 mb-2 whitespace-pre-line">On-site within 2 hours,{'\n'}immediate confirmation</p>
            <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded mt-auto w-fit">emergency service</span>
        </div>
    );
}


export default QuickBookCard