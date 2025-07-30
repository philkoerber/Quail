#!/usr/bin/env python3
"""
Test script for the LEAN CLI service.
This script tests the basic functionality of the service.
"""

import requests
import json
import time
from pathlib import Path

# Service URL
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

def test_execute_backtest():
    """Test executing a backtest with LEAN CLI"""
    print("\nTesting backtest execution with LEAN CLI...")
    
    # Read test strategy
    strategy_file = Path("test_strategy.py")
    if not strategy_file.exists():
        print("❌ Test strategy file not found")
        return None
    
    with open(strategy_file, "r") as f:
        strategy_code = f.read()
    
    # Create backtest request
    request_data = {
        "backtest_id": "lean-cli-test-123",
        "strategy_code": strategy_code,
        "start_date": "2020-01-01",
        "end_date": "2021-01-01",
        "initial_capital": 100000.0
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
            print(f"   Status: {result['status']}")
            return result['backtest_id']
        else:
            print(f"❌ Backtest execution failed: {response.status_code}")
            print(f"Response: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Backtest execution failed: {e}")
        return None

def test_backtest_result(backtest_id):
    """Test checking backtest result"""
    print(f"\nTesting backtest result for {backtest_id}...")
    
    try:
        response = requests.get(f"{BASE_URL}/backtest/{backtest_id}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Status: {result['status']}")
            
            if result.get('results'):
                print(f"   Total Return: {result['results']['totalReturn']:.2%}")
                print(f"   Sharpe Ratio: {result['results']['sharpeRatio']:.2f}")
                print(f"   Max Drawdown: {result['results']['maxDrawdown']:.2%}")
                print(f"   Win Rate: {result['results']['winRate']:.2%}")
                print(f"   Final Portfolio Value: ${result['results']['finalPortfolioValue']:,.2f}")
            
            if result.get('error'):
                print(f"   Error: {result['error']}")
                
            return result
        else:
            print(f"❌ Result check failed: {response.status_code}")
            return None
    except Exception as e:
        print(f"❌ Result check failed: {e}")
        return None

def main():
    """Run all tests"""
    print("🧪 Testing LEAN CLI Service")
    print("=" * 50)
    
    # Test health
    if not test_health():
        print("\n❌ Service is not running. Please start the service first.")
        return
    
    # Test execute backtest
    backtest_id = test_execute_backtest()
    if not backtest_id:
        print("\n❌ Failed to execute backtest. Stopping tests.")
        return
    
    # Test result immediately
    test_backtest_result(backtest_id)
    
    # Wait and check result again (LEAN CLI takes longer)
    print("\n⏳ Waiting 10 seconds for LEAN CLI to complete backtest...")
    time.sleep(10)
    test_backtest_result(backtest_id)
    
    # Wait a bit more if still running
    print("\n⏳ Waiting another 10 seconds...")
    time.sleep(10)
    test_backtest_result(backtest_id)
    
    print("\n✅ All tests completed!")

if __name__ == "__main__":
    main() 