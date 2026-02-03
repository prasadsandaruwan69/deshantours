"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Search, MapPin, Filter } from "lucide-react";

const destinations = [
    { id: 1, title: "Ella", region: "Sri Lanka", type: "Mountain", image: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800" },
    { id: 2, title: "Bali", region: "Indonesia", type: "Tropical", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800" },
    { id: 3, title: "Maldives", region: "Indian Ocean", type: "Beach", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800" },
    { id: 4, title: "Kyoto", region: "Japan", type: "Culture", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800" },
    { id: 5, title: "Santorini", region: "Greece", type: "Coastal", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800" },
    { id: 6, title: "Swiss Alps", region: "Switzerland", type: "Snow", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800" },
];

export default function Destinations() {
    return (
        <div className="bg-slate-950 min-h-screen">
            <Navbar />
            <main className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-16">
                        <h1 className="text-5xl font-extrabold text-white mb-6">Discovery our Destinations</h1>
                        <p className="text-xl text-slate-400 max-w-2xl">
                            From the highest peaks to the clearest waters, explore our curated list of the world's most beautiful locations.
                        </p>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-12">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by city or country..."
                                className="w-full pl-12 pr-4 py-4 bg-slate-900 rounded-2xl border-none outline-none focus:ring-2 ring-blue-500 transition-all text-white placeholder:text-slate-500"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 rounded-2xl font-bold hover:bg-slate-800 transition-colors text-white">
                            <Filter size={20} />
                            Filters
                        </button>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {destinations.map((dest, index) => (
                            <motion.div
                                key={dest.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative h-80 overflow-hidden rounded-[2rem] shadow-lg"
                            >
                                <img src={dest.image} alt={dest.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
                                        <MapPin size={14} />
                                        {dest.region}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{dest.title}</h3>
                                    <span className="text-slate-300 text-sm font-medium">{dest.type} Escape</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
