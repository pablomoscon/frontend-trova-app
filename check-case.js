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

function checkImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const importRegex = /import\s+.*\s+from\s+['"](.*)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    let importPath = match[1];
    if (!importPath.startsWith('.')) continue; // solo paths relativos
    const resolvedPath = path.resolve(path.dirname(filePath), importPath);

    const possibleExtensions = ['.ts', '.tsx', '.js', '.jsx'];
    let found = false;
    for (const ext of possibleExtensions) {
      if (fs.existsSync(resolvedPath + ext)) {
        found = true;
        break;
      }
    }
    if (!found && !fs.existsSync(resolvedPath)) {
      console.log(
        `❌ Import case mismatch or file missing: ${importPath} in ${filePath}`
      );
    }
  }
}

const allFiles = walkDir(projectDir).filter(
  (f) => f.endsWith('.ts') || f.endsWith('.tsx')
);
allFiles.forEach((f) => checkImports(f));

console.log('✅ Revisión completa');
