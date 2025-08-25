// check-imports-case.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectDir = path.resolve(__dirname, 'src'); // Cambiar si tu código no está en src

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let allFiles = [];
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      allFiles = allFiles.concat(walkDir(fullPath));
    } else {
      allFiles.push(fullPath);
    }
  }
  return allFiles;
}

function getRealPath(resolvedPath) {
  if (!fs.existsSync(resolvedPath)) return null;
  const parts = resolvedPath.split(path.sep);
  let current = path.isAbsolute(resolvedPath) ? path.sep : '';
  for (const part of parts) {
    const files = fs.readdirSync(current || path.sep);
    const match = files.find((f) => f.toLowerCase() === part.toLowerCase());
    if (!match) return null;
    current = path.join(current, match);
  }
  return current;
}

function checkImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const importRegex = /import\s+.*\s+from\s+['"](.*)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    let importPath = match[1];
    if (!importPath.startsWith('.')) continue; // solo paths relativos
    const resolvedPath = path.resolve(path.dirname(filePath), importPath);

    const possibleExtensions = [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '/index.ts',
      '/index.tsx',
      '/index.js',
      '/index.jsx',
    ];
    let found = false;
    let realPath = null;
    for (const ext of possibleExtensions) {
      const tryPath = resolvedPath + ext;
      if (fs.existsSync(tryPath)) {
        found = true;
        realPath = getRealPath(tryPath);
        break;
      }
    }
    if (!found && fs.existsSync(resolvedPath)) {
      realPath = getRealPath(resolvedPath);
      found = true;
    }

    if (!found) {
      console.log(`❌ Archivo no encontrado: ${importPath} en ${filePath}`);
    } else if (
      realPath &&
      path.normalize(resolvedPath) !== path.normalize(realPath)
    ) {
      console.log(`⚠️ Case mismatch: ${importPath} en ${filePath}`);
      console.log(`   -> Path real en disco: ${realPath}`);
    }
  }
}

const allFiles = walkDir(projectDir).filter(
  (f) => f.endsWith('.ts') || f.endsWith('.tsx')
);
allFiles.forEach((f) => checkImports(f));

console.log('✅ Revisión completa');
