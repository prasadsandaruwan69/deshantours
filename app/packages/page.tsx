"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Star, Clock, Users, ArrowRight, MapPin, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase, Package } from "@/lib/supabase";

export default function Packages() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const { data, error } = await supabase
                .from('packages')
                .select('*')
                .order('price', { ascending: true });

            if (error) throw error;
            setPackages(data || []);
        } catch (error) {
            console.error('Error fetching packages:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = ["All", "Cultural", "Safari", "Beach", "Hill Country", "Adventure", "Custom"];

    const filteredPackages = selectedCategory === "All"
        ? packages
        : packages.filter(pkg => pkg.category === selectedCategory);

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
                            Tour Packages
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6">
                            Unforgettable Journeys
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Expertly crafted itineraries combining culture, adventure, wildlife, and relaxation
                        </p>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap gap-3 justify-center"
                    >
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${selectedCategory === category
                                    ? "bg-green-500 text-white shadow-lg shadow-green-600/30"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Packages Grid */}
            <section className="pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredPackages.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all duration-500"
                            >
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={pkg.image}
                                        alt={pkg.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                                    {/* Category Badge */}
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/30 uppercase tracking-widest">
                                            {pkg.category} Tour
                                        </span>
                                    </div>

                                    {/* Price Tag */}
                                    {pkg.price > 0 && (
                                        <div className="absolute top-6 right-6">
                                            <div className="bg-green-500 text-white px-6 py-3 rounded-2xl font-black text-2xl shadow-xl">
                                                ${pkg.price}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                                        {pkg.name}
                                    </h3>

                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {pkg.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        {pkg.days > 0 && (
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Clock size={18} className="text-green-600" />
                                                <span className="font-semibold">{pkg.days} Days</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <MapPin size={18} className="text-green-600" />
                                            <span className="font-semibold">Sri Lanka</span>
                                        </div>
                                    </div>

                                    {/* Included Items */}
                                    <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
                                        <h4 className="text-gray-900 font-bold mb-4 flex items-center gap-2">
                                            <Check size={20} className="text-green-600" />
                                            What's Included
                                        </h4>
                                        <div className="grid grid-cols-1 gap-3">
                                            {pkg.hotel_included && (
                                                <div className="flex items-start gap-2 text-sm text-gray-700">
                                                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                                    <span><strong>Hotel:</strong> {pkg.hotel_details}</span>
                                                </div>
                                            )}
                                            {pkg.transport_included && (
                                                <div className="flex items-start gap-2 text-sm text-gray-700">
                                                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                                    <span><strong>Transport:</strong> {pkg.transport_details}</span>
                                                </div>
                                            )}
                                            {pkg.guide_included && (
                                                <div className="flex items-start gap-2 text-sm text-gray-700">
                                                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                                    <span><strong>Guide:</strong> {pkg.guide_details}</span>
                                                </div>
                                            )}
                                            {pkg.meals && (
                                                <div className="flex items-start gap-2 text-sm text-gray-700">
                                                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                                    <span><strong>Meals:</strong> {pkg.meals}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div className="mb-6">
                                        <h4 className="text-gray-900 font-bold mb-3">Highlights</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {pkg.highlights.slice(0, 4).map((highlight, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold border border-blue-500/20"
                                                >
                                                    {highlight}
                                                </span>
                                            ))}
                                            {pkg.highlights.length > 4 && (
                                                <span className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                                                    +{pkg.highlights.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <Link href={`/packages/${pkg.id}`}>
                                        <button className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-600/20 group-hover:shadow-green-600/40">
                                            {pkg.category === "Custom" ? "Get Custom Quote" : "View Full Itinerary"}
                                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredPackages.length === 0 && (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold text-slate-400 mb-2">No packages found</h3>
                            <p className="text-slate-500">Try selecting a different category</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
