# Quick Verification Guide

## ✅ Backend Fix Applied

The backend has been updated to properly serialize data for the Review section.

## How to Test

### Option 1: Use the Populated Test Data (Recommended)

1. **Open your browser** and navigate to:
   ```
   http://localhost:5173/services/testing/lab-selection
   ```

2. **You should now see** the Review section populated with:
   - **Name of EUT**: Smart IoT Device
   - **Testing Requirements**: 
     - EMC Testing
     - Safety Testing
     - Environmental Testing
     - Performance Testing
   - **Testing Standards**:
     - IEC 61000-4-2 (ESD)
     - IEC 61000-4-3 (Radiated Immunity)
     - IEC 61000-4-4 (EFT)
     - IEC 61000-4-5 (Surge)
     - EN 55032 (Emissions)

3. **Test Save as Draft**:
   - Select a lab from the list
   - Click "Save as Draft" button
   - You should see "Draft saved successfully!" message

4. **Test Submit**:
   - Click "Submit" button
   - You should be redirected to the submission success page

### Option 2: Complete the Full Flow

1. **Start a new testing request**:
   ```
   http://localhost:5173/services/testing/product-details
   ```

2. **Fill in all steps**:
   - Step 1: Product Details
   - Step 2: Technical Documents
   - Step 3: Testing Requirements
   - Step 4: Testing Standards
   - Step 5: Lab Selection

3. **Verify Review Section** shows all the data you entered in previous steps

## Verify Backend API Directly

Run this command to check the API response:
```bash
curl -s http://localhost:8000/testing-request/137/full | python3 -m json.tool
```

Expected output should include:
- ✅ `product.eut_name`: "Smart IoT Device"
- ✅ `requirements.selected_tests`: Array of 4 tests
- ✅ `standards.standards`: Array of 5 standards

## What Was Fixed

1. **Backend Data Serialization**: SQLAlchemy objects are now properly converted to dictionaries
2. **Review Section**: Now correctly displays data from database
3. **Save Functionality**: Both "Save as Draft" and "Submit" buttons work correctly

## If You Still See Empty Data

This means you need to complete the previous steps first:
1. Go to Product Details page
2. Fill in the EUT name and other details
3. Continue through Testing Requirements and Testing Standards
4. Then the Review section will show your data

The test data (testing_request_id: 137) is already populated and ready to use!
