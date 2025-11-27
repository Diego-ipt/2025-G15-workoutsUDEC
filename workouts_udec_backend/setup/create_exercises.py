from sqlalchemy.orm import Session
from app.models.workout import Exercise

try:
    from app.models.workout import ExerciseType
except ImportError:
    ExerciseType = None

def create_default_exercises(db: Session):
    print("\n--- Verificando/Creando Ejercicios ---")
    
    # Lista de ejercicios iniciales
    exercises_data = [
        {
            "name": "Cardio",
            "description": "General cardio exercise",
            "exercise_type": "TIME_BASED",
            "muscle_group": "Full Body",
            "equipment": "None",
            "instructions": "Run, cycle or row."
        },
        {
            "name": "Bench Press",
            "description": "Chest press with barbell",
            "exercise_type": "WEIGHT_BASED",
            "muscle_group": "Chest",
            "equipment": "Barbell",
            "instructions": "Lie on bench, press bar up."
        },
        {
            "name": "Squat",
            "description": "Leg exercise",
            "exercise_type": "WEIGHT_BASED",
            "muscle_group": "Legs",
            "equipment": "Barbell",
            "instructions": "Keep back straight, lower hips."
        }
    ]

    count = 0
    for ex_data in exercises_data:
        # Verificar si existe por nombre
        existing = db.query(Exercise).filter(Exercise.name == ex_data["name"]).first()
        
        if not existing:
            new_exercise = Exercise(
                name=ex_data["name"],
                description=ex_data["description"],
                exercise_type=ex_data["exercise_type"],
                muscle_group=ex_data["muscle_group"],
                equipment=ex_data["equipment"],
                instructions=ex_data["instructions"]
            )
            db.add(new_exercise)
            count += 1
            print(f"   + Creado: {ex_data['name']}")
        else:
            print(f"   . Ya existe: {ex_data['name']}")
    
    db.commit()
    print(f"✅ {count} ejercicios nuevos agregados.")