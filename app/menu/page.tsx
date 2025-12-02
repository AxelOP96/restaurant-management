"use client";

import { useEffect, useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tags: string[];
}

interface CartItem extends MenuItem {
  qty: number;
}
// --- Mock API --- (reemplazar por fetch real)
const fetchMenuItems = async (): Promise<MenuItem[]> => {
  return [
    {
      id: "dish1",
      name: "Quinoa & Avocado Salad",
      description: "A refreshing mix of quinoa, avocado, cherry tomatoes, and a zesty lime dressing.",
      price: 14.5,
      category: "Appetizers",
      image: "/food/quinoa.jpg",
      tags: ["Vegetarian", "Gluten-Free"],
    },
    {
      id: "dish2",
      name: "Margherita Pizza",
      description: "Classic pizza with San Marzano tomatoes, fresh mozzarella, basil, and olive oil.",
      price: 18,
      category: "Mains",
      image: "/food/pizza.jpg",
      tags: [],
    },
    {
      id: "dish3",
      name: "Berry Bliss Pancakes",
      description: "Fluffy pancakes topped with fresh berries, maple syrup, and powdered sugar.",
      price: 12,
      category: "Desserts",
      image: "/food/pancakes.jpg",
      tags: [],
    },
    {
      id: "dish4",
      name: "Grilled Atlantic Salmon",
      description: "Perfectly grilled salmon fillet served with roasted asparagus and lemon.",
      price: 26.5,
      category: "Mains",
      image: "/food/salmon.jpg",
      tags: ["Gluten-Free"],
    },
    {
      id: "dish5",
      name: "Decadent Chocolate Cake",
      description: "Rich chocolate layer cake with smooth ganache.",
      price: 9,
      category: "Desserts",
      image: "/food/chocolate.jpg",
      tags: [],
    },
    {
      id: "dish6",
      name: "Classic Beef Burger",
      description: "Juicy beef patty with cheddar cheese, lettuce, tomato, and signature sauce.",
      price: 17,
      category: "Mains",
      image: "/food/burger.jpg",
      tags: [],
    },
  ];
};

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | "Appetizers" | "Mains" | "Desserts" | "Drinks">("All");
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([]);

  const categories: Array<"All" | "Appetizers" | "Mains" | "Desserts" | "Drinks"> = [
    "All",
    "Appetizers",
    "Mains",
    "Desserts",
    "Drinks",
  ];
  const dietaryOptions = ["Vegetarian", "Gluten-Free", "Spicy"];

  useEffect(() => {
    fetchMenuItems().then(setMenu);
  }, []);

  const toggleDietary = (option: string) => {
    setDietaryFilters((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const filteredMenu = menu.filter((item) => {
    const matchCategory = category === "All" || item.category === category;
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase());

    const matchDietary =
      dietaryFilters.length === 0 ||
      dietaryFilters.every((f) => item.tags.includes(f));

    return matchCategory && matchSearch && matchDietary;
  });

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev[item.id];
      const qty = existing ? existing.qty + 1 : 1;

      return {
        ...prev,
        [item.id]: {
          ...item,
          qty,
        },
      };
    });
  };

  const updateQty = (id: string, change: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      const current = updated[id];

      if (!current) return prev;

      const newQty = current.qty + change;
      if (newQty <= 0) {
        delete updated[id];
      } else {
        updated[id] = { ...current, qty: newQty };
      }

      return updated;
    });
  };

  const cartItems = Object.values(cart); // CartItem[]
  const subtotal: number = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;

  return (
    <div className="min-h-screen bg-[#FFF8F4] p-10">
      
      {/* TOP NAV */}
      <header className="flex justify-between mb-10">
        <h1 className="text-2xl font-extrabold text-[#2A1A18]">The Gourmet Table</h1>

        <nav className="flex gap-10 text-lg">
          <a className="hover:text-orange-600 cursor-pointer">Home</a>
          <a className="hover:text-orange-600 text-orange-600 font-bold cursor-pointer">Menu</a>
          <a className="hover:text-orange-600 cursor-pointer">Reservations</a>
          <a className="hover:text-orange-600 cursor-pointer">Contact</a>
        </nav>
      </header>

      {/* LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-1 space-y-6">
          <input
            type="text"
            placeholder="Search for a dish..."
            className="w-full border p-3 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div>
            <h3 className="font-bold text-lg mb-3">Dietary Options</h3>

            {dietaryOptions.map((option) => (
              <label key={option} className="flex items-center gap-3 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dietaryFilters.includes(option)}
                  onChange={() => toggleDietary(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* MENU CONTENT */}
        <div className="lg:col-span-2">

          <h1 className="text-4xl font-extrabold text-[#2A1A18] mb-4">Our Menu</h1>

          {/* Category filters */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full font-semibold ${
                  category === c
                    ? "bg-orange-600 text-white"
                    : "bg-[#F3EBE7] text-[#2A1A18]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredMenu.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow p-4">
                <img
                  src={item.image}
                  className="rounded-xl w-full h-48 object-cover mb-4"
                />

                <h2 className="font-bold text-xl mb-1">{item.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-orange-600">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-xl font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <p className="text-center text-gray-400 mt-10">No dishes found.</p>
          )}
        </div>

        {/* CART */}
        <aside className="lg:col-span-1 bg-white rounded-2xl shadow p-6 h-fit sticky top-10">
          <h2 className="text-xl font-bold mb-4">Your Order</h2>

          {/* Items */}
          <div className="space-y-6">
            {Object.values(cart).map((item: any) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Qty */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-7 h-7 bg-gray-200 rounded-md"
                  >
                    –
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-7 h-7 bg-gray-200 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 border-t pt-4 space-y-1">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Taxes</span>
              <span>${taxes.toFixed(2)}</span>
            </p>
            <p className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </p>
          </div>

          <button className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg font-bold text-lg">
            View Cart & Checkout
          </button>
        </aside>
      </div>
    </div>
  );
}
