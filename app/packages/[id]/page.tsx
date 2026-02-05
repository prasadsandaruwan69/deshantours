"use client";

import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Check, Star, Calendar, Users, Utensils, Hotel, Car, User } from "lucide-react";
import { tourPackages } from "@/lib/packagesData";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase, Package } from "@/lib/supabase";

export default function PackageDetail() {
    const params = useParams();
    const id = params?.id ? parseInt(params.id as string) : null;
    const [pkg, setPkg] = useState<Package | null>(null);
    const [selectedDay, setSelectedDay] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchPackage();
        }
    }, [id]);

    const fetchPackage = async () => {
        try {
            const { data, error } = await supabase
                .from('packages')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setPkg(data);
        } catch (error) {
            console.error('Error fetching package:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-slate-50 min-h-screen flex items-center justify-center">
                <div className="text-slate-900 text-xl font-bold">Loading...</div>
            </div>
        );
    }

    if (!pkg) {
        return (
            <div className="bg-slate-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Package Not Found</h1>
                    <Link href="/packages" className="text-blue-500 hover:underline">
                        Back to Packages
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <Link href="/packages">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span className="font-bold">Back to Packages</span>
                        </motion.button>
                    </Link>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative h-[400px] rounded-[3rem] overflow-hidden mb-8"
                    >
                        <img
                            src={pkg.image}
                            alt={pkg.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-6 left-6">
                            <span className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-bold border border-white/30 uppercase tracking-widest">
                                {pkg.category} Tour
                            </span>
                        </div>

                        {/* Title */}
                        <div className="absolute bottom-8 left-8 right-8">
                            <h1 className="topic-title text-white mb-4">{pkg.name}</h1>
                            <p className="content-text text-white/90 max-w-3xl">{pkg.description}</p>
                        </div>
                    </motion.div>

                    {/* Quick Info Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {pkg.days > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm"
                            >
                                <Clock className="text-blue-600 mx-auto mb-2" size={32} />
                                <div className="text-3xl font-black text-slate-900 mb-1">{pkg.days}</div>
                                <div className="text-slate-500 text-sm font-semibold">Days</div>
                            </motion.div>
                        )}
                        {pkg.price > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-center"
                            >
                                <Star className="text-white mx-auto mb-2" size={32} />
                                <div className="text-3xl font-black text-white mb-1">${pkg.price}</div>
                                <div className="text-white/80 text-sm font-semibold">Per Person</div>
                            </motion.div>
                        )}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm"
                        >
                            <MapPin className="text-emerald-500 mx-auto mb-2" size={32} />
                            <div className="text-2xl font-black text-slate-900 mb-1">Sri Lanka</div>
                            <div className="text-slate-500 text-sm font-semibold">Destination</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm"
                        >
                            <Users className="text-yellow-500 mx-auto mb-2" size={32} />
                            <div className="text-2xl font-black text-slate-900 mb-1">Private</div>
                            <div className="text-slate-500 text-sm font-semibold">Group Type</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Left Column - Itinerary */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* What's Included */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
                            >
                                <h2 className="sub-topic-title mb-6 flex items-center gap-3">
                                    <Check className="text-emerald-600" size={32} strokeWidth={3} />
                                    What's Included
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {pkg.hotel_included && (
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Hotel className="text-blue-600" size={24} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 mb-1">Accommodation</div>
                                                <div className="text-slate-600 text-sm">{pkg.hotel_details}</div>
                                            </div>
                                        </div>
                                    )}

                                    {pkg.transport_included && (
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Car className="text-emerald-600" size={24} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 mb-1">Transportation</div>
                                                <div className="text-slate-600 text-sm">{pkg.transport_details}</div>
                                            </div>
                                        </div>
                                    )}

                                    {pkg.guide_included && (
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <User className="text-purple-600" size={24} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 mb-1">Tour Guide</div>
                                                <div className="text-slate-600 text-sm">{pkg.guide_details}</div>
                                            </div>
                                        </div>
                                    )}

                                    {pkg.meals && (
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Utensils className="text-yellow-600" size={24} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 mb-1">Meals</div>
                                                <div className="text-slate-600 text-sm">{pkg.meals}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Highlights */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
                            >
                                <h2 className="sub-topic-title mb-6 flex items-center gap-3">
                                    <Star className="text-yellow-600" size={32} fill="currentColor" />
                                    Tour Highlights
                                </h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {pkg.highlights.map((highlight, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4"
                                        >
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-slate-600">{highlight}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Day-by-Day Itinerary */}
                            {pkg.itinerary.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
                                >
                                    <h2 className="sub-topic-title mb-6 flex items-center gap-3">
                                        <Calendar className="text-blue-600" size={32} strokeWidth={3} />
                                        Day-by-Day Itinerary
                                    </h2>

                                    <div className="space-y-4">
                                        {pkg.itinerary.map((day: any, idx: number) => (
                                            <motion.div
                                                key={day.day}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-200 transition-all shadow-sm"
                                            >
                                                {/* Day Header */}
                                                <button
                                                    onClick={() => setSelectedDay(selectedDay === day.day ? 0 : day.day)}
                                                    className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white">
                                                            {day.day}
                                                        </div>
                                                        <div>
                                                            <div className="text-xl font-bold text-slate-900 mb-1">{day.title}</div>
                                                            <div className="text-slate-500 text-sm line-clamp-1">{day.description}</div>
                                                        </div>
                                                    </div>
                                                    <div className={`text-blue-600 transition-transform ${selectedDay === day.day ? 'rotate-180' : ''}`}>
                                                        ▼
                                                    </div>
                                                </button>

                                                {/* Day Details */}
                                                {selectedDay === day.day && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        className="px-6 pb-6 overflow-hidden"
                                                    >
                                                        <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                                                            {/* Activities */}
                                                            <div>
                                                                <div className="text-slate-900 font-bold mb-3">Activities</div>
                                                                <div className="space-y-2">
                                                                    {day.activities.map((activity: string, actIdx: number) => (
                                                                        <div key={actIdx} className="flex items-start gap-2 text-slate-600 text-sm">
                                                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                                                            <span>{activity}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Accommodation & Meals */}
                                                            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                                                                {day.accommodation && (
                                                                    <div>
                                                                        <div className="text-slate-500 text-xs mb-1">Accommodation</div>
                                                                        <div className="text-slate-900 font-semibold">{day.accommodation}</div>
                                                                    </div>
                                                                )}
                                                                {day.meals && (
                                                                    <div>
                                                                        <div className="text-slate-500 text-xs mb-1">Meals Included</div>
                                                                        <div className="text-slate-900 font-semibold">{day.meals}</div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Booking */}
                    <div className="space-y-6">
                        {/* Booking Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white sticky top-24"
                        >
                            {pkg.price > 0 ? (
                                <>
                                    <div className="text-center mb-8">
                                        <div className="text-sm opacity-80 mb-2">Starting from</div>
                                        <div className="text-5xl font-black mb-2">${pkg.price}</div>
                                        <div className="text-sm opacity-80">per person</div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4">
                                            <div className="text-sm opacity-80 mb-2">Duration</div>
                                            <div className="text-xl font-bold">{pkg.days} Days / {pkg.days - 1} Nights</div>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4">
                                            <div className="text-sm opacity-80 mb-2">Group Type</div>
                                            <div className="text-xl font-bold">Private Tour</div>
                                        </div>
                                    </div>

                                    <Link href="/contact">
                                        <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-xl mb-4">
                                            Book Now
                                        </button>
                                    </Link>
                                    <Link href="/contact">
                                        <button className="w-full py-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl font-bold border border-white/30 hover:bg-white/20 transition-all">
                                            Request Custom Quote
                                        </button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div className="text-center mb-8">
                                        <div className="text-3xl font-black mb-4">Custom Package</div>
                                        <p className="opacity-90">Design your perfect Sri Lankan adventure with our experts</p>
                                    </div>

                                    <Link href="/contact">
                                        <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-xl mb-4">
                                            Get Custom Quote
                                        </button>
                                    </Link>
                                    <Link href="/contact">
                                        <button className="w-full py-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl font-bold border border-white/30 hover:bg-white/20 transition-all">
                                            Contact Us
                                        </button>
                                    </Link>
                                </>
                            )}

                            <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm opacity-80">
                                <p>💬 Questions? Our travel experts are here to help!</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
