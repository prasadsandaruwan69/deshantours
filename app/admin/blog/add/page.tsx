"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/app/components/ImageUpload";

export default function BlogForm() {
    const router = useRouter();
    const params = useParams();
    const isEdit = params?.id !== undefined;
    const postId = params?.id ? parseInt(params.id as string) : null;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image: "",
        author: "Deshan Tours Team",
        date: new Date().toISOString().split('T')[0],
        read_time: "5 min read",
        category: "",
        tags: [""]
    });

    useEffect(() => {
        if (isEdit && postId) {
            loadPost();
        }
    }, [isEdit, postId]);

    const loadPost = async () => {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('id', postId)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    title: data.title,
                    slug: data.slug,
                    excerpt: data.excerpt,
                    content: data.content,
                    image: data.image,
                    author: data.author,
                    date: data.date,
                    read_time: data.read_time,
                    category: data.category,
                    tags: data.tags.length > 0 ? data.tags : [""]
                });
            }
        } catch (error) {
            console.error('Error loading post:', error);
            alert('Failed to load blog post');
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (title: string) => {
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const postData = {
                title: formData.title,
                slug: formData.slug,
                excerpt: formData.excerpt,
                content: formData.content,
                image: formData.image,
                author: formData.author,
                date: formData.date,
                read_time: formData.read_time,
                category: formData.category,
                tags: formData.tags.filter(tag => tag.trim() !== "")
            };

            if (isEdit && postId) {
                const { error } = await supabase
                    .from('blog_posts')
                    .update(postData)
                    .eq('id', postId);

                if (error) throw error;
                alert('Blog post updated successfully!');
            } else {
                const { error } = await supabase
                    .from('blog_posts')
                    .insert([postData]);

                if (error) throw error;
                alert('Blog post created successfully!');
            }

            router.push('/admin/blog');
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Failed to save blog post');
            setLoading(false);
        }
    };

    const addTag = () => {
        setFormData({
            ...formData,
            tags: [...formData.tags, ""]
        });
    };

    const removeTag = (index: number) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((_, i) => i !== index)
        });
    };

    const updateTag = (index: number, value: string) => {
        const newTags = [...formData.tags];
        newTags[index] = value;
        setFormData({
            ...formData,
            tags: newTags
        });
    };

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
                <div className="p-8 max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <Link href="/admin/blog">
                            <button className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors">
                                <ArrowLeft size={20} />
                                <span className="font-semibold">Back to Blog Posts</span>
                            </button>
                        </Link>
                        <h2 className="text-4xl font-black text-white mb-2">
                            {isEdit ? 'Edit Blog Post' : 'Add New Blog Post'}
                        </h2>
                        <p className="text-slate-400">Fill in the blog post details</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6">Basic Information</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-white font-semibold mb-2">Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Slug (URL) *</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        required
                                    />
                                    <p className="text-slate-500 text-sm mt-1">Auto-generated from title, but you can edit it</p>
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Excerpt *</label>
                                    <textarea
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        rows={3}
                                        placeholder="Short summary of the blog post..."
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <ImageUpload
                                        label="Featured Image *"
                                        value={formData.image}
                                        onChange={(url) => setFormData({ ...formData, image: url })}
                                        folder="blog"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Category *</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Travel Tips">Travel Tips</option>
                                            <option value="Food & Culture">Food & Culture</option>
                                            <option value="Destinations">Destinations</option>
                                            <option value="Adventure">Adventure</option>
                                            <option value="Wildlife">Wildlife</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-white font-semibold mb-2">Read Time *</label>
                                        <input
                                            type="text"
                                            value={formData.read_time}
                                            onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                                            placeholder="e.g., 5 min read"
                                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-semibold mb-2">Author *</label>
                                        <input
                                            type="text"
                                            value={formData.author}
                                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-semibold mb-2">Publish Date *</label>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6">Content</h3>

                            <div>
                                <label className="block text-white font-semibold mb-2">Blog Content (Markdown supported) *</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={20}
                                    placeholder="Write your blog post content here... You can use Markdown formatting."
                                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white font-mono text-sm outline-none focus:ring-2 ring-blue-500"
                                    required
                                />
                                <p className="text-slate-500 text-sm mt-2">
                                    Tip: Use Markdown for formatting (# Heading, **bold**, *italic*, etc.)
                                </p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Tags</h3>
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    Add Tag
                                </button>
                            </div>

                            <div className="space-y-3">
                                {formData.tags.map((tag, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={tag}
                                            onChange={(e) => updateTag(index, e.target.value)}
                                            placeholder="e.g., Travel Guide"
                                            className="flex-1 px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        />
                                        {formData.tags.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeTag(index)}
                                                className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                                            >
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <Save size={20} />
                                {loading ? 'Saving...' : (isEdit ? 'Update Post' : 'Publish Post')}
                            </button>
                            <Link href="/admin/blog" className="flex-1">
                                <button
                                    type="button"
                                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold text-lg transition-all"
                                >
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
