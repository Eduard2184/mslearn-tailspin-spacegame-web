/* ================================
   FORJADIGITALAE - EVALUACIÓN JS
   Versión Optimizada y Modular
   ================================ */

// ===== CONFIGURACIÓN GLOBAL =====
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxV6oR9z1Px-YnlbZXR-rJ04Kz-6g7A6DLMDGwg9E460EGuBnS2X5TEcScXtXN0zCrVqA/exec';

// ===== ESTADO DE LA APLICACIÓN =====
let appState = {
    currentSection: 'landing',
    companyData: {},
    evaluationData: {
        currentCategory: 0,
        currentQuestion: 0,
        answers: {},
        categoryScores: {}
    },
    consent: {
        essential: true,
        communications: false,
        benchmarking: false
    }
};

// ===== CATEGORÍAS DE EVALUACIÓN =====
const categories = [
    {
        id: 'vision_estrategia',
        name: 'Visión y Estrategia',
        icon: '🎯',
        weight: 0.10,
        description: 'Se evalúa si la empresa tiene una visión clara a largo plazo y una estrategia bien definida para alcanzarla.',
        questions: [
            { id: 've_01', text: '¿La empresa tiene una visión a largo plazo, formalmente documentada y comunicada a todo el equipo?', tooltip: 'La visión debe ser un documento escrito, conocido y entendido por todos.', weight: 1.2 },
            { id: 've_02', text: '¿Existe un plan estratégico claro que detalle los objetivos, metas y acciones para los próximos 3-5 años?', tooltip: 'El plan debe incluir KPIs para medir el progreso.', weight: 1.2 },
            { id: 've_03', text: '¿La estrategia de la empresa considera activamente las tendencias del mercado y el entorno competitivo?', tooltip: 'Se deben realizar análisis periódicos del mercado.', weight: 1.0 },
            { id: 've_04', text: '¿Los objetivos de los departamentos y empleados están claramente alineados con la estrategia general?', tooltip: 'La estrategia debe desglosarse en objetivos específicos para cada área.', weight: 1.1 },
            { id: 've_05', text: '¿Se asignan recursos de manera coherente con las prioridades estratégicas?', tooltip: 'El presupuesto debe reflejar las prioridades estratégicas.', weight: 1.1 }
        ]
    },
    {
        id: 'gobierno_empresarial',
        name: 'Gobierno Empresarial',
        icon: '🏛️',
        weight: 0.10,
        description: 'Analiza la solidez de las estructuras de toma de decisiones y los procesos de control.',
        questions: [
            { id: 'ge_01', text: '¿Existen roles y responsabilidades claramente definidos para los líderes?', tooltip: 'Debe haber un organigrama claro.', weight: 1.2 },
            { id: 'ge_02', text: '¿La empresa cuenta con políticas y procedimientos internos documentados?', tooltip: 'Las políticas escritas garantizan consistencia.', weight: 1.1 },
            { id: 'ge_03', text: '¿Se realizan reuniones de seguimiento periódicas para revisar el desempeño?', tooltip: 'Deben existir comités estructurados.', weight: 1.0 },
            { id: 'ge_04', text: '¿Existe un proceso formal para la gestión de riesgos?', tooltip: 'La gestión de riesgos debe ser proactiva.', weight: 1.2 },
            { id: 'ge_05', text: '¿Hay mecanismos de control interno y auditoría?', tooltip: 'Se deben realizar auditorías periódicas.', weight: 1.0 }
        ]
    },
    {
        id: 'procesos_operaciones',
        name: 'Procesos y Operaciones',
        icon: '⚙️',
        weight: 0.10,
        description: 'Mide la eficiencia y estandarización de los flujos de trabajo clave.',
        questions: [
            { id: 'po_01', text: '¿Los procesos clave del negocio están documentados y estandarizados?', tooltip: 'Procesos mapeados permiten operación consistente.', weight: 1.2 },
            { id: 'po_02', text: '¿Se utilizan herramientas tecnológicas para automatizar tareas repetitivas?', tooltip: 'La automatización libera tiempo del personal.', weight: 1.1 },
            { id: 'po_03', text: '¿Se miden y monitorean regularmente los indicadores de rendimiento de los procesos?', tooltip: 'Lo que no se mide no se puede mejorar.', weight: 1.1 },
            { id: 'po_04', text: '¿Existe una cultura de mejora continua?', tooltip: 'Los equipos deben buscar formas de optimizar.', weight: 1.0 },
            { id: 'po_05', text: '¿Los diferentes sistemas están integrados?', tooltip: 'Los sistemas deben "hablar" entre sí.', weight: 1.2 }
        ]
    },
    {
        id: 'talento_cultura',
        name: 'Gestión de Talento',
        icon: '👥',
        weight: 0.10,
        description: 'Evalúa si la cultura fomenta la colaboración y el desarrollo continuo.',
        questions: [
            { id: 'tc_01', text: '¿La empresa tiene un proceso estructurado para atraer y retener talento?', tooltip: 'Incluye planes de carrera y beneficios.', weight: 1.1 },
            { id: 'tc_02', text: '¿Se invierte en programas de capacitación y desarrollo?', tooltip: 'El desarrollo de competencias es clave.', weight: 1.2 },
            { id: 'tc_03', text: '¿La cultura organizacional promueve la colaboración?', tooltip: 'Una cultura saludable fomenta el trabajo en equipo.', weight: 1.0 },
            { id: 'tc_04', text: '¿Se realizan evaluaciones de desempeño periódicas?', tooltip: 'Las evaluaciones deben alinearse con objetivos.', weight: 1.0 },
            { id: 'tc_05', text: '¿El liderazgo inspira y modela los valores deseados?', tooltip: 'Los líderes son el motor de la cultura.', weight: 1.3 }
        ]
    },
    {
        id: 'innovacion_agilidad',
        name: 'Innovación y Agilidad',
        icon: '💡',
        weight: 0.10,
        description: 'Analiza la capacidad de adaptarse rápidamente a los cambios del mercado.',
        questions: [
            { id: 'ia_01', text: '¿La empresa dedica tiempo y recursos para explorar nuevas ideas?', tooltip: 'La innovación requiere inversión intencional.', weight: 1.2 },
            { id: 'ia_02', text: '¿Se fomenta la experimentación y se aceptan los fracasos?', tooltip: 'Una cultura que castiga el error inhibe innovación.', weight: 1.1 },
            { id: 'ia_03', text: '¿La empresa es capaz de tomar decisiones y ajustar su rumbo rápidamente?', tooltip: 'La agilidad evita burocracia excesiva.', weight: 1.1 },
            { id: 'ia_04', text: '¿Se monitorean activamente las tecnologías emergentes?', tooltip: 'Tener un "radar" tecnológico es vital.', weight: 1.0 },
            { id: 'ia_05', text: '¿Se colabora con clientes o proveedores para co-crear?', tooltip: 'Las alianzas aceleran la innovación.', weight: 1.0 }
        ]
    },
    {
        id: 'estrategia_tecnologica',
        name: 'Estrategia Tecnológica',
        icon: '💻',
        weight: 0.10,
        description: 'Evalúa si la tecnología está alineada con los objetivos y es escalable.',
        questions: [
            { id: 'et_01', text: '¿La infraestructura tecnológica actual soporta las necesidades del negocio?', tooltip: 'La tecnología debe ser un habilitador.', weight: 1.1 },
            { id: 'et_02', text: '¿Existe un roadmap tecnológico que guíe las inversiones?', tooltip: 'Las decisiones tecnológicas no deben ser improvisadas.', weight: 1.2 },
            { id: 'et_03', text: '¿La arquitectura tecnológica es escalable?', tooltip: 'Los sistemas deben poder crecer.', weight: 1.1 },
            { id: 'et_04', text: '¿Se cuenta con políticas robustas de ciberseguridad?', tooltip: 'Incluye antivirus, firewalls y capacitación.', weight: 1.3 },
            { id: 'et_05', text: '¿Se evalúa el ROI de las iniciativas tecnológicas?', tooltip: 'La tecnología es una inversión medible.', weight: 1.0 }
        ]
    },
    {
        id: 'inteligencia_negocio',
        name: 'Inteligencia de Negocio',
        icon: '📊',
        weight: 0.10,
        description: 'Examina cómo la empresa utiliza datos para tomar decisiones.',
        questions: [
            { id: 'in_01', text: '¿La empresa recopila sistemáticamente datos de operaciones y clientes?', tooltip: 'Procesos definidos para capturar datos.', weight: 1.1 },
            { id: 'in_02', text: '¿Los datos se almacenan de forma centralizada y organizada?', tooltip: 'Una "única fuente de verdad" es crucial.', weight: 1.2 },
            { id: 'in_03', text: '¿Se utilizan herramientas de visualización de datos?', tooltip: 'Dashboards muestran rendimiento en tiempo real.', weight: 1.1 },
            { id: 'in_04', text: '¿Las decisiones se respaldan con análisis de datos?', tooltip: 'Cultura de decisiones basadas en evidencia.', weight: 1.3 },
            { id: 'in_05', text: '¿El personal tiene habilidades básicas para interpretar datos?', tooltip: 'Alfabetización de datos es esencial.', weight: 1.0 }
        ]
    },
    {
        id: 'experiencia_cliente',
        name: 'Experiencia del Cliente',
        icon: '🧡',
        weight: 0.10,
        description: 'Mide la satisfacción del cliente y analiza los puntos de contacto.',
        questions: [
            { id: 'cx_01', text: '¿Se mide de forma sistemática la satisfacción del cliente?', tooltip: 'Método constante para escuchar al cliente.', weight: 1.2 },
            { id: 'cx_02', text: '¿Se han mapeado los "viajes del cliente"?', tooltip: 'Identificar momentos de fricción.', weight: 1.1 },
            { id: 'cx_03', text: '¿Se utiliza la retroalimentación para implementar mejoras?', tooltip: 'Actuar sobre el feedback del cliente.', weight: 1.3 },
            { id: 'cx_04', text: '¿La experiencia es consistente a través de todos los canales?', tooltip: 'Mismo nivel de servicio en todos los puntos.', weight: 1.0 },
            { id: 'cx_05', text: '¿Se personaliza la comunicación para diferentes segmentos?', tooltip: 'Experiencia relevante aumenta lealtad.', weight: 1.0 }
        ]
    },
    {
        id: 'sostenibilidad_responsabilidad',
        name: 'Sostenibilidad',
        icon: '🌍',
        weight: 0.10,
        description: 'Evalúa el compromiso con prácticas de impacto positivo.',
        questions: [
            { id: 'sr_01', text: '¿La empresa tiene una política de sostenibilidad definida?', tooltip: 'Compromiso formal en materia social y ambiental.', weight: 1.1 },
            { id: 'sr_02', text: '¿Se han implementado prácticas para reducir el impacto ambiental?', tooltip: 'Acciones concretas de sostenibilidad.', weight: 1.0 },
            { id: 'sr_03', text: '¿La empresa participa en iniciativas sociales?', tooltip: 'Apoyo a la comunidad local.', weight: 1.0 },
            { id: 'sr_04', text: '¿Se consideran criterios éticos al seleccionar proveedores?', tooltip: 'Responsabilidad en la cadena de suministro.', weight: 1.2 },
            { id: 'sr_05', text: '¿Se comunican de forma transparente las acciones de sostenibilidad?', tooltip: 'Transparencia genera confianza.', weight: 1.1 }
        ]
    },
    {
        id: 'finanzas_rentabilidad',
        name: 'Finanzas',
        icon: '💰',
        weight: 0.10,
        description: 'Analiza la gestión financiera y capacidad de generar rentabilidad.',
        questions: [
            { id: 'fr_01', text: '¿Se elabora un presupuesto anual detallado?', tooltip: 'Presupuesto es herramienta de control fundamental.', weight: 1.2 },
            { id: 'fr_02', text: '¿Se monitorea de cerca el flujo de caja?', tooltip: 'Gestión proactiva del cash flow.', weight: 1.3 },
            { id: 'fr_03', text: '¿Se analizan regularmente los estados financieros?', tooltip: 'Entender rentabilidad para decisiones.', weight: 1.1 },
            { id: 'fr_04', text: '¿Existen políticas claras para la gestión de costos?', tooltip: 'Control de costos constante.', weight: 1.0 },
            { id: 'fr_05', text: '¿La empresa tiene un plan financiero a largo plazo?', tooltip: 'Proyectar necesidades de capital.', weight: 1.1 }
        ]
    }
];

const scaleLabels = [
    'Muy Bajo / No aplica',
    'Bajo / Iniciando',
    'Medio / En desarrollo',
    'Alto / Bien implementado',
    'Muy Alto / Excelente'
];

const scaleColors = ['#AA2F0C', '#EC8E48', '#EE8028', '#4CCED5', '#10b981'];

// ===== FUNCIONES DE UI =====
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
    const currentSection = document.getElementById(sectionId);
    if (currentSection) currentSection.classList.remove('hidden');

    appState.currentSection = sectionId;
    window.scrollTo(0, 0);

    if (sectionId !== 'landing') {
        document.body.style.background = 'var(--primary-50)';
        document.body.classList.add('section-view');
    } else {
        document.body.style.background = 'var(--azul-marino)';
        document.body.classList.remove('section-view');
    }
}

function resetApp() {
    localStorage.removeItem('pymeEvaluationState');
    location.reload();
}

function showConsentModal() {
    document.getElementById('consentModal').classList.remove('hidden');
}

function hideConsentModal() {
    document.getElementById('consentModal').classList.add('hidden');
}

function showPrivacyPolicy() {
    document.getElementById('privacyPolicyModal').classList.remove('hidden');
}

function hidePrivacyPolicy() {
    document.getElementById('privacyPolicyModal').classList.add('hidden');
}

function acceptConsent() {
    appState.consent.communications = document.getElementById('consentCommunications').checked;
    appState.consent.benchmarking = document.getElementById('consentBenchmarking').checked;
    hideConsentModal();
    showSection('registration');
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

function showLoading(message = 'Procesando...') {
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loader-text');
    if (loader && loaderText) {
        loaderText.textContent = message;
        loader.classList.remove('hidden');
    }
}

function hideLoading() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
    }
}

// ===== FUNCIONES DE REGISTRO =====
function handleRegistration(e) {
    e.preventDefault();

    showLoading('Guardando información...');

    // Obtener datos del formulario
    const formData = new FormData(e.target);

    appState.companyData = {
        name: document.getElementById('companyName')?.value || formData.get('companyName'),
        sector: document.getElementById('companySector')?.value || formData.get('sector'),
        size: document.getElementById('companySize')?.value || formData.get('size'),
        years: document.getElementById('companyYears')?.value || formData.get('years'),
        location: document.getElementById('companyLocation')?.value || formData.get('location'),
        city: document.getElementById('companyLocation')?.value?.split(',')[0] || 'N/A',
        website: document.getElementById('companyWebsite')?.value || formData.get('website'),
        contactName: document.getElementById('contactName')?.value || formData.get('contactName'),
        email: document.getElementById('contactEmail')?.value || formData.get('email'),
        phone: document.getElementById('contactPhone')?.value || formData.get('phone'),
        role: document.getElementById('contactRole')?.value || formData.get('role')
    };

    // Validar que al menos los campos críticos estén llenos
    if (!appState.companyData.name || !appState.companyData.email) {
        showToast('Por favor completa los campos obligatorios', 'error');
        hideLoading();
        return;
    }

    setTimeout(() => {
        autoSave();
        hideLoading();
        showToast('✅ Información guardada correctamente', 'success');
        showSection('evaluation');
        initEvaluation();
    }, 1000);
}

// ===== FUNCIONES DE EVALUACIÓN =====
function initEvaluation() {
    appState.evaluationData.currentCategory = 0;
    appState.evaluationData.currentQuestion = 0;
    renderCategoryProgress();
    renderCurrentQuestion();
}

function renderCategoryProgress() {
    const container = document.getElementById('categoryProgress');
    if (!container) return;

    container.innerHTML = categories.map((cat, idx) => {
        const completedQuestions = cat.questions.filter(q =>
            appState.evaluationData.answers[q.id] !== undefined
        ).length;

        const isCompleted = completedQuestions === cat.questions.length;
        const isCurrent = idx === appState.evaluationData.currentCategory;

        return `
            <div class="category-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}">
                <div class="category-icon">${cat.icon}</div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; margin-bottom: 0.25rem;">${cat.name}</div>
                    <div style="font-size: 0.875rem; opacity: 0.7;">
                        ${completedQuestions}/${cat.questions.length} preguntas
                    </div>
                </div>
                ${isCompleted ? '<span style="color: var(--success-500);">✓</span>' : ''}
            </div>
        `;
    }).join('');

    // Actualizar progreso general
    updateOverallProgress();
}

function updateOverallProgress() {
    const totalQuestions = categories.reduce((sum, cat) => sum + cat.questions.length, 0);
    const answeredQuestions = Object.keys(appState.evaluationData.answers).length;
    const percentage = Math.round((answeredQuestions / totalQuestions) * 100);

    const progressPercentage = document.getElementById('progressPercentage');
    const progressText = document.getElementById('progressText');
    const overallProgress = document.getElementById('overallProgress');

    if (progressPercentage) {
        progressPercentage.textContent = `${percentage}%`;
    }

    if (progressText) {
        const completedCategories = categories.filter(cat =>
            cat.questions.every(q => appState.evaluationData.answers[q.id] !== undefined)
        ).length;
        progressText.textContent = `${completedCategories} de ${categories.length} categorías`;
    }

    if (overallProgress) {
        overallProgress.style.setProperty('--score', percentage);
    }
}

function updateGlobalProgress() {
    // Calcular total de preguntas respondidas
    let totalAnswered = 0;
    let totalQuestions = 0;

    categories.forEach(cat => {
        totalQuestions += cat.questions.length;
        cat.questions.forEach(q => {
            if (appState.evaluationData.answers[q.id] !== undefined) {
                totalAnswered++;
            }
        });
    });

    const percentage = Math.round((totalAnswered / totalQuestions) * 100);

    // Actualizar elementos del DOM
    const currentEl = document.getElementById('globalProgressCurrent');
    const totalEl = document.getElementById('globalProgressTotal');
    const percentageEl = document.getElementById('globalProgressPercentage');
    const fillEl = document.getElementById('globalProgressFill');

    if (currentEl) currentEl.textContent = totalAnswered;
    if (totalEl) totalEl.textContent = totalQuestions;
    if (percentageEl) percentageEl.textContent = percentage;

    if (fillEl) {
        // Agregar clase para animación de "bump"
        fillEl.classList.add('progress-bump');
        setTimeout(() => fillEl.classList.remove('progress-bump'), 600);

        // Actualizar ancho con animación
        fillEl.style.width = `${percentage}%`;

        // Celebración al llegar al 100%
        if (percentage === 100) {
            celebrateCompletion();
        }
    }
}

// Función de celebración al completar 100%
function celebrateCompletion() {
    // Crear efecto de confetti (opcional - requiere librería canvas-confetti)
    // Si no quieres instalar librería, comenta esta parte
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    // Mostrar mensaje de felicitación
    showToast('🎉 ¡Felicitaciones! Has completado todas las preguntas', 'success');
}

function renderCurrentQuestion() {
    const category = categories[appState.evaluationData.currentCategory];
    const question = category.questions[appState.evaluationData.currentQuestion];

    // Actualizar información de categoría
    const categoryBadge = document.getElementById('categoryBadge');
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryDescription = document.getElementById('categoryDescription');
    const questionNumber = document.getElementById('questionNumber');
    const questionText = document.getElementById('questionText');
    const tooltipText = document.getElementById('tooltipText');

    if (categoryBadge) {
        categoryBadge.textContent = `${category.icon} ${category.name}`;
    }

    if (categoryTitle) {
        categoryTitle.textContent = category.name;
    }

    if (categoryDescription) {
        categoryDescription.textContent = category.description;
    }

    if (questionNumber) {
        questionNumber.textContent = `Pregunta ${appState.evaluationData.currentQuestion + 1} de ${category.questions.length}`;
    }

    if (questionText) {
        questionText.textContent = question.text;
    }

    if (tooltipText) {
        tooltipText.textContent = question.tooltip;
    }

    // Actualizar barra de progreso de la categoría
    updateCategoryProgressBar();

    // Renderizar opciones de escala
    renderScaleOptionsImproved();

    // Actualizar botones de navegación
    updateNavigationButtons();
}

function updateCategoryProgressBar() {
    const category = categories[appState.evaluationData.currentCategory];
    const progress = ((appState.evaluationData.currentQuestion + 1) / category.questions.length) * 100;
    const progressBar = document.getElementById('categoryProgressBar');

    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

function getCurrentQuestion() {
    const category = categories[appState.evaluationData.currentCategory];
    const question = category.questions[appState.evaluationData.currentQuestion];
    const answer = appState.evaluationData.answers[question.id];
    return { ...question, answer: answer !== undefined ? answer : null };
}

function renderScaleOptionsImproved() {
    const scaleOptionsContainer = document.getElementById('scaleOptions');
    if (!scaleOptionsContainer) return;

    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    // Definir emojis y descripciones para cada nivel
    const optionData = [
        {
            value: 0,
            emoji: '😟',
            label: 'Muy Bajo / No aplica',
            description: 'No existe o no se implementa'
        },
        {
            value: 1,
            emoji: '😐',
            label: 'Bajo / Iniciando',
            description: 'En etapa muy temprana o informal'
        },
        {
            value: 2,
            emoji: '🙂',
            label: 'Medio / En desarrollo',
            description: 'Parcialmente implementado'
        },
        {
            value: 3,
            emoji: '😊',
            label: 'Alto / Bien implementado',
            description: 'Bien establecido y funcional'
        },
        {
            value: 4,
            emoji: '🌟',
            label: 'Muy Alto / Excelente',
            description: 'Optimizado y en mejora continua'
        }
    ];

    // Limpiar contenedor
    scaleOptionsContainer.innerHTML = '';

    // Crear opciones mejoradas
    optionData.forEach(option => {
        const optionCard = document.createElement('div');
        optionCard.className = 'scale-option';
        optionCard.setAttribute('data-value', option.value);

        // Marcar como seleccionada si corresponde
        if (currentQuestion.answer === option.value) {
            optionCard.classList.add('selected');
        }

        optionCard.innerHTML = `
            <div class="option-icon">${option.emoji}</div>
            <div class="option-number">${option.value}</div>
            <div class="option-label">${option.label}</div>
            <div class="option-description">${option.description}</div>
        `;

        // Event listener con animación
        optionCard.addEventListener('click', function() {
            selectOptionImproved(option.value, this);
        });

        scaleOptionsContainer.appendChild(optionCard);
    });
}

// Función mejorada para seleccionar opción
function selectOptionImproved(value, element) {
    const category = categories[appState.evaluationData.currentCategory];
    const question = category.questions[appState.evaluationData.currentQuestion];

    // Guardar respuesta
    appState.evaluationData.answers[question.id] = value;

    // Remover selección anterior
    document.querySelectorAll('.scale-option').forEach(opt => {
        opt.classList.remove('selected');
    });

    // Agregar selección a la nueva opción
    element.classList.add('selected');

    // Mostrar feedback visual
    showFeedbackMessage(value);

    // Habilitar botón siguiente
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.disabled = false;
    }

    // Actualizar progreso global
    updateGlobalProgress();
    updateOverallProgress();

    // Guardar en localStorage
    autoSave();
}

// Función para mostrar mensaje de feedback
function showFeedbackMessage(value) {
    const feedbackContainer = document.getElementById('selectedFeedback');
    const feedbackMessage = document.getElementById('feedbackMessage');

    if (!feedbackContainer || !feedbackMessage) return;

    const messages = {
        0: { text: '😟 Has seleccionado: Muy Bajo / No aplica', color: '#ef4444' },
        1: { text: '😐 Has seleccionado: Bajo / Iniciando', color: '#f97316' },
        2: { text: '🙂 Has seleccionado: Medio / En desarrollo', color: '#eab308' },
        3: { text: '😊 Has seleccionado: Alto / Bien implementado', color: '#3b82f6' },
        4: { text: '🌟 Has seleccionado: Muy Alto / Excelente', color: '#10b981' }
    };

    const message = messages[value];

    feedbackMessage.textContent = message.text;
    feedbackMessage.style.color = message.color;
    feedbackMessage.style.fontWeight = '600';

    feedbackContainer.classList.remove('hidden');

    // Animación de entrada
    feedbackContainer.style.animation = 'none';
    setTimeout(() => {
        feedbackContainer.style.animation = 'slideInUp 0.4s ease';
    }, 10);
}

function updateNavigationButtons() {
    const btnPrev = document.getElementById('prevBtn');
    const btnNext = document.getElementById('nextBtn');

    if (btnPrev) {
        const isFirstQuestion = appState.evaluationData.currentCategory === 0 &&
                               appState.evaluationData.currentQuestion === 0;
        btnPrev.disabled = isFirstQuestion;
        btnPrev.style.opacity = isFirstQuestion ? '0.5' : '1';
        btnPrev.style.cursor = isFirstQuestion ? 'not-allowed' : 'pointer';
    }

    if (btnNext) {
        const category = categories[appState.evaluationData.currentCategory];
        const question = category.questions[appState.evaluationData.currentQuestion];
        const isAnswered = appState.evaluationData.answers[question.id] !== undefined;

        btnNext.disabled = !isAnswered;
        btnNext.style.opacity = isAnswered ? '1' : '0.5';
        btnNext.style.cursor = isAnswered ? 'pointer' : 'not-allowed';

        // Cambiar texto del botón en la última pregunta
        const isLastQuestion = appState.evaluationData.currentCategory === categories.length - 1 &&
                              appState.evaluationData.currentQuestion === category.questions.length - 1;

        if (isLastQuestion) {
            btnNext.innerHTML = '✅ Finalizar Evaluación';
        } else {
            btnNext.innerHTML = 'Siguiente →';
        }
    }
}

function previousQuestion() {
    if (appState.evaluationData.currentQuestion > 0) {
        appState.evaluationData.currentQuestion--;
    } else if (appState.evaluationData.currentCategory > 0) {
        appState.evaluationData.currentCategory--;
        appState.evaluationData.currentQuestion =
            categories[appState.evaluationData.currentCategory].questions.length - 1;
    }

    renderCategoryProgress();
    renderCurrentQuestion();
    autoSave();
    updateGlobalProgress();
}

function nextQuestion() {
    const category = categories[appState.evaluationData.currentCategory];

    if (appState.evaluationData.currentQuestion < category.questions.length - 1) {
        appState.evaluationData.currentQuestion++;
    } else if (appState.evaluationData.currentCategory < categories.length - 1) {
        appState.evaluationData.currentCategory++;
        appState.evaluationData.currentQuestion = 0;
    } else {
        finishEvaluation();
        return;
    }

    renderCategoryProgress();
    renderCurrentQuestion();
    autoSave();
    updateGlobalProgress();
}

// ===== FINALIZACIÓN Y RESULTADOS =====
function finishEvaluation() {
    showLoading('Calculando resultados...');

    setTimeout(() => {
        calculateScores();
        sendDataToGoogleSheets();
        showSection('results');
        renderResults();
        hideLoading();
    }, 1500);
}

function calculateScores() {
    categories.forEach(category => {
        let totalWeightedScore = 0;
        let totalWeight = 0;

        category.questions.forEach(question => {
            const answer = appState.evaluationData.answers[question.id] || 0;
            const normalizedScore = (answer / 4) * 100;
            totalWeightedScore += normalizedScore * question.weight;
            totalWeight += question.weight;
        });

        appState.evaluationData.categoryScores[category.id] =
            Math.round(totalWeightedScore / totalWeight);
    });

    const totalScore = Object.values(appState.evaluationData.categoryScores)
        .reduce((sum, score) => sum + score, 0) / categories.length;

    appState.evaluationData.totalScore = Math.round(totalScore);
    appState.evaluationData.maturityLevel = getMaturityLevel(totalScore);

    autoSave();
}

function getMaturityLevel(score) {
    if (score < 20) return { level: 'Inicial', description: 'Requiere atención urgente' };
    if (score < 40) return { level: 'En Desarrollo', description: 'Grandes oportunidades de mejora' };
    if (score < 60) return { level: 'Intermedio', description: 'Progreso sólido, continuar fortaleciendo' };
    if (score < 80) return { level: 'Avanzado', description: 'Buen nivel, optimizar para excelencia' };
    return { level: 'Líder', description: 'Excelente desempeño' };
}

function renderResults() {
    const totalScore = appState.evaluationData.totalScore || 0;
    const maturityLevel = appState.evaluationData.maturityLevel || { level: 'N/A', description: 'Sin datos' };
    const categoryScores = appState.evaluationData.categoryScores || {};

    // Actualizar score principal
    const finalScoreNumber = document.getElementById('finalScoreNumber');
    const finalScoreCircle = document.getElementById('finalScore');
    const maturityBadge = document.getElementById('maturityBadge');
    const maturityDescription = document.getElementById('maturityDescription');

    if (finalScoreNumber) {
        finalScoreNumber.textContent = totalScore;
    }

    if (finalScoreCircle) {
        finalScoreCircle.style.setProperty('--score', totalScore);
    }

    if (maturityBadge) {
        maturityBadge.textContent = maturityLevel.level;
        maturityBadge.className = 'maturity-badge';
    }

    if (maturityDescription) {
        maturityDescription.textContent = maturityLevel.description;
    }

    // Renderizar gráfico radar
    renderRadarChart();

    // Renderizar resultados detallados
    renderDetailedResults();

    // Renderizar recomendaciones
    renderRecommendations();
}

function renderRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const categoryScores = appState.evaluationData.categoryScores || {};

    // Destruir chart anterior si existe
    if (window.radarChartInstance) {
        window.radarChartInstance.destroy();
    }

    const labels = categories.map(cat => cat.name);
    const data = categories.map(cat => categoryScores[cat.id] || 0);

    window.radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tu Puntuación',
                data: data,
                backgroundColor: 'rgba(133, 96, 192, 0.2)',
                borderColor: 'rgba(133, 96, 192, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(133, 96, 192, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(133, 96, 192, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function renderDetailedResults() {
    const container = document.getElementById('detailedResults');
    if (!container) return;

    const categoryScores = appState.evaluationData.categoryScores || {};

    container.innerHTML = categories.map(cat => {
        const score = categoryScores[cat.id] || 0;
        const scoreColor = getScoreColor(score);
        const scoreDesc = getScoreDescription(score);

        return `
            <div class="category-result-card">
                <div class="category-result-header">
                    <span class="category-result-icon">${cat.icon}</span>
                    <h3 class="category-result-title">${cat.name}</h3>
                    <span class="category-result-score" style="color: ${scoreColor}">${score}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${score}%; background-color: ${scoreColor}"></div>
                </div>
                <p class="category-result-description">${scoreDesc}</p>
            </div>
        `;
    }).join('');
}

function renderRecommendations() {
    const recommendations = generateRecommendations();
    const container = document.getElementById('recommendations');

    container.innerHTML = recommendations.map((rec, idx) => `
        <div class="recommendation-card">
            <div class="recommendation-header">
                <span class="priority-badge">${rec.priority}</span>
                <span class="category-icon">${rec.categoryIcon}</span>
            </div>
            <h3>${rec.title}</h3>
            <p class="recommendation-description">${rec.description}</p>
            <div class="actions-list">
                <h4>Acciones recomendadas:</h4>
                <ul>
                    ${rec.actions.map(action => `<li>${action}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function generateRecommendations() {
    const categoryScores = appState.evaluationData.categoryScores || {};
    const sortedCategories = categories
        .map(cat => ({ ...cat, score: categoryScores[cat.id] || 0 }))
        .sort((a, b) => a.score - b.score)
        .slice(0, 3);

    const recs = {
        'vision_estrategia': {
            title: 'Fortalecer Visión Estratégica',
            description: 'Definir y comunicar un norte claro.',
            priority: 'CRÍTICO',
            actions: ['Documentar visión y estrategia', 'Comunicar a todo el equipo', 'Definir KPIs estratégicos']
        },
        'gobierno_empresarial': {
            title: 'Estructurar Gobierno Corporativo',
            description: 'Establecer roles y controles claros.',
            priority: 'ALTO',
            actions: ['Definir organigrama y roles', 'Documentar políticas clave', 'Establecer comité de dirección']
        },
        'procesos_operaciones': {
            title: 'Optimizar Procesos',
            description: 'Mapear y automatizar flujos clave.',
            priority: 'ALTO',
            actions: ['Mapear 5 procesos principales', 'Identificar cuellos de botella', 'Implementar herramienta BPM']
        },
        'talento_cultura': {
            title: 'Impulsar Talento',
            description: 'Invertir en desarrollo del equipo.',
            priority: 'MEDIO',
            actions: ['Crear plan de capacitación', 'Implementar evaluación de desempeño', 'Fomentar colaboración']
        },
        'innovacion_agilidad': {
            title: 'Fomentar Innovación',
            description: 'Crear entorno de experimentación.',
            priority: 'MEDIO',
            actions: ['Asignar presupuesto para innovación', 'Crear programa de intraemprendimiento', 'Adoptar metodologías ágiles']
        },
        'estrategia_tecnologica': {
            title: 'Definir Estrategia Tecnológica',
            description: 'Alinear tecnología con objetivos.',
            priority: 'ALTO',
            actions: ['Realizar auditoría tecnológica', 'Crear roadmap a 3 años', 'Implementar ciberseguridad']
        },
        'inteligencia_negocio': {
            title: 'Desarrollar Inteligencia de Negocio',
            description: 'Convertir datos en activo estratégico.',
            priority: 'MEDIO',
            actions: ['Implementar herramienta de BI', 'Definir KPIs clave', 'Capacitar en análisis de datos']
        },
        'experiencia_cliente': {
            title: 'Mejorar Experiencia del Cliente',
            description: 'Poner al cliente en el centro.',
            priority: 'ALTO',
            actions: ['Implementar NPS', 'Mapear customer journey', 'Crear protocolo de atención']
        },
        'sostenibilidad_responsabilidad': {
            title: 'Integrar Sostenibilidad',
            description: 'Adoptar prácticas responsables.',
            priority: 'BAJO',
            actions: ['Definir política de RSC', 'Lanzar programa ambiental', 'Establecer alianza social']
        },
        'finanzas_rentabilidad': {
            title: 'Fortalecer Gestión Financiera',
            description: 'Asegurar salud financiera.',
            priority: 'CRÍTICO',
            actions: ['Implementar software financiero', 'Establecer presupuesto mensual', 'Analizar rentabilidad']
        }
    };

    return sortedCategories.map(category => {
        const rec = recs[category.id] || recs['vision_estrategia'];
        return {
            ...rec,
            category: category.name,
            categoryIcon: category.icon,
            score: category.score
        };
    });
}

function getScoreColor(score) {
    if (score <= 20) return '#AA2F0C';
    if (score <= 40) return '#EC8E48';
    if (score <= 60) return '#EE8028';
    if (score <= 80) return '#4CCED5';
    return '#10b981';
}

function getScoreDescription(score) {
    if (score <= 20) return 'Área crítica que requiere atención inmediata';
    if (score <= 40) return 'Oportunidad de mejora significativa';
    if (score <= 60) return 'Progreso intermedio, continuar fortaleciendo';
    if (score <= 80) return 'Buen nivel, optimizar para excelencia';
    return 'Excelente desempeño, mantener liderazgo';
}

// ===== ENVÍO A GOOGLE SHEETS =====
async function sendDataToGoogleSheets() {
    try {
        const payload = {
            timestamp: new Date().toISOString(),
            companyData: appState.companyData,
            evaluationData: {
                totalScore: appState.evaluationData.totalScore,
                maturityLevel: appState.evaluationData.maturityLevel,
                categoryScores: appState.evaluationData.categoryScores,
                answers: appState.evaluationData.answers
            },
            consent: appState.consent
        };

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        console.log('✅ Datos enviados a Google Sheets');
    } catch (error) {
        console.error('❌ Error enviando datos:', error);
    }
}

// ===== FUNCIONES AUXILIARES =====
function autoSave() {
    localStorage.setItem('pymeEvaluationState', JSON.stringify(appState));
}

function loadSavedState() {
    const saved = localStorage.getItem('pymeEvaluationState');
    if (saved) {
        const savedState = JSON.parse(saved);
        savedState.consent = appState.consent;
        appState = { ...appState, ...savedState };
        if (appState.currentSection && appState.currentSection !== 'landing') {
            showSection(appState.currentSection);
            if (appState.currentSection === 'evaluation') {
                renderCategoryProgress();
                renderCurrentQuestion();
            } else if (appState.currentSection === 'results') {
                renderResults();
            }
        }
    }
}

// ===== GENERACIÓN DE PDF =====
async function downloadPDF() {
    showToast('La funcionalidad de PDF está disponible. Puedes implementar la generación usando jsPDF.', 'success');
    hideLoading();
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Botón principal de landing
    const btnEvaluar = document.getElementById('btnStartEvaluation');
    if (btnEvaluar) {
        btnEvaluar.addEventListener('click', showConsentModal);
    }

    // Botones de consentimiento
    const btnAcceptConsent = document.getElementById('btnAcceptConsent');
    if (btnAcceptConsent) {
        btnAcceptConsent.addEventListener('click', acceptConsent);
    }

    const btnCancelConsent = document.getElementById('btnCancelConsent');
    if (btnCancelConsent) {
        btnCancelConsent.addEventListener('click', hideConsentModal);
    }

    // Enlace de política de privacidad
    const privacyLink = document.getElementById('privacyPolicyLink');
    if (privacyLink) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            showPrivacyPolicy();
        });
    }

    const btnClosePrivacy = document.getElementById('btnClosePrivacy');
    if (btnClosePrivacy) {
        btnClosePrivacy.addEventListener('click', hidePrivacyPolicy);
    }

    // Formulario de registro
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }

    // Botones de navegación de evaluación
    const btnPrevQuestion = document.getElementById('prevBtn');
    if (btnPrevQuestion) {
        btnPrevQuestion.addEventListener('click', previousQuestion);
    }

    const btnNextQuestion = document.getElementById('nextBtn');
    if (btnNextQuestion) {
        btnNextQuestion.addEventListener('click', nextQuestion);
    }

    // Botón de descarga PDF
    const btnDownloadPDF = document.getElementById('btnDownloadPDF');
    if (btnDownloadPDF) {
        btnDownloadPDF.addEventListener('click', downloadPDF);
    }

    // Botón de reiniciar
    const btnReset = document.getElementById('btnResetApp');
    if (btnReset) {
        btnReset.addEventListener('click', resetApp);
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando ForjaDigitalAE...');

    showSection('landing');
    loadSavedState();
    initEventListeners();

    console.log('✅ Aplicación lista');
});

// Prevenir errores de recursos externos
window.addEventListener('error', function(e) {
    if (e.message && (e.message.includes('claschadder') || e.message.includes('tracker'))) {
        e.preventDefault();
        return false;
    }
});

console.log('%c🚀 ForjaDigitalAE - Evaluación inicializada correctamente', 'color: #4CCED5; font-size: 16px; font-weight: bold;');
console.log('%c📊 Versión: 4.0 - Separación Modular', 'color: #EE8028; font-size: 12px;');
