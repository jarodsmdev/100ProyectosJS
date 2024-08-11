# Proyecto: Búsqueda de Información de IP
---

Este proyecto es una aplicación web sencilla que permite a los usuarios buscar información geográfica y de red de una dirección IP utilizando la API de [ipgeolocation.io](https://app.ipgeolocation.io/). 

## Descripción

El objetivo de esta aplicación es ofrecer una interfaz sencilla donde se pueda introducir una dirección IP y obtener detalles como:

- Ubicación geográfica (país, ciudad, etc.).
- ISP (Proveedor de Servicios de Internet).
- Información de la red.
- Coordenadas geográficas (latitud y longitud).

La aplicación valida las direcciones IP en formato IPv4 e IPv6 para asegurarse de que son válidas antes de realizar la solicitud a la API.

## Cómo funciona

1. **Introducción de la IP**: El usuario introduce la IP que quiere consultar en el campo de texto provisto en la interfaz.
2. **Búsqueda**: Al enviar el formulario, la aplicación realiza una solicitud a la API de ipgeolocation.io para obtener la información detallada de la IP introducida.
3. **Visualización de los resultados**: La información obtenida se muestra en la página en formato JSON, facilitando su interpretación.

## Requisitos

- **API Key**: Para que la aplicación funcione, es necesario registrarse en [ipgeolocation.io](https://app.ipgeolocation.io/login) y obtener una API Key. Esta clave se utiliza para autenticar las solicitudes a la API y obtener la información de la IP.

## Configuración del proyecto

1. Clona este repositorio:
2. Obtén tu API Key registrándote en ipgeolocation.io.

3. Abre el archivo `app.js` y reemplaza el valor de API_KEY con tu propia API Key:
    ```javascript
    const API_KEY = "TU_API_KEY_AQUÍ";
    ```
4. Abre el archivo `index.html` en tu navegador para probar la aplicación.

## Uso
Introduce una dirección IP en el campo de texto, ésta se encuentra habilitada para aceptar direcciones IPv4 e IPv6 válidas.
Haz clic en el botón "Buscar información de esta IP".
La información relacionada con la IP se mostrará en la página.

## Tecnologías Utilizadas

- HTML5: Para la estructura de la página web.
- Pico CSS: Un framework CSS para el diseño minimalista y responsivo de la página.  Lo puedes encontrar en [https://picocss.com/](https://picocss.com/).
- JavaScript (Fetch API): Para realizar las solicitudes a la API y manejar las respuestas.
- API de [https://app.ipgeolocation.io/login](https://app.ipgeolocation.io/login): 
