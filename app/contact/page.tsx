"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import emailjs from '@emailjs/browser';


export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const { data, error } = await supabase
                .from('contact_messages')
                .insert([
                    {
                        ...formData,
                        status: 'new'
                    }
                ])
                .select()
                .single();

            if (error) throw error;

            // Send Email notification using EmailJS
            const templateParams = {
                order_id: `MSG-${data.id}`,
                order_location: "General Inquiry",
                order_image: "",
                order_person_count: "N/A",
                order_price: "N/A",
                customer_name: formData.name,
                customer_email: formData.email,
                customer_phone: "Not provided",
                start_date: "N/A",
                special_requests: formData.message,
                booking_date: new Date().toLocaleDateString(),
                subject: formData.subject
            };

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            setStatus({ type: 'success', message: 'Your message has been sent successfully!' });
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus({ type: 'error', message: 'There was an error sending your message. Please try again.' });
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />
            <main className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16">
                        <div className="lg:w-1/3">
                            <h1 className="topic-title mb-8">Get in Touch</h1>
                            <p className="content-text mb-12">
                                Have questions about our packages or want a custom itinerary? Our team is here to help you 24/7.
                            </p>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                                        <Mail className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Email us</h4>
                                        <p className="text-slate-600">hello@deshantours.com</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
                                        <Phone className="text-emerald-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Call us</h4>
                                        <div className="flex flex-col text-slate-600 font-medium">
                                            <a href="tel:0776962467" className="hover:text-emerald-600 transition-colors">0776962467 (WhatsApp)</a>
                                            <a href="tel:0767584660" className="hover:text-emerald-600 transition-colors">0767584660</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center shrink-0">
                                        <MapPin className="text-purple-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Visit us</h4>
                                        <p className="text-slate-600">123 Travel Lane, Adventure City</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/3">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-200"
                            >
                                {status && (
                                    <div className={`mb-8 p-6 rounded-2xl text-center font-bold ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                        }`}>
                                        {status.message}
                                    </div>
                                )}

                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-600 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-2 ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-600 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="john@example.com"
                                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-2 ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-600 ml-1">Subject</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder="I want to book a trip to Sri Lanka"
                                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-2 ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-600 ml-1">Your Message</label>
                                        <textarea
                                            rows={6}
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="How can we help you?"
                                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-2 ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-slate-900 placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <button
                                            disabled={loading}
                                            className={`w-full py-5 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all hover:shadow-xl shadow-blue-500/20 group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                            <Send size={20} className={`${loading ? '' : 'group-hover:translate-x-1 group-hover:-translate-y-1'} transition-transform`} />
                                            {loading ? 'Sending...' : 'Send Message'}
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
