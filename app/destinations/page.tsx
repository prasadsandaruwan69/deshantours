"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Search, MapPin, Filter, Calendar, Compass, ArrowRight, Clock, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase, Destination } from "@/lib/supabase";

export default function Destinations() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<string>("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const { data, error } = await supabase
                .from('destinations')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;
            setDestinations(data || []);
        } catch (error) {
            console.error('Error fetching destinations:', error);
        } finally {
            setLoading(false);
        }
    };

    const types = ["All", ...Array.from(new Set(destinations.map(d => d.type)))];

    const filteredDestinations = destinations.filter(dest => {
        const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dest.region.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === "All" || dest.type === selectedType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="bg-white min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-green-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <span className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4 block">
                            Explore Sri Lanka
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6">
                            Discover Amazing Destinations
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From ancient fortresses to pristine beaches, explore the pearl of the Indian Ocean's most breathtaking locations
                        </p>
                    </motion.div>

                    {/* Search and Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="flex flex-col md:flex-row gap-4 mb-8">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search destinations..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white backdrop-blur-xl rounded-2xl border border-gray-200 outline-none focus:ring-2 ring-green-500 transition-all text-gray-900 placeholder:text-gray-400 shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Type Filter Pills */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {types.map(type => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${selectedType === type
                                        ? "bg-green-500 text-white shadow-lg shadow-green-600/30"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Destinations Grid */}
            <section className="pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDestinations.map((dest, index) => (
                            <motion.div
                                key={dest.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group"
                            >
                                <Link href={`/destinations/${dest.id}`}>
                                    <div className="relative h-[400px] overflow-hidden rounded-[2rem] bg-white border border-gray-200 hover:border-green-300 transition-all duration-500 cursor-pointer shadow-sm">
                                        {/* Image */}
                                        <div className="absolute inset-0">
                                            <img
                                                src={dest.main_image}
                                                alt={dest.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                        </div>

                                        {/* Type Badge */}
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/30 uppercase tracking-widest">
                                                {dest.type}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-widest mb-2">
                                                <MapPin size={14} />
                                                {dest.region}
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-2">{dest.name}</h3>
                                            <p className="text-slate-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                {dest.speciality}
                                            </p>

                                            {/* View Details Button */}
                                            <div className="flex items-center gap-2 text-white font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                                <span>View Details</span>
                                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {filteredDestinations.length === 0 && (
                        <div className="text-center py-20">
                            <Compass size={64} className="text-slate-700 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-400 mb-2">No destinations found</h3>
                            <p className="text-slate-500">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
