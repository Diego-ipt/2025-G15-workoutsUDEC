# Tests de API - Workout Tracker

Colección completa de tests de Postman para los endpoints de **Autenticación**, **Administración**, **Usuarios Regulares**, **Exercises** y **Workouts** de la API Workout Tracker.

## Contenido

Este directorio contiene:

- **`auth.postman_collection.json`**: Tests de autenticación (5 tests, 23 assertions)
- **`admin.postman_collection.json`**: Tests de administración (25 tests, 87 assertions)
- **`user.postman_collection.json`**: Tests de usuario regular (17 tests, 62 assertions)
- **`exercises.postman_collection.json`**: Tests de ejercicios (10 tests, 10 assertions)
- **`workouts.postman_collection.json`**: Tests de workouts (37 tests, 60 assertions)
- **`variables.postman_environment.json`**: Variables de entorno pre-configuradas
- **`run_tests.ps1`**: Script de PowerShell para automatización (opcional)

##  Cobertura de Tests

### Autenticación (auth.postman_collection.json)

**5 tests, 23 assertions:**

-  Login exitoso con credenciales válidas (con validación de performance <2000ms)
-  Login con credenciales incorrectas (con validación de performance)
-  Login con email no existente (con validación de performance)
-  Validación de campos vacíos (422)
-  Validación sin body (422)

### Administración (admin.postman_collection.json)

**25 tests, 87 assertions (incluye performance testing):**

**User Management (12 tests):**

-  Listar usuarios con paginación (con performance)
-  Crear, actualizar y eliminar usuarios (con performance)
-  Validación de email/username únicos (con performance)
-  Manejo de errores (404, 400, 422)
-  Tests sin autenticación (403 Forbidden)

**Workout Template Management (13 tests):**

-  CRUD completo de plantillas de entrenamiento (con performance)
-  Agregar/remover ejercicios de plantillas (con performance condicional)
-  Validación de datos inválidos (200 OK - backend acepta strings vacíos)
-  Manejo de errores (404, 422)

### Ejercicios (`exercises.postman_collection.json`)

-  Listar ejercicios disponibles (`GET /exercises`)
-  Obtener ejercicio por ID (`GET /exercises/{exercise_id}`)
-  Validación de ejercicio inexistente (404)
-  Crear ejercicio como administrador (`POST /exercises`)
-  Actualizar ejercicio como administrador (`PUT /exercises/{exercise_id}`)
-  Eliminar ejercicio como administrador (`DELETE /exercises/{exercise_id}`)

### Usuario Regular (user.postman_collection.json)

**17 tests, 62 assertions (incluye performance testing):**

**Authentication (1 test):**
-  Login exitoso de usuario regular (con performance)

**User Profile (3 tests):**
-  Obtener perfil propio (GET /users/me)
-  Actualizar perfil propio (PUT /users/me)
-  Acceso sin autenticación (403 Forbidden)

**Exercises (3 tests):**
-  Listar ejercicios disponibles
-  Obtener ejercicio por ID
-  Validación de ejercicio inexistente (404)

**Workout Templates (1 test):**
-  Listar templates públicos

**Workouts Management (8 tests):**
-  CRUD completo de workouts propios (con performance)
-  Obtener workouts del usuario
-  Crear workout (solo 1 activo permitido)
-  Obtener workout activo
-  Actualizar y completar workout
-  Validación de permisos y errores

**Access Control (1 test):**
-  Usuario regular no puede acceder a endpoints admin (403 Forbidden)

### Workouts (workouts.postman_collection.json)

-  Listar templates públicos (`GET /templates`)
-  Obtener template por ID (`GET /templates/{template_id}`)
-  Crear workout desde template (con validación de permisos y errores)
-  Crear workout manual (solo 1 activo permitido)
-  Obtener workouts del usuario (`GET /workouts`)
-  Obtener workout activo (`GET /workouts/active`)
-  Obtener workout por ID y por historial (`GET /workouts/{id}`, `/history`)
-  Actualizar y completar workout (`PUT /workouts/{id}`, `/complete`)
-  Cancelar workout activo (`DELETE /workouts/{id}`)
-  Validación de errores: workout inexistente, permisos insuficientes, workout ya completado
-  Agregar ejercicio y sets (`POST /exercises`, `/sets`)
-  Actualizar y eliminar sets (`PUT`, `DELETE`)
-  Validación de errores: workout completado, ejercicio/set inexistente
-  Actualizar notas de workout y ejercicios
-  Obtener progresión de ejercicio (`GET /progression/{exercise_id}`)


## Pre-requisitos

### 1. Backend en ejecución

Asegúrate de que el backend esté corriendo en `http://localhost:8001`:

```bash
# Opción 1: Con Docker (recomendado)
cd ../..  # Ir a la raíz del proyecto
docker-compose up -d db backend

# Opción 2: Directamente con Python
cd ..
pip install -r requirements.txt
python main.py
```

Verifica que el backend responda:

```bash
curl http://localhost:8001/docs
```

### 2. Herramientas necesarias

Elige **UNA** de estas opciones:

**Opción A: Postman Desktop** (Más visual)

- Descarga: https://www.postman.com/downloads/

**Opción B: Newman CLI** (Línea de comandos)

```bash
npm install -g newman
```

---

## Opción A: Ejecutar con Postman Desktop

### 1️Importar las colecciones

1. Abre Postman
2. Click en **"Import"** (esquina superior izquierda)
3. Arrastra o selecciona estos 4 archivos:
   - `auth.postman_collection.json`
   - `admin.postman_collection.json`
   - `user.postman_collection.json`
   - `variables.postman_environment.json`

### Configurar el environment

1. En la esquina superior derecha, selecciona el dropdown de environments
2. Elige **"Workout Tracker Test Environment"**
3. Verifica que contenga:
   - `base_url`: `http://localhost:8001`
   - `admin_token`: (se actualiza automáticamente)

### Ejecutar los tests

**Importante:** Ejecuta las colecciones en orden:

#### Paso 1: Tests de Autenticación

1. Click derecho en **"Workout Tracker API - Authentication Tests"**
2. Selecciona **"Run collection"**
3. En el Runner, click **"Run Workout Tracker API - Authentication Tests"**
4. Verifica: **23/23 tests passed** 

#### Paso 2: Tests de Administración

1. Click derecho en **"Workout Tracker API - Admin Tests"**
2. Selecciona **"Run collection"**
3. En el Runner, click **"Run Workout Tracker API - Admin Tests"**
4. Verifica: **87/87 tests passed** 

#### Paso 3: Tests de Exercises

1. Haz clic derecho en **"Workout Tracker API - Exercises Tests"**
2. Selecciona **"Run collection"**
3. En el Runner, haz clic en **"Run Workout Tracker API - Exercises Tests"**
4. Verifica: **10/10 tests passed**

#### Paso 4: Tests de Usuario Regular

1. Click derecho en **"Workout Tracker API - Regular User Tests"**
2. Selecciona **"Run collection"**
3. En el Runner, click **"Run Workout Tracker API - Regular User Tests"**
4. Verifica: **62/62 tests passed** 

#### Paso 5: Tests de workouts

1. Click derecho en **"Workout API Tests"**
2. Selecciona **"Run collection"**
3. En el Runner, click **"Run workout api Tests"**
4. Verifica: **60/60 tests passed** 

## Opción B: Ejecutar con Newman (CLI)

### 1Instalar Newman

```bash
npm install -g newman
```

### Ejecutar tests de Autenticación

```bash
newman run auth.postman_collection.json
```

**Resultado esperado:**

```
┌─────────────────────────┬────────────────────┬───────────────────┐
│              iterations │                  1 │                 0 │
│                requests │                  5 │                 0 │
│              assertions │                 23 │                 0 │
└─────────────────────────┴────────────────────┴───────────────────┘
```

### Ejecutar tests de Administración

```bash
newman run admin.postman_collection.json --environment variables.postman_environment.json
```

**Resultado esperado:**

```
┌─────────────────────────┬───────────────────┬──────────────────┐
│              iterations │                 1 │                0 │
│                requests │                25 │                0 │
│              assertions │                87 │                0 │
└─────────────────────────┴───────────────────┴──────────────────┘
```

### Ejecutar tests de Usuario Regular

```bash
newman run user.postman_collection.json --environment variables.postman_environment.json
```

**Resultado esperado:**

```
┌─────────────────────────┬───────────────────┬──────────────────┐
│              iterations │                 1 │                0 │
│                requests │                17 │                0 │
│              assertions │                62 │                0 │
└─────────────────────────┴───────────────────┴──────────────────┘
```
### Ejecutar tests de workouts
```bash
newman run workouts.postman_collection.json --environment variables.postman_environment.json
```

**Resultado esperado:**

```
┌─────────────────────────┬───────────────────┬──────────────────┐
│              iterations │                 1 │                0 │
│                requests │                37 │                0 │
│              assertions │                60 │                0 │
└─────────────────────────┴───────────────────┴──────────────────┘
```

### Ejecutar tests de exercises
```bash
newman run exercises.postman_collection.json --environment variables.postman_environment.json
```

**Resultado esperado:**

```
┌─────────────────────────┬───────────────────┬──────────────────┐
│              iterations │                 1 │                0 │
│                requests │                10 │                0 │
│              assertions │                10 │               10 │
└─────────────────────────┴───────────────────┴──────────────────┘
```



---

## Notas Adicionales

### Variables de entorno

El archivo `variables.postman_environment.json` contiene las variables necesarias para ejecutar los tests de forma dinámica y reproducible:

- **`base_url`**: URL base de la API (`http://localhost:8001`)
- **`admin_token`**: Token JWT del administrador (se actualiza automáticamente)
- **`user_token`**: Token JWT del usuario regular (se actualiza automáticamente)
- **`user_id`**: ID del usuario regular autenticado
- **`template_id`**: ID de template público para pruebas
- **`template_id_privado`**: ID de template privado creado por el usuario
- **`template_id_privado_otro_usuario`**: ID de template privado creado por otro usuario (para validar permisos). Este se puede agregar directamente a la base de datos si necesita ser probado, solo hace falta ejecutar create_templates.py con parámetros de entrada y luego modificar el ID de las variables por el nuevo obtenido en la creación.
- **`workout_id`**: ID de workout creado (se actualiza dinámicamente)
- **`active_workout_id`**: ID del workout activo actual (se guarda automáticamente al crear)
- **`previous_workouts`**: Lista serializada de workouts previos (se actualiza con `GET /workouts`)
- **`test_user_id`**: ID del usuario de prueba (generado dinámicamente)
- **`test_user_email`**: Email único del usuario de prueba por ejecución
- **`test_user_username`**: Username único del usuario de prueba por ejecución
- **`test_template_id`**: ID del template creado durante los tests
- **`test_workout_id`**: ID del workout creado durante los tests

Estas variables permiten encadenar peticiones, validar permisos, y simular distintos escenarios de autenticación, acceso y estado de los workouts.

### Credenciales de prueba

**Admin por defecto:**
- Email: `admin@example.com`
- Password: `admin123`

**Usuario Regular:**
- Email: `user@example.com`
- Password: `user123`

