"use client";

import Link from "next/link";
import { Plane, Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-400 pt-32 pb-16 px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
                {/* Brand Section */}
                <div className="space-y-8 md:col-span-1 border-r border-slate-900 pr-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="p-2.5 bg-blue-600 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-xl shadow-blue-500/20">
                            <Plane className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight text-white">
                            Deshan<span className="text-blue-600">Tours</span>
                        </span>
                    </Link>
                    <p className="text-slate-500 leading-relaxed font-medium">
                        Crafting the world's most authentic travel experiences with passion and local expertise since 2010.
                    </p>
                    <div className="flex gap-4">
                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                whileHover={{ y: -5, scale: 1.1 }}
                                className="p-3 bg-slate-900 hover:bg-blue-600 rounded-xl text-white transition-colors"
                            >
                                <Icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Explore</h4>
                    <ul className="space-y-4">
                        {[
                            { name: "Destinations", href: "/destinations" },
                            { name: "Tour Packages", href: "/packages" },
                            { name: "About Story", href: "/about" },
                            { name: "Contact Support", href: "/contact" }
                        ].map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="group flex items-center gap-2 hover:text-blue-500 transition-colors font-bold"
                                >
                                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500" />
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Services</h4>
                    <div className="flex flex-wrap gap-2">
                        {["Luxury Stays", "Wild Safari", "Heritage", "Beach Tours", "Villas", "Adventure"].map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 bg-slate-900 hover:bg-blue-900/40 rounded-full text-xs font-bold text-slate-300 hover:text-white transition-all cursor-default border border-slate-800"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Contact</h4>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <MapPin className="text-blue-600 shrink-0" size={20} />
                            <span className="font-bold text-slate-300">123 Travel Lane, <br />Colombo 03, SL</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <Phone className="text-blue-600 shrink-0" size={20} />
                            <span className="font-bold text-slate-300">+1 (234) 567 890</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <Mail className="text-blue-600 shrink-0" size={20} />
                            <span className="font-bold text-blue-500 hover:underline">hello@deshantours.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-slate-600 uppercase tracking-widest">
                <p>© 2024 Deshan Tours. Excellence in Travel.</p>
                <div className="flex gap-10">
                    <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">Terms of Use</a>
                </div>
            </div>
        </footer>
    );
}
