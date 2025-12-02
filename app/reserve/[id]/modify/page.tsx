"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModifyReservationPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState<any>(null);

  // Editable fields
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(1);
  const [notes, setNotes] = useState("");

  // --- Mock API fetch (replace later with real backend call) ---
  const fetchReservation = async (id: string) => {
    return {
      id,
      guestName: "Jane Doe",
      date: "2024-11-15",
      time: "19:30",
      partySize: 4,
      phone: "(555) 123-4567",
      status: "Confirmed",
      notes: "Celebrating an anniversary.",
    };
  };

  useEffect(() => {
    fetchReservation(id as string).then((data) => {
      setReservation(data);

      // preload editable values
      setDate(data.date);
      setTime(data.time);
      setPartySize(data.partySize);
      setNotes(data.notes);

      setLoading(false);
    });
  }, [id]);

  const saveChanges = () => {
    alert("Changes saved (TODO: connect to backend)");
  };

  const cancelReservation = () => {
    alert("Reservation cancelled (TODO: backend)");
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex p-6 gap-6">

      {/* ------------------- SIDEBAR ------------------- */}
      <aside className="w-64 bg-white rounded-xl shadow p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-300" />
          <div>
            <p className="font-bold">Bistro Deluxe</p>
            <p className="text-sm text-gray-500">Management Panel</p>
          </div>
        </div>

        <nav className="space-y-3 text-gray-700">
          <a className="block p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
            Dashboard
          </a>
          <a className="block p-3 rounded-lg bg-blue-100 text-blue-600 font-semibold cursor-pointer">
            Reservations
          </a>
          <a className="block p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
            Floor Plan
          </a>
          <a className="block p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
            Menu
          </a>
          <a className="block p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
            Settings
          </a>
        </nav>

        <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
          New Reservation
        </button>
      </aside>

      {/* ------------------- MAIN CONTENT ------------------- */}
      <main className="flex-1 bg-white rounded-xl shadow p-10">

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
              Modify Reservation
            </h1>
            <p className="text-gray-600">
              Guest: <strong>{reservation.guestName}</strong> | Reservation ID: #{reservation.id}
            </p>
          </div>

          <button className="text-gray-400 hover:text-gray-600 text-2xl">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

          {/* ---------- CURRENT DETAILS ---------- */}
          <div className="border rounded-xl p-6 bg-gray-50 space-y-3">
            <h2 className="text-lg font-bold mb-2">Current Reservation Details</h2>

            <DetailRow label="Date" value={formatDate(reservation.date)} />
            <DetailRow label="Time" value={formatTime(reservation.time)} />
            <DetailRow label="Party Size" value={`${reservation.partySize} Guests`} />
            <DetailRow label="Contact Number" value={reservation.phone} />
            <DetailRow label="Status" value={reservation.status} />
            <DetailRow label="Special Requests" value={reservation.notes} />
          </div>

          {/* ---------- MODIFY FORM ---------- */}
          <div>
            <h2 className="text-lg font-bold mb-4">Modify Details</h2>

            {/* --- Date & Time --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 rounded-lg border"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 rounded-lg border"
                />
              </div>
            </div>

            {/* --- Party Size --- */}
            <label className="block mt-6 mb-1 font-semibold text-gray-700">
              Party Size
            </label>

            <div className="flex items-center gap-3">
              <button
                className="w-10 h-10 rounded-lg bg-gray-200 text-xl"
                onClick={() => setPartySize((p) => Math.max(1, p - 1))}
              >
                –
              </button>

              <span className="font-semibold text-lg">{partySize}</span>

              <button
                className="w-10 h-10 rounded-lg bg-gray-200 text-xl"
                onClick={() => setPartySize((p) => p + 1)}
              >
                +
              </button>
            </div>

            {/* --- Notes --- */}
            <label className="block mt-6 mb-1 font-semibold text-gray-700">
              Special Requests / Notes
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border p-3"
            />

            {/* --- Warning --- */}
            <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
              ⚠ A fee of $25 will be charged for cancellations within 4 hours of the reservation time.
            </div>

            {/* --- Buttons --- */}
            <div className="flex gap-4 mt-8">
              <button
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
                onClick={saveChanges}
              >
                Save Changes
              </button>

              <button
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700"
                onClick={cancelReservation}
              >
                Cancel Reservation
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ------------------- COMPONENTES AUXILIARES -------------------

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-gray-700">
      <strong>{label}: </strong> {value}
    </p>
  );
}

// Format helpers (UI only)
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(time: string) {
  const [h, m] = time.split(":");
  const hours = Number(h);
  const ampm = hours >= 12 ? "PM" : "AM";
  const adjusted = hours % 12 || 12;
  return `${adjusted}:${m} ${ampm}`;
}
