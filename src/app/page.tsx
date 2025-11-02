'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import PrayerCircles from "@/components/PrayerCircles";
import MainTime from "@/components/time";
import HadithOverlay from "@/components/hadithOverlay";
//import { monthlyJamaatOffsets } from "/data/jamatOffset.tsx"
export default function Home() {
  // State variables
  const [currentTime, setCurrentTime] = useState(new Date());
  const [data, setData] = useState(null); //all data from api stored here
  const [error, setError] = useState(null); //error code from api stored here
  const [year, setYear] = useState(currentTime.getFullYear()); //usestate takes the year from current time
  const [month, setMonth] = useState(currentTime.getMonth() + 1); //usestate takes the month from current time (+1 because months are 0-indexed) for eg. october is 9 so that plus 1 makes it 10
  const [apiUrl, setApiUrl] = useState(`https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=Dundee&country=GB&method=3&timezonestring=Europe/London&school=1`); //api url with year and month variables
  const [todaysData, setTodaysData] = useState<any>(null); //state to store today's data
  const [loading , setLoading] = useState(true); //state to track loading status
  //const jamaatOffsetsForThisMonth = monthlyJamaatOffsets[month];
  //useEffect to fetch data from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        const result = await response.json();
        if (response.ok) {
          console.log("Result is allez gooden",result.code); //code: 200 means all is good
          setData(result);
        } else {
          console.log("Result is baden",result.code); //any other code means there is an error
          setError(result.status);
        }
        //now to sorting the data to get only today's data
        //console.log("first day data:", result.data[0].date.gregorian.date); //logs data for 1st october (0th index bc 0 indexed);
        //logs today's date (18 for 18th october)
        const todayDateFormatted = currentTime.toLocaleDateString('en-GB').replace(/\//g, '-');
        console.log("Today's date formatted:", todayDateFormatted);
        console.log("looking for today's data...", currentTime);
        const todayData = result.data.find((day: any) => day.date.gregorian.date === todayDateFormatted);
        console.log("Today's data found:", todayData);
        setTodaysData(todayData);
        console.log("Today's Fajr time:", todayData.timings);
      } catch (error:any) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <LoadingSpinner/>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!todaysData) {
    return null;
  }
  


  return (
    <main className="flex w-full h-full flex-col items-center justify-between">
      <HadithOverlay/>
      {/* Header */}
      <section className="relative">
        <div className="relative backdrop-blur-sm m-5 p-5 w-auto scale-350 rounded-full border-8 shadow-2xl border-amber-200 shadow-amber-300">
          <h1 className="text-shadow-lg shadow-black">Baitul Mukkaram Mosque Jame</h1>
        </div>
        <div className="text-center backdrop-blur-sm mt-10 p-5 w-auto scale-160 rounded-full border-8 border-amber-200 shadow-2xl shadow-amber-300">
          <p className="">{todaysData.date.hijri.date} - {todaysData.date.hijri.weekday.en} / {todaysData.date.hijri.weekday.ar}</p>
          <p className="">{todaysData.date.hijri.month.en} - {todaysData.date.hijri.month.ar} / {todaysData.date.gregorian.month.en}</p>
          <p className="">{todaysData.date.gregorian.date} - {todaysData.date.gregorian.weekday.en}</p>
        </div>
      </section>


      <section className="relative w-full p-12 text-center mt-12">
        <MainTime currentTime={currentTime}/>
      </section>

      <section className="w-full h-full mt-20">
          <PrayerCircles todaysData={todaysData} />
      </section>

    





      {/* <div className="relative m-5 p-5 w-auto scale-160 rounded-full bg-gray-600">
        <p className="">19 Jumada Al-thani 1445</p>
        <p>OCTOBER 18, 2025</p>
      </div>

      <div className="relative m-5 p-5 w-auto scale-160 rounded-full bg-gray-600">
        <p className="">12:43 AM</p>
        <p>Next Jama'at at 1:14 AM</p>
      </div> */}
      
    </main>
  );
}