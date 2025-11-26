"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReservePage() {
  const router = useRouter();

  const [guests, setGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const times = [
    "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30",
    "22:00",
  ];

  const handleFindTable = () => {
    if (!selectedDate || !selectedTime) return;

    router.push(
      `/select-table?guests=${guests}&date=${selectedDate}&time=${selectedTime}`
    );
  };

  return (
    <div className="min-h-screen bg-[#FCF7F4] px-6 py-12">

      {/* Title */}
      <h1 className="text-center text-5xl font-extrabold text-[#2A1A18] mb-12">
        Make a Reservation
      </h1>

      {/* Main layout */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT COLUMN: Guests + Calendar */}
        <div className="space-y-8">

          {/* Guests */}
          <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
            <div className="flex items-center gap-3 text-lg font-extrabold text-[#2A1A18]">
              <span>👤</span> Number of Guests
            </div>

            <div className="flex items-center gap-4 text-[#2A1A18]">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-10 h-10 bg-[#F3EBE7] rounded-full text-xl"
              >
                -
              </button>

              <span className="text-xl font-bold">{guests}</span>

              <button
                onClick={() => setGuests(guests + 1)}
                className="w-10 h-10 bg-[#F3EBE7] rounded-full text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-[#2A1A18]">Select a Date</h2>

            <input
              type="date"
              className="p-3 rounded-lg bg-[#F3EBE7] w-full"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Time */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-[#2A1A18]">Select a Time</h2>

          <div className="grid grid-cols-3 gap-3">
            {times.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`py-3 rounded-lg font-semibold 
                  ${
                    selectedTime === t
                      ? "bg-[#F04D23] text-white"
                      : "bg-[#F3EBE7] text-[#2A1A18]"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-4">
            For parties larger than 8, please call us directly at (123) 456-7890.
          </p>
        </div>
      </div>

      {/* CTA button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={handleFindTable}
          className="bg-[#F04D23] text-white px-12 py-4 rounded-xl text-lg font-bold"
        >
          Find a Table
        </button>
      </div>
    </div>
  );
}
