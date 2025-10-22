# ===================================================
# Script de Deployment Automático - FojaDigitalAE
# Herramienta de Evaluación de Madurez Empresarial
# ===================================================

# Configuración de colores
$Host.UI.RawUI.BackgroundColor = "Black"
$Host.UI.RawUI.ForegroundColor = "White"
Clear-Host

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   DEPLOYMENT AUTOMATICO" -ForegroundColor Cyan
Write-Host "   FojaDigitalAE - Herramienta PYMES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Variables de configuración
$baseDir = "C:\Users\13176397\Downloads\forjadigitalae"
$sourceRepo = "mslearn-tailspin-spacegame-web"
$targetRepo = "FojaDigitalAE"
$branch = "claude/github-project-setup-011CUNcZc1fRe11wn564GgcZ"
$githubUser = "Eduard2184"

# Función para mostrar progreso
function Show-Progress {
    param([string]$message, [string]$color = "Yellow")
    Write-Host "⏳ $message" -ForegroundColor $color
}

function Show-Success {
    param([string]$message)
    Write-Host "✅ $message" -ForegroundColor Green
}

function Show-Error {
    param([string]$message)
    Write-Host "❌ ERROR: $message" -ForegroundColor Red
}

# Verificar Git instalado
try {
    $gitVersion = git --version
    Show-Success "Git detectado: $gitVersion"
} catch {
    Show-Error "Git no está instalado. Por favor instala Git desde: https://git-scm.com/download/win"
    exit 1
}

Write-Host ""

# 1. Crear directorio base si no existe
Show-Progress "Verificando directorio de trabajo..."
if (!(Test-Path $baseDir)) {
    New-Item -ItemType Directory -Path $baseDir -Force | Out-Null
    Show-Success "Directorio creado: $baseDir"
} else {
    Show-Success "Directorio encontrado: $baseDir"
}

Set-Location $baseDir

# 2. Clonar o actualizar repositorio fuente
Write-Host ""
Show-Progress "Descargando archivos del proyecto..."

if (Test-Path $sourceRepo) {
    Set-Location $sourceRepo
    Show-Progress "Actualizando repositorio fuente..."
    git fetch --all
    git checkout $branch 2>$null
    if ($LASTEXITCODE -ne 0) {
        Show-Error "No se pudo cambiar a la rama $branch"
        Set-Location ..
        exit 1
    }
    git pull origin $branch
    Show-Success "Repositorio fuente actualizado"
    Set-Location ..
} else {
    Show-Progress "Clonando repositorio fuente..."
    git clone "https://github.com/$githubUser/$sourceRepo.git" 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Show-Error "No se pudo clonar el repositorio fuente"
        exit 1
    }
    Set-Location $sourceRepo
    git checkout $branch 2>$null
    Set-Location ..
    Show-Success "Repositorio fuente clonado"
}

# Verificar que existan los archivos
$sourcePath = Join-Path $baseDir "$sourceRepo\herramienta-evaluacion-pymes"
if (!(Test-Path $sourcePath)) {
    Show-Error "No se encontró la carpeta herramienta-evaluacion-pymes en el repositorio fuente"
    exit 1
}

$files = Get-ChildItem -Path $sourcePath
if ($files.Count -eq 0) {
    Show-Error "La carpeta herramienta-evaluacion-pymes está vacía"
    exit 1
}

Show-Success "Archivos encontrados: $($files.Count) archivos"
Write-Host ""
Write-Host "Archivos a copiar:" -ForegroundColor Cyan
foreach ($file in $files) {
    $size = if ($file.Length -lt 1KB) { "{0:N2} B" -f $file.Length }
            elseif ($file.Length -lt 1MB) { "{0:N2} KB" -f ($file.Length / 1KB) }
            else { "{0:N2} MB" -f ($file.Length / 1MB) }
    Write-Host "  📄 $($file.Name) ($size)" -ForegroundColor Gray
}

# 3. Clonar o actualizar repositorio destino
Write-Host ""
Show-Progress "Preparando repositorio destino FojaDigitalAE..."

if (Test-Path $targetRepo) {
    Set-Location $targetRepo
    Show-Progress "Actualizando repositorio destino..."
    git pull origin main 2>$null
    Set-Location ..
    Show-Success "Repositorio destino actualizado"
} else {
    Show-Progress "Clonando repositorio destino..."
    git clone "https://github.com/$githubUser/$targetRepo.git" 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Show-Error "No se pudo clonar el repositorio destino. Verifica que existe en GitHub."
        Write-Host "URL: https://github.com/$githubUser/$targetRepo" -ForegroundColor Yellow
        exit 1
    }
    Show-Success "Repositorio destino clonado"
}

# 4. Copiar archivos
Write-Host ""
Show-Progress "Copiando archivos al repositorio destino..."

$source = Join-Path $baseDir "$sourceRepo\herramienta-evaluacion-pymes\*"
$destination = Join-Path $baseDir $targetRepo

try {
    Copy-Item -Path $source -Destination $destination -Recurse -Force
    Show-Success "Archivos copiados exitosamente"
} catch {
    Show-Error "Error al copiar archivos: $_"
    exit 1
}

# 5. Verificar archivos copiados
$copiedFiles = Get-ChildItem -Path $destination -File
Write-Host ""
Write-Host "Archivos en repositorio destino:" -ForegroundColor Cyan
foreach ($file in $copiedFiles) {
    Write-Host "  ✓ $($file.Name)" -ForegroundColor Green
}

# 6. Commit y push
Write-Host ""
Show-Progress "Preparando commit..."

Set-Location $targetRepo

# Agregar todos los archivos
git add . 2>&1 | Out-Null

# Verificar si hay cambios
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host ""
    Show-Success "No hay cambios nuevos para subir. Los archivos ya están actualizados en GitHub."
    Set-Location $baseDir
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "   DEPLOYMENT COMPLETADO" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🌐 Tu herramienta está disponible en:" -ForegroundColor Cyan
    Write-Host "   https://eduard2184.github.io/FojaDigitalAE/evaluacion.html" -ForegroundColor White
    Write-Host ""
    exit 0
}

# Crear commit
$commitMessage = @"
Add: Herramienta de Evaluación de Madurez Empresarial para PYMEs

Implementación completa de la plataforma web de evaluación de madurez empresarial.

Características:
- Landing page profesional con diseño responsive
- Sistema de evaluación con 10 dimensiones y 50 preguntas
- Formulario de registro completo
- Visualización de resultados con gráficos (Chart.js)
- Generación de reportes PDF
- Integración con Google Sheets
- Cumplimiento GDPR/RGPD

Archivos incluidos:
- evaluacion.html (42 KB)
- evaluacion-script.js (44 KB)
- evaluacion-styles.css (32 KB)
- README.md (9 KB)
- DEPLOY.md (Guía de deployment)

🤖 Deployed with automated script
"@

git commit -m $commitMessage 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Show-Error "Error al crear commit"
    Set-Location $baseDir
    exit 1
}
Show-Success "Commit creado"

# Push a GitHub
Write-Host ""
Show-Progress "Subiendo archivos a GitHub..."
Write-Host ""
Write-Host "⚠️  Si se te solicita autenticación, ingresa tus credenciales de GitHub" -ForegroundColor Yellow
Write-Host "    Usuario: $githubUser" -ForegroundColor Gray
Write-Host "    Token: (usa tu Personal Access Token)" -ForegroundColor Gray
Write-Host ""

git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Show-Error "Error al hacer push a GitHub"
    Write-Host ""
    Write-Host "Posibles soluciones:" -ForegroundColor Yellow
    Write-Host "1. Verifica tu conexión a Internet" -ForegroundColor Gray
    Write-Host "2. Asegúrate de tener permisos en el repositorio" -ForegroundColor Gray
    Write-Host "3. Configura tus credenciales de Git:" -ForegroundColor Gray
    Write-Host "   git config --global credential.helper store" -ForegroundColor Cyan
    Write-Host "4. Crea un Personal Access Token en:" -ForegroundColor Gray
    Write-Host "   https://github.com/settings/tokens" -ForegroundColor Cyan
    Write-Host ""
    Set-Location $baseDir
    exit 1
}

Show-Success "Archivos subidos exitosamente a GitHub"

# Volver al directorio base
Set-Location $baseDir

# Mensaje final
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ¡DEPLOYMENT EXITOSO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Todos los archivos han sido subidos a:" -ForegroundColor Green
Write-Host "   https://github.com/$githubUser/$targetRepo" -ForegroundColor White
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Activa GitHub Pages:" -ForegroundColor Cyan
Write-Host "   • Ve a: https://github.com/$githubUser/$targetRepo/settings/pages" -ForegroundColor Gray
Write-Host "   • Source: main branch / root folder" -ForegroundColor Gray
Write-Host "   • Guarda los cambios" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Espera 1-2 minutos para que se publique" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Tu herramienta estará disponible en:" -ForegroundColor Cyan
Write-Host "   https://eduard2184.github.io/FojaDigitalAE/evaluacion.html" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Pregunta si quiere abrir GitHub
Write-Host "¿Deseas abrir el repositorio en GitHub ahora? (S/N): " -ForegroundColor Yellow -NoNewline
$response = Read-Host

if ($response -eq "S" -or $response -eq "s") {
    Start-Process "https://github.com/$githubUser/$targetRepo"
    Show-Success "Abriendo GitHub en tu navegador..."
}

Write-Host ""
Write-Host "¡Gracias por usar ForjaDigitalAE! 🚀" -ForegroundColor Cyan
Write-Host ""
