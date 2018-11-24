# Aplicación CRUD Localmente hacia la nube

En el presente proyecto consta de una pequeña aplicación de manejo de alimentos, con la finalidad de prácticar las acciones CRUD (Creación, Leer, Actualizar y Eliminar), la cual consta de tres aplicaciones:

1. **Redis Rest**: Cliente de redis, que se encarga de almacenar la información respectiva de la base de datos en Caché.
2. **REST**      : Servicio API que consiste en realizar las acciones básicas de un Alimento (CRUD), hacia una base de datos Mongo DB. 
3.  **Web**      : Proyecto Frontend de react js, que consiste en llamar los servicios correspondientes del cliente redis.

A continuación, se presentará la arquitectura de la aplicación:

*- - - - - *        *- - - - - *             *- - - - - *         *- - - - - *
|          |        |          |             |  REDIS   |         |          |
| Mongo DB | <----> |   REST   | <--5 min--> |   REST   |  <----> |   WEB    |  
|          |        |          |             |          |         |          |
*- - - - - *        *- - - - - *             *- - - - - *         *- - - - - *
                                                 *
                                                 |
                                                 |
                                                 |
                                                 *
                                            *- - - - - -*
                                            |  REDIS    |
                                            |   SERVER  |
                                            |           |
                                            *- - - - - -*

## Antes de comenzar

Es necesario configurar las variables de entorno de cada aplicación:
1. **Redis Rest** : ROOT/redis-rest/config/index.js
2. **Rest**       : ROOT/rest/server/config/config.
3. **Web**        : ROOT/web/src/global.js

### Prerequisitos

Es necesario instalar la última versión de NODEJS, de igual manera instalar los siguientes complementos: 

**Rest**
```
Servidor de Mongo DB
```

**Redis Rest**
```
Servidor de Redis
Aplicación Rest del presente proyecto
```

**Web**
```
Aplicación Redis Rest
```

### Instalación

Para instalar debe seguir los siguiente pasos


**Rest**
```
cd ROOT/rest
npm install
npm start
```
**Redis Rest**
```
cd ROOT/redis-rest
npm install
npm start
```

**Web**
```
cd ROOT/web
npm install
npm start
```

## Construcción de la aplicación

* [NODE](https://nodejs.org/es/download/package-manager/) - Node JS
* [MONGO](https://www.mongodb.com/es) - Mongo DB
* [REDIS](https://redis.io/) - Redis


## Autores

* **Diego Orellana** - *Proyecto Inicial* - [PurpleBooth](https://github.com/djob195)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## Conocimientos

* Aprendiendo a programar aplicaciones Full Stack
* Conceptos básicos de Microservicos
* Estructura de datos
