define({ "api": [  {    "type": "get",    "url": "/anuncios",    "title": "Lista los anuncios según los parámetros del filtro.",    "name": "GetAnuncios",    "group": "Anuncios",    "version": "0.0.0",    "filename": "./routes/apiv1/anuncios.js",    "groupTitle": "Anuncios"  },  {    "type": "get",    "url": "/anuncios/tags",    "title": "Lista los tags que hay.",    "name": "GetTags",    "group": "Anuncios",    "version": "0.0.0",    "filename": "./routes/apiv1/anuncios.js",    "groupTitle": "Anuncios"  },  {    "type": "post",    "url": "/anuncios",    "title": "Crea un anuncio.",    "name": "PostAnuncios",    "group": "Anuncios",    "version": "0.0.0",    "filename": "./routes/apiv1/anuncios.js",    "groupTitle": "Anuncios"  },  {    "type": "post",    "url": "/authenticate",    "title": "Valida los datos de usuario a registrar.",    "name": "PostAuthenticate",    "group": "Authentication",    "version": "0.0.0",    "filename": "./routes/apiv1/authenticate.js",    "groupTitle": "Authentication"  },  {    "type": "post",    "url": "/usuarios/registrar",    "title": "Da de alta un usuario.",    "name": "PostUsuario",    "group": "Usuarios",    "version": "0.0.0",    "filename": "./routes/apiv1/usuarios.js",    "groupTitle": "Usuarios"  },  {    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "varname1",            "description": "<p>No type.</p> "          },          {            "group": "Success 200",            "type": "<p>String</p> ",            "optional": false,            "field": "varname2",            "description": "<p>With type.</p> "          }        ]      }    },    "type": "",    "url": "",    "version": "0.0.0",    "filename": "./public/doc/main.js",    "group": "_Users_ramiro_Library_Mobile_Documents_com_apple_CloudDocs_KeepCodingMasterBoot_NodeJS_Nodepop_public_doc_main_js",    "groupTitle": "_Users_ramiro_Library_Mobile_Documents_com_apple_CloudDocs_KeepCodingMasterBoot_NodeJS_Nodepop_public_doc_main_js",    "name": ""  }] });