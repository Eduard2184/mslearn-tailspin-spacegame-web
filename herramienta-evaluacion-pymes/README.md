# 🚀 Herramienta de Evaluación de Madurez Empresarial

> **Plataforma interactiva para evaluar el nivel de madurez digital de PYMEs**
> Desarrollada por [ForjaDigitalAE](https://forjadigitalae.com)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Demo](#-demo)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Personalización](#-personalización)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 📖 Descripción

Esta herramienta web permite a las pequeñas y medianas empresas (PYMEs) evaluar su nivel de madurez empresarial en **10 dimensiones clave**:

1. 🎯 Visión y Estrategia
2. 🏛️ Gobierno Empresarial
3. ⚙️ Procesos y Operaciones
4. 👥 Gestión de Talento
5. 💡 Innovación y Agilidad
6. 💻 Estrategia Tecnológica
7. 📊 Inteligencia de Negocio
8. 🧡 Experiencia del Cliente
9. 🌍 Sostenibilidad
10. 💰 Finanzas y Rentabilidad

Al completar el cuestionario de **50 preguntas**, las empresas reciben:

- ✅ **Puntuación global** de madurez (0-100)
- ✅ **Análisis detallado** por dimensión
- ✅ **Gráfico radar** comparativo
- ✅ **Recomendaciones personalizadas** de acción
- ✅ **Reporte PDF descargable** con plan de mejora

---

## ✨ Características

### 🎨 Diseño Profesional
- Interfaz moderna y responsive (móvil, tablet, desktop)
- Animaciones suaves y transiciones fluidas
- Paleta de colores corporativa de ForjaDigitalAE
- Experiencia de usuario optimizada

### 🔐 Cumplimiento Legal
- Modal de consentimiento GDPR/RGPD
- Política de privacidad integrada
- Gestión transparente de datos

### 📊 Análisis Avanzado
- Sistema de ponderación por pregunta
- Cálculo automático de scores
- Visualización con Chart.js (gráficos radar)
- Clasificación de madurez en 5 niveles

### 💾 Persistencia de Datos
- Almacenamiento local (localStorage) para no perder progreso
- Integración con Google Sheets via Apps Script
- Exportación de datos en formato JSON

### 📄 Generación de Reportes
- Reporte PDF profesional con jsPDF
- Incluye gráficos, estadísticas y plan de acción
- Personalizado con branding de la empresa evaluada

---

## 🎯 Demo

### Vista Previa

**Landing Page:**
![Landing](https://via.placeholder.com/800x400?text=Landing+Page)

**Evaluación:**
![Evaluación](https://via.placeholder.com/800x400?text=Evaluacion+Page)

**Resultados:**
![Resultados](https://via.placeholder.com/800x400?text=Resultados+Page)

> **Nota:** Reemplaza las imágenes de placeholder con screenshots reales del proyecto.

---

## 🛠 Tecnologías

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS y Grid/Flexbox
- **JavaScript (Vanilla)** - Lógica de aplicación sin frameworks

### Librerías Externas
- [Chart.js 3.9.1](https://www.chartjs.org/) - Gráficos interactivos
- [jsPDF 2.5.1](https://github.com/parallax/jsPDF) - Generación de PDF
- [html2canvas 1.4.1](https://html2canvas.hertzen.com/) - Captura de canvas a imagen
- [Font Awesome 6.0](https://fontawesome.com/) - Iconografía

### Backend (Opcional)
- Google Apps Script - Almacenamiento de respuestas en Google Sheets

---

## 📦 Instalación

### Opción 1: Uso Directo (Sin instalación)

1. **Clona este repositorio:**
   ```bash
   git clone https://github.com/Eduard2184/herramienta-evaluacion-pymes.git
   cd herramienta-evaluacion-pymes
   ```

2. **Abre el archivo HTML en tu navegador:**
   ```bash
   # En Linux/Mac
   open evaluacion.html

   # En Windows
   start evaluacion.html
   ```

### Opción 2: Servidor Local

Para desarrollo o testing con un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server -p 8000
```

Luego accede a: `http://localhost:8000/evaluacion.html`

---

## 🚀 Uso

### 1. Configuración Inicial

Antes de usar la herramienta, configura tu endpoint de Google Sheets (opcional):

```javascript
// En evaluacion-script.js, línea 8:
const GOOGLE_SCRIPT_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT';
```

**Pasos para configurar Google Sheets:**
1. Crea una hoja de cálculo en Google Sheets
2. Ve a **Extensiones > Apps Script**
3. Copia el código del webhook (consulta `docs/google-apps-script.md`)
4. Despliega como Web App y copia la URL

### 2. Flujo de Usuario

1. **Landing Page:** El usuario lee la propuesta de valor
2. **Consentimiento:** Acepta el tratamiento de datos
3. **Registro:** Completa información de la empresa
4. **Evaluación:** Responde 50 preguntas (5 por dimensión)
5. **Resultados:** Visualiza su puntuación y recomendaciones
6. **Descarga:** Obtiene el reporte PDF

---

## 📁 Estructura del Proyecto

```
herramienta-evaluacion-pymes/
├── evaluacion.html          # Estructura HTML principal
├── evaluacion-script.js     # Lógica de la aplicación
├── evaluacion-styles.css    # Estilos y diseño responsive
├── README.md                # Este archivo
├── LICENSE                  # Licencia del proyecto
└── assets/                  # Recursos adicionales (opcional)
    ├── images/
    └── fonts/
```

### Arquitectura del Código

**HTML:**
- Sección 1: Landing Page
- Sección 2: Formulario de Registro
- Sección 3: Evaluación (50 preguntas)
- Sección 4: Resultados y Reportes

**JavaScript:**
- Estado global de la aplicación (`appState`)
- 10 categorías con 5 preguntas cada una
- Sistema de navegación entre secciones
- Cálculo de scores con ponderación
- Generación de recomendaciones
- Integración con Google Sheets
- Exportación a PDF

**CSS:**
- Variables CSS para branding
- Grid y Flexbox para layouts
- Media queries para responsive
- Animaciones y transiciones
- Estilos modulares por componente

---

## 🎨 Personalización

### Colores Corporativos

Modifica las variables CSS en `evaluacion-styles.css`:

```css
:root {
    --primary-900: #27325A;      /* Azul marino principal */
    --accent-purple: #8560C0;    /* Morado acento */
    --accent-turquoise: #4CCED5; /* Turquesa */
    --accent-orange: #EE8028;    /* Naranja */
    /* ... más colores ... */
}
```

### Logo

Reemplaza la URL del logo en `evaluacion.html` (línea 68):

```html
<img src="TU_URL_DEL_LOGO" alt="Tu Empresa Logo" class="logo">
```

### Preguntas

Edita el array `categories` en `evaluacion-script.js` (línea 24):

```javascript
const categories = [
    {
        id: 'tu_categoria',
        name: 'Nombre de la Categoría',
        icon: '🎯',
        weight: 0.10,
        description: 'Descripción de la categoría',
        questions: [
            {
                id: 'cat_01',
                text: '¿Tu pregunta aquí?',
                tooltip: 'Explicación de la pregunta',
                weight: 1.0
            },
            // ... más preguntas
        ]
    }
];
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto:

1. **Fork** el repositorio
2. Crea una **rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Áreas de Mejora

- [ ] Soporte multiidioma (i18n)
- [ ] Modo oscuro
- [ ] Comparación con benchmarks sectoriales
- [ ] Dashboard administrativo
- [ ] Autenticación de usuarios
- [ ] Exportación a Excel

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 Contacto

**ForjaDigitalAE**
Arquitectura Empresarial & Transformación Digital

- 🌐 Website: [forjadigitalae.com](https://forjadigitalae.com)
- 📧 Email: contacto@forjadigitalae.com
- 💼 LinkedIn: [ForjaDigitalAE](https://linkedin.com/company/forjadigitalae)
- 📱 WhatsApp: +57 300 123 4567

---

## 🙏 Agradecimientos

- [Chart.js](https://www.chartjs.org/) - Por los gráficos interactivos
- [jsPDF](https://github.com/parallax/jsPDF) - Por la generación de PDF
- [Font Awesome](https://fontawesome.com/) - Por los iconos
- [Google Apps Script](https://developers.google.com/apps-script) - Por la integración con Sheets

---

<div align="center">

**Desarrollado con ❤️ por ForjaDigitalAE**

[⬆️ Volver arriba](#-herramienta-de-evaluación-de-madurez-empresarial)

</div>
