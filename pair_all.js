const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const folders = ['accessories', 'blankets', 'bracelets', 'clothing', 'coasters', 'pajamas'];

let results = {};

folders.forEach(folder => {
  const dirPath = path.join(assetsDir, folder);
  if (!fs.existsSync(dirPath)) return;
  
  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'))
    .map(name => {
      const filePath = path.join(dirPath, name);
      const stat = fs.statSync(filePath);
      // Try to parse timestamp from name "ChatGPT Image Jun 8, 2026, 09_16_07 PM.png"
      // or use file mtime
      let time = stat.mtimeMs;
      const match = name.match(/(\d+)_(\d+)_(\d+)\s*(AM|PM)/i);
      if (match) {
        let hr = parseInt(match[1]);
        const min = parseInt(match[2]);
        const sec = parseInt(match[3]);
        const isPM = match[4].toUpperCase() === 'PM';
        if (isPM && hr < 12) hr += 12;
        if (!isPM && hr === 12) hr = 0;
        time = (hr * 3600 + min * 60 + sec) * 1000;
      }
      return { name, size: stat.size, time, path: `assets/${folder}/${name}` };
    });

  // Sort files by time
  files.sort((a, b) => a.time - b.time);
  results[folder] = files;
});

fs.writeFileSync('paired_assets.json', JSON.stringify(results, null, 2));
console.log("Assets parsed and saved to paired_assets.json");
