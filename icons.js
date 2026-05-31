/**
 * FLO Icons Library
 * Usage : document.getElementById('x').innerHTML = FLO_ICONS.eye();
 * Ou : element.innerHTML = FLO_ICONS.bottle({ size: 24, color: '#1F9D55' });
 */

const FLO_ICONS = {

  // --- NAVIGATION ---

  home: ({ size = 22, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M3 12L12 3L21 12V21H15V15H9V21H3V12Z' stroke='${color}' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' fill='none'/>
    </svg>`,

  grid: ({ size = 22, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='3' y='3' width='7' height='7' rx='1' stroke='${color}' stroke-width='1.8' fill='none'/>
      <rect x='14' y='3' width='7' height='7' rx='1' stroke='${color}' stroke-width='1.8' fill='none'/>
      <rect x='3' y='14' width='7' height='7' rx='1' stroke='${color}' stroke-width='1.8' fill='none'/>
      <rect x='14' y='14' width='7' height='7' rx='1' stroke='${color}' stroke-width='1.8' fill='none'/>
    </svg>`,

  plus: ({ size = 22, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12 5V19M5 12H19' stroke='${color}' stroke-width='1.8' stroke-linecap='round'/>
    </svg>`,

  transactions: ({ size = 22, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M7 16L17 16M17 16L14 13M17 16L14 19' stroke='${color}' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M17 8L7 8M7 8L10 5M7 8L10 11' stroke='${color}' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/>
    </svg>`,

  profile: ({ size = 22, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='12' cy='8' r='4' stroke='${color}' stroke-width='1.8' fill='none'/>
      <path d='M4 20C4 17 7.6 15 12 15C16.4 15 20 17 20 20' stroke='${color}' stroke-width='1.8' stroke-linecap='round' fill='none'/>
    </svg>`,

  // --- ACTIONS ---

  chevronRight: ({ size = 20, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M9 18L15 12L9 6' stroke='${color}' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/>
    </svg>`,

  chevronLeft: ({ size = 20, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M15 18L9 12L15 6' stroke='${color}' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/>
    </svg>`,

  back: ({ size = 24, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M15 18L9 12L15 6' stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
    </svg>`,

  close: ({ size = 24, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M18 6L6 18M6 6L18 18' stroke='${color}' stroke-width='1.8' stroke-linecap='round'/>
    </svg>`,

  search: ({ size = 20, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='11' cy='11' r='7' stroke='${color}' stroke-width='1.8' fill='none'/>
      <path d='M16.5 16.5L21 21' stroke='${color}' stroke-width='1.8' stroke-linecap='round'/>
    </svg>`,

  trash: ({ size = 20, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='22' viewBox='0 0 22 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M 3 6 L 19 6' stroke='${color}' stroke-width='1.8' stroke-linecap='round'/>
      <path d='M 8 6 L 8 4 Q 8 2.5 9.5 2.5 L 12.5 2.5 Q 14 2.5 14 4 L 14 6' stroke='${color}' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' fill='none'/>
      <path d='M 5 6 L 6 20 Q 6 21.5 7.5 21.5 L 14.5 21.5 Q 16 21.5 16 20 L 17 6' stroke='${color}' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' fill='none'/>
      <path d='M 9 10 L 9 17.5' stroke='${color}' stroke-width='1.5' stroke-linecap='round'/>
      <path d='M 13 10 L 13 17.5' stroke='${color}' stroke-width='1.5' stroke-linecap='round'/>
    </svg>`,

  copy: ({ size = 20, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M 6 6 L 6 3 Q 6 2 7 2 L 18 2 Q 19 2 19 3 L 19 14 Q 19 15 18 15 L 15 15' stroke='${color}' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round' fill='none'/>
      <rect x='3' y='6' width='13' height='14' rx='2' stroke='${color}' stroke-width='1.7' fill='none'/>
    </svg>`,

  check: ({ size = 14, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M2.5 7.5l3 3 6-7' stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
    </svg>`,

  dots: ({ size = 20, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='6' viewBox='0 0 22 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='3' cy='3' r='2' fill='${color}'/>
      <circle cx='11' cy='3' r='2' fill='${color}'/>
      <circle cx='19' cy='3' r='2' fill='${color}'/>
    </svg>`,

  link: ({ size = 22, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M 10 4 L 13.5 0.5 Q 17 -3 20.5 0.5 Q 24 4 20.5 7.5 L 17 11' stroke='${color}' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' fill='none'/>
      <path d='M 14 20 L 10.5 23.5 Q 7 27 3.5 23.5 Q 0 20 3.5 16.5 L 7 13' stroke='${color}' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' fill='none'/>
      <path d='M 9 15 L 15 9' stroke='${color}' stroke-width='1.8' stroke-linecap='round' fill='none'/>
    </svg>`,

  refresh: ({ size = 22, color = '#1F9D55' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z' fill='${color}'/>
    </svg>`,

  userPlus: ({ size = 22, color = '#1F9D55' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='9' cy='6' r='3.2' stroke='${color}' stroke-width='1.6' fill='none'/>
      <path d='M 2.5 18.5 C 2.5 14.5, 5.5 12, 9 12 C 12.5 12, 15.5 14.5, 15.5 18.5' stroke='${color}' stroke-width='1.6' stroke-linecap='round' fill='none'/>
      <path d='M 19.5 6 L 19.5 12' stroke='${color}' stroke-width='1.8' stroke-linecap='round'/>
      <path d='M 16.5 9 L 22.5 9' stroke='${color}' stroke-width='1.8' stroke-linecap='round'/>
    </svg>`,

  qrScan: ({ size = 22, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='3' y='3' width='7' height='7' rx='1.5' stroke='${color}' stroke-width='1.8' fill='none'/>
      <rect x='14' y='3' width='7' height='7' rx='1.5' stroke='${color}' stroke-width='1.8' fill='none'/>
      <rect x='3' y='14' width='7' height='7' rx='1.5' stroke='${color}' stroke-width='1.8' fill='none'/>
      <path d='M14 17.5h7M17.5 14v7' stroke='${color}' stroke-width='1.8' stroke-linecap='round'/>
    </svg>`,

  // --- ÉTATS ---

  eyeOpen: ({ size = 22, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='18' viewBox='0 0 24 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M 1.5 9 C 4.5 3.5, 8 1.5, 12 1.5 C 16 1.5, 19.5 3.5, 22.5 9 C 19.5 14.5, 16 16.5, 12 16.5 C 8 16.5, 4.5 14.5, 1.5 9 Z' stroke='${color}' stroke-width='1.6' stroke-linejoin='round' fill='none'/>
      <circle cx='12' cy='9' r='3.2' stroke='${color}' stroke-width='1.6' fill='none'/>
      <circle cx='12' cy='9' r='1.2' fill='${color}'/>
    </svg>`,

  eyeClosed: ({ size = 22, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='18' viewBox='0 0 24 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M 1.5 9 C 4.5 3.5, 8 1.5, 12 1.5 C 16 1.5, 19.5 3.5, 22.5 9 C 19.5 14.5, 16 16.5, 12 16.5 C 8 16.5, 4.5 14.5, 1.5 9 Z' stroke='${color}' stroke-width='1.6' stroke-linejoin='round' fill='none'/>
      <circle cx='12' cy='9' r='3.2' stroke='${color}' stroke-width='1.6' fill='none'/>
      <path d='M 3 17 L 21 1' stroke='${color}' stroke-width='1.8' stroke-linecap='round' fill='none'/>
    </svg>`,

  info: ({ size = 22, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='12' cy='12' r='10' stroke='${color}' stroke-width='1.8' fill='none'/>
      <circle cx='12' cy='7.5' r='1.2' fill='${color}'/>
      <path d='M 12 11 L 12 17' stroke='${color}' stroke-width='1.8' stroke-linecap='round' fill='none'/>
    </svg>`,

  camera: ({ size = 22, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M23 19C23 20.1 22.1 21 21 21H3C1.9 21 1 20.1 1 19V8C1 6.9 1.9 6 3 6H7L9 3H15L17 6H21C22.1 6 23 6.9 23 8V19Z' stroke='${color}' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' fill='none'/>
      <circle cx='12' cy='13' r='4' stroke='${color}' stroke-width='1.8' fill='none'/>
    </svg>`,

  // --- FLO SPECIFIC ---

  bottle: ({ size = 22, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${Math.round(size * 0.72)}' viewBox='0 0 280 200' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g transform='translate(140 110) rotate(-55)' stroke='${color}' stroke-width='5.5' stroke-linecap='round' stroke-linejoin='round' fill='none'>
        <path d='M -14 -120 L -14 -106 C -14 -100, -22 -94, -28 -86 C -34 -76, -36 -64, -36 -50 L -36 30 C -36 42, -28 50, -14 50 L 14 50 C 28 50, 36 42, 36 30 L 36 -50 C 36 -64, 34 -76, 28 -86 C 22 -94, 14 -100, 14 -106 L 14 -120 Z'/>
        <rect x='-18' y='-138' width='36' height='20' rx='2.5' fill='${color}'/>
      </g>
      <path d='M 4 118 C 32 108, 60 128, 88 118 C 116 108, 144 128, 172 118 C 200 108, 228 128, 256 118 C 268 114, 276 118, 278 118' stroke='${color}' stroke-width='5.5' stroke-linecap='round' fill='none'/>
    </svg>`,

  leaf: ({ size = 22, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12 22C12 22 4 16 4 9C4 5.13 7.13 2 11 2C14.87 2 18 5.13 18 9C18 13 14 17 12 22Z' stroke='${color}' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' fill='none'/>
      <path d='M12 22V12' stroke='${color}' stroke-width='1.8' stroke-linecap='round'/>
    </svg>`,

  phone: ({ size = 22, color = 'currentColor' } = {}) => `
    <svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012-.5c.9.3 1.8.6 2.8.7A2 2 0 0122 16.9z' stroke='${color}' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round' fill='none'/>
    </svg>`,

};

// Export pour usage dans les pages
if (typeof module !== 'undefined') module.exports = FLO_ICONS;
