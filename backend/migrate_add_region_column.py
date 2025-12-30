"""
Migration script to add region column to lab_selection table
Run this script once to update the existing database schema
"""
import sqlite3
import os
from pathlib import Path

# Get database path
db_path = Path(__file__).parent / "database" / "app.db"

if not db_path.exists():
    print(f"Database not found at {db_path}")
    exit(1)

print(f"Connecting to database: {db_path}")

# Connect to database
conn = sqlite3.connect(str(db_path))
cursor = conn.cursor()

try:
    # Check if column already exists
    cursor.execute("PRAGMA table_info(lab_selection)")
    columns = [column[1] for column in cursor.fetchall()]
    
    if 'region' in columns:
        print("Column 'region' already exists in lab_selection table. No migration needed.")
    else:
        print("Adding 'region' column to lab_selection table...")
        # Add the region column as JSON (TEXT in SQLite)
        cursor.execute("ALTER TABLE lab_selection ADD COLUMN region TEXT")
        conn.commit()
        print("✓ Successfully added 'region' column to lab_selection table")
        
except sqlite3.Error as e:
    print(f"Error: {e}")
    conn.rollback()
finally:
    conn.close()
    print("Migration completed.")

