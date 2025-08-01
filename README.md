# 💼 Data Company API

API simple construida con NestJS siguiendo principios de arquitectura Hexagonal. Permite registrar empresas y consultar transferencias y adhesiones recientes.

---

## 🚀 Endpoints principales

Todos los endpoints están documentados en Swagger:

> http://localhost:3000/api/docs

### Empresas (`/companies`)

| Método | Ruta                         | Descripción                       |
| ------ | ---------------------------- | --------------------------------- |
| `POST` | `/companies`                 | Crea una empresa                  |
| `GET`  | `/companies`                 | Lista todas las empresas          |
| `GET`  | `/companies/recently-joined` | Empresas creadas en el último mes |
| `GET`  | `/companies/:cuit`           | Busca empresa por CUIT            |

### Transferencias (`/transfers`)

| Método | Ruta                                 | Descripción                                        |
| ------ | ------------------------------------ | -------------------------------------------------- |
| `POST` | `/transfers`                         | Registra una transferencia                         |
| `GET`  | `/transfers`                         | Lista todas las transferencias                     |
| `GET`  | `/transfers/recent`                  | Transferencias creadas en el último mes            |
| `GET`  | `/transfers/by-source/:sourceId`     | Transferencias relacionadas con una entidad origen |
| `GET`  | `/transfers/companies-in-last-month` | Empresas que hicieron transferencias recientes     |

---

## ⚙️ Instalación

```bash
# 1. Clonar el proyecto
git clone https://github.com/andreswittouck/company-api.git
cd company-api

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run start:dev

# 4. Ejecutar de test
npm run test
```

C 🚀 Integración de Lambda en dataCompanyAPI
Se integró una Lambda Function externa encargada de registrar empresas (PyME o Corporativas) en DynamoDB, invocada mediante API Gateway.

📁 Cambios a realizar:
En el caso de uso RegisterCompanyUseCase
Se nesecita agregar la siguiente línea para invocar la Lambda luego del registro local:

```bash
await this.externalAdapter.registerCompany(company);
```

- Esto permite que cada vez que una empresa se registra en dataCompanyAPI, también se envíen sus datos a la Lambda.

## Se creó la Lambda company-registration-service

- Una función en AWS que:
- Recibe datos vía POST /registrations.
- Valida nombre, CUIT, tipo.
- Evita duplicados por CUIT.
- Almacena en la tabla DynamoDB Companies.

📁 Proyecto separado ubicado en:
company-registration-service/

## Se creó el adapter para comunicar dataCompanyAPI con la Lambda

📁 Archivo:
src/context/company/infrastructure/adapters/external-company-lambda.adapter.ts

Se agregó la URL de la Lambda al .env del proyecto:

Autor
Andrés Wittouck
📧 andreswittouck@gmail.com
