'use client';
import { FiSunrise, FiSunset } from "react-icons/fi";
import { useState, useEffect } from "react";
import { addOffsetToTime } from "/utils/timeHelper";
import { monthlyJamaatOffsets } from "/data/jamatOffset";

export default function PrayerCircles({ todaysData }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [month] = useState(currentTime.getMonth() + 1);
  const jamaatOffsetsForThisMonth = monthlyJamaatOffsets[month];

  // ✅ 1. Identify the NEXT upcoming Jama’at
  const [nextPrayer, setNextPrayer] = useState(null);

  const prayers = [
    { 
      name: 'FAJR', 
      position: 'top-[5%] left-[5%]',
      startTime: todaysData.timings.Fajr.split(' ')[0],
      jamaatTime: addOffsetToTime(todaysData.timings.Fajr.split(' ')[0], jamaatOffsetsForThisMonth.Fajr)
    },
    { 
      name: 'DHUHR', 
      position: 'top-[50%] left-[25%]',
      startTime: todaysData.timings.Dhuhr.split(' ')[0],
      jamaatTime: addOffsetToTime(todaysData.timings.Dhuhr.split(' ')[0], jamaatOffsetsForThisMonth.Dhuhr)
    },
    { 
      name: 'ASR', 
      position: 'top-[50%] left-1/2 transform -translate-x-1/2',
      startTime: todaysData.timings.Asr.split(' ')[0],
      jamaatTime: addOffsetToTime(todaysData.timings.Asr.split(' ')[0], jamaatOffsetsForThisMonth.Asr)
    },
    { 
      name: 'MAGHRIB', 
      position: 'top-[50%] right-[25%]',
      startTime: todaysData.timings.Maghrib.split(' ')[0],
      jamaatTime: addOffsetToTime(todaysData.timings.Maghrib.split(' ')[0], jamaatOffsetsForThisMonth.Maghrib)
    },
    { 
      name: 'ISHA', 
      position: 'top-[5%] right-[5%]',
      startTime: todaysData.timings.Isha.split(' ')[0],
      jamaatTime: addOffsetToTime(todaysData.timings.Isha.split(' ')[0], jamaatOffsetsForThisMonth.Isha)
    },
    {
      name: 'Sunrise',
      position: 'bottom-1 left-1',
      startTime: todaysData.timings.Sunrise.split(' ')[0],
      Icon: <FiSunrise/>
    },
    {
      name: 'Sunset',
      position: 'bottom-1 right-1',
      startTime: todaysData.timings.Sunset.split(' ')[0],
      Icon: <FiSunset/>
    }
  ];

  // ✅ 2. Figure out which Jama’at is next
  useEffect(() => {
    const now = new Date();

    const upcomingPrayer = prayers.find(prayer => {
      if (!prayer.jamaatTime) return false; // skip Sunrise/Sunset
      const [hour, minute] = prayer.jamaatTime.split(':').map(Number);
      const jamatTime = new Date();
      jamatTime.setHours(hour);
      jamatTime.setMinutes(minute);
      jamatTime.setSeconds(0);
      jamatTime.setMilliseconds(0);
      return jamatTime > now;
    });

    if (upcomingPrayer) {
      setNextPrayer(upcomingPrayer.name);
    } else {
      setNextPrayer(null);
    }
  }, [currentTime]);

  // ✅ 3. Update clock every 20 seconds (not 1s for performance)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 max-h-500 my-4">
      {/* Curved Arc */}
      <div className="absolute w-4/5 h-64 border-8 border-amber-200 border-t-0 rounded-b-full bottom-32 left-1/2 transform -translate-x-1/2 opacity-30 z-0 shadow-lg shadow-amber-500/20"></div>
      
      {/* Prayer Circles */}
      {prayers.map((prayer) => {
        const isNext = prayer.name === nextPrayer;

        return (
          <div 
            key={prayer.name}
            className={`
              prayer-circle absolute w-48 h-44 rounded-full border-2 
              ${isNext ? 'border-white scale-110 ring-8 scale-150 ring-amber-200 shadow-2xl z-20' : 'border-amber-200'} 
              backdrop-blur-lg shadow-lg shadow-amber-500/50 flex flex-col justify-center items-center 
              z-10 transition-all duration-400 hover:scale-125 hover:shadow-amber-500/80 ${prayer.position}
            `}
          >
            <div className="prayer-name text-amber-200 font-bold text-xl mb-2 uppercase tracking-wide">
              {prayer.name}
            </div>
            <div className="prayer-label text-xs opacity-90 uppercase tracking-wider">STARTS</div>
            <div className="prayer-time font-bold text-lg my-1">{prayer.startTime}</div>

            {prayer.jamaatTime && (
              <>
                <div className="prayer-label text-xs opacity-90 uppercase tracking-wider">Jama'at</div>
                <div className="prayer-time font-bold text-lg">{prayer.jamaatTime}</div>
              </>
            )}

            {prayer.Icon && (
              <div className="scale-200 mt-2 text-amber-300">
                {prayer.Icon}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
