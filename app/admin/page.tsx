"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    MapPin,
    Package,
    BookOpen,
    Calendar,
    MessageSquare,
    LogOut,
    TrendingUp,
    Users,
    DollarSign
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState({
        destinations: 0,
        packages: 0,
        bookings: 0,
        messages: 0,
        pendingBookings: 0,
        totalRevenue: 0
    });
    const [recentBookings, setRecentBookings] = useState<any[]>([]);

    useEffect(() => {
        loadStats();
        loadRecentBookings();
    }, []);

    const loadStats = async () => {
        try {
            const [destinations, packages, bookings, messages] = await Promise.all([
                supabase.from('destinations').select('*', { count: 'exact', head: true }),
                supabase.from('packages').select('*', { count: 'exact', head: true }),
                supabase.from('bookingscontact').select('*', { count: 'exact', head: true }),
                supabase.from('contact_messages').select('*', { count: 'exact', head: true })
            ]);

            const { count: pendingCount } = await supabase
                .from('bookingscontact')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'pending');

            const { data: revenueData } = await supabase
                .from('bookingscontact')
                .select('total_price')
                .in('status', ['confirmed', 'completed']);

            const totalRevenue = revenueData?.reduce((sum, booking) => sum + Number(booking.total_price), 0) || 0;

            setStats({
                destinations: destinations.count || 0,
                packages: packages.count || 0,
                bookings: bookings.count || 0,
                messages: messages.count || 0,
                pendingBookings: pendingCount || 0,
                totalRevenue
            });
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    const loadRecentBookings = async () => {
        try {
            const { data, error } = await supabase
                .from('bookingscontact')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            if (error) throw error;
            setRecentBookings(data || []);
        } catch (error) {
            console.error('Error loading bookings:', error);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
        { icon: MapPin, label: "Destinations", href: "/admin/destinations" },
        { icon: Package, label: "Packages", href: "/admin/packages" },
        { icon: BookOpen, label: "Blog Posts", href: "/admin/blog" },
        { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
        { icon: MessageSquare, label: "Messages", href: "/admin/messages" }
    ];

    const statCards = [
        {
            icon: MapPin,
            label: "Destinations",
            value: stats.destinations,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-500/10"
        },
        {
            icon: Package,
            label: "Tour Packages",
            value: stats.packages,
            color: "from-emerald-500 to-teal-500",
            bgColor: "bg-emerald-500/10"
        },
        {
            icon: Calendar,
            label: "Total Bookings",
            value: stats.bookings,
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-500/10"
        },
        {
            icon: TrendingUp,
            label: "Pending Bookings",
            value: stats.pendingBookings,
            color: "from-orange-500 to-red-500",
            bgColor: "bg-orange-500/10"
        },
        {
            icon: DollarSign,
            label: "Total Revenue",
            value: `$${stats.totalRevenue.toLocaleString()}`,
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-500/10"
        },
        {
            icon: MessageSquare,
            label: "Messages",
            value: stats.messages,
            color: "from-indigo-500 to-blue-500",
            bgColor: "bg-indigo-500/10"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 border-r border-white/10 p-6 flex flex-col">
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-white mb-1">
                        Deshan<span className="text-blue-500">Tours</span>
                    </h1>
                    <p className="text-slate-500 text-sm">Admin Panel</p>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.href} href={item.href}>
                                <div
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active
                                        ? "bg-blue-600 text-white"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-semibold">{item.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-4"
                >
                    <LogOut size={20} />
                    <span className="font-semibold">Logout</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-4xl font-black text-white mb-2">Dashboard</h2>
                        <p className="text-slate-400">Welcome back! Here's your overview.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {statCards.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-slate-900 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                                            <Icon className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} size={24} strokeWidth={2.5} />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                                    <div className="text-slate-400 text-sm font-semibold">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Recent Bookings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-slate-900 border border-white/10 rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white">Recent Bookings</h3>
                            <Link href="/admin/bookings">
                                <button className="text-blue-500 hover:text-blue-400 font-semibold text-sm">
                                    View All →
                                </button>
                            </Link>
                        </div>

                        {recentBookings.length === 0 ? (
                            <div className="text-center py-12 text-slate-500">
                                <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                                <p>No bookings yet</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentBookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-all"
                                    >
                                        <div className="flex-1">
                                            <div className="font-bold text-white mb-1">{booking.customer_name}</div>
                                            <div className="text-sm text-slate-400">
                                                {booking.package_name} • {booking.number_of_guests} guests • {booking.number_of_days} days
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-white mb-1">${booking.total_price}</div>
                                            <div className={`text-xs font-semibold px-3 py-1 rounded-full inline-block ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                                                booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                                                        'bg-blue-500/20 text-blue-400'
                                                }`}>
                                                {booking.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
