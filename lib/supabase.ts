import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Destination {
    id: number;
    name: string;
    region: string;
    type: string;
    main_image: string;
    images: string[];
    description: string;
    speciality: string;
    activities: string[];
    best_time_months: string;
    best_time_weather: string;
    best_time_reason: string;
    map_embed_url: string;
    latitude: number;
    longitude: number;
    created_at?: string;
    updated_at?: string;
}

export interface Package {
    id: number;
    name: string;
    category: string;
    days: number;
    price: number;
    image: string;
    images: string[];
    description: string;
    hotel_included: boolean;
    hotel_details: string;
    transport_included: boolean;
    transport_details: string;
    guide_included: boolean;
    guide_details: string;
    meals: string;
    activities: string;
    highlights: string[];
    itinerary: any[];
    created_at?: string;
    updated_at?: string;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    date: string;
    read_time: string;
    category: string;
    tags: string[];
    created_at?: string;
    updated_at?: string;
}

export interface Booking {
    id: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    package_id?: number;
    package_name: string;
    tour_type: string;
    start_date: string;
    number_of_days: number;
    number_of_guests: number;
    total_price: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    special_requests?: string;
    created_at?: string;
    updated_at?: string;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    created_at?: string;
}
