/**
 * ═══════════════════════════════════════════════════════════════════
 * TERRA COTTA FOODS - GLOBAL MARKET ANALYTICS DASHBOARD
 * Análisis Jerárquico de Mercados para Expansión Global
 * ═══════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════
// 1. DATOS GLOBALES - Datos actualizados según análisis
// ═══════════════════════════════════════════════════════════════════

const marketData = {
    regions: [
        {
            name: 'Asia Pacific',
            countries: [
                { name: 'China', population: 1412000000, gdpPerCapita: 12556, gdpTotal: 17734, code: 'CHN' },
                { name: 'Japan', population: 125800000, gdpPerCapita: 40113, gdpTotal: 5048, code: 'JPN' },
                { name: 'India', population: 1380000000, gdpPerCapita: 2277, gdpTotal: 3142, code: 'IND' },
                { name: 'South Korea', population: 51780000, gdpPerCapita: 34758, gdpTotal: 1799, code: 'KOR' },
                { name: 'Indonesia', population: 273520000, gdpPerCapita: 4332, gdpTotal: 1185, code: 'IDN' },
                { name: 'Thailand', population: 69800000, gdpPerCapita: 7233, gdpTotal: 505, code: 'THA' }
            ]
        },
        {
            name: 'North America',
            countries: [
                { name: 'United States', population: 331900000, gdpPerCapita: 69287, gdpTotal: 22996, code: 'USA' },
                { name: 'Canada', population: 38250000, gdpPerCapita: 52051, gdpTotal: 1990, code: 'CAN' },
                { name: 'Mexico', population: 128930000, gdpPerCapita: 10045, gdpTotal: 1295, code: 'MEX' }
            ]
        },
        {
            name: 'Europe',
            countries: [
                { name: 'Germany', population: 83240000, gdpPerCapita: 50795, gdpTotal: 4230, code: 'DEU' },
                { name: 'United Kingdom', population: 67220000, gdpPerCapita: 46510, gdpTotal: 3127, code: 'GBR' },
                { name: 'France', population: 67390000, gdpPerCapita: 43519, gdpTotal: 2933, code: 'FRA' },
                { name: 'Italy', population: 59550000, gdpPerCapita: 35551, gdpTotal: 2117, code: 'ITA' },
                { name: 'Spain', population: 47350000, gdpPerCapita: 30103, gdpTotal: 1425, code: 'ESP' }
            ]
        },
        {
            name: 'Latin America',
            countries: [
                { name: 'Brazil', population: 212560000, gdpPerCapita: 8897, gdpTotal: 1891, code: 'BRA' },
                { name: 'Mexico', population: 128930000, gdpPerCapita: 10045, gdpTotal: 1295, code: 'MEX' },
                { name: 'Argentina', population: 45380000, gdpPerCapita: 10636, gdpTotal: 483, code: 'ARG' },
                { name: 'Colombia', population: 50880000, gdpPerCapita: 6104, gdpTotal: 311, code: 'COL' },
                { name: 'Chile', population: 19120000, gdpPerCapita: 15355, gdpTotal: 294, code: 'CHL' }
            ]
        },
        {
            name: 'Middle East & Africa',
            countries: [
                { name: 'Saudi Arabia', population: 34810000, gdpPerCapita: 23186, gdpTotal: 807, code: 'SAU' },
                { name: 'UAE', population: 9890000, gdpPerCapita: 43103, gdpTotal: 426, code: 'ARE' },
                { name: 'Nigeria', population: 206140000, gdpPerCapita: 2097, gdpTotal: 432, code: 'NGA' },
                { name: 'South Africa', population: 59310000, gdpPerCapita: 6994, gdpTotal: 415, code: 'ZAF' }
            ]
        }
    ]
};

// ═══════════════════════════════════════════════════════════════════
// 2. CONFIGURACIÓN DE COLORES Y ESTILOS
// ═══════════════════════════════════════════════════════════════════

const regionColors = {
    'Asia Pacific': '#10b981',      // Verde (alta oportunidad)
    'North America': '#667eea',     // Azul (mercado establecido)
    'Europe': '#f59e0b',           // Naranja (mercado premium)
    'Latin America': '#ec4899',    // Rosa (expansión objetivo)
    'Middle East & Africa': '#8b5cf6' // Púrpura (mercados emergentes)
};

const plotlyConfig = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['lasso2d', 'select2d', 'pan2d', 'autoScale2d'],
    displaylogo: false,
    toImageButtonOptions: {
        format: 'png',
        filename: 'tcf_market_analysis',
        height: 1080,
        width: 1920,
        scale: 2
    }
};

const plotlyLayout = {
    font: {
        family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        size: 12,
        color: '#1e293b'
    },
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#f8fafc',
    margin: { t: 60, r: 40, b: 80, l: 80 },
    hovermode: 'closest'
};

// ═══════════════════════════════════════════════════════════════════
// 3. INICIALIZACIÓN Y KPIs
// ═══════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Terra Cotta Foods Dashboard inicializando...');
    
    try {
        // Calcular y mostrar KPIs
        updateKPICards();
        
        // Cargar gráficas de la primera pestaña
        updateMarketOverview();
        
        // Setup responsive resize
        setupResponsiveResize();
        
        console.log('✅ Dashboard inicializado correctamente');
    } catch (error) {
        console.error('❌ Error inicializando dashboard:', error);
    }
});

/**
 * Actualiza las tarjetas KPI en el header
 */
function updateKPICards() {
    const kpis = calculateGlobalKPIs();
    
    // Actualizar valores si los elementos existen
    const kpiElements = {
        'total-gdp': `$${kpis.totalGDP.toFixed(1)}T`,
        'top5-concentration': `${kpis.top5Concentration.toFixed(1)}%`,
        'regions-covered': kpis.regionsCount,
        'total-population': `${kpis.totalPopulation.toFixed(2)}B`
    };
    
    Object.entries(kpiElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
    
    console.log('📊 KPIs actualizados:', kpis);
}

/**
 * Calcula métricas globales clave
 */
function calculateGlobalKPIs() {
    let totalGDP = 0;
    let totalPopulation = 0;
    const allCountries = [];
    
    marketData.regions.forEach(region => {
        region.countries.forEach(country => {
            totalGDP += country.gdpTotal;
            totalPopulation += country.population;
            allCountries.push(country);
        });
    });
    
    // Top 5 países por GDP
    const top5 = allCountries
        .sort((a, b) => b.gdpTotal - a.gdpTotal)
        .slice(0, 5);
    
    const top5GDP = top5.reduce((sum, c) => sum + c.gdpTotal, 0);
    const top5Concentration = (top5GDP / totalGDP) * 100;
    
    return {
        totalGDP: totalGDP / 1000, // Convertir a trillones
        totalPopulation: totalPopulation / 1000000000, // Convertir a billones
        regionsCount: marketData.regions.length,
        top5Concentration: top5Concentration,
        top5Countries: top5.map(c => c.name)
    };
}

// ═══════════════════════════════════════════════════════════════════
// 4. SISTEMA DE PESTAÑAS
// ═══════════════════════════════════════════════════════════════════

function changeTab(tabName) {
    console.log(`🔄 Cambiando a pestaña: ${tabName}`);
    
    // Ocultar todas las pestañas
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.remove('active'));
    
    // Desactivar todos los botones
    const allButtons = document.querySelectorAll('.tab-button');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    // Activar pestaña seleccionada
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Activar botón seleccionado
    const selectedButton = document.querySelector(`[onclick*="${tabName}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
    
    // Cargar gráficas según la pestaña con delay para mejor renderizado
    setTimeout(() => {
        switch(tabName) {
            case 'market-overview':
                updateMarketOverview();
                break;
            case 'regional-analysis':
                updateRegionalAnalysis();
                break;
            case 'strategic-insights':
                updateStrategicInsights();
                break;
        }
    }, 100);
    
    console.log(`✅ Pestaña cambiada a: ${tabName}`);
}

function updateMarketOverview() {
    drawTreemap();
    drawScatterPlot();
}

function updateRegionalAnalysis() {
    drawMatrixComparison();
    drawSunburst();
}

function updateStrategicInsights() {
    // Generar tabla de recomendaciones si existe
    generateRecommendationsTable();
}

// ═══════════════════════════════════════════════════════════════════
// 5. GRÁFICA 1: TREEMAP JERÁRQUICO (VISUALIZACIÓN PRINCIPAL)
// ═══════════════════════════════════════════════════════════════════

function drawTreemap() {
    const container = document.getElementById('treemap-chart');
    if (!container) {
        console.warn('⚠️ Contenedor treemap-chart no encontrado');
        return;
    }
    
    console.log('🎨 Dibujando Treemap...');
    
    // Preparar datos jerárquicos
    const labels = ['Global'];
    const parents = [''];
    const values = [0];
    const colors = ['rgba(255,255,255,0.1)'];
    const texts = [''];
    const customdata = [];
    
    let totalGlobal = 0;
    
    // Ordenar regiones por GDP Total descendente
    const sortedRegions = [...marketData.regions].sort((a, b) => {
        const totalA = a.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        const totalB = b.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        return totalB - totalA;
    });
    
    // Agregar regiones y países
    sortedRegions.forEach(region => {
        const regionTotal = region.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        const regionPop = region.countries.reduce((sum, c) => sum + c.population, 0);
        totalGlobal += regionTotal;
        
        labels.push(region.name);
        parents.push('Global');
        values.push(regionTotal);
        colors.push(regionColors[region.name]);
        
        const avgGdpPerCapita = (regionTotal * 1000000000) / regionPop;
        texts.push(`$${regionTotal.toFixed(0)}B`);
        customdata.push({
            gdp: regionTotal,
            avgGdpPerCapita: avgGdpPerCapita,
            countries: region.countries.length,
            population: regionPop
        });
        
        // Agregar países ordenados por GDP
        const sortedCountries = [...region.countries].sort((a, b) => b.gdpTotal - a.gdpTotal);
        
        sortedCountries.forEach(country => {
            labels.push(country.name);
            parents.push(region.name);
            values.push(country.gdpTotal);
            
            // Variación de color para países
            const baseColor = regionColors[region.name];
            colors.push(baseColor);
            
            texts.push(`$${country.gdpTotal.toFixed(0)}B`);
            customdata.push({
                gdp: country.gdpTotal,
                gdpPerCapita: country.gdpPerCapita,
                population: country.population,
                code: country.code
            });
        });
    });
    
    values[0] = totalGlobal;
    texts[0] = `Total: $${totalGlobal.toFixed(0)}B`;
    customdata.unshift({ gdp: totalGlobal });
    
    const data = [{
        type: 'treemap',
        labels: labels,
        parents: parents,
        values: values,
        text: texts,
        textposition: 'middle center',
        textfont: { 
            size: 14, 
            color: '#fff',
            family: '-apple-system, BlinkMacSystemFont, sans-serif'
        },
        customdata: customdata,
        hovertemplate: 
            '<b>%{label}</b><br>' +
            'GDP Total: $%{customdata.gdp:.0f}B<br>' +
            '<extra></extra>',
        marker: {
            colors: colors,
            line: { width: 3, color: 'white' },
            pad: { t: 30, l: 5, r: 5, b: 5 }
        },
        pathbar: {
            visible: true,
            thickness: 30,
            textfont: { 
                size: 16, 
                family: '-apple-system',
                color: '#1e293b'
            },
            edgeshape: 'round'
        }
    }];
    
    const layout = {
        ...plotlyLayout,
        title: {
            text: '<b>Jerarquía de Capacidad de Compra: Global → Región → País</b><br>' +
                  '<sub>Tamaño = PIB Total (capacidad de mercado) | Haz clic para explorar regiones</sub>',
            font: { size: 18, color: '#1e293b', family: '-apple-system' },
            x: 0.05,
            xanchor: 'left'
        },
        margin: { t: 100, r: 20, b: 20, l: 20 },
        height: 600
    };
    
    Plotly.newPlot(container, data, layout, plotlyConfig);
    
    console.log('✅ Treemap dibujado correctamente');
}

// ═══════════════════════════════════════════════════════════════════
// 6. GRÁFICA 2: SCATTER PLOT - ANÁLISIS DE VIABILIDAD (CORREGIDO)
// ═══════════════════════════════════════════════════════════════════

function drawScatterPlot() {
    const container = document.getElementById('scatter-chart');
    if (!container) {
        console.warn('⚠️ Contenedor scatter-chart no encontrado');
        return;
    }
    
    console.log('🎨 Dibujando Scatter Plot...');
    
    // Preparar datos para cada región
    const traces = [];
    
    marketData.regions.forEach(region => {
        const x = region.countries.map(c => c.population);
        const y = region.countries.map(c => c.gdpPerCapita);
        const sizes = region.countries.map(c => c.gdpTotal);
        const labels = region.countries.map(c => c.name);
        const codes = region.countries.map(c => c.code);
        
        // ═══════════════════════════════════════════════════════════
        // 🎯 CONFIGURACIÓN DE TAMAÑO DE BURBUJAS
        // ═══════════════════════════════════════════════════════════
        // IMPORTANTE: Escalamos por ÁREA (no por radio) para proporcionalidad real
        
        const MIN_BUBBLE_AREA = 1500;   // 👈 Área mínima en píxeles² (burbujas pequeñas)
        const MAX_BUBBLE_AREA = 10000;  // 👈 Área máxima en píxeles² (burbujas grandes)
        
        // ═══════════════════════════════════════════════════════════
        
        // Escalar tamaños por ÁREA para que sea proporcional al PIB
        const maxGDP = Math.max(...sizes);
        const minGDP = Math.min(...sizes);
        
        const scaledSizes = sizes.map(gdp => {
            // Normalizar GDP entre 0 y 1
            const normalized = (gdp - minGDP) / (maxGDP - minGDP);
            // Calcular área proporcional al GDP
            const targetArea = MIN_BUBBLE_AREA + (normalized * (MAX_BUBBLE_AREA - MIN_BUBBLE_AREA));
            // Convertir área a radio: r = sqrt(área / π)
            const radius = Math.sqrt(targetArea / Math.PI);
            return radius;
        });
        
        const trace = {
            x: x,
            y: y,
            mode: 'markers+text',
            type: 'scatter',
            name: region.name,
            text: codes,
            textposition: 'middle center',
            textfont: {
                size: 10,
                color: '#fff',
                family: 'monospace'
            },
            marker: {
                size: scaledSizes,
                color: regionColors[region.name],
                opacity: 0.75,
                line: {
                    color: '#fff',
                    width: 2
                }
            },
            customdata: labels.map((label, i) => ({
                name: label,
                gdpTotal: sizes[i],
                population: x[i],
                gdpPerCapita: y[i]
            })),
            hovertemplate: 
                '<b>%{customdata.name}</b><br>' +
                '<br>' +
                '<i>Fuerza Laboral:</i><br>' +
                'Población: %{customdata.population:,.0f}<br>' +
                '<br>' +
                '<i>Poder Adquisitivo:</i><br>' +
                'GDP per Cápita: $%{customdata.gdpPerCapita:,.0f}<br>' +
                '<br>' +
                '<i>Viabilidad Económica:</i><br>' +
                'PIB Total: $%{customdata.gdpTotal:.0f}B<br>' +
                '<extra></extra>'
        };
        
        traces.push(trace);
    });
    
    const layout = {
        ...plotlyLayout,
        title: {
            text: '<b>Matriz de Viabilidad: Población vs Poder Adquisitivo</b><br>' +
                  '<sub>Eje X = Fuerza Laboral | Eje Y = Poder Adquisitivo | Tamaño = PIB Total</sub>',
            font: { size: 18, color: '#1e293b' },
            x: 0.05,
            xanchor: 'left'
        },
        xaxis: {
            title: {
                text: '<b>Población (escala logarítmica)</b><br><i>Fuerza Laboral / Base de Consumo</i>',
                font: { size: 14, color: '#475569' }
            },
            type: 'log',
            gridcolor: '#e2e8f0',
            showline: true,
            linecolor: '#cbd5e1',
            linewidth: 2
        },
        yaxis: {
            title: {
                text: '<b>GDP per Cápita (USD)</b><br><i>Poder Adquisitivo Individual</i>',
                font: { size: 14, color: '#475569' }
            },
            gridcolor: '#e2e8f0',
            showline: true,
            linecolor: '#cbd5e1',
            linewidth: 2
        },
        legend: {
            x: 1.02,
            xanchor: 'left',
            y: 1,
            bgcolor: 'rgba(255,255,255,0.95)',
            bordercolor: '#cbd5e1',
            borderwidth: 2,
            font: { size: 12 }
        },
        hovermode: 'closest',
        height: 600
    };
    
    Plotly.newPlot(container, traces, layout, plotlyConfig);
    
    // Agregar nota informativa FUERA de la gráfica
    const noteContainer = container.parentElement;
    let existingNote = noteContainer.querySelector('.scatter-info-note');
    
    if (!existingNote) {
        const infoNote = document.createElement('div');
        infoNote.className = 'scatter-info-note';
        infoNote.style.cssText = `
            margin-top: 15px;
            padding: 12px 16px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 8px;
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        `;
        infoNote.innerHTML = `
            <span style="font-size: 20px;">💡</span>
            <span><strong>Insight:</strong> Cuadrante superior derecho = Mercados ideales (alta población + alto poder adquisitivo)</span>
        `;
        noteContainer.appendChild(infoNote);
    }
    
    console.log('✅ Scatter plot dibujado correctamente con tamaños proporcionales');
}

// ═══════════════════════════════════════════════════════════════════
// 7. GRÁFICA 3: MATRIZ DE COMPARACIÓN REGIONAL (4 KPIs)
// ═══════════════════════════════════════════════════════════════════

function drawMatrixComparison() {
    const container = document.getElementById('matrix-chart');
    if (!container) {
        console.warn('⚠️ Contenedor matrix-chart no encontrado');
        return;
    }
    
    console.log('🎨 Dibujando Matriz de Comparación...');
    
    // Calcular métricas por región
    const regionMetrics = marketData.regions.map(region => {
        const totalGDP = region.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        const totalPop = region.countries.reduce((sum, c) => sum + c.population, 0);
        const avgGdpPerCapita = (totalGDP * 1000000000) / totalPop;
        const numCountries = region.countries.length;
        
        return {
            name: region.name,
            totalGDP: totalGDP,
            avgGdpPerCapita: avgGdpPerCapita,
            numCountries: numCountries,
            totalPop: totalPop
        };
    });
    
    // Ordenar por GDP Total
    regionMetrics.sort((a, b) => b.totalGDP - a.totalGDP);
    
    const regionNames = regionMetrics.map(r => r.name);
    const colors = regionNames.map(name => regionColors[name]);
    
    // Crear 4 subplots
    const traces = [];
    
    // Subplot 1: Total GDP (Capacidad de Mercado)
    traces.push({
        x: regionNames,
        y: regionMetrics.map(r => r.totalGDP),
        type: 'bar',
        name: 'PIB Total',
        marker: { color: colors, opacity: 0.85 },
        text: regionMetrics.map(r => `$${r.totalGDP.toFixed(0)}B`),
        textposition: 'outside',
        hovertemplate: '<b>%{x}</b><br>PIB Total: $%{y:.0f}B<extra></extra>',
        xaxis: 'x1',
        yaxis: 'y1'
    });
    
    // Subplot 2: Avg GDP per Capita (Poder Adquisitivo)
    traces.push({
        x: regionNames,
        y: regionMetrics.map(r => r.avgGdpPerCapita),
        type: 'bar',
        name: 'PIB per Cápita',
        marker: { color: colors, opacity: 0.85 },
        text: regionMetrics.map(r => `$${(r.avgGdpPerCapita/1000).toFixed(1)}K`),
        textposition: 'outside',
        hovertemplate: '<b>%{x}</b><br>PIB per Cápita: $%{y:,.0f}<extra></extra>',
        xaxis: 'x2',
        yaxis: 'y2'
    });
    
    // Subplot 3: Number of Countries (Diversificación)
    traces.push({
        x: regionNames,
        y: regionMetrics.map(r => r.numCountries),
        type: 'bar',
        name: 'Países',
        marker: { color: colors, opacity: 0.85 },
        text: regionMetrics.map(r => r.numCountries),
        textposition: 'outside',
        hovertemplate: '<b>%{x}</b><br>Países: %{y}<extra></extra>',
        xaxis: 'x3',
        yaxis: 'y3'
    });
    
    // Subplot 4: Total Population (Fuerza Laboral)
    traces.push({
        x: regionNames,
        y: regionMetrics.map(r => r.totalPop / 1000000),
        type: 'bar',
        name: 'Población',
        marker: { color: colors, opacity: 0.85 },
        text: regionMetrics.map(r => `${(r.totalPop/1000000).toFixed(0)}M`),
        textposition: 'outside',
        hovertemplate: '<b>%{x}</b><br>Población: %{y:.0f}M<extra></extra>',
        xaxis: 'x4',
        yaxis: 'y4'
    });
    
    const layout = {
        ...plotlyLayout,
        title: {
            text: '<b>Comparación Regional Multi-Dimensional</b><br>' +
                  '<sub>Evaluación de regiones según 4 métricas estratégicas clave</sub>',
            font: { size: 18, color: '#1e293b' },
            x: 0.5,
            xanchor: 'center'
        },
        grid: {
            rows: 2,
            columns: 2,
            pattern: 'independent',
            roworder: 'top to bottom',
            xgap: 0.12,
            ygap: 0.12
        },
        showlegend: false,
        
        // Subplot 1: PIB Total
        xaxis1: { 
            title: '<b>PIB Total</b><br><i>(Capacidad de Mercado)</i>',
            titlefont: { size: 12, color: '#64748b' },
            tickangle: -45,
            domain: [0, 0.44],
            showgrid: false
        },
        yaxis1: { 
            title: 'Miles de Millones USD',
            titlefont: { size: 11 },
            domain: [0.56, 1],
            gridcolor: '#e2e8f0'
        },
        
        // Subplot 2: PIB per Cápita
        xaxis2: { 
            title: '<b>PIB per Cápita</b><br><i>(Poder Adquisitivo)</i>',
            titlefont: { size: 12, color: '#64748b' },
            tickangle: -45,
            domain: [0.56, 1],
            showgrid: false
        },
        yaxis2: { 
            title: 'USD per Cápita',
            titlefont: { size: 11 },
            domain: [0.56, 1],
            gridcolor: '#e2e8f0'
        },
        
        // Subplot 3: Número de Países
        xaxis3: { 
            title: '<b>Número de Países</b><br><i>(Diversificación)</i>',
            titlefont: { size: 12, color: '#64748b' },
            tickangle: -45,
            domain: [0, 0.44],
            showgrid: false
        },
        yaxis3: { 
            title: 'Cantidad de Países',
            titlefont: { size: 11 },
            domain: [0, 0.44],
            gridcolor: '#e2e8f0'
        },
        
        // Subplot 4: Población
        xaxis4: { 
            title: '<b>Población Total</b><br><i>(Fuerza Laboral)</i>',
            titlefont: { size: 12, color: '#64748b' },
            tickangle: -45,
            domain: [0.56, 1],
            showgrid: false
        },
        yaxis4: { 
            title: 'Millones de Habitantes',
            titlefont: { size: 11 },
            domain: [0, 0.44],
            gridcolor: '#e2e8f0'
        },
        
        margin: { t: 100, r: 40, b: 120, l: 80 },
        height: 700
    };
    
    Plotly.newPlot(container, traces, layout, plotlyConfig);
    
    console.log('✅ Matriz de comparación dibujada correctamente');
}

// ═══════════════════════════════════════════════════════════════════
// 8. GRÁFICA 4: SUNBURST CHART (VISUALIZACIÓN PROPORCIONAL)
// ═══════════════════════════════════════════════════════════════════

function drawSunburst() {
    const container = document.getElementById('sunburst-chart');
    if (!container) {
        console.warn('⚠️ Contenedor sunburst-chart no encontrado');
        return;
    }
    
    console.log('🎨 Dibujando Sunburst Chart...');
    
    // Preparar datos jerárquicos
    const labels = ['Global'];
    const parents = [''];
    const values = [0];
    const colors = ['rgba(255,255,255,0.1)'];
    const customdata = [];
    
    let totalGlobal = 0;
    
    // Ordenar regiones por GDP
    const sortedRegions = [...marketData.regions].sort((a, b) => {
        const totalA = a.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        const totalB = b.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        return totalB - totalA;
    });
    
    // Agregar regiones y países
    sortedRegions.forEach(region => {
        const regionTotal = region.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        const regionPop = region.countries.reduce((sum, c) => sum + c.population, 0);
        totalGlobal += regionTotal;
        
        labels.push(region.name);
        parents.push('Global');
        values.push(regionTotal);
        colors.push(regionColors[region.name]);
        customdata.push({
            gdp: regionTotal,
            countries: region.countries.length,
            population: regionPop
        });
        
        // Agregar países ordenados
        const sortedCountries = [...region.countries].sort((a, b) => b.gdpTotal - a.gdpTotal);
        
        sortedCountries.forEach(country => {
            labels.push(country.name);
            parents.push(region.name);
            values.push(country.gdpTotal);
            colors.push(regionColors[region.name]);
            customdata.push({
                gdp: country.gdpTotal,
                gdpPerCapita: country.gdpPerCapita,
                population: country.population,
                code: country.code
            });
        });
    });
    
    values[0] = totalGlobal;
    customdata.unshift({ gdp: totalGlobal });
    
    const data = [{
        type: 'sunburst',
        labels: labels,
        parents: parents,
        values: values,
        branchvalues: 'total',
        marker: {
            colors: colors,
            line: { width: 2, color: 'white' }
        },
        customdata: customdata,
        hovertemplate: 
            '<b>%{label}</b><br>' +
            'PIB: $%{customdata.gdp:.0f}B<br>' +
            'Porcentaje: %{percentParent}<br>' +
            '<extra></extra>',
        textfont: {
            size: 13,
            family: '-apple-system',
            color: '#fff'
        },
        insidetextorientation: 'radial',
        leaf: { opacity: 0.8 }
    }];
    
    const layout = {
        ...plotlyLayout,
        title: {
            text: '<b>Estructura Jerárquica de Mercados</b><br>' +
                  '<sub>Centro = Regiones | Anillos exteriores = Países | Haz clic para explorar</sub>',
            font: { size: 18, color: '#1e293b' },
            x: 0.5,
            xanchor: 'center'
        },
        margin: { t: 80, r: 20, b: 20, l: 20 },
        height: 600,
        sunburstcolorway: Object.values(regionColors)
    };
    
    Plotly.newPlot(container, data, layout, plotlyConfig);
    
    console.log('✅ Sunburst chart dibujado correctamente');
}

// ═══════════════════════════════════════════════════════════════════
// 9. TABLA DE RECOMENDACIONES ESTRATÉGICAS
// ═══════════════════════════════════════════════════════════════════

function generateRecommendationsTable() {
    const container = document.getElementById('recommendations-table');
    if (!container) {
        console.warn('⚠️ Contenedor recommendations-table no encontrado');
        return;
    }
    
    console.log('📋 Generando tabla de recomendaciones...');
    
    // Calcular top países
    const allCountries = [];
    marketData.regions.forEach(region => {
        region.countries.forEach(country => {
            allCountries.push({
                ...country,
                region: region.name
            });
        });
    });
    
    // Top 10 por PIB Total
    const top10 = allCountries
        .sort((a, b) => b.gdpTotal - a.gdpTotal)
        .slice(0, 10);
    
    // Generar HTML de la tabla
    let tableHTML = `
        <div class="recommendations-section">
            <h3 style="color: #1e293b; margin-bottom: 20px;">
                🎯 Top 10 Mercados Prioritarios para Inversión
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">#</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">País</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Región</th>
                        <th style="padding: 12px; text-align: right; border: 1px solid #cbd5e1;">PIB Total</th>
                        <th style="padding: 12px; text-align: right; border: 1px solid #cbd5e1;">PIB per Cápita</th>
                        <th style="padding: 12px; text-align: right; border: 1px solid #cbd5e1;">Población</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Recomendación</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    top10.forEach((country, index) => {
        const rowColor = index % 2 === 0 ? '#f8fafc' : '#ffffff';
        
        // Generar recomendación estratégica
        let recommendation = '';
        if (country.gdpTotal > 10000) {
            recommendation = '🌟 Mercado gigante - Prioridad máxima';
        } else if (country.gdpTotal > 3000 && country.gdpPerCapita > 40000) {
            recommendation = '💎 Alto valor - Productos premium';
        } else if (country.population > 200000000) {
            recommendation = '👥 Base masiva - Economías de escala';
        } else if (country.gdpPerCapita > 50000) {
            recommendation = '💰 Alto poder adquisitivo';
        } else {
            recommendation = '📈 Mercado emergente viable';
        }
        
        tableHTML += `
            <tr style="background: ${rowColor};">
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #667eea;">${index + 1}</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: 600;">${country.name}</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0;">
                    <span style="background: ${regionColors[country.region]}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px;">
                        ${country.region}
                    </span>
                </td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: right; font-weight: bold; color: #10b981;">
                    ${country.gdpTotal.toFixed(1)}B
                </td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: right;">
                    ${country.gdpPerCapita.toLocaleString()}
                </td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: right;">
                    ${(country.population / 1000000).toFixed(1)}M
                </td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 13px;">
                    ${recommendation}
                </td>
            </tr>
        `;
    });
    
    tableHTML += `
                </tbody>
            </table>
        </div>
        
        <div class="strategic-insights" style="margin-top: 40px; padding: 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;">
            <h3 style="margin-bottom: 16px;">💡 Insights Estratégicos para Marco Antonelli</h3>
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>Centros de Distribución Prioritarios:</strong> Asia Pacific (PIB total más alto), seguido de North America y Europe
                </li>
                <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>Mercados de Alto Valor:</strong> USA, China, Japón y Alemania representan el núcleo del mercado global
                </li>
                <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>Oportunidad en América Latina:</strong> Brasil y México ofrecen población significativa con mercado en crecimiento
                </li>
                <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>Estrategia de Precios:</strong> Europa requiere productos premium; Asia necesita balance costo-calidad
                </li>
                <li style="padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>Correlación Población-Economía:</strong> China e India tienen población masiva pero requieren productos de menor costo unitario
                </li>
            </ul>
        </div>
    `;
    
    container.innerHTML = tableHTML;
    
    console.log('✅ Tabla de recomendaciones generada');
}

// ═══════════════════════════════════════════════════════════════════
// 10. RESPONSIVE RESIZE
// ═══════════════════════════════════════════════════════════════════

function setupResponsiveResize() {
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const activeTab = document.querySelector('.tab-content.active');
            if (!activeTab) return;
            
            const tabId = activeTab.id;
            
            try {
                // Redibujar todas las gráficas de la pestaña activa
                if (tabId === 'market-overview') {
                    const treemap = document.getElementById('treemap-chart');
                    const scatter = document.getElementById('scatter-chart');
                    
                    if (treemap && treemap.data) Plotly.Plots.resize('treemap-chart');
                    if (scatter && scatter.data) Plotly.Plots.resize('scatter-chart');
                    
                } else if (tabId === 'regional-analysis') {
                    const matrix = document.getElementById('matrix-chart');
                    const sunburst = document.getElementById('sunburst-chart');
                    
                    if (matrix && matrix.data) Plotly.Plots.resize('matrix-chart');
                    if (sunburst && sunburst.data) Plotly.Plots.resize('sunburst-chart');
                }
                
                console.log('✅ Gráficas redimensionadas');
            } catch (error) {
                console.warn('⚠️ Error al redimensionar:', error);
            }
        }, 250);
    });
}

// ═══════════════════════════════════════════════════════════════════
// 11. FILTROS INTERACTIVOS
// ═══════════════════════════════════════════════════════════════════

function applyRegionFilter(selectedRegions) {
    console.log('🔍 Aplicando filtro de regiones:', selectedRegions);
    
    // Filtrar datos
    const filteredData = {
        regions: marketData.regions.filter(region => 
            selectedRegions.includes(region.name)
        )
    };
    
    // Redibujar gráficas con datos filtrados
    // (Implementación según necesidad)
    
    console.log('✅ Filtro aplicado');
}

function applyGDPRangeFilter(minGDP, maxGDP) {
    console.log(`🔍 Aplicando filtro GDP: ${minGDP}B - ${maxGDP}B`);
    
    // Filtrar países por rango de GDP
    const filteredRegions = marketData.regions.map(region => ({
        ...region,
        countries: region.countries.filter(c => 
            c.gdpTotal >= minGDP && c.gdpTotal <= maxGDP
        )
    })).filter(region => region.countries.length > 0);
    
    console.log(`✅ Países filtrados: ${filteredRegions.reduce((sum, r) => sum + r.countries.length, 0)}`);
    
    // Redibujar con datos filtrados
    // (Implementación según necesidad)
}

// ═══════════════════════════════════════════════════════════════════
// 12. EXPORTAR DATOS
// ═══════════════════════════════════════════════════════════════════

function exportToCSV() {
    console.log('📥 Exportando datos a CSV...');
    
    // Preparar datos para CSV
    let csvContent = "Country,Region,Population,GDP per Capita,GDP Total\n";
    
    marketData.regions.forEach(region => {
        region.countries.forEach(country => {
            csvContent += `${country.name},${region.name},${country.population},${country.gdpPerCapita},${country.gdpTotal}\n`;
        });
    });
    
    // Crear blob y descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'tcf_market_analysis.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('✅ Datos exportados');
}

function exportDashboardAsPDF() {
    console.log('📄 Preparando exportación a PDF...');
    
    // Usar html2canvas + jsPDF si está disponible
    alert('Funcionalidad de exportación a PDF: Use el botón de captura de cada gráfica de Plotly para exportar individualmente.');
    
    console.log('💡 Tip: Use las herramientas de captura de Plotly en cada gráfica');
}

// ═══════════════════════════════════════════════════════════════════
// 13. UTILIDADES Y HELPERS
// ═══════════════════════════════════════════════════════════════════

/**
 * Formatea números grandes con sufijos K, M, B, T
 */
function formatNumber(num) {
    if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(1) + 'T';
    } else if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

/**
 * Calcula el color de intensidad basado en valor
 */
function getColorIntensity(value, min, max, baseColor) {
    const normalized = (value - min) / (max - min);
    const opacity = 0.3 + (normalized * 0.7);
    
    return `${baseColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
}

/**
 * Valida que Plotly esté cargado
 */
function validatePlotly() {
    if (typeof Plotly === 'undefined') {
        console.error('❌ ERROR CRÍTICO: Plotly no está cargado');
        alert('Error: La librería Plotly no se ha cargado correctamente. Por favor, recarga la página.');
        return false;
    }
    return true;
}

/**
 * Log de estado del dashboard
 */
function logDashboardStatus() {
    const status = {
        plotlyLoaded: typeof Plotly !== 'undefined',
        dataLoaded: typeof marketData !== 'undefined',
        regionsCount: marketData.regions.length,
        totalCountries: marketData.regions.reduce((sum, r) => sum + r.countries.length, 0),
        kpis: calculateGlobalKPIs()
    };
    
    console.table(status);
    return status;
}

// ═══════════════════════════════════════════════════════════════════
// 14. MODO DEBUG (Activar con: debugMode = true en consola)
// ═══════════════════════════════════════════════════════════════════

window.debugMode = false;

window.enableDebug = function() {
    window.debugMode = true;
    console.log('🔧 Modo debug activado');
    logDashboardStatus();
};

window.disableDebug = function() {
    window.debugMode = false;
    console.log('🔧 Modo debug desactivado');
};

// ═══════════════════════════════════════════════════════════════════
// 15. INICIALIZACIÓN FINAL Y VERIFICACIONES
// ═══════════════════════════════════════════════════════════════════

// Verificar que Plotly esté disponible antes de inicializar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            if (validatePlotly()) {
                console.log('✅ Terra Cotta Foods Dashboard - JavaScript cargado correctamente');
                console.log('💡 Tip: Ejecuta window.enableDebug() para ver información detallada');
                console.log('📊 Datos cargados:', marketData.regions.length, 'regiones');
            }
        }, 500);
    });
} else {
    console.log('⚡ Carga rápida detectada');
}

// Exponer funciones globales útiles
window.TCFDashboard = {
    version: '1.0.0',
    changeTab: changeTab,
    exportToCSV: exportToCSV,
    applyRegionFilter: applyRegionFilter,
    applyGDPRangeFilter: applyGDPRangeFilter,
    refreshAllCharts: function() {
        updateMarketOverview();
        updateRegionalAnalysis();
        updateStrategicInsights();
    },
    getStatus: logDashboardStatus
};

console.log('✅ TCF Dashboard JavaScript inicializado - v1.0.0');
console.log('📖 Documentación: window.TCFDashboard');