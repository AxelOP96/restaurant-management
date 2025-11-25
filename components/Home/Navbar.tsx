export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-xl font-semibold flex items-center gap-2">
          <img src="/images/logo.png" className="w-6 h-6" alt="logo"/>
          <span>The Gourmet Table</span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm">
          <a href="#" className="hover:text-amber-700">Menu</a>
          <a href="#" className="hover:text-amber-700">About Us</a>
          <a href="#" className="hover:text-amber-700">Contact</a>
        </nav>

        <button className="bg-amber-700 text-white px-4 py-2 rounded-md text-sm">
          Login / Sign Up
        </button>
      </div>
    </header>
  );
}
