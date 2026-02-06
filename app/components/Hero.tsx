import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Users, ChevronRight, Sparkles, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const slides = [
    {
        image: "/hiro_bg_image.jpg",
        tag: "Ancient Wonder",
        title: ["Sigiriya", "Fortress"],
        desc: "Ascend the Eighth Wonder of the World and witness the legacy of a sky kingdom.",
        accent: "#d97706"
    },
    {
        image: "/waterfall.png",
        tag: "Nature's Masterpiece",
        title: ["Crystal", "Cascades"],
        desc: "Discover the roar of untamed waters in the lush central highlands.",
        accent: "#81a14b"
    },
    {
        image: "/yala.png",
        tag: "The Wild Frontier",
        title: ["Leopard", "Kingdom"],
        desc: "Track the elusive ghost of the jungle in the heart of Yala Safaris.",
        accent: "#d97706"
    },
    {
        image: "/udawalawe.png",
        tag: "Gentle Giants",
        title: ["Elephant", "Gathering"],
        desc: "Witness the majestic herds roaming free across the sun-drenched plains.",
        accent: "#0ea5e9"
    },
    {
        image: "/nuwaraeliya.png",
        tag: "Little England",
        title: ["Mist-Clad", "Estates"],
        desc: "Wander through rolling tea gardens where history meets the clouds.",
        accent: "#22c55e"
    }
];

export default function Hero() {
    const [current, setCurrent] = React.useState(0);
    const [isBlurring, setIsBlurring] = React.useState(false);
    const [bookingData, setBookingData] = React.useState({
        location: "",
        date: "",
        travelers: "",
        phone: ""
    });
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validations
        const phoneRegex = /^\d{9,11}$/;
        if (!bookingData.location) {
            setStatus({ type: 'error', message: 'Please specify a location.' });
            return;
        }
        if (!bookingData.date) {
            setStatus({ type: 'error', message: 'Please select a travel date.' });
            return;
        }
        if (!phoneRegex.test(bookingData.phone.replace(/\D/g, ''))) {
            setStatus({ type: 'error', message: 'Please enter a valid phone number (9-11 digits).' });
            return;
        }

        setLoading(true);
        setStatus(null);

        try {
            const { error } = await supabase
                .from('bookingscontact')
                .insert([{
                    customer_name: "Hero Section Inquiry",
                    customer_email: "hero@deshantours.com",
                    customer_phone: bookingData.phone,
                    package_name: bookingData.location,
                    start_date: bookingData.date || new Date().toISOString().split('T')[0],
                    number_of_guests: parseInt(bookingData.travelers) || 1,
                    tour_type: "Quick Inquiry",
                    number_of_days: 1,
                    total_price: 0,
                    status: 'pending',
                    special_requests: `Quick booking from hero section. Location: ${bookingData.location}, Date: ${bookingData.date}, Travelers: ${bookingData.travelers}`
                }]);

            if (error) throw error;

            setStatus({ type: 'success', message: 'Inquiry sent! We will call you soon.' });
            setBookingData({ location: "", date: "", travelers: "", phone: "" });

            // Clear success message after 5 seconds
            setTimeout(() => setStatus(null), 5000);
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', message: 'Failed to send inquiry. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        const timer = setInterval(() => {
            setIsBlurring(true);
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % slides.length);
                setIsBlurring(false);
            }, 800);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-screen w-full flex flex-col">
            {/* Background Image Slider with Smooth Blur Transition */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            filter: isBlurring ? "blur(20px)" : "blur(0px)"
                        }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={slides[current].image}
                            alt={slides[current].tag}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Sigiriya Environmental Layers - Adapted for Slider */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c14] via-transparent to-transparent z-10 opacity-80" />
                <div className="absolute inset-0 bg-black/20 z-10" />

                {/* Floating Mist Particles */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{ background: 'url("https://www.transparenttextures.com/patterns/pollen.png")' }}
                />
            </div>


            {/* Main Content Area - Organic Integration */}
            <div className="relative z-20 max-w-7xl mx-auto mt-24 md:mt-32 px-6 w-full flex-1 flex flex-col justify-center">
                <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
                    <div className="text-left">
                        <div className="relative z-10 space-y-12">
                            {/* Organic Tag */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.8 }}
                                    className="inline-flex items-center gap-3 px-6 py-2 bg-[#2d3321]/40 backdrop-blur-xl border border-white/10 rounded-full text-[#d4d9c9] text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl"
                                >
                                    <div
                                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                                        style={{ backgroundColor: slides[current].accent, boxShadow: `0 0 10px ${slides[current].accent}` }}
                                    />
                                    {slides[current].tag}
                                </motion.div>
                            </AnimatePresence>

                            {/* Emerging Typography */}
                            <div className="space-y-6">
                                <h1 className="text-7xl md:text-[6.5rem] font-black leading-[0.85] tracking-tighter overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div key={current}>
                                            <motion.span
                                                initial={{ y: "100%", rotate: 5 }}
                                                animate={{ y: 0, rotate: 0 }}
                                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                                className="block text-[#f8faf2] drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] mix-blend-plus-lighter"
                                            >
                                                {slides[current].title[0]}
                                            </motion.span>
                                            <motion.span
                                                initial={{ y: "100%", opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                                                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d4d9c9] via-white to-[#d4d9c9] drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                                                style={{ backgroundImage: `linear-gradient(to right, ${slides[current].accent}, #f8faf2, ${slides[current].accent})` }}
                                            >
                                                {slides[current].title[1]}
                                            </motion.span>
                                        </motion.div>
                                    </AnimatePresence>
                                </h1>

                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={current}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 1 }}
                                        className="text-lg md:text-2xl text-[#d4d9c9]/90 max-w-xl font-medium leading-relaxed drop-shadow-lg"
                                    >
                                        {slides[current].desc}
                                    </motion.p>
                                </AnimatePresence>
                            </div>

                            {/* Organic CTA */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 1.4 }}
                                className="flex flex-wrap gap-6"
                            >
                                <button
                                    className="group relative px-10 py-5 overflow-hidden rounded-2xl text-white font-black text-xs uppercase tracking-[0.2em] transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                                    style={{ backgroundColor: slides[current].accent }}
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        Explore Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>

                                <button className="px-10 py-5 rounded-2xl border-2 border-[#d4d9c9]/20 text-[#d4d9c9] font-black text-xs uppercase tracking-[0.2em] backdrop-blur-md hover:bg-white/5 transition-all">
                                    View Packages
                                </button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Creative Floating Stats - Parallax Depth */}
                    <div className="hidden lg:grid grid-cols-2 gap-6 relative">

                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-32 left-6 flex gap-3 z-30">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setIsBlurring(true);
                                setTimeout(() => {
                                    setCurrent(i);
                                    setIsBlurring(false);
                                }, 800);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-12" : "w-4 bg-white/20"
                                }`}
                            style={{ backgroundColor: i === current ? slides[current].accent : undefined }}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Floating Console - Refined Spacing */}
            <div className="relative z-20 w-full px-6 pb-8 md:pb-12 mt-12 md:mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="max-w-7xl mx-auto"
                >
                    {status && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-4 p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${status.type === 'success'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}
                        >
                            {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                            {status.message}
                        </motion.div>
                    )}

                    <form
                        onSubmit={handleBooking}
                        className="glass-card p-2 md:p-3 rounded-3xl md:rounded-full flex flex-col lg:flex-row items-center gap-2 border-4 border-white shadow-2xl"
                    >
                        <div className="flex-1 flex items-center gap-4 px-6 md:px-8 py-3 w-full group">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/10 rounded-2xl flex items-center justify-center transition-all group-hover:bg-green-500">
                                <MapPin className="text-green-600 group-hover:text-white transition-colors" size={20} />
                            </div>
                            <div className="text-left flex-1 min-w-[100px]">
                                <p className="text-[9px] font-black text-green-600 uppercase tracking-[0.2em] mb-1 opacity-60">Location</p>
                                <input
                                    type="text"
                                    required
                                    value={bookingData.location}
                                    onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
                                    placeholder="Where to?"
                                    className="bg-transparent border-none outline-none text-slate-900 w-full font-bold text-sm md:text-base placeholder:text-slate-400 focus:ring-0"
                                />
                            </div>
                        </div>

                        <div className="hidden lg:block w-px h-10 bg-slate-200" />

                        <div className="flex-1 flex items-center gap-4 px-6 md:px-8 py-3 w-full group">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/10 rounded-2xl flex items-center justify-center transition-all group-hover:bg-green-500">
                                <Calendar className="text-green-600 group-hover:text-white transition-colors" size={20} />
                            </div>
                            <div className="text-left flex-1 min-w-[100px]">
                                <p className="text-[9px] font-black text-green-600 uppercase tracking-[0.2em] mb-1 opacity-60">Date</p>
                                <input
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={bookingData.date}
                                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                    className="bg-transparent border-none outline-none text-slate-900 w-full font-bold text-sm md:text-base placeholder:text-slate-400 focus:ring-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="hidden lg:block w-px h-10 bg-slate-200" />

                        <div className="flex-1 flex items-center gap-4 px-6 md:px-8 py-3 w-full group">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/10 rounded-2xl flex items-center justify-center transition-all group-hover:bg-green-500">
                                <Users className="text-green-600 group-hover:text-white transition-colors" size={20} />
                            </div>
                            <div className="text-left flex-1 min-w-[100px]">
                                <p className="text-[9px] font-black text-green-600 uppercase tracking-[0.2em] mb-1 opacity-60">Travelers</p>
                                <input
                                    type="number"
                                    value={bookingData.travelers}
                                    onChange={(e) => setBookingData({ ...bookingData, travelers: e.target.value })}
                                    placeholder="Number"
                                    className="bg-transparent border-none outline-none text-slate-900 w-full font-bold text-sm md:text-base placeholder:text-slate-400 focus:ring-0"
                                />
                            </div>
                        </div>

                        <div className="hidden lg:block w-px h-10 bg-slate-200" />

                        <div className="flex-1 flex items-center gap-4 px-6 md:px-8 py-3 w-full group">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/10 rounded-2xl flex items-center justify-center transition-all group-hover:bg-green-500">
                                <Phone className="text-green-600 group-hover:text-white transition-colors" size={20} />
                            </div>
                            <div className="text-left flex-1 min-w-[100px]">
                                <p className="text-[9px] font-black text-green-600 uppercase tracking-[0.2em] mb-1 opacity-60">Phone</p>
                                <input
                                    type="tel"
                                    required
                                    value={bookingData.phone}
                                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                    placeholder="Contact No"
                                    className="bg-transparent border-none outline-none text-slate-900 w-full font-bold text-sm md:text-base placeholder:text-slate-400 focus:ring-0"
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className={`w-full lg:w-auto px-10 py-5 bg-green-500 text-white rounded-full font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-slate-900 shadow-xl group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <Search size={20} className={loading ? "animate-spin" : "group-hover:rotate-12 transition-transform"} />
                            <span>{loading ? 'Sending...' : 'Explore'}</span>
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
