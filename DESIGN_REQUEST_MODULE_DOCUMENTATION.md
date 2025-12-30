# Design Request Module - Complete Implementation Guide

## Overview

This document describes the complete Design Request module implementation, which mirrors the Testing Request module structure with design-specific functionality.

## Backend Structure

### 1. Database Models (`backend/modules/design_request/models.py`)

**Tables Created:**
- `design_requests` - Main request table
- `design_product_details` - Product/EUT information
- `design_technical_documents` - Document metadata
- `design_requirements` - Design testing requirements
- `design_standards` - Design testing standards
- `design_lab_selection` - Lab selection and region data

**Key Features:**
- All tables use foreign keys to `design_requests.id`
- JSON columns for arrays (selected_tests, standards, selected_labs, region)
- Timestamps with `created_at` and `updated_at`
- Status tracking (draft/submitted)

### 2. Pydantic Schemas (`backend/modules/design_request/schemas.py`)

**Schemas Defined:**
- `DesignProductDetailsSchema` - Product validation
- `DesignTechnicalDocumentsSchema` - Document list validation
- `DesignRequirementsSchema` - Requirements validation
- `DesignStandardsSchema` - Standards validation
- `DesignLabSelectionSchema` - Lab selection validation

**Features:**
- Type validation for all fields
- Optional fields properly marked
- Nested schemas (DimensionsSchema)
- JSON-compatible data structures

### 3. Service Layer (`backend/modules/design_request/services.py`)

**Functions Implemented:**
- `create_design_request()` - Create new request
- `save_design_product_details()` - Save/update product info
- `save_design_technical_documents()` - Save documents
- `save_design_requirements()` - Save requirements
- `save_design_standards()` - Save standards
- `save_design_lab_selection_draft()` - Save draft (no status change)
- `submit_design_request()` - Submit request (changes status)
- `get_full_design_request()` - Fetch all data with proper serialization

**Key Features:**
- Upsert logic (update if exists, create if not)
- Proper SQLAlchemy object to dictionary conversion
- Error handling with ValueError
- Transaction management with db.commit()

### 4. API Routes (`backend/modules/design_request/routes.py`)

**Endpoints:**
```
POST   /design-request/                              - Create new request
GET    /design-request/{id}                          - Get request status
POST   /design-request/{id}/product                  - Save product details
POST   /design-request/{id}/documents                - Save documents
POST   /design-request/{id}/requirements             - Save requirements
POST   /design-request/{id}/standards                - Save standards
POST   /design-request/{id}/lab-selection/draft      - Save draft
POST   /design-request/{id}/submit                   - Submit request
GET    /design-request/{id}/full                     - Get complete request
```

**Features:**
- RESTful API design
- Dependency injection for database session
- HTTP exception handling
- Consistent response format

### 5. Application Integration (`backend/app.py`)

**Changes Made:**
- Imported design_router
- Registered router with app
- Updated app title to "Testing & Design Request Backend"
- CORS configured for both modules

## Frontend Structure

### 1. API Layer (`src/pages/services/designApi.js`)

**Functions:**
- `startDesignRequest()` - Initialize new request
- `saveDesignProductDetails()` - Save product data
- `saveDesignTechnicalDocuments()` - Save documents
- `saveDesignRequirements()` - Save requirements
- `saveDesignStandards()` - Save standards
- `saveDesignLabSelectionDraft()` - Save draft
- `submitDesignRequest()` - Submit request
- `fetchFullDesignRequest()` - Fetch complete data

**Features:**
- Axios-based API calls
- Promise-based async operations
- Consistent error handling
- Base URL from api.js

### 2. Flow Component (`src/pages/services/Design V&V/DesignFlow.jsx`)

**Features:**
- Multi-step form with 5 steps
- URL-based navigation with React Router
- LocalStorage for request ID persistence
- Auto-save on each step
- Draft save functionality
- Form data state management
- Sidebar progress tracking

**Steps:**
1. Product Details
2. Technical Documents
3. Design Requirements
4. Design Standards
5. Lab Selection & Review

**State Management:**
- `designRequestId` - Stored in localStorage
- `currentStep` - Current form step
- `formData` - All form data
- URL params for step navigation

### 3. Lab Selection Component (`src/pages/services/Design V&V/LabSelection.jsx`)

**Features:**
- Region-based lab filtering (Country/State/City)
- Multi-select lab checkboxes
- **Refresh Details button** - Fetch data from database
- Review section with:
  - EUT Name
  - Design Requirements list
  - Design Standards list
- Loading states
- Empty state messaging
- Cost estimation display

**Backend Integration:**
- Fetches data using `fetchFullDesignRequest()`
- Displays data from database
- Falls back to formData if API fails
- Manual refresh capability

## Data Flow

### Creating a New Request

```
1. User navigates to /services/design/product-details
2. Frontend calls startDesignRequest()
3. Backend creates DesignRequest record
4. Returns { id, status }
5. Frontend stores ID in localStorage
6. User fills form and clicks Next
7. Frontend calls saveDesignProductDetails(id, data)
8. Backend saves to design_product_details table
9. Process repeats for each step
10. Final step calls submitDesignRequest()
11. Backend updates status to "submitted"
```

### Loading Existing Data

```
1. Component mounts with designRequestId
2. Calls fetchFullDesignRequest(id)
3. Backend queries all related tables
4. Converts SQLAlchemy objects to dictionaries
5. Returns complete data structure
6. Frontend updates reviewData state
7. Displays in Review section
```

## Database Schema

### design_requests
```sql
id              INTEGER PRIMARY KEY
status          VARCHAR DEFAULT 'submitted'
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### design_product_details
```sql
id                      INTEGER PRIMARY KEY
design_request_id       INTEGER FOREIGN KEY
eut_name               VARCHAR
eut_quantity           VARCHAR
manufacturer           TEXT
model_no               VARCHAR
serial_no              VARCHAR
supply_voltage         VARCHAR
operating_frequency    VARCHAR
current                VARCHAR
weight                 VARCHAR
length_mm              VARCHAR
width_mm               VARCHAR
height_mm              VARCHAR
power_ports            VARCHAR
signal_lines           VARCHAR
software_name          VARCHAR
software_version       VARCHAR
industry               JSON
industry_other         VARCHAR
preferred_date         VARCHAR
notes                  TEXT
```

### design_requirements
```sql
id                  INTEGER PRIMARY KEY
design_request_id   INTEGER FOREIGN KEY
test_type           VARCHAR
selected_tests      JSON (array)
```

### design_standards
```sql
id                  INTEGER PRIMARY KEY
design_request_id   INTEGER FOREIGN KEY
regions             JSON (array)
standards           JSON (array)
```

### design_lab_selection
```sql
id                  INTEGER PRIMARY KEY
design_request_id   INTEGER FOREIGN KEY
selected_labs       JSON (array)
region              JSON (object: {country, state, city})
remarks             TEXT
```

## API Request/Response Examples

### Create Design Request
```bash
POST /design-request/
Response: { "id": 1, "status": "submitted" }
```

### Save Product Details
```bash
POST /design-request/1/product
Body: {
  "eut_name": "Smart Device",
  "eut_quantity": "5",
  "manufacturer": "TechCorp",
  "model_no": "SD-2024",
  "serial_no": "SN123",
  "supply_voltage": "230V AC",
  "current": "2A",
  "weight": "500g",
  "dimensions": {
    "length": "150",
    "width": "100",
    "height": "50"
  },
  "power_ports": "1x AC",
  "signal_lines": "USB, Ethernet",
  "industry": ["Electronics", "IoT"],
  "preferred_date": "2025-01-15",
  "notes": "Urgent"
}
Response: { "status": "saved" }
```

### Get Full Request
```bash
GET /design-request/1/full
Response: {
  "design_request": {
    "id": 1,
    "status": "submitted",
    "created_at": "2025-12-30T00:00:00"
  },
  "product": { ... },
  "requirements": { ... },
  "standards": { ... },
  "lab": { ... }
}
```

## Testing the Module

### Backend Testing

1. **Start the backend:**
```bash
cd backend
python -m uvicorn app:app --reload
```

2. **Test endpoints:**
```bash
# Create request
curl -X POST http://localhost:8000/design-request/

# Get full request
curl http://localhost:8000/design-request/1/full
```

### Frontend Testing

1. **Start frontend:**
```bash
npm run dev
```

2. **Navigate to:**
```
http://localhost:5173/services/design/product-details
```

3. **Test flow:**
- Fill in product details → Next
- Upload documents → Next
- Select requirements → Next
- Select standards → Next
- Select labs → Click "Refresh Details"
- Verify review data appears
- Click "Get Quotation"

## Key Differences from Testing Module

1. **Table Names:** All prefixed with `design_` instead of `testing_`
2. **API Endpoints:** `/design-request/` instead of `/testing-request/`
3. **Frontend Routes:** `/services/design/` instead of `/services/testing/`
4. **LocalStorage Key:** `designRequestId` instead of `testingRequestId`
5. **Submit Button:** "Get Quotation" instead of "Submit"
6. **Success Page:** `/services/design/submission-success`

## Files Created/Modified

### Backend
- ✅ `backend/modules/design_request/models.py`
- ✅ `backend/modules/design_request/schemas.py`
- ✅ `backend/modules/design_request/services.py`
- ✅ `backend/modules/design_request/routes.py`
- ✅ `backend/modules/design_request/__init__.py`
- ✅ `backend/app.py` (modified)

### Frontend
- ✅ `src/pages/services/designApi.js`
- ✅ `src/pages/services/Design V&V/DesignFlow.jsx` (modified)
- ✅ `src/pages/services/Design V&V/LabSelection.jsx` (modified)

## Migration Required

Run the backend to auto-create tables:
```bash
cd backend
python -m uvicorn app:app --reload
```

The tables will be created automatically via `Base.metadata.create_all(bind=engine)` in `app.py`.

## Summary

The Design Request module is now fully implemented with:
- ✅ Complete backend API
- ✅ Database models and schemas
- ✅ Service layer with proper serialization
- ✅ Frontend integration
- ✅ Refresh button functionality
- ✅ Review section with database data
- ✅ Draft save capability
- ✅ Multi-step form flow
- ✅ URL-based navigation

The module follows the exact same patterns as the Testing Request module, ensuring consistency and maintainability.
