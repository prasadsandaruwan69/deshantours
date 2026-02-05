"use client";

import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, Tag, Share2, Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase, BlogPost } from "@/lib/supabase";

export default function BlogPostDetail() {
    const params = useParams();
    const slug = params?.slug as string;
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            fetchPost();
        }
    }, [slug]);

    const fetchPost = async () => {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) throw error;
            setPost(data);
        } catch (error) {
            console.error('Error fetching blog post:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-slate-50 min-h-screen flex items-center justify-center">
                <div className="text-slate-900 text-xl font-bold">Loading...</div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="bg-slate-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1>
                    <Link href="/blog" className="text-blue-500 hover:underline">
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link href="/blog">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span className="font-bold">Back to Blog</span>
                        </motion.button>
                    </Link>

                    {/* Metadata */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap items-center gap-6 text-slate-600 text-sm mb-6"
                    >
                        <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-widest">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-blue-500" />
                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-blue-500" />
                            <span>{post.read_time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-blue-500" />
                            <span>{post.author}</span>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="topic-title mb-8"
                    >
                        {post.title}
                    </motion.h1>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden mb-12"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-blue max-w-none"
                    >
                        <div className="content-text space-y-6 whitespace-pre-wrap">
                            {post.content}
                        </div>
                    </motion.div>

                    {/* Tags & Share */}
                    <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, idx) => (
                                <span key={idx} className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm font-semibold">
                                    <Tag size={14} />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Share */}
                        <div className="flex items-center gap-4">
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Share this post</span>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                                    <Facebook size={18} />
                                </button>
                                <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                                    <Twitter size={18} />
                                </button>
                                <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                                    <LinkIcon size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-[3rem] p-12 text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-black mb-4">Enjoyed this post?</h2>
                        <p className="text-xl opacity-90 mb-8">Subscribe to our newsletter for more travel tips and exclusive offers</p>
                        <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl text-white placeholder:text-white/60 outline-none focus:ring-2 ring-white transition-all"
                            />
                            <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-xl">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
