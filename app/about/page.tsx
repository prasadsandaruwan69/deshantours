"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Heart, Globe, Shield, Award } from "lucide-react";

export default function About() {
    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <main className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Story Section */}
                    <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
                        <div className="lg:w-1/2">
                            <span className="text-green-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
                            <h1 className="text-5xl font-extrabold text-gray-900 mb-8">Crafting Memories Since 2010</h1>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Deshan Tours started with a simple belief: travel should be more than just visiting places; it should be about connecting with cultures and creating lifelong memories.
                            </p>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                What began as a small family-run agency in Sri Lanka has grown into a global travel brand, trusted by thousands of travelers from every corner of the world.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-4xl font-black text-green-600 mb-2">15k+</h4>
                                    <p className="text-gray-600 font-medium">Happy Travelers</p>
                                </div>
                                <div>
                                    <h4 className="text-4xl font-black text-green-600 mb-2">50+</h4>
                                    <p className="text-gray-600 font-medium">Destinations</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="aspect-square rounded-[3rem] overflow-hidden rotate-3 shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1596422846543-75c6fc183f27?q=80&w=800" alt="Team" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-emerald-500 rounded-3xl -rotate-6 flex items-center justify-center p-8 text-white font-bold text-xl shadow-xl">
                                Professional Guides Only
                            </div>
                        </div>
                    </div>

                    {/* Values Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                        {[
                            { icon: Heart, title: "Passion", desc: "We love what we do and it shows in every itinerary." },
                            { icon: Globe, title: "Ethical Travel", desc: "We respect local cultures and support local communities." },
                            { icon: Shield, title: "Safety First", desc: "Your security is our top priority during every journey." },
                            { icon: Award, title: "Quality", desc: "We partner with only the best hotels and transport services." }
                        ].map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-gray-50 rounded-3xl border border-gray-200"
                            >
                                <div className="p-4 bg-white rounded-2xl w-fit shadow-sm mb-6 border border-gray-200">
                                    <v.icon className="text-green-600" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{v.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
