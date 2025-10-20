/**
 * ═══════════════════════════════════════════════════════════════════
 * GLOBAL MARKET ANALYTICS DASHBOARD - JAVASCRIPT
 * ═══════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════
// 1. DATOS GLOBALES - Datos de ejemplo realistas
// ═══════════════════════════════════════════════════════════════════

const marketData = {
    regions: [
        {
            name: 'North America',
            countries: [
                { name: 'United States', population: 331900000, gdpPerCapita: 69287, gdpTotal: 22996 },
                { name: 'Canada', population: 38250000, gdpPerCapita: 52051, gdpTotal: 1990 },
                { name: 'Mexico', population: 128930000, gdpPerCapita: 10045, gdpTotal: 1295 }
            ]
        },
        {
            name: 'Europe',
            countries: [
                { name: 'Germany', population: 83240000, gdpPerCapita: 50795, gdpTotal: 4230 },
                { name: 'United Kingdom', population: 67220000, gdpPerCapita: 46510, gdpTotal: 3127 },
                { name: 'France', population: 67390000, gdpPerCapita: 43519, gdpTotal: 2933 },
                { name: 'Italy', population: 59550000, gdpPerCapita: 35551, gdpTotal: 2117 },
                { name: 'Spain', population: 47350000, gdpPerCapita: 30103, gdpTotal: 1425 }
            ]
        },
        {
            name: 'Asia Pacific',
            countries: [
                { name: 'China', population: 1412000000, gdpPerCapita: 12556, gdpTotal: 17734 },
                { name: 'Japan', population: 125800000, gdpPerCapita: 40113, gdpTotal: 5048 },
                { name: 'India', population: 1380000000, gdpPerCapita: 2277, gdpTotal: 3142 },
                { name: 'South Korea', population: 51780000, gdpPerCapita: 34758, gdpTotal: 1799 },
                { name: 'Australia', population: 25690000, gdpPerCapita: 60443, gdpTotal: 1553 },
                { name: 'Indonesia', population: 273520000, gdpPerCapita: 4332, gdpTotal: 1185 }
            ]
        },
        {
            name: 'Latin America',
            countries: [
                { name: 'Brazil', population: 212560000, gdpPerCapita: 8897, gdpTotal: 1891 },
                { name: 'Argentina', population: 45380000, gdpPerCapita: 10636, gdpTotal: 483 },
                { name: 'Colombia', population: 50880000, gdpPerCapita: 6104, gdpTotal: 311 },
                { name: 'Chile', population: 19120000, gdpPerCapita: 15355, gdpTotal: 294 }
            ]
        },
        {
            name: 'Middle East & Africa',
            countries: [
                { name: 'Saudi Arabia', population: 34810000, gdpPerCapita: 23186, gdpTotal: 807 },
                { name: 'South Africa', population: 59310000, gdpPerCapita: 6994, gdpTotal: 415 },
                { name: 'UAE', population: 9890000, gdpPerCapita: 43103, gdpTotal: 426 },
                { name: 'Nigeria', population: 206140000, gdpPerCapita: 2097, gdpTotal: 432 }
            ]
        }
    ]
};

// ═══════════════════════════════════════════════════════════════════
// 2. CONFIGURACIÓN DE COLORES
// ═══════════════════════════════════════════════════════════════════

const regionColors = {
    'North America': '#667eea',
    'Europe': '#f59e0b',
    'Asia Pacific': '#10b981',
    'Latin America': '#ec4899',
    'Middle East & Africa': '#8b5cf6'
};

const plotlyConfig = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'],
    displaylogo: false
};

const plotlyLayout = {
    font: {
        family: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif',
        size: 12,
        color: '#1D1D1F'
    },
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#f9f9f9',
    margin: { t: 40, r: 20, b: 60, l: 60 },
    hovermode: 'closest'
};

// ═══════════════════════════════════════════════════════════════════
// 3. INICIALIZACIÓN
// ═══════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Dashboard inicializando...');
    
    // Cargar gráficas de la primera pestaña
    updateMarketOverview();
    
    // Setup responsive resize
    setupResponsiveResize();
    
    console.log('✅ Dashboard inicializado correctamente');
});

// ═══════════════════════════════════════════════════════════════════
// 4. SISTEMA DE PESTAÑAS
// ═══════════════════════════════════════════════════════════════════

function changeTab(tabName) {
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
    const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
    
    // Cargar gráficas según la pestaña
    switch(tabName) {
        case 'market-overview':
            updateMarketOverview();
            break;
        case 'regional-analysis':
            updateRegionalAnalysis();
            break;
    }
    
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

// ═══════════════════════════════════════════════════════════════════
// 5. GRÁFICA 1: TREEMAP JERÁRQUICO INTERACTIVO
// ═══════════════════════════════════════════════════════════════════

function drawTreemap() {
    const container = document.getElementById('treemap-chart');
    if (!container) return;
    
    // Preparar datos para treemap
    const labels = ['Global'];
    const parents = [''];
    const values = [0];
    const colors = ['#ffffff'];
    const texts = [''];
    
    let totalGlobal = 0;
    
    // Agregar regiones y países
    marketData.regions.forEach(region => {
        const regionTotal = region.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        totalGlobal += regionTotal;
        
        labels.push(region.name);
        parents.push('Global');
        values.push(regionTotal);
        colors.push(regionColors[region.name]);
        
        const avgGdpPerCapita = region.countries.reduce((sum, c) => 
            sum + (c.gdpPerCapita * c.gdpTotal), 0) / regionTotal;
        texts.push(`GDP: $${regionTotal.toFixed(0)}B<br>Avg GDP/cap: $${avgGdpPerCapita.toFixed(0)}`);
        
        // Agregar países
        region.countries.forEach(country => {
            labels.push(country.name);
            parents.push(region.name);
            values.push(country.gdpTotal);
            
            // Color más claro para países
            const baseColor = regionColors[region.name];
            colors.push(baseColor);
            
            texts.push(
                `GDP: $${country.gdpTotal.toFixed(0)}B<br>` +
                `GDP/cap: $${country.gdpPerCapita.toLocaleString()}<br>` +
                `Pop: ${(country.population / 1000000).toFixed(1)}M`
            );
        });
    });
    
    values[0] = totalGlobal;
    
    const data = [{
        type: 'treemap',
        labels: labels,
        parents: parents,
        values: values,
        text: texts,
        textposition: 'middle center',
        hovertemplate: '<b>%{label}</b><br>%{text}<extra></extra>',
        marker: {
            colors: colors,
            line: { width: 2, color: 'white' }
        },
        pathbar: {
            visible: true,
            thickness: 20,
            textfont: { size: 14, family: '-apple-system' }
        }
    }];
    
    const layout = {
        ...plotlyLayout,
        title: {
            text: 'Click on regions to drill down',
            font: { size: 14, color: '#6E6E73' }
        },
        margin: { t: 60, r: 20, b: 20, l: 20 }
    };
    
    Plotly.newPlot(container, data, layout, plotlyConfig);
    
    console.log('✅ Treemap dibujado');
}

// ═══════════════════════════════════════════════════════════════════
// 6. GRÁFICA 2: SCATTER PLOT - POBLACIÓN VS GDP PER CÁPITA
// ═══════════════════════════════════════════════════════════════════

function drawScatterPlot() {
    const container = document.getElementById('scatter-chart');
    if (!container) return;
    
    // Preparar datos para cada región
    const traces = [];
    
    marketData.regions.forEach(region => {
        const x = region.countries.map(c => c.population);
        const y = region.countries.map(c => c.gdpPerCapita);
        const sizes = region.countries.map(c => c.gdpTotal);
        const labels = region.countries.map(c => c.name);
        
        // Escalar tamaños de burbujas
        const maxSize = Math.max(...sizes);
        const scaledSizes = sizes.map(s => 10 + (s / maxSize) * 60);
        
        const trace = {
            x: x,
            y: y,
            mode: 'markers',
            type: 'scatter',
            name: region.name,
            text: labels,
            marker: {
                size: scaledSizes,
                color: regionColors[region.name],
                opacity: 0.7,
                line: {
                    color: 'white',
                    width: 2
                }
            },
            hovertemplate: 
                '<b>%{text}</b><br>' +
                'Population: %{x:,.0f}<br>' +
                'GDP per Capita: $%{y:,.0f}<br>' +
                '<extra></extra>'
        };
        
        traces.push(trace);
    });
    
    const layout = {
        ...plotlyLayout,
        xaxis: {
            title: 'Population (log scale)',
            type: 'log',
            gridcolor: '#e5e5ea',
            showline: true,
            linecolor: '#e5e5ea'
        },
        yaxis: {
            title: 'GDP per Capita (USD)',
            gridcolor: '#e5e5ea',
            showline: true,
            linecolor: '#e5e5ea'
        },
        legend: {
            x: 1,
            xanchor: 'right',
            y: 1,
            bgcolor: 'rgba(255,255,255,0.8)',
            bordercolor: '#e5e5ea',
            borderwidth: 1
        },
        hovermode: 'closest'
    };
    
    Plotly.newPlot(container, traces, layout, plotlyConfig);
    
    console.log('✅ Scatter plot dibujado');
}

// ═══════════════════════════════════════════════════════════════════
// 7. GRÁFICA 3: MATRIZ DE COMPARACIÓN REGIONAL
// ═══════════════════════════════════════════════════════════════════

function drawMatrixComparison() {
    const container = document.getElementById('matrix-chart');
    if (!container) return;
    
    // Calcular métricas por región
    const regionMetrics = marketData.regions.map(region => {
        const totalGDP = region.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        const totalPop = region.countries.reduce((sum, c) => sum + c.population, 0);
        const avgGdpPerCapita = region.countries.reduce((sum, c) => 
            sum + (c.gdpPerCapita * c.gdpTotal), 0) / totalGDP;
        const numCountries = region.countries.length;
        
        return {
            name: region.name,
            totalGDP: totalGDP,
            avgGdpPerCapita: avgGdpPerCapita,
            numCountries: numCountries,
            totalPop: totalPop
        };
    });
    
    const regionNames = regionMetrics.map(r => r.name);
    const colors = regionNames.map(name => regionColors[name]);
    
    // Subplot 1: Total GDP
    const trace1 = {
        x: regionNames,
        y: regionMetrics.map(r => r.totalGDP),
        type: 'bar',
        name: 'Total GDP',
        marker: {
            color: colors,
            opacity: 0.8
        },
        hovertemplate: '<b>%{x}</b><br>Total GDP: $%{y:.0f}B<extra></extra>',
        xaxis: 'x1',
        yaxis: 'y1'
    };
    
    // Subplot 2: Avg GDP per Capita
    const trace2 = {
        x: regionNames,
        y: regionMetrics.map(r => r.avgGdpPerCapita),
        type: 'bar',
        name: 'Avg GDP/Capita',
        marker: {
            color: colors,
            opacity: 0.8
        },
        hovertemplate: '<b>%{x}</b><br>Avg GDP/Capita: $%{y:,.0f}<extra></extra>',
        xaxis: 'x2',
        yaxis: 'y2'
    };
    
    // Subplot 3: Number of Countries
    const trace3 = {
        x: regionNames,
        y: regionMetrics.map(r => r.numCountries),
        type: 'bar',
        name: 'Countries',
        marker: {
            color: colors,
            opacity: 0.8
        },
        hovertemplate: '<b>%{x}</b><br>Countries: %{y}<extra></extra>',
        xaxis: 'x3',
        yaxis: 'y3'
    };
    
    // Subplot 4: Total Population
    const trace4 = {
        x: regionNames,
        y: regionMetrics.map(r => r.totalPop / 1000000),
        type: 'bar',
        name: 'Population',
        marker: {
            color: colors,
            opacity: 0.8
        },
        hovertemplate: '<b>%{x}</b><br>Population: %{y:.0f}M<extra></extra>',
        xaxis: 'x4',
        yaxis: 'y4'
    };
    
    const data = [trace1, trace2, trace3, trace4];
    
    const layout = {
        ...plotlyLayout,
        grid: {
            rows: 2,
            columns: 2,
            pattern: 'independent',
            roworder: 'top to bottom'
        },
        showlegend: false,
        
        xaxis1: { 
            title: '',
            tickangle: -45,
            domain: [0, 0.45]
        },
        yaxis1: { 
            title: 'Total GDP (Billions $)',
            domain: [0.55, 1]
        },
        
        xaxis2: { 
            title: '',
            tickangle: -45,
            domain: [0.55, 1]
        },
        yaxis2: { 
            title: 'Avg GDP per Capita ($)',
            domain: [0.55, 1]
        },
        
        xaxis3: { 
            title: '',
            tickangle: -45,
            domain: [0, 0.45]
        },
        yaxis3: { 
            title: 'Number of Countries',
            domain: [0, 0.45]
        },
        
        xaxis4: { 
            title: '',
            tickangle: -45,
            domain: [0.55, 1]
        },
        yaxis4: { 
            title: 'Total Population (M)',
            domain: [0, 0.45]
        },
        
        margin: { t: 40, r: 40, b: 100, l: 80 }
    };
    
    Plotly.newPlot(container, data, layout, plotlyConfig);
    
    console.log('✅ Matriz de comparación dibujada');
}

// ═══════════════════════════════════════════════════════════════════
// 8. GRÁFICA 4: SUNBURST CHART
// ═══════════════════════════════════════════════════════════════════

function drawSunburst() {
    const container = document.getElementById('sunburst-chart');
    if (!container) return;
    
    // Preparar datos para sunburst
    const labels = ['Global'];
    const parents = [''];
    const values = [0];
    const colors = ['#ffffff'];
    
    let totalGlobal = 0;
    
    // Agregar regiones y países
    marketData.regions.forEach(region => {
        const regionTotal = region.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        totalGlobal += regionTotal;
        
        labels.push(region.name);
        parents.push('Global');
        values.push(regionTotal);
        colors.push(regionColors[region.name]);
        
        // Agregar países
        region.countries.forEach(country => {
            labels.push(country.name);
            parents.push(region.name);
            values.push(country.gdpTotal);
            
            // Usar color de región pero con variación
            colors.push(regionColors[region.name]);
        });
    });
    
    values[0] = totalGlobal;
    
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
        hovertemplate: 
            '<b>%{label}</b><br>' +
            'GDP: $%{value:.0f}B<br>' +
            'Percentage: %{percentParent}<br>' +
            '<extra></extra>',
        textfont: {
            size: 12,
            family: '-apple-system'
        },
        insidetextorientation: 'radial'
    }];
    
    const layout = {
        ...plotlyLayout,
        margin: { t: 20, r: 20, b: 20, l: 20 },
        sunburstcolorway: Object.values(regionColors)
    };
    
    Plotly.newPlot(container, data, layout, plotlyConfig);
    
    console.log('✅ Sunburst chart dibujado');
}

// ═══════════════════════════════════════════════════════════════════
// 9. RESPONSIVE RESIZE
// ═══════════════════════════════════════════════════════════════════

function setupResponsiveResize() {
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const activeTab = document.querySelector('.tab-content.active');
            if (activeTab) {
                const tabId = activeTab.id;
                
                // Redibujar todas las gráficas de la pestaña activa
                if (tabId === 'market-overview') {
                    Plotly.Plots.resize('treemap-chart');
                    Plotly.Plots.resize('scatter-chart');
                } else if (tabId === 'regional-analysis') {
                    Plotly.Plots.resize('matrix-chart');
                    Plotly.Plots.resize('sunburst-chart');
                }
            }
        }, 250);
    });
}

// ═══════════════════════════════════════════════════════════════════
// 10. UTILIDADES
// ═══════════════════════════════════════════════════════════════════

function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

console.log('✅ JavaScript cargado correctamente');