export default function ReservationFormHero() {
  return (
    <div className="w-full flex justify-center -mt-20 relative z-40">
      <div className="bg-white shadow-xl rounded-xl px-6 py-4 flex gap-4 items-center">
        
        {/* Date */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold">Date</label>
          <input type="date" className="border p-2 rounded-md" />
        </div>

        {/* Time */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold">Time</label>
          <input type="time" className="border p-2 rounded-md" />
        </div>

        {/* Guests */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold">Guests</label>
          <select className="border p-2 rounded-md">
            <option>2 people</option>
            <option>3 people</option>
            <option>4 people</option>
            <option>5 people</option>
          </select>
        </div>

        <button className="bg-amber-700 text-white px-4 py-3 rounded-md">
          Find a Table
        </button>

      </div>
    </div>
  );
}
