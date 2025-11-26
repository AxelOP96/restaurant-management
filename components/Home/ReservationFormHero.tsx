"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function ReservationFormHero() {
    const router = useRouter();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");

  const handleFindTable = () => {
    if (!date || !time || !guests) return;

    router.push(`/reserve?date=${date}&time=${time}&guests=${guests}`);
  };

  return (
    <div className="w-full flex justify-center -mt-20 relative z-40">
      <div className="bg-white1 shadow-xl rounded-xl px-6 py-4 flex gap-4 items-center">
        
        {/* Date */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold">Date</label>
          <input type="date" className="border p-2 rounded-md" value={date}
            onChange={(e) => setDate(e.target.value)}/>
        </div>

        {/* Time */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold">Time</label>
          <input type="time" className="border p-2 rounded-md" value={time}
            onChange={(e) => setTime(e.target.value)}/>
        </div>

        {/* Guests */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold">Guests</label>
          <select className="border p-2 rounded-md" value={guests}
            onChange={(e) => setGuests(e.target.value)}>
            <option value="2">2 people</option>
            <option value="3">3 people</option>
            <option value="4">4 people</option>
            <option value="5">5 people</option>
            <option value="6">6 people</option>
            <option value="7">7 people</option>
            <option value="8">8 people</option>
          </select>
        </div>

        <button onClick={handleFindTable} className="bg-amber-700 text-white px-4 py-3 rounded-md">
          Find a Table
        </button>

      </div>
    </div>
  );
}
