# Bolivar Construction Corp — Website

Sitio estático (HTML + CSS + JS, sin frameworks) con contenido y fotos reales
de la empresa, listo para reemplazar la página temporal de "coming soon".

## Estructura
```
bolivar-site/
├── index.html
├── css/styles.css
├── js/script.js
├── images/          ← logo, fotos de proyectos y equipo (ya incluidas)
└── README.md
```

## Único pendiente antes de publicar
**Formulario de contacto**: reemplaza `TU_FORM_ID` en el `action` del
`<form id="contactForm">` en `index.html` por tu endpoint real de
[Formspree](https://formspree.io).

Todo lo demás (logo, textos, servicios, fotos de proyectos, equipo, video
conceptual, datos de contacto y licencia) ya está con la información real
de la empresa.

## Cómo publicar (reemplazando la página actual)
Este sitio va en el mismo repositorio de GitHub ya conectado al dominio
(`bolivar-construction-corp`), reemplazando el `index.html` actual.

```bash
# dentro de la carpeta del repo ya clonado, reemplaza los archivos
# por los de esta carpeta, luego:
git add .
git commit -m "Sitio completo de Bolivar Construction Corp"
git push
```

GitHub Pages se actualiza solo en 1-2 minutos. El dominio no cambia.

## Notas
- Las fotos ya están comprimidas y optimizadas para web (cada una entre 50-180KB).
- El portafolio tiene 6 proyectos destacados; hay más fotos disponibles si
  quieres ampliar la galería más adelante.
- Los teléfonos, correo, dirección y número de licencia (L18000152740) ya
  están puestos según el material que compartió el cliente.
- El video (`videos/concept-render.mp4`, ~1.7MB) va en reproducción automática,
  silenciado y en loop — así funciona en todos los navegadores sin bloqueos
  de autoplay. Está etiquetado como render conceptual de IA para no
  confundirlo con metraje real de una obra de la empresa.


## Cómo publicar (reemplazando la página actual)
Este sitio va en el mismo repositorio de GitHub que ya está conectado al
dominio (`bolivar-construction-corp`), reemplazando el `index.html` actual.

```bash
# dentro de la carpeta del repo ya clonado
git add .
git commit -m "Sitio completo de Bolivar Construction Corp"
git push
```

GitHub Pages se actualiza solo en 1-2 minutos. El dominio no cambia.
