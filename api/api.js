export default function handler(req, res) {
  // --- CORS ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // --- Data store ---
  const apps = {
   aash: {
    "id": "aash",
    "domain": "aashapi.appx.co.in",
    "name": "AASH OFFICIAL",
    "stylishName(brand)": "AASH +OFFICIAL",
    "image": "",
    "token": "",
    "courseid": 552,
    "player_url": "../imp/player",
    "pdf_view_api": "https://pdfweb.classx.co.in/pdfjs-latest/web/viewer.html?file=",
    "pdf_dow_api": "https://pdf-appx.edumate.life/?url="
    },
        winnersinstitute: {
      id: "winnersinstitute",
      domain: "winnersinstituteapi.cloudflare.net.in",
      name: "Winner Institute",
      "stylishName(brand)": "Winner Institute",
      image: "",
      token: "",
      courseid: 156,
      player_url: "../imp/player.html",
      pdf_view_api: "https://pdfweb.classx.co.in/pdfjs-latest/web/viewer.html?file=",
      pdf_dow_api: "https://pdf-appx.edumate.life/?url="
    },
   RWA: {
      id: "RWA",
      domain: "chutapi.smexfot.workers.dev",
      name: "ROJGAR WITH ANKIT",
      "stylishName(brand)": "RWA",
      image: "https://mtaiirus-v2.lovable.app/__l5e/assets-v1/87aad433-8d08-44d9-be73-30658f34b830/mtaiirus-logo.jpg",
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE0NDA2MzA2IiwidGltZXN0YW1wIjoxNzc3OTk5NjgzLCJpdl92ZXIiOjEsInNlc3Npb24iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZJakUwTkRBMk16QTJJaXdpWlcxaGFXd2lPaUpoY201cGFHWjBZM2xtWkVCbWFHbHRiUzVqYjIwaUxDSnVZVzFsSWpvaVJYQmhjblZ1SUhOb1lYSnVZU0lzSW5SbGJtRnVkRlI1Y0dVaU9pSjFjMlZ5SWl3aWRHVnVZVzUwVG1GdFpTSTZJbkp2ZW1kaGNsOWtZaUlzSW5SbGJtRnVkRWxrSWpvaUlpd2laR2x6Y0c5ellXSnNaU0k2Wm1Gc2MyVjkuUVF3azVBSTZHYXZ0M2hFZHhrbkR5LUhBeDZ4ME1MOW9sQ2pwQnpxQW9XMCJ9.1Do6ZcvqA6XS662YgywMvHCjQmMLfwp55PIK1TJ8B7w",
      courseid: 184,
      player_url: "player.html",
      pdf_view_api: "https://pdfweb.classx.co.in/pdfjs-latest/web/viewer.html?file=",
      pdf_dow_api: "https://pdf-appx.edumate.life/?url="
    },
        // Add more entries below, one per app:
    // 9999: { id: "9999", domain: "...", name: "...", "stylishName(brand)": "...", image: "", token: "", courseid: 0, player_url: "", pdf_view_api: "...", pdf_dow_api: "..." },
  };

  // --- Validate params ---
  const app = req.query.app;
  const i = req.query.i; // reserved param, currently unused in response

  if (!app) {
    res.status(400).json({ error: "Missing required parameter: app" });
    return;
  }

  const entry = apps[app];

  if (!entry) {
    res.status(404).json({ error: "app not found" });
    return;
  }

  res.status(200).json(entry);
}
