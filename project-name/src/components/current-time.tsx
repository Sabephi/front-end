import React, { useState, useEffect } from 'react';


const getDayName = (dayIndex: number): string => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturnday"];
    return days[dayIndex];
};

export const CurrentTimeDisplay: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>('Loading time...');

    const displayCurrentTime = () => {
        const now = new Date();
        
        const dayName = getDayName(now.getDay());

        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        
        const timeString = `${hours}:${minutes}`;
        const fullText = `${dayName}, ${timeString}`;
        
        setCurrentTime(fullText);
    };

    useEffect(() => {
        displayCurrentTime(); 
    }, []); 

    return (
        <div className="time-now">
            <p>{currentTime}</p>
        </div>
    );
};

export default CurrentTimeDisplay;