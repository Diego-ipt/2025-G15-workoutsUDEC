# 🧪 Tests de API - Workout Tracker

Colección completa de tests de Postman para los endpoints de **Autenticación** y **Administración** de la API Workout Tracker.

## 📋 Contenido

Este directorio contiene:

- **`auth.postman_collection.json`**: Tests de autenticación (5 tests, 16 assertions)
- **`admin.postman_collection.json`**: Tests de administración (25 tests, 56 assertions)
- **`postman_environment.json`**: Variables de entorno pre-configuradas
- **`run_tests.ps1`**: Script de PowerShell para automatización (opcional)

## ✅ Cobertura de Tests

### 🔐 Autenticación (auth.postman_collection.json)

- ✓ Login exitoso con credenciales válidas
- ✓ Login con credenciales incorrectas
- ✓ Login con email no existente
- ✓ Validación de campos vacíos (422)
- ✓ Validación sin body (422)

### 👨‍💼 Administración (admin.postman_collection.json)

**User Management (12 tests):**

- ✓ Listar usuarios con paginación
- ✓ Crear, actualizar y eliminar usuarios
- ✓ Validación de email/username únicos
- ✓ Manejo de errores (404, 400, 422)
- ✓ Tests sin autenticación (403)

**Workout Template Management (13 tests):**

- ✓ CRUD completo de plantillas de entrenamiento
- ✓ Agregar/remover ejercicios de plantillas
- ✓ Validación de datos inválidos
- ✓ Manejo de errores (404, 422)

## 🚀 Pre-requisitos

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

## 📖 Opción A: Ejecutar con Postman Desktop

### 1️⃣ Importar las colecciones

1. Abre Postman
2. Click en **"Import"** (esquina superior izquierda)
3. Arrastra o selecciona estos 3 archivos:
   - `auth.postman_collection.json`
   - `admin.postman_collection.json`
   - `postman_environment.json`

### 2️⃣ Configurar el environment

1. En la esquina superior derecha, selecciona el dropdown de environments
2. Elige **"Workout Tracker Test Environment"**
3. Verifica que contenga:
   - `base_url`: `http://localhost:8001`
   - `admin_token`: (se actualiza automáticamente)

### 3️⃣ Ejecutar los tests

**Importante:** Ejecuta las colecciones en orden:

#### Paso 1: Tests de Autenticación

1. Click derecho en **"Workout Tracker API - Authentication Tests"**
2. Selecciona **"Run collection"**
3. En el Runner, click **"Run Workout Tracker API - Authentication Tests"**
4. Verifica: **16/16 tests passed** ✅

#### Paso 2: Tests de Administración

1. Click derecho en **"Workout Tracker API - Admin Tests"**
2. Selecciona **"Run collection"**
3. En el Runner, click **"Run Workout Tracker API - Admin Tests"**
4. Verifica: **56/56 tests passed**

## 💻 Opción B: Ejecutar con Newman (CLI)

### 1️⃣ Instalar Newman

```bash
npm install -g newman
```

### 2️⃣ Ejecutar tests de Autenticación

```bash
newman run auth.postman_collection.json
```

**Resultado esperado:**

```
┌─────────────────────────┬────────────────────┬───────────────────┐
│              iterations │                  1 │                 0 │
│                requests │                  5 │                 0 │
│              assertions │                 16 │                 0 │
└─────────────────────────┴────────────────────┴───────────────────┘
```

### 3️⃣ Ejecutar tests de Administración

```bash
newman run admin.postman_collection.json --environment postman_environment.json
```

**Resultado esperado:**

```
┌─────────────────────────┬───────────────────┬──────────────────┐
│              iterations │                 1 │                0 │
│                requests │                25 │                0 │
│              assertions │                56 │                0 │
└─────────────────────────┴───────────────────┴──────────────────┘
```

### 4️⃣ Ejecutar todos los tests juntos

```bash
# Windows PowerShell
newman run auth.postman_collection.json; newman run admin.postman_collection.json --environment postman_environment.json

# Linux/Mac
newman run auth.postman_collection.json && newman run admin.postman_collection.json --environment postman_environment.json
```

---

## 📝 Notas Adicionales

### Variables de entorno

El archivo `postman_environment.json` contiene:

- **`base_url`**: URL base de la API (`http://localhost:8001`)
- **`admin_token`**: Token JWT (se actualiza automáticamente al ejecutar auth tests)
- **`test_user_id`**: ID del usuario creado (se genera dinámicamente)
- **`test_user_email`**: Email del usuario de prueba (único por ejecución)
- **`test_user_username`**: Username del usuario de prueba (único por ejecución)
- **`test_template_id`**: ID del template creado (se genera dinámicamente)

### Credenciales de prueba

**Admin por defecto:**

- Email: `admin@example.com`
- Password: `admin123`
