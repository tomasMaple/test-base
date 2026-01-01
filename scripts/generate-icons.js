const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/icons/components');
const indexPath = path.join(__dirname, '../src/icons/index.ts');

if (!fs.existsSync(componentsDir)) {
  console.error('Components directory does not exist. Run svgr build first.');
  process.exit(1);
}

const files = fs
  .readdirSync(componentsDir)
  .filter((f) => f.endsWith('.tsx'));

const exportLines = files
  .map((f) => {
    const name = f.replace('.tsx', '');
    // Prefix names starting with a number with underscore
    const exportName = /^\d/.test(name) ? `_${name}` : name;
    return `export { default as ${exportName} } from './components/${name}';`;
  })
  .sort()
  .join('\n');

fs.writeFileSync(indexPath, exportLines + '\n');
console.log(`✓ Generated index.ts with ${files.length} icons`);

