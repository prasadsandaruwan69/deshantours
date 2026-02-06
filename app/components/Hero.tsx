"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, ChevronRight, Sparkles } from 'lucide-react';

const stats = [
    { label: 'Destinations', value: '50+' },
    { label: 'Happy Guests', value: '25k+' },
    { label: 'Experiences', value: '100+' },
    { label: 'Expert Guides', value: '40+' },
];

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex flex-col">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full"
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>

                {/* Overlays for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-white/20 to-transparent z-10" />
                <div className="absolute inset-0 bg-black/5 z-0" />
            </div>


            {/* Main Content Area - Centered Vertically for Balance */}
            <div className="relative z-20 max-w-7xl mx-auto mt-30 px-6 w-full flex-1 flex flex-col justify-center">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left">

                        <div className="relative overflow-hidden rounded-3xl">
                            {/* Blue background */}
                            <div className="absolute inset-0 bg-gradient-to-br " />

                            {/* Soft overlay */}
                            <div className="absolute inset-0 bg-black/30" />

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative z-10 space-y-6 max-w-4xl p-10 
               backdrop-blur-sm border border-white/30 shadow-2xl"
                            >
                                <h1 className="text-6xl md:text-[4.5rem] font-black leading-[0.85] tracking-tighter text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.9)]">
                                    Explore <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-green-200 animate-shimmer bg-[length:200%_auto]">
                                        Sri Lanka
                                    </span>
                                </h1>

                                <p className="text-lg md:text-xl text-white max-w-2xl font-bold leading-relaxed drop-shadow-lg">
                                    Ancient wonders, misty highlands, and golden shores. Experience the heart of the Indian Ocean with Deshan Tours.
                                </p>
                            </motion.div>
                        </div>

                    </div>

                    {/* Creative Floating Stats - Parallax Depth */}
                    <div className="hidden lg:grid grid-cols-2 gap-6 relative">

                    </div>
                </div>
            </div>

            {/* Bottom Floating Console - Refined Spacing */}
            <div className="relative z-20 w-full px-6 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="glass-card p-2 md:p-3 rounded-3xl md:rounded-full flex flex-col md:flex-row items-center gap-2 border-4 border-white shadow-2xl">
                        <div className="flex-1 flex items-center gap-4 px-8 py-3 w-full group">
                            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center transition-all group-hover:bg-green-500">
                                <MapPin className="text-green-600 group-hover:text-white transition-colors" size={20} />
                            </div>
                            <div className="text-left flex-1 min-w-[120px]">
                                <p className="text-[9px] font-black text-green-600 uppercase tracking-[0.2em] mb-1 opacity-60">Location</p>
                                <input
                                    type="text"
                                    placeholder="Where to?"
                                    className="bg-transparent border-none outline-none text-slate-900 w-full font-bold text-base placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-12 bg-slate-200" />

                        <div className="flex-1 flex items-center gap-4 px-8 py-3 w-full group">
                            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center transition-all group-hover:bg-green-500">
                                <Calendar className="text-green-600 group-hover:text-white transition-colors" size={20} />
                            </div>
                            <div className="text-left flex-1 min-w-[120px]">
                                <p className="text-[9px] font-black text-green-600 uppercase tracking-[0.2em] mb-1 opacity-60">Date</p>
                                <input
                                    type="text"
                                    placeholder="When next?"
                                    className="bg-transparent border-none outline-none text-slate-900 w-full font-bold text-base placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-12 bg-slate-200" />

                        <div className="flex-1 flex items-center gap-4 px-8 py-3 w-full group">
                            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center transition-all group-hover:bg-green-500">
                                <Users className="text-green-600 group-hover:text-white transition-colors" size={20} />
                            </div>
                            <div className="text-left flex-1 min-w-[120px]">
                                <p className="text-[9px] font-black text-green-600 uppercase tracking-[0.2em] mb-1 opacity-60">Travelers</p>
                                <input
                                    type="text"
                                    placeholder="Add friends"
                                    className="bg-transparent border-none outline-none text-slate-900 w-full font-bold text-base placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <button className="w-full md:w-auto px-12 py-5 bg-green-500 text-white rounded-full font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-slate-900 shadow-xl group">
                            <Search size={20} className="group-hover:rotate-12 transition-transform" />
                            <span>Explore</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
