// Image compression script — converts all PNG/JPG/JPEG in assets/ to WebP
// then updates all references in products.js, app.js, index.html

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, 'assets');
const FILES_TO_UPDATE = [
  path.join(__dirname, 'products.js'),
  path.join(__dirname, 'app.js'),
  path.join(__dirname, 'index.html'),
];

// Quality settings
const WEBP_QUALITY_PHOTO = 82;   // for JPEGs (photos)
const WEBP_QUALITY_PNG   = 85;   // for PNGs (may have transparency)

function walkDir(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full, results);
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

async function convertImage(src) {
  const ext = path.extname(src).toLowerCase();
  const dest = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  if (fs.existsSync(dest)) {
    console.log(`  skip (already exists): ${path.relative(__dirname, dest)}`);
    return { src, dest, skipped: true };
  }

  const quality = ext === '.png' ? WEBP_QUALITY_PNG : WEBP_QUALITY_PHOTO;

  try {
    await sharp(src)
      .webp({ quality, effort: 4 })
      .toFile(dest);

    const srcSize  = fs.statSync(src).size;
    const destSize = fs.statSync(dest).size;
    const savings  = (((srcSize - destSize) / srcSize) * 100).toFixed(0);
    console.log(`  ${path.relative(__dirname, src)} → ${path.basename(dest)}  ${(srcSize/1024).toFixed(0)}KB → ${(destSize/1024).toFixed(0)}KB  (${savings}% smaller)`);
    return { src, dest, skipped: false };
  } catch (err) {
    console.error(`  ERROR converting ${src}: ${err.message}`);
    return null;
  }
}

function updateReferences(conversions) {
  for (const file of FILES_TO_UPDATE) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    for (const c of conversions) {
      if (!c || c.skipped) continue;
      // Build relative path as it appears in source files (forward slashes)
      const oldRef = path.relative(__dirname, c.src).replace(/\\/g, '/');
      const newRef = path.relative(__dirname, c.dest).replace(/\\/g, '/');
      if (content.includes(oldRef)) {
        content = content.split(oldRef).join(newRef);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`  updated references in ${path.basename(file)}`);
    }
  }
}

function deleteOriginals(conversions) {
  for (const c of conversions) {
    if (!c || c.skipped) continue;
    fs.unlinkSync(c.src);
  }
  console.log(`  deleted ${conversions.filter(c => c && !c.skipped).length} original files`);
}

async function main() {
  const images = walkDir(ASSETS_DIR);
  console.log(`\nFound ${images.length} images to process...\n`);

  const conversions = [];
  for (const img of images) {
    const result = await convertImage(img);
    if (result) conversions.push(result);
  }

  const converted = conversions.filter(c => !c.skipped);
  console.log(`\nConverted ${converted.length} images. Updating references...\n`);
  updateReferences(conversions);

  console.log('\nDeleting originals...');
  deleteOriginals(conversions);

  console.log('\nDone!');
}

main().catch(console.error);
