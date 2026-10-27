const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const input = path.join(__dirname, '../public/favicon.png');
  const publicDir = path.join(__dirname, '../public');
  
  // First trim the emblem so we have tight bounds
  const trimmedBuffer = await sharp(input).trim().toBuffer();

  // 1. pwa-512x512.png (Transparent background)
  const logo512 = await sharp(trimmedBuffer)
    .resize(380, null, { fit: 'inside' })
    .toBuffer();
  
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: logo512, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Generated pwa-512x512.png');

  // 2. pwa-192x192.png (Transparent background)
  const logo192 = await sharp(trimmedBuffer)
    .resize(144, null, { fit: 'inside' })
    .toBuffer();
  
  await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: logo192, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Generated pwa-192x192.png');

  // 3. pwa-64x64.png
  const logo64 = await sharp(trimmedBuffer)
    .resize(50, null, { fit: 'inside' })
    .toBuffer();
  
  await sharp({
    create: {
      width: 64,
      height: 64,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: logo64, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'pwa-64x64.png'));
  console.log('Generated pwa-64x64.png');

  // 4. maskable-icon-512x512.png (With #0A0B10 brand dark background and safe zone padding)
  // Maskable safe zone is 80% center circle (diameter 409px). 
  // An emblem width of ~300px leaves comfortable padding inside the safe zone.
  const logoMaskable = await sharp(trimmedBuffer)
    .resize(300, null, { fit: 'inside' })
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 10, g: 11, b: 16, alpha: 1 } // #0A0B10
    }
  })
    .composite([{ input: logoMaskable, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'maskable-icon-512x512.png'));
  console.log('Generated maskable-icon-512x512.png');

  // 5. apple-touch-icon.png (180x180, #0A0B10 brand background)
  const logoApple = await sharp(trimmedBuffer)
    .resize(120, null, { fit: 'inside' })
    .toBuffer();

  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 10, g: 11, b: 16, alpha: 1 }
    }
  })
    .composite([{ input: logoApple, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');
}

generateIcons().catch(console.error);
