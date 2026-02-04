"use client";

import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { MapPin, Calendar, Compass, ArrowLeft, Star, Clock, Camera } from "lucide-react";
import { sriLankaDestinations } from "@/lib/destinationsData";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase, Destination } from "@/lib/supabase";

export default function DestinationDetail() {
    const params = useParams();
    const id = params?.id ? parseInt(params.id as string) : null;
    const [destination, setDestination] = useState<Destination | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchDestination();
        }
    }, [id]);

    const fetchDestination = async () => {
        try {
            const { data, error } = await supabase
                .from('destinations')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setDestination(data);
        } catch (error) {
            console.error('Error fetching destination:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-slate-950 min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!destination) {
        return (
            <div className="bg-slate-950 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Destination Not Found</h1>
                    <Link href="/destinations" className="text-blue-500 hover:underline">
                        Back to Destinations
                    </Link>
                </div>
            </div>
        );
    }

    const galleryImages = [destination.main_image, ...destination.images];

    return (
        <div className="bg-slate-950 min-h-screen">
            <Navbar />

            {/* Hero Section with Image Gallery */}
            <section className="relative pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <Link href="/destinations">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span className="font-bold">Back to Destinations</span>
                        </motion.button>
                    </Link>

                    {/* Main Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative h-[500px] rounded-[3rem] overflow-hidden mb-6"
                    >
                        <img
                            src={galleryImages[selectedImage]}
                            alt={destination.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Type Badge */}
                        <div className="absolute top-6 left-6">
                            <span className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-bold border border-white/30 uppercase tracking-widest">
                                {destination.type}
                            </span>
                        </div>

                        {/* Title Overlay */}
                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest mb-3">
                                <MapPin size={18} />
                                {destination.region}
                            </div>
                            <h1 className="text-6xl md:text-7xl font-black text-white">{destination.name}</h1>
                        </div>
                    </motion.div>

                    {/* Image Thumbnails */}
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-12">
                        {galleryImages.map((img, idx) => (
                            <motion.button
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => setSelectedImage(idx)}
                                className={`relative h-24 md:h-32 rounded-2xl overflow-hidden transition-all ${selectedImage === idx
                                    ? "ring-4 ring-blue-500 scale-105"
                                    : "opacity-60 hover:opacity-100"
                                    }`}
                            >
                                <img src={img} alt={`${destination.name} ${idx + 1}`} className="w-full h-full object-cover" />
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Description */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
                            >
                                <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                                    <Compass className="text-blue-500" size={32} />
                                    About {destination.name}
                                </h2>
                                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                                    {destination.description}
                                </p>
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                                    <h3 className="text-xl font-bold text-blue-400 mb-3">What Makes It Special</h3>
                                    <p className="text-slate-300 leading-relaxed">
                                        {destination.speciality}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Activities */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
                            >
                                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                    <Star className="text-yellow-500" size={32} />
                                    Things to Do
                                </h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {destination.activities.map((activity, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-4 hover:bg-slate-800 transition-colors"
                                        >
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-slate-300">{activity}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Map */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
                            >
                                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                    <MapPin className="text-red-500" size={32} />
                                    Location
                                </h2>
                                <div className="aspect-video rounded-2xl overflow-hidden bg-slate-800">
                                    <iframe
                                        src={destination.map_embed_url}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                                <div className="mt-4 text-slate-400 text-sm">
                                    <p>Coordinates: {destination.latitude}, {destination.longitude}</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Best Time to Visit */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white sticky top-24"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <Calendar size={32} />
                                    <h3 className="text-2xl font-bold">Best Time to Visit</h3>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm opacity-80 mb-1">Recommended Months</div>
                                        <div className="text-2xl font-bold">{destination.best_time_months}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm opacity-80 mb-1">Weather</div>
                                        <div className="text-lg font-semibold">{destination.best_time_weather}</div>
                                    </div>

                                    <div className="pt-4 border-t border-white/20">
                                        <div className="text-sm opacity-80 mb-2">Why This Time?</div>
                                        <p className="leading-relaxed">{destination.best_time_reason}</p>
                                    </div>
                                </div>

                                {/* Book Now Button */}
                                <Link href="/contact">
                                    <button className="w-full mt-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-xl">
                                        Book This Destination
                                    </button>
                                </Link>
                            </motion.div>

                            {/* Quick Tips */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
                            >
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <Camera className="text-yellow-500" size={24} />
                                    Photography Tips
                                </h3>
                                <ul className="space-y-2 text-slate-300 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500">•</span>
                                        <span>Best light: Early morning or golden hour</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500">•</span>
                                        <span>Bring wide-angle lens for landscapes</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500">•</span>
                                        <span>Respect local customs when photographing</span>
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
