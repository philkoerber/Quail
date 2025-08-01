export interface StrategyTemplate {
    id: string;
    name: string;
    code: string;
}

export const strategyTemplates: StrategyTemplate[] = [
    {
        id: 'default-template',
        name: 'Default Template',
        code: `from AlgorithmImports import *

class StrategyAlgorithm(QCAlgorithm):
    def Initialize(self):
        self.SetStartDate(2020, 1, 1)
        self.SetEndDate(2023, 12, 31)
        self.SetCash(100000)
        
        # Add equities
        self.spy = self.AddEquity("SPY")
        self.bnd = self.AddEquity("BND")
        self.aapl = self.AddEquity("AAPL")
        
        # Set benchmark
        self.SetBenchmark("SPY")
        
        # Set warmup period
        self.SetWarmUp(30)

    def OnData(self, data):
        if self.IsWarmingUp:
            return
            
        if not self.Portfolio.Invested:
            self.SetHoldings("SPY", 0.33)
            self.SetHoldings("BND", 0.33)
            self.SetHoldings("AAPL", 0.33)`
    }
]; 