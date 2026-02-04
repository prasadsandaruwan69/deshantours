# 🚀 Quick Setup Guide - DeshTours Admin Panel

## Complete Setup in 5 Steps

### ✅ Step 1: Create Supabase Tables (5 minutes)

1. Go to https://supabase.com/dashboard
2. Select project: `ayvvqxkikusgvpelyugo`
3. Click **SQL Editor** → **New Query**
4. Copy and run each SQL script from `README.md`:
   - ✅ Destinations table
   - ✅ Packages table
   - ✅ Blog posts table
   - ✅ Bookings table
   - ✅ Contact messages table
   - ✅ Trigger functions

### ✅ Step 2: Create Image Storage Bucket (2 minutes)

1. In Supabase Dashboard, click **Storage**
2. Click **New Bucket**
3. Name: `tour-images`
4. ✅ Check **"Public bucket"**
5. Click **Create Bucket**
6. Go to **Policies** tab
7. Click **New Policy** → **For full customization**
8. Copy and run this SQL to allow uploads:
```sql
-- Allow uploads to tour-images bucket
CREATE POLICY "Public Upload Access" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'tour-images' );
CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING ( bucket_id = 'tour-images' );
CREATE POLICY "Public Update Access" ON storage.objects FOR UPDATE USING ( bucket_id = 'tour-images' );
CREATE POLICY "Public Delete Access" ON storage.objects FOR DELETE USING ( bucket_id = 'tour-images' );
```
9. Click Save

### ✅ Step 3: Upload Images (10 minutes)

1. Click **Storage** → `tour-images` bucket
2. Create folders:
   - Click **New Folder** → name: `destinations`
   - Click **New Folder** → name: `packages`
   - Click **New Folder** → name: `blog`

3. Upload images:
   - Click `destinations` folder
   - Click **Upload File**
   - Select 5-10 Sri Lanka destination images
   - Repeat for `packages` and `blog` folders

4. Copy image URLs:
   - Click on each uploaded image
   - Click **Copy URL**
   - Save URLs in a text file

**Example URL format:**
```
https://ayvvqxkikusgvpelyugo.supabase.co/storage/v1/object/public/tour-images/destinations/sigiriya.jpg
```

### ✅ Step 4: Access Admin Panel (1 minute)

1. Open browser: http://localhost:3000/admin/login
2. Login:
   - Username: `admin`
   - Password: `admin123`
3. You'll see the dashboard!

### ✅ Step 5: Add Your First Content (5 minutes)

#### Add a Destination:

1. Click **Destinations** in sidebar
2. Click **Add Destination** button
3. Fill in the form:
   ```
   Name: Sigiriya
   Region: Central Province
   Type: Cultural & Historical
   Main Image: [paste Supabase Storage URL]
   Description: Ancient rock fortress...
   Speciality: 5th-century fortress...
   Activities: 
     - Climb the 1,200 steps
     - View the frescoes
   Best Time Months: January to April
   Best Time Weather: Dry season
   Best Time Reason: Best visibility
   Map URL: https://www.google.com/maps/embed?pb=...
   Latitude: 7.9569
   Longitude: 80.7567
   ```
4. Click **Create Destination**
5. ✅ Done!

#### Add a Package:

1. Click **Packages** in sidebar
2. Click **Add Package** button
3. Fill in the form:
   ```
   Name: Cultural Triangle Explorer
   Category: Cultural
   Days: 7
   Price: 899
   Main Image: [paste Supabase Storage URL]
   Description: Explore ancient kingdoms...
   ✅ Hotel Included: 4-star boutique hotels
   ✅ Transport Included: Private vehicle
   ✅ Guide Included: English-speaking guide
   Meals: Breakfast daily
   Highlights:
     - Climb Sigiriya Rock
     - Explore Polonnaruwa
     - Visit Temple of the Tooth
   ```
4. For itinerary, click **Load Sample Format**
5. Edit the JSON with your tour details
6. Click **Create Package**
7. ✅ Done!

---

## 📋 Quick Reference

### Admin Panel URLs

| Page | URL |
|------|-----|
| Login | http://localhost:3000/admin/login |
| Dashboard | http://localhost:3000/admin |
| Destinations | http://localhost:3000/admin/destinations |
| Add Destination | http://localhost:3000/admin/destinations/add |
| Packages | http://localhost:3000/admin/packages |
| Add Package | http://localhost:3000/admin/packages/add |
| Bookings | http://localhost:3000/admin/bookings |

### Default Credentials

```
Username: admin
Password: admin123
```

⚠️ **Change these in production!**

---

## 🖼️ Image Upload Workflow

```
1. Find/Take Photo
   ↓
2. Optimize Image (resize to 1200x800px, compress)
   ↓
3. Upload to Supabase Storage
   - Go to Storage → tour-images
   - Click on folder (destinations/packages/blog)
   - Upload File
   ↓
4. Copy Public URL
   - Click on uploaded image
   - Copy URL
   ↓
5. Paste in Admin Form
   - Go to Add Destination/Package/Blog
   - Paste URL in image field
   ↓
6. Save!
```

---

## 🎯 Sample Data Template

### Destination Example:

```
Name: Ella
Region: Uva Province
Type: Hill Country
Main Image: https://ayvvqxkikusgvpelyugo.supabase.co/storage/v1/object/public/tour-images/destinations/ella-main.jpg
Images:
  - https://ayvvqxkikusgvpelyugo.supabase.co/storage/v1/object/public/tour-images/destinations/ella-1.jpg
  - https://ayvvqxkikusgvpelyugo.supabase.co/storage/v1/object/public/tour-images/destinations/ella-2.jpg
Description: A small mountain town surrounded by tea plantations and stunning viewpoints.
Speciality: Famous for Nine Arch Bridge and Little Adam's Peak.
Activities:
  - Hike Little Adam's Peak
  - Visit Nine Arch Bridge
  - Take scenic train ride
Best Time Months: January to March
Best Time Weather: Cool and clear
Best Time Reason: Perfect hiking weather with best views
Map URL: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.123!2d81.0467!3d6.8667
Latitude: 6.8667
Longitude: 81.0467
```

### Package Example:

```json
{
  "name": "Beach Paradise Escape",
  "category": "Beach",
  "days": 6,
  "price": 699,
  "image": "https://ayvvqxkikusgvpelyugo.supabase.co/storage/v1/object/public/tour-images/packages/beach-main.jpg",
  "description": "Relax on pristine beaches and enjoy water sports",
  "hotel_included": true,
  "hotel_details": "Beachfront 4-star resorts",
  "transport_included": true,
  "transport_details": "Private transfers",
  "guide_included": true,
  "guide_details": "Local beach guide",
  "meals": "Breakfast and dinner daily",
  "activities": "Snorkeling, surfing, whale watching",
  "highlights": [
    "Whale watching in Mirissa",
    "Snorkeling in Hikkaduwa",
    "Surfing lessons in Arugam Bay"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Colombo - Transfer to Mirissa",
      "description": "Welcome to paradise!",
      "activities": ["Airport pickup", "Beach resort check-in", "Sunset beach walk"],
      "accommodation": "Mirissa Beach Resort",
      "meals": "Dinner"
    },
    {
      "day": 2,
      "title": "Whale Watching Adventure",
      "description": "Early morning whale watching tour",
      "activities": ["Whale watching boat tour", "Beach relaxation", "Seafood dinner"],
      "accommodation": "Mirissa Beach Resort",
      "meals": "Breakfast, Dinner"
    }
  ]
}
```

---

## ⚡ Troubleshooting

### Problem: Can't login to admin panel
**Solution:** 
- Check you're using correct credentials: `admin` / `admin123`
- Clear browser cache
- Try incognito mode

### Problem: Images not showing
**Solution:**
- Verify bucket `tour-images` is set to **Public**
- Check storage policies are enabled
- Verify image URL format is correct
- Make sure image was uploaded successfully

### Problem: Can't save destination/package
**Solution:**
- Check all required fields are filled (marked with *)
- Verify image URLs are valid
- Check browser console for errors
- Ensure Supabase tables are created

### Problem: Itinerary JSON error
**Solution:**
- Click "Load Sample Format" button
- Copy the sample JSON structure
- Make sure JSON is valid (use JSONLint.com to validate)
- Check all brackets and commas are correct

---

## 📞 Need Help?

1. Check the main `README.md` for detailed documentation
2. Review SQL scripts in README for table creation
3. Check Supabase Dashboard for errors
4. Verify environment variables in `.env.local`

---

## ✅ Setup Checklist

- [ ] Supabase tables created (5 tables)
- [ ] Trigger functions created
- [ ] Storage bucket `tour-images` created
- [ ] Bucket set to Public
- [ ] Storage policies configured
- [ ] Folders created (destinations, packages, blog)
- [ ] Sample images uploaded
- [ ] Image URLs copied
- [ ] Admin panel login successful
- [ ] First destination added
- [ ] First package added
- [ ] Bookings page accessible

---

**Once all checkboxes are complete, your admin panel is fully operational! 🎉**

Start adding your Sri Lankan destinations and tour packages!
