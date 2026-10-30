const fs = require('fs');
const path = require('path');

// 1. CONFIGURATION
const BASE_URL = 'https://ammonite.kelpw.ing';
const TARGET_DIR = './';
const OUTPUT_FILE = './sitemap.xml';
const XMLNS = 'http://www.sitemaps.org/schemas/sitemap/0.9';

// Files, extensions, and directory names to ignore
const IGNORE_FILES = ['README.md', 'generate_sitemap.py','favicon.ico','sitemap.xml', '404.html', 'site.css', 'browse.css', 'icon.png', '_redirects', '.gitignore', 'signature_supertiny.png'];
const IGNORE_EXTENSIONS = ['.db-wal','.db-shm','.js', '.css', '.json','.yml','.db','.sql',''];
const IGNORE_DIRECTORY = ['./admin','./server', './.test', './.vscode', './.git', './icons', './pfp', './pattern', './scripts'];
const INCLUDE_ASSETS = true;

// 2. RECURSIVELY SCAN DIRECTORY FOR FILES
function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      const relativeDirectory = path.relative(TARGET_DIR, fullPath).replace(/\\/g, '/');
      const isIgnoredDirectory = IGNORE_DIRECTORY.some((directory) => {
        const normalizedDirectory = directory.replace(/\\/g, '/').replace(/^\.\/|\/$/g, '');
        return normalizedDirectory === file || normalizedDirectory === relativeDirectory;
      });
      if (isIgnoredDirectory) {
        return;
      }
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      const ext = path.extname(file).toLowerCase();
      const isPage = ext === '.html';
      if (
        !IGNORE_EXTENSIONS.includes(ext) &&
        !IGNORE_FILES.includes(file) &&
        (isPage || INCLUDE_ASSETS)
      ) {
        results.push(fullPath);
      }
    }
  });

  return results;
}

// 3. CONVERT FILE PATHS TO URL ROUTES
function convertFilesToRoutes(files, baseDir) {
  return files.map((file) => {
    // Get relative path from the base directory
    let relativePath = path.relative(baseDir, file).replace(/\\/g, '/');
    const isPage = path.extname(relativePath).toLowerCase() === '.html';

    // Keep asset paths intact; page routes omit the .html extension.
    if (isPage) {
      relativePath = relativePath.slice(0, -path.extname(relativePath).length);
    }

    // Clean up 'index' files to point to the root directory/sub-root
    if (relativePath === 'index') {
      relativePath = '';
    } else if (relativePath.endsWith('/index')) {
      relativePath = relativePath.slice(0, -6);
    }

    // Format final URL path string
    const urlPath = relativePath ? `/${relativePath}` : '/';
    
    // Assign higher priorities to home/root routes
    const priority = urlPath === '/' ? '1.0' : '0.7';

    return {
      url: urlPath,
      priority: priority,
      lastmod: fs.statSync(file).mtime.toISOString().split('T')[0] // Uses actual file edit date
    };
  });
}

// 4. GENERATE AND WRITE XML
function main() {
  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`❌ Target directory does not exist: ${TARGET_DIR}`);
    return;
  }

  console.log(`🔍 Scanning ${TARGET_DIR} for pages...`);
  const allFiles = getFilesRecursively(TARGET_DIR);
  const routes = convertFilesToRoutes(allFiles, TARGET_DIR);

  const xmlUrls = routes
    .map((route) => {
      return `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    })
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="${XMLNS}">
${xmlUrls}
</urlset>`;

  fs.writeFileSync(OUTPUT_FILE, sitemapXml, 'utf8');
  console.log(`\n✅ sitemap.xml successfully generated with ${routes.length} discovered pages!`);
}

main();
