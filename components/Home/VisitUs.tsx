export default function VisitUs() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
      
      <img src="/images/restaurant-front.jpg" className="rounded-xl shadow-xl" />

      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">Visit Us</h2>
        <p>123 Culinary Lane<br/>Flavor Town, FT 54321</p>

        <button className="bg-amber-700 text-white px-4 py-3 rounded-md mt-6 w-max">
          View on Map
        </button>
      </div>

    </section>
  );
}
