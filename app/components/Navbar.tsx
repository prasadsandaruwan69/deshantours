"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Plane, ChevronRight, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "Packages", href: "/packages" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) return null;

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6",
                scrolled
                    ? "py-4 bg-slate-950/90 backdrop-blur-3xl shadow-2xl border-b border-white/5"
                    : "py-8 bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-4 group">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="p-3.5 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/20 ring-1 ring-white/10"
                    >
                        <Plane className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex flex-col">
                        <span className="text-2xl md:text-4xl font-black tracking-tighter leading-none transition-colors text-white">
                            Deshan<span className="text-blue-500">Tours</span>
                        </span>
                        <span className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.4em] mt-2 opacity-100">
                            Authentic Ceylon
                        </span>
                    </div>
                </Link>

                {/* Global Navigation - Desktop */}
                <div className={cn(
                    "hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 px-12 py-4 backdrop-blur-3xl rounded-full border transition-all gap-14 shadow-inner",
                    scrolled
                        ? "bg-white/5 border-white/10"
                        : "bg-white/10 border-white/20"
                )}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "relative text-[11px] font-black uppercase tracking-[0.2em] transition-all group",
                                scrolled
                                    ? "text-white/60 hover:text-white"
                                    : "text-white/70 hover:text-white"
                            )}
                        >
                            {link.name}
                            <motion.span
                                className="absolute -bottom-1.5 left-0 h-[2px] bg-blue-500 rounded-full"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                            />
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    <Link
                        href="/packages"
                        className="group px-9 py-4 bg-blue-600 text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 active:scale-95 flex items-center gap-3"
                    >
                        Start Your Journey
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Mobile Navigation Controls */}
                <div className="flex items-center gap-4 lg:hidden">
                    <button
                        className={cn(
                            "p-2.5 rounded-xl shadow-xl transition-all",
                            scrolled ? "bg-blue-600 text-white" : "bg-blue-600 text-white"
                        )}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Futuristic Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed inset-x-6 top-32 bg-slate-950/98 backdrop-blur-[40px] rounded-[3rem] border border-white/10 p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] lg:hidden overflow-hidden"
                    >
                        <div className="absolute -bottom-20 -right-20 p-20 opacity-5 pointer-events-none">
                            <Globe size={400} className="text-blue-500 animate-spin-slow" />
                        </div>

                        <div className="flex flex-col gap-10 relative z-10 text-left">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-5xl font-black text-white hover:text-blue-500 tracking-tighter transition-all"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <Link
                                href="/packages"
                                className="mt-8 w-full py-7 bg-blue-600 text-white text-center rounded-[2rem] font-black text-2xl shadow-3xl shadow-blue-600/40"
                                onClick={() => setIsOpen(false)}
                            >
                                Plan My Adventure
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
