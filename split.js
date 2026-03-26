const fs = require('fs');

const inPath = '/Users/dawitg/Desktop/Enho-Portfolio/app/page.tsx';
const outDir = '/Users/dawitg/Desktop/Enho-Portfolio/components/sections';
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, { recursive: true }); }

const code = fs.readFileSync(inPath, 'utf8');

function extract(name) {
  const startStr = `function ${name}(`;
  const startIdx = code.indexOf(startStr);
  if (startIdx === -1) return null;
  const remaining = code.slice(startIdx);
  const nextFuncMatch = remaining.match(new RegExp('\\n(function |export default function |interface |// Helper function)'));
  const endIdx = nextFuncMatch ? nextFuncMatch.index : remaining.length;
  return remaining.substring(0, endIdx).trim();
}

function extractInterface(name) {
  const startStr = `interface ${name} {`;
  const startIdx = code.indexOf(startStr);
  if (startIdx === -1) return '';
  const remaining = code.slice(startIdx);
  const nextFuncMatch = remaining.match(new RegExp('\\n(function |export default function )'));
  const endIdx = nextFuncMatch ? nextFuncMatch.index : remaining.length;
  return remaining.substring(0, endIdx).trim() + "\\n\\n";
}

function extractHelpers() {
  const startIdx = code.indexOf('// Helper function to extract YouTube video ID');
  const endIdx = code.indexOf('interface GuestData {');
  return code.substring(startIdx, endIdx).trim() + "\\n\\n";
}

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

const components = [
  'Navigation', 'HeroSection', 'AboutSection', 'TeamSection', 'ImpactSection', 
  'CertificatesSection', 'ServicesSection', 'PreviousGuestsSection', 'PartnersSection', 
  'PodcastSection', 'LatestUpdates', 'ContactSection', 'Footer'
];

components.forEach(name => {
  let compCode = extract(name);
  if (!compCode) return;
  
  compCode = compCode.replace(`function ${name}`, `export default function ${name}`);
  let fileContent = imports;
  
  if (name === 'PreviousGuestsSection') {
    fileContent += extractHelpers() + extractInterface('GuestData');
  } else if (name === 'PartnersSection') {
    fileContent += extractHelpers() + extractInterface('SponsorData');
  } else if (name === 'PodcastSection') {
    fileContent += `import { FeaturedVideoPlayer } from './FeaturedVideoPlayer'\\n`;
  }
  
  fileContent += '\\n' + compCode;
  fs.writeFileSync(`${outDir}/${name}.tsx`, fileContent);
  console.log(`Extracted ${name}.tsx`);
});

// FeaturedVideoPlayer
let fVP = extract('FeaturedVideoPlayer');
if (fVP) {
  fVP = fVP.replace('function FeaturedVideoPlayer', 'export function FeaturedVideoPlayer');
  let fFile = imports + extractInterface('Platform') + '\\n' + fVP;
  fs.writeFileSync(`${outDir}/FeaturedVideoPlayer.tsx`, fFile);
  console.log('Extracted FeaturedVideoPlayer.tsx');
}
