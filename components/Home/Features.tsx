export default function Features() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Everything You Need for the Perfect Meal
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        From effortless booking to exploring our menu, we’ve streamlined your dining experience.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        
        <div className="p-6 border rounded-xl shadow-sm">
          <h3 className="font-bold mb-2">Effortless Online Reservations</h3>
          <p className="text-gray-600">Book your table in seconds with our simple system.</p>
        </div>

        <div className="p-6 border rounded-xl shadow-sm">
          <h3 className="font-bold mb-2">Explore Our Culinary Creations</h3>
          <p className="text-gray-600">Preview our seasonal menu and discover your next favorite dish.</p>
        </div>

        <div className="p-6 border rounded-xl shadow-sm">
          <h3 className="font-bold mb-2">Hear From Our Guests</h3>
          <p className="text-gray-600">Read authentic reviews from diners like you.</p>
        </div>

      </div>
    </section>
  );
}
