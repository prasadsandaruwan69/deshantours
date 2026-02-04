"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft, Plus, Edit, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { supabase, Destination } from "@/lib/supabase";

export default function DestinationsManagement() {
    const router = useRouter();
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDestinations();
    }, []);

    const loadDestinations = async () => {
        try {
            const { data, error } = await supabase
                .from('destinations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setDestinations(data || []);
            setFilteredDestinations(data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error loading destinations:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            setFilteredDestinations(
                destinations.filter(d =>
                    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    d.type.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredDestinations(destinations);
        }
    }, [searchQuery, destinations]);

    const deleteDestination = async (id: number) => {
        if (!confirm('Are you sure you want to delete this destination?')) return;

        try {
            const { error } = await supabase
                .from('destinations')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setDestinations(destinations.filter(d => d.id !== id));
            alert('Destination deleted successfully');
        } catch (error) {
            console.error('Error deleting destination:', error);
            alert('Failed to delete destination');
        }
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
                            <h2 className="text-4xl font-black text-white mb-2">Destinations Management</h2>
                            <p className="text-slate-400">Manage all travel destinations</p>
                        </div>
                        <Link href="/admin/destinations/add">
                            <button className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg">
                                <Plus size={20} />
                                Add Destination
                            </button>
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="mb-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:ring-2 ring-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Destinations Grid */}
                    {loading ? (
                        <div className="text-center py-20 text-slate-400">Loading destinations...</div>
                    ) : filteredDestinations.length === 0 ? (
                        <div className="text-center py-20">
                            <MapPin size={64} className="text-slate-700 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-400 mb-2">No destinations found</h3>
                            <p className="text-slate-500">Add your first destination to get started</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDestinations.map((destination, index) => (
                                <motion.div
                                    key={destination.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={destination.main_image}
                                            alt={destination.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
                                                {destination.type}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2">{destination.name}</h3>
                                        <p className="text-slate-400 text-sm mb-4">{destination.region}</p>
                                        <p className="text-slate-500 text-sm line-clamp-2 mb-4">{destination.description}</p>

                                        <div className="flex gap-2">
                                            <Link href={`/admin/destinations/edit/${destination.id}`} className="flex-1">
                                                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2">
                                                    <Edit size={16} />
                                                    Edit
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => deleteDestination(destination.id)}
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
