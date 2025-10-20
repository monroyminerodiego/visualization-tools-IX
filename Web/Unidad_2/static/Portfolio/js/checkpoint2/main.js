/**
 * ═══════════════════════════════════════════════════════════════════
 * TERRA COTTA FOODS - GLOBAL MARKET ANALYTICS DASHBOARD
 * Hierarchical Market Analysis for Global Expansion
 * ═══════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════
// 1. GLOBAL DATA - Updated and Complete Dataset
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
                { name: 'Argentina', population: 45380000, gdpPerCapita: 10636, gdpTotal: 483, code: 'ARG' },
                { name: 'Colombia', population: 50880000, gdpPerCapita: 6104, gdpTotal: 311, code: 'COL' },
                { name: 'Chile', population: 19120000, gdpPerCapita: 15355, gdpTotal: 294, code: 'CHL' },
                { name: 'Peru', population: 33000000, gdpPerCapita: 6692, gdpTotal: 221, code: 'PER' }
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
// 2. COLOR CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

const regionColors = {
    'Asia Pacific': '#10b981',
    'North America': '#667eea',
    'Europe': '#f59e0b',
    'Latin America': '#ec4899',
    'Middle East & Africa': '#8b5cf6'
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
// 3. INITIALIZATION
// ═══════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Terra Cotta Foods Dashboard initializing...');
    
    try {
        updateKPICards();
        updateMarketOverview();
        setupResponsiveResize();
        
        console.log('✅ Dashboard initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing dashboard:', error);
    }
});

function updateKPICards() {
    const kpis = calculateGlobalKPIs();
    
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
}

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
    
    const top5 = allCountries
        .sort((a, b) => b.gdpTotal - a.gdpTotal)
        .slice(0, 5);
    
    const top5GDP = top5.reduce((sum, c) => sum + c.gdpTotal, 0);
    const top5Concentration = (top5GDP / totalGDP) * 100;
    
    return {
        totalGDP: totalGDP / 1000,
        totalPopulation: totalPopulation / 1000000000,
        regionsCount: marketData.regions.length,
        top5Concentration: top5Concentration,
        top5Countries: top5.map(c => c.name)
    };
}

// ═══════════════════════════════════════════════════════════════════
// 4. TAB SYSTEM
// ═══════════════════════════════════════════════════════════════════

function changeTab(tabName) {
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.remove('active'));
    
    const allButtons = document.querySelectorAll('.tab-button');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
    
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
    generateRecommendationsTable();
}

// ═══════════════════════════════════════════════════════════════════
// 5. TREEMAP - FIXED WITH PROPER HIERARCHY
// ═══════════════════════════════════════════════════════════════════

function drawTreemap() {
    const container = document.getElementById('treemap-chart');
    if (!container) return;
    
    const labels = [];
    const parents = [];
    const values = [];
    const colors = [];
    const texts = [];
    
    // Add Global root
    labels.push('Global Market');
    parents.push('');
    values.push(0);
    colors.push('rgba(102, 126, 234, 0.1)');
    texts.push('');
    
    let totalGlobal = 0;
    
    // Sort regions by GDP
    const sortedRegions = [...marketData.regions].sort((a, b) => {
        const totalA = a.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        const totalB = b.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        return totalB - totalA;
    });
    
    // Add regions and countries
    sortedRegions.forEach(region => {
        const regionTotal = region.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        totalGlobal += regionTotal;
        
        // Add region
        labels.push(region.name);
        parents.push('Global Market');
        values.push(regionTotal);
        colors.push(regionColors[region.name]);
        texts.push(`<b>${region.name}</b><br>$${regionTotal.toFixed(0)}B`);
        
        // Sort countries within region
        const sortedCountries = [...region.countries].sort((a, b) => b.gdpTotal - a.gdpTotal);
        
        // Add countries
        sortedCountries.forEach(country => {
            labels.push(country.name);
            parents.push(region.name);
            values.push(country.gdpTotal);
            
            // Lighter shade for countries
            const rgb = hexToRgb(regionColors[region.name]);
            colors.push(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`);
            texts.push(`<b>${country.name}</b><br>$${country.gdpTotal.toFixed(0)}B`);
        });
    });
    
    // Update global value
    values[0] = totalGlobal;
    texts[0] = `<b>Total Global GDP</b><br>$${totalGlobal.toFixed(0)}B`;
    
    const data = [{
        type: 'treemap',
        labels: labels,
        parents: parents,
        values: values,
        text: texts,
        textposition: 'middle center',
        textfont: { 
            size: 13, 
            color: '#fff',
            family: '-apple-system, BlinkMacSystemFont, sans-serif'
        },
        hovertemplate: '<b>%{label}</b><br>GDP: %{value:.0f}B<br><extra></extra>',
        marker: {
            colors: colors,
            line: { width: 2, color: 'white' },
            pad: { t: 25, l: 3, r: 3, b: 3 }
        },
        branchvalues: 'total',
        pathbar: {
            visible: true,
            thickness: 25,
            textfont: { 
                size: 14, 
                family: '-apple-system',
                color: '#1e293b'
            },
            edgeshape: '/'
        }
    }];
    
    const layout = {
        ...plotlyLayout,
        title: {
            text: '<b>Purchasing Power Hierarchy: Global → Region → Country</b><br>' +
                  '<sub>Size = Total GDP (market capacity) | Click to explore regions</sub>',
            font: { size: 17, color: '#1e293b', family: '-apple-system' },
            x: 0.05,
            xanchor: 'left'
        },
        margin: { t: 90, r: 10, b: 10, l: 10 },
        height: 600
    };
    
    Plotly.newPlot(container, data, layout, plotlyConfig);
}

// ═══════════════════════════════════════════════════════════════════
// 6. SCATTER PLOT - ENHANCED
// ═══════════════════════════════════════════════════════════════════

function drawScatterPlot() {
    const container = document.getElementById('scatter-chart');
    if (!container) return;
    
    const traces = [];
    
    marketData.regions.forEach(region => {
        const x = region.countries.map(c => c.population);
        const y = region.countries.map(c => c.gdpPerCapita);
        const sizes = region.countries.map(c => c.gdpTotal);
        const labels = region.countries.map(c => c.name);
        const codes = region.countries.map(c => c.code);
        
        // Scale bubble sizes proportionally
        const MIN_SIZE = 15;
        const MAX_SIZE = 60;
        const maxGDP = Math.max(...sizes);
        const minGDP = Math.min(...sizes);
        
        const scaledSizes = sizes.map(gdp => {
            const normalized = (gdp - minGDP) / (maxGDP - minGDP);
            return MIN_SIZE + (normalized * (MAX_SIZE - MIN_SIZE));
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
                size: 9,
                color: '#fff',
                family: 'monospace',
                weight: 'bold'
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
                '<i>Workforce:</i><br>' +
                'Population: %{customdata.population:,.0f}<br>' +
                '<br>' +
                '<i>Purchasing Power:</i><br>' +
                'GDP per Capita: $%{customdata.gdpPerCapita:,.0f}<br>' +
                '<br>' +
                '<i>Market Size:</i><br>' +
                'Total GDP: $%{customdata.gdpTotal:.0f}B<br>' +
                '<extra></extra>'
        };
        
        traces.push(trace);
    });
    
    const layout = {
        ...plotlyLayout,
        title: {
            text: '<b>Viability Matrix: Population vs Purchasing Power</b><br>' +
                  '<sub>X-Axis = Workforce | Y-Axis = Purchasing Power | Size = Total GDP</sub>',
            font: { size: 17, color: '#1e293b' },
            x: 0.05,
            xanchor: 'left'
        },
        xaxis: {
            title: {
                text: '<b>Population (log scale)</b><br><i>Workforce / Consumer Base</i>',
                font: { size: 13, color: '#475569' }
            },
            type: 'log',
            gridcolor: '#e2e8f0',
            showline: true,
            linecolor: '#cbd5e1',
            linewidth: 2
        },
        yaxis: {
            title: {
                text: '<b>GDP per Capita (USD)</b><br><i>Individual Purchasing Power</i>',
                font: { size: 13, color: '#475569' }
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
            font: { size: 11 }
        },
        hovermode: 'closest',
        height: 600
    };
    
    Plotly.newPlot(container, traces, layout, plotlyConfig);
}

// ═══════════════════════════════════════════════════════════════════
// 7. MATRIX COMPARISON - 4 METRICS (CORREGIDO COMPLETAMENTE)
// ═══════════════════════════════════════════════════════════════════

function drawMatrixComparison() {
    const container = document.getElementById('matrix-chart');
    if (!container) return;
    
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
    
    regionMetrics.sort((a, b) => b.totalGDP - a.totalGDP);
    
    const regionNames = regionMetrics.map(r => r.name);
    const colors = regionNames.map(name => regionColors[name]);
    
    const traces = [];
    
    // Total GDP
    traces.push({
        x: regionNames,
        y: regionMetrics.map(r => r.totalGDP),
        type: 'bar',
        name: 'Total GDP',
        marker: { color: colors, opacity: 0.85 },
        text: regionMetrics.map(r => `$${r.totalGDP.toFixed(0)}B`),
        textposition: 'outside',
        textfont: { size: 9 },
        hovertemplate: '<b>%{x}</b><br>Total GDP: $%{y:.0f}B<extra></extra>',
        xaxis: 'x1',
        yaxis: 'y1'
    });
    
    // GDP per Capita
    traces.push({
        x: regionNames,
        y: regionMetrics.map(r => r.avgGdpPerCapita),
        type: 'bar',
        name: 'GDP per Capita',
        marker: { color: colors, opacity: 0.85 },
        text: regionMetrics.map(r => `$${(r.avgGdpPerCapita/1000).toFixed(1)}K`),
        textposition: 'outside',
        textfont: { size: 9 },
        hovertemplate: '<b>%{x}</b><br>GDP per Capita: $%{y:,.0f}<extra></extra>',
        xaxis: 'x2',
        yaxis: 'y2'
    });
    
    // Number of Countries
    traces.push({
        x: regionNames,
        y: regionMetrics.map(r => r.numCountries),
        type: 'bar',
        name: 'Countries',
        marker: { color: colors, opacity: 0.85 },
        text: regionMetrics.map(r => r.numCountries),
        textposition: 'outside',
        textfont: { size: 9 },
        hovertemplate: '<b>%{x}</b><br>Countries: %{y}<extra></extra>',
        xaxis: 'x3',
        yaxis: 'y3'
    });
    
    // Population
    traces.push({
        x: regionNames,
        y: regionMetrics.map(r => r.totalPop / 1000000),
        type: 'bar',
        name: 'Population',
        marker: { color: colors, opacity: 0.85 },
        text: regionMetrics.map(r => `${(r.totalPop/1000000).toFixed(0)}M`),
        textposition: 'outside',
        textfont: { size: 9 },
        hovertemplate: '<b>%{x}</b><br>Population: %{y:.0f}M<extra></extra>',
        xaxis: 'x4',
        yaxis: 'y4'
    });
    
    const layout = {
        ...plotlyLayout,
        title: {
            text: '<b>Multi-Dimensional Regional Comparison</b><br>' +
                  '<sub>Evaluating regions across 4 key strategic metrics</sub>',
            font: { size: 17, color: '#1e293b' },
            x: 0.5,
            xanchor: 'center'
        },
        grid: {
            rows: 2,
            columns: 2,
            pattern: 'independent',
            roworder: 'top to bottom',
            xgap: 0.18,
            ygap: 0.25
        },
        showlegend: false,
        
        // Subplot 1: Total GDP (top-left)
        xaxis1: { 
            title: {
                text: '<b>Total GDP</b><br><i>(Market Capacity)</i>',
                font: { size: 10, color: '#64748b' }
            },
            tickangle: 0,
            tickfont: { size: 8 },
            domain: [0, 0.41],
            showgrid: false,
            automargin: true
        },
        yaxis1: { 
            title: {
                text: 'Billions USD',
                font: { size: 9 }
            },
            domain: [0.62, 1],
            gridcolor: '#e2e8f0',
            tickfont: { size: 8 }
        },
        
        // Subplot 2: GDP per Capita (top-right)
        xaxis2: { 
            title: {
                text: '<b>GDP per Capita</b><br><i>(Purchasing Power)</i>',
                font: { size: 10, color: '#64748b' }
            },
            tickangle: 0,
            tickfont: { size: 8 },
            domain: [0.59, 1],
            showgrid: false,
            automargin: true
        },
        yaxis2: { 
            title: {
                text: 'USD per Capita',
                font: { size: 9 }
            },
            domain: [0.62, 1],
            gridcolor: '#e2e8f0',
            tickfont: { size: 8 }
        },
        
        // Subplot 3: Number of Countries (bottom-left)
        xaxis3: { 
            title: {
                text: '<b>Number of Countries</b><br><i>(Diversification)</i>',
                font: { size: 10, color: '#64748b' }
            },
            tickangle: 0,
            tickfont: { size: 8 },
            domain: [0, 0.41],
            showgrid: false,
            automargin: true
        },
        yaxis3: { 
            title: {
                text: 'Country Count',
                font: { size: 9 }
            },
            domain: [0, 0.38],
            gridcolor: '#e2e8f0',
            tickfont: { size: 8 }
        },
        
        // Subplot 4: Population (bottom-right)
        xaxis4: { 
            title: {
                text: '<b>Total Population</b><br><i>(Workforce)</i>',
                font: { size: 10, color: '#64748b' }
            },
            tickangle: 0,
            tickfont: { size: 8 },
            domain: [0.59, 1],
            showgrid: false,
            automargin: true
        },
        yaxis4: { 
            title: {
                text: 'Millions',
                font: { size: 9 }
            },
            domain: [0, 0.38],
            gridcolor: '#e2e8f0',
            tickfont: { size: 8 }
        },
        
        margin: { t: 100, r: 50, b: 160, l: 80 },
        height: 850
    };
    
    Plotly.newPlot(container, traces, layout, plotlyConfig);
}

// ═══════════════════════════════════════════════════════════════════
// 8. SUNBURST CHART - PROPORTIONAL STRUCTURE
// ═══════════════════════════════════════════════════════════════════

function drawSunburst() {
    const container = document.getElementById('sunburst-chart');
    if (!container) return;
    
    const labels = [];
    const parents = [];
    const values = [];
    const colors = [];
    
    // Add Global root
    labels.push('Global');
    parents.push('');
    values.push(0);
    colors.push('rgba(102, 126, 234, 0.2)');
    
    let totalGlobal = 0;
    
    // Sort regions by GDP
    const sortedRegions = [...marketData.regions].sort((a, b) => {
        const totalA = a.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        const totalB = b.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        return totalB - totalA;
    });
    
    // Add regions and countries
    sortedRegions.forEach(region => {
        const regionTotal = region.countries.reduce((sum, c) => sum + c.gdpTotal, 0);
        totalGlobal += regionTotal;
        
        labels.push(region.name);
        parents.push('Global');
        values.push(regionTotal);
        colors.push(regionColors[region.name]);
        
        // Sort countries within region
        const sortedCountries = [...region.countries].sort((a, b) => b.gdpTotal - a.gdpTotal);
        
        sortedCountries.forEach(country => {
            labels.push(country.name);
            parents.push(region.name);
            values.push(country.gdpTotal);
            
            // Lighter shade for countries
            const rgb = hexToRgb(regionColors[region.name]);
            colors.push(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.75)`);
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
            'Share: %{percentParent}<br>' +
            '<extra></extra>',
        textfont: {
            size: 12,
            family: '-apple-system',
            color: '#fff'
        },
        insidetextorientation: 'radial',
        leaf: { opacity: 0.8 }
    }];
    
    const layout = {
        ...plotlyLayout,
        title: {
            text: '<b>Hierarchical Market Structure</b><br>' +
                  '<sub>Center = Regions | Outer rings = Countries | Click to explore</sub>',
            font: { size: 17, color: '#1e293b' },
            x: 0.5,
            xanchor: 'center'
        },
        margin: { t: 80, r: 20, b: 20, l: 20 },
        height: 600,
        sunburstcolorway: Object.values(regionColors)
    };
    
    Plotly.newPlot(container, data, layout, plotlyConfig);
}

// ═══════════════════════════════════════════════════════════════════
// 9. RECOMMENDATIONS TABLE
// ═══════════════════════════════════════════════════════════════════

function generateRecommendationsTable() {
    const container = document.getElementById('recommendations-table');
    if (!container) return;
    
    const allCountries = [];
    marketData.regions.forEach(region => {
        region.countries.forEach(country => {
            allCountries.push({
                ...country,
                region: region.name
            });
        });
    });
    
    const top10 = allCountries
        .sort((a, b) => b.gdpTotal - a.gdpTotal)
        .slice(0, 10);
    
    let tableHTML = `
        <div class="recommendations-section">
            <h3 style="color: #1e293b; margin-bottom: 20px; font-size: 1.3em;">
                🎯 Top 10 Priority Markets for Investment
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">#</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Country</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Region</th>
                        <th style="padding: 12px; text-align: right; border: 1px solid #cbd5e1;">Total GDP</th>
                        <th style="padding: 12px; text-align: right; border: 1px solid #cbd5e1;">GDP per Capita</th>
                        <th style="padding: 12px; text-align: right; border: 1px solid #cbd5e1;">Population</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Strategic Recommendation</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    top10.forEach((country, index) => {
        const rowColor = index % 2 === 0 ? '#f8fafc' : '#ffffff';
        
        let recommendation = '';
        if (country.gdpTotal > 10000) {
            recommendation = '🌟 Giant Market - Maximum Priority';
        } else if (country.gdpTotal > 3000 && country.gdpPerCapita > 40000) {
            recommendation = '💎 High Value - Premium Products';
        } else if (country.population > 200000000) {
            recommendation = '👥 Massive Base - Economies of Scale';
        } else if (country.gdpPerCapita > 50000) {
            recommendation = '💰 High Purchasing Power';
        } else {
            recommendation = '📈 Viable Emerging Market';
        }
        
        tableHTML += `
            <tr style="background: ${rowColor};">
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #667eea;">${index + 1}</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: 600;">${country.name}</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0;">
                    <span style="background: ${regionColors[country.region]}; color: white; padding: 4px 10px; border-radius: 4px; font-size: 11px;">
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
            <h3 style="margin-bottom: 16px; font-size: 1.2em;">💡 Strategic Insights for Marco Antonelli</h3>
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>Priority Distribution Centers:</strong> Asia Pacific (highest total GDP), followed by North America and Europe
                </li>
                <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>High-Value Markets:</strong> USA, China, Japan, and Germany represent the core of global market
                </li>
                <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>Latin America Opportunity:</strong> Brazil and Mexico offer significant population with growing market
                </li>
                <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>Pricing Strategy:</strong> Europe requires premium products; Asia needs cost-quality balance
                </li>
                <li style="padding-left: 24px; position: relative;">
                    <span style="position: absolute; left: 0; font-size: 18px;">✓</span>
                    <strong>Population-Economy Correlation:</strong> China and India have massive population but require lower unit-cost products
                </li>
            </ul>
        </div>
    `;
    
    container.innerHTML = tableHTML;
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
            } catch (error) {
                console.warn('⚠️ Resize error:', error);
            }
        }, 250);
    });
}

// ═══════════════════════════════════════════════════════════════════
// 11. UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

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

// ═══════════════════════════════════════════════════════════════════
// 12. GLOBAL EXPORTS
// ═══════════════════════════════════════════════════════════════════

window.TCFDashboard = {
    version: '2.0.0',
    changeTab: changeTab,
    refreshAllCharts: function() {
        updateMarketOverview();
        updateRegionalAnalysis();
        updateStrategicInsights();
    },
    getKPIs: calculateGlobalKPIs,
    marketData: marketData
};

console.log('✅ TCF Dashboard JavaScript initialized - v2.0.0');
console.log('📖 Documentation: window.TCFDashboard');