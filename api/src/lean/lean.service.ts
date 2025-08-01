// src/lean/lean.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LeanService {
    private readonly leanCliUrl = process.env.LEAN_CLI_URL || 'http://localhost:8000';

    constructor(private readonly httpService: HttpService) { }

    async runBacktest(strategyId: string, code: string): Promise<any> {
        try {
            // Start the backtest
            const backtestRequest = {
                backtest_id: strategyId,
                strategy_code: code
            };

            const startResponse = await firstValueFrom(
                this.httpService.post(`${this.leanCliUrl}/backtest`, backtestRequest)
            );

            if (startResponse.status !== 200) {
                throw new Error('Failed to start backtest');
            }

            // Poll for results
            let attempts = 0;
            const maxAttempts = 60; // 5 minutes with 5-second intervals
            const pollInterval = 5000; // 5 seconds

            while (attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, pollInterval));
                attempts++;

                try {
                    const resultResponse = await firstValueFrom(
                        this.httpService.get(`${this.leanCliUrl}/backtest/${strategyId}`)
                    );

                    if (resultResponse.status === 200) {
                        const result = resultResponse.data;

                        if (result.status === 'completed') {
                            return result.results || result.performance;
                        } else if (result.status === 'failed') {
                            throw new Error(result.error || 'Backtest failed');
                        }
                        // If still running, continue polling
                    }
                } catch (error) {
                    console.error('Error polling backtest result:', error);
                }
            }

            throw new Error('Backtest timed out');
        } catch (error) {
            console.error('LeanService Error:', error);
            throw new InternalServerErrorException('LEAN backtest failed: ' + error.message);
        }
    }
}
