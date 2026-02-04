"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, ArrowLeft, Plus, Edit, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { supabase, BlogPost } from "@/lib/supabase";

export default function BlogManagement() {
    const router = useRouter();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
            setFilteredPosts(data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error loading blog posts:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        let filtered = posts;

        if (categoryFilter !== "all") {
            filtered = filtered.filter(p => p.category === categoryFilter);
        }

        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredPosts(filtered);
    }, [searchQuery, categoryFilter, posts]);

    const deletePost = async (id: number) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            const { error } = await supabase
                .from('blog_posts')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setPosts(posts.filter(p => p.id !== id));
            alert('Blog post deleted successfully');
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete blog post');
        }
    };

    const categories = Array.from(new Set(posts.map(p => p.category)));

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 border-r border-white/10 p-6">
                <Link href="/admin">
                    <div className="mb-8">
                        <h1 className="text-2xl font-black text-white mb-1">
                            Deshan<span className="text-blue-500">Tours</span>
                        </h1>
                        <p className="text-slate-500 text-sm">Admin Panel</p>
                    </div>
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <Link href="/admin">
                                <button className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors">
                                    <ArrowLeft size={20} />
                                    <span className="font-semibold">Back to Dashboard</span>
                                </button>
                            </Link>
                            <h2 className="text-4xl font-black text-white mb-2">Blog Management</h2>
                            <p className="text-slate-400">Manage all blog posts</p>
                        </div>
                        <Link href="/admin/blog/add">
                            <button className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg">
                                <Plus size={20} />
                                Add Blog Post
                            </button>
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search blog posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:ring-2 ring-blue-500 transition-all"
                            />
                        </div>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-6 py-4 bg-slate-900 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 ring-blue-500 transition-all cursor-pointer"
                        >
                            <option value="all">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Blog Posts Grid */}
                    {loading ? (
                        <div className="text-center py-20 text-slate-400">Loading blog posts...</div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <BookOpen size={64} className="text-slate-700 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-400 mb-2">No blog posts found</h3>
                            <p className="text-slate-500">Add your first blog post to get started</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
                                        <p className="text-slate-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>

                                        <div className="flex items-center justify-between mb-4 text-sm text-slate-400">
                                            <span>{post.author}</span>
                                            <span>{post.read_time}</span>
                                        </div>

                                        <div className="flex gap-2">
                                            <Link href={`/admin/blog/edit/${post.id}`} className="flex-1">
                                                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2">
                                                    <Edit size={16} />
                                                    Edit
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => deletePost(post.id)}
                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
