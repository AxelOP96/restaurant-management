export default function Hero() {
  return (
    <section
      className="w-full bg-center bg-cover h-[90vh] flex flex-col justify-center items-center text-center px-6"
      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2sIQ993e0BOMzyjo95gIf-2cC0KTy5niMIwAwYBEcUeSF2v_nm0A03R2PT2K0apPsIa9bS8BQgB5EZzgAzmUqd9JslOrjXC4iQtyY0zgLbYbJF8_T-ZQZtdnuBY3ZxYv5_d1vgov1gPq3QenR0aZspLgiprpFNwN3VYoYGoPl_1Nr9b-NJ5LvI9zoonrob_gIPqh4dZMoYHZ3JBO40jLaC8BQkRMITGvdQKJA2-GqkGdYusG8Sh9v1gS0UVHliiOHpdq-KZstHC4');" }}
    >
      <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg max-w-3xl">
        An Unforgettable Dining Experience Awaits
      </h1>

      <p className="text-white mt-4 text-lg drop-shadow">
        Reserve your table at The Gourmet Table and indulge in culinary excellence.
      </p>
    </section>
  );
}
