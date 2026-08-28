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
}

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

export interface ToolItem {
  name: string;
  category: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  items: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export const games: Game[] = [
  {
    id: 'phantom-divide',
    title: 'Phantom Divide',
    genre: 'Survival Horror',
    engine: 'Unity',
    language: 'C#',
    description: 'A psychological survival horror game pushing graphical fidelity in Unity.',
    longDescription: 'Phantom Divide plunges players into an isolated research facility where reality bends around them. Using advanced rendering techniques via HDRP, the game dynamically shifts its environment based on player actions. Lighting is not just aesthetic, it is a core gameplay mechanic.\n\nThe project features a bespoke inventory and crafting system, intelligent AI that learns from player habits, and a procedural event system that ensures no two playthroughs are the same. Engineered for high performance on both PC and modern consoles.',
    techStack: ['HDRP', 'Shader Graph', 'Wwise', 'ProBuilder'],
    platforms: ['PC', 'Console'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'velocity-apex',
    title: 'Velocity Apex',
    genre: 'Arcade Racing',
    engine: 'Unreal Engine',
    language: 'C++',
    description: 'A high-octane arcade racing experience with deep vehicle customization.',
    longDescription: 'Velocity Apex brings back the golden era of arcade racers, modernized with Unreal Engine 5. Leveraging the Chaos Physics engine, vehicles feel heavy yet responsive. Every drift, crash, and boost is calculated in real-time, accompanied by stunning Niagara VFX.\n\nThe game includes a robust custom shader library to render rain, neon lights, and metallic surfaces realistically while maintaining 60 FPS on lower-end hardware. The multiplayer architecture supports up to 16 players seamlessly.',
    techStack: ['Chaos Physics', 'Niagara VFX', 'Custom Shaders'],
    platforms: ['PC', 'Console'],
    year: '2023',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'lumina',
    title: 'Lumina',
    genre: 'Puzzle Platformer',
    engine: 'Unity',
    language: 'C#',
    description: 'A beautiful puzzle platformer focusing on light manipulation and atmosphere.',
    longDescription: 'Lumina tasks players with guiding a fragile spark of light through a ruined world. Using Unity URP, we developed a custom lighting system that allows the player to paint the environment with illuminated colors, which act as physical platforms.\n\nDesigned primarily with ProBuilder and polished using Cinemachine for dynamic camera tracking, the game provides a seamless, immersive experience across platforms from high-end PCs to mobile devices via WebGL and native builds.',
    techStack: ['URP', 'Custom Lighting System', 'ProBuilder', 'Cinemachine'],
    platforms: ['PC', 'WebGL', 'Mobile'],
    year: '2023',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'iron-protocol',
    title: 'Iron Protocol',
    genre: 'Multiplayer Arena Shooter',
    engine: 'Unreal Engine',
    language: 'C++',
    description: 'A fast-paced multiplayer arena shooter emphasizing verticality and precision.',
    longDescription: 'Iron Protocol redefines the arena shooter genre by introducing grappling mechanics and zero-G zones. Built entirely in C++ within Unreal Engine, it features a custom netcode implementation to ensure minimal latency during high-speed engagements.\n\nThe backend relies on Epic Online Services (EOS) for matchmaking, lobbies, and dedicated server orchestration. Comprehensive anti-cheat and robust state replication guarantee competitive integrity at all times.',
    techStack: ['Dedicated Servers', 'EOS', 'Replication', 'Anti-Cheat'],
    platforms: ['PC'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  }
];

export const projects: Project[] = [
  {
    id: 'neuralflow',
    title: 'NeuralFlow',
    type: 'AI Agent Platform',
    description: 'A scalable platform for deploying and orchestrating intelligent AI agents.',
    longDescription: 'NeuralFlow provides a robust infrastructure for building and deploying LangChain-powered AI agents. It features a Next.js frontend for monitoring agent activities in real-time via WebSockets and a Python backend for heavy lifting.',
    techStack: ['Next.js', 'Python', 'LangChain', 'Kubernetes', 'Redis', 'WebSocket'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'meridian',
    title: 'Meridian',
    type: 'Real-time SaaS Dashboard',
    description: 'A high-performance SaaS dashboard for real-time analytics and data visualization.',
    longDescription: 'Meridian processes millions of data points, streaming them directly to a responsive React frontend. Utilizing GraphQL and WebSockets, users get live updates with zero refresh required, backed by an optimized PostgreSQL and Redis stack.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'GraphQL', 'WebSocket'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'synthwave',
    title: 'Synthwave',
    type: 'ML Training Pipeline',
    description: 'An automated machine learning training pipeline for computer vision models.',
    longDescription: 'Synthwave streamlines the ML lifecycle from data ingestion to model deployment. Built on PyTorch and orchestrated via AWS SageMaker and MLflow, it allows researchers to reproduce experiments seamlessly in isolated Docker containers.',
    techStack: ['Python', 'PyTorch', 'Docker', 'AWS SageMaker', 'MLflow'],
    year: '2023',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'archway',
    title: 'Archway',
    type: 'CLI Development Toolkit',
    description: 'A comprehensive toolkit for building modular Command Line Interfaces.',
    longDescription: 'Archway is an open-source framework written in TypeScript and Go that simplifies CLI development. It features a robust plugin architecture, making it easy for developers to extend functionality and build complex tooling quickly.',
    techStack: ['TypeScript', 'Node.js', 'Go', 'Plugin Architecture'],
    year: '2023',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  }
];

export const tools: ToolItem[] = [
  { name: 'Unity', category: 'Game Engines', icon: 'unity' },
  { name: 'Unreal Engine', category: 'Game Engines', icon: 'unreal' },
  { name: 'Blender', category: '3D & Modeling', icon: 'blender' },
  { name: 'Cinema 4D', category: '3D & Modeling', icon: 'cinema4d' },
  { name: 'Autodesk Maya', category: '3D & Modeling', icon: 'maya' },
  { name: 'Adobe After Effects', category: 'Post-Production', icon: 'aftereffects' },
  { name: 'DaVinci Resolve', category: 'Post-Production', icon: 'resolve' },
  { name: 'C#', category: 'Languages', icon: 'csharp' },
  { name: 'C++', category: 'Languages', icon: 'cpp' },
  { name: 'HLSL/GLSL', category: 'Languages', icon: 'shader' }
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
