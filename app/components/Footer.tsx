"use client";

import Link from "next/link";
import Image from "next/image";
import { Plane, Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative bg-white text-gray-600 pt-32 pb-16 px-6 overflow-hidden border-t border-slate-100">
            {/* Background Image Container with Float Animation */}
            <motion.div
                animate={{ y: [-20, 20] }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/footer_bg_image.png"
                    alt="Footer Background"
                    fill
                    className="object-cover opacity-40 scale-110"
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-white/10 z-0" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
                {/* Brand Section */}
                <div className="space-y-8 md:col-span-1 border-r border-gray-200 pr-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-xl">
                            <img
                                src="/logo.png"
                                alt="Deshan Tours Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-3xl font-bold tracking-tight text-gray-900">
                            Deshan<span className="text-green-500">Tours</span>
                        </span>
                    </Link>
                    <p className="text-gray-500 leading-relaxed font-medium">
                        Crafting the world's most authentic travel experiences with passion and local expertise since 2010.
                    </p>
                    <div className="flex gap-4">
                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                whileHover={{ y: -5, scale: 1.1 }}
                                className="p-3 bg-white hover:bg-green-500 rounded-xl text-gray-700 hover:text-white transition-colors shadow-sm border border-gray-200"
                            >
                                <Icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-gray-900 font-bold text-lg mb-8 uppercase tracking-widest text-sm">Explore</h4>
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
                                    className="group flex items-center gap-2 hover:text-green-600 transition-colors font-bold"
                                >
                                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-green-600" />
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="text-gray-900 font-bold text-lg mb-8 uppercase tracking-widest text-sm">Services</h4>
                    <div className="flex flex-wrap gap-2">
                        {["Luxury Stays", "Wild Safari", "Heritage", "Beach Tours", "Villas", "Adventure"].map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 bg-white hover:bg-green-50 rounded-full text-xs font-bold text-gray-700 hover:text-green-600 transition-all cursor-default border border-gray-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-gray-900 font-bold text-lg mb-8 uppercase tracking-widest text-sm">Contact</h4>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <MapPin className="text-green-600 shrink-0" size={20} />
                            <span className="font-bold text-gray-700">123 Travel Lane, <br />Colombo 03, SL</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <Phone className="text-green-600 shrink-0" size={20} />
                            <span className="font-bold text-gray-700">+1 (234) 567 890</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <Mail className="text-green-600 shrink-0" size={20} />
                            <span className="font-bold text-green-600 hover:underline">hello@deshantours.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-gray-500 uppercase tracking-widest">
                <p>© 2024 Deshan Tours. Excellence in Travel.</p>
                <div className="flex gap-10">
                    <a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-green-600 transition-colors">Terms of Use</a>
                </div>
            </div>
        </footer>
    );
}
