// src/lean/lean.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';

const execAsync = promisify(exec);

@Injectable()
export class LeanService {
    async runBacktest(strategyId: string, code: string): Promise<any> {
        const projectDir = path.resolve(`./temp/${strategyId}`);
        const codePath = path.join(projectDir, 'main.py');
        const resultsPath = path.join(projectDir, 'backtest-results.json');

        try {
            await fs.mkdir(projectDir, { recursive: true });
            await fs.writeFile(codePath, code);

            const command = `docker run --rm -v ${projectDir}:/Lean/Strategy quantconnect/lean:latest backtest "main.py"`;

            const { stdout, stderr } = await execAsync(command, { cwd: projectDir });

            if (stderr) {
                console.error('LEAN CLI STDERR:', stderr);
            }

            const resultJson = await fs.readFile(resultsPath, 'utf8');
            return JSON.parse(resultJson);
        } catch (err) {
            console.error('LeanService Error:', err);
            throw new InternalServerErrorException('LEAN backtest failed');
        }
    }
}
