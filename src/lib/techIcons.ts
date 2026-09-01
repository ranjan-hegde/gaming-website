import { Smartphone, Palette, Film, Cog, Layers, Box, Hexagon, Code, Video } from 'lucide-react';
import { 
  SiUnity, SiGodotengine, SiPython, SiUnrealengine, SiBlender, 
  SiCinema4D, SiAutodeskmaya, SiCplusplus 
} from 'react-icons/si';

const techMap: Record<string, { icon: React.ElementType, color: string }> = {
  // Game Engines
  "Unity": { icon: SiUnity, color: "#8E8E8E" }, 
  "Unreal Engine": { icon: SiUnrealengine, color: "#FFFFFF" },
  "Godot": { icon: SiGodotengine, color: "#478CBF" },
  
  // Languages
  "Python": { icon: SiPython, color: "#3776AB" },
  "Pygame": { icon: SiPython, color: "#3776AB" },
  "C#": { icon: Code, color: "#239120" },
  "C++": { icon: SiCplusplus, color: "#00599C" },
  "GDScript": { icon: SiGodotengine, color: "#478CBF" },
  "HLSL/GLSL": { icon: Code, color: "#FF4088" },
  
  // 3D & Modeling
  "Blender": { icon: SiBlender, color: "#EA7600" },
  "Cinema 4D": { icon: SiCinema4D, color: "#5B4BFF" },
  "Autodesk Maya": { icon: SiAutodeskmaya, color: "#0696D7" },
  
  // Post-Production
  "Adobe After Effects": { icon: Film, color: "#9D5CFF" },
  "DaVinci Resolve": { icon: Video, color: "#E64A19" },

  // Concepts
  "Pixel Art": { icon: Palette, color: "#FF5252" },
  "Mobile Input": { icon: Smartphone, color: "#4CAF50" },
  "Mobile Controls": { icon: Smartphone, color: "#4CAF50" },
  "Sprite Animation": { icon: Film, color: "#E040FB" },
  "Custom Engine": { icon: Cog, color: "#607D8B" },
  "Object Pooling": { icon: Layers, color: "#00BCD4" },
  "3D Physics": { icon: Box, color: "#FF9800" },
  "Low Poly Art": { icon: Hexagon, color: "#9C27B0" },
};

export const getTechStyle = (tech: string) => {
  return techMap[tech] || { icon: Code, color: "#a1a1aa" }; // Default to zinc-400
};
