'use Client'
import {useState, useEffect} from "react";
import { ticker } from "/utils/tempo.tsx";
//Component to display the current time using ticker function from tempo.tsx
export default function MainTime({currentTime} : {currentTime: Date}){
    const tempoPresente = ticker(currentTime);
    // const [tempoPresente, setTempoCorrente] = useState(currentTime)
    // useEffect(() => 
    //     {
    //         const interval = setInterval(() =>{
    //             setTempoCorrente(new Date());
    //         }, 1000);
    //         return ()=> clearInterval(interval)
    //     }, []);


    return (
    <div className="text-8xl font-light text-amber-200 text-shadow-lg shadow-amber-200">
        {
            tempoPresente.toLocaleTimeString('en-GB', 
                {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                })
        }
    </div>
    )
}

