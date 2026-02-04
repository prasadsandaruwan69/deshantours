"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/app/components/ImageUpload";

export default function PackageForm() {
    const router = useRouter();
    const params = useParams();
    const isEdit = params?.id !== undefined;
    const packageId = params?.id ? parseInt(params.id as string) : null;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        days: 7,
        price: 0,
        image: "",
        images: [""],
        description: "",
        hotel_included: true,
        hotel_details: "",
        transport_included: true,
        transport_details: "",
        guide_included: true,
        guide_details: "",
        meals: "",
        activities: "",
        highlights: [""],
        itinerary: ""
    });

    useEffect(() => {
        if (isEdit && packageId) {
            loadPackage();
        }
    }, [isEdit, packageId]);

    const loadPackage = async () => {
        try {
            const { data, error } = await supabase
                .from('packages')
                .select('*')
                .eq('id', packageId)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    name: data.name,
                    category: data.category,
                    days: data.days,
                    price: data.price,
                    image: data.image,
                    images: data.images.length > 0 ? data.images : [""],
                    description: data.description,
                    hotel_included: data.hotel_included,
                    hotel_details: data.hotel_details || "",
                    transport_included: data.transport_included,
                    transport_details: data.transport_details || "",
                    guide_included: data.guide_included,
                    guide_details: data.guide_details || "",
                    meals: data.meals || "",
                    activities: data.activities || "",
                    highlights: data.highlights.length > 0 ? data.highlights : [""],
                    itinerary: JSON.stringify(data.itinerary, null, 2)
                });
            }
        } catch (error) {
            console.error('Error loading package:', error);
            alert('Failed to load package');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let itineraryData;
            try {
                itineraryData = formData.itinerary ? JSON.parse(formData.itinerary) : [];
            } catch {
                alert('Invalid itinerary JSON format');
                setLoading(false);
                return;
            }

            const packageData = {
                name: formData.name,
                category: formData.category,
                days: formData.days,
                price: formData.price,
                image: formData.image,
                images: formData.images.filter(img => img.trim() !== ""),
                description: formData.description,
                hotel_included: formData.hotel_included,
                hotel_details: formData.hotel_details,
                transport_included: formData.transport_included,
                transport_details: formData.transport_details,
                guide_included: formData.guide_included,
                guide_details: formData.guide_details,
                meals: formData.meals,
                activities: formData.activities,
                highlights: formData.highlights.filter(h => h.trim() !== ""),
                itinerary: itineraryData
            };

            if (isEdit && packageId) {
                const { error } = await supabase
                    .from('packages')
                    .update(packageData)
                    .eq('id', packageId);

                if (error) throw error;
                alert('Package updated successfully!');
            } else {
                const { error } = await supabase
                    .from('packages')
                    .insert([packageData]);

                if (error) throw error;
                alert('Package created successfully!');
            }

            router.push('/admin/packages');
        } catch (error) {
            console.error('Error saving package:', error);
            alert('Failed to save package');
            setLoading(false);
        }
    };

    const addArrayField = (field: 'images' | 'highlights') => {
        setFormData({
            ...formData,
            [field]: [...formData[field], ""]
        });
    };

    const removeArrayField = (field: 'images' | 'highlights', index: number) => {
        setFormData({
            ...formData,
            [field]: formData[field].filter((_, i) => i !== index)
        });
    };

    const updateArrayField = (field: 'images' | 'highlights', index: number, value: string) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData({
            ...formData,
            [field]: newArray
        });
    };

    const sampleItinerary = `[
  {
    "day": 1,
    "title": "Arrival in Colombo",
    "description": "Welcome to Sri Lanka!",
    "activities": ["Airport pickup", "Transfer to hotel", "Welcome dinner"],
    "accommodation": "Colombo City Hotel",
    "meals": "Dinner"
  },
  {
    "day": 2,
    "title": "Colombo City Tour",
    "description": "Explore the vibrant capital",
    "activities": ["Visit Gangaramaya Temple", "Shopping at Pettah Market", "Galle Face Green sunset"],
    "accommodation": "Colombo City Hotel",
    "meals": "Breakfast, Lunch"
  }
]`;

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
                        <Link href="/admin/packages">
                            <button className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors">
                                <ArrowLeft size={20} />
                                <span className="font-semibold">Back to Packages</span>
                            </button>
                        </Link>
                        <h2 className="text-4xl font-black text-white mb-2">
                            {isEdit ? 'Edit Package' : 'Add New Package'}
                        </h2>
                        <p className="text-slate-400">Fill in the package details</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6">Basic Information</h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-white font-semibold mb-2">Package Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Category *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Cultural">Cultural</option>
                                        <option value="Safari">Safari</option>
                                        <option value="Beach">Beach</option>
                                        <option value="Hill Country">Hill Country</option>
                                        <option value="Adventure">Adventure</option>
                                        <option value="Custom">Custom</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Number of Days *</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.days}
                                        onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Price (USD) *</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <ImageUpload
                                        label="Main Image *"
                                        value={formData.image}
                                        onChange={(url) => setFormData({ ...formData, image: url })}
                                        folder="packages"
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
                                            folder="packages/gallery"
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

                        {/* Inclusions */}
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6">What's Included</h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.hotel_included}
                                            onChange={(e) => setFormData({ ...formData, hotel_included: e.target.checked })}
                                            className="w-5 h-5 rounded bg-slate-800 border-white/10"
                                        />
                                        <label className="text-white font-semibold">Hotel Accommodation</label>
                                    </div>
                                    {formData.hotel_included && (
                                        <input
                                            type="text"
                                            value={formData.hotel_details}
                                            onChange={(e) => setFormData({ ...formData, hotel_details: e.target.value })}
                                            placeholder="e.g., 4-star boutique hotels with breakfast"
                                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        />
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.transport_included}
                                            onChange={(e) => setFormData({ ...formData, transport_included: e.target.checked })}
                                            className="w-5 h-5 rounded bg-slate-800 border-white/10"
                                        />
                                        <label className="text-white font-semibold">Transportation</label>
                                    </div>
                                    {formData.transport_included && (
                                        <input
                                            type="text"
                                            value={formData.transport_details}
                                            onChange={(e) => setFormData({ ...formData, transport_details: e.target.value })}
                                            placeholder="e.g., Private air-conditioned vehicle with driver"
                                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        />
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.guide_included}
                                            onChange={(e) => setFormData({ ...formData, guide_included: e.target.checked })}
                                            className="w-5 h-5 rounded bg-slate-800 border-white/10"
                                        />
                                        <label className="text-white font-semibold">Tour Guide</label>
                                    </div>
                                    {formData.guide_included && (
                                        <input
                                            type="text"
                                            value={formData.guide_details}
                                            onChange={(e) => setFormData({ ...formData, guide_details: e.target.value })}
                                            placeholder="e.g., Expert English-speaking cultural guide"
                                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        />
                                    )}
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Meals</label>
                                    <input
                                        type="text"
                                        value={formData.meals}
                                        onChange={(e) => setFormData({ ...formData, meals: e.target.value })}
                                        placeholder="e.g., Breakfast daily, 3 traditional lunches"
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Activities</label>
                                    <input
                                        type="text"
                                        value={formData.activities}
                                        onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                                        placeholder="e.g., All entrance fees and cultural performances"
                                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Tour Highlights</h3>
                                <button
                                    type="button"
                                    onClick={() => addArrayField('highlights')}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    Add Highlight
                                </button>
                            </div>

                            <div className="space-y-3">
                                {formData.highlights.map((highlight, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={highlight}
                                            onChange={(e) => updateArrayField('highlights', index, e.target.value)}
                                            placeholder="e.g., Climb Sigiriya Rock Fortress"
                                            className="flex-1 px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white outline-none focus:ring-2 ring-blue-500"
                                        />
                                        {formData.highlights.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayField('highlights', index)}
                                                className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                                            >
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Itinerary */}
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-2">Day-by-Day Itinerary (JSON Format)</h3>
                            <p className="text-slate-400 text-sm mb-4">Enter itinerary as JSON array. See sample format below.</p>

                            <textarea
                                value={formData.itinerary}
                                onChange={(e) => setFormData({ ...formData, itinerary: e.target.value })}
                                rows={12}
                                placeholder={sampleItinerary}
                                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white font-mono text-sm outline-none focus:ring-2 ring-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, itinerary: sampleItinerary })}
                                className="mt-3 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm"
                            >
                                Load Sample Format
                            </button>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <Save size={20} />
                                {loading ? 'Saving...' : (isEdit ? 'Update Package' : 'Create Package')}
                            </button>
                            <Link href="/admin/packages" className="flex-1">
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
