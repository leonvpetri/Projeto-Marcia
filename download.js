import fs from 'fs';
import https from 'https';

const url = "https://drive.google.com/uc?export=download&id=1_ApbGfGT4-0KHH0nEb-BzJ7qpPaTBL4k";

function download(url, dest) {
  https.get(url, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303) {
      return download(res.headers.location, dest);
    }
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Downloaded to ' + dest);
    });
  }).on('error', (err) => {
    console.error('Error:', err.message);
  });
}

if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}
download(url, 'public/logo.png');
