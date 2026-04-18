# Torres de la Serra

Web estática para Torres de la Serra, pensada para GitHub Pages y construida con HTML, CSS y JavaScript vanilla.

## Ver en local

Puedes abrir `index.html` directamente, pero para probar correctamente el sistema de idiomas es mejor servir la carpeta con un servidor estático:

```bash
python3 -m http.server 8000
```

Después abre `http://localhost:8000`.

## Deploy en GitHub Pages

1. Sube el contenido de esta carpeta al repositorio.
2. En GitHub entra en `Settings -> Pages`.
3. En `Source`, selecciona `Deploy from a branch`.
4. Elige la rama `main` y la carpeta `/ (root)`.
5. Guarda la configuración.
6. Si vas a usar el dominio final, deja el archivo `CNAME` en la raíz y apunta `www.torresdelaserra.com` a GitHub Pages.

## Cómo editar textos

Los textos traducibles están en:

- `locales/ca.json`
- `locales/es.json`
- `locales/en.json`

Cada bloque del HTML usa atributos `data-i18n` o `data-i18n-attr`. Si cambias o añades contenido, asegúrate de actualizar las tres versiones.

## Cómo añadir un nuevo artículo al Journal

1. Crea un nuevo HTML dentro de `journal/`.
2. Añade el contenido traducible en `locales/*.json`.
3. Incluye el enlace al artículo en `journal.html`.
4. Añade la nueva URL a `sitemap.xml`.

## Cómo configurar Formspree

El formulario de [contacte.html](/Users/pol.torresalvarez/Library/CloudStorage/OneDrive-EURECAT/Escritorio/Docs_Pol/Torres_de_la_Serra/web/new_web/contacte.html) apunta ahora a:

`https://formspree.io/f/YOUR_FORM_ID`

Pasos:

1. Crea una cuenta en [Formspree](https://formspree.io/).
2. Genera un formulario nuevo.
3. Sustituye `YOUR_FORM_ID` por el identificador real.
4. Publica de nuevo la web.

## Cómo añadir o reemplazar imágenes

- Coloca las imágenes en `img/`.
- Mantén nombres estables para no romper rutas ya usadas en el HTML.
- Prioriza `WebP` o `JPG` optimizados, y conserva PNG solo cuando haga falta transparencia.
- Si sustituyes una imagen importante de página, revisa también sus etiquetas `alt` y metas `og:image`.

## Estructura del proyecto

- `index.html`, `vins.html`, `oli.html`, `historia.html`, `journal.html`, `informacio.html`, `contacte.html`: páginas principales.
- `journal/`: artículos editoriales.
- `info/`: páginas QR de información nutricional.
- `css/styles.css`: sistema visual y layouts.
- `js/main.js`: interacciones, animaciones y formulario.
- `js/i18n.js`: carga de idiomas y selector CA/ES/EN.
- `locales/`: contenido traducido.
- `img/`: recursos visuales.
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, `CNAME`: archivos auxiliares de SEO y despliegue.
