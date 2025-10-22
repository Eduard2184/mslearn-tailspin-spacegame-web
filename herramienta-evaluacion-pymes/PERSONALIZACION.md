# 🎨 Guía de Personalización - ForjaDigitalAE

## 📋 Elementos que Puedes Personalizar

### 1. 🖼️ Logo de la Empresa

**Ubicación:** `evaluacion.html` - Línea 68

**Actual:**
```html
<img src="https://forjadigitalae.github.io/LOGO%20F_OSC.png" alt="ForjaDigitalAE Logo" class="logo">
```

**Cambiar a:**
```html
<img src="TU_URL_DEL_LOGO" alt="Tu Empresa Logo" class="logo">
```

#### Opciones para el Logo:

**Opción A:** Usar GitHub (Recomendado)
1. Sube tu logo al repositorio GitHub
2. Ve a: https://github.com/Eduard2184/Evaluacion-PYMEs
3. Clic en "Add file" → "Upload files"
4. Sube tu logo (ej: `logo.png`)
5. Usa esta URL:
   ```
   https://eduard2184.github.io/Evaluacion-PYMEs/logo.png
   ```

**Opción B:** Usar un servicio externo
- [Imgur](https://imgur.com) - Gratis
- [Cloudinary](https://cloudinary.com) - Gratis
- Tu propio servidor/hosting

---

### 2. 🎨 Colores Corporativos

**Ubicación:** `evaluacion-styles.css` - Líneas 8-30

**Actual:**
```css
:root {
    --primary-900: #27325A;      /* Azul marino */
    --accent-purple: #8560C0;    /* Morado */
    --accent-turquoise: #4CCED5; /* Turquesa */
    --accent-orange: #EE8028;    /* Naranja */
}
```

**Personaliza tus colores:**
1. Ve a [Coolors.co](https://coolors.co/) para elegir paleta
2. Copia los códigos hexadecimales
3. Reemplaza en el CSS

**Ejemplo:**
```css
:root {
    --primary-900: #1a237e;      /* Tu azul */
    --accent-purple: #6a1b9a;    /* Tu morado */
    --accent-turquoise: #00acc1; /* Tu turquesa */
    --accent-orange: #ff6f00;    /* Tu naranja */
}
```

---

### 3. ✏️ Textos y Títulos

#### Título Principal
**Ubicación:** `evaluacion.html` - Línea 69

```html
<!-- Actual -->
<h1 class="titulo-principal">¿Qué tan digital es realmente tu PYME?</h1>

<!-- Personalizar -->
<h1 class="titulo-principal">TU TÍTULO AQUÍ</h1>
```

#### Subtítulo
**Ubicación:** `evaluacion.html` - Línea 70

```html
<!-- Actual -->
<p class="subtitulo">Descubre tu nivel de madurez digital en 15 minutos...</p>

<!-- Personalizar -->
<p class="subtitulo">TU SUBTÍTULO AQUÍ</p>
```

---

### 4. 📧 Información de Contacto

**Ubicación:** `evaluacion.html` - Busca estos elementos

#### Email
```html
<!-- Busca y reemplaza -->
contacto@forjadigitalae.com
<!-- Por -->
tu-email@tuempresa.com
```

#### Teléfono/WhatsApp
```html
<!-- Busca y reemplaza -->
+57 300 123 4567
<!-- Por -->
TU_NUMERO
```

#### Website
```html
<!-- Busca y reemplaza -->
www.forjadigitalae.com
<!-- Por -->
www.tuempresa.com
```

---

### 5. 🏷️ Nombre de la Empresa

Busca y reemplaza **"ForjaDigitalAE"** por **"Tu Empresa"** en:
- `evaluacion.html`
- `README.md`

**PowerShell (Automático):**
```powershell
# En la carpeta del proyecto
(Get-Content evaluacion.html) -replace 'ForjaDigitalAE', 'Tu Empresa' | Set-Content evaluacion.html
(Get-Content README.md) -replace 'ForjaDigitalAE', 'Tu Empresa' | Set-Content README.md
```

---

### 6. 🌐 Redes Sociales

**Ubicación:** Agrega al footer del `evaluacion.html`

```html
<!-- Antes del cierre de </body> -->
<footer class="footer">
    <div class="container">
        <div class="social-links">
            <a href="https://facebook.com/tuempresa" target="_blank">
                <i class="fab fa-facebook"></i>
            </a>
            <a href="https://linkedin.com/company/tuempresa" target="_blank">
                <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://instagram.com/tuempresa" target="_blank">
                <i class="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com/tuempresa" target="_blank">
                <i class="fab fa-twitter"></i>
            </a>
        </div>
        <p>&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
    </div>
</footer>
```

**Estilos para el footer (en `evaluacion-styles.css`):**
```css
.footer {
    background: var(--primary-900);
    color: white;
    padding: 2rem 0;
    text-align: center;
    margin-top: 4rem;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.social-links a {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s ease;
}

.social-links a:hover {
    background: var(--accent-purple);
    transform: translateY(-3px);
}
```

---

### 7. 📊 Modificar Preguntas de Evaluación

**Ubicación:** `evaluacion-script.js` - Línea 24 (array `categories`)

**Estructura:**
```javascript
{
    id: 'tu_categoria',           // ID único
    name: 'Nombre de Categoría',  // Nombre visible
    icon: '🎯',                    // Emoji
    weight: 0.10,                  // Peso (suma total debe ser 1.0)
    description: 'Descripción...',
    questions: [
        {
            id: 'cat_01',                    // ID único de pregunta
            text: '¿Tu pregunta?',           // Texto de la pregunta
            tooltip: 'Ayuda para usuario',  // Explicación
            weight: 1.0                      // Peso de la pregunta (0.5 - 1.5)
        },
        // ... más preguntas (mínimo 3, máximo 10)
    ]
}
```

**Ejemplo - Agregar nueva categoría:**
```javascript
{
    id: 'marketing_digital',
    name: 'Marketing Digital',
    icon: '📱',
    weight: 0.10,
    description: 'Evalúa tu estrategia de marketing digital',
    questions: [
        {
            id: 'md_01',
            text: '¿Tienes presencia activa en redes sociales?',
            tooltip: 'Al menos 2 redes actualizadas regularmente',
            weight: 1.2
        },
        {
            id: 'md_02',
            text: '¿Realizas campañas de publicidad digital?',
            tooltip: 'Google Ads, Facebook Ads, etc.',
            weight: 1.1
        },
        // ... más preguntas
    ]
}
```

---

### 8. 🎨 Fuentes Tipográficas

**Ubicación:** `evaluacion-styles.css` - Línea 57

**Actual:**
```css
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

**Cambiar a Google Fonts:**

1. Ve a [Google Fonts](https://fonts.google.com/)
2. Elige tu fuente (ej: "Poppins")
3. Copia el `<link>` e insértalo en `evaluacion.html`:

```html
<head>
    <!-- Agregar antes de los CSS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</head>
```

4. Actualiza el CSS:
```css
body {
    font-family: 'Poppins', sans-serif;
}
```

---

### 9. 📄 Reporte PDF - Branding

**Ubicación:** `evaluacion-script.js` - Función `downloadPDF()`

Busca y reemplaza:
- Textos del reporte
- Colores corporativos
- Información de contacto en el footer

---

### 10. 🌍 Idioma

Actualmente está en **Español**. Si quieres cambiarlo:

**Meta tag (evaluacion.html):**
```html
<!-- Actual -->
<html lang="es" translate="no">

<!-- Inglés -->
<html lang="en" translate="no">
```

**Textos:** Tendrías que traducir manualmente todos los strings.

---

## 🚀 Aplicar los Cambios

### Opción A: Editar en GitHub

1. Ve a tu repositorio
2. Clic en el archivo a editar
3. Clic en el icono del lápiz (✏️)
4. Haz tus cambios
5. Scroll abajo → "Commit changes"

### Opción B: Editar Localmente

1. Clona el repositorio
2. Edita con tu editor favorito (VS Code, Sublime, etc.)
3. Commit y push:
```bash
git add .
git commit -m "Personalización: logos y colores corporativos"
git push origin main
```

---

## ⏱️ Tiempo de Actualización

Después de hacer cambios en GitHub:
- **GitHub Pages actualiza en:** 1-3 minutos
- Refresca con **Ctrl + F5** (hard refresh)

---

## 🎨 Recursos de Diseño

- **Paletas de colores:** [Coolors.co](https://coolors.co/)
- **Iconos:** [Font Awesome](https://fontawesome.com/icons)
- **Fuentes:** [Google Fonts](https://fonts.google.com/)
- **Imágenes:** [Unsplash](https://unsplash.com/)
- **Logos:** [Canva](https://www.canva.com/)

---

**¿Necesitas ayuda con alguna personalización específica?** Avísame y te ayudo paso a paso. 🎨
