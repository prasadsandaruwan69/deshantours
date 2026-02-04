"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    MessageSquare,
    ArrowLeft,
    Trash2,
    Search,
    Mail,
    Phone,
    Clock,
    CheckCircle2,
    Circle
} from "lucide-react";
import Link from "next/link";
import { supabase, ContactMessage } from "@/lib/supabase";

export default function MessagesManagement() {
    const router = useRouter();
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMessages(data || []);
            setFilteredMessages(data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error loading messages:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        let filtered = messages;

        if (statusFilter !== "all") {
            filtered = filtered.filter(m => m.status === statusFilter);
        }

        if (searchQuery) {
            filtered = filtered.filter(m =>
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.message.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredMessages(filtered);
    }, [searchQuery, statusFilter, messages]);

    const updateMessageStatus = async (id: number, status: string) => {
        try {
            const { error } = await supabase
                .from('contact_messages')
                .update({ status })
                .eq('id', id);

            if (error) throw error;

            setMessages(messages.map(m => m.id === id ? { ...m, status: status as any } : m));
        } catch (error) {
            console.error('Error updating message status:', error);
        }
    };

    const deleteMessage = async (id: number) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setMessages(messages.filter(m => m.id !== id));
            alert('Message deleted successfully');
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message');
        }
    };

    const menuItems = [
        { icon: MessageSquare, label: "Dashboard", href: "/admin" },
        { icon: MessageSquare, label: "Destinations", href: "/admin/destinations" },
        { icon: MessageSquare, label: "Packages", href: "/admin/packages" },
        { icon: MessageSquare, label: "Blog Posts", href: "/admin/blog" },
        { icon: MessageSquare, label: "Bookings", href: "/admin/bookings" },
        { icon: MessageSquare, label: "Messages", href: "/admin/messages", active: true }
    ];

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
                <nav className="space-y-2">
                    {/* Reusing menu items from Dashboard for consistency */}
                    <Link href="/admin"><div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 transition-all"><span className="font-semibold">Dashboard</span></div></Link>
                    <Link href="/admin/destinations"><div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 transition-all"><span className="font-semibold">Destinations</span></div></Link>
                    <Link href="/admin/packages"><div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 transition-all"><span className="font-semibold">Packages</span></div></Link>
                    <Link href="/admin/blog"><div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 transition-all"><span className="font-semibold">Blog Posts</span></div></Link>
                    <Link href="/admin/bookings"><div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 transition-all"><span className="font-semibold">Bookings</span></div></Link>
                    <Link href="/admin/messages"><div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white transition-all"><span className="font-semibold">Messages</span></div></Link>
                </nav>
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
                            <h2 className="text-4xl font-black text-white mb-2">Inquiries & Messages</h2>
                            <p className="text-slate-400">Manage contact form submissions</p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:ring-2 ring-blue-500 transition-all"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-6 py-4 bg-slate-900 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 ring-blue-500 transition-all cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                        </select>
                    </div>

                    {/* Messages List */}
                    {loading ? (
                        <div className="text-center py-20 text-slate-400">Loading messages...</div>
                    ) : filteredMessages.length === 0 ? (
                        <div className="text-center py-20">
                            <MessageSquare size={64} className="text-slate-700 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-400 mb-2">No messages found</h3>
                            <p className="text-slate-500">When users contact you, they will appear here</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredMessages.map((msg, index) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`bg-slate-900 border ${msg.status === 'new' ? 'border-blue-500/50' : 'border-white/10'} rounded-2xl p-6 hover:border-white/20 transition-all`}
                                >
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${msg.status === 'new' ? 'bg-blue-600 text-white' :
                                                    msg.status === 'read' ? 'bg-slate-700 text-slate-300' :
                                                        'bg-emerald-600 text-white'
                                                    }`}>
                                                    {msg.status.toUpperCase()}
                                                </span>
                                                <span className="text-slate-500 text-xs flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {new Date(msg.created_at!).toLocaleString()}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-bold text-white mb-2">{msg.subject}</h3>
                                            <p className="text-slate-300 mb-6 leading-relaxed whitespace-pre-wrap">{msg.message}</p>

                                            <div className="grid md:grid-cols-3 gap-4 p-4 bg-slate-800/50 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold">
                                                        {msg.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500 font-semibold uppercase">Name</p>
                                                        <p className="text-white font-medium">{msg.name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Mail size={18} className="text-blue-500" />
                                                    <div>
                                                        <p className="text-xs text-slate-500 font-semibold uppercase">Email</p>
                                                        <a href={`mailto:${msg.email}`} className="text-white font-medium hover:text-blue-400 transition-colors">{msg.email}</a>
                                                    </div>
                                                </div>
                                                {msg.phone && (
                                                    <div className="flex items-center gap-3">
                                                        <Phone size={18} className="text-emerald-500" />
                                                        <div>
                                                            <p className="text-xs text-slate-500 font-semibold uppercase">Phone</p>
                                                            <a href={`tel:${msg.phone}`} className="text-white font-medium hover:text-emerald-400 transition-colors">{msg.phone}</a>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex md:flex-col gap-2 justify-end">
                                            {msg.status !== 'read' && msg.status !== 'replied' && (
                                                <button
                                                    onClick={() => updateMessageStatus(msg.id, 'read')}
                                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
                                                >
                                                    <Circle size={16} />
                                                    Mark Read
                                                </button>
                                            )}
                                            {msg.status !== 'replied' && (
                                                <button
                                                    onClick={() => updateMessageStatus(msg.id, 'replied')}
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
                                                >
                                                    <CheckCircle2 size={16} />
                                                    Mark Replied
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteMessage(msg.id)}
                                                className="px-4 py-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
                                            >
                                                <Trash2 size={16} />
                                                Delete
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
