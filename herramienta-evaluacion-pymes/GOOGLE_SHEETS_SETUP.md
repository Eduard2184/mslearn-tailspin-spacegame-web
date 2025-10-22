# 📊 Configuración de Google Sheets para la Herramienta

## ¿Por Qué Necesitas Esto?

Para que los datos de las evaluaciones se guarden automáticamente en una hoja de cálculo.

---

## 🚀 PASO A PASO: Configurar Google Sheets

### PASO 1: Crear la Hoja de Cálculo

1. Ve a: **https://sheets.google.com**
2. Clic en **"Blank"** (Hoja en blanco)
3. Nómbrala: **"Evaluaciones PYME - ForjaDigitalAE"**

### PASO 2: Configurar las Columnas

En la primera fila, agrega estos encabezados:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| Fecha | Empresa | Email | Teléfono | Sector | Tamaño | Puntuación Total | Nivel Madurez | Ciudad | Contacto | Scores por Categoría |

### PASO 3: Crear el Apps Script

1. En tu hoja de cálculo, ve a: **Extensiones → Apps Script**

2. Borra el código que aparece y pega este:

```javascript
function doPost(e) {
  try {
    // Obtener la hoja activa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parsear los datos recibidos
    const data = JSON.parse(e.postData.contents);

    // Extraer información
    const timestamp = new Date();
    const companyData = data.companyData || {};
    const evaluationData = data.evaluationData || {};

    // Preparar la fila de datos
    const row = [
      timestamp,                                    // A: Fecha
      companyData.name || 'N/A',                   // B: Empresa
      companyData.email || 'N/A',                  // C: Email
      companyData.phone || 'N/A',                  // D: Teléfono
      companyData.sector || 'N/A',                 // E: Sector
      companyData.size || 'N/A',                   // F: Tamaño
      evaluationData.totalScore || 0,              // G: Puntuación Total
      evaluationData.maturityLevel?.level || 'N/A', // H: Nivel Madurez
      companyData.city || 'N/A',                   // I: Ciudad
      companyData.contactName || 'N/A',            // J: Contacto
      JSON.stringify(evaluationData.categoryScores || {}) // K: Scores por Categoría
    ];

    // Agregar la fila a la hoja
    sheet.appendRow(row);

    // Formatear la fecha
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setNumberFormat('dd/mm/yyyy hh:mm:ss');

    // Responder con éxito
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'success',
        message: 'Datos guardados correctamente',
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Responder con error
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función de prueba
function testPost() {
  const testData = {
    companyData: {
      name: 'Empresa Test',
      email: 'test@empresa.com',
      phone: '+57 300 123 4567',
      sector: 'Tecnología',
      size: 'Pequeña (11-50)',
      city: 'Bogotá',
      contactName: 'Juan Pérez'
    },
    evaluationData: {
      totalScore: 75,
      maturityLevel: {
        level: 'Avanzado'
      },
      categoryScores: {
        vision_estrategia: 80,
        gobierno_empresarial: 70,
        procesos_operaciones: 75
      }
    }
  };

  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const response = doPost(e);
  Logger.log(response.getContent());
}
```

3. **Guarda el proyecto** (Ctrl + S o clic en el icono de disco)
   - Nombre del proyecto: **"Webhook Evaluación PYME"**

### PASO 4: Desplegar como Web App

1. Clic en **"Implementar"** → **"Nueva implementación"**

2. Configuración:
   - **Tipo:** Aplicación web
   - **Ejecutar como:** Yo (tu email)
   - **Quién tiene acceso:** Cualquier usuario

3. Clic en **"Implementar"**

4. **Autoriza la aplicación:**
   - Clic en "Revisar permisos"
   - Selecciona tu cuenta de Google
   - Clic en "Avanzado" → "Ir a Webhook Evaluación PYME (no seguro)"
   - Clic en "Permitir"

5. **Copia la URL de deployment**
   - Aparecerá algo como:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
   - **¡GUARDA ESTA URL!** La necesitarás para el siguiente paso

### PASO 5: Probar el Script

1. En Apps Script, ve a **"Ejecutar"** → **testPost**
2. Verifica que aparezca una fila de prueba en tu hoja de cálculo
3. Si funciona, **¡estás listo!**

---

## 🔗 PASO 6: Conectar con Tu Herramienta

Ahora necesitas actualizar el archivo JavaScript de tu herramienta:

1. Ve a tu repositorio en GitHub:
   **https://github.com/Eduard2184/Evaluacion-PYMEs**

2. Abre el archivo: **evaluacion-script.js**

3. En la **línea 8**, reemplaza la URL:

```javascript
// ANTES:
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxV6oR9z1Px-YnlbZXR-rJ04Kz-6g7A6DLMDGwg9E460EGuBnS2X5TEcScXtXN0zCrVqA/exec';

// DESPUÉS (pega TU URL del paso 5):
const GOOGLE_SCRIPT_URL = 'TU_URL_AQUI';
```

4. **Guarda el archivo** (Commit changes)

5. Espera 1-2 minutos para que GitHub Pages se actualice

---

## ✅ Verificar que Funciona

1. Abre tu herramienta: **https://eduard2184.github.io/Evaluacion-PYMEs/**

2. Completa una evaluación de prueba

3. Verifica que aparezca en tu hoja de Google Sheets

4. **¡Listo!** Ahora todos los datos se guardarán automáticamente

---

## 🔒 Seguridad y Privacidad

- Los datos se guardan en tu cuenta de Google (solo tú tienes acceso)
- Puedes descargar los datos en cualquier momento (Archivo → Descargar → CSV)
- Puedes eliminar datos individuales cuando lo desees
- Cumple con GDPR/RGPD

---

## 📊 Analizar los Datos

Tu hoja de cálculo te permitirá:

- Ver todas las evaluaciones realizadas
- Filtrar por sector, tamaño de empresa, ciudad
- Crear gráficos y reportes
- Exportar a Excel o PDF
- Compartir con tu equipo

---

## 🆘 Solución de Problemas

### Error: "No se pudo guardar"
**Solución:** Verifica que la URL del script sea correcta

### Error: "Unauthorized"
**Solución:** Vuelve a autorizar el script (Paso 4)

### Los datos no aparecen en la hoja
**Solución:**
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Network"
3. Completa una evaluación
4. Verifica si hay errores en la petición al script

---

**¿Necesitas ayuda con algún paso?** Avísame y te guío detalladamente. 🚀
