const expandedProducts = [
  // Electronics - Cameras
//   {
//     _id: "1",
//     name: "Canon EOS R5 Mirrorless Camera",
//     category: "cameras",
//     image: "https://images.unsplash.com/photo-1606980707986-8f6e1f0c1b1f?w=500",
//     description: "Professional 45MP full-frame mirrorless camera with 8K video recording",
//     price: 3899,
//     brand: "Canon",
//     rating: 4.9,
//     stock: 15
//   },
  {
    _id: "2",
    name: "Sony A7 IV Digital Camera",
    category: "cameras",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500",
    description: "33MP full-frame camera with advanced autofocus and 4K 60p video",
    price: 2498,
    brand: "Sony",
    rating: 4.8,
    stock: 20
  },

  // Electronics - TVs
  {
    _id: "3",
    name: "Samsung 65\" QLED 4K Smart TV",
    category: "tvs",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
    description: "Quantum Dot technology with HDR10+ and smart features",
    price: 1299,
    brand: "Samsung",
    rating: 4.7,
    stock: 30
  },
  {
    _id: "4",
    name: "LG 77\" OLED 4K Smart TV",
    category: "tvs",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500",
    description: "Self-lit OLED pixels with perfect blacks and infinite contrast",
    price: 3499,
    brand: "LG",
    rating: 4.9,
    stock: 12
  },

  // Electronics - Headphones
  {
    _id: "5",
    name: "Sony WH-1000XM5 Wireless Headphones",
    category: "headphones",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
    description: "Industry-leading noise cancellation with premium sound quality",
    price: 399,
    brand: "Sony",
    rating: 4.8,
    stock: 50
  },
//   {
//     _id: "6",
//     name: "Apple AirPods Max",
//     category: "headphones",
//     image: "https://images.unsplash.com/photo-1625738183058-6e6c8c6e0d1e?w=500",
//     description: "High-fidelity audio with active noise cancellation",
//     price: 549,
//     brand: "Apple",
//     rating: 4.6,
//     stock: 35
//   },

  // Electronics - Gaming Consoles
  {
    _id: "7",
    name: "PlayStation 5 Console",
    category: "consoles",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
    description: "Next-gen gaming with ultra-high speed SSD and ray tracing",
    price: 499,
    brand: "Sony",
    rating: 4.9,
    stock: 25
  },
  {
    _id: "8",
    name: "Xbox Series X",
    category: "consoles",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500",
    description: "Most powerful Xbox ever with 4K gaming at 120fps",
    price: 499,
    brand: "Microsoft",
    rating: 4.8,
    stock: 28
  },

  // Electronics - Smart Watches
  {
    _id: "9",
    name: "Apple Watch Series 9",
    category: "smart-watches",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
    description: "Advanced health features with always-on Retina display",
    price: 429,
    brand: "Apple",
    rating: 4.8,
    stock: 45
  },
  {
    _id: "10",
    name: "Samsung Galaxy Watch 6",
    category: "smart-watches",
    image: "https://images.unsplash.com/photo-1617625802912-cde586faf331?w=500",
    description: "Comprehensive health tracking with sleek design",
    price: 349,
    brand: "Samsung",
    rating: 4.6,
    stock: 40
  },

  // Fashion - Shoes
  {
    _id: "11",
    name: "Nike Air Max 270",
    category: "shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    description: "Iconic sneakers with Max Air cushioning for all-day comfort",
    price: 150,
    brand: "Nike",
    rating: 4.7,
    stock: 100
  },
  {
    _id: "12",
    name: "Adidas Ultraboost 22",
    category: "shoes",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
    description: "Premium running shoes with responsive Boost cushioning",
    price: 190,
    brand: "Adidas",
    rating: 4.8,
    stock: 85
  },
  {
    _id: "13",
    name: "Converse Chuck Taylor All Star",
    category: "shoes",
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500",
    description: "Classic canvas sneakers with timeless style",
    price: 65,
    brand: "Converse",
    rating: 4.5,
    stock: 120
  },

  // Fashion - Bags
  {
    _id: "14",
    name: "Herschel Little America Backpack",
    category: "bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    description: "Classic mountaineering style backpack with laptop sleeve",
    price: 110,
    brand: "Herschel",
    rating: 4.6,
    stock: 60
  },
  {
    _id: "15",
    name: "Fjallraven Kanken Classic",
    category: "bags",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500",
    description: "Iconic Swedish backpack with durable Vinylon F fabric",
    price: 85,
    brand: "Fjallraven",
    rating: 4.7,
    stock: 75
  },
  {
    _id: "16",
    name: "Samsonite Pro Business Briefcase",
    category: "bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500",
    description: "Professional leather briefcase with laptop compartment",
    price: 199,
    brand: "Samsonite",
    rating: 4.8,
    stock: 40
  },

  // Computers & Laptops
  {
    _id: "17",
    name: "MacBook Pro 16\" M3 Max",
    category: "computers",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    description: "Powerful laptop with M3 Max chip and stunning Liquid Retina XDR display",
    price: 3499,
    brand: "Apple",
    rating: 4.9,
    stock: 18
  },
  {
    _id: "18",
    name: "Dell XPS 15 Laptop",
    category: "computers",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
    description: "Premium Windows laptop with InfinityEdge display",
    price: 1899,
    brand: "Dell",
    rating: 4.7,
    stock: 25
  },
  {
    _id: "19",
    name: "ASUS ROG Gaming Desktop",
    category: "computers",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500",
    description: "High-performance gaming PC with RTX 4080 and RGB lighting",
    price: 2499,
    brand: "ASUS",
    rating: 4.8,
    stock: 15
  },

  
  // Smartphones
//   {
//     _id: "20",
//     name: "iPhone 15 Pro Max",
//     category: "smartphones",
//     image: "https://images.unsplash.com/photo-1592286927505-2fd0f3a1f3b1?w=500",
//     description: "Titanium design with A17 Pro chip and advanced camera system",
//     price: 1199,
//     brand: "Apple",
//     rating: 4.9,
//     stock: 50
//   },
  {
    _id: "21",
    name: "Samsung Galaxy S24 Ultra",
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
    description: "Flagship Android phone with S Pen and 200MP camera",
    price: 1299,
    brand: "Samsung",
    rating: 4.8,
    stock: 45
  },
  {
    _id: "22",
    name: "Google Pixel 8 Pro",
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
    description: "AI-powered photography with pure Android experience",
    price: 999,
    brand: "Google",
    rating: 4.7,
    stock: 40
  },

  // More Shoes
  {
    _id: "23",
    name: "Puma RS-X Sneakers",
    category: "shoes",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
    description: "Retro-inspired running shoes with bold design",
    price: 110,
    brand: "Puma",
    rating: 4.5,
    stock: 90
  },
  {
    _id: "24",
    name: "New Balance 990v5",
    category: "shoes",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500",
    description: "Premium made in USA sneakers with superior comfort",
    price: 185,
    brand: "New Balance",
    rating: 4.8,
    stock: 70
  },
  {
    _id: "25",
    name: "Vans Old Skool",
    category: "shoes",
    image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500",
    description: "Classic skate shoes with iconic side stripe",
    price: 70,
    brand: "Vans",
    rating: 4.6,
    stock: 110
  },
  {
    _id: "26",
    name: "Reebok Classic Leather",
    category: "shoes",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
    description: "Timeless leather sneakers with clean silhouette",
    price: 75,
    brand: "Reebok",
    rating: 4.5,
    stock: 95
  },
  {
    _id: "27",
    name: "Under Armour HOVR Phantom 3",
    category: "shoes",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500",
    description: "Connected running shoes with energy return",
    price: 140,
    brand: "Under Armour",
    rating: 4.6,
    stock: 65
  },
  {
    _id: "28",
    name: "Timberland 6-Inch Premium Boots",
    category: "shoes",
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500",
    description: "Iconic waterproof leather boots",
    price: 198,
    brand: "Timberland",
    rating: 4.7,
    stock: 55
  },

  // More Bags
  {
    _id: "29",
    name: "The North Face Borealis Backpack",
    category: "bags",
    image: "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=500",
    description: "Versatile daypack with FlexVent suspension system",
    price: 99,
    brand: "The North Face",
    rating: 4.7,
    stock: 80
  },
  {
    _id: "30",
    name: "Tumi Alpha Bravo Backpack",
    category: "bags",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500",
    description: "Premium business backpack with ballistic nylon",
    price: 295,
    brand: "Tumi",
    rating: 4.8,
    stock: 35
  },
  {
    _id: "31",
    name: "Osprey Daylite Plus",
    category: "bags",
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=500",
    description: "Lightweight daypack perfect for hiking and travel",
    price: 65,
    brand: "Osprey",
    rating: 4.6,
    stock: 70
  },
  {
    _id: "32",
    name: "Michael Kors Jet Set Tote",
    category: "bags",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    description: "Elegant leather tote bag for everyday use",
    price: 298,
    brand: "Michael Kors",
    rating: 4.7,
    stock: 45
  },
  {
    _id: "33",
    name: "Patagonia Black Hole Duffel 55L",
    category: "bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    description: "Weather-resistant duffel for adventure travel",
    price: 149,
    brand: "Patagonia",
    rating: 4.8,
    stock: 50
  },
  {
    _id: "34",
    name: "Coach Leather Messenger Bag",
    category: "bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
    description: "Sophisticated leather messenger with multiple compartments",
    price: 395,
    brand: "Coach",
    rating: 4.7,
    stock: 30
  },

  // More Computers & Tablets
//   {
//     _id: "35",
//     name: "Microsoft Surface Laptop 5",
//     category: "computers",
//     image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
//     description: "Sleek Windows laptop with PixelSense touchscreen",
//     price: 1299,
//     brand: "Microsoft",
//     rating: 4.6,
//     stock: 30
//   },
  {
    _id: "36",
    name: "HP Spectre x360 2-in-1",
    category: "computers",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    description: "Convertible laptop with gem-cut design",
    price: 1499,
    brand: "HP",
    rating: 4.7,
    stock: 25
  },
  {
    _id: "37",
    name: "Lenovo ThinkPad X1 Carbon",
    category: "computers",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
    description: "Business ultrabook with legendary keyboard",
    price: 1799,
    brand: "Lenovo",
    rating: 4.8,
    stock: 28
  },
  {
    _id: "38",
    name: "iPad Pro 12.9\" M2",
    category: "tablets",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    description: "Ultimate iPad with M2 chip and Liquid Retina XDR display",
    price: 1099,
    brand: "Apple",
    rating: 4.9,
    stock: 40
  },
  {
    _id: "39",
    name: "Samsung Galaxy Tab S9 Ultra",
    category: "tablets",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500",
    description: "Premium Android tablet with S Pen included",
    price: 1199,
    brand: "Samsung",
    rating: 4.7,
    stock: 35
  },
  // {
  //   _id: "40",
  //   name: "Microsoft Surface Pro 9",
  //   category: "tablets",
  //   image: "https://images.unsplash.com/photo-1585789575762-9873d92e4b7f?w=500",
  //   description: "Versatile 2-in-1 tablet with laptop performance",
  //   price: 999,
  //   brand: "Microsoft",
  //   rating: 4.6,
  //   stock: 32
  // },

  // Home Appliances
  {
    _id: "41",
    name: "Dyson V15 Detect Vacuum",
    category: "appliances",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500",
    description: "Cordless vacuum with laser dust detection",
    price: 749,
    brand: "Dyson",
    rating: 4.8,
    stock: 25
  },
  {
    _id: "42",
    name: "Ninja Foodi Air Fryer",
    category: "appliances",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500",
    description: "Multi-function air fryer with pressure cooking",
    price: 199,
    brand: "Ninja",
    rating: 4.7,
    stock: 45
  },
  {
    _id: "43",
    name: "Keurig K-Elite Coffee Maker",
    category: "appliances",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
    description: "Single-serve coffee maker with iced coffee setting",
    price: 169,
    brand: "Keurig",
    rating: 4.6,
    stock: 50
  },
  {
    _id: "44",
    name: "iRobot Roomba j7+",
    category: "appliances",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500",
    description: "Smart robot vacuum with automatic dirt disposal",
    price: 799,
    brand: "iRobot",
    rating: 4.7,
    stock: 30
  },

  // Audio Equipment
  {
    _id: "45",
    name: "Bose SoundLink Revolve+",
    category: "speakers",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    description: "Portable Bluetooth speaker with 360-degree sound",
    price: 329,
    brand: "Bose",
    rating: 4.7,
    stock: 55
  },
  {
    _id: "46",
    name: "JBL Flip 6 Portable Speaker",
    category: "speakers",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    description: "Waterproof Bluetooth speaker with powerful bass",
    price: 129,
    brand: "JBL",
    rating: 4.6,
    stock: 70
  },
  {
    _id: "47",
    name: "Sonos One Smart Speaker",
    category: "speakers",
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500",
    description: "Smart speaker with Alexa and rich sound",
    price: 219,
    brand: "Sonos",
    rating: 4.8,
    stock: 40
  },
  {
    _id: "48",
    name: "Beats Studio Buds+",
    category: "headphones",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    description: "True wireless earbuds with active noise cancelling",
    price: 169,
    brand: "Beats",
    rating: 4.5,
    stock: 80
  },

  // Fitness & Sports
  {
    _id: "49",
    name: "Fitbit Charge 6",
    category: "fitness",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500",
    description: "Advanced fitness tracker with built-in GPS",
    price: 159,
    brand: "Fitbit",
    rating: 4.6,
    stock: 60
  },
  {
    _id: "50",
    name: "Garmin Forerunner 265",
    category: "fitness",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500",
    description: "GPS running watch with AMOLED display",
    price: 449,
    brand: "Garmin",
    rating: 4.8,
    stock: 35
  },
  {
    _id: "51",
    name: "Bowflex SelectTech Dumbbells",
    category: "fitness",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500",
    description: "Adjustable dumbbells replacing 15 sets of weights",
    price: 549,
    brand: "Bowflex",
    rating: 4.7,
    stock: 20
  },
  {
    _id: "52",
    name: "Peloton Bike+",
    category: "fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500",
    description: "Premium exercise bike with rotating HD touchscreen",
    price: 2495,
    brand: "Peloton",
    rating: 4.8,
    stock: 15
  },

  // Gaming Accessories
  {
    _id: "53",
    name: "Razer BlackWidow V4 Keyboard",
    category: "gaming",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    description: "Mechanical gaming keyboard with RGB lighting",
    price: 229,
    brand: "Razer",
    rating: 4.7,
    stock: 45
  },
  {
    _id: "54",
    name: "Logitech G Pro X Superlight",
    category: "gaming",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    description: "Ultra-lightweight wireless gaming mouse",
    price: 159,
    brand: "Logitech",
    rating: 4.8,
    stock: 55
  },
  {
    _id: "55",
    name: "SteelSeries Arctis Nova Pro",
    category: "gaming",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500",
    description: "Premium gaming headset with active noise cancellation",
    price: 349,
    brand: "SteelSeries",
    rating: 4.7,
    stock: 40
  },

  // Cameras & Photography
//   {
//     _id: "56",
//     name: "Nikon Z8 Mirrorless Camera",
//     category: "cameras",
//     image: "https://images.unsplas/photo-1516035069371-29a1b244cc32?w=500",
//     description: "45.7MP full-frame camera with 8K video",
//     price: 3999,
//     brand: "Nikon",
//     rating: 4.9,
//     stock: 12
//   },
//   {
//     _id: "57",
//     name: "Fujifilm X-T5",
//     category: "cameras",
//     image: "https://images.unsplash.com/photo-1606980707986-8f6e1f0c1b1f?w=500",
//     description: "40MP APS-C camera with classic design",
//     price: 1699,
//     brand: "Fujifilm",
//     rating: 4.8,
//     stock: 18
//   },
//   {
//     _id: "58",
//     name: "GoPro HERO12 Black",
//     category: "cameras",
//     image: "https://images.unsplash.com/photo-1606941369985-d0c5b2e8e3e3?w=500",
//     description: "Waterproof action camera with 5.3K video",
//     price: 399,
//     brand: "GoPro",
//     rating: 4.7,
//     stock: 50
//   },
  {
    _id: "59",
    name: "DJI Mini 4 Pro Drone",
    category: "cameras",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
    description: "Compact drone with 4K HDR video and obstacle avoidance",
    price: 759,
    brand: "DJI",
    rating: 4.8,
    stock: 25
  },

  // Office & Productivity
  {
    _id: "60",
    name: "Herman Miller Aeron Chair",
    category: "office",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500",
    description: "Ergonomic office chair with PostureFit support",
    price: 1395,
    brand: "Herman Miller",
    rating: 4.9,
    stock: 15
  },
  {
    _id: "61",
    name: "LG UltraWide 34\" Monitor",
    category: "monitors",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
    description: "34-inch curved ultrawide monitor with QHD resolution",
    price: 499,
    brand: "LG",
    rating: 4.7,
    stock: 35
  },
  {
    _id: "62",
    name: "Dell UltraSharp 27\" 4K Monitor",
    category: "monitors",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
    description: "Professional 4K monitor with USB-C connectivity",
    price: 649,
    brand: "Dell",
    rating: 4.8,
    stock: 40
  },
  {
    _id: "63",
    name: "Logitech MX Master 3S Mouse",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    description: "Advanced wireless mouse for productivity",
    price: 99,
    brand: "Logitech",
    rating: 4.8,
    stock: 75
  },
  {
    _id: "64",
    name: "Keychron K8 Pro Keyboard",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    description: "Wireless mechanical keyboard with hot-swappable switches",
    price: 109,
    brand: "Keychron",
    rating: 4.7,
    stock: 60
  },

  // Smart Home
  {
    _id: "65",
    name: "Amazon Echo Dot 5th Gen",
    category: "smart-home",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500",
    description: "Compact smart speaker with Alexa",
    price: 49,
    brand: "Amazon",
    rating: 4.6,
    stock: 100
  },
//   {
//     _id: "66",
//     name: "Google Nest Hub Max",
//     category: "smart-home",
//     image: "https://images.unsplash.com/photo-1558089687-e1c6e5b1e8e1?w=500",
//     description: "Smart display with Google Assistant and camera",
//     price: 229,
//     brand: "Google",
//     rating: 4.7,
//     stock: 45
//   },
  {
    _id: "67",
    name: "Philips Hue Starter Kit",
    category: "smart-home",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
    description: "Smart lighting system with color-changing bulbs",
    price: 199,
    brand: "Philips",
    rating: 4.7,
    stock: 50
  },
  {
    _id: "68",
    name: "Ring Video Doorbell Pro 2",
    category: "smart-home",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
    description: "Smart doorbell with 1536p HD video and 3D motion detection",
    price: 249,
    brand: "Ring",
    rating: 4.6,
    stock: 40
  },

  // Fashion Accessories
  {
    _id: "69",
    name: "Ray-Ban Aviator Sunglasses",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    description: "Classic aviator sunglasses with UV protection",
    price: 154,
    brand: "Ray-Ban",
    rating: 4.8,
    stock: 85
  },
  {
    _id: "70",
    name: "Fossil Gen 6 Smartwatch",
    category: "smart-watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    description: "Stylish Wear OS smartwatch with health tracking",
    price: 299,
    brand: "Fossil",
    rating: 4.5,
    stock: 50
  },
  {
    _id: "71",
    name: "Bellroy Slim Sleeve Wallet",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    description: "Premium leather slim wallet with RFID protection",
    price: 99,
    brand: "Bellroy",
    rating: 4.7,
    stock: 70
  },
  {
    _id: "72",
    name: "Oakley Flak 2.0 XL Sports Sunglasses",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    description: "Performance sunglasses for sports and outdoor activities",
    price: 173,
    brand: "Oakley",
    rating: 4.7,
    stock: 60
  },

  // Storage & External Drives
  {
    _id: "73",
    name: "Samsung T7 Portable SSD 2TB",
    category: "storage",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500",
    description: "Fast portable SSD with USB 3.2 Gen 2",
    price: 199,
    brand: "Samsung",
    rating: 4.8,
    stock: 65
  },
  {
    _id: "74",
    name: "WD My Passport 5TB External HDD",
    category: "storage",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500",
    description: "Portable external hard drive with password protection",
    price: 129,
    brand: "Western Digital",
    rating: 4.6,
    stock: 70
  },
  {
    _id: "75",
    name: "SanDisk Extreme PRO SD Card 128GB",
    category: "storage",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500",
    description: "High-speed SD card for 4K video recording",
    price: 39,
    brand: "SanDisk",
    rating: 4.8,
    stock: 120
  }
];

module.exports = expandedProducts;