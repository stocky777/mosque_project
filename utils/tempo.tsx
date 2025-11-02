'use Client'
///tempo.tsx returns the current time updated every second
import {useState, useEffect} from "react";
export function ticker(currentTime: Date)
{
    const [tempoPresente, setTempoCorrente] = useState(currentTime)
    useEffect(() => 
        {
            const interval = setInterval(() =>{
                setTempoCorrente(new Date());
            }, 1000);
            return ()=> clearInterval(interval)
        }, []);

        return tempoPresente;
}