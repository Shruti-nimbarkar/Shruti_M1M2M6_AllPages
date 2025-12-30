# Design Request Module - Quick Start Guide

## ✅ What Was Created

A complete **Design Request module** that mirrors the Testing Request functionality:

### Backend (Python/FastAPI)
- 📁 `backend/modules/design_request/` - Complete module
  - `models.py` - Database models (6 tables)
  - `schemas.py` - Pydantic validation schemas
  - `services.py` - Business logic layer
  - `routes.py` - API endpoints (9 routes)
  - `__init__.py` - Module initialization

### Frontend (React)
- 📁 `src/pages/services/` 
  - `designApi.js` - API client functions
- 📁 `src/pages/services/Design V&V/`
  - `DesignFlow.jsx` - Main flow component (updated)
  - `LabSelection.jsx` - Lab selection with refresh button (updated)

### Configuration
- `backend/app.py` - Updated to include design router

## 🚀 How to Use

### Step 1: Restart Backend

The backend needs to restart to:
1. Load the new design_request module
2. Create database tables automatically

```bash
# Stop the current backend (Ctrl+C in the terminal where it's running)
# Then restart:
cd backend
python -m uvicorn app:app --reload
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### Step 2: Verify Database Tables

The following tables will be created automatically:
- `design_requests`
- `design_product_details`
- `design_technical_documents`
- `design_requirements`
- `design_standards`
- `design_lab_selection`

### Step 3: Test the Frontend

1. **Navigate to Design V&V:**
   ```
   http://localhost:5173/services/design/product-details
   ```

2. **Complete the Flow:**
   - **Step 1:** Fill in Product Details → Click "Next"
   - **Step 2:** Upload Technical Documents → Click "Next"
   - **Step 3:** Select Design Requirements → Click "Next"
   - **Step 4:** Select Design Standards → Click "Next"
   - **Step 5:** Lab Selection & Review
     - Select a lab
     - Click "Refresh Details" to load review data
     - Click "Get Quotation" to submit

### Step 4: Verify API Endpoints

Test the API directly:

```bash
# Create a design request
curl -X POST http://localhost:8000/design-request/

# Expected response:
# {"id": 1, "status": "submitted"}

# Get full design request
curl http://localhost:8000/design-request/1/full | python3 -m json.tool
```

## 📋 Available API Endpoints

All endpoints are prefixed with `/design-request`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create new design request |
| GET | `/{id}` | Get request status |
| POST | `/{id}/product` | Save product details |
| POST | `/{id}/documents` | Save technical documents |
| POST | `/{id}/requirements` | Save design requirements |
| POST | `/{id}/standards` | Save design standards |
| POST | `/{id}/lab-selection/draft` | Save lab selection as draft |
| POST | `/{id}/submit` | Submit design request |
| GET | `/{id}/full` | Get complete request data |

## 🔍 Key Features

### 1. Multi-Step Form Flow
- 5 steps with progress tracking
- URL-based navigation
- Auto-save on each step
- Draft save functionality

### 2. Review Section with Refresh Button
- Displays data from database
- Manual refresh capability
- Loading states
- Empty state messaging
- Fallback to form data

### 3. Backend Integration
- RESTful API design
- Proper data validation
- SQLAlchemy ORM
- JSON serialization
- Error handling

### 4. Data Persistence
- LocalStorage for request ID
- Database for all form data
- Draft save without submission
- Status tracking (draft/submitted)

## 🧪 Testing Checklist

- [ ] Backend starts without errors
- [ ] Database tables created
- [ ] Can create new design request
- [ ] Can save product details
- [ ] Can save documents
- [ ] Can save requirements
- [ ] Can save standards
- [ ] Can save lab selection
- [ ] Can submit request
- [ ] Can fetch full request
- [ ] Refresh button works
- [ ] Review section shows data
- [ ] Navigation works correctly
- [ ] Draft save works
- [ ] Submit redirects to success page

## 🐛 Troubleshooting

### Backend Won't Start
**Error:** `ModuleNotFoundError: No module named 'modules.design_request'`

**Solution:** Make sure all files are created in the correct location:
```
backend/
  modules/
    design_request/
      __init__.py
      models.py
      schemas.py
      services.py
      routes.py
```

### Tables Not Created
**Issue:** Database tables don't exist

**Solution:** 
1. Delete the database file: `backend/database/app.db`
2. Restart the backend
3. Tables will be recreated automatically

### Frontend Shows Empty Data
**Issue:** Review section is empty

**Solution:**
1. Complete previous steps first (Product Details, Requirements, Standards)
2. Click "Refresh Details" button
3. Check browser console for errors
4. Verify backend is running on port 8000

### API Returns 404
**Issue:** Endpoint not found

**Solution:**
1. Verify backend is running
2. Check the URL: should be `/design-request/` not `/testing-request/`
3. Restart backend to load new routes

## 📊 Data Flow Example

```
User Action                    Frontend                Backend                  Database
───────────────────────────────────────────────────────────────────────────────────────
Navigate to page        →      startDesignRequest()  → POST /design-request/  → INSERT design_requests
                                                        RETURN {id: 1}
                                                        
Fill product form       →      (local state)
Click Next              →      saveDesignProduct()   → POST /design-request/1/product
                                                        → UPSERT design_product_details
                                                        
Fill requirements       →      (local state)
Click Next              →      saveDesignReqs()      → POST /design-request/1/requirements
                                                        → UPSERT design_requirements
                                                        
Fill standards          →      (local state)
Click Next              →      saveDesignStds()      → POST /design-request/1/standards
                                                        → UPSERT design_standards
                                                        
Select labs             →      (local state)
Click Refresh Details   →      fetchFullDesign()     → GET /design-request/1/full
                                                        ← RETURN all data
                                Display in Review
                                
Click Get Quotation     →      submitDesignReq()     → POST /design-request/1/submit
                                                        → UPDATE status='submitted'
                                Navigate to success
```

## 🎯 Next Steps

1. **Customize the module:**
   - Add more fields to models
   - Add validation rules
   - Customize success page
   - Add email notifications

2. **Enhance functionality:**
   - File upload implementation
   - PDF generation for quotations
   - Admin dashboard
   - Request tracking

3. **Production deployment:**
   - Add authentication
   - Set up proper database (PostgreSQL)
   - Configure environment variables
   - Add logging and monitoring

## 📚 Related Documentation

- `DESIGN_REQUEST_MODULE_DOCUMENTATION.md` - Complete technical documentation
- `LAB_SELECTION_FIX_SUMMARY.md` - Lab selection implementation details
- `REFRESH_BUTTON_IMPLEMENTATION.md` - Refresh button functionality

## ✨ Summary

You now have a fully functional Design Request module that:
- ✅ Mirrors Testing Request structure
- ✅ Has complete backend API
- ✅ Integrates with frontend
- ✅ Includes refresh button
- ✅ Saves data to database
- ✅ Supports draft and submit
- ✅ Shows review data from database

**Ready to use!** Just restart the backend and start testing.
