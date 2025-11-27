from app.db.session import SessionLocal
from setup.create_admin import create_admin_user
from setup.create_regular_user import create_regular_user
from setup.create_exercises import create_default_exercises
from setup.create_templates import create_default_templates

print("Creando data inicial...")

db = SessionLocal()

try:
    # Creando admin
    print("\n--- Creando Admin ---")
    create_admin_user(db)

    # Creando usuarios
    print("\n--- Creando usuarios ---")
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
    
    for user_data in users_to_create:
        create_regular_user(db=db, **user_data)

    # Crear ejercicios
    create_default_exercises(db)

    # Crear templates
    create_default_templates()

finally:
    db.close()

print("\nData inicial creada (Admin y Users).")