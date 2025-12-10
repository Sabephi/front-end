import React from 'react';

interface WeatherDetailCardProps {
    label: string;
    value: string;
}

const WeatherDetailCard: React.FC<WeatherDetailCardProps> = ({ label, value }) => {
    return (
        <div className="detail-card">
            <p className="detail-label">{label}</p>
            <p className="detail-value">{value}</p>
        </div>
    );
};

export default WeatherDetailCard;