# Ejecución de Tests de Sistema

Este documento describe cómo ejecutar las pruebas de sistema para el proyecto. Estas pruebas fueron hechas utilizando playwright. 

## Estructura de las carpetas
En la carpeta system_tests/pages se encuentran los POM. Por otro lado, en la carpeta system_tests/tests se encuentran los tests escritos con playwright.

Se hicieron pruebas de sistemas para todos los aspectos gráficos, incluyendo algunos aspectos como autenticación y conexión con el backend.

```bash

system_tests/
│
├── pages/                    # Page Object Models
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   ├── WorkoutPage.ts
│   ├── WorkoutHistoryPage.ts
│   ├── AdminPage.ts
│   ├── ProfilePage.ts
│
├── tests/                  # Archivos de pruebas e2e
│   ├── auth.spec.ts
│   ├── register.spec.ts
│   ├── workout.spec.ts
│   ├── workouthistory.spec.ts
│   ├── user_management.spec.ts
│   └── profile.spec.ts
│
├── playwright.config.ts    # Configuración global de Playwright
├── package.json

```

## Prerrequisitos

Se utiliza docker para desplegar los servicios de la página. Para ello se hace:

```bash
sudo docker-compose down -v     #para eliminar los contenedores anteriores
sudo docker-compose up --build
```

Antes de proseguir, comprobar que el servidor de desarrollo esté ejecutándose en `http://localhost:3000` antes de iniciar las pruebas.


Luego, hay que navegar a la carpeta `system_tests` e instalar las npm y playwright para correr los tests:

```bash
cd system_tests
npm install
npx playwright install
```

## Ejecutar Tests

### Ejecución Estándar (Headless)
Para ejecutar todos los tests en modo headless (sin interfaz gráfica):

```bash
npx playwright test
```

### Ver Reporte
Si los tests fallan o se necesita ver un reporte detallado:

```bash
npx playwright show-report
```

### Modo UI (Interactivo)
Para ejecutar los tests con una interfaz gráfica que permite ver paso a paso y depurar:

```bash
npx playwright test --ui
```

### Ejecutar un Test Específico
Para ejecutar solo archivos específicos de test:

```bash
npx playwright test tests/user_management.spec.ts
npx playwright test tests/auth.spec.ts
npx playwright test tests/profile.spec.ts
npx playwright test tests/register.spec.ts
npx playwright test tests/workout.spec.ts
npx playwright test tests/workouthistory.spec.ts

```


### Resultados
Al ejecutar todas las pruebas (36 pruebas de sistema) debe salir:
```bash

Running 36 tests using 1 worker
  36 passed (42.0s)

```