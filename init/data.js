const samplePosts = [
  {
    title: "Luxury Beachfront Villa",
    description: "Relaxing stay with private infinity pool facing the ocean.",
    type: "amazing-pools",
    image: {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      filename: "listingimage"
    },
    price: 3500,
    location: "Goa",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [73.8567, 15.2993]
    }
  },
  {
    title: "Cosy Mountain Wooden Cabin",
    description: "Enjoy scenic valley views and pine forests right outside your window.",
    type: "mountains",
    image: {
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      filename: "listingimage"
    },
    price: 2800,
    location: "Manali, Himachal Pradesh",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.1887, 32.2432]
    }
  },
  {
    title: "Heritage Royal Fort Palace",
    description: "Experience royal living in a 200-year-old restored castle.",
    type: "castles",
    image: {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      filename: "listingimage"
    },
    price: 6500,
    location: "Jaipur, Rajasthan",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [75.7873, 26.9124]
    }
  },
  {
    title: "Modern Glass Dome Stay",
    description: "Stargaze under the open sky from your heated glass dome.",
    type: "domes",
    image: {
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
      filename: "listingimage"
    },
    price: 4200,
    location: "Srinagar, Jammu & Kashmir",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [74.7973, 34.0837]
    }
  },
  {
    title: "Riverside Luxury Tent Camping",
    description: "Camping next to the river with bonfire and outdoor activities.",
    type: "camping",
    image: {
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
      filename: "listingimage"
    },
    price: 1500,
    location: "Rishikesh, Uttarakhand",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [78.2676, 30.0869]
    }
  },
  {
    title: "Houseboat Experience on Backwaters",
    description: "Traditional wooden houseboat with modern amenities and scenic river tours.",
    type: "boats",
    image: {
      url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
      filename: "listingimage"
    },
    price: 5000,
    location: "Alleppey, Kerala",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [76.3388, 9.4981]
    }
  },
  {
    title: "Organic Village Farmhouse",
    description: "Peaceful stay amidst green fields with fresh farm-to-table food.",
    type: "farms",
    image: {
      url: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=800&q=80",
      filename: "listingimage"
    },
    price: 1800,
    location: "Amritsar, Punjab",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [74.8723, 31.6340]
    }
  },
  {
    title: "Snow Igloo & Arctic Stay",
    description: "Unique arctic cold stay surrounded by pure white snow landscapes.",
    type: "arctic",
    image: {
      url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
      filename: "listingimage"
    },
    price: 4800,
    location: "Gulmarg",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [74.3805, 34.0484]
    }
  },
  {
    title: "Penthouse Apartment in Downtown",
    description: "City skyline view with luxury interiors and easy metro access.",
    type: "iconic-cities",
    image: {
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      filename: "listingimage"
    },
    price: 4000,
    location: "South Mumbai, Maharashtra",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [72.8258, 18.9388]
    }
  },
  {
    title: "Trending Minimalist Studio Room",
    description: "Compact and aesthetic workspace-friendly room for digital nomads.",
    type: "rooms",
    image: {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      filename: "listingimage"
    },
    price: 2100,
    location: "Bangalore, Karnataka",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.5946, 12.9716]
    }
  }
];

module.exports = { data: samplePosts };