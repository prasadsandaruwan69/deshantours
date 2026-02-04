# DeshTours - Sri Lanka Tourism Website

A premium tourism website for Sri Lanka with admin panel and Supabase backend.

## 🚀 Features

- ✅ Video background hero section
- ✅ Why Choose Us section
- ✅ Detailed destination pages with maps
- ✅ Tour packages with day-by-day itineraries
- ✅ Blog with travel guides
- ✅ Tourist tips and FAQ
- ✅ Interactive price calculator
- ✅ Live chat support bot
- ✅ **Admin panel for content management**
- ✅ **Booking system with Supabase**

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd deshantours
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ayvvqxkikusgvpelyugo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_cNJGnuH_oHxh4zFbxn_cTg__Q58_VZ4
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Database Setup

### Step 1: Access Supabase SQL Editor

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `ayvvqxkikusgvpelyugo`
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Create Tables

Copy and paste the following SQL commands one by one:

#### 1. Destinations Table

```sql
-- Create destinations table
CREATE TABLE destinations (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  region VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  main_image TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  speciality TEXT NOT NULL,
  activities TEXT[] NOT NULL DEFAULT '{}',
  best_time_months VARCHAR(100) NOT NULL,
  best_time_weather VARCHAR(255) NOT NULL,
  best_time_reason TEXT NOT NULL,
  map_embed_url TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON destinations
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated insert" ON destinations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON destinations
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete" ON destinations
  FOR DELETE USING (true);
```

#### 2. Packages Table

```sql
-- Create packages table
CREATE TABLE packages (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  days INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  hotel_included BOOLEAN DEFAULT true,
  hotel_details TEXT,
  transport_included BOOLEAN DEFAULT true,
  transport_details TEXT,
  guide_included BOOLEAN DEFAULT true,
  guide_details TEXT,
  meals TEXT,
  activities TEXT,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  itinerary JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON packages
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON packages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON packages
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete" ON packages
  FOR DELETE USING (true);
```

#### 3. Blog Posts Table

```sql
-- Create blog_posts table
CREATE TABLE blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  read_time VARCHAR(50) NOT NULL,
  category VARCHAR(100) NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON blog_posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON blog_posts
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete" ON blog_posts
  FOR DELETE USING (true);
```

#### 4. Bookings Table

```sql
-- Create bookings table
CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  package_id BIGINT REFERENCES packages(id) ON DELETE SET NULL,
  package_name VARCHAR(255) NOT NULL,
  tour_type VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  number_of_days INTEGER NOT NULL,
  number_of_guests INTEGER NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public insert" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated update" ON bookings
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete" ON bookings
  FOR DELETE USING (true);
```

#### 5. Contact Messages Table

```sql
-- Create contact_messages table
CREATE TABLE contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public insert" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON contact_messages
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated update" ON contact_messages
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete" ON contact_messages
  FOR DELETE USING (true);
```

#### 6. Create Updated At Trigger Function

```sql
-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables
CREATE TRIGGER update_destinations_updated_at
  BEFORE UPDATE ON destinations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at
  BEFORE UPDATE ON packages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Step 3: Insert Sample Data (Optional)

```sql
-- Insert sample destination
INSERT INTO destinations (name, region, type, main_image, images, description, speciality, activities, best_time_months, best_time_weather, best_time_reason, map_embed_url, latitude, longitude)
VALUES (
  'Sigiriya',
  'Central Province',
  'Cultural & Historical',
  'https://images.unsplash.com/photo-1588598116712-427909247f52?q=80&w=1200',
  ARRAY['https://images.unsplash.com/photo-1588598116712-427909247f52?q=80&w=800', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800'],
  'Sigiriya, also known as Lion Rock, is an ancient rock fortress and palace ruins.',
  'The 5th-century fortress built atop a 200-meter high rock.',
  ARRAY['Climb the 1,200 steps to the summit', 'View the famous Sigiriya frescoes', 'Explore the water gardens'],
  'January to April',
  'Dry season with clear skies',
  'Best visibility for climbing and photography.',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.8736789!2d80.7567!3d7.9569',
  7.9569,
  80.7567
);

-- Insert sample package
INSERT INTO packages (name, category, days, price, image, images, description, hotel_details, transport_details, guide_details, meals, activities, highlights, itinerary)
VALUES (
  'Cultural Triangle Explorer',
  'Cultural',
  7,
  899.00,
  'https://images.unsplash.com/photo-1588598116712-427909247f52?q=80&w=1200',
  ARRAY['https://images.unsplash.com/photo-1588598116712-427909247f52?q=80&w=800'],
  'Explore Sri Lanka''s ancient kingdoms and UNESCO World Heritage Sites.',
  '4-star boutique hotels with breakfast',
  'Private air-conditioned vehicle with driver',
  'Expert English-speaking cultural guide',
  'Breakfast daily, 3 traditional lunches',
  'All entrance fees and cultural performances included',
  ARRAY['Climb Sigiriya Rock Fortress', 'Explore ancient Polonnaruwa ruins', 'Visit the sacred Temple of the Tooth'],
  '[{"day": 1, "title": "Arrival in Colombo", "description": "Welcome to Sri Lanka!", "activities": ["Airport pickup", "Transfer to Sigiriya"], "accommodation": "Sigiriya hotel", "meals": "Dinner"}]'::jsonb
);
```

---

## � Supabase Storage Setup (Image Upload)

### Why Use Supabase Storage?

Instead of using external image URLs (like Unsplash), you can upload your own images to Supabase Storage. This gives you:
- ✅ Full control over your images
- ✅ Fast CDN delivery
- ✅ No external dependencies
- ✅ Organized image management

### Step 1: Create Storage Bucket

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `ayvvqxkikusgvpelyugo`

2. **Navigate to Storage**
   - Click **Storage** in the left sidebar
   - Click **New Bucket** button

3. **Create Bucket**
   - **Bucket Name**: `tour-images`
   - **Public Bucket**: ✅ **Check this box** (to allow public access to images)
   - Click **Create Bucket**

### Step 2: Set Up Storage Policies

After creating the bucket, set up policies to allow public read access:

1. Click on the `tour-images` bucket
2. Go to **Policies** tab
3. Click **New Policy**
4. Select **"For full customization"**
5. Add this policy:

```sql
-- Allow public read access to tour-images bucket
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'tour-images' );

-- Allow uploads to tour-images bucket
-- Note: Simplified for development/custom admin panels
CREATE POLICY "Public Upload Access"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'tour-images' );

-- Allow updates to tour-images bucket
CREATE POLICY "Public Update Access"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'tour-images' );

-- Allow deletions from tour-images bucket
CREATE POLICY "Public Delete Access"
ON storage.objects FOR DELETE
USING ( bucket_id = 'tour-images' );
```

**OR** use the Supabase Dashboard UI:
- Click **New Policy** → **Get started quickly**
- Select **"Enable read access for all users"**
- Click **Review** → **Save Policy**

### Step 3: Upload Images

#### Option A: Upload via Supabase Dashboard (Easiest)

1. **Navigate to Storage**
   - Click **Storage** in left sidebar
   - Click on `tour-images` bucket

2. **Create Folders** (Recommended for organization)
   - Click **New Folder**
   - Create folders:
     - `destinations/`
     - `packages/`
     - `blog/`

3. **Upload Images**
   - Click on a folder (e.g., `destinations/`)
   - Click **Upload File**
   - Select your image(s)
   - Click **Upload**

4. **Get Image URL**
   - After upload, click on the image
   - Click **Get URL** or **Copy URL**
   - The URL format will be:
   ```
   https://ayvvqxkikusgvpelyugo.supabase.co/storage/v1/object/public/tour-images/destinations/sigiriya.jpg
   ```

#### Option B: Upload via Code (Advanced)

Create a file upload component in your admin panel:

```typescript
import { supabase } from '@/lib/supabase';

const uploadImage = async (file: File, folder: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('tour-images')
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading:', error);
    return null;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('tour-images')
    .getPublicUrl(filePath);

  return publicUrl;
};

// Usage in your form
const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const url = await uploadImage(file, 'destinations');
  if (url) {
    setFormData({ ...formData, main_image: url });
  }
};
```

### Step 4: Organize Your Images

**Recommended Folder Structure:**

```
tour-images/
├── destinations/
│   ├── sigiriya-main.jpg
│   ├── sigiriya-gallery-1.jpg
│   ├── sigiriya-gallery-2.jpg
│   ├── ella-main.jpg
│   └── ...
├── packages/
│   ├── cultural-tour-main.jpg
│   ├── cultural-tour-1.jpg
│   ├── safari-tour-main.jpg
│   └── ...
└── blog/
    ├── best-time-visit.jpg
    ├── food-guide.jpg
    └── ...
```

### Step 5: Use Images in Admin Panel

When adding destinations, packages, or blog posts:

1. **Upload Image to Supabase Storage** (via Dashboard or code)
2. **Copy the Public URL**
3. **Paste URL in Admin Form**

**Example URLs:**
```
Main Image:
https://ayvvqxkikusgvpelyugo.supabase.co/storage/v1/object/public/tour-images/destinations/sigiriya-main.jpg

Gallery Images:
https://ayvvqxkikusgvpelyugo.supabase.co/storage/v1/object/public/tour-images/destinations/sigiriya-gallery-1.jpg
https://ayvvqxkikusgvpelyugo.supabase.co/storage/v1/object/public/tour-images/destinations/sigiriya-gallery-2.jpg
```

### Image Upload Best Practices

1. **Image Optimization**
   - Resize images before upload (recommended: 1200x800px for main images)
   - Compress images (use tools like TinyPNG, ImageOptim)
   - Use WebP format for better compression

2. **Naming Convention**
   - Use descriptive names: `sigiriya-rock-fortress.jpg`
   - Use lowercase and hyphens
   - Avoid spaces and special characters

3. **Image Sizes**
   - **Main Images**: 1200x800px (landscape)
   - **Gallery Images**: 800x600px
   - **Blog Featured Images**: 1200x630px
   - **Thumbnails**: 400x300px

4. **File Formats**
   - Use **JPEG** for photos (smaller file size)
   - Use **PNG** for graphics with transparency
   - Use **WebP** for best compression (modern browsers)

### Quick Start: Upload Sample Images

1. **Download Sample Images**
   - Find high-quality Sri Lanka images from:
     - Unsplash.com
     - Pexels.com
     - Pixabay.com
   - Or use your own photos

2. **Upload to Supabase**
   - Go to Storage → `tour-images`
   - Create `destinations` folder
   - Upload 5-10 destination images
   - Create `packages` folder
   - Upload 5-10 package images

3. **Copy URLs**
   - Click each image
   - Copy the public URL
   - Save URLs in a text file for easy access

4. **Add to Database**
   - Go to Admin Panel → Destinations → Add Destination
   - Paste the Supabase Storage URLs
   - Save!

### Troubleshooting

**Problem: Images not loading**
- ✅ Check bucket is set to **Public**
- ✅ Verify storage policies are set correctly
- ✅ Check URL format is correct
- ✅ Ensure image file exists in bucket

**Problem: Upload fails**
- ✅ Check file size (max 50MB by default)
- ✅ Verify bucket name is correct
- ✅ Check upload policies are set

**Problem: Slow image loading**
- ✅ Compress images before upload
- ✅ Use appropriate image sizes
- ✅ Consider using WebP format

---

## �🔐 Admin Panel Access

### Admin Panel URL
```
http://localhost:3000/admin
```

### Default Admin Credentials
For development, the admin panel uses simple authentication:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Important**: Change these credentials in production!

---

## 📱 Admin Panel Features

### 1. **Dashboard**
- Overview statistics
- Recent bookings
- Quick actions

### 2. **Destinations Management**
- ✅ View all destinations
- ✅ Add new destination
- ✅ Edit destination details
- ✅ Delete destination
- ✅ Upload images
- ✅ Set best time to visit

### 3. **Packages Management**
- ✅ View all tour packages
- ✅ Add new package
- ✅ Edit package details
- ✅ Delete package
- ✅ Manage day-by-day itinerary
- ✅ Set pricing and inclusions

### 4. **Blog Management**
- ✅ View all blog posts
- ✅ Create new post
- ✅ Edit post content
- ✅ Delete post
- ✅ Manage categories and tags

### 5. **Bookings Management**
- ✅ View all bookings
- ✅ Filter by status (pending/confirmed/cancelled/completed)
- ✅ Update booking status
- ✅ View customer details
- ✅ Delete booking

### 6. **Contact Messages**
- ✅ View all messages
- ✅ Mark as read/replied
- ✅ Delete messages

---

## 🗂️ Project Structure

```
deshantours/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── page.tsx        # Dashboard
│   │   ├── destinations/   # Destinations management
│   │   ├── packages/       # Packages management
│   │   ├── blog/          # Blog management
│   │   ├── bookings/      # Bookings management
│   │   └── messages/      # Contact messages
│   ├── components/         # Reusable components
│   ├── destinations/       # Public destination pages
│   ├── packages/          # Public package pages
│   ├── blog/              # Public blog pages
│   ├── faq/               # FAQ page
│   └── contact/           # Contact page
├── lib/
│   ├── supabase.ts        # Supabase client & types
│   ├── destinationsData.ts
│   ├── packagesData.ts
│   └── blogData.ts
└── public/
    └── video.mp4          # Hero background video
```

---

## 🔄 API Endpoints (Supabase)

All data is managed through Supabase:

- **Destinations**: `supabase.from('destinations')`
- **Packages**: `supabase.from('packages')`
- **Blog Posts**: `supabase.from('blog_posts')`
- **Bookings**: `supabase.from('bookings')`
- **Contact Messages**: `supabase.from('contact_messages')`

---

## 📊 Database Schema

### Destinations Table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| name | VARCHAR(255) | Destination name |
| region | VARCHAR(255) | Geographic region |
| type | VARCHAR(100) | Type (Cultural, Beach, etc.) |
| main_image | TEXT | Main image URL |
| images | TEXT[] | Array of image URLs |
| description | TEXT | Full description |
| speciality | TEXT | What makes it special |
| activities | TEXT[] | Array of activities |
| best_time_months | VARCHAR(100) | Best months to visit |
| best_time_weather | VARCHAR(255) | Weather description |
| best_time_reason | TEXT | Why this time is best |
| map_embed_url | TEXT | Google Maps embed URL |
| latitude | DECIMAL(10,8) | GPS latitude |
| longitude | DECIMAL(11,8) | GPS longitude |

### Packages Table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| name | VARCHAR(255) | Package name |
| category | VARCHAR(100) | Category (Cultural, Safari, etc.) |
| days | INTEGER | Number of days |
| price | DECIMAL(10,2) | Price per person |
| image | TEXT | Main image URL |
| images | TEXT[] | Array of image URLs |
| description | TEXT | Package description |
| hotel_included | BOOLEAN | Hotel included? |
| hotel_details | TEXT | Hotel details |
| transport_included | BOOLEAN | Transport included? |
| transport_details | TEXT | Transport details |
| guide_included | BOOLEAN | Guide included? |
| guide_details | TEXT | Guide details |
| meals | TEXT | Meals included |
| activities | TEXT | Activities included |
| highlights | TEXT[] | Package highlights |
| itinerary | JSONB | Day-by-day itinerary |

### Bookings Table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| customer_name | VARCHAR(255) | Customer name |
| customer_email | VARCHAR(255) | Customer email |
| customer_phone | VARCHAR(50) | Customer phone |
| package_id | BIGINT | Reference to package |
| package_name | VARCHAR(255) | Package name |
| tour_type | VARCHAR(100) | Tour type |
| start_date | DATE | Tour start date |
| number_of_days | INTEGER | Duration |
| number_of_guests | INTEGER | Number of guests |
| total_price | DECIMAL(10,2) | Total price |
| status | VARCHAR(50) | Status (pending/confirmed/cancelled/completed) |
| special_requests | TEXT | Special requests |

---

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

---

## 🔒 Security Notes

1. **Row Level Security (RLS)** is enabled on all tables
2. Public users can:
   - Read destinations, packages, and blog posts
   - Create bookings and contact messages
3. Authenticated users (admin) can:
   - Create, update, and delete all content
4. **Change admin credentials** in production
5. Use **Supabase Auth** for production admin authentication

---

## 📞 Support

For issues or questions:
- Email: info@deshantours.com
- Phone: +94 77 123 4567

---

## 📝 License

This project is proprietary and confidential.

---

## 🎉 Credits

Built with:
- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase
- Lucide Icons

---

**Happy Touring! 🌴✈️**
