# Nodepop
Repositorio del código fuente de la práctica del módulo DevOps del KeepCoding MasterBoot 2015.

## Probar la Aplicación
Para poder comprobar cómo funciona la aplicación, se encuentra desplegada en el dominio [www.nodepop.es](http://www.nodepop.es).

Los pasos para poder probar la API usando la extensión para chrome 'Postman REST API Client', por ejemplo, serían los siguientes:

1. Registrarse  
 - Usando la URL ``http://www.nodepop.es/apiv1/usuarios/registrar``
![Sin titulo](https://raw.githubusercontent.com/rammiro82/KeepCoding/master/Git/img_temp/01_registrarse.png "Registrarse en la App")

2. Autenticarse  
 - Usando la URL ``http://www.nodepop.es/apiv1/authenticate``
![Sin titulo](https://raw.githubusercontent.com/rammiro82/KeepCoding/master/Git/img_temp/02_autenticarse.png "Autenticarse en la App")
 - Es muy **IMPORTANTE**, utilizar el valor de la clave **token** en los pasos posteriores
3. Utilizar la API  
 - Usando la URL ``http://www.nodepop.es/apiv1/anuncios`` para crear un anuncio
![Sin titulo](https://raw.githubusercontent.com/rammiro82/KeepCoding/master/Git/img_temp/03_3_crearAnuncio.png "Crear anuncios en la App")

 - Usando la URL ``http://www.nodepop.es/apiv1/anuncios?token=XXXX`` para listar TODOS los anuncios
![Sin titulo](https://raw.githubusercontent.com/rammiro82/KeepCoding/master/Git/img_temp/03_2_consultarAuncios.png "Crear anuncios en la App")

 - Usando la URL ``http://www.nodepop.es/apiv1/anuncios?token=XXXX&tag='etiqueta'&venta=true&nombre='Descripción'&precio=125&start=0&limit=50&sort='precio'&includeTotal=&lang='es_ES'`` para listar los anuncios usando filtros
![Sin titulo](https://raw.githubusercontent.com/rammiro82/KeepCoding/master/Git/img_temp/03_2_consultarAuncios.png "Crear anuncios en la App")

Una documentación más extensa de la API, se puede encontrar en [Nodepop API Doc](http://www.nodepop.es/doc).

Para probar cómo nginx sirve los ficheros estáticos, para descargar trabajo a node, se puede probar con los siguientes enlaces:  

- <http://www.nodepop.es/images/anuncios/bici.png> 
- <http://www.nodepop.es/> Fichero de estilos css.

## Instalar la aplicación

Para instalar la aplicación
```
git clone https://github.com/rammiro82/Nodepop.git
cd Nodepop
npm install
```

## Arrancar la aplicación

### Producción
```
npm start
```

### Entorno de desarrollo
```
npm run dev
```

## Inicializar la BBDD

```
npm run initDB
```