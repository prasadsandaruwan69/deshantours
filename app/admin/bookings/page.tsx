"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Calendar,
    Search,
    Filter,
    Trash2,
    Eye,
    ArrowLeft,
    Check,
    X,
    Clock
} from "lucide-react";
import Link from "next/link";
import { supabase, Booking } from "@/lib/supabase";

export default function BookingsManagement() {
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const { data, error } = await supabase
                .from('bookingscontact')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBookings(data || []);
            setFilteredBookings(data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error loading bookings:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        let filtered = bookings;

        // Filter by status
        if (statusFilter !== "all") {
            filtered = filtered.filter(b => b.status === statusFilter);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(b =>
                b.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.package_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredBookings(filtered);
    }, [searchQuery, statusFilter, bookings]);

    const updateBookingStatus = async (id: number, status: string) => {
        try {
            const { error } = await supabase
                .from('bookingscontact')
                .update({ status })
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setBookings(bookings.map(b => b.id === id ? { ...b, status: status as any } : b));
            alert(`Booking status updated to ${status}`);
        } catch (error) {
            console.error('Error updating booking:', error);
            alert('Failed to update booking status');
        }
    };

    const deleteBooking = async (id: number) => {
        if (!confirm('Are you sure you want to delete this booking?')) return;

        try {
            const { error } = await supabase
                .from('bookingscontact')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setBookings(bookings.filter(b => b.id !== id));
            setSelectedBooking(null);
            alert('Booking deleted successfully');
        } catch (error) {
            console.error('Error deleting booking:', error);
            alert('Failed to delete booking');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar - Same as dashboard */}
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
                            <h2 className="text-4xl font-black text-white mb-2">Bookings Management</h2>
                            <p className="text-slate-400">Manage all tour bookings</p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, email, or package..."
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
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Bookings List */}
                    {loading ? (
                        <div className="text-center py-20 text-slate-400">Loading bookings...</div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="text-center py-20">
                            <Calendar size={64} className="text-slate-700 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-400 mb-2">No bookings found</h3>
                            <p className="text-slate-500">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {filteredBookings.map((booking, index) => (
                                <motion.div
                                    key={booking.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-slate-900 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-1">{booking.customer_name}</h3>
                                                    <p className="text-slate-400 text-sm">{booking.customer_email} • {booking.customer_phone}</p>
                                                </div>
                                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                                                    {booking.status.toUpperCase()}
                                                </span>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <p className="text-slate-500 text-sm mb-1">Package</p>
                                                    <p className="text-white font-semibold">{booking.package_name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500 text-sm mb-1">Tour Type</p>
                                                    <p className="text-white font-semibold">{booking.tour_type}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500 text-sm mb-1">Start Date</p>
                                                    <p className="text-white font-semibold">{new Date(booking.start_date).toLocaleDateString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500 text-sm mb-1">Duration & Guests</p>
                                                    <p className="text-white font-semibold">{booking.number_of_days} days • {booking.number_of_guests} guests</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="text-2xl font-black text-blue-500">${booking.total_price}</div>
                                                <div className="text-slate-500 text-sm">
                                                    Booked: {new Date(booking.created_at!).toLocaleDateString()}
                                                </div>
                                            </div>

                                            {booking.special_requests && (
                                                <div className="mt-4 p-4 bg-slate-800/50 rounded-xl">
                                                    <p className="text-slate-400 text-sm mb-1">Special Requests:</p>
                                                    <p className="text-white text-sm">{booking.special_requests}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex md:flex-col gap-2">
                                            {booking.status === 'pending' && (
                                                <button
                                                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
                                                >
                                                    <Check size={16} />
                                                    Confirm
                                                </button>
                                            )}
                                            {booking.status === 'confirmed' && (
                                                <button
                                                    onClick={() => updateBookingStatus(booking.id, 'completed')}
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
                                                >
                                                    <Check size={16} />
                                                    Complete
                                                </button>
                                            )}
                                            {(booking.status === 'pending' || booking.status === 'confirmed') && (
                                                <button
                                                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
                                                >
                                                    <X size={16} />
                                                    Cancel
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteBooking(booking.id)}
                                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
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
