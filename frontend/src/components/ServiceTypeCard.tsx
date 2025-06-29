import React from 'react';

const ServiceTypeCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 items-stretch">
            {children}
        </div>
    );
}

export default ServiceTypeCard