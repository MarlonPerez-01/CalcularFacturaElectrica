# API REST para auditar factura eléctrica y visualizar dashboard.

API REST encargada de realizar los cargos necesarios para calcular y auditar el costo de una factura eléctrica de pequeña demanda tanto para uso general como para uso residencial. También permite obtener las facturas de un usuario, ingresarlas a la base de datos. Algunas rutas se encuentran protegidas para que solo el administrador sea capaz de llamar el endpoint.

## Empezando

### Dependencias

* [Mysql](https://www.mysql.com/)
* [NodeJS](https://nodejs.org/en/)

### Configuración

* Clonar este repositorio

```sh
git clone https://github.com/MarlonPerez-01/CalcularFacturaElectrica.git
```

* Navegar  al directorio del proyecto

* Ejecutar `npm install` o `npm i` para la instalación de dependencias.

* Crear el archivo `.env` y copiar el contenido del archivo `.env.sample` y asignar los valores a cada variable.

* Crear la base de datos en MySQL e insertar datos utilizando el archivo `db-data.sql` que se encuentra en la carpeta data.

> Usuarios de prueba
>
> | NIC    | Correo            | Contraseñan | Privilegios |
> | ------ | ----------------- | ----------- | ----------- |
> | 654321 | `admin@admin.com` | `pass`      | Admin       |
> | 123456 | `test@test.com`   | `pass`      | Usuario     |

### Ejecutar

* Ejecutar `npm run dev` para iniciar la aplicación.



## Estructura del proyecto

    .
    ├── ...
    │   ├── src                         # Dentro se encuentran los ficheros fuentes
    │   ├── config                      # Configuración y conexión a la base de datos
    │   ├── constant                    # Constantes
    │   ├── controllers                 # Controladores
    │   ├── data                        # Archivo sql para la creación de la base de datos e inserción de datos
    │   ├── exceptions                  # Extiende error http
    │   ├── functions                   # Funciones para calcular costo de la factura
    │   ├── helpers                     # Funciones para resolver tareas específicas
    │   ├── middlewares                 # Middlewares
    │   ├── models                      # Queries a la base de datos
    │   ├── routes                      # Rutas de la API
    │   ├── types                       # Definición de tipado
    │   ├── validators                  # Validaciones
    │   └── app.ts                      # Llamadas a las funciones principales
    ├── .env                            # Fichero de variables de entorno
    ├── .env.sample                     # Fichero de variables de entorno de ejemplo
    ├── .gitignore                      # Fichero para ignorar archivos en github
    ├── .prettierrc                     # Configuración del formato de código
    ├── package-lock.json               # Mantener versión de cada paquete
    ├── package.json                    # Información del proyecto, scripts y dependencias
    ├── README.md                       # Documentación
    ├── tsconfig.json                   # Configuración de typescript
    └── ...



## Endpoints

### GET

`/facturas/:id`\
`/pequenia-demanda`\
`/pliegos`

### POST

`/auth/login`\
`/auth/signup`\
`/distribuidores`\
`/facturas`\
`/pequenia-demanda`
