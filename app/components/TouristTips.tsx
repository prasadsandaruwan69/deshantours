"use client";

import { motion } from "framer-motion";
import { Banknote, MapPin, Shirt, Users, Info, AlertCircle } from "lucide-react";

const tips = [
    {
        icon: Banknote,
        title: "Local Currency",
        description: "Sri Lankan Rupee (LKR)",
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: MapPin,
        title: "ATM Machines",
        description: "Available in all cities",
        color: "from-green-600 to-teal-500"
    },
    {
        icon: Shirt,
        title: "Temple Dress Code",
        description: "Modest clothing required",
        color: "from-emerald-500 to-green-600"
    },
    {
        icon: Users,
        title: "Local Culture",
        description: "Friendly locals & rich heritage",
        color: "from-green-500 to-lime-500"
    }
];

export default function TouristTips() {
    return (
        <section className="py-24 px-6 bg-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4 block"
                    >
                        Important Information
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6"
                    >
                        Essential Tips for Tourists
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                    >
                        Everything you need to know for a smooth and enjoyable visit to Sri Lanka
                    </motion.p>
                </div>

                {/* Tips Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {tips.map((tip, index) => {
                        const Icon = tip.icon;
                        return (
                            <motion.div
                                key={tip.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative h-full bg-white backdrop-blur-xl border border-gray-200 rounded-3xl p-8 hover:border-green-300 transition-all duration-500 shadow-sm">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 bg-gradient-to-br ${tip.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                                        <Icon className="text-white" size={28} strokeWidth={2.5} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {tip.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {tip.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Detailed Tips */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-green-500 to-green-600 rounded-[3rem] p-12 text-white"
                >
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Info size={24} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold mb-2">Quick Travel Tips</h3>
                            <p className="text-green-100">Essential information for your Sri Lankan adventure</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                                <div>
                                    <div className="font-bold mb-1">💰 Currency Exchange</div>
                                    <p className="text-green-100 text-sm">Exchange money at banks or authorized dealers. Avoid street exchangers.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                                <div>
                                    <div className="font-bold mb-1">🏧 ATM Availability</div>
                                    <p className="text-green-100 text-sm">ATMs widely available in cities. Withdraw enough cash for rural areas.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                                <div>
                                    <div className="font-bold mb-1">👕 Temple Etiquette</div>
                                    <p className="text-green-100 text-sm">Cover shoulders and knees. Remove shoes and hats before entering.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                                <div>
                                    <div className="font-bold mb-1">🤝 Friendly Locals</div>
                                    <p className="text-green-100 text-sm">Sri Lankans are warm and welcoming. Don't hesitate to ask for help!</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                                <div>
                                    <div className="font-bold mb-1">🌶️ Spicy Food</div>
                                    <p className="text-green-100 text-sm">Sri Lankan cuisine is spicy! Ask for "less spicy" if needed.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                                <div>
                                    <div className="font-bold mb-1">☀️ Sun Protection</div>
                                    <p className="text-green-100 text-sm">Strong tropical sun! Use SPF 50+ and stay hydrated.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/20">
                        <div className="flex items-start gap-3 bg-white/10 backdrop-blur-xl rounded-2xl p-6">
                            <AlertCircle size={24} className="flex-shrink-0 mt-1" />
                            <div>
                                <div className="font-bold mb-2">Emergency Contacts</div>
                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <span className="text-green-100">Police:</span> <span className="font-bold">119</span>
                                    </div>
                                    <div>
                                        <span className="text-green-100">Ambulance:</span> <span className="font-bold">110</span>
                                    </div>
                                    <div>
                                        <span className="text-green-100">Tourist Police:</span> <span className="font-bold">1912</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
