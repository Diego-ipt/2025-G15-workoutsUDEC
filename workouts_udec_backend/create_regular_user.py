#!/usr/bin/env python3

"""
Script to create a regular user for the workout tracker application.
"""

from sqlalchemy.orm import Session
from app.core.security import get_password_hash
from app.db.session import SessionLocal
from app.models.user import User
import sys

def create_regular_user(db: Session, email: str, username: str, password: str, full_name: str = None):
    """Create a regular (non-admin) user."""
    
    try:
        # Check if user with this email already exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            print(f"\n❌ Error: User with email '{email}' already exists!")
            return False
        
        # Check if user with this username already exists
        existing_user = db.query(User).filter(User.username == username).first()
        if existing_user:
            print(f"\n❌ Error: User with username '{username}' already exists!")
            return False
        
        # Create regular user
        new_user = User(
            email=email,
            username=username,
            hashed_password=get_password_hash(password),
            full_name=full_name or username,
            is_active=True,
            is_admin=False  # Regular user (not admin)
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        print("\n" + "="*80)
        print("✅ REGULAR USER CREATED SUCCESSFULLY!")
        print("="*80)
        print(f"  ID:              {new_user.id}")
        print(f"  Email:           {new_user.email}")
        print(f"  Username:        {new_user.username}")
        print(f"  Full Name:       {new_user.full_name}")
        print(f"  Is Active:       ✅ Yes")
        print(f"  Is Admin:        👤 No (Regular User)")
        print(f"  Created At:      {new_user.created_at.strftime('%Y-%m-%d %H:%M:%S')}")
        print("="*80 + "\n")
        
        return True
        
    except Exception as e:
        print(f"\n❌ Error creating user: {e}\n")
        return False


def main():
    """Main function with predefined users or custom input."""
    
    # Option 1: Create 3 predefined test users
    if len(sys.argv) == 1:
        print("\n📝 Creating 3 predefined test users...\n")
        
        users_to_create = [
            {
                "email": "user@example.com",
                "username": "regularuser",
                "password": "user123",
                "full_name": "Regular User Test"
            },
            {
                "email": "maria@example.com",
                "username": "maria",
                "password": "maria123",
                "full_name": "Maria Garcia"
            },
            {
                "email": "carlos@example.com",
                "username": "carlos",
                "password": "carlos123",
                "full_name": "Carlos Rodriguez"
            }
        ]
        
        success_count = 0
        skipped_count = 0
        
        for i, user_data in enumerate(users_to_create, 1):
            print(f"[{i}/{len(users_to_create)}] Processing {user_data['email']}...")
            result = create_regular_user(**user_data)
            if result:
                success_count += 1
            elif result is False:
                skipped_count += 1
        
        print("\n" + "="*80)
        print(f"✅ SUMMARY: {success_count} created, {skipped_count} skipped, {len(users_to_create)} total")
        print("="*80 + "\n")
        
        if success_count > 0:
            print("💡 You can now login with these credentials:")
            print("   - Via API: POST /api/auth/login")
            print("   - Via Frontend: http://localhost:80\n")
    
    # Option 2: Create user with command line arguments
    elif len(sys.argv) >= 4:
        email = sys.argv[1]
        username = sys.argv[2]
        password = sys.argv[3]
        full_name = sys.argv[4] if len(sys.argv) > 4 else None
        
        success = create_regular_user(email, username, password, full_name)
        
        if success:
            print("💡 You can now login with these credentials:")
            print("   - Via API: POST /api/auth/login")
            print("   - Via Frontend: http://localhost:80\n")
    
    else:
        print("\n📖 Usage:")
        print("  python create_regular_user.py                          # Create 3 default test users")
        print("  python create_regular_user.py <email> <username> <password> [full_name]\n")
        print("Examples:")
        print("  python create_regular_user.py")
        print("  python create_regular_user.py john@example.com john john123 'John Doe'\n")
        return

if __name__ == "__main__":
    main()
