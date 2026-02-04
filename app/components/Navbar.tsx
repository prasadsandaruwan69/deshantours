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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-12 md:px-20",
                scrolled
                    ? "py-4 bg-white/20 backdrop-blur-lg border-b border-white/10 shadow-sm"
                    : "py-6 bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left: Navigation Links - Desktop */}
                <div className={cn(
                    "hidden lg:flex items-center gap-8",
                    scrolled ? "text-gray-700" : "text-gray-800"
                )}>
                    {navLinks.slice(0, 3).map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative text-[11px] font-black uppercase tracking-[0.2em] transition-all group hover:text-green-600"
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
                <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center group">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative h-14 w-auto"
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
                    scrolled ? "text-gray-700" : "text-gray-800"
                )}>
                    {navLinks.slice(3).map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative text-[11px] font-black uppercase tracking-[0.2em] transition-all group hover:text-green-600"
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

                {/* Actions */}

                {/* Mobile Navigation Controls */}
                <div className="flex items-center gap-4 lg:hidden">
                    <button
                        className={cn(
                            "p-2.5 rounded-xl shadow-xl transition-all",
                            scrolled ? "bg-green-500 text-white" : "bg-green-500 text-white"
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
                        className="fixed inset-x-6 top-32 bg-white/98 backdrop-blur-[40px] rounded-[3rem] border border-green-200 p-12 shadow-[0_50px_100px_rgba(34,197,94,0.2)] lg:hidden overflow-hidden"
                    >
                        <div className="absolute -bottom-20 -right-20 p-20 opacity-5 pointer-events-none">
                            <Globe size={400} className="text-green-500 animate-spin-slow" />
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
                                        className="text-5xl font-black text-gray-900 hover:text-green-500 tracking-tighter transition-all"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <Link
                                href="/packages"
                                className="mt-8 w-full py-7 bg-green-500 text-white text-center rounded-[2rem] font-black text-2xl shadow-3xl shadow-green-600/40"
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
