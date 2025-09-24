# Archivo: workouts_udec_backend/initial_setup.py

import logging
from sqlalchemy.orm import sessionmaker
from app.db.session import engine
from app.db.base import Base

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db():
    logger.info("Creating initial database tables...")
    try:
        # Crea todas las tablas que hereda de Base
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully.")
    except Exception as e:
        logger.error(f"Error creating database tables: {e}")
        raise

if __name__ == "__main__":
    init_db()