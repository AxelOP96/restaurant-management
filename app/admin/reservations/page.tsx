"use client";

import { useEffect, useState } from "react";

// --- Mock API data (reemplazar luego por fetch real) ---
const fetchTodayReservations = async () => {
  return [
    {
      id: "R-001",
      time: "19:00",
      name: "Jane Cooper",
      guests: 4,
      table: 12,
      status: "Upcoming",
      notes: "Birthday",
    },
    {
      id: "R-002",
      time: "19:15",
      name: "Wade Warren",
      guests: 2,
      table: 3,
      status: "Seated",
      notes: "",
    },
    {
      id: "R-003",
      time: "19:30",
      name: "Robert Fox",
      guests: 6,
      table: 21,
      status: "Upcoming",
      notes: "High Chair",
    },
    {
      id: "R-004",
      time: "18:30",
      name: "Esther Howard",
      guests: 2,
      table: 8,
      status: "Completed",
      notes: "",
    },
    {
      id: "R-005",
      time: "18:45",
      name: "Cameron Williamson",
      guests: 3,
      table: null,
      status: "No-show",
      notes: "",
    },
  ];
};

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTodayReservations().then(setReservations);
  }, []);

  const filteredReservations = reservations.filter((r) => {
    const matchesFilter = filter === "All" || r.status === filter;
    const matchesSearch =
      search.length === 0 ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FCF7F4] px-8 py-10">
      <h1 className="text-4xl font-extrabold text-[#2A1A18] mb-2">
        Today’s Reservations
      </h1>

      <p className="text-gray-600 mb-10">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* ---------- GRID LAYOUT ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* ---------- LEFT PANEL (STATS + RESERVATIONS LIST) ---------- */}
        <div className="lg:col-span-3 space-y-10">

          {/* --- Stats --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard title="Total Reservations" value={82} trend="+5%" />
            <StatCard title="Guests Seated" value={45} trend="-2%" negative />
            <StatCard title="Walk-ins" value={12} trend="+10%" />
            <StatCard title="Upcoming" value={25} trend="+8%" />
          </div>

          {/* --- Search + Filters --- */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <input
              type="text"
              placeholder="Search by name, phone number..."
              className="w-full md:w-1/2 p-3 border rounded-xl bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex gap-2 flex-wrap">
              {["All", "Upcoming", "Seated", "Completed", "No-show"].map((f) => (
                <button
                  key={f}
                  className={`px-4 py-2 rounded-full text-sm font-semibold 
                  ${filter === f
                      ? "bg-[#F04D23] text-white"
                      : "bg-[#E7DAD4] text-[#2A1A18]"
                    }`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* --- Reservations List --- */}
          <div className="bg-white p-6 rounded-2xl shadow space-y-6">
            {filteredReservations.map((r) => (
              <ReservationItem key={r.id} data={r} />
            ))}

            {filteredReservations.length === 0 && (
              <p className="text-center text-gray-500 py-6">
                No reservations found.
              </p>
            )}
          </div>
        </div>

        {/* ---------- RIGHT PANEL (FLOOR PLAN + TIMELINE) ---------- */}
        <div className="space-y-10">

          {/* --- Floor Plan --- */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold text-[#2A1A18] mb-4">Floor Plan</h2>

            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((table) => {
                const occupied = reservations.some(
                  (r) => r.table === table && r.status === "Seated"
                );

                const reserved = reservations.some(
                  (r) => r.table === table && r.status === "Upcoming"
                );

                return (
                  <div
                    key={table}
                    className={`p-4 rounded-lg text-center font-bold text-sm
                    ${occupied
                        ? "bg-green-200 text-green-900"
                        : reserved
                          ? "bg-blue-200 text-blue-900"
                          : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    {table.toString().padStart(2, "0")}
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- Daily Timeline --- */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold text-[#2A1A18] mb-4">Daily Timeline</h2>

            <TimelineBar hour="5 PM" intensity={20} />
            <TimelineBar hour="6 PM" intensity={40} />
            <TimelineBar hour="7 PM" intensity={95} highlight />
            <TimelineBar hour="8 PM" intensity={85} highlight />
            <TimelineBar hour="9 PM" intensity={30} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  trend,
  negative,
}: {
  title: string;
  value: number;
  trend: string;
  negative?: boolean;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-sm text-gray-600">{title}</p>
      <h3 className="text-3xl font-bold text-[#2A1A18] mt-2">{value}</h3>
      <p
        className={`text-sm mt-1 ${negative ? "text-red-500" : "text-green-600"}`}
      >
        {trend}
      </p>
    </div>
  );
}

function ReservationItem({ data }: any) {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <p className="font-bold">{data.time}</p>
        <p className="text-[#2A1A18]">{data.name}</p>
        <p className="text-sm text-gray-600">{data.guests} guests</p>
        {data.notes && (
          <p className="text-xs text-orange-600 mt-1">{data.notes}</p>
        )}
      </div>

      <div className="text-right">
        <p className="text-sm text-gray-500">Tbl {data.table || "--"}</p>

        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold
          ${data.status === "Upcoming" ? "bg-blue-100 text-blue-600" : ""}
          ${data.status === "Seated" ? "bg-green-100 text-green-600" : ""}
          ${data.status === "Completed" ? "bg-gray-200 text-gray-700" : ""}
          ${data.status === "No-show" ? "bg-red-100 text-red-600" : ""}
        `}
        >
          {data.status}
        </span>
      </div>
    </div>
  );
}

function TimelineBar({
  hour,
  intensity,
  highlight,
}: {
  hour: string;
  intensity: number;
  highlight?: boolean;
}) {
  return (
    <div className="mb-3">
      <p className="text-sm text-gray-700 mb-1">{hour}</p>
      <div className="w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
        <div
          className={`h-full 
          ${highlight ? "bg-[#F04D23]" : "bg-orange-300"}`}
          style={{ width: `${intensity}%` }}
        ></div>
      </div>
    </div>
  );
}
