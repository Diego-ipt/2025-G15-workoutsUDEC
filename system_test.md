# Ejecución de Tests de Sistema

Este documento describe cómo ejecutar las pruebas de sistema para el módulo de Gestión de Usuarios (`/admin`).

## Prerrequisitos

Asegúrate de estar en la carpeta `system_tests` e instalar las dependencias:

```bash
cd system_tests
npm install
npx playwright install
```

**Nota:** El servidor de desarrollo debe estar ejecutándose en `http://localhost:3000` antes de iniciar las pruebas.

## Ejecutar Tests

### Ejecución Estándar (Headless)
Para ejecutar todos los tests en modo headless (sin interfaz gráfica):

```bash
npx playwright test
```

### Ver Reporte
Si los tests fallan o quieres ver un reporte detallado:

```bash
npx playwright show-report
```

### Modo UI (Interactivo)
Para ejecutar los tests con una interfaz gráfica que permite ver paso a paso y depurar:

```bash
npx playwright test --ui
```

### Ejecutar un Test Específico
Para ejecutar solo el archivo de pruebas de gestión de usuarios:

```bash
npx playwright test tests/user_management.spec.ts
```
