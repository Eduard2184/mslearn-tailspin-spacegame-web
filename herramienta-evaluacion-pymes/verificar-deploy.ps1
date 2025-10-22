# ===================================================
# Script de Verificación - Evaluacion PYMEs
# Verifica que todo esté correctamente desplegado
# ===================================================

Clear-Host
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   VERIFICADOR DE DEPLOYMENT" -ForegroundColor Cyan
Write-Host "   Evaluacion-PYMEs GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Variables
$repoOwner = "Eduard2184"
$repoName = "Evaluacion-PYMEs"
$sitioWeb = "https://$repoOwner.github.io/$repoName/"
$apiUrl = "https://api.github.com/repos/$repoOwner/$repoName"

Write-Host "🔍 Verificando repositorio: $repoOwner/$repoName" -ForegroundColor Yellow
Write-Host ""

# Función para verificar
function Test-URL {
    param([string]$url)
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        return $response.StatusCode -eq 200
    } catch {
        return $false
    }
}

# 1. Verificar que el repositorio exista
Write-Host "1️⃣ Verificando repositorio en GitHub..." -NoNewline
try {
    $repo = Invoke-RestMethod -Uri $apiUrl -ErrorAction Stop
    Write-Host " ✅ EXISTE" -ForegroundColor Green
    Write-Host "   - Nombre: $($repo.name)" -ForegroundColor Gray
    Write-Host "   - Descripción: $($repo.description)" -ForegroundColor Gray
    Write-Host "   - URL: $($repo.html_url)" -ForegroundColor Gray
    Write-Host "   - Público: $(if($repo.private){'No'}else{'Sí'})" -ForegroundColor Gray
} catch {
    Write-Host " ❌ NO EXISTE o NO ES PÚBLICO" -ForegroundColor Red
    Write-Host "   Verifica en: https://github.com/$repoOwner/$repoName" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# 2. Verificar archivos en el repositorio
Write-Host "2️⃣ Verificando archivos del proyecto..." -ForegroundColor Yellow
$archivosRequeridos = @(
    "evaluacion.html",
    "evaluacion-script.js",
    "evaluacion-styles.css",
    "README.md"
)

$archivosEncontrados = @()
$archivosFaltantes = @()

foreach ($archivo in $archivosRequeridos) {
    $fileUrl = "https://api.github.com/repos/$repoOwner/$repoName/contents/$archivo"
    try {
        $fileInfo = Invoke-RestMethod -Uri $fileUrl -ErrorAction Stop
        Write-Host "   ✅ $archivo" -ForegroundColor Green
        Write-Host "      Tamaño: $([math]::Round($fileInfo.size/1024, 2)) KB" -ForegroundColor Gray
        $archivosEncontrados += $archivo
    } catch {
        Write-Host "   ❌ $archivo - NO ENCONTRADO" -ForegroundColor Red
        $archivosFaltantes += $archivo
    }
}
Write-Host ""

# 3. Verificar GitHub Pages
Write-Host "3️⃣ Verificando GitHub Pages..." -NoNewline
$pagesUrl = "https://api.github.com/repos/$repoOwner/$repoName/pages"
try {
    $pages = Invoke-RestMethod -Uri $pagesUrl -ErrorAction Stop
    Write-Host " ✅ ACTIVO" -ForegroundColor Green
    Write-Host "   - URL: $($pages.html_url)" -ForegroundColor Gray
    Write-Host "   - Status: $($pages.status)" -ForegroundColor Gray
} catch {
    Write-Host " ⚠️ NO CONFIGURADO" -ForegroundColor Yellow
    Write-Host "   Configura en: https://github.com/$repoOwner/$repoName/settings/pages" -ForegroundColor Yellow
}
Write-Host ""

# 4. Verificar que el sitio cargue
Write-Host "4️⃣ Verificando sitio web..." -NoNewline
if (Test-URL $sitioWeb) {
    Write-Host " ✅ CARGA CORRECTAMENTE" -ForegroundColor Green
    Write-Host "   - URL: $sitioWeb" -ForegroundColor Gray

    # Verificar archivos específicos
    Write-Host ""
    Write-Host "   Verificando archivos en el sitio:" -ForegroundColor Cyan
    foreach ($archivo in $archivosEncontrados) {
        $archivoUrl = "$sitioWeb$archivo"
        $carga = Test-URL $archivoUrl
        if ($carga) {
            Write-Host "   ✅ $archivo" -ForegroundColor Green
        } else {
            Write-Host "   ❌ $archivo - NO ACCESIBLE" -ForegroundColor Red
        }
    }
} else {
    Write-Host " ❌ NO CARGA" -ForegroundColor Red
    Write-Host "   Posibles causas:" -ForegroundColor Yellow
    Write-Host "   - GitHub Pages no está activo" -ForegroundColor Gray
    Write-Host "   - Archivos no están en la carpeta correcta" -ForegroundColor Gray
    Write-Host "   - Esperando propagación (puede tomar 1-3 minutos)" -ForegroundColor Gray
}
Write-Host ""

# 5. Verificar contenido del HTML
Write-Host "5️⃣ Analizando contenido..." -ForegroundColor Yellow
try {
    $htmlContent = Invoke-WebRequest -Uri "$sitioWeb/evaluacion.html" -UseBasicParsing -ErrorAction Stop
    $html = $htmlContent.Content

    # Verificar elementos clave
    $checks = @{
        "ForjaDigitalAE" = $html -match "ForjaDigitalAE"
        "Chart.js" = $html -match "Chart.js"
        "jsPDF" = $html -match "jspdf"
        "evaluacion-styles.css" = $html -match "evaluacion-styles.css"
        "evaluacion-script.js" = $html -match "evaluacion-script.js"
    }

    foreach ($check in $checks.GetEnumerator()) {
        if ($check.Value) {
            Write-Host "   ✅ $($check.Key)" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️ $($check.Key) - NO ENCONTRADO" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "   ⚠️ No se pudo analizar el contenido" -ForegroundColor Yellow
}
Write-Host ""

# RESUMEN
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   RESUMEN DE VERIFICACIÓN" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$totalArchivos = $archivosRequeridos.Count
$archivosOK = $archivosEncontrados.Count
$porcentaje = [math]::Round(($archivosOK / $totalArchivos) * 100)

Write-Host "📊 Archivos: $archivosOK/$totalArchivos ($porcentaje%)" -ForegroundColor $(if($porcentaje -eq 100){"Green"}else{"Yellow"})

if ($archivosFaltantes.Count -gt 0) {
    Write-Host ""
    Write-Host "❌ Archivos faltantes:" -ForegroundColor Red
    foreach ($faltante in $archivosFaltantes) {
        Write-Host "   - $faltante" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "🌐 Sitio Web:" -ForegroundColor Cyan
if (Test-URL $sitioWeb) {
    Write-Host "   ✅ FUNCIONANDO" -ForegroundColor Green
    Write-Host "   🔗 $sitioWeb" -ForegroundColor White
} else {
    Write-Host "   ❌ NO DISPONIBLE" -ForegroundColor Red
    Write-Host "   Verifica: https://github.com/$repoOwner/$repoName/settings/pages" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Preguntar si quiere abrir el sitio
Write-Host "¿Deseas abrir el sitio web ahora? (S/N): " -ForegroundColor Yellow -NoNewline
$response = Read-Host

if ($response -eq "S" -or $response -eq "s") {
    Start-Process $sitioWeb
    Write-Host "✅ Abriendo sitio en tu navegador..." -ForegroundColor Green
}

Write-Host ""
Write-Host "Verificación completada. ¡Gracias por usar ForjaDigitalAE! 🚀" -ForegroundColor Cyan
Write-Host ""
