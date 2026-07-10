export default function handler(req, res) {
  // --- CORS ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // --- Data store ---
  const domains = {
    gyanbindu: {
      id: "gyanbindu",
      domain: "gyanbinduapi.appx.co.in",
      name: "GYAN BINDU",
      "stylishName(brand)": "GYAN +BINDU",
      image: "",
      token: "",
      courseid: 37,
      player_url: "",
      pdf_view_api: "https://pdfweb.classx.co.in/pdfjs-latest/web/viewer.html?file=",
      pdf_dow_api: "https://pdf-appx.edumate.life/?url="
    },
    rozgar: {
      id: "rozgar",
      domain: "rozgarapinew.teachx.in",
      name: "ROJGAR WITH ANKIT",
      "stylishName(brand)": "RW +ANKIT",
      image: "",
      token: "",
      courseid: 184,
      player_url: "https://mute-butterfly-7f12.techdesh5.workers.dev/player?url=",
      pdf_view_api: "https://pdfweb.classx.co.in/pdfjs-latest/web/viewer.html?file=",
      pdf_dow_api: "https://pdf-appx.edumate.life/?url="
    },
    winnersinstitute: {
  id: "winnersinstitute",
  domain: "winnersinstituteapi.cloudflare.net.in",
  name: "Winner Institute",
  "stylishName(brand)": "Winner Institute +INDORE",
  image: "",
  token: "",
  courseid: 156,
  player_url: "https://mute-butterfly-7f12.techdesh5.workers.dev/player?url=",
  pdf_view_api: "https://pdfweb.classx.co.in/pdfjs-latest/web/viewer.html?file=",
  pdf_dow_api: "https://pdf-appx.edumate.life/?url="
},
 physicsumeshrajori: {
    "id": "physicsumeshrajori",
    "domain": "physicsumeshrajoriaapi.classx.co.in",
    "name": "PHYSICS UMESH",
    "stylishName(brand)": "PHYSICS WITH+UMESH RAJORIA",
    "image": "",
    "token": "",
    "courseid": 184,
    "player_url": "",
    "pdf_view_api": "https://pdfweb.classx.co.in/pdfjs-latest/web/viewer.html?file=",
    "pdf_dow_api": "https://pdf-appx.edumate.life/?url="
}
    // Add more entries below, one per domainId:
    // 9999: { id: "9999", domain: "...", name: "...", "stylishName(brand)": "...", image: "", token: "", courseid: 0, player_url: "", pdf_view_api: "...", pdf_dow_api: "..." },
  };

  // --- Validate params ---
  const domainId = req.query.domainId;
  const i = req.query.i; // reserved param, currently unused in response

  if (!domainId) {
    res.status(400).json({ error: "Missing required parameter: domainId" });
    return;
  }

  const entry = domains[domainId];

  if (!entry) {
    res.status(404).json({ error: "Domain not found" });
    return;
  }

  res.status(200).json(entry);
}
