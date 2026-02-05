"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase, BlogPost } from "@/lib/supabase";

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = ["All", ...Array.from(new Set(posts.map(post => post.category)))];

    const filteredPosts = selectedCategory === "All"
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">
                            Travel Insights
                        </span>
                        <h1 className="topic-title mb-6">
                            Our Travel Blog
                        </h1>
                        <p className="content-text max-w-3xl mx-auto">
                            Expert tips, guides, and stories to help you plan the perfect Sri Lankan adventure
                        </p>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap gap-3 justify-center"
                    >
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${selectedCategory === category
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                    : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden hover:border-blue-500/20 hover:shadow-xl transition-all duration-500 h-full flex flex-col group">
                                        {/* Image */}
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-widest">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            {/* Meta */}
                                            <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    <span>{post.read_time}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <User size={14} />
                                                    <span>{post.author}</span>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>

                                            {/* Excerpt */}
                                            <p className="text-slate-600 mb-6 line-clamp-3 flex-1">
                                                {post.excerpt}
                                            </p>

                                            {/* Read More */}
                                            <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
                                                <span>Read More</span>
                                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-20">
                            <BookOpen size={64} className="text-slate-700 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-400 mb-2">No posts found</h3>
                            <p className="text-slate-500">Try selecting a different category</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
