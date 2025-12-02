"use client";

import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const params = useSearchParams();

  const table = params.get("table");
  const guests = params.get("guests");
  const date = params.get("date");
  const time = params.get("time");

  return (
    <div className="min-h-screen bg-[#FCF7F4] px-6 py-12">
      
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-10">
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-4">
            ✓
          </div>

          <h1 className="text-4xl font-extrabold text-[#2A1A18] text-center mb-2">
            Your Reservation is Confirmed!
          </h1>

          <p className="text-gray-600 text-center mb-10">
            We look forward to welcoming you!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-[#F3EBE7] rounded-xl p-6 text-center">
            <img
              src="/qr-placeholder.png"
              className="w-32 mx-auto mb-4"
              alt="QR"
            />
            <p className="text-sm text-[#2A1A18] font-semibold">
              Show this QR at the restaurant for quick check-in.
            </p>
          </div>

          <div className="space-y-3 text-[#2A1A18]">
            <p><strong>Restaurant:</strong> The Gourmet Table</p>
            <p><strong>Date & Time:</strong> {date} at {time}</p>
            <p><strong>Guests:</strong> {guests} people</p>
            <p><strong>Table:</strong> {table}</p>
            <p><strong>Confirmation ID:</strong> GRT-{table}-{time?.replace(":", "")}</p>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <button className="flex-1 bg-[#F04D23] text-white py-3 rounded-xl font-bold">
            Add to Calendar
          </button>
          <button className="flex-1 bg-[#F3EBE7] text-[#2A1A18] py-3 rounded-xl font-bold">
            Manage Reservation
          </button>
        </div>
      </div>
    </div>
  );
}
