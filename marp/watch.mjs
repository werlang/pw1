#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname);
const REPO_DIR = path.resolve(ROOT_DIR, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const THEMES_DIR = path.join(ROOT_DIR, 'themes');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');
const THEME_FILE = path.join(THEMES_DIR, 'ifsul.css');
const WATCH_INTERVAL_MS = 800;
const REBUILD_DELAY_MS = 250;

let isBuilding = false;
let buildAgain = false;
let snapshot = new Map();
let debounceTimer = null;
let scanTimer = null;

function log(message) {
  console.log(`[watch] ${message}`);
}

function fail(message) {
  console.error(`[watch] ${message}`);
  process.exit(1);
}

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function validatePaths() {
  if (!(await exists(CONTENT_DIR))) {
    fail(`Diretorio nao encontrado: ${CONTENT_DIR}`);
  }

  if (!(await exists(THEME_FILE))) {
    fail(`Tema nao encontrado: ${THEME_FILE}`);
  }
}

async function collectEntries(dirPath, entries = []) {
  let dirEntries = [];

  try {
    dirEntries = await fs.readdir(dirPath, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return entries;
    }

    throw error;
  }

  for (const entry of dirEntries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await collectEntries(fullPath, entries);
      continue;
    }

    entries.push(fullPath);
  }

  return entries;
}

function shouldWatch(filePath) {
  const relativePath = path.relative(ROOT_DIR, filePath);

  if (relativePath.startsWith(`content${path.sep}`)) {
    return filePath.endsWith('.md') || filePath.endsWith('.markdown');
  }

  if (relativePath.startsWith(`themes${path.sep}`)) {
    return filePath.endsWith('.css');
  }

  if (relativePath.startsWith(`assets${path.sep}`)) {
    return true;
  }

  return false;
}

async function createSnapshot() {
  const nextSnapshot = new Map();
  const directories = [CONTENT_DIR, THEMES_DIR, ASSETS_DIR];

  for (const directory of directories) {
    const files = await collectEntries(directory);

    for (const filePath of files) {
      if (!shouldWatch(filePath)) {
        continue;
      }

      const stats = await fs.stat(filePath);
      const key = path.relative(ROOT_DIR, filePath);

      nextSnapshot.set(key, `${stats.size}:${stats.mtimeMs}`);
    }
  }

  return nextSnapshot;
}

function diffSnapshots(previousSnapshot, nextSnapshot) {
  const changedFiles = [];

  for (const [filePath, fingerprint] of nextSnapshot) {
    if (previousSnapshot.get(filePath) !== fingerprint) {
      changedFiles.push(filePath);
    }
  }

  for (const filePath of previousSnapshot.keys()) {
    if (!nextSnapshot.has(filePath)) {
      changedFiles.push(filePath);
    }
  }

  return changedFiles.sort();
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: ROOT_DIR,
      stdio: 'inherit',
      env: {
        ...process.env,
        LANG: process.env.LANG || 'pt-BR.UTF-8',
      },
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} saiu com codigo ${code}`));
    });
  });
}

async function moveGeneratedFiles() {
  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.html')) {
      continue;
    }

    const name = path.basename(entry.name, '.html');
    const sourcePath = path.join(CONTENT_DIR, entry.name);
    const targetDir = path.join(REPO_DIR, name, 'slide');
    const targetPath = path.join(targetDir, 'index.html');

    await fs.mkdir(targetDir, { recursive: true });
    await fs.rename(sourcePath, targetPath);
  }
}

async function buildSlides(reason) {
  if (isBuilding) {
    buildAgain = true;
    return;
  }

  isBuilding = true;

  try {
    log(`Reconstruindo slides (${reason})...`);

    await runCommand('npx', [
      '--yes',
      '@marp-team/marp-cli',
      '--theme-set',
      './themes/ifsul.css',
      '--input-dir',
      '.',
    ]);

    await moveGeneratedFiles();
    log('Build concluido.');
  } catch (error) {
    console.error(`[watch] Falha no build: ${error.message}`);
  } finally {
    isBuilding = false;

    if (buildAgain) {
      buildAgain = false;
      await buildSlides('mudancas acumuladas');
    }
  }
}

function scheduleBuild(reason) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    buildSlides(reason).catch((error) => {
      console.error(`[watch] Erro inesperado: ${error.message}`);
    });
  }, REBUILD_DELAY_MS);
}

async function scanForChanges() {
  try {
    const nextSnapshot = await createSnapshot();
    const changedFiles = diffSnapshots(snapshot, nextSnapshot);

    if (changedFiles.length === 0) {
      return;
    }

    snapshot = nextSnapshot;
    log(`Mudancas detectadas: ${changedFiles.join(', ')}`);
    scheduleBuild(changedFiles[0]);
  } catch (error) {
    console.error(`[watch] Erro ao verificar arquivos: ${error.message}`);
  }
}

async function main() {
  await validatePaths();
  snapshot = await createSnapshot();

  await buildSlides('build inicial');
  snapshot = await createSnapshot();

  log('Observando arquivos em content/, themes/ e assets/.');
  scanTimer = setInterval(scanForChanges, WATCH_INTERVAL_MS);
}

function shutdown(signal) {
  if (scanTimer) {
    clearInterval(scanTimer);
  }

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  log(`Encerrando watcher (${signal}).`);
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

main().catch((error) => {
  fail(error.message);
});