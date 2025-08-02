#!/usr/bin/env python3
"""
Test script for the LEAN CLI service.
"""

import requests
import json
import time
from pathlib import Path

BASE_URL = "http://localhost:8000"

def test_health():
    """Test the health endpoint"""
    print("Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False

def test_backtest():
    """Test executing a backtest"""
    print("\nTesting backtest execution...")
    
    # Simple test strategy
    strategy_code = """
from AlgorithmImports import *

class StrategyAlgorithm(QCAlgorithm):
    def Initialize(self):
        self.SetStartDate(2020, 1, 1)
        self.SetEndDate(2021, 1, 1)
        self.SetCash(100000)
        self.AddEquity("SPY")
    
    def OnData(self, data):
        if not self.Portfolio.Invested:
            self.SetHoldings("SPY", 1.0)
"""
    
    request_data = {
        "backtest_id": "test-123",
        "strategy_code": strategy_code
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/backtest",
            json=request_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Backtest started: {result['backtest_id']}")
            return result['backtest_id']
        else:
            print(f"❌ Backtest failed: {response.status_code}")
            print(f"Response: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Backtest failed: {e}")
        return None

def check_result(backtest_id):
    """Check backtest result"""
    try:
        response = requests.get(f"{BASE_URL}/backtest/{backtest_id}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"Status: {result['status']}")
            
            if result.get('results'):
                print(f"Total Return: {result['results']['totalReturn']:.2%}")
                print(f"Sharpe Ratio: {result['results']['sharpeRatio']:.2f}")
                print(f"Max Drawdown: {result['results']['maxDrawdown']:.2%}")
                print(f"Final Portfolio: ${result['results']['finalPortfolioValue']:,.2f}")
            
            if result.get('error'):
                print(f"Error: {result['error']}")
                
            return result['status'] == 'completed'
        else:
            print(f"❌ Result check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Result check failed: {e}")
        return False

def main():
    """Run tests"""
    print("🧪 Testing LEAN CLI Service")
    print("=" * 40)
    
    if not test_health():
        print("\n❌ Service not running. Start with: uvicorn main:app --reload")
        return
    
    backtest_id = test_backtest()
    if not backtest_id:
        return
    
    # Wait for completion
    print("\n⏳ Waiting for backtest to complete...")
    for i in range(10):
        time.sleep(5)
        if check_result(backtest_id):
            print("\n✅ Backtest completed!")
            break
    else:
        print("\n⏰ Backtest still running after 50 seconds")

if __name__ == "__main__":
    main() 