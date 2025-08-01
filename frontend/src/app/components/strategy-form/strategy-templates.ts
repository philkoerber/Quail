export interface StrategyTemplate {
    id: string;
    name: string;
    code: string;
}

export const strategyTemplates: StrategyTemplate[] = [
    {
        id: 'default-template',
        name: 'Default Template',
        code: `# region imports
from AlgorithmImports import *
# endregion

class DefaultTemplate(QCAlgorithm):

    def initialize(self):
        self.set_start_date(2024, 1, 31)
        self.set_cash(100000)
        self.add_equity("SPY", Resolution.MINUTE)
        self.add_equity("BND", Resolution.MINUTE)
        self.add_equity("AAPL", Resolution.MINUTE)

    def on_data(self, data: Slice):
        if not self.portfolio.invested:
            self.set_holdings("SPY", 0.33)
            self.set_holdings("BND", 0.33)
            self.set_holdings("AAPL", 0.33)`
    }
]; 