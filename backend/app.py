from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.database import engine, Base
from modules.testing_request.routes import router as testing_router
from modules.design_request.routes import router as design_router

app = FastAPI(title="Testing & Design Request Backend")

# ✅ ADD CORS (THIS FIXES EVERYTHING)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(testing_router)
app.include_router(design_router)

