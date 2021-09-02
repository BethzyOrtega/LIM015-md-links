# Markdown Links
## Índice

- [1. Preámbulo](#1-preámbulo)
- [2. Instalacion](#2-instalacion)
- [3. Uso](#3-uso)
- [4. Diagrama de flujo](#4-diagrama-de-flujo)
- [5. Checklist](#9-checklist)

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## 2. Instalacion

Mediante npm:
#### `$ npm i bethzyortega-mdlinks -g`

Mediante repo de github:
#### ``

## 3. Uso

Para acceder se debe importar con  require('bethzyortega-mdlinks').

### Este proyecto consta de DOS partes

### 1) JavaScript API

Esta es una funcion que retorna una promesa `mdLinks(path, options)` que recibe dos parámetros: path (ruta absoluta o relativa) y options ({validate: true} o {validate: false}) que retorna un array de objetos por cada link.

##### Valor de retorno

Con `validate:false` :

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.
- `status`: Código de respuesta HTTP.
- `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require('bethzyortega-mdlinks');

mdLinks("./some/example.md")
  .then((links) => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then((links) => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then((links) => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la **terminal**:

`md-links <path-to-file> [options]`

Por ejemplo:

![md-links](https://raw.githubusercontent.com/BethzyOrtega/LIM015-md-links/main/Imagenes_Readme/mdlinks_SinOption.PNG)

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:
![md-links](https://raw.githubusercontent.com/BethzyOrtega/LIM015-md-links/main/Imagenes_Readme/mdlinks_validate.PNG)

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

![md-links](https://raw.githubusercontent.com/BethzyOrtega/LIM015-md-links/main/Imagenes_Readme/mdlinks_stats.PNG)

##### `--stats ---validate`
También podemos combinar `--stats` y `--validate` para obtener estadísticas que necesiten de los resultados de la validación.

![md-links](https://raw.githubusercontent.com/BethzyOrtega/LIM015-md-links/main/Imagenes_Readme/mdlinks_stats_validate.PNG)

##### `--help`
También se ha implementado la opcion `--help`, que muestra todas las opciones que tiene el recurso.

![md-links](https://raw.githubusercontent.com/BethzyOrtega/LIM015-md-links/main/Imagenes_Readme/mdlinks_help.PNG)

## 4. Diagrama de flujo

#### API
![API](https://raw.githubusercontent.com/BethzyOrtega/LIM015-md-links/main/flowcharts/diagrama%20API.png)

#### CLI
![CLI](https://raw.githubusercontent.com/BethzyOrtega/LIM015-md-links/main/flowcharts/Diagrama%20CLI.jpg)

## 5. Checklist

### General

- [ ] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

- [ ] Un board con el backlog para la implementación de la librería.
- [ ] Documentación técnica de la librería.
- [ ] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

- [ ] El módulo exporta una función con la interfaz (API) esperada.
- [ ] Implementa soporte para archivo individual
- [ ] Implementa soporte para directorios
- [ ] Implementa `options.validate`

### CLI

- [ ] Expone ejecutable `md-links` en el path (configurado en `package.json`)
- [ ] Se ejecuta sin errores / output esperado
- [ ] Implementa `--validate`
- [ ] Implementa `--stats`

### Pruebas / tests

- [ ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
      lines, y branches.
- [ ] Pasa tests (y linters) (`npm test`).
