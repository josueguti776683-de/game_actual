import sharp from 'sharp';
import fs from 'fs';

async function generate() {
  const logFile = './debug.log';
  fs.writeFileSync(logFile, '--- Generacion de Activos Inciada --- \n');
  const log = (...args) => {
    const msg = args.join(' ');
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
  };

  log('Iniciando renderizado de plantillas de interfaz...');
  const svgBuffer = fs.readFileSync('./public/icon.svg');

  // 1. Icono 192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png({ compressionLevel: 9, palette: true, quality: 80 })
    .toFile('./public/icon-192.png');
  log('✔ Generado public/icon-192.png');

  // 2. Icono 512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png({ compressionLevel: 9, palette: true, quality: 80 })
    .toFile('./public/icon-512.png');
  log('✔ Generado public/icon-512.png');

  // 3. Generar captura horizontal (1280x720)
  const svg1 = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <rect width="1280" height="720" fill="#0f172a"/>
    <text x="640" y="360" font-family="'Inter', sans-serif" font-weight="900" font-size="64" fill="#38bdf8" text-anchor="middle">GAME STE</text>
    <text x="640" y="440" font-family="'Inter', sans-serif" font-weight="500" font-size="32" fill="#ffffff" text-anchor="middle">Technical Maintenance Academy</text>
  </svg>`;
  await sharp(Buffer.from(svg1))
    .png({ compressionLevel: 8 })
    .toFile('./public/screenshot-1.png');
  log('✔ Generado screenshot-1.png');

  // 4. Generar captura vertical (1080x1920)
  const svg2 = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
    <rect width="1080" height="1920" fill="#0f172a"/>
    <text x="540" y="900" font-family="'Inter', sans-serif" font-weight="900" font-size="96" fill="#38bdf8" text-anchor="middle">GAME STE</text>
    <text x="540" y="1020" font-family="'Inter', sans-serif" font-weight="500" font-size="48" fill="#ffffff" text-anchor="middle">Technical Training</text>
  </svg>`;
  await sharp(Buffer.from(svg2))
    .png({ compressionLevel: 8 })
    .toFile('./public/screenshot-2.png');
  log('✔ Generado screenshot-2.png');
}

generate();
