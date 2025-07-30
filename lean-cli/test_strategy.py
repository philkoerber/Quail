from AlgorithmImports import *

class StrategyAlgorithm(QCAlgorithm):
    """
    A simple test strategy for the LEAN CLI.
    This strategy buys and holds SPY.
    """
    
    def Initialize(self):
        """Initialize the algorithm"""
        self.SetStartDate(2020, 1, 1)
        self.SetEndDate(2021, 1, 1)
        self.SetCash(100000)
        
        # Add SPY as the main equity
        self.spy = self.AddEquity("SPY")
        self.spy.SetDataNormalizationMode(DataNormalizationMode.Adjusted)
        
        # Set benchmark
        self.SetBenchmark("SPY")
        
        # Set warmup period
        self.SetWarmUp(30)
        
        # Schedule rebalancing
        self.Schedule.On(self.DateRules.MonthStart("SPY"), 
                        self.TimeRules.At(9, 30), 
                        self.Rebalance)
    
    def Rebalance(self):
        """Rebalance the portfolio monthly"""
        if not self.IsWarmingUp:
            # Simple buy and hold strategy
            if not self.Portfolio.Invested:
                self.SetHoldings("SPY", 1.0)
                self.Debug("Bought SPY")
    
    def OnData(self, data):
        """Handle incoming data"""
        if self.IsWarmingUp:
            return
        
        # Log some basic information
        if data.ContainsKey("SPY"):
            self.Debug(f"SPY Price: {data['SPY'].Price}")
            self.Debug(f"Portfolio Value: {self.Portfolio.TotalPortfolioValue}")
    
    def OnEndOfAlgorithm(self):
        """Called at the end of the algorithm"""
        self.Debug("Algorithm completed")
        self.Debug(f"Final Portfolio Value: {self.Portfolio.TotalPortfolioValue}")
        self.Debug(f"Total Return: {self.Portfolio.TotalProfit}") 