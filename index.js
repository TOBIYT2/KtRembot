import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';
import chalk from 'chalk';

console.log('\n✰ Iniciando Rembot ✰');

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, description, author, version } = require(join(__dirname, './package.json'));
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

say('Rembot', {
  font: 'block',
  align: 'center',
  colors: ['magentaBright']
});
say(`Multi Device`, {
  font: 'chrome',
  align: 'center',
  colors: ['redBright']
});
say(`Developed By • Tobi`, {
  font: 'console',
  align: 'center',
  colors: ['blueBright']
});

function start(file, sessionName) {
  let isRunning = false;
  if (isRunning) return;
  isRunning = true;

  const args = [join(__dirname, file), sessionName, ...process.argv.slice(2)];
  say(`Iniciando ${sessionName}`, {
    font: 'console',
    align: 'center',
    colors: ['candy']
  });

  setupMaster({
    exec: args[0],
    args: args.slice(1),
  });

  let p = fork();
  p.on('message', data => {
    switch (data) {
      case 'reset':
        p.process.kill();
        isRunning = false;
        start(file, sessionName);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
    }
  });

  p.on('exit', (_, code) => {
    isRunning = false;
    console.error(`🥀 Error en ${sessionName}:\n`, code);
    process.exit();
    if (code === 0) return;
    watchFile(args[0], () => {
      unwatchFile(args[0]);
      start(file, sessionName);
    });
  });

  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  if (!opts['test'])
    if (!rl.listenerCount('line')) rl.on('line', line => {
      p.emit('message', line.trim());
    });
}

process.on('warning', (warning) => {
  if (warning.name === 'MaxListenersExceededWarning') {
    console.warn('🥀 Se excedió el límite de Listeners en:');
    console.warn(warning.stack);
  }
});

// 🟢 Lanza hasta 3 sesiones diferentes:
start('starcore.js', 'session-bot1');
start('starcore.js', 'session-bot2');
start('starcore.js', 'session-bot3');