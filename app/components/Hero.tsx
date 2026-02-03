"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Compass, ChevronRight, Sparkles } from 'lucide-react';

const stats = [
    { label: 'Destinations', value: '50+' },
    { label: 'Happy Guests', value: '25k+' },
    { label: 'Experiences', value: '100+' },
    { label: 'Expert Guides', value: '40+' },
];

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[750px] w-full overflow-hidden flex flex-col">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-[1.05]"
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-slate-950/70 transition-colors duration-700" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center pt-20">
                {/* Main Content Area */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="text-left space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-blue-500/10 backdrop-blur-2xl border border-blue-400/20 rounded-full text-blue-500 text-[9px] font-black uppercase tracking-[0.2em]"
                        >
                            <Sparkles size={12} className="animate-pulse" />
                            Discover Authentic Ceylon
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h1 className="text-8xl md:text-[12rem] font-black text-white leading-[0.75] tracking-[ -0.05em] mb-10">
                                Explore <br />
                                <span className="text-gradient inline-block pb-4">Sri Lanka</span>
                            </h1>
                            <p className="text-xl md:text-3xl text-slate-200 max-w-3xl font-semibold leading-snug opacity-90">
                                Ancient wonders, misty highlands, and golden shores. Let Deshan Tours guide you through the heart of the Indian Ocean.
                            </p>
                        </motion.div>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95">
                                Book Now
                                <ChevronRight size={16} />
                            </button>
                            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/10 transition-all">
                                The Collections
                            </button>
                        </div>
                    </div>

                    <div className="hidden lg:flex justify-end pr-10 opacity-30">
                        <motion.div
                            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Compass size={280} className="text-white" strokeWidth={0.3} />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Floating Search Bar Console - Positioned at the bottom with safe padding */}
            <div className="relative z-20 pb-16 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="glass-card p-2 md:p-3 rounded-3xl md:rounded-[2.5rem] flex flex-col md:flex-row items-center gap-2 animate-glow border-2 border-white/20 dark:border-white/10">
                        <div className="flex-1 flex items-center gap-4 px-6 py-3 w-full group">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl shadow-lg flex items-center justify-center transition-transform group-hover:scale-110">
                                <MapPin className="text-white" size={20} />
                            </div>
                            <div className="text-left flex-1 min-w-[100px]">
                                <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1 opacity-60">Destination</p>
                                <input
                                    type="text"
                                    placeholder="Where to?"
                                    className="bg-transparent border-none outline-none text-white w-full font-black text-lg placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-white/10" />

                        <div className="flex-1 flex items-center gap-4 px-6 py-3 w-full group">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl shadow-lg flex items-center justify-center transition-transform group-hover:scale-110">
                                <Calendar className="text-white" size={20} />
                            </div>
                            <div className="text-left flex-1 min-w-[100px]">
                                <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1 opacity-60">Travel Date</p>
                                <input
                                    type="text"
                                    placeholder="Select Date"
                                    className="bg-transparent border-none outline-none text-white w-full font-black text-lg placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-white/10" />

                        <div className="flex-1 flex items-center gap-4 px-6 py-3 w-full group">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl shadow-lg flex items-center justify-center transition-transform group-hover:scale-110">
                                <Users className="text-white" size={20} />
                            </div>
                            <div className="text-left flex-1 min-w-[100px]">
                                <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1 opacity-60">Guests</p>
                                <input
                                    type="text"
                                    placeholder="How many?"
                                    className="bg-transparent border-none outline-none text-white w-full font-black text-lg placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        <button className="w-full md:w-auto px-10 py-5 bg-white text-blue-600 rounded-[1.5rem] md:rounded-[2rem] font-black text-lg uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-blue-50 shadow-2xl group">
                            <Search size={22} className="group-hover:rotate-12 transition-transform" />
                            <span>Explore</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
