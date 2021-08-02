#!/usr/bin/env node

const fs = require('fs');
const resolveConfig = require('tailwindcss/resolveConfig');
const prettier = require('prettier');
const path = require('path');
// bring in the Tailwind config
const tailwindConfig = require('../tailwind.config.js');

const { theme } = resolveConfig(tailwindConfig);
const themeStr = JSON.stringify(theme);

try {
  // write the file to src/theme.js after
  // having prettier format the string for us
  fs.writeFileSync(
    path.resolve(process.cwd(), './tailwind.config.dist.json'),
    prettier.format(themeStr, { parser: 'json' }),
    'utf-8',
  );
} catch (err) {
  // uh-oh, something happened here!
  console.log(err.message);
}
