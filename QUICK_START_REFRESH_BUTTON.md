# Quick Start Guide - Testing the Refresh Button

## Step 1: Open the Lab Selection Page

Navigate to: `http://localhost:5173/services/testing/lab-selection`

## Step 2: What You Should See

### Review Section Header
```
┌─────────────────────────────────────────────────────────┐
│  Review                          [🔄 Refresh Details]   │
└─────────────────────────────────────────────────────────┘
```

### If Data is Empty
You'll see a blue info box:
```
┌─────────────────────────────────────────────────────────┐
│ ℹ️  No Review Data Available                            │
│                                                          │
│ Please complete the previous steps (Product Details,    │
│ Testing Requirements, and Testing Standards) first, or  │
│ click the "Refresh Details" button above to load        │
│ existing data.                                          │
└─────────────────────────────────────────────────────────┘
```

## Step 3: Click "Refresh Details"

The button will change to:
```
[⟳ Refreshing...]  (spinning icon, button disabled)
```

## Step 4: Expected Results

### Scenario A: Data Exists in Database
- ✅ Alert: "Review details refreshed successfully!"
- ✅ Fields populate with data:
  - **Name of EUT**: Smart IoT Device
  - **Testing Requirements**: List of 4 tests
  - **Testing Standards**: List of 5 standards

### Scenario B: No Data in Database
- ⚠️ Alert: "Failed to refresh data. Please ensure previous steps are completed."
- ℹ️ Info box remains visible
- 💡 Solution: Complete previous steps first

### Scenario C: No Testing Request ID
- ⚠️ Alert: "No testing request ID found. Please complete previous steps first."
- 💡 Solution: Start from Product Details page

## Step 5: Verify Data is Loaded

After successful refresh, you should see:

```
┌─────────────────────────────────────────────────────────┐
│ Name of EUT                                             │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Smart IoT Device                                    │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Testing Requirements                                    │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 4 test(s) selected:                                 │ │
│ │ • EMC Testing                                       │ │
│ │ • Safety Testing                                    │ │
│ │ • Environmental Testing                             │ │
│ │ • Performance Testing                               │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Testing Standards                                       │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 5 standard(s) selected:                             │ │
│ │ • IEC 61000-4-2 (ESD)                              │ │
│ │ • IEC 61000-4-3 (Radiated Immunity)                │ │
│ │ • IEC 61000-4-4 (EFT)                              │ │
│ │ • IEC 61000-4-5 (Surge)                            │ │
│ │ • EN 55032 (Emissions)                             │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Troubleshooting

### Button Not Working?
1. Check browser console (F12) for errors
2. Ensure backend is running: `http://localhost:8000`
3. Verify testing request ID exists in localStorage

### Still No Data?
1. Open browser console (F12)
2. Look for logs:
   ```
   Fetching data for testing request ID: 137
   Received data: {...}
   ```
3. If you see errors, check backend is running

### Backend Check
Run this command to verify data exists:
```bash
curl http://localhost:8000/testing-request/137/full | python3 -m json.tool
```

Expected output should include:
- `"eut_name": "Smart IoT Device"`
- `"selected_tests": [...]`
- `"standards": [...]`

## Next Steps

After verifying the data loads correctly:
1. Select labs from the list
2. Click "Save as Draft" to save without submitting
3. Click "Submit" to finalize the request

---

**Note**: The test data (ID: 137) is already populated in the database. Just click "Refresh Details" and it should load immediately!
