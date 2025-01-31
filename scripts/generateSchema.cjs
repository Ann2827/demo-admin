const tsj = require('ts-json-schema-generator');
const fs = require('fs');
const { getParameter } = require('./helper.cjs');
const path = require('path');

const sourcePath = getParameter('--source');
if (!sourcePath) {
  throw new Error('Missing source path, for example: --source=./file.types.ts');
}

const outputPath = getParameter('--output');
if (!outputPath) {
  throw new Error('Missing output path, for example: --output=./schema.json');
}

let tsconfigPath = getParameter('--tsconfig');
if (!tsconfigPath) {
  tsconfigPath = './tsconfig.json';
}

// console.log('sourcePath', sourcePath, path.resolve(__dirname, '../', sourcePath))
// console.log('outputPath', outputPath, path.resolve(__dirname, '../', outputPath))

/** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
const config = {
  path: path.resolve(__dirname, '../', sourcePath),
  tsconfig: path.resolve(__dirname, '../', tsconfigPath),
  type: '*', // Or <type-name> if you want to generate schema for that one type only
};

const schema = tsj.createGenerator(config).createSchema(config.type);
const schemaString = JSON.stringify(schema, null, 2);
fs.writeFile(path.resolve(__dirname, '../', outputPath), schemaString, (err) => {
  if (err) throw err;
});
