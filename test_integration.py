#!/usr/bin/env python3
"""
Integration test script for the Quail trading platform
Tests the complete flow: Frontend -> API -> Lean-CLI -> Database
"""

import requests
import json
import time
import sys

# Configuration
API_URL = "http://localhost:3000"
LEAN_CLI_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:4200"

def test_service_health():
    """Test all services are healthy"""
    print("🔍 Testing service health...")
    
    services = [
        ("Database", "docker exec quail-postgres-1 pg_isready -U quail_user -d quail_db"),
        ("Lean-CLI", f"{LEAN_CLI_URL}/health"),
        ("API", f"{API_URL}/strategies"),
        ("Frontend", f"{FRONTEND_URL}")
    ]
    
    all_healthy = True
    
    for name, endpoint in services:
        try:
            if name == "Database":
                import subprocess
                result = subprocess.run(endpoint.split(), capture_output=True, text=True)
                if result.returncode == 0:
                    print(f"✅ {name}: Healthy")
                else:
                    print(f"❌ {name}: Unhealthy")
                    all_healthy = False
            else:
                response = requests.get(endpoint, timeout=5)
                if response.status_code in [200, 401]:  # 401 is expected for API without auth
                    print(f"✅ {name}: Healthy (Status: {response.status_code})")
                else:
                    print(f"❌ {name}: Unhealthy (Status: {response.status_code})")
                    all_healthy = False
        except Exception as e:
            print(f"❌ {name}: Error - {e}")
            all_healthy = False
    
    return all_healthy

def test_lean_cli_integration():
    """Test lean-cli functionality"""
    print("\n🔍 Testing Lean-CLI integration...")
    
    # Test a simple backtest
    strategy_code = """
print("Integration test strategy")
print("Testing the complete system flow")
"""
    
    backtest_request = {
        "backtest_id": "integration_test_001",
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
            print(f"✅ Backtest started: {data['backtest_id']}")
            
            # Poll for results
            backtest_id = data["backtest_id"]
            max_attempts = 10
            for attempt in range(max_attempts):
                time.sleep(2)
                result_response = requests.get(f"{LEAN_CLI_URL}/backtest/{backtest_id}")
                
                if result_response.status_code == 200:
                    result_data = result_response.json()
                    if result_data["status"] == "completed":
                        print(f"✅ Integration backtest completed!")
                        results = result_data['results']
                        print(f"📈 Total Return: {results['totalReturn']:.2%}")
                        print(f"📈 Sharpe Ratio: {results['sharpeRatio']:.2f}")
                        return True
                    elif result_data["status"] == "failed":
                        print(f"❌ Integration backtest failed: {result_data.get('error')}")
                        return False
                else:
                    print(f"❌ Failed to get backtest result: {result_response.status_code}")
                    return False
            
            print("❌ Integration backtest timed out")
            return False
        else:
            print(f"❌ Failed to start integration backtest: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Integration test error: {e}")
        return False

def test_database_integration():
    """Test database connectivity and data"""
    print("\n🔍 Testing database integration...")
    
    try:
        import subprocess
        
        # Test database connection
        result = subprocess.run([
            "docker", "exec", "quail-postgres-1", 
            "psql", "-U", "quail_user", "-d", "quail_db", 
            "-c", "SELECT COUNT(*) as backtest_count FROM backtests;"
        ], capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ Database connection successful")
            # Extract count from output
            lines = result.stdout.strip().split('\n')
            for line in lines:
                if 'backtest_count' in line and line.strip() and not line.startswith('-'):
                    count = line.strip().split()[-1]
                    print(f"📊 Backtest records in database: {count}")
                    return True
        else:
            print(f"❌ Database connection failed: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ Database test error: {e}")
        return False

def test_api_endpoints():
    """Test API endpoints (without authentication)"""
    print("\n🔍 Testing API endpoints...")
    
    endpoints = [
        ("/strategies", "GET"),
        ("/backtests", "GET"),
        ("/auth/login", "POST"),
    ]
    
    all_working = True
    
    for endpoint, method in endpoints:
        try:
            if method == "GET":
                response = requests.get(f"{API_URL}{endpoint}", timeout=5)
            else:
                response = requests.post(f"{API_URL}{endpoint}", json={}, timeout=5)
            
            # 401 is expected for protected endpoints without auth
            if response.status_code in [200, 401, 400]:
                print(f"✅ {method} {endpoint}: Working (Status: {response.status_code})")
            else:
                print(f"❌ {method} {endpoint}: Failed (Status: {response.status_code})")
                all_working = False
                
        except Exception as e:
            print(f"❌ {method} {endpoint}: Error - {e}")
            all_working = False
    
    return all_working

def test_frontend_accessibility():
    """Test frontend is accessible"""
    print("\n🔍 Testing frontend accessibility...")
    
    try:
        response = requests.get(FRONTEND_URL, timeout=5)
        if response.status_code == 200:
            print("✅ Frontend is accessible")
            return True
        else:
            print(f"❌ Frontend returned status: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Frontend test error: {e}")
        return False

def main():
    """Run all integration tests"""
    print("🚀 Starting Quail Platform Integration Tests")
    print("=" * 60)
    
    tests = [
        ("Service Health", test_service_health),
        ("Lean-CLI Integration", test_lean_cli_integration),
        ("Database Integration", test_database_integration),
        ("API Endpoints", test_api_endpoints),
        ("Frontend Accessibility", test_frontend_accessibility),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n{'='*20} {test_name} {'='*20}")
        try:
            if test_func():
                passed += 1
                print(f"✅ {test_name}: PASSED")
            else:
                print(f"❌ {test_name}: FAILED")
        except Exception as e:
            print(f"❌ {test_name}: CRASHED - {e}")
    
    print("\n" + "=" * 60)
    print(f"📊 Integration Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All integration tests passed! The Quail platform is fully operational.")
        print("\n🌐 Access your application:")
        print(f"   Frontend: {FRONTEND_URL}")
        print(f"   API: {API_URL}")
        print(f"   Lean-CLI: {LEAN_CLI_URL}")
        return 0
    else:
        print("⚠️  Some integration tests failed. Please check the service configuration.")
        return 1

if __name__ == "__main__":
    sys.exit(main()) 