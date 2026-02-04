"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        category: "General",
        questions: [
            {
                q: "Do I need a visa to visit Sri Lanka?",
                a: "Yes, most nationalities require an Electronic Travel Authorization (ETA). You can apply online at www.eta.gov.lk. The cost is approximately $50 USD for a 30-day tourist visa. The process is usually instant, but we recommend applying 2-3 days before your travel."
            },
            {
                q: "What is the best time to visit Sri Lanka?",
                a: "Sri Lanka is a year-round destination, but the best time depends on which region you're visiting. December to March is ideal for the west and south coasts and the Cultural Triangle. May to September is best for the east coast. The hill country is pleasant from January to March. See our detailed seasonal guide for more information."
            },
            {
                q: "Is Sri Lanka safe for tourists?",
                a: "Yes, Sri Lanka is generally very safe for tourists. The locals are friendly and welcoming. As with any destination, exercise normal precautions: watch your belongings, avoid walking alone late at night in cities, and be aware of common tourist scams. Our guides and drivers ensure your safety throughout your journey."
            },
            {
                q: "What currency is used in Sri Lanka?",
                a: "The Sri Lankan Rupee (LKR) is the official currency. ATMs are widely available in cities and towns. Credit cards (Visa and Mastercard) are accepted in hotels, restaurants, and shops in tourist areas, but always carry cash for small vendors and rural areas."
            }
        ]
    },
    {
        category: "Booking & Payments",
        questions: [
            {
                q: "How do I book a tour with Deshan Tours?",
                a: "You can book through our website by selecting a package and filling out the booking form, or contact us directly via email or WhatsApp. We'll send you a detailed itinerary and payment instructions. A deposit (usually 30%) is required to confirm your booking, with the balance due before your arrival."
            },
            {
                q: "What payment methods do you accept?",
                a: "We accept bank transfers, credit cards (Visa, Mastercard), PayPal, and cash payments. For international bookings, we recommend bank transfers or PayPal for security and convenience."
            },
            {
                q: "What is your cancellation policy?",
                a: "Cancellations made 30+ days before departure: Full refund minus 10% processing fee. 15-29 days: 50% refund. Less than 15 days: No refund. We strongly recommend purchasing travel insurance to protect your investment."
            },
            {
                q: "Can I customize my tour package?",
                a: "Absolutely! All our tours can be customized to match your interests, pace, and budget. Contact us with your preferences, and we'll create a personalized itinerary just for you. We specialize in tailor-made experiences."
            }
        ]
    },
    {
        category: "During Your Trip",
        questions: [
            {
                q: "What's included in the tour price?",
                a: "Typically includes: private air-conditioned vehicle with driver, English-speaking guide, accommodation (3-4 star hotels), daily breakfast, all entrance fees, and airport transfers. Specific inclusions vary by package - check individual tour details."
            },
            {
                q: "Are meals included?",
                a: "Breakfast is always included. Some packages include additional meals (lunch/dinner) as specified in the itinerary. Your guide can recommend excellent local restaurants for other meals. We can arrange meal plans based on your preferences."
            },
            {
                q: "What should I pack for Sri Lanka?",
                a: "Light, breathable clothing, modest attire for temples (covering shoulders and knees), comfortable walking shoes, sandals, swimwear, sunscreen (SPF 50+), insect repellent, light jacket for hill country, rain jacket, and any personal medications. Don't forget your camera!"
            },
            {
                q: "Will I have internet access?",
                a: "Yes, most hotels and cafes offer Wi-Fi. We recommend purchasing a local SIM card at the airport for reliable mobile data throughout your trip. Data is very affordable in Sri Lanka (10GB for approximately $5 USD)."
            },
            {
                q: "What if I have dietary restrictions?",
                a: "Sri Lanka is excellent for vegetarians and vegans - rice and curry is naturally plant-based. For other dietary restrictions (gluten-free, allergies, etc.), inform us in advance, and we'll ensure restaurants are aware. Our guides will help communicate your needs."
            }
        ]
    },
    {
        category: "Health & Safety",
        questions: [
            {
                q: "Do I need any vaccinations?",
                a: "While no vaccinations are mandatory, we recommend consulting your doctor about Hepatitis A & B, Typhoid, Tetanus, and Japanese Encephalitis (for rural areas). Malaria prophylaxis may be recommended for certain regions. Ensure routine vaccinations are up to date."
            },
            {
                q: "Is the food safe to eat?",
                a: "Yes, when you follow basic precautions: eat at busy restaurants (high turnover = fresh food), avoid tap water (drink bottled), peel fruits yourself, and be cautious with ice. Street food is generally safe if cooked fresh. Our guides recommend trusted restaurants."
            },
            {
                q: "What should I do in case of emergency?",
                a: "Your guide and driver are your first point of contact. They're trained to handle emergencies and will assist you. Emergency numbers: Police (119), Ambulance (110), Tourist Police (1912). We also provide 24/7 emergency support for all our guests."
            },
            {
                q: "Do I need travel insurance?",
                a: "We highly recommend comprehensive travel insurance covering medical emergencies, trip cancellation, lost luggage, and adventure activities (if trekking, diving, etc.). It's a small investment for peace of mind during your journey."
            }
        ]
    },
    {
        category: "Activities & Attractions",
        questions: [
            {
                q: "Can I see leopards in Yala National Park?",
                a: "Yala has one of the highest leopard densities in the world, but sightings aren't guaranteed as they're wild animals. The best time is February to July during dry season when animals gather around water sources. Early morning safaris offer the best chances."
            },
            {
                q: "When is the best time for whale watching?",
                a: "November to April is prime whale watching season in Mirissa (south coast), with December to March being peak months. Blue whales and sperm whales are commonly spotted. Trincomalee (east coast) offers whale watching from March to August."
            },
            {
                q: "How difficult is climbing Sigiriya Rock?",
                a: "The climb involves approximately 1,200 steps and takes 1.5-2 hours round trip. It's moderately challenging but doable for most fitness levels. Take your time, bring water, and avoid midday heat. The views from the top are absolutely worth it!"
            },
            {
                q: "Can I take the scenic train ride?",
                a: "Yes! The Kandy to Ella train journey is one of the world's most beautiful. We can arrange tickets (book in advance for 2nd class reserved seats). The journey takes about 6-7 hours through tea plantations and mountains. Absolutely unmissable!"
            }
        ]
    }
];

export default function FAQ() {
    const [openQuestion, setOpenQuestion] = useState<string | null>(null);

    const toggleQuestion = (questionId: string) => {
        setOpenQuestion(openQuestion === questionId ? null : questionId);
    };

    return (
        <div className="bg-slate-950 min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <HelpCircle size={40} className="text-white" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-slate-400">
                            Everything you need to know about traveling to Sri Lanka with Deshan Tours
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="pb-24 px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    {faqs.map((category, categoryIndex) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.1 }}
                        >
                            {/* Category Header */}
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="w-2 h-8 bg-blue-600 rounded-full" />
                                {category.category}
                            </h2>

                            {/* Questions */}
                            <div className="space-y-4">
                                {category.questions.map((faq, qIndex) => {
                                    const questionId = `${category.category}-${qIndex}`;
                                    const isOpen = openQuestion === questionId;

                                    return (
                                        <motion.div
                                            key={questionId}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: (categoryIndex * 0.1) + (qIndex * 0.05) }}
                                            className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
                                        >
                                            {/* Question */}
                                            <button
                                                onClick={() => toggleQuestion(questionId)}
                                                className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
                                            >
                                                <span className="text-lg font-bold text-white pr-4">
                                                    {faq.q}
                                                </span>
                                                <ChevronDown
                                                    size={24}
                                                    className={`text-blue-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </button>

                                            {/* Answer */}
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="px-6 pb-6"
                                                >
                                                    <div className="pt-4 border-t border-white/10">
                                                        <p className="text-slate-300 leading-relaxed">
                                                            {faq.a}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Still Have Questions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mt-16"
                >
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-[3rem] p-12 text-center text-white">
                        <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
                        <p className="text-blue-100 mb-8 text-lg">
                            Our travel experts are here to help! Contact us and we'll get back to you within 24 hours.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/contact">
                                <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl">
                                    Contact Us
                                </button>
                            </a>
                            <a href="mailto:info@deshantours.com">
                                <button className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl font-bold text-lg border border-white/30 hover:bg-white/20 transition-all">
                                    Email Us
                                </button>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
