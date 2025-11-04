#!/usr/bin/env python3

"""
Script to create workout templates (public or private) for testing or manual use.
Usage:
    - No args: crea 3 templates de prueba
    - Con args: crea un template personalizado
      python create_templates.py <name> <description> <is_public> <created_by> [created_at] [updated_at]
"""

import sys
from datetime import datetime
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.workout import WorkoutTemplate

def parse_datetime(value: str) -> datetime:
    try:
        return datetime.fromisoformat(value)
    except ValueError:
        print(f"⚠️ Fecha inválida: '{value}'. Se usará la fecha actual.")
        return datetime.utcnow()

def create_template(name: str, description: str, is_public: str, created_by: str, created_at=None, updated_at=None):
    db: Session = SessionLocal()

    try:
        # Validaciones básicas
        if not name or len(name.strip()) < 3:
            print("❌ Error: El nombre debe tener al menos 3 caracteres.")
            return
        if not description:
            print("❌ Error: La descripción no puede estar vacía.")
            return
        if is_public.lower() not in ["true", "false"]:
            print("❌ Error: is_public debe ser 'true' o 'false'.")
            return
        try:
            user_id = int(created_by)
        except ValueError:
            print("❌ Error: created_by debe ser un número entero.")
            return

        # Verificar duplicado
        if db.query(WorkoutTemplate).filter(WorkoutTemplate.name == name).first():
            print(f"⚠️ Ya existe un template con el nombre '{name}'. No se creó otro.")
            return

        template = WorkoutTemplate(
            name=name.strip(),
            description=description.strip(),
            is_public=is_public.lower() == "true",
            created_by=user_id,
            created_at=parse_datetime(created_at) if created_at else datetime.utcnow(),
            updated_at=parse_datetime(updated_at) if updated_at else datetime.utcnow()
        )

        db.add(template)
        db.commit()
        db.refresh(template)

        print("\n✅ Template creado exitosamente:")
        print(f"  ID:                 {template.id}")
        print(f"  Nombre:             {template.name}")
        print(f"  Público:            {'Sí' if template.is_public else 'No'}")
        print(f"  Creado por:         Usuario {template.created_by}")
        print(f"  Fecha creación:     {template.created_at}")
        print(f"  Fecha actualización:{template.updated_at}\n")

    except Exception as e:
        db.rollback()
        print(f"❌ Error al crear el template: {e}")
    finally:
        db.close()

def create_default_templates():
    db: Session = SessionLocal()
    user_id = 2
    now = datetime.utcnow()

    names = ["Template Público A", "Template Privado B", "Template Público C"]
    existing = db.query(WorkoutTemplate).filter(WorkoutTemplate.name.in_(names)).all()

    if existing:
        print("⚠️ Algunos templates ya existen. No se duplicarán.")
        db.close()
        return

    templates = [
        WorkoutTemplate(
            name="Template Público A",
            description="Rutina general para principiantes",
            is_public=True,
            created_by=user_id,
            created_at=now,
            updated_at=now
        ),
        WorkoutTemplate(
            name="Template Privado B",
            description="Rutina personalizada para fuerza",
            is_public=False,
            created_by=user_id,
            created_at=now,
            updated_at=now
        ),
        WorkoutTemplate(
            name="Template Público C",
            description="Rutina de movilidad y estiramiento",
            is_public=True,
            created_by=user_id,
            created_at=now,
            updated_at=now
        )
    ]

    for t in templates:
        db.add(t)

    db.commit()

    for t in templates:
        db.refresh(t)
        print(f"✅ Template creado: {t.name} (ID: {t.id}, Público: {t.is_public}, Creado: {t.created_at})")

    db.close()

def main():
    if len(sys.argv) == 1:
        print("🛠️  Creando templates de prueba por defecto...")
        create_default_templates()
    elif len(sys.argv) >= 5:
        name = sys.argv[1]
        description = sys.argv[2]
        is_public = sys.argv[3]
        created_by = sys.argv[4]
        created_at = sys.argv[5] if len(sys.argv) > 5 else None
        updated_at = sys.argv[6] if len(sys.argv) > 6 else None
        create_template(name, description, is_public, created_by, created_at, updated_at)
    else:
        print("\n📖 Uso:")
        print("  python create_templates.py")
        print("    → Crea 3 templates de prueba (2 públicos, 1 privado)")
        print("  python create_templates.py <name> <description> <is_public> <created_by> [created_at] [updated_at]")
        print("    → Crea un template personalizado con fechas opcionales")
        print("\nEjemplo:")
        print("  python create_templates.py 'Rutina HIIT' 'Entrenamiento intenso' true 3 '2025-11-04T20:30:00' '2025-11-04T21:00:00'\n")

if __name__ == "__main__":
    main()
