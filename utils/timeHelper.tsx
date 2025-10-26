
import { useState } from "react";

export function addOffsetToTime(timeStr, offsetMinutes)
{
    const [hour, minute] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute + offsetMinutes );

    return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }
    );
}