"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SelectTablePage() {
  const router = useRouter();

  // Estado para los params
  const [guests, setGuests] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  // Obtengo los parámetros desde window.location (solo en cliente)
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);

    setGuests(search.get("guests"));
    setDate(search.get("date"));
    setTime(search.get("time"));
  }, []);

  // 15 mesas
  const tables = [
    ...Array(5).fill(0).map((_, i) => ({ id: `T${i + 1}`, seats: 2 })),
    ...Array(5).fill(0).map((_, i) => ({ id: `T${i + 6}`, seats: 3 })),
    ...Array(5).fill(0).map((_, i) => ({ id: `T${i + 11}`, seats: 4 })),
  ];

  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!selectedTable) return;

    router.push(
      `/confirmation?table=${selectedTable}&guests=${guests}&date=${date}&time=${time}`
    );
  };

  return (
    <div className="min-h-screen bg-[#FCF7F4] px-6 py-12">
      <h1 className="text-center text-5xl font-extrabold text-[#2A1A18] mb-12">
        Select Your Table
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

        {/* SUMMARY */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="text-xl font-bold text-[#2A1A18] mb-6">Your Reservation</h2>

          <div className="space-y-3 text-[#2A1A18]">
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Guests:</strong> {guests} people</p>
            <p><strong>Selected Table:</strong> {selectedTable ?? "None"}</p>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!selectedTable}
            className={`w-full mt-6 py-3 rounded-xl text-lg font-bold 
              ${selectedTable ? "bg-[#F04D23] text-white" : "bg-gray-400 text-white"}
            `}
          >
            Confirm Your Table
          </button>

          <div className="mt-8">
            <p className="text-sm font-semibold text-[#2A1A18] mb-2">Legend</p>

            <div className="flex items-center gap-3 text-sm">
              <span className="w-4 h-4 bg-green-200 rounded"></span> Available
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-4 h-4 bg-[#F04D23] rounded"></span> Your Selection
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-4 h-4 bg-gray-300 rounded"></span> Unavailable
            </div>
          </div>
        </div>

        {/* TABLES GRID */}
        <div className="md:col-span-3 bg-white rounded-2xl shadow p-8">
          <h2 className="text-xl font-bold text-[#2A1A18] mb-6 text-center">
            Choose from our available tables
          </h2>

          <div className="grid grid-cols-5 gap-6 justify-items-center">
            {tables.map((table) => (
              <button
                key={table.id}
                onClick={() => setSelectedTable(table.id)}
                className={`
                  w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center
                  font-bold transition
                  ${
                    selectedTable === table.id
                      ? "bg-[#F04D23] text-white border-[#F04D23]"
                      : "bg-[#F3EBE7] text-[#2A1A18] border-transparent"
                  }
                `}
              >
                {table.id}
                <span className="text-sm font-normal">{table.seats} seats</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
