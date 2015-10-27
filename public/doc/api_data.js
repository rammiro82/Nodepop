define({ "api": [
  {
    "type": "get",
    "url": "/apiv1/anuncios",
    "title": "List requested ads.",
    "version": "1.0.0",
    "name": "GetAnuncios",
    "group": "Ads",
    "description": "<p>List requested ads, using bellow filter parameters.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "tag",
            "description": "<p>Tags to classify.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": true,
            "field": "venta",
            "description": "<p>Identify ad type; selling or searching.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "nombre",
            "description": "<p>Name to filer</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "precio",
            "description": "<p>Used to specify price range, using min-max format.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "start",
            "description": "<p>Paginate option.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "limit",
            "description": "<p>Paginate option.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "sort",
            "description": "<p>Paginate option.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "includeTotal",
            "description": "<p>Total ads count.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "lang",
            "description": "<p>Locale.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "token",
            "description": "<p>Registered user token.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"success\":true,\n\"total\":4,\n\"data\":\n    [{\"_id\":\"561046f403f553d2273f818d\",\n    \"nombre\":\"Bicicleta\",\n    \"venta\":true,\n    \"precio\":230.15,\n    \"foto\":\"bici.jpg\",\n    \"__v\":0,\n    \"dateCreated\":\"2015-10-03T21:21:56.466Z\",\n    \"tags\":[\"lifestyle\",\"motor\"]}\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "success",
            "description": "<p>false</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Error description</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error.code",
            "description": "<p>Error code</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error.message",
            "description": "<p>Error code</p> "
          }
        ],
        "7XX": [
          {
            "group": "7XX",
            "optional": false,
            "field": "success",
            "description": "<p>false</p> "
          },
          {
            "group": "7XX",
            "optional": false,
            "field": "msg",
            "description": "<p>Error message</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"success\":false,\n \"error\":{\n     \"code\":403,\n     \"message\":\"No token provided.\"\n   }\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"success\":false,\n \"msg\":\"Not valid param precio.\"}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/apiv1/anuncios.js",
    "groupTitle": "Ads"
  },
  {
    "type": "get",
    "url": "/apiv1/anuncios/tags",
    "title": "List used tags.",
    "version": "1.0.0",
    "name": "GetTags",
    "group": "Ads",
    "description": "<p>List used tags from all created ads.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "lang",
            "description": "<p>Locale.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "token",
            "description": "<p>Registered user token.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"success\":true,\n    \"total\":3,\n    \"data\":[\n        \"lifestyle\",\n        \"motor\",\n        \"mobile\"]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "success",
            "description": "<p>false</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Error description</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error.code",
            "description": "<p>Error code</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error.message",
            "description": "<p>Error code</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"success\":false,\n \"error\":{\n     \"code\":403,\n     \"message\":\"No token provided.\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/apiv1/anuncios.js",
    "groupTitle": "Ads"
  },
  {
    "type": "post",
    "url": "/apiv1/anuncios",
    "title": "Create ads.",
    "version": "1.0.0",
    "name": "PutAnuncio",
    "group": "Ads",
    "description": "<p>Create ads.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "tag",
            "description": "<p>Tags to classify.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": true,
            "field": "venta",
            "description": "<p>Identify ad type; selling or searching.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "nombre",
            "description": "<p>Product name</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "precio",
            "description": "<p>Product price.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "foto",
            "description": "<p>Product photo.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "lang",
            "description": "<p>Locale.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "token",
            "description": "<p>Registered user token.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\"success\": true,\n  \"anuncio\": {\n      \"__v\": 0,\n      \"nombre\": \"iPhone 3GS YYYYY\",\n      \"venta\": true,\n      \"precio\": 500,\n      \"foto\": \"iphone.png\",\n      \"_id\": \"561192aee802c2624b2147bf\",\n      \"dateCreated\": \"2015-10-04T20:57:18.568Z\",\n      \"tags\": [\n          \"lifestyle\",\n          \"mobile\"\n      ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "success",
            "description": "<p>false</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Error description</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error.code",
            "description": "<p>Error code</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error.message",
            "description": "<p>Error code</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"success\":false,\n \"error\":{\n     \"code\":403,\n     \"message\":\"No token provided.\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/apiv1/anuncios.js",
    "groupTitle": "Ads"
  },
  {
    "type": "post",
    "url": "/apiv1/tokens",
    "title": "NewPushToken.",
    "version": "1.0.0",
    "name": "CreateToken",
    "group": "PushToken",
    "description": "<p>Create a new PushToken.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "nombre",
            "description": "<p>User name.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "token",
            "description": "<p>User token.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "plataforma",
            "description": "<p>User dervice plataform.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "lang",
            "description": "<p>Locale.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"token\": {\n        \"__v\": 0,\n        \"usuario\": null,\n        \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjExMjIzNmE4NjYxMmNkM2FkNjhhYmMiLCJub21icmUiOiIxMTExIiwiZW1haWwiOiIxMTExQGdtYWlsLmNvbSIsImNsYXZlIjoiMGZmZTFhYmQxYTA4MjE1MzUzYzIzM2Q2ZTAwOTYxM2U5NWVlYzQyNTM4MzJhNzYxYWYyOGZmMzdhYzVhMTUwYyIsIl9fdiI6MCwiZGF0ZUNyZWF0ZWQiOiIyMDE1LTEwLTA0VDEyOjU3OjI2LjU1NVoifQ.QsCTd3ftIpAEGTKYPkd3980UGtSJxbZ9dblk9mV-n0c.eyJfaWQiOiI1NjEwZjc2ZjcxMTgzY2NmMzM5NTMyMzgiLCJub21icmUiOiJyYW1pcm8gMjIyIiwiZW1haWwiOiJyYW1taXJvMjIyQGdtYWlsLmNvbSIsImNsYXZlIjoiZDEwNWYzNDg3NTYxYzU3ZjBmM2M3NWRmZjUwMTgwYzYyNzg1MDZlMjhjYzEzNDIzMmYxODJmYzc2N2I0M2NkMSIsIl9fdiI6MCwiZGF0ZUNyZWF0ZWQiOiIyMDE1LTEwLTA0VDA5OjU0OjU1LjMzMVoifQ.5d1llTYM5OHVGqeWPG50TaQ-0qyaLw4GNB612x-eQRw\",\n        \"plataforma\": \"ios\",\n        \"_id\": \"561198d90abb3c324c696074\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "success",
            "description": "<p>false</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Error description</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"success\": false,\n     \"error\": \"TOKEN_SAVE_KO\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/apiv1/tokens.js",
    "groupTitle": "PushToken"
  },
  {
    "type": "post",
    "url": "/apiv1/authenticate",
    "title": "Authenticate.",
    "version": "1.0.0",
    "name": "Authenticate",
    "group": "Users",
    "description": "<p>Validate username and password.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>User email.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "clave",
            "description": "<p>User password.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "lang",
            "description": "<p>Locale.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"Enjoy your token!\",\n    \"token\": \"XXX\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "success",
            "description": "<p>false</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Error description</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error.code",
            "description": "<p>Error code</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error.message",
            "description": "<p>Error code</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"success\": false,\n  \"error\": {\n      \"code\": 401,\n      \"message\": \"Authentication failed. User not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n  \"success\": false,\n  \"error\": {\n      \"code\": 401,\n      \"message\": \"Authentication failed. Wrong password.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/apiv1/authenticate.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/apiv1/usuarios/registrar",
    "title": "NewUser.",
    "version": "1.0.0",
    "name": "CreateUser",
    "group": "Users",
    "description": "<p>Create a new user.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "nombre",
            "description": "<p>User name.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>User email.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "clave",
            "description": "<p>User password.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "lang",
            "description": "<p>Locale.</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"usuario\": {\n        \"__v\": 0,\n        \"nombre\": \"2222\",\n        \"email\": \"2222@gmail.com\",\n        \"clave\": \"edee29f882543b956620b26d0ee0e7e950399b1c4222f5de05e06425b4c995e9\",\n        \"_id\": \"561196975f5e8de84b912a14\",\n        \"dateCreated\": \"2015-10-04T21:13:59.597Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "success",
            "description": "<p>false</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "msg",
            "description": "<p>Error description</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Error description</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error.code",
            "description": "<p>Error code</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error.message",
            "description": "<p>Error code</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"success\": false,\n  \"error\": {\n      \"code\": 401,\n      \"message\": \"Authentication failed. User not found.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n     \"success\": false,\n     \"msg\": \"email already registered.\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/apiv1/usuarios.js",
    "groupTitle": "Users"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p> "
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/doc/main.js",
    "group": "_var_www_Nodepop_public_doc_main_js",
    "groupTitle": "_var_www_Nodepop_public_doc_main_js",
    "name": ""
  }
] });