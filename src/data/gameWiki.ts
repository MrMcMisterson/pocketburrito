export interface GameWiki {
  connectionSteps: { title: string; detail: string }[];
  configFiles: { file: string; settings: { name: string; description: string; default: string }[] }[];
  faq: { question: string; answer: string }[];
  troubleshooting: { problem: string; solution: string }[];
  modSupport?: string;
  adminCommands?: { command: string; description: string }[];
}

export const gameWiki: Record<string, GameWiki> = {
  minecraft: {
    connectionSteps: [
      { title: "Get Your Server Address", detail: "Log into panel.pocketburrito.ca and copy your server IP and port (e.g. play.example.com:25565) from the Console tab." },
      { title: "Launch Minecraft", detail: "Open Minecraft Java Edition and make sure your game version matches the server version shown in your panel." },
      { title: "Open Multiplayer", detail: "From the main menu, click \"Multiplayer\", then click \"Add Server\"." },
      { title: "Enter Server Details", detail: "Type a name for the server and paste your server address into the \"Server Address\" field. Click \"Done\"." },
      { title: "Connect & Play", detail: "Select your server from the list and click \"Join Server\". You're in!" }
    ],
    configFiles: [
      {
        file: "server.properties",
        settings: [
          { name: "server-port", description: "Port the server listens on", default: "25565" },
          { name: "max-players", description: "Maximum players allowed", default: "20" },
          { name: "difficulty", description: "Game difficulty (peaceful, easy, normal, hard)", default: "easy" },
          { name: "gamemode", description: "Default game mode (survival, creative, adventure, spectator)", default: "survival" },
          { name: "view-distance", description: "Render distance in chunks (lower = better performance)", default: "10" },
          { name: "motd", description: "Message shown in the server list", default: "A Minecraft Server" },
          { name: "pvp", description: "Whether players can damage each other", default: "true" },
          { name: "online-mode", description: "Require authenticated Minecraft accounts", default: "true" },
          { name: "white-list", description: "Only allow whitelisted players to join", default: "false" }
        ]
      }
    ],
    faq: [
      { question: "Which server software should I choose?", answer: "Paper is recommended for most servers — it's a performance-optimized fork of Spigot with full plugin support. Use Fabric if you need client-side mods, or Vanilla for a pure experience." },
      { question: "How do I install plugins?", answer: "Download plugin .jar files from sites like SpigotMC or Modrinth, then upload them to the /plugins folder via the File Manager in your panel. Restart the server to load them." },
      { question: "How do I change the Minecraft version?", answer: "Go to the Startup tab in your panel and change the Minecraft Version variable. Restart the server to apply." },
      { question: "Can I upload my existing world?", answer: "Yes! Compress your world folder into a .zip, upload it via File Manager, extract it, and make sure the folder name matches the level-name in server.properties." },
      { question: "How do I whitelist players?", answer: "Set white-list=true in server.properties, then use the console command: whitelist add PlayerName" },
      { question: "How much RAM do I need?", answer: "3GB works for small vanilla servers (1-5 players). For modpacks or 10+ players, use 6-8GB. Heavy modpacks (100+ mods) benefit from 12-16GB." }
    ],
    troubleshooting: [
      { problem: "\"Outdated server\" or \"Outdated client\" error", solution: "Your Minecraft version doesn't match the server. Check the server version in your panel's Startup tab and update your game client to match, or change the server version." },
      { problem: "\"Connection refused\" when joining", solution: "Verify the server is running (green status in panel). Double-check the IP and port. If you just started the server, wait 30-60 seconds for it to fully boot." },
      { problem: "Server crashes on startup with plugins", solution: "Check the console log for the plugin causing the error. Remove it from /plugins and restart. Make sure plugins are compatible with your server software (Paper/Spigot) and Minecraft version." },
      { problem: "Severe lag or TPS drops", solution: "Reduce view-distance to 6-8 in server.properties. Remove unnecessary plugins. Use /timings report (Paper) to identify what's causing lag. Consider upgrading RAM." },
      { problem: "\"Not authenticated with Minecraft.net\" error", solution: "Ensure online-mode=true in server.properties and that players are using legitimate Minecraft accounts. Restart the server after changing this setting." },
      { problem: "World not loading or reset", solution: "Check that level-name in server.properties matches your world folder name exactly. If the world was corrupted, restore from a backup via the Backups tab." }
    ],
    modSupport: "Minecraft supports plugins (Paper/Spigot) and mods (Fabric/Forge). Upload plugin .jar files to the /plugins folder, or mod .jar files to the /mods folder depending on your server software. Change server type in the Startup tab. Popular mod loaders: Paper for plugins, Fabric for lightweight mods, Forge for large modpacks.",
    adminCommands: [
      { command: "/op <player>", description: "Grant operator (admin) status to a player" },
      { command: "/whitelist add <player>", description: "Add a player to the whitelist" },
      { command: "/ban <player> [reason]", description: "Ban a player from the server" },
      { command: "/gamemode <mode> <player>", description: "Change a player's game mode" },
      { command: "/tp <player> <target>", description: "Teleport a player to another player or coordinates" }
    ]
  },

  valheim: {
    connectionSteps: [
      { title: "Get Your Server Details", detail: "Log into panel.pocketburrito.ca and note your server IP, port, and the server password you set in the Startup tab." },
      { title: "Launch Valheim", detail: "Open Valheim through Steam. Make sure you and your friends are running the same game version." },
      { title: "Open the Server Browser", detail: "From the main menu, click \"Start Game\", select a character, then click \"Join Game\". Select the \"Community\" tab." },
      { title: "Add Server via IP", detail: "Click \"Add Server\" at the bottom, enter your server IP:port (e.g. 5.78.100.72:2456), and click \"Connect\". Enter the password when prompted." },
      { title: "Alternative: Steam Server Browser", detail: "Open Steam → View → Game Servers → Favorites. Add your IP:port, then connect from there and enter the password." }
    ],
    configFiles: [
      {
        file: "Startup Parameters",
        settings: [
          { name: "Server Name", description: "Name displayed in the server browser", default: "My Valheim Server" },
          { name: "Server Password", description: "Password required to join (must be at least 5 characters)", default: "changeme" },
          { name: "World Name", description: "Name of the world save file", default: "Dedicated" },
          { name: "Port", description: "Port the server runs on", default: "2456" },
          { name: "Crossplay", description: "Enable crossplay between Steam and Xbox", default: "false" }
        ]
      }
    ],
    faq: [
      { question: "How many players can join?", answer: "Valheim supports up to 10 players on a dedicated server. This is a hard limit set by the game developers." },
      { question: "How do I change the world seed?", answer: "Stop the server, go to the Startup tab, and change the World Name to create a new world. To use a specific seed, you'll need to generate the world locally first and upload the save files." },
      { question: "Can I transfer my local world to the server?", answer: "Yes! Find your local world files (usually in %appdata%\\..\\LocalLow\\IronGate\\Valheim\\worlds_local), upload the .fwl and .db files to the server's world folder via File Manager." },
      { question: "Does the server stay running when I disconnect?", answer: "Yes, the dedicated server runs 24/7 regardless of whether players are connected. Boss progression and world state persist." },
      { question: "How do I update the server?", answer: "The server auto-updates when restarted. Simply restart from the panel to get the latest version." }
    ],
    troubleshooting: [
      { problem: "Server not showing in the community browser", solution: "It can take 5-10 minutes for the server to appear. Use \"Add Server\" with the direct IP instead for instant access." },
      { problem: "\"Disconnected\" immediately after entering password", solution: "Ensure the password is at least 5 characters and does not contain the world name. Check that your game version matches the server version." },
      { problem: "\"Incompatible version\" error", solution: "The server and client must be on the same version. Restart the server to update it, or check Steam for a client update." },
      { problem: "Severe lag when exploring new areas", solution: "This is normal as the server generates new terrain. Performance improves in already-explored areas. Ensure the server has 6GB RAM allocated." },
      { problem: "World save corruption", solution: "Restore from a backup via the Backups tab in your panel. Backups are taken daily. Avoid force-stopping the server during world saves." }
    ],
    modSupport: "Valheim supports mods via BepInEx. Install BepInEx on both the server and client, then add mod .dll files to the /BepInEx/plugins/ folder. Popular mods like Valheim Plus must be installed on both server and all connecting clients. Upload mods via the File Manager.",
    adminCommands: [
      { command: "ban <steamID>", description: "Ban a player by their Steam ID" },
      { command: "kick <steamID>", description: "Kick a player from the server" },
      { command: "save", description: "Force save the world immediately" }
    ]
  },

  palworld: {
    connectionSteps: [
      { title: "Get Your Server Address", detail: "Log into panel.pocketburrito.ca and copy your server IP and port from the Console tab." },
      { title: "Launch Palworld", detail: "Open Palworld through Steam and reach the title screen." },
      { title: "Select Multiplayer", detail: "Click \"Join Multiplayer Game\" from the main menu." },
      { title: "Enter Server Address", detail: "At the bottom of the server list, enter your server IP:port in the connection field and click \"Connect\"." },
      { title: "Create or Select Character", detail: "Create your character and enter the world. Share the IP with friends so they can join too." }
    ],
    configFiles: [
      {
        file: "PalWorldSettings.ini",
        settings: [
          { name: "ServerName", description: "Name shown in the server browser", default: "Default Palworld Server" },
          { name: "ServerPassword", description: "Password required to join", default: "" },
          { name: "AdminPassword", description: "Password for admin commands", default: "" },
          { name: "MaxPlayers", description: "Maximum concurrent players", default: "32" },
          { name: "ExpRate", description: "Experience gain multiplier", default: "1.0" },
          { name: "PalCaptureRate", description: "Pal capture success rate multiplier", default: "1.0" },
          { name: "DeathPenalty", description: "What drops on death (None, Item, ItemAndEquipment, All)", default: "All" }
        ]
      }
    ],
    faq: [
      { question: "How do I become an admin?", answer: "Set an AdminPassword in the server settings, then in-game open chat and type /AdminPassword <your_password> to authenticate." },
      { question: "How do I adjust spawn rates?", answer: "Edit PalWorldSettings.ini in the File Manager. Modify PalSpawnNumRate and other spawn-related settings. Restart the server to apply." },
      { question: "Can I transfer my single-player save?", answer: "Palworld save transfers between single-player and dedicated servers are not officially supported and may cause issues." },
      { question: "Why is the server using so much RAM?", answer: "Palworld is memory-intensive, especially with many Pals and bases. For 8+ players, we recommend at least 8GB RAM." },
      { question: "How do I update the server?", answer: "Restart the server from the panel. It will automatically check for and install updates on startup." }
    ],
    troubleshooting: [
      { problem: "\"Connection timeout\" when joining", solution: "Ensure the server is fully started (check console for \"Server is ready\"). Verify the IP and port. The first startup can take several minutes." },
      { problem: "Server crashes frequently", solution: "This is often caused by insufficient RAM. Upgrade to a higher tier if you're running with many players or Pals. Check console for specific error messages." },
      { problem: "Settings changes not applying", solution: "Make sure you're editing the correct PalWorldSettings.ini file and that you've restarted the server after making changes." },
      { problem: "Players can't find each other in-world", solution: "All players must connect to the same server IP. In-game, players spawn at different locations — use coordinates to find each other." },
      { problem: "\"Server version mismatch\" error", solution: "Restart the server to update it, then make sure all clients update Palworld through Steam." }
    ],
    adminCommands: [
      { command: "/AdminPassword <password>", description: "Authenticate as admin in-game" },
      { command: "/KickPlayer <steamID>", description: "Kick a player from the server" },
      { command: "/BanPlayer <steamID>", description: "Ban a player from the server" },
      { command: "/Shutdown <seconds> <message>", description: "Schedule a server shutdown with warning" },
      { command: "/Save", description: "Force save the world" }
    ]
  },

  "project-zomboid": {
    connectionSteps: [
      { title: "Get Your Server Details", detail: "Log into panel.pocketburrito.ca and note your server IP, port, and admin password from the Startup tab." },
      { title: "Launch Project Zomboid", detail: "Open Project Zomboid through Steam." },
      { title: "Open Join Server", detail: "From the main menu, click \"Join\" to open the server browser." },
      { title: "Enter Server IP", detail: "Enter your server IP and port manually, or find your server in the public list. Enter the password if one is set." },
      { title: "Create Your Character", detail: "Create your character with your preferred traits and occupation, then spawn into the world." }
    ],
    configFiles: [
      {
        file: "servertest.ini",
        settings: [
          { name: "Public", description: "Whether the server appears in the public server list", default: "true" },
          { name: "PublicName", description: "Server name in the public list", default: "My PZ Server" },
          { name: "MaxPlayers", description: "Maximum concurrent players", default: "32" },
          { name: "Password", description: "Password to join the server (blank = no password)", default: "" },
          { name: "PVP", description: "Enable player vs player combat", default: "true" },
          { name: "PauseEmpty", description: "Pause the game when no players are online", default: "true" },
          { name: "SpawnPoint", description: "Default spawn coordinates", default: "0,0,0" }
        ]
      },
      {
        file: "servertest_SandboxVars.lua",
        settings: [
          { name: "Zombies", description: "Zombie population level (1=Insane to 4=None)", default: "3" },
          { name: "Speed", description: "Zombie speed (1=Sprinters to 3=Shamblers)", default: "3" },
          { name: "DayLength", description: "Real-time minutes per in-game hour", default: "1" },
          { name: "StartMonth", description: "Starting month (1-12)", default: "7" },
          { name: "WaterShut", description: "Day water shuts off (0=never, -1=instant)", default: "14" }
        ]
      }
    ],
    faq: [
      { question: "How do I add mods from the Steam Workshop?", answer: "Add Workshop mod IDs to the server's Workshop settings in the Startup tab. Separate multiple IDs with semicolons. Players will auto-download mods when connecting." },
      { question: "How do I make myself admin?", answer: "Connect to the server, then from the panel console type: setaccesslevel \"YourUsername\" admin" },
      { question: "Can I change zombie difficulty mid-game?", answer: "Yes, edit servertest_SandboxVars.lua and restart the server. Changes apply immediately to newly spawning zombies." },
      { question: "How do I reset the world?", answer: "Stop the server, delete the world save folder via File Manager, and restart. A new world will generate." },
      { question: "Why do cars keep disappearing?", answer: "This is usually caused by vehicle mods conflicting. Check your mod load order and ensure compatibility." }
    ],
    troubleshooting: [
      { problem: "\"Server is not responding\" error", solution: "The server takes 2-5 minutes to fully start. Wait for \"Server is ready\" in the console. If it persists, check for errors in the console output." },
      { problem: "Mods causing server crash on startup", solution: "Remove recently added mod IDs from the Workshop settings, restart, and add them back one at a time to find the culprit." },
      { problem: "Players stuck on loading screen", solution: "This usually means a mod mismatch. Ensure the player has all required mods installed. They may need to delete their local mod cache and re-download." },
      { problem: "Severe lag with many zombies", solution: "Reduce zombie population in SandboxVars. Lower the zombie respawn rate. Ensure you have adequate RAM for your player count." },
      { problem: "Admin commands not working", solution: "Make sure you've set your access level via the console: setaccesslevel \"YourUsername\" admin. The username is case-sensitive." }
    ],
    modSupport: "Project Zomboid has excellent Steam Workshop integration. Add Workshop mod IDs to the server's startup configuration and they'll auto-download. Players connecting will also auto-download required mods. Manage mod load order in the server settings.",
    adminCommands: [
      { command: "setaccesslevel \"user\" admin", description: "Grant admin access to a player" },
      { command: "kickuser \"user\"", description: "Kick a player from the server" },
      { command: "banuser \"user\"", description: "Ban a player" },
      { command: "teleport \"user\" \"target\"", description: "Teleport a player to another player" },
      { command: "save", description: "Force save the world" }
    ]
  },

  enshrouded: {
    connectionSteps: [
      { title: "Get Your Server Details", detail: "Log into panel.pocketburrito.ca and note your server IP and query port from the Console tab." },
      { title: "Launch Enshrouded", detail: "Open Enshrouded through Steam." },
      { title: "Select Play and Join", detail: "From the main menu, click \"Play\" → \"Join\" → \"Find Server\"." },
      { title: "Add by IP", detail: "Click \"Add Server\" and enter your server IP and port. Click \"Add\" to save it." },
      { title: "Connect", detail: "Select the server from your list and click \"Join\". Enter the password if one is set." }
    ],
    configFiles: [
      {
        file: "enshrouded_server.json",
        settings: [
          { name: "name", description: "Server name shown in the browser", default: "Enshrouded Server" },
          { name: "password", description: "Password to join the server", default: "" },
          { name: "maxPlayers", description: "Maximum concurrent players (up to 16)", default: "16" },
          { name: "gamePort", description: "Main game port", default: "15636" },
          { name: "queryPort", description: "Steam query port", default: "15637" }
        ]
      }
    ],
    faq: [
      { question: "How many players can join?", answer: "Enshrouded supports up to 16 players on a dedicated server." },
      { question: "Can I transfer my single-player world?", answer: "Yes, copy your local save files and upload them to the server's save directory via the File Manager." },
      { question: "Does character progress carry between servers?", answer: "Yes, character progress is saved locally on each player's machine, so you keep your level and skills between servers." },
      { question: "How do I update the server?", answer: "Restart the server from the panel. It will automatically update to the latest version." }
    ],
    troubleshooting: [
      { problem: "Server not appearing in browser", solution: "Use \"Add Server\" with the direct IP and query port instead of browsing. Ensure the server is fully started." },
      { problem: "\"Connection failed\" error", solution: "Verify the server is running and the IP/port are correct. The server can take 2-3 minutes to start." },
      { problem: "Players getting disconnected randomly", solution: "Check server RAM usage. Enshrouded can be memory-intensive with large bases. Consider upgrading if needed." },
      { problem: "Changes to server config not applying", solution: "Edit enshrouded_server.json via File Manager, then fully stop and restart the server (not just reload)." }
    ]
  },

  "7-days-to-die": {
    connectionSteps: [
      { title: "Get Your Server Address", detail: "Log into panel.pocketburrito.ca and copy your server IP and port from the Console tab." },
      { title: "Launch 7 Days to Die", detail: "Open 7 Days to Die through Steam." },
      { title: "Open Server Browser", detail: "From the main menu, click \"Join A Game\"." },
      { title: "Connect by IP", detail: "Click \"Connect to IP\", enter your server IP and port, and click \"Connect\". Enter the password if prompted." },
      { title: "Start Playing", detail: "Create your character and spawn into the world. Horde night is on day 7 — start preparing!" }
    ],
    configFiles: [
      {
        file: "serverconfig.xml",
        settings: [
          { name: "ServerName", description: "Name shown in the server browser", default: "My 7DTD Server" },
          { name: "ServerPassword", description: "Password to join", default: "" },
          { name: "MaxPlayers", description: "Maximum concurrent players", default: "8" },
          { name: "GameDifficulty", description: "Difficulty level (0=Scavenger to 5=Insane)", default: "2" },
          { name: "BloodMoonFrequency", description: "Days between horde nights", default: "7" },
          { name: "DayNightLength", description: "Real-time minutes per in-game day", default: "60" },
          { name: "LootAbundance", description: "Loot quantity percentage", default: "100" },
          { name: "ZombiesRun", description: "When zombies run (0=Default, 1=Never, 2=Always)", default: "0" }
        ]
      }
    ],
    faq: [
      { question: "How do horde nights work on a server?", answer: "Blood Moon hordes occur every 7 days by default (configurable via BloodMoonFrequency). All online players will be attacked." },
      { question: "How do I change the map?", answer: "Edit the GameWorld setting in serverconfig.xml to switch between Navezgane (fixed map) and RandomGen (procedural). Restart to generate a new world." },
      { question: "Can I increase XP gain?", answer: "Yes, modify the XPMultiplier setting in serverconfig.xml. Values above 100 give bonus XP." },
      { question: "How do I make myself admin?", answer: "Add your Steam ID to the serveradmin.xml file in the saves directory." },
      { question: "How do I reset the world?", answer: "Stop the server, delete the save folder via File Manager, and restart. A fresh world will generate." }
    ],
    troubleshooting: [
      { problem: "Server takes very long to start", solution: "First startup generates the world which can take 5-15 minutes depending on map size. Subsequent starts are much faster." },
      { problem: "EasyAntiCheat (EAC) errors", solution: "The dedicated server does not use EAC. Players should disable EAC when launching the game to connect to dedicated servers." },
      { problem: "\"Server is full\" error despite slots available", solution: "Some slots may be reserved for admins. Check ServerReservedSlots in serverconfig.xml." },
      { problem: "Extreme lag during horde night", solution: "Reduce MaxSpawnedZombies and MaxSpawnedAnimals in serverconfig.xml. Ensure adequate RAM for your player count." },
      { problem: "Players losing items on death", solution: "Configure the DropOnDeath and DropOnQuit settings in serverconfig.xml. Options: 0=Nothing, 1=Everything, 2=Toolbelt, 3=Backpack, 4=Delete All." }
    ],
    adminCommands: [
      { command: "admin add <steamID> <permissionLevel>", description: "Add an admin (0 = full admin)" },
      { command: "kick <player> [reason]", description: "Kick a player from the server" },
      { command: "ban <player> <duration> [reason]", description: "Ban a player for a duration" },
      { command: "give <player> <item> <count>", description: "Give an item to a player" },
      { command: "teleportplayer <player> <x> <y> <z>", description: "Teleport a player to coordinates" }
    ]
  },

  "sons-of-the-forest": {
    connectionSteps: [
      { title: "Get Your Server Details", detail: "Log into panel.pocketburrito.ca and note your server IP and port from the Console tab." },
      { title: "Launch Sons of the Forest", detail: "Open Sons of the Forest through Steam." },
      { title: "Select Multiplayer", detail: "From the main menu, click \"Multiplayer\" → \"Join Game\"." },
      { title: "Connect via IP", detail: "Use the direct connect option to enter your server IP and port." },
      { title: "Start Surviving", detail: "Create your character and enter the island. Stick together — it's dangerous out there!" }
    ],
    configFiles: [
      {
        file: "dedicatedserver.cfg",
        settings: [
          { name: "ServerName", description: "Name of the server", default: "Sons of the Forest Server" },
          { name: "MaxPlayers", description: "Maximum concurrent players", default: "8" },
          { name: "Password", description: "Password to join the server", default: "" },
          { name: "SaveInterval", description: "Auto-save interval in seconds", default: "600" },
          { name: "IdleDayCycleSpeed", description: "Day cycle speed when no players online", default: "0.0" }
        ]
      }
    ],
    faq: [
      { question: "How many players can join?", answer: "Sons of the Forest dedicated servers support up to 8 players by default, configurable up to 16." },
      { question: "Can I transfer my co-op save?", answer: "Co-op saves and dedicated server saves use different formats. You'll need to start a new world on the dedicated server." },
      { question: "Does Kelvin work on dedicated servers?", answer: "Yes, Kelvin and Virginia both work on dedicated servers. They persist between sessions." },
      { question: "How do I adjust difficulty?", answer: "Difficulty settings are configured at world creation time. To change them, you may need to create a new world." }
    ],
    troubleshooting: [
      { problem: "Can't find the server in the browser", solution: "Use direct IP connection instead. The server browser can be slow to update." },
      { problem: "\"Connection timeout\" error", solution: "Ensure the server is fully started (check console for ready messages). The first startup takes several minutes." },
      { problem: "World not saving properly", solution: "Check the SaveInterval setting. Use the save command from console before stopping the server." },
      { problem: "Rubber-banding or desync", solution: "This is often network-related. Ensure all players have stable connections. Reduce player count if the issue persists." }
    ]
  },

  rust: {
    connectionSteps: [
      { title: "Get Your Server Details", detail: "Log into panel.pocketburrito.ca and copy your server IP:port from the Console tab." },
      { title: "Launch Rust", detail: "Open Rust through Steam. Make sure you're on the latest game version." },
      { title: "Open the Console", detail: "Press F1 to open the in-game console." },
      { title: "Connect via Console", detail: "Type: client.connect <IP:Port> and press Enter. Example: client.connect 5.78.100.72:28015" },
      { title: "Alternative: Server Browser", detail: "Go to Play Game → Modded/Community tab, search for your server name, and click Join." }
    ],
    configFiles: [
      {
        file: "server.cfg",
        settings: [
          { name: "server.hostname", description: "Server name shown in the browser", default: "Rust Server" },
          { name: "server.maxplayers", description: "Maximum concurrent players", default: "50" },
          { name: "server.worldsize", description: "Map size (1000-6000)", default: "3000" },
          { name: "server.seed", description: "Map generation seed", default: "random" },
          { name: "server.headerimage", description: "URL to server banner image", default: "" },
          { name: "server.description", description: "Server description shown in browser", default: "" }
        ]
      }
    ],
    faq: [
      { question: "How do I wipe my server?", answer: "Stop the server, delete the map and player data files (*.sav, *.db) from File Manager, and restart. This performs a full wipe." },
      { question: "How do I do a map-only wipe?", answer: "Delete only the .sav and .map files, keeping player .db files. Players keep blueprints but the map regenerates." },
      { question: "How do I install Oxide/uMod plugins?", answer: "Install the Oxide framework from the mod manager, then add plugin .cs files to the /oxide/plugins/ folder. They compile automatically." },
      { question: "How do I change the map seed?", answer: "Modify server.seed in the Startup tab and wipe the map files. A new map generates on restart." },
      { question: "When should I wipe?", answer: "Most servers wipe weekly or biweekly. Forced wipes happen on the first Thursday of each month when Facepunch updates." },
      { question: "How do I set up RCON?", answer: "RCON is enabled by default. Use tools like RustAdmin or Battlemetrics RCON with your IP, RCON port, and RCON password from the Startup tab." }
    ],
    troubleshooting: [
      { problem: "Long loading time when connecting", solution: "Rust has large map files. First connection can take 5-10 minutes. Installing Rust on an SSD significantly helps." },
      { problem: "\"Connection attempt failed\" error", solution: "Verify the server is running and you have the correct IP:port. Try connecting via F1 console with client.connect." },
      { problem: "Plugins not loading after Oxide install", solution: "Check the Oxide log in /oxide/logs/ for errors. Ensure plugins are compatible with the current Oxide and Rust versions." },
      { problem: "Server crashes during heavy PvP", solution: "Ensure adequate RAM (8GB+ recommended for 50+ players). Remove problematic plugins. Check console for error patterns." },
      { problem: "\"Steam Auth Timeout\" error", solution: "This is usually temporary. Wait a moment and try again. If persistent, restart the server." }
    ],
    modSupport: "Rust uses the Oxide/uMod plugin framework. Install Oxide from the mod options in your panel, then add C# plugin files (.cs) to the /oxide/plugins/ folder — they compile automatically on load. Thousands of plugins are available at umod.org. Popular plugins include Gather Manager, Better Loot, and Backpacks.",
    adminCommands: [
      { command: "ownerid <steamID> <name> <reason>", description: "Grant owner-level admin to a player" },
      { command: "moderatorid <steamID> <name>", description: "Grant moderator-level admin" },
      { command: "ban <player> <reason>", description: "Ban a player" },
      { command: "kick <player> <reason>", description: "Kick a player" },
      { command: "server.save", description: "Force save the server" }
    ]
  },

  "ark-survival-evolved": {
    connectionSteps: [
      { title: "Get Your Server Details", detail: "Log into panel.pocketburrito.ca and copy your server IP and port from the Console tab." },
      { title: "Launch ARK", detail: "Open ARK: Survival Evolved through Steam." },
      { title: "Open Server Browser", detail: "From the main menu, click \"Join ARK\". Switch to the \"Unofficial\" tab at the bottom." },
      { title: "Find Your Server", detail: "Use the search bar to find your server by name, or click \"Connect\" at the bottom and enter your IP:port directly." },
      { title: "Join and Survive", detail: "Select a spawn point and create your survivor. Start punching trees and taming dinos!" }
    ],
    configFiles: [
      {
        file: "GameUserSettings.ini",
        settings: [
          { name: "SessionName", description: "Server name in the browser", default: "ARK Server" },
          { name: "MaxPlayers", description: "Maximum concurrent players", default: "70" },
          { name: "ServerPassword", description: "Password to join", default: "" },
          { name: "ServerAdminPassword", description: "Admin password for in-game commands", default: "" },
          { name: "DifficultyOffset", description: "Difficulty level (0.0-1.0, affects dino levels)", default: "0.2" },
          { name: "TamingSpeedMultiplier", description: "Multiplier for taming speed", default: "1.0" },
          { name: "XPMultiplier", description: "Experience gain multiplier", default: "1.0" },
          { name: "HarvestAmountMultiplier", description: "Resource gathering multiplier", default: "1.0" }
        ]
      }
    ],
    faq: [
      { question: "How do I change the map?", answer: "Change the map name in the Startup tab. Options include TheIsland, Ragnarok, Valguero, Fjordur, and more. Restart to load the new map." },
      { question: "How do I add mods?", answer: "Add Steam Workshop mod IDs to the ActiveMods list in the Startup tab, separated by commas. The server downloads them automatically on restart." },
      { question: "How do I increase taming speed?", answer: "Edit TamingSpeedMultiplier in GameUserSettings.ini. Set it to 5.0 or higher for faster taming on unofficial servers." },
      { question: "How do I admin myself in-game?", answer: "Set the ServerAdminPassword, then in-game press Tab to open console and type: enablecheats <password>" },
      { question: "How much RAM does ARK need?", answer: "ARK is very RAM-intensive. Minimum 6GB for a small server, 8-16GB recommended for mods and more players." }
    ],
    troubleshooting: [
      { problem: "Server takes 15+ minutes to start", solution: "ARK servers are notoriously slow to start, especially with mods. This is normal — check the console to monitor startup progress." },
      { problem: "Mods not downloading", solution: "Verify the Workshop mod IDs are correct and separated by commas. Check the console for download progress. Large mods can take time." },
      { problem: "\"Unable to query server info for invite\" error", solution: "Restart the server and try connecting via direct IP:port instead of the server browser." },
      { problem: "Dinos not spawning or spawning at low levels", solution: "Run the console command: destroywilddinos to respawn all wild dinos. Increase DifficultyOffset for higher level dinos." },
      { problem: "Out of memory crashes", solution: "ARK is extremely memory-hungry. Remove unnecessary mods, upgrade RAM tier, and restart the server periodically." }
    ],
    modSupport: "ARK supports Steam Workshop mods. Add mod IDs to the ActiveMods startup parameter (comma-separated). The server auto-downloads mods on restart. Players automatically download mods when connecting. Popular mods include Structures Plus, Dino Storage, and Awesome SpyGlass.",
    adminCommands: [
      { command: "enablecheats <password>", description: "Authenticate as admin using the admin password" },
      { command: "admincheat fly", description: "Enable flying for your character" },
      { command: "admincheat god", description: "Enable god mode" },
      { command: "admincheat summon <dinoID>", description: "Spawn a dinosaur at your location" },
      { command: "admincheat saveworld", description: "Force save the world" }
    ]
  },

  "v-rising": {
    connectionSteps: [
      { title: "Get Your Server Details", detail: "Log into panel.pocketburrito.ca and note your server IP and game port from the Console tab." },
      { title: "Launch V Rising", detail: "Open V Rising through Steam." },
      { title: "Select Online Play", detail: "From the main menu, click \"Play\" → \"Online Play\"." },
      { title: "Direct Connect", detail: "Click \"Direct Connect\" and enter your server IP:port. Click \"Connect\"." },
      { title: "Rise as a Vampire", detail: "Create your vampire character and awaken in the world of Vardoran!" }
    ],
    configFiles: [
      {
        file: "ServerHostSettings.json",
        settings: [
          { name: "Name", description: "Server name in the browser", default: "V Rising Server" },
          { name: "Password", description: "Password to join", default: "" },
          { name: "MaxConnectedUsers", description: "Maximum concurrent players", default: "40" },
          { name: "GameSettingsPreset", description: "Game settings preset (PvP, PvE, etc.)", default: "" },
          { name: "SaveName", description: "World save name", default: "world1" }
        ]
      },
      {
        file: "ServerGameSettings.json",
        settings: [
          { name: "GameModeType", description: "PvP or PvE mode", default: "PvP" },
          { name: "ClanSize", description: "Maximum clan members", default: "4" },
          { name: "BloodDrainModifier", description: "Blood drain speed multiplier", default: "1.0" },
          { name: "DurabilityDrainModifier", description: "Equipment durability loss rate", default: "1.0" }
        ]
      }
    ],
    faq: [
      { question: "What's the difference between PvP and PvE?", answer: "PvP allows players to fight each other and raid castles. PvE disables player damage and castle raiding. Set via GameModeType in ServerGameSettings.json." },
      { question: "How do I change clan size?", answer: "Edit ClanSize in ServerGameSettings.json. Default is 4, maximum is the server player limit." },
      { question: "How do I become admin?", answer: "Add your SteamID to the adminlist.txt file in the server's settings folder." },
      { question: "Can I switch between PvP and PvE?", answer: "Yes, change GameModeType in ServerGameSettings.json and restart the server. Existing castles and progress are preserved." }
    ],
    troubleshooting: [
      { problem: "Server not appearing in the browser", solution: "Use Direct Connect with your IP:port instead. The server can take several minutes to register in the browser." },
      { problem: "\"Failed to connect\" error", solution: "Verify the server is running and the IP:port are correct. Ensure you're using the game port, not the query port." },
      { problem: "Castle decay while offline", solution: "Check the CastleDecayRateModifier setting. Set it to 0 to disable decay entirely on your server." },
      { problem: "Server performance drops over time", solution: "This can happen as more castles are built. Restart the server periodically and consider limiting castle heart count." }
    ],
    adminCommands: [
      { command: "adminauth", description: "Authenticate as admin in-game (must be in adminlist.txt)" },
      { command: "admindeauth", description: "Remove admin authentication" },
      { command: "kick <player>", description: "Kick a player from the server" },
      { command: "ban <player>", description: "Ban a player from the server" }
    ]
  },

  terraria: {
    connectionSteps: [
      { title: "Get Your Server Details", detail: "Log into panel.pocketburrito.ca and copy your server IP and port from the Console tab." },
      { title: "Launch Terraria", detail: "Open Terraria through Steam." },
      { title: "Select Multiplayer", detail: "From the main menu, click \"Multiplayer\" → \"Join via IP\"." },
      { title: "Enter Server Details", detail: "Enter your server IP and port. If a password is set, enter it when prompted." },
      { title: "Choose Your Character", detail: "Select a character (or create a new one) and join the world!" }
    ],
    configFiles: [
      {
        file: "serverconfig.txt",
        settings: [
          { name: "maxplayers", description: "Maximum concurrent players", default: "8" },
          { name: "password", description: "Server password (blank = no password)", default: "" },
          { name: "motd", description: "Message of the day shown on join", default: "Welcome!" },
          { name: "worldname", description: "Name of the world", default: "world" },
          { name: "difficulty", description: "World difficulty (0=Classic, 1=Expert, 2=Master, 3=Journey)", default: "0" },
          { name: "autocreate", description: "Auto-create world size (1=Small, 2=Medium, 3=Large)", default: "2" },
          { name: "secure", description: "Enable anti-cheat", default: "1" }
        ]
      }
    ],
    faq: [
      { question: "How do I change the world size?", answer: "Set the autocreate value in serverconfig.txt (1=Small, 2=Medium, 3=Large). Delete the old world file and restart to generate a new one." },
      { question: "Can I upload my single-player world?", answer: "Yes! Upload your .wld file from Documents/My Games/Terraria/Worlds/ to the server's world directory via File Manager." },
      { question: "How do I install tModLoader?", answer: "Change the server type to tModLoader in the Startup tab. Upload mod files to the mods folder. All players need tModLoader and the same mods installed." },
      { question: "How do I change difficulty?", answer: "Edit the difficulty setting in serverconfig.txt (0=Classic, 1=Expert, 2=Master, 3=Journey). Requires a new world to take effect." },
      { question: "Can I roll back the world?", answer: "Yes, restore from a backup via the Backups tab. Daily automatic backups are available." }
    ],
    troubleshooting: [
      { problem: "\"Lost connection\" immediately on join", solution: "Check that your Terraria client version matches the server version. Verify the IP and port are correct." },
      { problem: "tModLoader mods not loading", solution: "Ensure the server is running tModLoader (not vanilla). Upload mods to the correct mods folder. All players need matching mod versions." },
      { problem: "World corruption or crash on load", solution: "Restore from a backup via the Backups tab. If no backups, try loading the .wld.bak file by renaming it." },
      { problem: "Server not responding to commands", solution: "Use the console in your panel to send commands. In-game commands require the server password for authorization." }
    ],
    modSupport: "Terraria supports mods via tModLoader. Change the server to tModLoader in the Startup tab. Upload mod .tmod files to the mods folder. All players must have tModLoader installed along with the same mods. Browse mods at the tModLoader Mod Browser in-game.",
    adminCommands: [
      { command: "/password <pass>", description: "Change the server password" },
      { command: "/kick <player>", description: "Kick a player from the server" },
      { command: "/ban <player>", description: "Ban a player" },
      { command: "/time <dawn|noon|dusk|midnight>", description: "Change the time of day" },
      { command: "/say <message>", description: "Broadcast a server message" }
    ]
  },

  satisfactory: {
    connectionSteps: [
      { title: "Get Your Server Details", detail: "Log into panel.pocketburrito.ca and note your server IP and port from the Console tab." },
      { title: "Launch Satisfactory", detail: "Open Satisfactory through Steam or Epic Games." },
      { title: "Open Server Manager", detail: "From the main menu, click \"Server Manager\" to browse servers." },
      { title: "Add Server", detail: "Click \"Add Server\", enter your server IP:port, and give it a name. Set the admin password on first connection." },
      { title: "Join and Build", detail: "Select your server and click \"Join\". Create a new game or load an existing save." }
    ],
    configFiles: [
      {
        file: "ServerSettings.ini (via Server Manager)",
        settings: [
          { name: "Server Name", description: "Name of the server", default: "Satisfactory Server" },
          { name: "Admin Password", description: "Password for admin access", default: "" },
          { name: "Client Password", description: "Password to join the server", default: "" },
          { name: "Auto-Save Interval", description: "Minutes between auto-saves", default: "5" },
          { name: "Network Quality", description: "Network quality setting (Low, Normal, High, Ultra)", default: "Normal" }
        ]
      }
    ],
    faq: [
      { question: "How do I set up the server for the first time?", answer: "Connect via Server Manager, set an admin password, then create a new game and choose a starting location. The server is ready once the world loads." },
      { question: "Can I upload my single-player save?", answer: "Yes! Upload your save file to the server's save directory via File Manager, then load it from the Server Manager in-game." },
      { question: "How do I manage the server without joining?", answer: "Use the Server Manager from Satisfactory's main menu — you can manage saves, restart, and configure settings without joining the game." },
      { question: "Does the factory keep running when I disconnect?", answer: "Yes, the server continues running your factory 24/7 even when no players are connected." }
    ],
    troubleshooting: [
      { problem: "\"Cannot connect to server\" error", solution: "Ensure the server is fully started (check console). First startup can take several minutes. Verify the IP and port." },
      { problem: "Server crashes when loading large save", solution: "Large factories require more RAM. Upgrade to a higher tier if your factory has grown significantly." },
      { problem: "Multiplayer desync issues", solution: "Have the host save and reload. Ensure all players have stable connections. Set Network Quality to Ultra for better sync." },
      { problem: "Admin password not working", solution: "The admin password is set on first connection. If forgotten, check or reset it in the server configuration files via File Manager." }
    ]
  },

  factorio: {
    connectionSteps: [
      { title: "Get Your Server Details", detail: "Log into panel.pocketburrito.ca and note your server IP and port from the Console tab." },
      { title: "Launch Factorio", detail: "Open Factorio on your PC." },
      { title: "Open Multiplayer", detail: "From the main menu, click \"Multiplayer\" → \"Connect to server\"." },
      { title: "Enter Server Address", detail: "Type your server IP:port in the address field and click \"Connect\"." },
      { title: "Automate Everything", detail: "Join the world and start building your factory. The factory must grow!" }
    ],
    configFiles: [
      {
        file: "server-settings.json",
        settings: [
          { name: "name", description: "Server name in the browser", default: "Factorio Server" },
          { name: "description", description: "Server description", default: "" },
          { name: "max_players", description: "Maximum concurrent players (0=unlimited)", default: "0" },
          { name: "game_password", description: "Password to join", default: "" },
          { name: "autosave_interval", description: "Minutes between auto-saves", default: "5" },
          { name: "non_blocking_saving", description: "Save without pausing the game", default: "true" },
          { name: "visibility", description: "Server visibility (public/lan/hidden)", default: "public" }
        ]
      }
    ],
    faq: [
      { question: "How do I install mods?", answer: "Upload mod .zip files to the /mods folder via File Manager. All players must have the same mods installed. Edit mod-list.json to enable/disable mods." },
      { question: "Can I upload my single-player save?", answer: "Yes! Upload your save .zip file to the /saves folder and set it as the active save in the startup configuration." },
      { question: "How do I change the map settings?", answer: "For a new world, edit map-gen-settings.json before the world is created. For an existing world, settings are locked in." },
      { question: "How do I set up a scenario?", answer: "Upload scenario files to the /scenarios folder and specify the scenario name in the startup parameters." },
      { question: "How do I whitelist the server?", answer: "Enable the whitelist in the startup settings, then use /whitelist add <player> in the console." }
    ],
    troubleshooting: [
      { problem: "\"Mod mismatch\" when connecting", solution: "All players must have exactly the same mods and versions as the server. Download mods from the in-game mod portal to ensure version matching." },
      { problem: "UPS (updates per second) dropping below 60", solution: "Large factories strain the server. Optimize your factory design, reduce active entities, and consider upgrading RAM." },
      { problem: "\"Map version mismatch\" error", solution: "The server and client must be on the same Factorio version. Update both to the latest version." },
      { problem: "Server crashes on startup with mods", solution: "Remove recently added mods from the /mods folder and restart. Add them back one at a time to find the incompatible mod." }
    ],
    modSupport: "Factorio has built-in mod support. Upload mod .zip files to the /mods directory. Edit mod-list.json to enable/disable specific mods. All connecting players must have matching mod versions. Browse mods at mods.factorio.com or through the in-game mod portal.",
    adminCommands: [
      { command: "/promote <player>", description: "Promote a player to admin" },
      { command: "/kick <player>", description: "Kick a player" },
      { command: "/ban <player>", description: "Ban a player" },
      { command: "/whitelist add <player>", description: "Add a player to the whitelist" },
      { command: "/evolution", description: "Show current enemy evolution factor" }
    ]
  },

  "core-keeper": {
    connectionSteps: [
      { title: "Get Your Server Details", detail: "Log into panel.pocketburrito.ca and note your Game ID from the Console tab (shown on startup)." },
      { title: "Launch Core Keeper", detail: "Open Core Keeper through Steam." },
      { title: "Select Multiplayer", detail: "From the main menu, click \"Join Game\"." },
      { title: "Enter Game ID", detail: "Enter the Game ID from your server's console output and click \"Join\"." },
      { title: "Start Exploring", detail: "Create your character and begin exploring the caverns with friends!" }
    ],
    configFiles: [
      {
        file: "Startup Parameters",
        settings: [
          { name: "Game ID", description: "Auto-generated ID players use to connect (shown in console on boot)", default: "Auto-generated" },
          { name: "World Name", description: "Name of the world save file", default: "world" },
          { name: "Max Players", description: "Maximum concurrent players", default: "8" },
          { name: "World Seed", description: "Seed for world generation (0=random)", default: "0" }
        ]
      }
    ],
    faq: [
      { question: "How do players connect?", answer: "Players use the Game ID shown in the server console on startup — not an IP address. Share this ID with friends." },
      { question: "Can I transfer my local world?", answer: "Yes, upload your local save files to the server's save directory via File Manager." },
      { question: "Does the world persist when empty?", answer: "Yes, the dedicated server keeps the world running 24/7." },
      { question: "How do I change the world seed?", answer: "Set the World Seed in the Startup tab. Delete the existing world save and restart to generate a new one." }
    ],
    troubleshooting: [
      { problem: "Game ID not showing in console", solution: "Wait for the server to fully start. The Game ID appears once initialization is complete, which can take 1-2 minutes." },
      { problem: "\"Failed to connect\" with Game ID", solution: "Make sure you're copying the Game ID exactly. It changes every time the server restarts." },
      { problem: "Server crashing on world load", solution: "The world save may be corrupted. Restore from a backup or delete the save to generate a new world." },
      { problem: "Players can't see each other in-game", solution: "All players must be connected to the same server using the same Game ID." }
    ]
  },

  eco: {
    connectionSteps: [
      { title: "Get Your Server Details", detail: "Log into panel.pocketburrito.ca and note your server IP and port from the Console tab." },
      { title: "Launch ECO", detail: "Open ECO through Steam." },
      { title: "Open Server Browser", detail: "From the main menu, click \"New Game\" → \"Join Server\"." },
      { title: "Find Your Server", detail: "Search for your server by name, or switch to the direct connect tab and enter your IP:port." },
      { title: "Save the World", detail: "Create your character and join the civilization. Remember — the meteor is coming!" }
    ],
    configFiles: [
      {
        file: "Network.eco",
        settings: [
          { name: "PublicServer", description: "Show in public server list", default: "true" },
          { name: "ServerName", description: "Server name in the browser", default: "ECO Server" },
          { name: "Password", description: "Password to join", default: "" },
          { name: "MaxPlayers", description: "Maximum concurrent players", default: "16" },
          { name: "Rate", description: "Game speed multiplier", default: "20" }
        ]
      },
      {
        file: "WorldGenerator.eco",
        settings: [
          { name: "WorldSize", description: "World dimensions (length of each side)", default: "100" },
          { name: "MeteorImpactDays", description: "Days until meteor impact", default: "30" }
        ]
      }
    ],
    faq: [
      { question: "How does the meteor timer work?", answer: "The meteor strikes after a set number of real-time days (default 30). Players must collaborate to build technology to destroy it before impact." },
      { question: "How does the government system work?", answer: "Players can create laws, vote on proposals, and elect officials. Configure government settings in the server files." },
      { question: "Can I disable the meteor?", answer: "Yes, set MeteorImpactDays to 0 in WorldGenerator.eco for a sandbox experience without the meteor threat." },
      { question: "How do I reset the economy?", answer: "This requires a world reset. Stop the server, delete the save data, and restart for a fresh start." }
    ],
    troubleshooting: [
      { problem: "Server takes long to generate world", solution: "ECO world generation is CPU-intensive. First startup with a large world can take 5-10 minutes." },
      { problem: "\"Version mismatch\" when connecting", solution: "Ensure your ECO client is updated to match the server version. Both must be identical." },
      { problem: "Laws and government not working", solution: "The government system requires a minimum number of online players to function. Check the minimum voter settings in the config." },
      { problem: "Server running slowly over time", solution: "ECO servers can slow down as the world develops. Consider reducing world size or restarting the server periodically." }
    ],
    adminCommands: [
      { command: "/admin <player>", description: "Grant admin privileges to a player" },
      { command: "/kick <player>", description: "Kick a player" },
      { command: "/ban <player>", description: "Ban a player" },
      { command: "/give <player> <item> <amount>", description: "Give items to a player" },
      { command: "/day <number>", description: "Set the current day number" }
    ]
  },

  "garrys-mod": {
    connectionSteps: [
      { title: "Get Your Server Details", detail: "Log into panel.pocketburrito.ca and copy your server IP and port from the Console tab." },
      { title: "Launch Garry's Mod", detail: "Open Garry's Mod through Steam." },
      { title: "Open Console", detail: "Press the tilde key (~) to open the developer console. If it's not enabled, go to Options → Advanced → Enable Developer Console." },
      { title: "Connect via Console", detail: "Type: connect <IP:Port> and press Enter. Example: connect 5.78.100.72:27015" },
      { title: "Alternative: Server Browser", detail: "Open the Legacy Browser from the main menu, click \"Favorites\", add your server IP, then connect." }
    ],
    configFiles: [
      {
        file: "server.cfg",
        settings: [
          { name: "hostname", description: "Server name in the browser", default: "Garry's Mod Server" },
          { name: "sv_password", description: "Password to join (blank = no password)", default: "" },
          { name: "maxplayers", description: "Maximum concurrent players", default: "16" },
          { name: "gamemode", description: "Active game mode (sandbox, darkrp, ttt, etc.)", default: "sandbox" },
          { name: "sv_defaultgamemode", description: "Default game mode on map change", default: "sandbox" },
          { name: "sv_allowdownload", description: "Allow clients to download custom content", default: "1" }
        ]
      }
    ],
    faq: [
      { question: "How do I change the game mode?", answer: "Set the gamemode variable in server.cfg or the Startup tab. Popular modes include Sandbox, DarkRP, TTT, Murder, and Prop Hunt." },
      { question: "How do I add Workshop addons?", answer: "Create a Workshop collection on Steam, then add the collection ID to your server's startup configuration. The server downloads addons automatically." },
      { question: "How do I install DarkRP?", answer: "Change the gamemode to darkrp in the Startup tab. Upload DarkRP addon files or use Workshop collections. Configure jobs in darkrp_modules." },
      { question: "How do I add custom maps?", answer: "Upload .bsp map files to the /maps folder via File Manager, or use Workshop maps by adding them to your collection. Change the map in startup parameters." },
      { question: "Why do players see ERROR signs and purple textures?", answer: "Players need the same content (CSS, HL2 textures). Set up a FastDL server or Workshop collection for content delivery." }
    ],
    troubleshooting: [
      { problem: "\"Missing map\" error when joining", solution: "Ensure sv_allowdownload is set to 1 in server.cfg. If using custom maps, set up a Workshop collection or FastDL." },
      { problem: "Addons not loading", solution: "Verify Workshop collection ID is correct in startup configuration. Check the console for download errors. Restart the server after adding new addons." },
      { problem: "Players seeing ERROR models and textures", solution: "Create a Workshop collection with all required content and set it as the server's content pack. Players will auto-download on connect." },
      { problem: "Server crashing with many addons", solution: "Remove conflicting addons. Lua errors in the console can indicate which addon is causing issues. Reduce total addon count." },
      { problem: "High ping or lag spikes", solution: "Reduce maxplayers, remove unnecessary addons, and lower the tick rate if set too high. Ensure adequate RAM for your addon count." }
    ],
    modSupport: "Garry's Mod has extensive Workshop support. Create a Steam Workshop collection with your addons and set the collection ID in the server startup. Addons auto-download for players. You can also manually upload Lua addons to the /addons folder. Popular frameworks: DarkRP, TTT, Pointshop.",
    adminCommands: [
      { command: "ulx adduser <player> superadmin", description: "Add an admin via ULX admin mod" },
      { command: "ulx kick <player> [reason]", description: "Kick a player (ULX)" },
      { command: "ulx ban <player> <minutes> [reason]", description: "Ban a player (ULX)" },
      { command: "rcon_password <password>", description: "Set the RCON password for remote access" },
      { command: "changelevel <map>", description: "Change the current map" }
    ]
  }
};
