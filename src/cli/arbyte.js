#!/usr/bin/env node

import { Command } from 'commander';
import { version , info , wakeup } from '../commands/index.js';
const program = new Command();

// version
program.option('-v, --version').action(version);
program.command('version').alias('v').action(version);

// info
program.option('-i, --info').action(info);
program.command('info').alias('i').action(info);

// wakeup
program.option('-w, --wakeup').action(wakeup);
program.command('wakeup').alias('w').action(wakeup);

program.parse(process.argv);

