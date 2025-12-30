#!/bin/bash
# Script to populate test data for testing_request_id 137

echo "Populating test data for testing_request_id 137..."
echo "=================================================="

# 1. Save Product Details
echo -e "\n1. Saving Product Details..."
curl -X POST http://localhost:8000/testing-request/137/product \
  -H "Content-Type: application/json" \
  -d '{
    "eut_name": "Smart IoT Device",
    "eut_quantity": "5",
    "manufacturer": "TechCorp Industries",
    "model_no": "IOT-2024-X1",
    "serial_no": "SN123456789",
    "supply_voltage": "230V AC",
    "operating_frequency": "50Hz",
    "current": "2A",
    "weight": "500g",
    "dimensions": {
      "length": "150",
      "width": "100",
      "height": "50"
    },
    "power_ports": "1 AC Input",
    "signal_lines": "Ethernet, USB",
    "software_name": "IoT Control v2.0",
    "software_version": "2.0.1",
    "industry": ["Electronics", "IoT"],
    "industry_other": "",
    "preferred_date": "2025-01-15",
    "notes": "Urgent testing required for product launch"
  }'

echo -e "\n\n2. Saving Testing Requirements..."
curl -X POST http://localhost:8000/testing-request/137/requirements \
  -H "Content-Type: application/json" \
  -d '{
    "test_type": "final",
    "selected_tests": [
      "EMC Testing",
      "Safety Testing",
      "Environmental Testing",
      "Performance Testing"
    ]
  }'

echo -e "\n\n3. Saving Testing Standards..."
curl -X POST http://localhost:8000/testing-request/137/standards \
  -H "Content-Type: application/json" \
  -d '{
    "regions": ["India", "Europe", "USA"],
    "standards": [
      "IEC 61000-4-2 (ESD)",
      "IEC 61000-4-3 (Radiated Immunity)",
      "IEC 61000-4-4 (EFT)",
      "IEC 61000-4-5 (Surge)",
      "EN 55032 (Emissions)"
    ]
  }'

echo -e "\n\n4. Fetching full request data..."
curl -s http://localhost:8000/testing-request/137/full | python3 -m json.tool

echo -e "\n\n=================================================="
echo "Test data population complete!"
echo "=================================================="
