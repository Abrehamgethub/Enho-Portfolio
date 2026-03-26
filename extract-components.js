const fs = require('fs');
const path = require('path');

const filePath = '/Users/dawitg/Desktop/Enho-Portfolio/app/page.tsx';
const content = fs.readFileSync(filePath, 'utf-8');

// Basic shared imports for all client components
const imports = `// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Stethoscope, Users, Mic, Heart, GraduationCap, Youtube, Facebook, 
  Linkedin, Instagram, Mail, Phone, MapPin, ChevronRight, Play, 
  Award, BookOpen, Activity, Globe, Send, Star 
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { FadeInUp, FadeInLeft, FadeInRight, ScaleIn, StaggerContainer, StaggerItem, HoverScale } from '@/components/Animations'
import ContactForm from '@/components/ContactForm'
import PodcastEpisodes from '@/components/PodcastEpisodes'
`;

// Helper functions that some components need
const helpers = `// Helper function to extract YouTube video ID
function getYouTubeVideoId(url?: string): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\\/|v\\/|u\\/\\w\\/|embed\\/|watch\\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  if (match && match[2].length === 11) {
    return match[2]
  }
  return null
}

// Get YouTube thumbnail - use hqdefault as it's always available
function getYouTubeThumbnail(url?: string): string | null {
  const videoId = getYouTubeVideoId(url)
  if (videoId) {
    // Use hqdefault (480x360) as it's always available for all videos
    return \`https://img.youtube.com/vi/\${videoId}/hqdefault.jpg\`
  }
  return null
}
`;

// Interfaces
const guestInterface = `
export interface GuestData {
  _id: string
  name: string
  nameAmharic?: string
  title?: string
  profession?: string
  photo?: string
  photos?: string[]
  description?: string
  episodeUrl?: string
  programName?: string
  featured?: boolean
}
`;

const sponsorInterface = `
export interface SponsorData {
  _id: string
  name: string
  nameAmharic?: string
  logo?: string
  description?: string
  website?: string
  programType?: string
  programName?: string
  episodeUrl?: string
  photos?: string[]
  impact?: string
  featured?: boolean
}
`;

const getComponentBody = (name) => {
  const regex = new RegExp(\`function \${name}\\\\s*\\\\(.*?\\\\)\\\\s*\\\\{[\\\\s\\\\S]*?\\n(?=// |function |export default function)\`, 'g');
  const match = regex.exec(content);
  return match ? match[0].trim() : null;
};

// Also let's extract FeaturedVideoPlayer
const getFeaturedVideo = () => {
  const regex = new RegExp(\`interface Platform[\\\\s\\\\S]*?function FeaturedVideoPlayer[\\\\s\\\\S]*?\\n(?=// )\`, 'g');
  const match = regex.exec(content);
  return match ? match[0].trim() : null;
};

const components = [
  { name: 'Navigation', code: getComponentBody('Navigation') },
  { name: 'HeroSection', code: getComponentBody('HeroSection') },
  { name: 'AboutSection', code: getComponentBody('AboutSection') },
  { name: 'TeamSection', code: getComponentBody('TeamSection') },
  { name: 'ImpactSection', code: getComponentBody('ImpactSection') },
  { name: 'CertificatesSection', code: getComponentBody('CertificatesSection') },
  { name: 'ServicesSection', code: getComponentBody('ServicesSection') },
  { 
    name: 'PreviousGuestsSection', 
    code: guestInterface + '\\n' + helpers + '\\n' + getComponentBody('PreviousGuestsSection'), 
    extraImports: '' 
  },
  { 
    name: 'PartnersSection', 
    code: sponsorInterface + '\\n' + helpers + '\\n' + getComponentBody('PartnersSection'), 
    extraImports: '' 
  },
  { name: 'FeaturedVideoPlayer', code: getFeaturedVideo() },
  { name: 'PodcastSection', code: getComponentBody('PodcastSection'), needsFeaturedVideo: true },
  { name: 'LatestUpdates', code: getComponentBody('LatestUpdates') },
  { name: 'ContactSection', code: getComponentBody('ContactSection') },
  { name: 'Footer', code: getComponentBody('Footer') },
];

const dir = '/Users/dawitg/Desktop/Enho-Portfolio/components/sections';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

for (const comp of components) {
  if (comp.code) {
    let fileContent = imports;
    if (comp.needsFeaturedVideo) {
      fileContent += \`\\nimport { FeaturedVideoPlayer } from './FeaturedVideoPlayer'\\n\`;
    }
    // ensure export default for the main component
    let finalCode = comp.code.replace(new RegExp(\`function \${comp.name}\`), \`export default function \${comp.name}\`);
    if (comp.name === 'FeaturedVideoPlayer') {
        finalCode = comp.code.replace('function FeaturedVideoPlayer', 'export function FeaturedVideoPlayer');
    }

    fileContent += '\\n' + finalCode;
    
    fs.writeFileSync(path.join(dir, \`\${comp.name}.tsx\`), fileContent);
    console.log(\`Extracted \${comp.name}.tsx\`);
  } else {
    console.log(\`Could not find \${comp.name}\`);
  }
}
