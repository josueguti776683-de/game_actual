import sharp from 'sharp';
import fs from 'fs';

async function generate() {
  console.log('--- Iniciando Renderizador de Activos de Interfaz PWA ---');

  // Auto-reparación preventiva si los archivos se subieron en la raíz sin la carpeta src/
  try {
    if (!fs.existsSync('./src/main.tsx') && fs.existsSync('./main.tsx')) {
      console.log('[Auto-Heal] Detectada estructura plana en la raíz. Restaurando carpeta /src...');
      if (!fs.existsSync('./src')) fs.mkdirSync('./src', { recursive: true });

      const filesToSync = ['main.tsx', 'App.tsx', 'index.css', 'types.ts', 'data.ts', 'motivation.ts', 'vite-env.d.ts'];
      for (const file of filesToSync) {
        if (fs.existsSync(`./${file}`) && !fs.existsSync(`./src/${file}`)) {
          fs.copyFileSync(`./${file}`, `./src/${file}`);
          console.log(`[Auto-Heal] Sincronizado ./${file} -> ./src/${file}`);
        }
      }

      const dirsToSync = ['components', 'data', 'hooks', 'utils', 'assets'];
      for (const dir of dirsToSync) {
        if (fs.existsSync(`./${dir}`) && !fs.existsSync(`./src/${dir}`)) {
          fs.cpSync(`./${dir}`, `./src/${dir}`, { recursive: true });
          console.log(`[Auto-Heal] Sincronizado carpeta ./${dir} -> ./src/${dir}`);
        }
      }
    }
  } catch (err) {
    console.warn('[Auto-Heal] Aviso al verificar estructura:', err);
  }

  try {
    const svgPath = './public/icon.svg';
    if (!fs.existsSync(svgPath)) {
      throw new Error('No se encontró el archivo /public/icon.svg en el directorio público.');
    }
    const svgBuffer = fs.readFileSync(svgPath);

    // 1. Icono estándar 192x192
    await sharp(svgBuffer)
      .resize(192, 192)
      .png({ compressionLevel: 9, palette: true, quality: 85 })
      .toFile('./public/icon-192.png');
    console.log('✓ Generado: /public/icon-192.png');

    // 2. Icono alta definición 512x512
    await sharp(svgBuffer)
      .resize(512, 512)
      .png({ compressionLevel: 9, palette: true, quality: 85 })
      .toFile('./public/icon-512.png');
    console.log('✓ Generado: /public/icon-512.png');

    // 3. Captura horizontal 1280x720 (requerida para PWABuilder - form_factor: wide)
    const svgHorizontalScreenshot = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#050b16" />
          <stop offset="50%" stop-color="#0a182c" />
          <stop offset="100%" stop-color="#0d1e38" />
        </linearGradient>
        <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#4fa7ff" />
          <stop offset="100%" stop-color="#79c6ff" />
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#bgGrad)"/>
      
      <!-- Cockpit Grid & Radar Guides -->
      <g opacity="0.12">
        <circle cx="640" cy="360" r="220" stroke="#4fa7ff" stroke-width="2" fill="none" />
        <circle cx="640" cy="360" r="340" stroke="#79c6ff" stroke-width="1.5" fill="none" stroke-dasharray="8 8" />
        <circle cx="640" cy="360" r="480" stroke="#ffffff" stroke-width="1" fill="none" />
        <line x1="160" y1="360" x2="1120" y2="360" stroke="#4fa7ff" stroke-width="1" />
        <line x1="640" y1="60" x2="640" y2="660" stroke="#4fa7ff" stroke-width="1" />
      </g>

      <!-- App Card Center Left -->
      <g transform="translate(100, 170)">
        <rect width="680" height="380" rx="24" fill="#081424" stroke="#4fa7ff" stroke-width="2" opacity="0.95"/>
        <text x="40" y="70" font-family="system-ui, sans-serif" font-weight="900" font-size="48" fill="#ffffff" letter-spacing="2">GAME</text>
        <text x="40" y="115" font-family="system-ui, sans-serif" font-weight="800" font-size="20" fill="#79c6ff" letter-spacing="3">AVIATOR TECHNICAL ENGLISH • FAA QC</text>
        <line x1="40" y1="135" x2="640" y2="135" stroke="#1d385f" stroke-width="1" />
        
        <text x="40" y="180" font-family="system-ui, sans-serif" font-weight="600" font-size="16" fill="#a7c6e6">✓ GAME 1: 30 Niveles de Mantenimiento Aeronáutico</text>
        <text x="40" y="218" font-family="system-ui, sans-serif" font-weight="600" font-size="16" fill="#a7c6e6">✓ GAME 2: 10 Módulos AMM con 1,700 Oraciones Técnicas</text>
        <text x="40" y="256" font-family="system-ui, sans-serif" font-weight="600" font-size="16" fill="#a7c6e6">✓ Diccionario Técnico Dixie (1,271 Términos Oficiales)</text>
        <text x="40" y="294" font-family="system-ui, sans-serif" font-weight="600" font-size="16" fill="#a7c6e6">✓ Audio Técnico Dual: Velocidad Normal y Lenta</text>
        <text x="40" y="335" font-family="system-ui, sans-serif" font-weight="700" font-size="16" fill="#79c6ff">✓ 100% Funcional Offline en Hangares Sin Internet</text>
      </g>

      <!-- Emblem Icon Right -->
      <g transform="translate(860, 170)">
        <rect width="320" height="320" rx="56" fill="#0c1a2e" stroke="#4fa7ff" stroke-width="5"/>
        <g transform="translate(160, 140)">
          <!-- Wings -->
          <path d="M 0,-60 L 90,30 L 35,25 L 0,60 L -35,25 L -90,30 Z" fill="url(#cyanGrad)" stroke="#ffffff" stroke-width="3" stroke-linejoin="round"/>
          <polygon points="0,-45 10,35 0,25 -10,35" fill="#ffffff"/>
          <circle cx="0" cy="20" r="5" fill="#ffffff"/>
        </g>
        <text x="160" y="250" font-family="system-ui, sans-serif" font-weight="900" font-size="34" fill="#ffffff" letter-spacing="4" text-anchor="middle">GAME</text>
        <text x="160" y="280" font-family="system-ui, sans-serif" font-weight="800" font-size="14" fill="#79c6ff" letter-spacing="3" text-anchor="middle">AVIATION STE</text>
      </g>

      <!-- Footer Badge -->
      <text x="640" y="660" font-family="system-ui, sans-serif" font-weight="700" font-size="16" fill="#6488af" text-anchor="middle" letter-spacing="1">GAME • TECHNICAL MAINTENANCE ACADEMY • PWABUILDER VERIFIED</text>
    </svg>`;
    await sharp(Buffer.from(svgHorizontalScreenshot))
      .png({ compressionLevel: 8 })
      .toFile('./public/screenshot-1.png');
    console.log('✓ Generada captura horizontal: /public/screenshot-1.png');

    // 4. Captura vertical 1080x1920 (requerida para PWABuilder - form_factor: narrow)
    const svgVerticalScreenshot = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
      <defs>
        <linearGradient id="bgGradVert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#050b16" />
          <stop offset="50%" stop-color="#09172a" />
          <stop offset="100%" stop-color="#0d1e38" />
        </linearGradient>
        <linearGradient id="cyanGradVert" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#4fa7ff" />
          <stop offset="100%" stop-color="#79c6ff" />
        </linearGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#bgGradVert)"/>
      
      <!-- Cockpit HUD Grid -->
      <g opacity="0.12">
        <circle cx="540" cy="960" r="420" stroke="#4fa7ff" stroke-width="2" fill="none" />
        <circle cx="540" cy="960" r="720" stroke="#79c6ff" stroke-width="1.5" fill="none" stroke-dasharray="12 12" />
        <line x1="80" y1="960" x2="1000" y2="960" stroke="#4fa7ff" stroke-width="1" />
        <line x1="540" y1="120" x2="540" y2="1800" stroke="#4fa7ff" stroke-width="1" />
      </g>

      <!-- App Emblem -->
      <g transform="translate(390, 240)">
        <rect width="300" height="300" rx="64" fill="#0b172a" stroke="#4fa7ff" stroke-width="6"/>
        <g transform="translate(150, 130)">
          <path d="M 0,-70 L 100,25 L 40,20 L 0,60 L -40,20 L -100,25 Z" fill="url(#cyanGradVert)" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
          <polygon points="0,-50 12,35 0,25 -12,35" fill="#ffffff"/>
        </g>
        <text x="150" y="240" font-family="system-ui, sans-serif" font-weight="900" font-size="44" fill="#ffffff" letter-spacing="4" text-anchor="middle">GAME</text>
      </g>

      <!-- Titles -->
      <g transform="translate(100, 640)" text-anchor="middle">
        <text x="440" y="0" font-family="system-ui, sans-serif" font-weight="950" font-size="82" fill="#ffffff" letter-spacing="4">GAME</text>
        <text x="440" y="65" font-family="system-ui, sans-serif" font-weight="800" font-size="28" fill="#79c6ff" letter-spacing="4">AVIATOR TECHNICAL ENGLISH</text>
        <text x="440" y="115" font-family="system-ui, sans-serif" font-weight="600" font-size="22" fill="#a7c6e6">FAA QUALITY CONTROL TRAINING</text>
      </g>

      <!-- Feature Cards -->
      <g transform="translate(90, 840)">
        <!-- Card 1 -->
        <rect width="900" height="160" rx="20" fill="#09172a" stroke="#4fa7ff" stroke-width="2"/>
        <text x="50" y="65" font-family="system-ui, sans-serif" font-weight="900" font-size="30" fill="#ffffff">🛠️ GAME 1: 30 NIVELES TÉCNICOS</text>
        <text x="50" y="115" font-family="system-ui, sans-serif" font-weight="500" font-size="22" fill="#a7c6e6">Entrenamiento forzado, memorización activa y audio AMM</text>

        <!-- Card 2 -->
        <g transform="translate(0, 200)">
          <rect width="900" height="160" rx="20" fill="#09172a" stroke="#4fa7ff" stroke-width="2"/>
          <text x="50" y="65" font-family="system-ui, sans-serif" font-weight="900" font-size="30" fill="#ffffff">✈️ GAME 2: 10 MÓDULOS AMM</text>
          <text x="50" y="115" font-family="system-ui, sans-serif" font-weight="500" font-size="22" fill="#a7c6e6">1,700 oraciones de manuales reales Cessna, ATA 100 y QC</text>
        </g>

        <!-- Card 3 -->
        <g transform="translate(0, 400)">
          <rect width="900" height="160" rx="20" fill="#09172a" stroke="#4fa7ff" stroke-width="2"/>
          <text x="50" y="65" font-family="system-ui, sans-serif" font-weight="900" font-size="30" fill="#ffffff">📖 DICCIONARIO DIXIE (1,271 TÉRMINOS)</text>
          <text x="50" y="115" font-family="system-ui, sans-serif" font-weight="500" font-size="22" fill="#a7c6e6">Búsqueda instantánea con pronunciación fonética nativa</text>
        </g>

        <!-- Card 4 -->
        <g transform="translate(0, 600)">
          <rect width="900" height="160" rx="20" fill="#09172a" stroke="#79c6ff" stroke-width="2"/>
          <text x="50" y="65" font-family="system-ui, sans-serif" font-weight="900" font-size="30" fill="#79c6ff">⚡ 100% OFFLINE EN HANGAR</text>
          <text x="50" y="115" font-family="system-ui, sans-serif" font-weight="500" font-size="22" fill="#ffffff">Sin requerir internet celular o WiFi. Cero latencia.</text>
        </g>
      </g>

      <text x="540" y="1800" font-family="system-ui, sans-serif" font-weight="700" font-size="22" fill="#6488af" text-anchor="middle" letter-spacing="2">GAME • FAA AVIATION TECHNICAL APP</text>
    </svg>`;
    await sharp(Buffer.from(svgVerticalScreenshot))
      .png({ compressionLevel: 8 })
      .toFile('./public/screenshot-2.png');
    console.log('✓ Generada captura vertical: /public/screenshot-2.png');

    console.log('--- Generación de Activos de Interfaz PWA Completada con Éxito ---');
  } catch (err) {
    console.error('✗ Error al generar assets:', err.message);
    process.exit(1);
  }
}

generate();
