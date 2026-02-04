"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    folder: string;
    label?: string;
}

export default function ImageUpload({ value, onChange, folder, label }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const file = e.target.files?.[0];
            if (!file) return;

            // Show local preview immediately
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `${folder}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('tour-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('tour-images')
                .getPublicUrl(filePath);

            onChange(publicUrl);
            setPreview(publicUrl);
            alert('Image uploaded successfully!');
        } catch (error: any) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + error.message);
            setPreview(value); // revert preview on error
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        onChange("");
        setPreview("");
    };

    return (
        <div className="space-y-4">
            {label && <label className="block text-white font-semibold mb-2">{label}</label>}

            <div className="relative">
                {preview ? (
                    <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-white/10 group">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <label className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white cursor-pointer hover:bg-white/30 transition-all">
                                <Upload size={20} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleUpload}
                                    disabled={uploading}
                                />
                            </label>
                            <button
                                type="button"
                                onClick={removeImage}
                                className="p-3 bg-red-500/50 backdrop-blur-md rounded-full text-white hover:bg-red-500/80 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        {uploading && (
                            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                                <Loader2 size={32} className="animate-spin mb-2" />
                                <p className="font-semibold">Uploading...</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <label className={`
                        flex flex-col items-center justify-center aspect-video rounded-2xl border-2 border-dashed border-white/10 
                        bg-slate-800/50 hover:bg-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group
                        ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}>
                        <div className="p-4 bg-slate-900 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                            {uploading ? (
                                <Loader2 size={32} className="text-blue-500 animate-spin" />
                            ) : (
                                <ImageIcon size={32} className="text-blue-500" />
                            )}
                        </div>
                        <div className="text-center px-6">
                            <p className="text-white font-bold text-lg mb-1">
                                {uploading ? 'Uploading...' : 'Upload Image'}
                            </p>
                            <p className="text-slate-400 text-sm">
                                PNG, JPG or WebP up to 5MB
                            </p>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </label>
                )}
            </div>
        </div>
    );
}
