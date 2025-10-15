from typing import Optional

from pydantic import BaseModel

from app.models.exercise import ExerciseType
from app.schemas.base import BaseInDB


class ExerciseBase(BaseModel):
    name: str
    description: Optional[str] = None
    exercise_type: ExerciseType
    muscle_group: Optional[str] = None
    equipment: Optional[str] = None
    instructions: Optional[str] = None
    is_active: bool = True


class ExerciseCreate(ExerciseBase):
    pass


class ExerciseUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    exercise_type: Optional[ExerciseType] = None
    muscle_group: Optional[str] = None
    equipment: Optional[str] = None
    instructions: Optional[str] = None
    is_active: Optional[bool] = None


class ExerciseInDBBase(ExerciseBase, BaseInDB):
    pass


class Exercise(ExerciseInDBBase):
    pass
