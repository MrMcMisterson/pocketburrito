export const lightTierGames = [
  {
    name: "Terraria",
    slug: "terraria",
    maxPlayers: 10,
    price: 11.99,
    ram: "2GB",
    description: "Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game.",
    features: ["Mod support", "Daily backups", "Easy world management"],
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
    category: "light"
  },
  {
    name: "Factorio",
    slug: "factorio",
    maxPlayers: 10,
    price: 12.99,
    ram: "4GB",
    description: "Build and maintain factories in an infinite 2D world. Mine resources, research technologies, and automate production.",
    features: ["Save backups", "Mod support", "Performance optimized"],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    category: "light"
  },
  {
    name: "Core Keeper",
    slug: "core-keeper",
    maxPlayers: 8,
    price: 12.99,
    ram: "3GB",
    description: "Explore an endless underground cavern. Mine relics, craft items, and fight creatures in this multiplayer sandbox.",
    features: ["Auto-save enabled", "Easy invite system", "Persistent worlds"],
    imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80",
    category: "light"
  },
  {
    name: "Necesse",
    slug: "necesse",
    maxPlayers: 10,
    price: 12.99,
    ram: "3GB",
    description: "Top-down sandbox action-adventure with tower defense elements. Build your settlement and defend it.",
    features: ["24/7 uptime", "Instant setup", "Mod ready"],
    imageUrl: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&q=80",
    category: "light"
  },
  {
    name: "Abiotic Factor",
    slug: "abiotic-factor",
    maxPlayers: 10,
    price: 12.99,
    ram: "4GB",
    description: "Survive and thrive in a mysterious underground facility. Cooperative survival crafting at its finest.",
    features: ["Quick server setup", "Save management", "DDoS protection"],
    imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    category: "light"
  },
  {
    name: "Vintage Story",
    slug: "vintage-story",
    maxPlayers: 10,
    price: 12.99,
    ram: "3GB",
    description: "Uncompromising wilderness survival sandbox with a deep crafting system and realistic world simulation.",
    features: ["World customization", "Regular backups", "Mod support"],
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    category: "light"
  },
  {
    name: "Voyagers of Nera",
    slug: "voyagers-of-nera",
    maxPlayers: 10,
    price: 12.99,
    ram: "4GB",
    description: "Cooperative survival crafting game set in a vibrant alien world. Explore, build, and survive together.",
    features: ["Easy configuration", "Performance optimized", "24/7 support"],
    imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
    category: "light"
  }
];

export const mediumTierGames = [
  {
    name: "Valheim",
    slug: "valheim",
    maxPlayers: 10,
    price: 14.49,
    ram: "6GB",
    description: "Brutal exploration and survival game for 1-10 players. Battle, build, and conquer your way to a saga worthy of Odin's patronage.",
    features: ["Dedicated server", "World saves", "Boss progression tracking"],
    imageUrl: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=800&q=80",
    category: "medium",
    tiers: [
      { players: 10, ram: "6GB", price: 14.49 }
    ]
  },
  {
    name: "Minecraft",
    slug: "minecraft",
    description: "The ultimate sandbox game. Build, explore, and survive in infinite procedurally generated worlds.",
    features: ["Paper/Spigot/Fabric support", "Plugin installation", "World management", "Whitelist control"],
    imageUrl: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&q=80",
    category: "medium",
    tiers: [
      { players: "Unlimited", ram: "3GB", price: 6.99 },
      { players: "Unlimited", ram: "6GB", price: 12.99 },
      { players: "Unlimited", ram: "8GB", price: 16.99 },
      { players: "Unlimited", ram: "16GB", price: 32.99 }
    ]
  },
  {
    name: "V Rising",
    slug: "v-rising",
    maxPlayers: 10,
    price: 26.00,
    ram: "8GB",
    description: "Awaken as a vampire. Hunt for blood, build your castle, and convert humans into your loyal servants.",
    features: ["Castle persistence", "PvP/PvE modes", "Clan support"],
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80",
    category: "medium",
    tiers: [
      { players: 10, ram: "8GB", price: 26.00 }
    ]
  },
  {
    name: "Enshrouded",
    slug: "enshrouded",
    description: "Survive the Shroud and build in a voxel-based fallen kingdom. Action RPG meets survival crafting.",
    features: ["Voxel building", "Co-op quests", "Character progression saves"],
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    category: "medium",
    tiers: [
      { players: 4, ram: "4GB", price: 8.99 },
      { players: 8, ram: "6GB", price: 12.99 },
      { players: 12, ram: "8GB", price: 14.99 },
      { players: 16, ram: "10GB", price: 16.99 }
    ]
  },
  {
    name: "ECO",
    slug: "eco",
    description: "Build a civilization while preventing a meteor from destroying the world. Balance progress with environmental impact.",
    features: ["Government system", "Economy tracking", "Meteor countdown"],
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    category: "medium",
    tiers: [
      { players: 4, ram: "4GB", price: 6.99 },
      { players: 8, ram: "6GB", price: 12.99 },
      { players: 16, ram: "8GB", price: 16.99 },
      { players: 64, ram: "16GB", price: 32.99 }
    ]
  },
  {
    name: "Garry's Mod",
    slug: "garrys-mod",
    description: "Physics sandbox with endless possibilities. Create contraptions, play game modes, and mod everything.",
    features: ["Workshop support", "Game mode switching", "Custom content"],
    imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
    category: "medium",
    tiers: [
      { players: 4, ram: "2GB", price: 6.99 },
      { players: 8, ram: "4GB", price: 12.99 },
      { players: 16, ram: "6GB", price: 16.99 },
      { players: 32, ram: "8GB", price: 32.99 }
    ]
  },
  {
    name: "Hytale",
    slug: "hytale",
    description: "Block-based sandbox RPG. Adventure through procedurally generated worlds with deep modding support.",
    features: ["Mod support ready", "Adventure mode", "Creative building"],
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    category: "medium",
    tiers: [
      { players: "6-10", ram: "3GB", price: 6.99 },
      { players: "6-10", ram: "6GB", price: 12.99 },
      { players: "6-10", ram: "8GB", price: 16.99 },
      { players: "6-10", ram: "16GB", price: 32.99 }
    ]
  },
  {
    name: "Sons of the Forest",
    slug: "sons-of-the-forest",
    description: "Survive on a mysterious island filled with cannibals. Build, craft, and uncover dark secrets.",
    features: ["Co-op survival", "Base building saves", "Season system"],
    imageUrl: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&q=80",
    category: "medium",
    tiers: [
      { players: 4, ram: "6GB", price: 6.99 },
      { players: 8, ram: "8GB", price: 12.99 },
      { players: 16, ram: "12GB", price: 16.99 },
      { players: 32, ram: "16GB", price: 32.99 }
    ]
  }
];

export const allGames = [...lightTierGames, ...mediumTierGames];
