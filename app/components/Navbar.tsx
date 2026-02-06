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
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
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
                "fixed top-4 left-0 right-0 z-50 transition-all duration-500",
                "mx-4 md:mx-10 rounded-full",
                scrolled
                    ? "py-3 md:py-6 bg-white/90 backdrop-blur-lg border border-slate-200 shadow-lg"
                    : "py-4 md:py-6 bg-white/10 backdrop-blur-md border border-white/20"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between relative">
                {/* Left: Navigation Links - Desktop */}
                <div className={cn(
                    "hidden lg:flex items-center gap-8",
                    scrolled ? "text-slate-700" : "text-slate-800"
                )}>
                    {navLinks.slice(0, 3).map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative text-[11px] font-black uppercase tracking-[0.2em] transition-all group hover:text-green-500"
                        >
                            {link.name}
                            <motion.span
                                className="absolute -bottom-1.5 left-0 h-[2px] bg-green-500 rounded-full"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                            />
                        </Link>
                    ))}
                </div>

                {/* Center: Logo */}
                <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center group z-20">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative h-10 md:h-14 w-auto"
                    >
                        <img
                            src="/logo.png"
                            alt="Deshan Tours Logo"
                            className="h-full w-auto object-contain"
                        />
                    </motion.div>
                </Link>

                {/* Right: Navigation Links - Desktop */}
                <div className={cn(
                    "hidden lg:flex items-center gap-8",
                    scrolled ? "text-slate-700" : "text-slate-800"
                )}>
                    {navLinks.slice(3).map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative text-[11px] font-black uppercase tracking-[0.2em] transition-all group hover:text-green-500"
                        >
                            {link.name}
                            <motion.span
                                className="absolute -bottom-1.5 left-0 h-[2px] bg-green-500 rounded-full"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                            />
                        </Link>
                    ))}
                </div>

                {/* Mobile Navigation Controls */}
                <div className="flex items-center lg:hidden ml-auto">
                    <button
                        className={cn(
                            "p-2 rounded-xl transition-all",
                            scrolled ? "bg-green-500 text-white" : "bg-slate-100 text-slate-800 border border-slate-200"
                        )}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
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
                        className="fixed inset-x-4 top-24 bg-white/98 backdrop-blur-[40px] rounded-[2rem] border border-green-200 p-8 shadow-[0_50px_100px_rgba(34,197,94,0.2)] lg:hidden overflow-hidden"
                    >
                        <div className="absolute -bottom-20 -right-20 p-20 opacity-5 pointer-events-none">
                            <Globe size={300} className="text-green-500 animate-spin-slow" />
                        </div>

                        <div className="flex flex-col gap-6 relative z-10 text-left">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-3xl font-black text-gray-900 hover:text-green-500 tracking-tighter transition-all block"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <Link
                                href="/packages"
                                className="mt-4 w-full py-4 bg-green-500 text-white text-center rounded-2xl font-black text-xl shadow-lg shadow-green-600/40 block"
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
