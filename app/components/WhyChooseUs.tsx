"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, Headphones, MapPin } from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Local Guides",
        description: "Expert local guides who know every hidden gem and authentic story of Sri Lanka",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: DollarSign,
        title: "Best Prices",
        description: "Competitive pricing with no hidden fees. Best value guaranteed for your journey",
        color: "from-emerald-500 to-teal-500"
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description: "Round-the-clock assistance. We're always here to help, wherever you are",
        color: "from-purple-500 to-pink-500"
    },
    {
        icon: MapPin,
        title: "Custom Tours",
        description: "Personalized itineraries tailored to your interests, pace, and preferences",
        color: "from-orange-500 to-red-500"
    }
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 px-6 bg-gradient-to-b from-black via-gray-300/40 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4 block"
                    >
                        Why Choose Us
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="sub-topic-title mb-6 !text-white"
                    >
                        Your Perfect Travel Partner
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="content-text max-w-3xl mx-auto !text-slate-300"
                    >
                        We combine local expertise with world-class service to create unforgettable experiences across Sri Lanka
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                {/* Card */}
                                <div className="relative h-full bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 hover:border-green-300 transition-all duration-500 overflow-hidden shadow-sm">
                                    {/* Gradient overlay on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                    {/* Icon */}
                                    <div className="relative mb-6">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                                            <Icon className="text-white" size={28} strokeWidth={2.5} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Decorative element */}
                                    <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${feature.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {[
                        { value: "10K+", label: "Happy Travelers" },
                        { value: "50+", label: "Destinations" },
                        { value: "100+", label: "Tour Packages" },
                        { value: "4.9★", label: "Average Rating" }
                    ].map((stat, index) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="text-gray-500 font-medium uppercase tracking-wider text-sm">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
