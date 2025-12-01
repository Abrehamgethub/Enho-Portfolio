'use client'

import Image from 'next/image'

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <Image 
      src="/logo.png"
      alt="እነሆ እኛ Logo"
      width={100}
      height={100}
      className={className}
    />
  )
}

export function LogoWithText({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizes = {
    small: { logo: "w-8 h-8", text: "text-lg" },
    default: { logo: "w-10 h-10", text: "text-xl" },
    large: { logo: "w-16 h-16", text: "text-3xl" }
  }
  
  const s = sizes[size]
  
  return (
    <div className="flex items-center gap-2">
      <Logo className={s.logo} />
      <div className="flex flex-col leading-none">
        <span className={`font-heading font-bold ${s.text} text-secondary-900`}>
          እነሆ<span className="text-primary-500"> እኛ</span>
        </span>
        <span className="text-[10px] text-secondary-500 tracking-widest uppercase">Eneho Egna</span>
      </div>
    </div>
  )
}

export function LogoAlt({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 120 50" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stylized እኛ text representation */}
      <g fill="#0d9488">
        {/* First letter - stylized */}
        <rect x="5" y="10" width="6" height="30" rx="1"/>
        <rect x="5" y="10" width="20" height="6" rx="1"/>
        <rect x="19" y="10" width="6" height="18" rx="1"/>
        <rect x="5" y="34" width="20" height="6" rx="1"/>
        
        {/* Second letter */}
        <rect x="32" y="10" width="6" height="30" rx="1"/>
        <rect x="32" y="10" width="20" height="6" rx="1"/>
        <rect x="46" y="10" width="6" height="30" rx="1"/>
        <rect x="32" y="22" width="20" height="6" rx="1"/>
        
        {/* Third letter */}
        <rect x="60" y="10" width="6" height="30" rx="1"/>
        <rect x="60" y="10" width="25" height="6" rx="1"/>
        <rect x="79" y="10" width="6" height="16" rx="1"/>
        <rect x="60" y="34" width="25" height="6" rx="1"/>
        <rect x="79" y="24" width="6" height="16" rx="1"/>
      </g>
      
      {/* Microphone icon */}
      <circle cx="105" cy="25" r="15" fill="#086058"/>
      <rect x="101" y="15" width="8" height="15" rx="4" fill="white"/>
      <rect x="103" y="30" width="4" height="5" fill="white"/>
      <rect x="99" y="34" width="12" height="3" rx="1" fill="white"/>
    </svg>
  )
}
