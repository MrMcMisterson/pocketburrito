export interface GameTier {
  players: number | string;
  ram: string;
  price: number;
}

export interface Game {
  name: string;
  slug: string;
  description: string;
  features: string[];
  imageUrl: string;
  category: "survival" | "sandbox" | "rpg";
  maxPlayers?: number;
  price?: number;
  ram?: string;
  tiers?: GameTier[];
}

export const survivalGames: Game[] = [
  {
    name: "Minecraft",
    slug: "minecraft",
    description: "The ultimate sandbox game. Build, explore, and survive in infinite procedurally generated worlds.",
    features: ["Paper/Spigot/Fabric support", "Plugin installation", "World management", "Whitelist control"],
    imageUrl: "/images/games/minecraft.jpg",
    category: "sandbox",
    tiers: [
      { players: "Unlimited", ram: "3GB", price: 6.99 },
      { players: "Unlimited", ram: "6GB", price: 12.99 },
      { players: "Unlimited", ram: "8GB", price: 16.99 },
      { players: "Unlimited", ram: "12GB", price: 24.99 },
      { players: "Unlimited", ram: "16GB", price: 32.99 }
    ]
  },
  {
    name: "Valheim",
    slug: "valheim",
    description: "Brutal exploration and survival game for 1-10 players. Battle, build, and conquer your way to a saga worthy of Odin's patronage.",
    features: ["Dedicated server", "World saves", "Boss progression tracking"],
    imageUrl: "/images/games/valheim.jpg",
    category: "survival",
    maxPlayers: 10,
    tiers: [
      { players: 10, ram: "6GB", price: 14.99 }
    ]
  },
  {
    name: "Palworld",
    slug: "palworld",
    description: "Catch, battle, and work alongside mysterious creatures called Pals in this open-world survival crafting game.",
    features: ["Pal management", "Base building", "Co-op survival"],
    imageUrl: "/images/games/palworld.jpg",
    category: "survival",
    tiers: [
      { players: 4, ram: "4GB", price: 6.99 },
      { players: 8, ram: "6GB", price: 12.99 },
      { players: 16, ram: "8GB", price: 16.99 },
      { players: 32, ram: "12GB", price: 24.99 }
    ]
  },
  {
    name: "Project Zomboid",
    slug: "project-zomboid",
    description: "The ultimate zombie survival RPG. Loot, build, craft, farm, and fight to survive in a harsh post-apocalyptic world.",
    features: ["Mod support", "Persistent world", "Vehicle system"],
    imageUrl: "/images/games/project-zomboid.jpg",
    category: "survival",
    tiers: [
      { players: 4, ram: "3GB", price: 6.99 },
      { players: 8, ram: "4GB", price: 12.99 },
      { players: 16, ram: "6GB", price: 16.99 },
      { players: 32, ram: "8GB", price: 24.99 }
    ]
  },
  {
    name: "Enshrouded",
    slug: "enshrouded",
    description: "Survive the Shroud and build in a voxel-based fallen kingdom. Action RPG meets survival crafting.",
    features: ["Voxel building", "Co-op quests", "Character progression saves"],
    imageUrl: "/images/games/enshrouded.jpg",
    category: "rpg",
    tiers: [
      { players: 4, ram: "4GB", price: 8.99 },
      { players: 8, ram: "6GB", price: 12.99 },
      { players: 12, ram: "8GB", price: 14.99 },
      { players: 16, ram: "10GB", price: 16.99 }
    ]
  },
  {
    name: "7 Days to Die",
    slug: "7-days-to-die",
    description: "Survive the zombie apocalypse with crafting, building, and exploration in a post-apocalyptic open world.",
    features: ["Horde nights", "Base building", "Crafting system"],
    imageUrl: "/images/games/7-days-to-die.jpg",
    category: "survival",
    tiers: [
      { players: 12, ram: "6GB", price: 12.99 },
      { players: 16, ram: "8GB", price: 16.99 },
      { players: 64, ram: "16GB", price: 32.99 }
    ]
  },
  {
    name: "Sons of the Forest",
    slug: "sons-of-the-forest",
    description: "Survive on a mysterious island filled with cannibals. Build, craft, and uncover dark secrets.",
    features: ["Co-op survival", "Base building saves", "Season system"],
    imageUrl: "/images/games/sons-of-the-forest.jpg",
    category: "survival",
    tiers: [
      { players: 4, ram: "6GB", price: 6.99 },
      { players: 8, ram: "8GB", price: 12.99 },
      { players: 16, ram: "12GB", price: 16.99 }
    ]
  },
  {
    name: "Rust",
    slug: "rust",
    description: "The only aim in Rust is to survive. Overcome struggles such as hunger, thirst, and cold. Build a shelter. Kill animals for food.",
    features: ["Full wipe control", "Plugin support", "RCON access"],
    imageUrl: "/images/games/rust.jpg",
    category: "survival",
    tiers: [
      { players: 25, ram: "6GB", price: 12.99 },
      { players: 50, ram: "8GB", price: 16.99 },
      { players: 100, ram: "16GB", price: 32.99 }
    ]
  },
  {
    name: "ARK: Survival Evolved",
    slug: "ark-survival-evolved",
    description: "Tame dinosaurs, craft tools, and build shelters to survive on a mysterious island full of prehistoric creatures.",
    features: ["Dino taming", "Tribe system", "Mod support"],
    imageUrl: "/images/games/ark.jpg",
    category: "survival",
    tiers: [
      { players: 8, ram: "6GB", price: 12.99 },
      { players: 16, ram: "8GB", price: 16.99 },
      { players: 64, ram: "16GB", price: 32.99 }
    ]
  },
  {
    name: "V Rising",
    slug: "v-rising",
    description: "Awaken as a vampire. Hunt for blood, build your castle, and convert humans into your loyal servants.",
    features: ["Castle persistence", "PvP/PvE modes", "Clan support"],
    imageUrl: "/images/games/v-rising.jpg",
    category: "rpg",
    tiers: [
      { players: 10, ram: "6GB", price: 12.99 },
      { players: 40, ram: "8GB", price: 16.99 }
    ]
  }
];

export const sandboxGames: Game[] = [
  {
    name: "Terraria",
    slug: "terraria",
    description: "Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game.",
    features: ["Mod support", "Daily backups", "Easy world management"],
    imageUrl: "/images/games/terraria.jpg",
    category: "sandbox",
    tiers: [
      { players: 4, ram: "2GB", price: 6.99 },
      { players: 8, ram: "3GB", price: 12.99 },
      { players: 16, ram: "4GB", price: 16.99 }
    ]
  },
  {
    name: "Satisfactory",
    slug: "satisfactory",
    description: "Build massive factories, automate production, and explore an alien planet in this first-person factory building game.",
    features: ["Factory building", "Multiplayer co-op", "Exploration"],
    imageUrl: "/images/games/satisfactory.jpg",
    category: "sandbox",
    tiers: [
      { players: 8, ram: "6GB", price: 12.99 },
      { players: 16, ram: "8GB", price: 16.99 }
    ]
  },
  {
    name: "Factorio",
    slug: "factorio",
    description: "Build and maintain factories in an infinite 2D world. Mine resources, research technologies, and automate production.",
    features: ["Save backups", "Mod support", "Performance optimized"],
    imageUrl: "/images/games/factorio.jpg",
    category: "sandbox",
    tiers: [
      { players: 4, ram: "3GB", price: 6.99 },
      { players: 8, ram: "4GB", price: 12.99 },
      { players: 16, ram: "6GB", price: 16.99 }
    ]
  },
  {
    name: "Core Keeper",
    slug: "core-keeper",
    description: "Explore an endless underground cavern. Mine relics, craft items, and fight creatures in this multiplayer sandbox.",
    features: ["Auto-save enabled", "Easy invite system", "Persistent worlds"],
    imageUrl: "/images/games/core-keeper.jpg",
    category: "sandbox",
    tiers: [
      { players: 4, ram: "3GB", price: 6.99 },
      { players: 8, ram: "4GB", price: 11.99 }
    ]
  },
  {
    name: "ECO",
    slug: "eco",
    description: "Build a civilization while preventing a meteor from destroying the world. Balance progress with environmental impact.",
    features: ["Government system", "Economy tracking", "Meteor countdown"],
    imageUrl: "/images/games/eco.jpg",
    category: "sandbox",
    tiers: [
      { players: 4, ram: "4GB", price: 6.99 },
      { players: 8, ram: "6GB", price: 12.99 },
      { players: 16, ram: "8GB", price: 16.99 }
    ]
  },
  {
    name: "Garry's Mod",
    slug: "garrys-mod",
    description: "Physics sandbox with endless possibilities. Create contraptions, play game modes, and mod everything.",
    features: ["Workshop support", "Game mode switching", "Custom content"],
    imageUrl: "/images/games/garrys-mod.jpg",
    category: "sandbox",
    tiers: [
      { players: 4, ram: "2GB", price: 6.99 },
      { players: 8, ram: "4GB", price: 12.99 },
      { players: 16, ram: "6GB", price: 16.99 }
    ]
  }
];

export const allGames: Game[] = [...survivalGames, ...sandboxGames];

// Backward compatibility aliases
export const lightTierGames = sandboxGames;
export const mediumTierGames = survivalGames;
