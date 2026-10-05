import React from 'react';

/**
 * CarBlueprintSilhouette
 * Provides realistic automotive blueprint line-art wireframes (silhouettes)
 * inspired by technical vehicle orthographic line drawings.
 * Dynamically adapts to shooting angle (Front-Left 45°, Front-Right 45°, Rear-Left 45°, Rear-Right 45°, Interior).
 */

export function FrontLeftSilhouette({ isAligned, strokeColor, strokeDash }) {
  return (
    <svg 
      className={`ghost-contour-svg ${isAligned ? 'locked' : 'aligning'}`} 
      viewBox="0 0 340 220" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* CAD Blueprint Grid Background Accents */}
      <g opacity={isAligned ? "0.35" : "0.2"} stroke={strokeColor} strokeWidth="0.8">
        {/* Frame corner alignment brackets */}
        <path d="M 20,40 L 20,20 L 40,20" />
        <path d="M 320,40 L 320,20 L 300,20" />
        <path d="M 20,180 L 20,200 L 40,200" />
        <path d="M 320,180 L 320,200 L 300,200" />
        
        {/* Sub-grid guide ticks */}
        <line x1="170" y1="15" x2="170" y2="25" />
        <line x1="170" y1="195" x2="170" y2="205" />
        <line x1="10" y1="110" x2="20" y2="110" />
        <line x1="320" y1="110" x2="330" y2="110" />
      </g>

      {/* Main Body Outer Silhouette */}
      <path 
        d="M 45,150 
           C 40,140 45,125 58,118 
           C 65,115 80,112 105,108 
           L 125,82 
           C 140,65 170,55 205,53 
           L 248,58 
           C 275,64 290,75 298,92 
           L 302,118 
           C 305,130 300,142 292,148 
           L 282,154 
           C 278,142 268,134 252,134 
           C 236,134 225,145 222,158 
           L 155,160 
           C 152,148 140,138 122,138 
           C 104,138 92,148 88,162 
           L 55,160 
           C 48,158 45,154 45,150 Z" 
        stroke={strokeColor} 
        strokeWidth="2.4" 
        strokeDasharray={strokeDash}
        strokeLinejoin="round"
      />

      {/* Windshield & Roof Frame */}
      <path 
        d="M 125,82 L 205,53 L 248,58 L 295,90 L 195,96 Z" 
        stroke={strokeColor} 
        strokeWidth="1.6" 
        strokeDasharray={strokeDash}
      />
      {/* A-Pillar & Windshield divider */}
      <path d="M 148,80 L 198,95" stroke={strokeColor} strokeWidth="1.2" strokeDasharray={strokeDash} />
      
      {/* Side Windows & B/C Pillars */}
      <path 
        d="M 198,96 L 248,58 L 278,63 L 290,92 L 205,96 Z" 
        stroke={strokeColor} 
        strokeWidth="1.4" 
      />
      {/* B-Pillar divider */}
      <line x1="242" y1="62" x2="246" y2="95" stroke={strokeColor} strokeWidth="1.5" />

      {/* Front Hood Contours */}
      <path d="M 70,118 Q 115,108 148,82" stroke={strokeColor} strokeWidth="1.3" />
      <path d="M 85,126 Q 130,115 190,98" stroke={strokeColor} strokeWidth="1.2" />

      {/* Headlights Detail */}
      {/* Left Headlight (Foreground) */}
      <path 
        d="M 60,122 C 72,118 88,118 96,128 C 90,134 75,136 62,132 Z" 
        stroke={strokeColor} 
        strokeWidth="1.8" 
      />
      <circle cx="78" cy="126" r="5" stroke={strokeColor} strokeWidth="1.2" />

      {/* Right Headlight (Angled Background) */}
      <path 
        d="M 160,104 C 172,102 185,105 190,112 C 182,116 170,116 162,112 Z" 
        stroke={strokeColor} 
        strokeWidth="1.4" 
      />

      {/* Front Grille & Air Dam */}
      <path d="M 75,135 Q 115,142 145,130" stroke={strokeColor} strokeWidth="1.6" />
      <path d="M 85,142 Q 115,148 138,138" stroke={strokeColor} strokeWidth="1.3" />
      {/* Toyota Center Oval Badge */}
      <ellipse cx="118" cy="128" rx="7" ry="5" stroke={strokeColor} strokeWidth="1.3" />

      {/* Side Mirror (Left) */}
      <path 
        d="M 142,86 C 132,84 125,88 126,94 C 128,98 138,98 144,93 Z" 
        stroke={strokeColor} 
        strokeWidth="1.6" 
      />
      <line x1="140" y1="92" x2="146" y2="95" stroke={strokeColor} strokeWidth="1.4" />

      {/* Wheel Arches & Wheels */}
      {/* Front-Left Wheel */}
      <circle cx="122" cy="162" r="23" stroke={strokeColor} strokeWidth="1.8" strokeDasharray={strokeDash} />
      <circle cx="122" cy="162" r="14" stroke={strokeColor} strokeWidth="1.4" />
      <circle cx="122" cy="162" r="5" stroke={strokeColor} strokeWidth="1.4" />
      {/* Wheel Spokes */}
      <line x1="122" y1="148" x2="122" y2="176" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="108" y1="162" x2="136" y2="162" stroke={strokeColor} strokeWidth="1.2" />

      {/* Rear Wheel (Perspective) */}
      <ellipse cx="252" cy="156" rx="19" ry="21" stroke={strokeColor} strokeWidth="1.6" strokeDasharray={strokeDash} />
      <ellipse cx="252" cy="156" rx="11" ry="13" stroke={strokeColor} strokeWidth="1.2" />

      {/* Door Shutlines & Handles */}
      <path d="M 198,96 L 195,158" stroke={strokeColor} strokeWidth="1.3" />
      <path d="M 248,96 L 244,142" stroke={strokeColor} strokeWidth="1.3" />
      {/* Door Handles */}
      <rect x="208" y="104" width="10" height="3" rx="1.5" stroke={strokeColor} strokeWidth="1.2" />
      <rect x="256" y="106" width="10" height="3" rx="1.5" stroke={strokeColor} strokeWidth="1.2" />

      {/* Target Reticle Crosshair */}
      <circle cx="170" cy="110" r="18" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="170" y1="84" x2="170" y2="136" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="144" y1="110" x2="196" y2="110" stroke={strokeColor} strokeWidth="1.2" />
    </svg>
  );
}

export function FrontRightSilhouette({ isAligned, strokeColor, strokeDash }) {
  return (
    <svg 
      className={`ghost-contour-svg ${isAligned ? 'locked' : 'aligning'}`} 
      viewBox="0 0 340 220" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* CAD Blueprint Grid Background Accents */}
      <g opacity={isAligned ? "0.35" : "0.2"} stroke={strokeColor} strokeWidth="0.8">
        <path d="M 20,40 L 20,20 L 40,20" />
        <path d="M 320,40 L 320,20 L 300,20" />
        <path d="M 20,180 L 20,200 L 40,200" />
        <path d="M 320,180 L 320,200 L 300,200" />
        <line x1="170" y1="15" x2="170" y2="25" />
        <line x1="170" y1="195" x2="170" y2="205" />
        <line x1="10" y1="110" x2="20" y2="110" />
        <line x1="320" y1="110" x2="330" y2="110" />
      </g>

      {/* Main Body Outer Silhouette (Mirrored/Flipped for Front-Right) */}
      <path 
        d="M 295,150 
           C 300,140 295,125 282,118 
           C 275,115 260,112 235,108 
           L 215,82 
           C 200,65 170,55 135,53 
           L 92,58 
           C 65,64 50,75 42,92 
           L 38,118 
           C 35,130 40,142 48,148 
           L 58,154 
           C 62,142 72,134 88,134 
           C 104,134 115,145 118,158 
           L 185,160 
           C 188,148 200,138 218,138 
           C 236,138 248,148 252,162 
           L 285,160 
           C 292,158 295,154 295,150 Z" 
        stroke={strokeColor} 
        strokeWidth="2.4" 
        strokeDasharray={strokeDash}
        strokeLinejoin="round"
      />

      {/* Windshield & Roof Frame */}
      <path 
        d="M 215,82 L 135,53 L 92,58 L 45,90 L 145,96 Z" 
        stroke={strokeColor} 
        strokeWidth="1.6" 
        strokeDasharray={strokeDash}
      />
      {/* A-Pillar */}
      <path d="M 192,80 L 142,95" stroke={strokeColor} strokeWidth="1.2" strokeDasharray={strokeDash} />

      {/* Side Windows & Pillars */}
      <path 
        d="M 142,96 L 92,58 L 62,63 L 50,92 L 135,96 Z" 
        stroke={strokeColor} 
        strokeWidth="1.4" 
      />
      <line x1="98" y1="62" x2="94" y2="95" stroke={strokeColor} strokeWidth="1.5" />

      {/* Front Hood Contours */}
      <path d="M 270,118 Q 225,108 192,82" stroke={strokeColor} strokeWidth="1.3" />
      <path d="M 255,126 Q 210,115 150,98" stroke={strokeColor} strokeWidth="1.2" />

      {/* Right Headlight (Foreground) */}
      <path 
        d="M 280,122 C 268,118 252,118 244,128 C 250,134 265,136 278,132 Z" 
        stroke={strokeColor} 
        strokeWidth="1.8" 
      />
      <circle cx="262" cy="126" r="5" stroke={strokeColor} strokeWidth="1.2" />

      {/* Left Headlight (Angled Background) */}
      <path 
        d="M 180,104 C 168,102 155,105 150,112 C 158,116 170,116 178,112 Z" 
        stroke={strokeColor} 
        strokeWidth="1.4" 
      />

      {/* Front Grille & Air Dam */}
      <path d="M 265,135 Q 225,142 195,130" stroke={strokeColor} strokeWidth="1.6" />
      <path d="M 255,142 Q 225,148 202,138" stroke={strokeColor} strokeWidth="1.3" />
      {/* Toyota Center Badge */}
      <ellipse cx="222" cy="128" rx="7" ry="5" stroke={strokeColor} strokeWidth="1.3" />

      {/* Side Mirror (Right) */}
      <path 
        d="M 198,86 C 208,84 215,88 214,94 C 212,98 202,98 196,93 Z" 
        stroke={strokeColor} 
        strokeWidth="1.6" 
      />
      <line x1="200" y1="92" x2="194" y2="95" stroke={strokeColor} strokeWidth="1.4" />

      {/* Front-Right Wheel */}
      <circle cx="218" cy="162" r="23" stroke={strokeColor} strokeWidth="1.8" strokeDasharray={strokeDash} />
      <circle cx="218" cy="162" r="14" stroke={strokeColor} strokeWidth="1.4" />
      <circle cx="218" cy="162" r="5" stroke={strokeColor} strokeWidth="1.4" />
      <line x1="218" y1="148" x2="218" y2="176" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="204" y1="162" x2="232" y2="162" stroke={strokeColor} strokeWidth="1.2" />

      {/* Rear Wheel (Left) */}
      <ellipse cx="88" cy="156" rx="19" ry="21" stroke={strokeColor} strokeWidth="1.6" strokeDasharray={strokeDash} />
      <ellipse cx="88" cy="156" rx="11" ry="13" stroke={strokeColor} strokeWidth="1.2" />

      {/* Door Shutlines & Handles */}
      <path d="M 142,96 L 145,158" stroke={strokeColor} strokeWidth="1.3" />
      <path d="M 92,96 L 96,142" stroke={strokeColor} strokeWidth="1.3" />
      <rect x="122" y="104" width="10" height="3" rx="1.5" stroke={strokeColor} strokeWidth="1.2" />
      <rect x="74" y="106" width="10" height="3" rx="1.5" stroke={strokeColor} strokeWidth="1.2" />

      {/* Target Reticle */}
      <circle cx="170" cy="110" r="18" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="170" y1="84" x2="170" y2="136" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="144" y1="110" x2="196" y2="110" stroke={strokeColor} strokeWidth="1.2" />
    </svg>
  );
}

export function RearLeftSilhouette({ isAligned, strokeColor, strokeDash }) {
  return (
    <svg 
      className={`ghost-contour-svg ${isAligned ? 'locked' : 'aligning'}`} 
      viewBox="0 0 340 220" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* CAD Blueprint Grid Accents */}
      <g opacity={isAligned ? "0.35" : "0.2"} stroke={strokeColor} strokeWidth="0.8">
        <path d="M 20,40 L 20,20 L 40,20" />
        <path d="M 320,40 L 320,20 L 300,20" />
        <path d="M 20,180 L 20,200 L 40,200" />
        <path d="M 320,180 L 320,200 L 300,200" />
        <line x1="170" y1="15" x2="170" y2="25" />
        <line x1="170" y1="195" x2="170" y2="205" />
      </g>

      {/* Main Body Outer Silhouette (Rear-Left 45°) */}
      <path 
        d="M 45,130 
           L 58,110 
           C 65,95 85,75 110,68 
           L 185,55 
           L 248,58 
           C 275,64 285,78 290,95 
           L 296,128 
           C 298,145 288,155 275,158 
           L 265,160 
           C 260,146 250,138 234,138 
           C 218,138 208,148 204,162 
           L 135,162 
           C 132,150 120,140 102,140 
           C 85,140 75,150 70,162 
           L 48,160 
           C 42,158 40,150 45,130 Z" 
        stroke={strokeColor} 
        strokeWidth="2.4" 
        strokeDasharray={strokeDash}
        strokeLinejoin="round"
      />

      {/* Hatchback Rear Window & Spoiler */}
      <path 
        d="M 248,58 L 290,95 L 260,108 L 210,102 L 185,55 Z" 
        stroke={strokeColor} 
        strokeWidth="1.6" 
      />
      {/* Rear Wiper */}
      <line x1="250" y1="98" x2="275" y2="88" stroke={strokeColor} strokeWidth="1.5" />

      {/* Signature Vertical Prius C Taillight (Left) */}
      <path 
        d="M 282,85 L 294,92 L 292,135 L 278,130 L 278,110 Z" 
        stroke={strokeColor} 
        strokeWidth="1.8" 
      />
      {/* Taillight internal reflector segment */}
      <line x1="282" y1="100" x2="292" y2="105" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="280" y1="118" x2="290" y2="122" stroke={strokeColor} strokeWidth="1.2" />

      {/* Right Taillight (Far edge) */}
      <path d="M 212,104 L 216,112 L 215,128 L 210,126 Z" stroke={strokeColor} strokeWidth="1.3" />

      {/* Rear Hatch Door Cutout & License Plate Frame */}
      <path d="M 220,106 L 275,110 L 270,146 L 225,144 Z" stroke={strokeColor} strokeWidth="1.4" />
      <rect x="236" y="118" width="22" height="12" rx="2" stroke={strokeColor} strokeWidth="1.3" />
      {/* Toyota Rear Badge */}
      <ellipse cx="247" cy="110" rx="6" ry="4" stroke={strokeColor} strokeWidth="1.3" />

      {/* Rear Bumper Lower Diffuser & Red Reflector */}
      <path d="M 225,148 Q 255,154 285,148" stroke={strokeColor} strokeWidth="1.6" />
      <rect x="278" y="146" width="8" height="4" rx="1" stroke={strokeColor} strokeWidth="1.2" />

      {/* Driver-side Side Windows & Pillars */}
      <path d="M 185,55 L 110,68 L 100,98 L 195,100 Z" stroke={strokeColor} strokeWidth="1.4" />
      <line x1="145" y1="62" x2="148" y2="98" stroke={strokeColor} strokeWidth="1.4" />

      {/* Fuel Door (Left Rear Quarter Panel) */}
      <ellipse cx="215" cy="120" rx="6" ry="8" stroke={strokeColor} strokeWidth="1.3" />

      {/* Rear-Left Wheel */}
      <circle cx="234" cy="162" r="23" stroke={strokeColor} strokeWidth="1.8" strokeDasharray={strokeDash} />
      <circle cx="234" cy="162" r="14" stroke={strokeColor} strokeWidth="1.4" />
      <circle cx="234" cy="162" r="5" stroke={strokeColor} strokeWidth="1.4" />
      <line x1="234" y1="148" x2="234" y2="176" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="220" y1="162" x2="248" y2="162" stroke={strokeColor} strokeWidth="1.2" />

      {/* Front-Left Wheel (Perspective) */}
      <ellipse cx="102" cy="162" rx="18" ry="21" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={strokeDash} />

      {/* Door Shutline */}
      <path d="M 148,98 L 145,160" stroke={strokeColor} strokeWidth="1.3" />

      {/* Reticle */}
      <circle cx="170" cy="110" r="18" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="170" y1="84" x2="170" y2="136" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="144" y1="110" x2="196" y2="110" stroke={strokeColor} strokeWidth="1.2" />
    </svg>
  );
}

export function RearRightSilhouette({ isAligned, strokeColor, strokeDash }) {
  return (
    <svg 
      className={`ghost-contour-svg ${isAligned ? 'locked' : 'aligning'}`} 
      viewBox="0 0 340 220" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* CAD Blueprint Grid Accents */}
      <g opacity={isAligned ? "0.35" : "0.2"} stroke={strokeColor} strokeWidth="0.8">
        <path d="M 20,40 L 20,20 L 40,20" />
        <path d="M 320,40 L 320,20 L 300,20" />
        <path d="M 20,180 L 20,200 L 40,200" />
        <path d="M 320,180 L 320,200 L 300,200" />
        <line x1="170" y1="15" x2="170" y2="25" />
        <line x1="170" y1="195" x2="170" y2="205" />
      </g>

      {/* Main Body Outer Silhouette (Rear-Right 45° - Mirrored) */}
      <path 
        d="M 295,130 
           L 282,110 
           C 275,95 255,75 230,68 
           L 155,55 
           L 92,58 
           C 65,64 55,78 50,95 
           L 44,128 
           C 42,145 52,155 65,158 
           L 75,160 
           C 80,146 90,138 106,138 
           C 122,138 132,148 136,162 
           L 205,162 
           C 208,150 220,140 238,140 
           C 255,140 265,150 270,162 
           L 292,160 
           C 298,158 300,150 295,130 Z" 
        stroke={strokeColor} 
        strokeWidth="2.4" 
        strokeDasharray={strokeDash}
        strokeLinejoin="round"
      />

      {/* Hatchback Rear Window & Spoiler */}
      <path 
        d="M 92,58 L 50,95 L 80,108 L 130,102 L 155,55 Z" 
        stroke={strokeColor} 
        strokeWidth="1.6" 
      />
      {/* Rear Wiper */}
      <line x1="90" y1="98" x2="65" y2="88" stroke={strokeColor} strokeWidth="1.5" />

      {/* Signature Vertical Prius C Taillight (Right) */}
      <path 
        d="M 58,85 L 46,92 L 48,135 L 62,130 L 62,110 Z" 
        stroke={strokeColor} 
        strokeWidth="1.8" 
      />
      <line x1="58" y1="100" x2="48" y2="105" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="60" y1="118" x2="50" y2="122" stroke={strokeColor} strokeWidth="1.2" />

      {/* Left Taillight (Far edge) */}
      <path d="M 128,104 L 124,112 L 125,128 L 130,126 Z" stroke={strokeColor} strokeWidth="1.3" />

      {/* Rear Hatch Door & License Plate Frame */}
      <path d="M 120,106 L 65,110 L 70,146 L 115,144 Z" stroke={strokeColor} strokeWidth="1.4" />
      <rect x="82" y="118" width="22" height="12" rx="2" stroke={strokeColor} strokeWidth="1.3" />
      <ellipse cx="93" cy="110" rx="6" ry="4" stroke={strokeColor} strokeWidth="1.3" />

      {/* Rear Bumper & Reflector (Right Corner) */}
      <path d="M 115,148 Q 85,154 55,148" stroke={strokeColor} strokeWidth="1.6" />
      <rect x="54" y="146" width="8" height="4" rx="1" stroke={strokeColor} strokeWidth="1.2" />

      {/* Passenger Side Windows */}
      <path d="M 155,55 L 230,68 L 240,98 L 145,100 Z" stroke={strokeColor} strokeWidth="1.4" />
      <line x1="195" y1="62" x2="192" y2="98" stroke={strokeColor} strokeWidth="1.4" />

      {/* Rear-Right Wheel */}
      <circle cx="106" cy="162" r="23" stroke={strokeColor} strokeWidth="1.8" strokeDasharray={strokeDash} />
      <circle cx="106" cy="162" r="14" stroke={strokeColor} strokeWidth="1.4" />
      <circle cx="106" cy="162" r="5" stroke={strokeColor} strokeWidth="1.4" />
      <line x1="106" y1="148" x2="106" y2="176" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="92" y1="162" x2="120" y2="162" stroke={strokeColor} strokeWidth="1.2" />

      {/* Front-Right Wheel */}
      <ellipse cx="238" cy="162" rx="18" ry="21" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={strokeDash} />

      {/* Door Shutline */}
      <path d="M 192,98 L 195,160" stroke={strokeColor} strokeWidth="1.3" />

      {/* Reticle */}
      <circle cx="170" cy="110" r="18" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="170" y1="84" x2="170" y2="136" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="144" y1="110" x2="196" y2="110" stroke={strokeColor} strokeWidth="1.2" />
    </svg>
  );
}

export function InteriorBlueprintSilhouette({ isAligned, strokeColor, strokeDash }) {
  return (
    <svg 
      className={`ghost-contour-svg ${isAligned ? 'locked' : 'aligning'}`} 
      viewBox="0 0 340 220" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* CAD Frame */}
      <g opacity={isAligned ? "0.35" : "0.2"} stroke={strokeColor} strokeWidth="0.8">
        <path d="M 20,40 L 20,20 L 40,20" />
        <path d="M 320,40 L 320,20 L 300,20" />
        <path d="M 20,180 L 20,200 L 40,200" />
        <path d="M 320,180 L 320,200 L 300,200" />
      </g>

      {/* Cabin Interior Boundary */}
      <rect 
        x="35" y="35" width="270" height="150" rx="18" 
        stroke={strokeColor} 
        strokeWidth="2.2" 
        strokeDasharray={strokeDash} 
      />

      {/* Left Rear Seat Headrest & Backrest */}
      <rect x="65" y="55" width="55" height="38" rx="8" stroke={strokeColor} strokeWidth="1.6" />
      <path d="M 55,93 L 130,93 L 125,145 L 50,145 Z" stroke={strokeColor} strokeWidth="1.6" />

      {/* Right Rear Seat Headrest & Backrest */}
      <rect x="220" y="55" width="55" height="38" rx="8" stroke={strokeColor} strokeWidth="1.6" />
      <path d="M 210,93 L 285,93 L 290,145 L 215,145 Z" stroke={strokeColor} strokeWidth="1.6" />

      {/* Center Seat & Armrest Area */}
      <path d="M 130,93 L 210,93 L 215,145 L 125,145 Z" stroke={strokeColor} strokeWidth="1.4" strokeDasharray="4 4" />
      <rect x="150" y="65" width="40" height="28" rx="6" stroke={strokeColor} strokeWidth="1.3" />

      {/* Seat Cushion Seams */}
      <path d="M 50,145 C 90,165 250,165 290,145" stroke={strokeColor} strokeWidth="1.6" />
      <line x1="170" y1="93" x2="170" y2="162" stroke={strokeColor} strokeWidth="1.2" strokeDasharray="4 3" />

      {/* Cleanliness Inspection Focal Reticle */}
      <circle cx="170" cy="130" r="22" stroke={strokeColor} strokeWidth="1.4" />
      <line x1="170" y1="100" x2="170" y2="160" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="140" y1="130" x2="200" y2="130" stroke={strokeColor} strokeWidth="1.2" />
    </svg>
  );
}

/**
 * CarTopBlueprintRadar
 * Recreates the top-view orthographic vehicle blueprint from user's reference image
 * and highlights current camera direction with a dynamic radar cone!
 */
export function CarTopBlueprintRadar({ activeIndex = 0 }) {
  // 0: FL (Top-Left), 1: FR (Top-Right), 2: RL (Bottom-Left), 3: RR (Bottom-Right), 4: Interior
  return (
    <div style={{ position: 'relative', width: '48px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 120 160" fill="none" style={{ width: '100%', height: '100%' }}>
        {/* Radar Flash Angle Cone */}
        {activeIndex === 0 && (
          <path d="M 25,35 L -10,-10 L 40,-15 Z" fill="rgba(0, 229, 153, 0.4)" stroke="#00E599" strokeWidth="1.5" />
        )}
        {activeIndex === 1 && (
          <path d="M 95,35 L 130,-10 L 80,-15 Z" fill="rgba(0, 229, 153, 0.4)" stroke="#00E599" strokeWidth="1.5" />
        )}
        {activeIndex === 2 && (
          <path d="M 25,125 L -10,170 L 40,175 Z" fill="rgba(0, 229, 153, 0.4)" stroke="#00E599" strokeWidth="1.5" />
        )}
        {activeIndex === 3 && (
          <path d="M 95,125 L 130,170 L 80,175 Z" fill="rgba(0, 229, 153, 0.4)" stroke="#00E599" strokeWidth="1.5" />
        )}
        {activeIndex === 4 && (
          <circle cx="60" cy="80" r="24" fill="rgba(0, 229, 153, 0.35)" stroke="#00E599" strokeWidth="1.5" />
        )}

        {/* Vehicle Top View Blueprint Outline (matching reference image) */}
        {/* Outer Body */}
        <path 
          d="M 35,15 
             C 45,10 75,10 85,15 
             C 98,22 102,40 102,70 
             C 102,110 98,135 88,145 
             C 78,152 42,152 32,145 
             C 22,135 18,110 18,70 
             C 18,40 22,22 35,15 Z" 
          stroke="#E2E8F0" 
          strokeWidth="2.5" 
        />
        {/* Windshield */}
        <path d="M 24,45 C 45,38 75,38 96,45 L 90,62 C 70,58 50,58 30,62 Z" stroke="#94A3B8" strokeWidth="1.8" />
        {/* Windshield Wipers */}
        <line x1="42" y1="48" x2="62" y2="43" stroke="#94A3B8" strokeWidth="1.2" />
        <line x1="68" y1="46" x2="84" y2="44" stroke="#94A3B8" strokeWidth="1.2" />

        {/* Roof Panel */}
        <rect x="30" y="64" width="60" height="52" rx="4" stroke="#64748B" strokeWidth="1.4" strokeDasharray="3 2" />

        {/* Rear Windshield */}
        <path d="M 30,120 C 50,123 70,123 90,120 L 86,135 C 70,138 50,138 34,135 Z" stroke="#94A3B8" strokeWidth="1.8" />

        {/* Side Mirrors */}
        {/* Left Mirror */}
        <path d="M 22,46 L 12,42 C 10,48 14,54 20,53 Z" stroke="#CBD5E1" strokeWidth="1.5" fill="rgba(255,255,255,0.2)" />
        {/* Right Mirror */}
        <path d="M 98,46 L 108,42 C 110,48 106,54 100,53 Z" stroke="#CBD5E1" strokeWidth="1.5" fill="rgba(255,255,255,0.2)" />

        {/* Corner Indicator Dots */}
        <circle cx="28" cy="28" r="4" fill={activeIndex === 0 ? "#00E599" : "#64748B"} />
        <circle cx="92" cy="28" r="4" fill={activeIndex === 1 ? "#00E599" : "#64748B"} />
        <circle cx="28" cy="138" r="4" fill={activeIndex === 2 ? "#00E599" : "#64748B"} />
        <circle cx="92" cy="138" r="4" fill={activeIndex === 3 ? "#00E599" : "#64748B"} />
      </svg>
    </div>
  );
}

/**
 * Universal blueprint contour router
 */
export default function CarBlueprintSilhouette({ index, isAligned }) {
  const strokeColor = isAligned ? "#00E599" : "#FFB300";
  const strokeDash = isAligned ? "none" : "8 5";

  switch (index) {
    case 0:
      return <FrontLeftSilhouette isAligned={isAligned} strokeColor={strokeColor} strokeDash={strokeDash} />;
    case 1:
      return <FrontRightSilhouette isAligned={isAligned} strokeColor={strokeColor} strokeDash={strokeDash} />;
    case 2:
      return <RearLeftSilhouette isAligned={isAligned} strokeColor={strokeColor} strokeDash={strokeDash} />;
    case 3:
      return <RearRightSilhouette isAligned={isAligned} strokeColor={strokeColor} strokeDash={strokeDash} />;
    case 4:
    default:
      return <InteriorBlueprintSilhouette isAligned={isAligned} strokeColor={strokeColor} strokeDash={strokeDash} />;
  }
}
