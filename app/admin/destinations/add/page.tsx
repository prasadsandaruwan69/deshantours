"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";
import { supabase, Destination } from "@/lib/supabase";
import ImageUpload from "@/app/components/ImageUpload";

export default function DestinationForm() {
    const router = useRouter();
    const params = useParams();
    const isEdit = params?.id !== undefined;
    const destinationId = params?.id ? parseInt(params.id as string) : null;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        region: "",
        type: "",
        main_image: "",
        images: [""],
        description: "",
        speciality: "",
        activities: [""],
        best_time_months: "",
        best_time_weather: "",
        best_time_reason: "",
        map_embed_url: "",
        latitude: 0,
        longitude: 0
    });

    useEffect(() => {
        if (isEdit && destinationId) {
            loadDestination();
        }
    }, [isEdit, destinationId]);

    const loadDestination = async () => {
        try {
            const { data, error } = await supabase
                .from('destinations')
                .select('*')
                .eq('id', destinationId)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    name: data.name,
                    region: data.region,
                    type: data.type,
                    main_image: data.main_image,
                    images: data.images.length > 0 ? data.images : [""],
                    description: data.description,
                    speciality: data.speciality,
                    activities: data.activities.length > 0 ? data.activities : [""],
                    best_time_months: data.best_time_months,
                    best_time_weather: data.best_time_weather,
                    best_time_reason: data.best_time_reason,
                    map_embed_url: data.map_embed_url,
                    latitude: data.latitude,
                    longitude: data.longitude
                });
            }
        } catch (error) {
            console.error('Error loading destination:', error);
            alert('Failed to load destination');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const destinationData = {
                ...formData,
                images: formData.images.filter(img => img.trim() !== ""),
                activities: formData.activities.filter(act => act.trim() !== "")
            };

            if (isEdit && destinationId) {
                const { error } = await supabase
                    .from('destinations')
                    .update(destinationData)
                    .eq('id', destinationId);

                if (error) throw error;
                alert('Destination updated successfully!');
            } else {
                const { error } = await supabase
                    .from('destinations')
                    .insert([destinationData]);

                if (error) throw error;
                alert('Destination created successfully!');
            }

            router.push('/admin/destinations');
        } catch (error) {
            console.error('Error saving destination:', error);
            alert('Failed to save destination');
            setLoading(false);
        }
    };

    const addArrayField = (field: 'images' | 'activities') => {
        setFormData({
            ...formData,
            [field]: [...formData[field], ""]
        });
    };

    const removeArrayField = (field: 'images' | 'activities', index: number) => {
        setFormData({
            ...formData,
            [field]: formData[field].filter((_, i) => i !== index)
        });
    };

    const updateArrayField = (field: 'images' | 'activities', index: number, value: string) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData({
            ...formData,
            [field]: newArray
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
                        <Link href="/admin/destinations">
                            <button className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors">
                                <ArrowLeft size={20} />
                                <span className="font-semibold">Back to Destinations</span>
                            </button>
                        </Link>
                        <h2 className="text-4xl font-black text-white mb-2">
                            {isEdit ? 'Edit Destination' : 'Add New Destination'}
                        </h2>
                        <p className="text-slate-400">Fill in the destination details</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6">Basic Information</h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-white font-semibold mb-2">Destination Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Region *</label>
                                    <input
                                        type="text"
                                        value={formData.region}
                                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                        placeholder="e.g., Central Province"
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Type *</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Cultural & Historical">Cultural & Historical</option>
                                        <option value="Beach & Coastal">Beach & Coastal</option>
                                        <option value="Hill Country">Hill Country</option>
                                        <option value="Wildlife & Nature">Wildlife & Nature</option>
                                        <option value="Adventure">Adventure</option>
                                    </select>
                                </div>

                                <div>
                                    <ImageUpload
                                        label="Main Image *"
                                        value={formData.main_image}
                                        onChange={(url) => setFormData({ ...formData, main_image: url })}
                                        folder="destinations"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-white font-semibold mb-2">Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="mt-6">
                                <label className="block text-white font-semibold mb-2">Speciality *</label>
                                <textarea
                                    value={formData.speciality}
                                    onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                                    rows={2}
                                    placeholder="What makes this destination special?"
                                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Gallery Images */}
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Gallery Images</h3>
                                <button
                                    type="button"
                                    onClick={() => addArrayField('images')}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    Add Image
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <ImageUpload
                                            value={image}
                                            onChange={(url) => updateArrayField('images', index, url)}
                                            folder="destinations/gallery"
                                        />
                                        {formData.images.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayField('images', index)}
                                                className="absolute -top-2 -right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg z-10"
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Activities */}
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Activities</h3>
                                <button
                                    type="button"
                                    onClick={() => addArrayField('activities')}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    Add Activity
                                </button>
                            </div>

                            <div className="space-y-3">
                                {formData.activities.map((activity, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={activity}
                                            onChange={(e) => updateArrayField('activities', index, e.target.value)}
                                            placeholder="e.g., Climb to the summit"
                                            className="flex-1 px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        />
                                        {formData.activities.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayField('activities', index)}
                                                className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                                            >
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Best Time to Visit */}
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6">Best Time to Visit</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-white font-semibold mb-2">Months *</label>
                                    <input
                                        type="text"
                                        value={formData.best_time_months}
                                        onChange={(e) => setFormData({ ...formData, best_time_months: e.target.value })}
                                        placeholder="e.g., January to April"
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Weather *</label>
                                    <input
                                        type="text"
                                        value={formData.best_time_weather}
                                        onChange={(e) => setFormData({ ...formData, best_time_weather: e.target.value })}
                                        placeholder="e.g., Dry season with clear skies"
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Reason *</label>
                                    <textarea
                                        value={formData.best_time_reason}
                                        onChange={(e) => setFormData({ ...formData, best_time_reason: e.target.value })}
                                        rows={2}
                                        placeholder="Why is this the best time?"
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6">Location</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-white font-semibold mb-2">Google Maps Embed URL *</label>
                                    <input
                                        type="url"
                                        value={formData.map_embed_url}
                                        onChange={(e) => setFormData({ ...formData, map_embed_url: e.target.value })}
                                        placeholder="https://www.google.com/maps/embed?pb=..."
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Latitude *</label>
                                        <input
                                            type="number"
                                            step="0.000001"
                                            value={formData.latitude}
                                            onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-semibold mb-2">Longitude *</label>
                                        <input
                                            type="number"
                                            step="0.000001"
                                            value={formData.longitude}
                                            onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>
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
                                {loading ? 'Saving...' : (isEdit ? 'Update Destination' : 'Create Destination')}
                            </button>
                            <Link href="/admin/destinations" className="flex-1">
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
