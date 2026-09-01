// Types
export interface Game { 
  id: string; 
  title: string; 
  genre: string; 
  engine: string; 
  language: string; 
  description: string; 
  longDescription: string; 
  techStack: string[]; 
  platforms: string[]; 
  year: string;
  image: string;
  screenshots?: string[]; // Gallery images revealed from the 3D case
  videoUrl?: string; // For the modal background
  downloadUrl?: string; // For the download button
  features?: string[];
  challenges?: { problem: string; solution: string }[];
}
export interface ToolItem { name: string; category: string; icon: string; color: string; logo: string; }
export interface SkillCategory { title: string; icon: string; items: string[]; }
export interface Stat { value: string; label: string; }
export interface NavLink { label: string; href: string; }
export interface SocialLink { platform: string; url: string; icon: string; }

export interface Project { 
  id: string; 
  title: string; 
  type: string; 
  description: string; 
  longDescription: string; 
  techStack: string[]; 
  liveUrl?: string; 
  sourceUrl?: string; 
  year: string; 
  image: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export const games: Game[] = [
  {
    id: "1",
    title: "Kero Bot",
    genre: "2D Platformer",
    engine: "Godot",
    language: "GDScript",
    year: "2024",
    image: "/games/images/Screenshot_20260822_190853_KERO BOT.jpg",
    screenshots: [
      "/games/images/Screenshot_20260822_190853_KERO BOT.jpg",
      "/games/images/Screenshot_20260822_190930_KERO BOT.jpg",
      "/games/images/Screenshot_20260822_191111_KERO BOT.jpg",
      "/games/images/Screenshot_20260822_191118_KERO BOT.jpg"
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    downloadUrl: "/games/kero-bot.apk",
    description: "A 2D pixel-art platformer where you guide a frog robot through challenging levels filled with enemies, collectibles, and obstacles.",
    longDescription: "Kero Bot is a classic-style 2D platformer built in Godot Engine. Players control a small frog robot navigating through multiple themed levels — from grassy outdoor areas to underground caves and twilight skies. The game features touch-based controls with directional buttons and a jump mechanic, collectible cherries for scoring, enemy mushrooms to avoid, and a health system with heart-based lives.",
    techStack: ["Godot", "GDScript", "Pixel Art", "Mobile Input"],
    platforms: ["Android"],
    features: [
      "Touch-based directional controls & jump button",
      "Multi-level progression with unique themed environments",
      "Points system with cherry collectibles",
      "Health system with heart-based lives",
      "Enemy mushroom AI with patrol behavior",
      "Pause menu with resume & main menu options"
    ],
    challenges: [
      {
        problem: "Making responsive touch controls that feel precise on mobile devices",
        solution: "Implemented custom touch input zones with adjustable dead zones and immediate response to directional and jump inputs"
      }
    ]
  },
  {
    id: "2",
    title: "Pirates Maker",
    genre: "2D Platformer",
    engine: "Python / Pygame",
    language: "Python",
    year: "2024",
    image: "/games/images/Screenshot_20260822_192057_Pirates Maker.jpg",
    screenshots: [
      "/games/images/Screenshot_20260822_192057_Pirates Maker.jpg",
      "/games/images/Screenshot_20260822_192115_Pirates Maker.jpg",
      "/games/images/Screenshot_20260822_192132_Pirates Maker.jpg"
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    downloadUrl: "/games/pirates-maker.apk",
    description: "A 2D pirate-themed platformer built with Python & Pygame, featuring sword combat, 6 handcrafted levels, and a world map navigation system.",
    longDescription: "Pirates Maker is a pixel-art 2D platformer developed entirely in Python using the Pygame library. Players take on the role of a swashbuckling pirate navigating through 6 distinct island levels connected by a world map. The game features sword-based combat against enemy robots, palm-tree-filled tropical environments, platforming challenges across floating stone islands, and a timer-based scoring system.",
    techStack: ["Python", "Pygame", "Sprite Animation", "Custom Engine"],
    platforms: ["PC"],
    features: [
      "Sword-based combat with enemy AI",
      "6 handcrafted levels with unique layouts",
      "World map navigation with level connections",
      "Timer-based scoring & Game Over stats",
      "Touch & keyboard controls with jump mechanics",
      "Pixel-art pirate theme with tropical environments"
    ],
    challenges: [
      {
        problem: "Building a full game engine from scratch without a dedicated game framework",
        solution: "Implemented custom game loop, collision detection, sprite management, and scene transitions using only Pygame primitives"
      }
    ]
  },
  {
    id: "3",
    title: "Fire-Hits",
    genre: "Action-Defense",
    engine: "Unity",
    language: "C#",
    year: "2025",
    image: "/games/images/Screenshot_20260822_192904_fire-hits.jpg",
    screenshots: [
      "/games/images/Screenshot_20260822_192904_fire-hits.jpg",
      "/games/images/Screenshot_20260822_192911_fire-hits.jpg",
      "/games/images/Screenshot_20260822_192916_fire-hits.jpg",
      "/games/images/Screenshot_20260822_192920_fire-hits.jpg",
      "/games/images/Screenshot_20260822_192934_fire-hits.jpg"
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    downloadUrl: "/games/fire-hits.apk",
    description: "A thrilling 2D action-defense adventure built in Unity where you protect Queen Isolde by slaying waves of undead skeletons.",
    longDescription: "Fire-Hits is a 2D action-defense game built in Unity Engine for Android. Players take on the role of a warrior tasked with protecting Queen Isolde from waves of attacking skeleton enemies in a dark, atmospheric forest setting. The game features real-time combat with a sword attack system, directional movement controls, a kill counter to track your score, and a survival timer.",
    techStack: ["Unity", "C#", "Object Pooling", "Mobile Controls"],
    platforms: ["Android"],
    features: [
      "Real-time sword combat against skeleton waves",
      "Kill counter & survival timer HUD",
      "Directional movement with attack button",
      "Dark atmospheric pixel-art forest environment",
      "Full menu system — pause, resume, main menu, quit"
    ],
    challenges: [
      {
        problem: "Managing multiple enemy waves spawning from both sides simultaneously",
        solution: "Implemented an object pooling system with directional spawn points and wave difficulty scaling based on survival time"
      },
      {
        problem: "Creating responsive touch combat that feels satisfying on mobile",
        solution: "Fine-tuned attack hitbox timing, added hit feedback animations, and optimized input detection for simultaneous move + attack actions"
      }
    ]
  },
  {
    id: "4",
    title: "PolyRace",
    genre: "3D Racing",
    engine: "Unity",
    language: "C#",
    year: "2025",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop"
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    downloadUrl: "#", // In development
    description: "A high-speed 3D low-poly racing game built in Unity featuring hovercraft vehicles, desert tracks, and time attack modes.",
    longDescription: "PolyRace is a 3D racing game built in Unity with a stunning low-poly art style. Players pilot futuristic hovercrafts at extreme speeds (600+ km/h) through procedurally styled desert canyon tracks. The game features a full HUD with speedometer, distance tracker, and precision lap timer. It includes a training mode with hovercraft selection, level selection, and race type options.",
    techStack: ["Unity", "C#", "3D Physics", "Low Poly Art"],
    platforms: ["PC"],
    features: [
      "High-speed hovercraft racing at 600+ km/h",
      "Low-poly desert canyon environments",
      "Precision speedometer & lap timer HUD",
      "Training mode with vehicle & track selection",
      "Full settings system — audio, video, resolution"
    ],
    challenges: [
      {
        problem: "Achieving smooth high-speed movement without physics jitter at 600+ km/h",
        solution: "Implemented custom hovercraft physics with fixed-timestep updates, interpolation, and camera smoothing to maintain fluid visuals at extreme speeds"
      }
    ]
  }
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'NeuralFlow',
    type: 'AI Agent Platform',
    description: 'Distributed orchestration platform for autonomous AI agents.',
    longDescription: 'A highly scalable orchestration system designed to manage and monitor autonomous AI agents in real-time. Built with a robust microservices architecture.',
    techStack: ['Next.js', 'Python', 'LangChain', 'Kubernetes'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Meridian',
    type: 'SaaS Dashboard',
    description: 'Real-time analytics dashboard processing millions of events.',
    longDescription: 'An enterprise-grade analytics dashboard that processes and visualizes high-throughput telemetry data in real-time.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop'
  }
];

export const historyTimeline: TimelineEvent[] = [
  {
    year: '2024',
    title: 'Started Game Development',
    description: 'Took my first steps into game programming using Godot, learning the core fundamentals of game logic, scene trees, and node-based architectures.'
  },
  {
    year: '2024 – 2025',
    title: 'Built First Game',
    description: 'Designed and programmed my initial complete game project, focusing on player controls, core loops, and UI integration.'
  },
  {
    year: '2025',
    title: 'Learned Unity',
    description: 'Expanded into Unity to master C# scripting, 3D asset workflows, component systems, and performance optimization techniques.'
  },
  {
    year: '2025',
    title: 'Learned Unreal Engine',
    description: 'Dived into Unreal Engine to work with advanced rendering features, materials, physics systems, and Blueprint/C++ integration.'
  },
  {
    year: '2025 – 2026',
    title: 'Built Additional Games',
    description: 'Developed and released 4 to 5 complete titles across different genres, refining game mechanics, level design, and system architecture.'
  },
  {
    year: 'Present',
    title: 'Building High-Graphics 3D Racing Game',
    description: 'Currently building a high-fidelity 3D racing game featuring realistic vehicle physics, dynamic lighting, and optimized real-time rendering.'
  }
];

// Drop transparent PNG logos at public/logos/<icon>.png to light these up.
// Until then, each card falls back to a color-tinted monogram automatically.
export const tools: ToolItem[] = [
  { name: 'Unity', category: 'Game Engines', icon: 'unity', color: '#2196F3', logo: '/logos/unity.png' },
  { name: 'Unreal Engine', category: 'Game Engines', icon: 'unreal', color: '#1FA2FF', logo: '/logos/unreal.png' },
  { name: 'Blender', category: '3D & Modeling', icon: 'blender', color: '#EA7600', logo: '/logos/blender.png' },
  { name: 'Cinema 4D', category: '3D & Modeling', icon: 'cinema4d', color: '#5B4BFF', logo: '/logos/cinema4d.png' },
  { name: 'Autodesk Maya', category: '3D & Modeling', icon: 'maya', color: '#0696D7', logo: '/logos/maya.png' },
  { name: 'Adobe After Effects', category: 'Post-Production', icon: 'aftereffects', color: '#9D5CFF', logo: '/logos/aftereffects.png' },
  { name: 'DaVinci Resolve', category: 'Post-Production', icon: 'resolve', color: '#E64A19', logo: '/logos/resolve.png' },
  { name: 'C#', category: 'Languages', icon: 'csharp', color: '#A179DC', logo: '/logos/csharp.png' },
  { name: 'C++', category: 'Languages', icon: 'cpp', color: '#00599C', logo: '/logos/cpp.png' },
  { name: 'HLSL/GLSL', category: 'Languages', icon: 'shader', color: '#FF4088', logo: '/logos/shader.png' }
];

export const skills: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: 'layout',
    items: ['React', 'Next.js', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Three.js']
  },
  {
    title: 'Backend',
    icon: 'server',
    items: ['Node.js', 'Python', 'Express', 'FastAPI', 'GraphQL', 'REST']
  },
  {
    title: 'Data & AI/ML',
    icon: 'database',
    items: ['PyTorch', 'TensorFlow', 'LangChain', 'Pandas', 'NumPy']
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub Actions']
  },
  {
    title: 'Systems',
    icon: 'cpu',
    items: ['PostgreSQL', 'Redis', 'MongoDB', 'Kafka', 'gRPC', 'WebSocket']
  }
];

export const stats: Stat[] = [
  { value: '4+', label: 'Games Shipped' },
  { value: '20+', label: 'Projects Built' },
  { value: '5+', label: 'Years Experience' },
  { value: '10+', label: 'Tools Mastered' }
];

export const navLinks: NavLink[] = [
  { label: 'Games', href: '#games' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/placeholder', icon: 'github' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/placeholder', icon: 'linkedin' },
  { platform: 'Twitter/X', url: 'https://twitter.com/placeholder', icon: 'twitter' },
  { platform: 'Itch.io', url: 'https://placeholder.itch.io', icon: 'itchio' },
  { platform: 'Email', url: 'mailto:hello@example.com', icon: 'mail' }
];

export const narrativeText: string = "I build worlds and I build systems. From real-time 3D environments crafted in Unity and Unreal Engine to distributed cloud architectures and intelligent AI pipelines. Every project starts with the same question: how do we make this feel alive? Whether it's the procedural lighting in a horror game or the real-time data streaming in a SaaS dashboard, I obsess over the details that transform good software into unforgettable experiences. Code is my medium. Impact is the measure.";

