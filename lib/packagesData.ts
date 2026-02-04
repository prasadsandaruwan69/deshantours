export interface TourPackage {
    id: number;
    name: string;
    category: "Cultural" | "Safari" | "Beach" | "Hill Country" | "Adventure" | "Custom";
    days: number;
    price: number;
    image: string;
    images: string[];
    description: string;
    included: {
        hotel: boolean;
        hotelDetails: string;
        transport: boolean;
        transportDetails: string;
        guide: boolean;
        guideDetails: string;
        meals?: string;
        activities?: string;
    };
    itinerary: {
        day: number;
        title: string;
        description: string;
        activities: string[];
        accommodation?: string;
        meals?: string;
    }[];
    highlights: string[];
}

export const tourPackages: TourPackage[] = [
    {
        id: 1,
        name: "Cultural Triangle Explorer",
        category: "Cultural",
        days: 7,
        price: 899,
        image: "https://images.unsplash.com/photo-1588598116712-427909247f52?q=80&w=1200",
        images: [
            "https://images.unsplash.com/photo-1588598116712-427909247f52?q=80&w=800",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",
            "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=800"
        ],
        description: "Explore Sri Lanka's ancient kingdoms and UNESCO World Heritage Sites in the Cultural Triangle. Visit magnificent temples, climb ancient rock fortresses, and immerse yourself in 2,500 years of history.",
        included: {
            hotel: true,
            hotelDetails: "4-star boutique hotels with breakfast",
            transport: true,
            transportDetails: "Private air-conditioned vehicle with driver",
            guide: true,
            guideDetails: "Expert English-speaking cultural guide",
            meals: "Breakfast daily, 3 traditional lunches",
            activities: "All entrance fees and cultural performances included"
        },
        highlights: [
            "Climb Sigiriya Rock Fortress",
            "Explore ancient Polonnaruwa ruins",
            "Visit the sacred Temple of the Tooth in Kandy",
            "Dambulla Cave Temple complex",
            "Traditional Kandyan dance performance",
            "Spice garden tour in Matale"
        ],
        itinerary: [
            {
                day: 1,
                title: "Arrival in Colombo - Transfer to Sigiriya",
                description: "Welcome to Sri Lanka! Meet your guide and transfer to Sigiriya through scenic countryside.",
                activities: [
                    "Airport pickup and welcome",
                    "Scenic drive to Sigiriya (4 hours)",
                    "Check-in at hotel",
                    "Evening at leisure"
                ],
                accommodation: "Sigiriya boutique hotel",
                meals: "Dinner"
            },
            {
                day: 2,
                title: "Sigiriya Rock Fortress & Minneriya Safari",
                description: "Climb the iconic Lion Rock and enjoy an evening elephant safari.",
                activities: [
                    "Early morning climb of Sigiriya Rock (2-3 hours)",
                    "Visit Sigiriya Museum",
                    "Lunch at local restaurant",
                    "Afternoon jeep safari at Minneriya National Park",
                    "Witness large elephant gatherings"
                ],
                accommodation: "Sigiriya boutique hotel",
                meals: "Breakfast, Lunch, Dinner"
            },
            {
                day: 3,
                title: "Polonnaruwa Ancient City",
                description: "Explore the medieval capital with its well-preserved ruins and monuments.",
                activities: [
                    "Guided tour of Polonnaruwa ruins",
                    "Visit Gal Vihara Buddha statues",
                    "Explore Royal Palace and Audience Hall",
                    "Parakrama Samudra reservoir visit",
                    "Return to Sigiriya"
                ],
                accommodation: "Sigiriya boutique hotel",
                meals: "Breakfast, Lunch"
            },
            {
                day: 4,
                title: "Dambulla Cave Temple - Transfer to Kandy",
                description: "Visit the golden cave temple and journey to the hill capital.",
                activities: [
                    "Explore Dambulla Cave Temple complex",
                    "Visit spice garden in Matale",
                    "Scenic drive to Kandy",
                    "Evening walk around Kandy Lake",
                    "Check-in at Kandy hotel"
                ],
                accommodation: "Kandy city hotel",
                meals: "Breakfast, Dinner"
            },
            {
                day: 5,
                title: "Kandy City & Cultural Show",
                description: "Discover the sacred city and its cultural heritage.",
                activities: [
                    "Visit Temple of the Tooth Relic",
                    "Explore Kandy city market",
                    "Visit Royal Botanical Gardens, Peradeniya",
                    "Traditional Kandyan dance performance",
                    "Gem museum visit (optional)"
                ],
                accommodation: "Kandy city hotel",
                meals: "Breakfast, Lunch"
            },
            {
                day: 6,
                title: "Kandy to Colombo via Pinnawala",
                description: "Visit the elephant orphanage and return to Colombo.",
                activities: [
                    "Visit Pinnawala Elephant Orphanage",
                    "Watch elephants bathing in river",
                    "Drive to Colombo (3 hours)",
                    "Check-in at Colombo hotel",
                    "Evening shopping or leisure"
                ],
                accommodation: "Colombo city hotel",
                meals: "Breakfast"
            },
            {
                day: 7,
                title: "Colombo City Tour & Departure",
                description: "Explore the commercial capital before your departure.",
                activities: [
                    "Colombo city tour (temples, colonial buildings)",
                    "Visit Gangaramaya Temple",
                    "Shopping at Pettah Market or malls",
                    "Transfer to airport for departure"
                ],
                meals: "Breakfast"
            }
        ]
    },
    {
        id: 2,
        name: "Wildlife Safari Adventure",
        category: "Safari",
        days: 5,
        price: 749,
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200",
        images: [
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800",
            "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800",
            "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=800"
        ],
        description: "Experience Sri Lanka's incredible wildlife with leopard safaris in Yala, elephant encounters, and bird watching in pristine national parks.",
        included: {
            hotel: true,
            hotelDetails: "Safari lodges and eco-resorts",
            transport: true,
            transportDetails: "Private vehicle + 4x4 safari jeeps",
            guide: true,
            guideDetails: "Wildlife expert and safari tracker",
            meals: "All meals included",
            activities: "3 safari drives and all park fees"
        },
        highlights: [
            "Leopard tracking in Yala National Park",
            "Elephant safari at Udawalawe",
            "Bird watching at Bundala",
            "Beach safari experience",
            "Night wildlife spotting",
            "Photography opportunities"
        ],
        itinerary: [
            {
                day: 1,
                title: "Arrival - Transfer to Udawalawe",
                description: "Journey to the elephant capital of Sri Lanka.",
                activities: [
                    "Airport pickup",
                    "Drive to Udawalawe (4 hours)",
                    "Check-in at safari lodge",
                    "Afternoon elephant safari",
                    "Visit Elephant Transit Home"
                ],
                accommodation: "Udawalawe safari lodge",
                meals: "Lunch, Dinner"
            },
            {
                day: 2,
                title: "Udawalawe to Yala National Park",
                description: "Transfer to the leopard kingdom.",
                activities: [
                    "Morning safari at Udawalawe",
                    "Transfer to Yala (2 hours)",
                    "Check-in at Yala resort",
                    "Afternoon leopard safari",
                    "Sunset at the beach within park"
                ],
                accommodation: "Yala safari resort",
                meals: "Breakfast, Lunch, Dinner"
            },
            {
                day: 3,
                title: "Full Day Yala Safari",
                description: "Intensive wildlife tracking in leopard territory.",
                activities: [
                    "Early morning leopard safari (5:30 AM)",
                    "Return for breakfast",
                    "Leisure time at resort",
                    "Afternoon safari drive",
                    "Wildlife photography session"
                ],
                accommodation: "Yala safari resort",
                meals: "Breakfast, Lunch, Dinner"
            },
            {
                day: 4,
                title: "Bundala National Park & Beach",
                description: "Bird watching and coastal relaxation.",
                activities: [
                    "Morning safari at Bundala (flamingos & migratory birds)",
                    "Visit Hambantota beach",
                    "Lunch at beachside restaurant",
                    "Return to Yala",
                    "Evening at leisure"
                ],
                accommodation: "Yala safari resort",
                meals: "Breakfast, Lunch, Dinner"
            },
            {
                day: 5,
                title: "Yala to Colombo & Departure",
                description: "Final morning safari and departure.",
                activities: [
                    "Early morning safari (last chance for leopards!)",
                    "Breakfast and checkout",
                    "Drive to Colombo/Airport (5-6 hours)",
                    "Lunch en route",
                    "Airport drop-off"
                ],
                meals: "Breakfast, Lunch"
            }
        ]
    },
    {
        id: 3,
        name: "Tropical Beach Paradise",
        category: "Beach",
        days: 6,
        price: 699,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1200",
        images: [
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800",
            "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=800",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800"
        ],
        description: "Relax on pristine beaches, go whale watching in Mirissa, explore colonial Galle Fort, and enjoy water sports along Sri Lanka's stunning southern coast.",
        included: {
            hotel: true,
            hotelDetails: "Beachfront resorts and boutique hotels",
            transport: true,
            transportDetails: "Private air-conditioned vehicle",
            guide: true,
            guideDetails: "Local guide for excursions",
            meals: "Breakfast daily",
            activities: "Whale watching tour and Galle Fort tour included"
        },
        highlights: [
            "Whale watching in Mirissa",
            "Galle Fort exploration",
            "Snorkeling and diving",
            "Beach relaxation",
            "Fresh seafood dining",
            "Sunset at Coconut Tree Hill"
        ],
        itinerary: [
            {
                day: 1,
                title: "Arrival - Transfer to Bentota",
                description: "Begin your beach escape on the west coast.",
                activities: [
                    "Airport pickup",
                    "Transfer to Bentota (2 hours)",
                    "Check-in at beach resort",
                    "Afternoon beach relaxation",
                    "Welcome dinner"
                ],
                accommodation: "Bentota beach resort",
                meals: "Dinner"
            },
            {
                day: 2,
                title: "Bentota Water Sports & River Safari",
                description: "Adventure and relaxation by the water.",
                activities: [
                    "Morning water sports (jet ski, banana boat)",
                    "Madu River boat safari",
                    "Visit turtle hatchery",
                    "Afternoon at beach",
                    "Sunset cocktails"
                ],
                accommodation: "Bentota beach resort",
                meals: "Breakfast"
            },
            {
                day: 3,
                title: "Bentota to Mirissa via Galle",
                description: "Explore colonial heritage and move to the south coast.",
                activities: [
                    "Drive to Galle (2 hours)",
                    "Guided tour of Galle Fort",
                    "Lunch at fort restaurant",
                    "Continue to Mirissa",
                    "Check-in at beach hotel",
                    "Evening at Mirissa beach"
                ],
                accommodation: "Mirissa beach hotel",
                meals: "Breakfast, Lunch"
            },
            {
                day: 4,
                title: "Whale Watching & Coconut Tree Hill",
                description: "Marine life encounter and iconic sunset spot.",
                activities: [
                    "Early morning whale watching tour (6 AM)",
                    "Return for breakfast",
                    "Rest and beach time",
                    "Visit Secret Beach",
                    "Sunset at Coconut Tree Hill",
                    "Beachside seafood dinner"
                ],
                accommodation: "Mirissa beach hotel",
                meals: "Breakfast"
            },
            {
                day: 5,
                title: "Beach Day & Water Activities",
                description: "Full day of beach relaxation and activities.",
                activities: [
                    "Surfing lessons (optional)",
                    "Snorkeling trip",
                    "Beach volleyball",
                    "Spa treatment (optional)",
                    "Beach party in evening"
                ],
                accommodation: "Mirissa beach hotel",
                meals: "Breakfast"
            },
            {
                day: 6,
                title: "Mirissa to Colombo & Departure",
                description: "Final beach morning and departure.",
                activities: [
                    "Morning beach walk",
                    "Checkout and drive to Colombo (3-4 hours)",
                    "Optional Colombo shopping",
                    "Airport transfer"
                ],
                meals: "Breakfast"
            }
        ]
    },
    {
        id: 4,
        name: "Misty Hill Country Escape",
        category: "Hill Country",
        days: 5,
        price: 649,
        image: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200",
        images: [
            "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800",
            "https://images.unsplash.com/photo-1584646098378-0874589d76b1?q=80&w=800",
            "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=800"
        ],
        description: "Journey through misty mountains, lush tea plantations, and charming hill stations. Experience the world's most scenic train ride and hike to breathtaking viewpoints.",
        included: {
            hotel: true,
            hotelDetails: "Colonial-style hotels and tea estate bungalows",
            transport: true,
            transportDetails: "Private vehicle + scenic train journey",
            guide: true,
            guideDetails: "Mountain guide and tea expert",
            meals: "Breakfast and 2 dinners",
            activities: "Train tickets and tea factory tour included"
        },
        highlights: [
            "Scenic train ride Kandy to Ella",
            "Nine Arch Bridge",
            "Little Adam's Peak hike",
            "Tea plantation tours",
            "Horton Plains & World's End",
            "Gregory Lake boating"
        ],
        itinerary: [
            {
                day: 1,
                title: "Colombo to Kandy",
                description: "Journey to the hill capital.",
                activities: [
                    "Pickup from Colombo",
                    "Drive to Kandy (3 hours)",
                    "Visit Temple of the Tooth",
                    "Kandy Lake walk",
                    "Cultural dance show"
                ],
                accommodation: "Kandy heritage hotel",
                meals: "Dinner"
            },
            {
                day: 2,
                title: "Kandy to Nuwara Eliya",
                description: "Explore tea country.",
                activities: [
                    "Visit tea plantation and factory",
                    "Tea tasting experience",
                    "Drive to Nuwara Eliya",
                    "City tour of 'Little England'",
                    "Visit Victoria Park"
                ],
                accommodation: "Nuwara Eliya colonial hotel",
                meals: "Breakfast, Dinner"
            },
            {
                day: 3,
                title: "Horton Plains National Park",
                description: "Hike to World's End.",
                activities: [
                    "Early morning drive to Horton Plains",
                    "Hike to World's End viewpoint",
                    "Visit Baker's Falls",
                    "Wildlife spotting",
                    "Return to Nuwara Eliya",
                    "Evening at leisure"
                ],
                accommodation: "Nuwara Eliya colonial hotel",
                meals: "Breakfast"
            },
            {
                day: 4,
                title: "Scenic Train to Ella",
                description: "World's most beautiful train journey.",
                activities: [
                    "Board train to Ella (3 hours)",
                    "Scenic views of tea estates and mountains",
                    "Arrive in Ella",
                    "Check-in at hotel",
                    "Visit Nine Arch Bridge",
                    "Explore Ella town"
                ],
                accommodation: "Ella mountain hotel",
                meals: "Breakfast"
            },
            {
                day: 5,
                title: "Ella Exploration & Return",
                description: "Hike and departure.",
                activities: [
                    "Sunrise hike to Little Adam's Peak",
                    "Breakfast with mountain views",
                    "Optional: Ella Rock hike or Ravana Falls",
                    "Drive back to Colombo (6 hours)",
                    "Airport drop-off"
                ],
                meals: "Breakfast"
            }
        ]
    },
    {
        id: 5,
        name: "Adventure Seeker's Challenge",
        category: "Adventure",
        days: 8,
        price: 1099,
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200",
        images: [
            "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800",
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800"
        ],
        description: "For thrill-seekers! White water rafting, rock climbing, zip-lining, surfing, and hiking through Sri Lanka's most adventurous destinations.",
        included: {
            hotel: true,
            hotelDetails: "Adventure lodges and eco-camps",
            transport: true,
            transportDetails: "4x4 vehicles for rough terrain",
            guide: true,
            guideDetails: "Adventure sports instructors and safety gear",
            meals: "All meals included",
            activities: "All adventure activities and equipment"
        },
        highlights: [
            "White water rafting in Kitulgala",
            "Rock climbing at Ella Rock",
            "Zip-lining at Flying Ravana",
            "Surfing in Arugam Bay",
            "Camping in national parks",
            "Canyoning and waterfall rappelling"
        ],
        itinerary: [
            {
                day: 1,
                title: "Arrival - Kitulgala Rafting",
                description: "Start with adrenaline!",
                activities: [
                    "Airport pickup",
                    "Drive to Kitulgala (3 hours)",
                    "White water rafting on Kelani River",
                    "Jungle trekking",
                    "Overnight camping"
                ],
                accommodation: "Riverside camp",
                meals: "Lunch, Dinner"
            },
            {
                day: 2,
                title: "Canyoning & Waterfall Rappelling",
                description: "Conquer waterfalls.",
                activities: [
                    "Canyoning adventure",
                    "Waterfall rappelling",
                    "River bathing",
                    "Drive to Ella (4 hours)",
                    "Check-in at adventure lodge"
                ],
                accommodation: "Ella adventure lodge",
                meals: "Breakfast, Lunch, Dinner"
            },
            {
                day: 3,
                title: "Ella Rock Climbing & Zip-lining",
                description: "Mountain adventures.",
                activities: [
                    "Rock climbing at Ella Rock",
                    "Zip-lining at Flying Ravana",
                    "Visit Nine Arch Bridge",
                    "Mountain biking (optional)"
                ],
                accommodation: "Ella adventure lodge",
                meals: "Breakfast, Lunch, Dinner"
            },
            {
                day: 4,
                title: "Ella to Arugam Bay",
                description: "Journey to surf paradise.",
                activities: [
                    "Scenic drive to Arugam Bay (4 hours)",
                    "Check-in at surf camp",
                    "Afternoon surf lesson",
                    "Beach bonfire"
                ],
                accommodation: "Arugam Bay surf camp",
                meals: "Breakfast, Lunch, Dinner"
            },
            {
                day: 5,
                title: "Surfing & Beach Activities",
                description: "Ride the waves.",
                activities: [
                    "Morning surf session",
                    "Beach volleyball",
                    "Stand-up paddleboarding",
                    "Sunset surf",
                    "Beach party"
                ],
                accommodation: "Arugam Bay surf camp",
                meals: "Breakfast, Lunch, Dinner"
            },
            {
                day: 6,
                title: "Yala Safari Adventure",
                description: "Wildlife safari.",
                activities: [
                    "Drive to Yala (2 hours)",
                    "Full day safari",
                    "Leopard tracking",
                    "Beach safari",
                    "Camping near park"
                ],
                accommodation: "Safari camp",
                meals: "Breakfast, Lunch, Dinner"
            },
            {
                day: 7,
                title: "Coastal Kayaking & Snorkeling",
                description: "Marine adventures.",
                activities: [
                    "Sea kayaking",
                    "Snorkeling at coral reefs",
                    "Beach trekking",
                    "Sunset cliff jumping (safe spots)",
                    "Farewell dinner"
                ],
                accommodation: "Beach resort",
                meals: "Breakfast, Lunch, Dinner"
            },
            {
                day: 8,
                title: "Return to Colombo",
                description: "Journey back.",
                activities: [
                    "Morning beach walk",
                    "Drive to Colombo (6 hours)",
                    "Lunch en route",
                    "Airport transfer"
                ],
                meals: "Breakfast, Lunch"
            }
        ]
    },
    {
        id: 6,
        name: "Custom Private Tour",
        category: "Custom",
        days: 0, // Flexible
        price: 0, // Custom pricing
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200",
        images: [
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800",
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800"
        ],
        description: "Design your perfect Sri Lankan adventure! Choose your destinations, activities, accommodation level, and pace. Our experts will craft a personalized itinerary just for you.",
        included: {
            hotel: true,
            hotelDetails: "Your choice of accommodation (budget to luxury)",
            transport: true,
            transportDetails: "Private vehicle with dedicated driver",
            guide: true,
            guideDetails: "Expert guide in your preferred language",
            meals: "Customizable meal plans",
            activities: "All activities as per your interests"
        },
        highlights: [
            "Fully customizable itinerary",
            "Flexible duration (3-21 days)",
            "Choose your accommodation level",
            "Mix cultural, adventure, beach, wildlife",
            "Special interest tours (photography, yoga, ayurveda)",
            "Family-friendly or romantic options"
        ],
        itinerary: [
            {
                day: 1,
                title: "Your Journey Begins",
                description: "We'll design every day based on your preferences.",
                activities: [
                    "Tell us your interests",
                    "Choose your destinations",
                    "Select your pace (relaxed/moderate/active)",
                    "Pick accommodation style",
                    "We create your perfect itinerary"
                ]
            }
        ]
    }
];

export const getPackagesByCategory = (category: TourPackage["category"]) => {
    return tourPackages.filter(pkg => pkg.category === category);
};

export const getPackageById = (id: number) => {
    return tourPackages.find(pkg => pkg.id === id);
};
