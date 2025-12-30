#!/usr/bin/env python3
"""
Test script to verify the lab selection API endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_get_full_request(testing_request_id):
    """Test the /testing-request/{id}/full endpoint"""
    print(f"\n{'='*60}")
    print(f"Testing GET /testing-request/{testing_request_id}/full")
    print(f"{'='*60}")
    
    url = f"{BASE_URL}/testing-request/{testing_request_id}/full"
    
    try:
        response = requests.get(url)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("\nResponse Data:")
            print(json.dumps(data, indent=2))
            
            # Check specific fields
            print("\n--- Review Section Data ---")
            if data.get('product'):
                print(f"EUT Name: {data['product'].get('eut_name')}")
            else:
                print("Product: None")
                
            if data.get('requirements'):
                print(f"Testing Requirements: {data['requirements'].get('selected_tests')}")
            else:
                print("Requirements: None")
                
            if data.get('standards'):
                print(f"Testing Standards: {data['standards'].get('standards')}")
            else:
                print("Standards: None")
        else:
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"Error: {e}")

def test_save_draft(testing_request_id):
    """Test the /testing-request/{id}/lab-selection/draft endpoint"""
    print(f"\n{'='*60}")
    print(f"Testing POST /testing-request/{testing_request_id}/lab-selection/draft")
    print(f"{'='*60}")
    
    url = f"{BASE_URL}/testing-request/{testing_request_id}/lab-selection/draft"
    
    payload = {
        "selected_labs": ["TUV INDIA PVT. LTD., BANER, PUNE, MAHARASHTRA, INDIA"],
        "region": {
            "country": "India",
            "state": "Maharashtra",
            "city": "Pune"
        },
        "remarks": "Test draft save"
    }
    
    print(f"Payload: {json.dumps(payload, indent=2)}")
    
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Use the testing request ID from the user's logs
    testing_request_id = 137
    
    print("Lab Selection API Test Script")
    print("="*60)
    
    # Test 1: Get full request data
    test_get_full_request(testing_request_id)
    
    # Test 2: Save draft
    test_save_draft(testing_request_id)
    
    # Test 3: Get full request data again to verify save
    test_get_full_request(testing_request_id)
