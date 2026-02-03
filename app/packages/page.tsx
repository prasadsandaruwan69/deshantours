"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Star, Clock, Users, ArrowRight } from "lucide-react";

const packages = [
    {
        id: 1,
        title: "Classic Sri Lanka Heritage",
        duration: "10 Days",
        group: "Max 12 People",
        rating: 4.9,
        reviewsCount: 128,
        price: "$1,299",
        image: "https://images.unsplash.com/photo-1588598116712-427909247f52?q=80&w=800",
        features: ["Boutique Hotels", "Private Driver", "Sigiriya Visit"]
    },
    {
        id: 2,
        title: "Bali Surf & Yoga Retreat",
        duration: "7 Days",
        group: "Max 8 People",
        rating: 4.8,
        reviewsCount: 95,
        price: "$899",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800",
        features: ["Eco Villas", "Surf Lessons", "Daily Yoga"]
    },
    {
        id: 3,
        title: "Maldives Overwater Luxury",
        duration: "5 Days",
        group: "Solo/Couples",
        rating: 5.0,
        reviewsCount: 42,
        price: "$2,499",
        image: "https://images.unsplash.com/photo-1544526226-d4568090ffb8?q=80&w=800",
        features: ["Half Board", "Spa Access", "Speedboat Transfer"]
    }
];

export default function Packages() {
    return (
        <div className="bg-slate-950 min-h-screen">
            <Navbar />
            <main className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-extrabold text-white mb-6">Unforgettable Tour Packages</h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Our expert travel planners have designed these special itineraries to give you the most authentic experiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/5"
                            >
                                <div className="md:w-2/5 relative min-h-[300px]">
                                    <img src={pkg.image} alt={pkg.title} className="absolute inset-0 w-full h-full object-cover" />
                                </div>
                                <div className="md:w-3/5 p-8 flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Star size={16} fill="currentColor" />
                                            <span className="text-sm font-bold">{pkg.rating}</span>
                                            <span className="text-slate-400 text-xs font-normal">({pkg.reviewsCount} reviews)</span>
                                        </div>
                                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{pkg.price}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 line-clamp-1">{pkg.title}</h3>

                                    <div className="flex gap-4 mb-6">
                                        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                                            <Clock size={16} className="text-blue-500" />
                                            {pkg.duration}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                                            <Users size={16} className="text-blue-500" />
                                            {pkg.group}
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-8 flex-1">
                                        {pkg.features.map(f => (
                                            <div key={f} className="flex items-center gap-2 text-slate-400 text-sm">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                                {f}
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                                        Explore Details
                                        <ArrowRight size={20} />
                                    </button>
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
