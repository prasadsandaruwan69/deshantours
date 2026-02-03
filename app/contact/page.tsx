"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
    return (
        <div className="bg-slate-950 min-h-screen">
            <Navbar />
            <main className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16">
                        <div className="lg:w-1/3">
                            <h1 className="text-5xl font-extrabold text-white mb-8">Get in Touch</h1>
                            <p className="text-lg text-slate-400 mb-12">
                                Have questions about our packages or want a custom itinerary? Our team is here to help you 24/7.
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center shrink-0">
                                        <Mail className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Email us</h4>
                                        <p className="text-slate-500">hello@deshantours.com</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center shrink-0">
                                        <Phone className="text-emerald-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Call us</h4>
                                        <p className="text-slate-500">+1 (234) 567-890</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center shrink-0">
                                        <MapPin className="text-purple-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Visit us</h4>
                                        <p className="text-slate-500">123 Travel Lane, Adventure City</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/3">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-white/5"
                            >
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-6 py-4 bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 ring-blue-500 transition-all shadow-inner text-white placeholder:text-slate-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full px-6 py-4 bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 ring-blue-500 transition-all shadow-inner text-white placeholder:text-slate-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-300 ml-1">Subject</label>
                                        <input
                                            type="text"
                                            placeholder="I want to book a trip to Bali"
                                            className="w-full px-6 py-4 bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 ring-blue-500 transition-all shadow-inner text-white placeholder:text-slate-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-300 ml-1">Your Message</label>
                                        <textarea
                                            rows={6}
                                            placeholder="How can we help you?"
                                            className="w-full px-6 py-4 bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 ring-blue-500 transition-all shadow-inner resize-none text-white placeholder:text-slate-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all hover:shadow-xl shadow-blue-500/20 group">
                                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
