#!/usr/bin/env python3
"""
Test script for LEAN CLI service
This script tests the backtest functionality of the lean-cli service
"""

import requests
import json
import time
import sys

# Configuration
LEAN_CLI_URL = "http://localhost:8000"

def test_health_check():
    """Test the health endpoint"""
    print("🔍 Testing health check...")
    try:
        response = requests.get(f"{LEAN_CLI_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_simple_backtest():
    """Test a simple backtest"""
    print("\n🔍 Testing simple backtest...")
    
    # Simple strategy code
    strategy_code = """
print("Hello from LEAN CLI!")
print("This is a simple test strategy")
"""
    
    backtest_request = {
        "backtest_id": "test_simple_001",
        "strategy_code": strategy_code,
        "start_date": "2020-01-01",
        "end_date": "2021-01-01",
        "initial_capital": 100000
    }
    
    try:
        # Start backtest
        response = requests.post(f"{LEAN_CLI_URL}/backtest", json=backtest_request)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Backtest started: {data}")
            
            # Poll for results
            backtest_id = data["backtest_id"]
            max_attempts = 10
            for attempt in range(max_attempts):
                time.sleep(2)
                result_response = requests.get(f"{LEAN_CLI_URL}/backtest/{backtest_id}")
                
                if result_response.status_code == 200:
                    result_data = result_response.json()
                    print(f"📊 Backtest status: {result_data['status']}")
                    
                    if result_data["status"] == "completed":
                        print(f"✅ Backtest completed successfully!")
                        print(f"📈 Results: {json.dumps(result_data['results'], indent=2)}")
                        return True
                    elif result_data["status"] == "failed":
                        print(f"❌ Backtest failed: {result_data.get('error')}")
                        return False
                else:
                    print(f"❌ Failed to get backtest result: {result_response.status_code}")
                    return False
            
            print("❌ Backtest timed out")
            return False
        else:
            print(f"❌ Failed to start backtest: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backtest error: {e}")
        return False

def test_trading_strategy():
    """Test a more realistic trading strategy"""
    print("\n🔍 Testing trading strategy...")
    
    # Moving average crossover strategy
    strategy_code = """
from AlgorithmImports import *

class MovingAverageCrossover(QCAlgorithm):
    def Initialize(self):
        self.SetStartDate(2020, 1, 1)
        self.SetEndDate(2021, 1, 1)
        self.SetCash(100000)
        
        self.symbol = self.AddEquity("SPY").Symbol
        self.fast_ma = self.SMA(self.symbol, 10)
        self.slow_ma = self.SMA(self.symbol, 30)
        
    def OnData(self, data):
        if not self.fast_ma.IsReady or not self.slow_ma.IsReady:
            return
            
        if self.fast_ma.Current.Value > self.slow_ma.Current.Value:
            if not self.Portfolio[self.symbol].IsLong:
                self.SetHoldings(self.symbol, 1.0)
        else:
            if self.Portfolio[self.symbol].IsLong:
                self.Liquidate(self.symbol)
"""
    
    backtest_request = {
        "backtest_id": "ma_crossover_test",
        "strategy_code": strategy_code,
        "start_date": "2020-01-01",
        "end_date": "2021-01-01",
        "initial_capital": 100000
    }
    
    try:
        # Start backtest
        response = requests.post(f"{LEAN_CLI_URL}/backtest", json=backtest_request)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Trading strategy backtest started: {data}")
            
            # Poll for results
            backtest_id = data["backtest_id"]
            max_attempts = 10
            for attempt in range(max_attempts):
                time.sleep(2)
                result_response = requests.get(f"{LEAN_CLI_URL}/backtest/{backtest_id}")
                
                if result_response.status_code == 200:
                    result_data = result_response.json()
                    print(f"📊 Trading strategy status: {result_data['status']}")
                    
                    if result_data["status"] == "completed":
                        print(f"✅ Trading strategy backtest completed!")
                        results = result_data['results']
                        print(f"📈 Total Return: {results['totalReturn']:.2%}")
                        print(f"📈 Sharpe Ratio: {results['sharpeRatio']:.2f}")
                        print(f"📈 Max Drawdown: {results['maxDrawdown']:.2%}")
                        print(f"📈 Win Rate: {results['winRate']:.2%}")
                        print(f"📈 Final Portfolio Value: ${results['finalPortfolioValue']:,.2f}")
                        print(f"📈 Total Trades: {results['totalTrades']}")
                        return True
                    elif result_data["status"] == "failed":
                        print(f"❌ Trading strategy backtest failed: {result_data.get('error')}")
                        return False
                else:
                    print(f"❌ Failed to get trading strategy result: {result_response.status_code}")
                    return False
            
            print("❌ Trading strategy backtest timed out")
            return False
        else:
            print(f"❌ Failed to start trading strategy backtest: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Trading strategy error: {e}")
        return False

def test_error_handling():
    """Test error handling with invalid input"""
    print("\n🔍 Testing error handling...")
    
    # Test with invalid backtest_id
    try:
        response = requests.get(f"{LEAN_CLI_URL}/backtest/nonexistent_id")
        if response.status_code == 404:
            print("✅ Error handling working correctly (404 for non-existent backtest)")
            return True
        else:
            print(f"❌ Unexpected response for non-existent backtest: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error handling test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 Starting LEAN CLI Service Tests")
    print("=" * 50)
    
    tests = [
        test_health_check,
        test_simple_backtest,
        test_trading_strategy,
        test_error_handling
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        try:
            if test():
                passed += 1
        except Exception as e:
            print(f"❌ Test {test.__name__} crashed: {e}")
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! LEAN CLI service is working correctly.")
        return 0
    else:
        print("⚠️  Some tests failed. Please check the service configuration.")
        return 1

if __name__ == "__main__":
    sys.exit(main()) 