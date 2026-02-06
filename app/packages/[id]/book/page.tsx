"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase, Package } from "@/lib/supabase";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import {
    Calendar, Users, User, Mail, Phone,
    MessageSquare, ArrowLeft, CheckCircle2,
    Clock, ShieldCheck
} from "lucide-react";
import Link from "next/link";

export default function PackageBooking() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id ? parseInt(params.id as string) : null;
    const [pkg, setPkg] = useState<Package | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        startDate: "",
        guests: 1,
        message: ""
    });

    useEffect(() => {
        if (id) {
            fetchPackage();
        }
    }, [id]);

    const fetchPackage = async () => {
        try {
            const { data, error } = await supabase
                .from('packages')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setPkg(data);
        } catch (error) {
            console.error('Error fetching package:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setStatus(null);

        try {
            const { error } = await supabase
                .from('bookingscontact')
                .insert([{
                    customer_name: formData.name,
                    customer_email: formData.email,
                    customer_phone: formData.phone,
                    package_name: pkg?.name || "Unknown Package",
                    start_date: formData.startDate,
                    number_of_guests: formData.guests,
                    tour_type: pkg?.category || "Standard",
                    number_of_days: pkg?.days || 1,
                    total_price: (pkg?.price || 0) * formData.guests,
                    status: 'pending',
                    special_requests: formData.message
                }]);

            if (error) throw error;

            setStatus({ type: 'success', message: 'Booking inquiry sent successfully! Our team will contact you shortly.' });
            setFormData({ name: "", email: "", phone: "", startDate: "", guests: 1, message: "" });

            // Redirect after success
            setTimeout(() => router.push(`/packages/${id}`), 3000);
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', message: 'Failed to send booking inquiry. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-slate-50 min-h-screen flex items-center justify-center">
                <div className="text-slate-900 text-xl font-bold animate-pulse">Loading Booking Details...</div>
            </div>
        );
    }

    if (!pkg) return null;

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <Link href={`/packages/${id}`}>
                            <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-4 transition-colors">
                                <ArrowLeft size={20} />
                                <span className="font-bold border-b-2 border-transparent hover:border-slate-900 transition-all">Back to Package Details</span>
                            </button>
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                            Book Your <span className="text-green-600">{pkg.name}</span>
                        </h1>
                        <p className="text-slate-500 mt-4 text-lg max-w-2xl font-medium">
                            Complete the form below to secure your spot. No payment required today — our team will call you to finalize details.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Booking Form */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100"
                            >
                                {status && (
                                    <div className={`mb-8 p-6 rounded-2xl flex items-center gap-4 ${status.type === 'success'
                                            ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                                            : 'bg-red-500/10 text-red-600 border border-red-500/20'
                                        }`}>
                                        {status.type === 'success' ? <CheckCircle2 size={24} /> : <Users size={24} />}
                                        <p className="font-bold">{status.message}</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {/* Name */}
                                        <div className="space-y-3">
                                            <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Full Name</label>
                                            <div className="relative group">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="Enter your full name"
                                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl border-2 border-slate-100 outline-none focus:border-green-500 focus:bg-white transition-all text-slate-900 font-bold"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-3">
                                            <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Phone Number</label>
                                            <div className="relative group">
                                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="Contact number"
                                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl border-2 border-slate-100 outline-none focus:border-green-500 focus:bg-white transition-all text-slate-900 font-bold"
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-3">
                                            <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Email Address</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="Email for confirmation"
                                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl border-2 border-slate-100 outline-none focus:border-green-500 focus:bg-white transition-all text-slate-900 font-bold"
                                                />
                                            </div>
                                        </div>

                                        {/* Start Date */}
                                        <div className="space-y-3">
                                            <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Prefered Date</label>
                                            <div className="relative group">
                                                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
                                                <input
                                                    type="date"
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                    value={formData.startDate}
                                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl border-2 border-slate-100 outline-none focus:border-green-500 focus:bg-white transition-all text-slate-900 font-bold cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        {/* Travelers */}
                                        <div className="space-y-3">
                                            <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Number of Travelers</label>
                                            <div className="relative group">
                                                <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
                                                <select
                                                    value={formData.guests}
                                                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl border-2 border-slate-100 outline-none focus:border-green-500 focus:bg-white transition-all text-slate-900 font-bold cursor-pointer appearance-none"
                                                >
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                        <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                                                    ))}
                                                    <option value="11">Group 10+</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Special Requirements (Optional)</label>
                                        <div className="relative group">
                                            <MessageSquare className="absolute left-5 top-6 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
                                            <textarea
                                                rows={4}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Any food preferences, hotel requests, or special occasions?"
                                                className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl border-2 border-slate-100 outline-none focus:border-green-500 focus:bg-white transition-all text-slate-900 font-bold resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        disabled={submitting}
                                        type="submit"
                                        className={`w-full py-6 bg-green-500 text-white rounded-2xl font-black text-xl uppercase tracking-widest shadow-2xl shadow-green-600/30 hover:bg-slate-900 hover:shadow-slate-900/30 transition-all flex items-center justify-center gap-4 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {submitting ? (
                                            <>
                                                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            'Confirm Booking Request'
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        </div>

                        {/* Sidebar - Summary */}
                        <div className="lg:col-span-4">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6 sticky top-32"
                            >
                                {/* Package Summary Card */}
                                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
                                    <img
                                        src={pkg.image}
                                        alt={pkg.name}
                                        className="w-full h-48 object-cover rounded-2xl mb-6"
                                    />
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-green-500 text-xs font-black uppercase tracking-widest mb-1">{pkg.category} TOUR</p>
                                            <h3 className="text-2xl font-bold">{pkg.name}</h3>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                                <Clock className="text-green-500 mb-2" size={20} />
                                                <div className="font-bold">{pkg.days} Days</div>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                                <ShieldCheck className="text-green-500 mb-2" size={20} />
                                                <div className="font-bold text-xs uppercase">Premium</div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-white/10">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-slate-400">Price per person</span>
                                                <span className="text-2xl font-black">${pkg.price}</span>
                                            </div>
                                            <div className="flex items-center justify-between mb-6">
                                                <span className="text-slate-400">Number of guests</span>
                                                <span className="text-xl font-bold">x {formData.guests}</span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-green-500/20 rounded-2xl border border-green-500/30">
                                                <span className="font-bold text-green-400">Estimated Total</span>
                                                <span className="text-3xl font-black text-green-500">${pkg.price * formData.guests}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="bg-white rounded-3xl p-6 border border-slate-200">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                                                <ShieldCheck size={20} />
                                            </div>
                                            <div className="text-sm font-bold text-slate-800">Secure Direct Booking</div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                                <MessageSquare size={20} />
                                            </div>
                                            <div className="text-sm font-bold text-slate-800">Free Expert Consultation</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
