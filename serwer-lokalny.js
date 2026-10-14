/*
  Lokalny serwer do podgladu strony przed wgraniem na Hostingera.
  Live Server z VS Code nie czyta .htaccess, wiec czyste adresy w rodzaju
  /cennik czy /kontakt zwracaja u niego "Cannot GET". Ten serwer odwzorowuje
  reguly z .htaccess, dzieki czemu lokalnie klikasz strone tak samo jak na
  brevka.pl.

  Uruchomienie:   node serwer-lokalny.js
  Potem otworz:   http://localhost:5500

  To plik wylacznie deweloperski - nie trzeba go wgrywac na serwer.
*/

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = 5500;
const KATALOG = __dirname;

const TYPY = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

function istnieje(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

const serwer = http.createServer((req, res) => {
  let sciezka;
  try {
    sciezka = decodeURIComponent(url.parse(req.url).pathname);
  } catch {
    sciezka = url.parse(req.url).pathname;
  }

  // zablokuj wyjscie poza katalog projektu
  const bezpieczna = path
    .normalize(sciezka)
    .replace(/^(\.\.[\/\\])+/, "")
    .replace(/\\/g, "/");

  // 1. /index.html oraz /index -> przekierowanie na /
  if (/^\/index(\.html)?$/.test(bezpieczna)) {
    res.writeHead(301, { Location: "/" });
    return res.end();
  }

  // 2. /cokolwiek.html -> przekierowanie na /cokolwiek (czyste adresy)
  if (bezpieczna.endsWith(".html")) {
    res.writeHead(301, { Location: bezpieczna.slice(0, -5) });
    return res.end();
  }

  // 3. / -> index.html
  let plik = path.join(KATALOG, bezpieczna === "/" ? "index.html" : bezpieczna);

  // 4. istniejacy plik (styles/, scripts/, images/, sitemap.xml, robots.txt)
  if (!istnieje(plik)) {
    // 5. adres bez rozszerzenia -> doklej .html
    const zHtml = plik + ".html";
    if (istnieje(zHtml)) {
      plik = zHtml;
    } else {
      // 6. ErrorDocument 404 /index.html - tak samo jak na serwerze
      console.log("  404 ->", bezpieczna, "(serwuje index.html, jak Hostinger)");
      res.writeHead(404, { "Content-Type": TYPY[".html"] });
      return res.end(fs.readFileSync(path.join(KATALOG, "index.html")));
    }
  }

  const typ = TYPY[path.extname(plik).toLowerCase()] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": typ, "Cache-Control": "no-store" });
  fs.createReadStream(plik).pipe(res);
});

serwer.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.log("");
    console.log("  Port " + PORT + " jest zajety - najpewniej dziala Live Server.");
    console.log("  Zatrzymaj Live Server (klik w 'Port: " + PORT + "' na dolnym pasku");
    console.log("  VS Code) i uruchom ten serwer jeszcze raz.");
    console.log("");
    process.exit(1);
  }
  throw e;
});

serwer.listen(PORT, () => {
  console.log("");
  console.log("  Brevka Esthetics - podglad lokalny");
  console.log("  http://localhost:" + PORT);
  console.log("");
  console.log("  Czyste adresy dzialaja tak jak na brevka.pl, np.:");
  console.log("    http://localhost:" + PORT + "/cennik");
  console.log("    http://localhost:" + PORT + "/kontakt");
  console.log("    http://localhost:" + PORT + "/polityka-prywatnosci");
  console.log("");
  console.log("  Zatrzymanie: Ctrl+C");
  console.log("");
});
