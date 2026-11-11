import fs from 'node:fs';

const downloads = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Toyota_RAV4_Cruiser_2WD%2C_2021_front.jpg', out: 'public/gallery/toyota-rav4.jpg' },
  { url: 'https://img-ik.cars.co.za/news-site-za/images/2024/07/Toyota_StarletCross01.jpg', out: 'public/gallery/starlet-cross.jpg' },
  { url: 'https://img-ik.cars.co.za/news-site-za/images/2023/04/Toyota-Urban-Cruiser-2023-16.jpg', out: 'public/gallery/urban-cruiser.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/2019_Mitsubishi_L200_Warrior_DI-D_2.3_Front.jpg', out: 'public/gallery/mitsubishi-l200.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/2020_Suzuki_Across_E-Four_2.5.jpg', out: 'public/gallery/suzuki-across.jpg' },
  { url: 'https://img-ik.cars.co.za/news-site-za/images/2023/04/Suzuki-Grand-Vitara-9632.jpg', out: 'public/gallery/suzuki-grand-vitara.jpg' }
];

async function run() {
  for (const item of downloads) {
    try {
      console.log(`Downloading ${item.out} from ${item.url}...`);
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      if (!res.ok) {
        console.error(`Failed ${item.out}: HTTP ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(item.out, buffer);
      console.log(`Saved ${item.out} (${buffer.length} bytes)`);
    } catch (e) {
      console.error(`Error for ${item.out}:`, e.message);
    }
  }
}

run();

