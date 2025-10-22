# 🚀 Guía de Deployment a GitHub

## Repositorio Destino
**https://github.com/Eduard2184/FojaDigitalAE**

---

## ✅ OPCIÓN 1: Deployment Automático (Recomendado)

### Requisitos
- Git instalado en tu máquina
- Acceso al repositorio de GitHub

### Pasos:

1. **Descarga los archivos del proyecto**

   Clona este repositorio en tu máquina:
   ```bash
   cd C:\Users\13176397\Downloads\forjadigitalae
   git clone https://github.com/Eduard2184/mslearn-tailspin-spacegame-web.git
   cd mslearn-tailspin-spacegame-web
   git checkout claude/github-project-setup-011CUNcZc1fRe11wn564GgcZ
   ```

2. **Copia los archivos a una carpeta temporal**
   ```bash
   cd C:\Users\13176397\Downloads\forjadigitalae
   mkdir deployment-temp
   xcopy "mslearn-tailspin-spacegame-web\herramienta-evaluacion-pymes\*" "deployment-temp\" /E /I /Y
   cd deployment-temp
   ```

3. **Clona el repositorio FojaDigitalAE**
   ```bash
   cd C:\Users\13176397\Downloads\forjadigitalae
   git clone https://github.com/Eduard2184/FojaDigitalAE.git
   cd FojaDigitalAE
   ```

4. **Copia los archivos al repositorio**
   ```bash
   xcopy "..\deployment-temp\*" . /E /I /Y
   ```

5. **Sube los archivos a GitHub**
   ```bash
   git add .
   git commit -m "Add: Herramienta de Evaluación de Madurez Empresarial para PYMEs"
   git push origin main
   ```

---

## ✅ OPCIÓN 2: Deployment Manual (Interfaz GitHub)

### Pasos:

1. **Descarga los archivos**

   Los archivos están en:
   ```
   C:\Users\13176397\Downloads\forjadigitalae\mslearn-tailspin-spacegame-web\herramienta-evaluacion-pymes\
   ```

   O descárgalos desde:
   https://github.com/Eduard2184/mslearn-tailspin-spacegame-web/tree/claude/github-project-setup-011CUNcZc1fRe11wn564GgcZ/herramienta-evaluacion-pymes

2. **Ve al repositorio en GitHub**

   Abre: https://github.com/Eduard2184/FojaDigitalAE

3. **Sube los archivos**

   - Clic en **"Add file"** → **"Upload files"**
   - Arrastra los 4 archivos:
     - `evaluacion.html`
     - `evaluacion-script.js`
     - `evaluacion-styles.css`
     - `README.md`
   - En el campo de commit, escribe:
     ```
     Add: Herramienta de Evaluación de Madurez Empresarial
     ```
   - Clic en **"Commit changes"**

---

## ✅ OPCIÓN 3: Script PowerShell Automatizado

Guarda este script como `deploy.ps1`:

```powershell
# Script de Deployment para FojaDigitalAE
Write-Host "🚀 Iniciando deployment..." -ForegroundColor Green

# Variables
$baseDir = "C:\Users\13176397\Downloads\forjadigitalae"
$sourceRepo = "mslearn-tailspin-spacegame-web"
$targetRepo = "FojaDigitalAE"
$branch = "claude/github-project-setup-011CUNcZc1fRe11wn564GgcZ"

# 1. Verificar que existe el directorio
if (!(Test-Path $baseDir)) {
    New-Item -ItemType Directory -Path $baseDir
}

Set-Location $baseDir

# 2. Clonar o actualizar repo fuente
Write-Host "📥 Descargando archivos fuente..." -ForegroundColor Yellow
if (Test-Path $sourceRepo) {
    Set-Location $sourceRepo
    git pull
    git checkout $branch
    Set-Location ..
} else {
    git clone https://github.com/Eduard2184/$sourceRepo.git
    Set-Location $sourceRepo
    git checkout $branch
    Set-Location ..
}

# 3. Clonar o actualizar repo destino
Write-Host "📦 Preparando repositorio destino..." -ForegroundColor Yellow
if (Test-Path $targetRepo) {
    Set-Location $targetRepo
    git pull
    Set-Location ..
} else {
    git clone https://github.com/Eduard2184/$targetRepo.git
}

# 4. Copiar archivos
Write-Host "📋 Copiando archivos..." -ForegroundColor Yellow
$source = Join-Path $baseDir "$sourceRepo\herramienta-evaluacion-pymes\*"
$destination = Join-Path $baseDir $targetRepo

Copy-Item -Path $source -Destination $destination -Recurse -Force

# 5. Commit y push
Write-Host "☁️ Subiendo a GitHub..." -ForegroundColor Yellow
Set-Location $targetRepo

git add .
git commit -m "Add: Herramienta de Evaluación de Madurez Empresarial para PYMEs

Implementación completa de la plataforma web de evaluación de madurez empresarial.

Características:
- Landing page profesional con diseño responsive
- Sistema de evaluación con 10 dimensiones y 50 preguntas
- Formulario de registro completo
- Visualización de resultados con gráficos
- Generación de reportes PDF
- Integración con Google Sheets

Archivos incluidos:
- evaluacion.html (42 KB)
- evaluacion-script.js (44 KB)
- evaluacion-styles.css (32 KB)
- README.md (9 KB)
"

git push origin main

Write-Host "✅ ¡Deployment completado!" -ForegroundColor Green
Write-Host "🌐 Tu sitio estará disponible en:" -ForegroundColor Cyan
Write-Host "   https://eduard2184.github.io/FojaDigitalAE/evaluacion.html" -ForegroundColor Cyan

Set-Location $baseDir
```

**Ejecución:**
```powershell
# Abre PowerShell como Administrador
cd C:\Users\13176397\Downloads\forjadigitalae
.\deploy.ps1
```

---

## 🔧 Configurar GitHub Pages

Después de subir los archivos:

1. Ve a: https://github.com/Eduard2184/FojaDigitalAE/settings/pages

2. En **"Source"**:
   - Branch: `main`
   - Folder: `/ (root)`
   - Clic en **"Save"**

3. Espera 1-2 minutos

4. Tu herramienta estará disponible en:
   ```
   https://eduard2184.github.io/FojaDigitalAE/evaluacion.html
   ```

---

## ❓ Solución de Problemas

### Error: "Permission denied"
**Solución:** Configura tu token de GitHub:
```bash
git config --global credential.helper store
git push origin main
# Te pedirá usuario y token
```

### Error: "Repository not found"
**Solución:** Verifica que el repositorio existe en:
https://github.com/Eduard2184/FojaDigitalAE

### Los archivos no se ven en GitHub
**Solución:**
1. Refresca la página (Ctrl + F5)
2. Verifica que hiciste `git push`
3. Revisa que estás en la rama correcta (`main`)

---

## 📞 Contacto

Si tienes problemas, revisa:
- Los logs de Git en la consola
- Que tienes permisos de escritura en el repositorio
- Que tu usuario de Git está configurado

```bash
git config --global user.name "Eduard2184"
git config --global user.email "tu-email@example.com"
```

---

**¡Éxito con el deployment!** 🚀
