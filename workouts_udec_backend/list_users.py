#!/usr/bin/env python3

"""
Script to list all users registered in the database.
"""

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.user import User
from datetime import datetime

def list_all_users():
    """List all users in the database with their details."""
    db = SessionLocal()
    
    try:
        # Query all users
        users = db.query(User).all()
        
        if not users:
            print("\n❌ No users found in the database.\n")
            return
        
        print("\n" + "="*100)
        print(f"📊 TOTAL USERS REGISTERED: {len(users)}")
        print("="*100 + "\n")
        
        for idx, user in enumerate(users, 1):
            print(f"{'='*100}")
            print(f"👤 USER #{idx}")
            print(f"{'='*100}")
            print(f"  ID:              {user.id}")
            print(f"  Email:           {user.email}")
            print(f"  Username:        {user.username}")
            print(f"  Full Name:       {user.full_name or 'N/A'}")
            print(f"  Is Active:       {'✅ Yes' if user.is_active else '❌ No'}")
            print(f"  Is Admin:        {'👑 Yes' if user.is_admin else '👤 No'}")
            print(f"  Created At:      {user.created_at.strftime('%Y-%m-%d %H:%M:%S') if user.created_at else 'N/A'}")
            print(f"  Updated At:      {user.updated_at.strftime('%Y-%m-%d %H:%M:%S') if user.updated_at else 'N/A'}")
            print()
        
        print("="*100)
        print(f"✅ Successfully listed {len(users)} user(s)")
        print("="*100 + "\n")
        
        # Summary by role
        admins = [u for u in users if u.is_admin]
        regular_users = [u for u in users if not u.is_admin]
        active_users = [u for u in users if u.is_active]
        inactive_users = [u for u in users if not u.is_active]
        
        print("📈 SUMMARY:")
        print(f"  👑 Admins:        {len(admins)}")
        print(f"  👤 Regular Users: {len(regular_users)}")
        print(f"  ✅ Active:        {len(active_users)}")
        print(f"  ❌ Inactive:      {len(inactive_users)}")
        print()
        
    except Exception as e:
        print(f"\n❌ Error listing users: {e}\n")
    finally:
        db.close()

if __name__ == "__main__":
    list_all_users()
