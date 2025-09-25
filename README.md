# 🏋️‍♂️ Workout Tracker - Full Stack Application

A full-stack workout tracking application that helps users manage their fitness journey with detailed workout logging, exercise management, and progress tracking.

## 🌟 Overview

This application consists of FastAPI backend with a React TypeScript frontend, providing a complete solution for personal fitness tracking and gym management.

### ✨ Key Features

**👤 For Users:**

- 🔐 Secure authentication and profile management
- 🏃‍♂️ Interactive workout session tracking
- 📊 Detailed exercise logging with sets, reps, weights, and duration
- 📈 Workout history
- 📝 Workout and exercise notes
- 📋 Pre-built workout templates
- 📱 Responsive design for mobile and desktop

**👨‍💼 For Administrators:**

- 👥 Complete user management system
- 💪 Exercise database administration
- 📋 Workout template creation and management
- 🛡️ Role-based access control

## 🏗️ Architecture

### Technology Stack

| Component                | Technology            | Purpose                                |
| ------------------------ | --------------------- | -------------------------------------- |
| **Backend**        | FastAPI + SQLAlchemy  | REST API with ORM database access      |
| **Frontend**       | React 19 + TypeScript | Modern SPA with type safety            |
| **Database**       | PostgreSQL            | Reliable relational data storage       |
| **Styling**        | Tailwind CSS 4.x      | Utility-first responsive design        |
| **Authentication** | JWT Tokens            | Secure stateless authentication        |
| **Build Tools**    | Vite + ESLint         | Fast development and quality assurance |

## 🚀 Quick Start

Check the readme in workouts_udec_backend and workouts_udec_frontend to get started.

Para correr todo junto:

```bash
docker-compose up --build
```
## 🗄️ Database with Docker

### Prerequisites
- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

### 🚀 Quick Setup
```bash
# Start the database
docker-compose up -d db

# Check status (should show "healthy")
docker-compose ps

# Stop database
docker-compose down
```

### 📋 Database Commands
```bash
# Connect to database
docker-compose exec db psql -U workout_user -d workouts_db

# View logs
docker-compose logs -f db

# Create backup
docker-compose exec db pg_dump -U workout_user workouts_db > backup.sql
```

### 🔧 Configuration
- **Image**: `postgres:15-alpine`
- **Database**: `workouts_db`
- **User**: `workout_user`
- **Port**: `localhost:5432`
- **Volume**: `postgres_data` (persistent storage)
- **Health Check**: Automatic monitoring every 10 seconds
