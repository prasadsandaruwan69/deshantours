"use client";

import { motion } from "framer-motion";
import { Star, MessageSquareQuote } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Sarah Jenkins",
        location: "London, UK",
        rating: 5,
        text: "Deshan Tours made our Sri Lanka trip unforgettable! The attention to detail and personal touch was incredible. Highly recommended!",
        avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        id: 2,
        name: "Marco Rossi",
        location: "Milan, Italy",
        rating: 5,
        text: "Excellent service from start to finish. Our guide was knowledgeable and the selection of boutique hotels was perfect.",
        avatar: "https://i.pravatar.cc/150?u=marco"
    },
    {
        id: 3,
        name: "Elena Petrov",
        location: "Sydney, Australia",
        rating: 5,
        text: "The best travel agency I've ever used. They found hidden gems we would never have discovered on our own.",
        avatar: "https://i.pravatar.cc/150?u=elena"
    }
];

export default function TripAdvisorReviews() {
    return (
        <section className="py-24 px-6 bg-slate-950/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Loved by travelers like you
                        </h2>
                        <p className="text-slate-400">
                            We take pride in delivering exceptional experiences. See what our customers are saying about their journeys with us.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-900 p-6 rounded-2xl shadow-sm border border-white/5">
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold text-white">4.9</span>
                            <div className="flex text-emerald-500">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                        </div>
                        <div className="h-10 w-px bg-slate-700" />
                        <div className="flex flex-col">
                            <span className="font-bold text-white flex items-center gap-2">
                                Tripadvisor
                            </span>
                            <span className="text-sm text-slate-500">Certificate of Excellence</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-900 p-8 rounded-3xl shadow-none border border-white/5 relative"
                        >
                            <div className="absolute top-8 right-8 text-slate-700">
                                <MessageSquareQuote size={48} />
                            </div>

                            <div className="flex gap-1 text-yellow-400 mb-6 transition-colors">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-slate-300 mb-8 italic relative z-10">
                                "{review.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-bold text-white">{review.name}</h4>
                                    <p className="text-sm text-slate-500">{review.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
