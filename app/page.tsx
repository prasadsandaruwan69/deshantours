"use client";

import Hero from "./components/Hero";
import TripAdvisorReviews from "./components/TripAdvisorReviews";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Plane } from "lucide-react";
import Link from "next/link";

const featuredDestinations = [
  {
    id: 1,
    title: "Ella, Sri Lanka",
    description: "Famous Nine Arch Bridge and stunning mountain views.",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1000&auto=format&fit=crop",
    price: "From $299",
    category: "Adventure"
  },
  {
    id: 2,
    title: "Bali, Indonesia",
    description: "Lush jungles, pristine beaches and spiritual temples.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop",
    price: "From $499",
    category: "Luxury"
  },
  {
    id: 3,
    title: "Maldives",
    description: "Private villas perched over turquoise Indian Ocean.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000&auto=format&fit=crop",
    price: "From $999",
    category: "Romantic"
  }
];

export default function Home() {
  return (
    <div className="bg-slate-950 min-h-screen selection:bg-blue-500/30">
      <Navbar />

      <main>
        <Hero />

        {/* Featured Destinations */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">
                  Top Picks
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                  Explore Destinations
                </h2>
                <p className="text-slate-400 max-w-xl">
                  Discover our handpicked destinations for your next unforgettable journey. From tropical paradises to mountain retreats.
                </p>
              </div>
              <Link
                href="/destinations"
                className="group flex items-center gap-2 text-blue-600 font-bold text-lg hover:underline underline-offset-8"
              >
                View all destinations
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredDestinations.map((dest, index) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative h-[500px] overflow-hidden rounded-[2.5rem] cursor-pointer shadow-none"
                >
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/30 uppercase tracking-widest">
                      {dest.category}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold text-white mb-2">{dest.title}</h3>
                    <p className="text-slate-300 mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {dest.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-blue-400">{dest.price}</span>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-xl">
                        <ArrowRight className="text-blue-600" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-[3rem] bg-blue-600 overflow-hidden px-8 py-20 text-center">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-white rounded-full animate-ping-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-white rounded-full" />
              </div>

              <div className="relative z-10 max-w-2xl mx-auto">
                <Plane className="w-16 h-16 text-white/40 mx-auto mb-8 animate-bounce" />
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
                  Ready to start your next journey?
                </h2>
                <p className="text-blue-100 text-lg mb-12">
                  Join over 10,000+ happy travelers who explored the world with Deshan Tours. Special discounts for early bookings!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-xl">
                    Get Started Now
                  </button>
                  <button className="px-10 py-5 bg-transparent border-2 border-white/50 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TripAdvisorReviews />
      </main>

      <Footer />
    </div>
  );
}
