export interface Destination {
    id: number;
    name: string;
    region: string;
    type: string;
    images: string[];
    mainImage: string;
    description: string;
    speciality: string;
    activities: string[];
    bestTimeToVisit: {
        months: string;
        weather: string;
        reason: string;
    };
    mapEmbedUrl: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

export const sriLankaDestinations: Destination[] = [
    {
        id: 1,
        name: "Sigiriya",
        region: "Central Province",
        type: "Cultural & Historical",
        mainImage: "https://images.unsplash.com/photo-1588598116712-427909247f52?q=80&w=1200",
        images: [
            "https://images.unsplash.com/photo-1588598116712-427909247f52?q=80&w=800",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",
            "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=800"
        ],
        description: "Sigiriya, also known as Lion Rock, is an ancient rock fortress and palace ruins surrounded by the remains of an extensive network of gardens, reservoirs, and other structures. This UNESCO World Heritage Site is one of the best-preserved examples of ancient urban planning.",
        speciality: "The 5th-century fortress built atop a 200-meter high rock, featuring ancient frescoes, mirror wall, and stunning summit views. The Lion's Gate and water gardens showcase remarkable ancient engineering.",
        activities: [
            "Climb the 1,200 steps to the summit",
            "View the famous Sigiriya frescoes (ancient paintings)",
            "Explore the water gardens and boulder gardens",
            "Visit the Sigiriya Museum",
            "Photography at sunrise or sunset",
            "Nearby Pidurangala Rock climb for panoramic views"
        ],
        bestTimeToVisit: {
            months: "January to April",
            weather: "Dry season with clear skies",
            reason: "Best visibility for climbing and photography. Less rainfall makes the ascent safer and more enjoyable."
        },
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.8736789!2d80.7567!3d7.9569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afca5b8f2b3e7a9%3A0x4c3f8c8c8c8c8c8c!2sSigiriya!5e0!3m2!1sen!2slk!4v1234567890",
        coordinates: { lat: 7.9569, lng: 80.7567 }
    },
    {
        id: 2,
        name: "Ella",
        region: "Uva Province",
        type: "Mountain & Nature",
        mainImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200",
        images: [
            "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800",
            "https://images.unsplash.com/photo-1584646098378-0874589d76b1?q=80&w=800",
            "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=800"
        ],
        description: "Ella is a small town in the Badulla District of Uva Province, surrounded by the beautiful greenery of tea plantations and mountains. It's become one of Sri Lanka's most popular tourist destinations for its stunning natural beauty and laid-back atmosphere.",
        speciality: "Famous for the Nine Arch Bridge, Little Adam's Peak, and Ella Rock. The scenic train journey to Ella through tea plantations is considered one of the most beautiful train rides in the world.",
        activities: [
            "Hike to Little Adam's Peak (1.5 hours)",
            "Trek to Ella Rock for panoramic views",
            "Visit the iconic Nine Arch Bridge",
            "Take the scenic train ride from Kandy or Nuwara Eliya",
            "Explore tea plantations and factories",
            "Zip-lining at Flying Ravana",
            "Visit Ravana Falls",
            "Relax at cafes with mountain views"
        ],
        bestTimeToVisit: {
            months: "December to March",
            weather: "Dry and pleasant, ideal for hiking",
            reason: "Clear skies offer the best mountain views and perfect conditions for outdoor activities and photography."
        },
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.234!2d81.0467!3d6.8667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae465b1e7b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sElla!5e0!3m2!1sen!2slk!4v1234567890",
        coordinates: { lat: 6.8667, lng: 81.0467 }
    },
    {
        id: 3,
        name: "Galle Fort",
        region: "Southern Province",
        type: "Colonial Heritage",
        mainImage: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?q=80&w=1200",
        images: [
            "https://images.unsplash.com/photo-1584646098378-0874589d76b1?q=80&w=800",
            "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=800",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800"
        ],
        description: "Galle Fort is a UNESCO World Heritage Site and the largest remaining fortress in Asia built by European occupiers. The fort showcases a unique fusion of European architecture and South Asian traditions, with cobblestone streets, colonial buildings, and ramparts overlooking the ocean.",
        speciality: "A 17th-century Dutch fort with well-preserved colonial architecture, lighthouse, museums, boutique hotels, and art galleries. The fort walls offer stunning sunset views over the Indian Ocean.",
        activities: [
            "Walk along the fort ramparts at sunset",
            "Visit the Galle Lighthouse",
            "Explore the National Maritime Museum",
            "Shop at boutique stores and art galleries",
            "Enjoy colonial architecture photography",
            "Visit the Dutch Reformed Church",
            "Dine at rooftop restaurants with ocean views",
            "Watch cricket matches on the Galle International Stadium"
        ],
        bestTimeToVisit: {
            months: "November to April",
            weather: "Dry season with calm seas",
            reason: "Perfect weather for exploring the fort on foot and enjoying beach activities nearby. Less humidity and clear skies."
        },
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.789!2d80.2167!3d6.0333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sGalle%20Fort!5e0!3m2!1sen!2slk!4v1234567890",
        coordinates: { lat: 6.0333, lng: 80.2167 }
    },
    {
        id: 4,
        name: "Kandy",
        region: "Central Province",
        type: "Cultural & Religious",
        mainImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",
            "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=800",
            "https://images.unsplash.com/photo-1588598116712-427909247f52?q=80&w=800"
        ],
        description: "Kandy, the last capital of the ancient kings' era of Sri Lanka, is a UNESCO World Heritage Site. The city is home to the Temple of the Tooth Relic, one of the most sacred Buddhist sites in the world, and is surrounded by mountains and tea plantations.",
        speciality: "The Temple of the Tooth Relic (Sri Dalada Maligawa), which houses the sacred tooth relic of Buddha. The annual Esala Perahera festival is one of Asia's most spectacular cultural pageants.",
        activities: [
            "Visit the Temple of the Tooth Relic",
            "Watch traditional Kandyan dance performances",
            "Stroll around Kandy Lake",
            "Explore the Royal Botanical Gardens in Peradeniya",
            "Visit tea plantations and factories",
            "Shop at Kandy City Centre",
            "Attend the Esala Perahera festival (July/August)",
            "Visit Bahiravokanda Vihara Buddha Statue for city views"
        ],
        bestTimeToVisit: {
            months: "December to April",
            weather: "Dry and comfortable temperatures",
            reason: "Ideal for sightseeing and outdoor activities. If visiting in July/August, you can witness the spectacular Esala Perahera festival."
        },
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.456!2d80.6350!3d7.2906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3662a6a6a6a6a%3A0x6a6a6a6a6a6a6a6a!2sKandy!5e0!3m2!1sen!2slk!4v1234567890",
        coordinates: { lat: 7.2906, lng: 80.6350 }
    },
    {
        id: 5,
        name: "Mirissa",
        region: "Southern Province",
        type: "Beach & Marine",
        mainImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1200",
        images: [
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800",
            "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=800",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800"
        ],
        description: "Mirissa is a small beach town on the south coast of Sri Lanka, known for its beautiful crescent-shaped beach, excellent surf breaks, and being one of the best places in the world for whale and dolphin watching.",
        speciality: "World-renowned whale watching destination (Blue whales and Sperm whales), pristine beaches, and vibrant nightlife. The Secret Beach and Coconut Tree Hill are Instagram-famous spots.",
        activities: [
            "Whale and dolphin watching tours (November-April)",
            "Surfing and surf lessons",
            "Snorkeling and diving",
            "Visit Coconut Tree Hill for sunset views",
            "Relax at Secret Beach",
            "Beach parties and nightlife",
            "Fresh seafood dining",
            "Visit nearby Parrot Rock"
        ],
        bestTimeToVisit: {
            months: "November to April",
            weather: "Calm seas and sunny weather",
            reason: "Peak whale watching season with highest sighting rates. Perfect beach weather with minimal rainfall and calm ocean conditions."
        },
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.123!2d80.4667!3d5.9500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae138b8b8b8b8b8%3A0x8b8b8b8b8b8b8b8b!2sMirissa!5e0!3m2!1sen!2slk!4v1234567890",
        coordinates: { lat: 5.9500, lng: 80.4667 }
    },
    {
        id: 6,
        name: "Yala National Park",
        region: "Southern & Uva Provinces",
        type: "Wildlife & Safari",
        mainImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200",
        images: [
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800",
            "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800",
            "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=800"
        ],
        description: "Yala National Park is Sri Lanka's most visited and second-largest national park. It's famous for having one of the highest leopard densities in the world and diverse ecosystems ranging from moist monsoon forests to freshwater and marine wetlands.",
        speciality: "Highest concentration of leopards in the world, along with elephants, sloth bears, crocodiles, and over 200 bird species. Ancient Buddhist monasteries within the park add cultural significance.",
        activities: [
            "Leopard safari (early morning or late afternoon)",
            "Bird watching (over 200 species)",
            "Elephant spotting",
            "Photography safaris",
            "Visit ancient Sithulpawwa Rock Temple",
            "Beach safari to see wildlife near the coast",
            "Camping experiences (with permits)",
            "Visit nearby Bundala National Park for flamingos"
        ],
        bestTimeToVisit: {
            months: "February to July",
            weather: "Dry season with active wildlife",
            reason: "Animals gather around water sources, making sightings more frequent. The park closes in September for maintenance during monsoon season."
        },
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.456!2d81.5167!3d6.3667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae69c9c9c9c9c9c%3A0x9c9c9c9c9c9c9c9c!2sYala%20National%20Park!5e0!3m2!1sen!2slk!4v1234567890",
        coordinates: { lat: 6.3667, lng: 81.5167 }
    }
];
