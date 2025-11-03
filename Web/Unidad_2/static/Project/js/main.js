/**
 * ═══════════════════════════════════════════════════════════════════
 * TECH SALARY ANALYTICS DASHBOARD - COMPLETE JAVASCRIPT (CORRECTED)
 * Spatiotemporal + Hierarchical + Network Analysis (Pure D3.js)
 * Consumes data from tech_salary_analytics.json
 * ═══════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════
// 1. GLOBAL VARIABLES FOR DATA
// ═══════════════════════════════════════════════════════════════════

let globalSalaryData = [];
let departmentData = {};
let worldMapData = {};
let hierarchicalData = {};
let topJobsByRegion = {};
let networkData = {};
let statsData = {};
let topInfluencers = [];
let degreeDistribution = [];
let communityData = [];

const departmentColors = {
    'Cybersecurity': '#667eea',
    'Executive & Leadership': '#f59e0b',
    'Engineering & Development': '#10b981',
    'Operations': '#ec4899',
    'Data & Analytics': '#8b5cf6',
    'Sales & Consulting': '#06b6d4',
    'Information Technology': '#f97316',
    'Finance & Accounting': '#ef4444',
    'Legal & Compliance': '#14b8a6',
    'Human Resources': '#eab308',
    'Product Management': '#3b82f6'
};

const hierarchicalColors = {
    'North America': '#667eea',
    'Europe': '#f59e0b',
    'Asia Pacific': '#10b981',
    'South America': '#ec4899',
    'Africa & Middle East': '#06b6d4',  // ✅ NUEVO: Añadido para evitar negro
    'Other Regions': '#8b5cf6'  // ✅ NUEVO: Para regiones agrupadas
};

const iso3ToId = {
    // North America
    'USA': 840, 'CAN': 124, 'MEX': 484, 'CRI': 188,
    
    // Europe (30 países)
    'GBR': 826, 'DEU': 276, 'NLD': 528, 'AUT': 40, 'SVK': 703,
    'FRA': 250, 'ESP': 724, 'LTU': 440, 'ITA': 380, 'IRL': 372,
    'POL': 616, 'PRT': 620, 'GRC': 300, 'LVA': 428, 'CHE': 756,
    'BEL': 56, 'EST': 233, 'TUR': 792, 'FIN': 246, 'DNK': 208,
    'BGR': 100, 'HRV': 191, 'ROU': 642, 'SWE': 752, 'CZE': 203,
    'SVN': 705, 'HUN': 348, 'SMR': 674, 'MLT': 470, 'RUS': 643,
    'CYP': 196,
    
    // Asia Pacific (12 países)
    'AUS': 36, 'IND': 356, 'NZL': 554, 'KOR': 410, 'JPN': 392,
    'SGP': 702, 'PHL': 608, 'PAK': 586, 'IDN': 360, 'THA': 764,
    'MYS': 458, 'CHN': 156,
    
    // South America (4 países)
    'BRA': 76, 'ARG': 32, 'COL': 170, 'CHL': 152,
    
    // Africa & Middle East (11 países)
    'EGY': 818, 'ZAF': 710, 'ARE': 784, 'DJI': 262, 'KWT': 414,
    'KEN': 404, 'ISR': 376, 'RWA': 646, 'IRQ': 368, 'NGA': 566,
    'MAR': 504
};

// ═══════════════════════════════════════════════════════════════════
// 2. DATA LOADING FUNCTION
// ═══════════════════════════════════════════════════════════════════

async function loadTechSalaryData() {
    try {
        console.log('📥 Loading Tech Salary Analytics data...');
        console.log('🔍 Current URL:', window.location.href);
        
        const possiblePaths = [
            '/project/tech_salary_analytics.json',  // Nueva ruta Flask
            '/static/Project/js/tech_salary_analytics.json',
            './tech_salary_analytics.json',
            'tech_salary_analytics.json',
            '../tech_salary_analytics.json'
        ];
        
        let response = null;
        let successfulPath = null;
        
        for (const path of possiblePaths) {
            console.log(`🔄 Trying path: ${path}`);
            try {
                response = await fetch(path);
                if (response.ok) {
                    successfulPath = path;
                    console.log(`✅ Successful path: ${path}`);
                    break;
                }
            } catch (err) {
                console.log(`❌ Failed path: ${path}`);
            }
        }
        
        if (!response || !response.ok) {
            throw new Error('Could not load JSON from any path');
        }
        
        const data = await response.json();
        
        // Cargar datos espaciotemporales
        globalSalaryData = data.spatiotemporal.globalSalaryData;
        departmentData = data.spatiotemporal.departmentData;
        worldMapData = data.spatiotemporal.worldMapData;
        
        // Cargar datos jerárquicos
        hierarchicalData = {
            regions: data.hierarchical.regions
        };
        topJobsByRegion = data.hierarchical.topJobsByRegion;
        
        // Cargar datos de red
        networkData = data.network.network;
        statsData = data.network.stats;
        topInfluencers = data.network.topInfluencers;
        degreeDistribution = data.network.degreeDistribution;
        communityData = data.network.communities;
        
        console.log('✅ Data loaded successfully:');
        console.log(`   • Spatiotemporal: ${globalSalaryData.length} years, ${Object.keys(departmentData).length} departments`);
        console.log(`   • Hierarchical: ${hierarchicalData.regions.length} regions`);
        console.log(`   • Network: ${statsData.num_nodes} nodes, ${statsData.num_edges} edges`);
        console.log(`   • Metadata: ${data.metadata.total_records} total records`);
        
        return true;
        
    } catch (error) {
        console.error('❌ Error loading data:', error);
        alert('Error loading tech salary data. Check that tech_salary_analytics.json is in the correct location.');
        return false;
    }
}

// ═══════════════════════════════════════════════════════════════════
// 3. TOOLTIP SYSTEM
// ═══════════════════════════════════════════════════════════════════

function showTooltip(event, html) {
    const tooltip = d3.select('#tooltip');
    tooltip.html(html);
    tooltip.style('opacity', 1);

    const tooltipNode = tooltip.node();
    const tooltipWidth = tooltipNode.offsetWidth;
    const tooltipHeight = tooltipNode.offsetHeight;

    let left = event.clientX + 15;
    let top = event.clientY - tooltipHeight - 15;

    if (left + tooltipWidth > window.innerWidth) {
        left = event.clientX - tooltipWidth - 15;
    }
    if (top < 0) {
        top = event.clientY + 15;
    }
    if (top + tooltipHeight > window.innerHeight) {
        top = window.innerHeight - tooltipHeight - 10;
    }
    if (left < 0) {
        left = 10;
    }

    tooltip.style('left', left + 'px').style('top', top + 'px');
}

function hideTooltip() {
    d3.select('#tooltip').style('opacity', 0);
}

// ═══════════════════════════════════════════════════════════════════
// 4. TAB SYSTEM
// ═══════════════════════════════════════════════════════════════════

function changeTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

    const selectedTab = document.getElementById(tabName);
    if (selectedTab) selectedTab.classList.add('active');

    const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedButton) selectedButton.classList.add('active');

    if (tabName === 'spatiotemporal') {
        setTimeout(() => updateSpatiotemporalCharts(), 100);
    } else if (tabName === 'hierarchical') {
        setTimeout(() => updateHierarchicalCharts(), 100);
    } else if (tabName === 'detalle') {
        setTimeout(() => updateNetworkCharts(), 100);
    }
}

// ═══════════════════════════════════════════════════════════════════
// 5. INITIALIZATION
// ═══════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Dashboard initializing...');
    
    const dataLoaded = await loadTechSalaryData();
    
    if (dataLoaded) {
        updateSpatiotemporalCharts();
        setupResponsiveResize();
        console.log('✅ Dashboard initialized successfully');
    } else {
        console.error('❌ Failed to initialize dashboard');
    }
});

function setupResponsiveResize() {
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const activeTab = document.querySelector('.tab-content.active');
            if (activeTab) {
                if (activeTab.id === 'spatiotemporal') {
                    updateSpatiotemporalCharts();
                } else if (activeTab.id === 'hierarchical') {
                    updateHierarchicalCharts();
                } else if (activeTab.id === 'detalle') {
                    updateNetworkCharts();
                }
            }
        }, 250);
    });
}

// ═══════════════════════════════════════════════════════════════════
// 6. SPATIOTEMPORAL ANALYSIS - 4 CHARTS
// ═══════════════════════════════════════════════════════════════════

function updateSpatiotemporalCharts() {
    drawWorldMap();
    drawTopCountriesChart();
    drawDepartmentEvolution();
    drawTemporalEvolution();
}

// ═══════════════════════════════════════════════════════════════════
// 7. CHART 1: WORLD MAP
// ═══════════════════════════════════════════════════════════════════

function drawWorldMap() {
    const container = d3.select('#world-map-chart');
    container.html('');

    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;

    const margin = { top: 50, right: 10, bottom: 50, left: 10 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .style('display', 'block');

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const jobsMap = new Map();
    worldMapData.countries.forEach(d => {
        const numericId = iso3ToId[d.code];
        if (numericId) {
            jobsMap.set(numericId, d);
            jobsMap.set(numericId.toString(), d);
            jobsMap.set(String(numericId), d);
        }
    });

    const maxJobs = d3.max(worldMapData.countries, d => d.jobs);
    const colorScale = d3.scaleLinear()
        .domain([0, maxJobs])
        .range(['#e3f2fd', '#1565c0']);

    const projection = d3.geoMercator()
        .scale(width / 7.5)
        .center([0, 20])
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .translateExtent([[0, 0], [width, height]])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    svg.call(zoom);

    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        .then(world => {
            if (typeof topojson === 'undefined') {
                console.error("❌ topojson is not defined");
                return;
            }
            
            const countries = topojson.feature(world, world.objects.countries);

            g.selectAll('path')
                .data(countries.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('fill', d => {
                    let countryData = jobsMap.get(parseInt(d.id)) ||
                                     jobsMap.get(d.id) ||
                                     jobsMap.get(String(d.id));
                    return countryData ? colorScale(countryData.jobs) : '#e5e7eb';
                })
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 0.5)
                .attr('class', 'country')
                .style('cursor', 'pointer')
                .on('mouseover', function(event, d) {
                    let countryData = jobsMap.get(parseInt(d.id)) ||
                                     jobsMap.get(d.id) ||
                                     jobsMap.get(String(d.id));

                    d3.select(this)
                        .attr('stroke', '#000')
                        .attr('stroke-width', 2)
                        .style('filter', 'brightness(1.2)');

                    if (countryData) {
                        showTooltip(event, `
                            <strong>${countryData.name}</strong><br/>
                            Code: ${countryData.code}<br/>
                            Tech Jobs: <span style="color: #34C759; font-weight: bold;">${countryData.jobs.toLocaleString()}</span><br/>
                            Avg Salary: <span style="color: #007AFF; font-weight: bold;">$${countryData.avgSalary.toLocaleString()}</span>
                        `);
                    }
                })
                .on('mouseout', function() {
                    d3.select(this)
                        .attr('stroke', '#ffffff')
                        .attr('stroke-width', 0.5)
                        .style('filter', 'none');
                    hideTooltip();
                });

            worldMapData.countries.forEach(country => {
                const numericId = iso3ToId[country.code];
                const feature = countries.features.find(f => parseInt(f.id) === numericId);

                if (feature) {
                    const centroid = d3.geoCentroid(feature);
                    const projected = projection(centroid);

                    if (projected && !isNaN(projected[0]) && !isNaN(projected[1])) {
                        g.append('text')
                            .attr('x', projected[0])
                            .attr('y', projected[1])
                            .attr('text-anchor', 'middle')
                            .attr('dominant-baseline', 'middle')
                            .attr('font-weight', 'bold')
                            .attr('font-size', '11px')
                            .attr('fill', '#000')
                            .attr('stroke', '#fff')
                            .attr('stroke-width', 3)
                            .attr('paint-order', 'stroke')
                            .style('pointer-events', 'none')
                            .text(country.code);
                    }
                }
            });

            addLegend(svg, colorScale, containerWidth, containerHeight, maxJobs);

            svg.append('text')
                .attr('x', containerWidth / 2)
                .attr('y', 25)
                .attr('text-anchor', 'middle')
                .attr('fill', '#666')
                .attr('font-size', '13px')
                .attr('font-weight', '600')
                .style('pointer-events', 'none')
                .text('💡 Use mouse wheel to zoom • Drag to move around');

            console.log('✅ World map drawn');
        })
        .catch(error => {
            console.error('❌ Error loading map:', error);
        });
}

function addLegend(svg, colorScale, containerWidth, containerHeight, maxValue) {
    const legendWidth = 200;
    const legendHeight = 10;
    const legendX = containerWidth - legendWidth - 30;
    const legendY = containerHeight - 35;

    const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${legendX},${legendY})`);

    const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'legend-gradient-jobs')
        .attr('x1', '0%')
        .attr('x2', '100%');

    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#e3f2fd');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#1565c0');

    legend.append('rect')
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#legend-gradient-jobs)')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 1);

    legend.append('text')
        .attr('x', 0)
        .attr('y', -5)
        .style('font-size', '10px')
        .attr('fill', '#666')
        .text('Low Jobs');

    legend.append('text')
        .attr('x', legendWidth)
        .attr('y', -5)
        .attr('text-anchor', 'end')
        .style('font-size', '10px')
        .attr('fill', '#666')
        .text(`High Jobs (${(maxValue/1000).toFixed(1)}K)`);
}

// ═══════════════════════════════════════════════════════════════════
// 8. CHART 2: TOP COUNTRIES
// ═══════════════════════════════════════════════════════════════════

function drawTopCountriesChart() {
    const container = d3.select('#top-countries-chart');
    container.html('');

    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;

    const margin = { top: 20, right: 30, bottom: 40, left: 120 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .style('display', 'block')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const sortedCountries = [...worldMapData.countries]
    .sort((a, b) => b.jobs - a.jobs)
    .slice(0, 10);  // ✅ Solo top 10

    const x = d3.scaleLinear()
        .domain([0, d3.max(sortedCountries, d => d.jobs)])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(sortedCountries.map(d => d.name))
        .range([0, height])
        .padding(0.2);

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => (d/1000).toFixed(0) + 'K'));

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));

    svg.selectAll('rect')
        .data(sortedCountries)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', d => y(d.name))
        .attr('width', d => x(d.jobs))
        .attr('height', y.bandwidth())
        .attr('fill', '#667eea')
        .attr('opacity', 0.8)
        .attr('rx', 4)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 1);
            showTooltip(event, `
                <strong>${d.name}</strong><br/>
                Jobs: ${d.jobs.toLocaleString()}<br/>
                Avg Salary: $${d.avgSalary.toLocaleString()}
            `);
        })
        .on('mousemove', function(event, d) {
            showTooltip(event, `
                <strong>${d.name}</strong><br/>
                Jobs: ${d.jobs.toLocaleString()}<br/>
                Avg Salary: $${d.avgSalary.toLocaleString()}
            `);
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            hideTooltip();
        });

    svg.selectAll('.label')
        .data(sortedCountries)
        .enter()
        .append('text')
        .attr('x', d => x(d.jobs) + 5)
        .attr('y', d => y(d.name) + y.bandwidth() / 2)
        .attr('dominant-baseline', 'middle')
        .style('font-size', '11px')
        .style('font-weight', 'bold')
        .attr('fill', '#333')
        .text(d => d.jobs.toLocaleString());

    console.log('✅ Top countries chart drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 9. CHART 3: DEPARTMENT EVOLUTION
// ═══════════════════════════════════════════════════════════════════

function drawDepartmentEvolution() {
    const container = d3.select('#department-evolution-chart');
    container.html('');

    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;

    const margin = { top: 20, right: 120, bottom: 60, left: 80 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // ✅ NUEVO: Calcular Top 5 Departamentos por salario promedio
    const departmentAvg = Object.entries(departmentData).map(([dept, data]) => ({
        name: dept,
        avgSalary: d3.mean(data, d => d.salary),
        data: data
    })).sort((a, b) => b.avgSalary - a.avgSalary).slice(0, 5);

    const top5Departments = {};
    departmentAvg.forEach(d => {
        top5Departments[d.name] = d.data;
    });

    const allYears = Array.from(new Set(
        Object.values(top5Departments).flat().map(d => d.year)
    )).sort();

    const x = d3.scaleLinear()
        .domain([d3.min(allYears), d3.max(allYears)])
        .range([0, width]);

    const allSalaries = Object.values(top5Departments).flat().map(d => d.salary);
    const y = d3.scaleLinear()
        .domain([d3.min(allSalaries) * 0.9, d3.max(allSalaries) * 1.1])
        .range([height, 0]);

    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y).tickFormat(d => `$${(d / 1000).toFixed(0)}K`));

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 50)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Year');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -60)
        .attr('x', -(height / 2))
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Average Salary (USD)');

    if (allYears.includes(2023)) {
        svg.append('line')
            .attr('x1', x(2023))
            .attr('x2', x(2023))
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke', '#dc3545')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '5,5');

        svg.append('text')
            .attr('x', x(2023))
            .attr('y', -10)
            .attr('text-anchor', 'middle')
            .style('font-size', '11px')
            .style('font-weight', 'bold')
            .attr('fill', '#dc3545')
            .text('AI Mass Adoption');
    }

    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.salary))
        .curve(d3.curveMonotoneX);

    const activeDepartments = new Set(Object.keys(top5Departments));

    Object.entries(top5Departments).forEach(([dept, data]) => {
        const deptColor = departmentColors[dept] || '#666';
        
        const lineGroup = svg.append('g')
            .attr('class', `dept-group dept-group-${dept.replace(/\s+/g, '-')}`);

        lineGroup.append('path')
            .datum(data)
            .attr('class', `line-${dept.replace(/\s+/g, '-')}`)
            .attr('fill', 'none')
            .attr('stroke', deptColor)
            .attr('stroke-width', 3)
            .attr('d', line)
            .style('opacity', 0.8);

        lineGroup.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => x(d.year))
            .attr('cy', d => y(d.salary))
            .attr('r', 5)
            .attr('fill', deptColor)
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer')
            .on('mouseover', function(event, d) {
                d3.select(this).attr('r', 8);
                showTooltip(event, `
                    <strong>${dept}</strong><br/>
                    Year: ${d.year}<br/>
                    Salary: <span style="color: ${deptColor}">$${d.salary.toLocaleString()}</span>
                `);
            })
            .on('mousemove', function(event, d) {
                showTooltip(event, `
                    <strong>${dept}</strong><br/>
                    Year: ${d.year}<br/>
                    Salary: <span style="color: ${deptColor}">$${d.salary.toLocaleString()}</span>
                `);
            })
            .on('mouseout', function() {
                d3.select(this).attr('r', 5);
                hideTooltip();
            });
    });

    const legendX = width + 15;
    const legendY = 0;
    const lineHeight = 24;

    const legend = svg.append('g')
        .attr('class', 'compact-legend')
        .attr('transform', `translate(${legendX},${legendY})`);

    Object.keys(top5Departments).forEach((dept, i) => {
        const deptColor = departmentColors[dept] || '#666';
        
        const legendItem = legend.append('g')
            .attr('class', `legend-item legend-item-${dept.replace(/\s+/g, '-')}`)
            .attr('transform', `translate(0,${i * lineHeight})`)
            .style('cursor', 'pointer')
            .on('click', function() {
                const isActive = activeDepartments.has(dept);
                if (isActive) {
                    activeDepartments.delete(dept);
                    d3.select(this).style('opacity', 0.3);
                    svg.select(`.dept-group-${dept.replace(/\s+/g, '-')}`).style('opacity', 0.1);
                } else {
                    activeDepartments.add(dept);
                    d3.select(this).style('opacity', 1);
                    svg.select(`.dept-group-${dept.replace(/\s+/g, '-')}`).style('opacity', 1);
                }
            });

        legendItem.append('line')
            .attr('x1', 0)
            .attr('x2', 20)
            .attr('y1', 0)
            .attr('y2', 0)
            .attr('stroke', deptColor)
            .attr('stroke-width', 3);

        const shortLabel = dept.length > 18 ? dept.substring(0, 16) + '...' : dept;
        legendItem.append('text')
            .attr('x', 24)
            .attr('y', 4)
            .style('font-size', '11px')
            .style('font-weight', '500')
            .attr('fill', '#333')
            .text(shortLabel)
            .append('title')
            .text(dept);
    });

    console.log('✅ Top 5 Departments evolution chart drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 10. CHART 4: TEMPORAL EVOLUTION
// ═══════════════════════════════════════════════════════════════════

function drawTemporalEvolution() {
    const container = d3.select('#temporal-evolution-chart');
    container.html('');

    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;

    const margin = { top: 40, right: 30, bottom: 60, left: 80 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([d3.min(globalSalaryData, d => d.year), d3.max(globalSalaryData, d => d.year)])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([d3.min(globalSalaryData, d => d.salary) * 0.9, d3.max(globalSalaryData, d => d.salary) * 1.1])
        .range([height, 0]);

    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y).tickFormat(d => `$${(d / 1000).toFixed(0)}K`));

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 50)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Year');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -60)
        .attr('x', -(height / 2))
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Average Salary (USD)');

    // Línea de adopción de IA (si existe año 2023)
    if (globalSalaryData.some(d => d.year === 2023)) {
        svg.append('line')
            .attr('x1', x(2023))
            .attr('x2', x(2023))
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke', '#dc3545')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '5,5');

        svg.append('text')
            .attr('x', x(2023))
            .attr('y', -10)
            .attr('text-anchor', 'middle')
            .style('font-size', '11px')
            .style('font-weight', 'bold')
            .attr('fill', '#dc3545')
            .text('AI Mass Adoption');
    }

    const area = d3.area()
        .x(d => x(d.year))
        .y0(height)
        .y1(d => y(d.salary))
        .curve(d3.curveMonotoneX);

    const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'area-gradient')
        .attr('x1', '0%')
        .attr('x2', '100%');

    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#007AFF')
        .attr('stop-opacity', 0.3);

    gradient.append('stop')
        .attr('offset', '40%')
        .attr('stop-color', '#007AFF')
        .attr('stop-opacity', 0.3);

    gradient.append('stop')
        .attr('offset', '60%')
        .attr('stop-color', '#34C759')
        .attr('stop-opacity', 0.3);

    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#34C759')
        .attr('stop-opacity', 0.3);

    svg.append('path')
        .datum(globalSalaryData)
        .attr('fill', 'url(#area-gradient)')
        .attr('d', area);

    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.salary))
        .curve(d3.curveMonotoneX);

    svg.append('path')
        .datum(globalSalaryData)
        .attr('fill', 'none')
        .attr('stroke', '#007AFF')
        .attr('stroke-width', 3)
        .attr('d', line);

    svg.selectAll('circle')
        .data(globalSalaryData)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.year))
        .attr('cy', d => y(d.salary))
        .attr('r', 6)
        .attr('fill', d => d.year >= 2023 ? '#34C759' : '#007AFF')
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            d3.select(this).attr('r', 9);
            const growth = d.year > globalSalaryData[0].year ?
                ((d.salary - globalSalaryData[0].salary) / globalSalaryData[0].salary * 100).toFixed(1) : 0;
            showTooltip(event, `
                <strong>${d.year}</strong><br/>
                Salary: <span style="color: #34C759">$${d.salary.toLocaleString()}</span><br/>
                ${d.year > globalSalaryData[0].year ? `Growth: +${growth}%` : 'Base Year'}
            `);
        })
        .on('mousemove', function(event, d) {
            const growth = d.year > globalSalaryData[0].year ?
                ((d.salary - globalSalaryData[0].salary) / globalSalaryData[0].salary * 100).toFixed(1) : 0;
            showTooltip(event, `
                <strong>${d.year}</strong><br/>
                Salary: <span style="color: #34C759">$${d.salary.toLocaleString()}</span><br/>
                ${d.year > globalSalaryData[0].year ? `Growth: +${growth}%` : 'Base Year'}
            `);
        })
        .on('mouseout', function() {
            d3.select(this).attr('r', 6);
            hideTooltip();
        });

    svg.selectAll('.value-label')
        .data(globalSalaryData)
        .enter()
        .append('text')
        .attr('x', d => x(d.year))
        .attr('y', d => y(d.salary) - 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('font-weight', 'bold')
        .attr('fill', '#333')
        .text(d => `$${(d.salary / 1000).toFixed(0)}K`);

    const totalGrowth = ((globalSalaryData[globalSalaryData.length - 1].salary - globalSalaryData[0].salary) / globalSalaryData[0].salary * 100).toFixed(1);
    svg.append('text')
        .attr('x', width - 10)
        .attr('y', 15)
        .attr('text-anchor', 'end')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .attr('fill', '#34C759')
        .text(`Total Growth: +${totalGrowth}%`);

    console.log('✅ Temporal evolution chart drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 11. HIERARCHICAL ANALYSIS - UPDATE ALL CHARTS
// ═══════════════════════════════════════════════════════════════════

function updateHierarchicalCharts() {
    console.log('🔄 Updating hierarchical charts...');
    drawHierarchicalTreemap();
    drawHierarchicalBubble();
    drawHierarchicalSunburst();
    drawHierarchicalMatrix();
}

// ═══════════════════════════════════════════════════════════════════
// 12. HIERARCHICAL TREEMAP (D3 Pure)
// ═══════════════════════════════════════════════════════════════════

function drawHierarchicalTreemap() {
    const container = d3.select('#hierarchical-treemap-chart');
    
    if (!container.select('svg').node()) {
        container.html('');
    }

    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;

    const margin = { top: 60, right: 10, bottom: 30, left: 10 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    let svg = container.select('svg');
    if (svg.empty()) {
        svg = container.append('svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight);
    }

    let g = svg.select('g.main-group');
    if (g.empty()) {
        g = svg.append('g')
            .attr('class', 'main-group')
            .attr('transform', `translate(${margin.left},${margin.top})`);
    }

    if (!window.treemapState) {
        window.treemapState = { view: 'global', region: null };
    }

    // ✅ CAMBIO: Calcular tamaño basado SOLO en totalJobs (no en salario)
    const globalTotal = hierarchicalData.regions.reduce((sum, r) => sum + r.totalJobs, 0);

    function updateTreemap(viewType, selectedRegion = null) {
        let rootData, total, titleText;

        if (viewType === 'global') {
            total = globalTotal;
            
            // ✅ NUEVO: Agrupar regiones < 9%
            const threshold = total * 0.09;
            const mainRegions = [];
            const smallRegions = [];
            
            hierarchicalData.regions.forEach(region => {
                if (region.totalJobs >= threshold) {
                    mainRegions.push(region);
                } else {
                    smallRegions.push(region);
                }
            });

            const children = mainRegions.map(region => {
                const percentage = ((region.totalJobs / total) * 100).toFixed(1);
                return {
                    name: region.name,
                    value: region.totalJobs,  // ✅ CAMBIO: Solo jobs, no jobs*salary
                    percentage: percentage,
                    avgSalary: region.avgSalary,
                    totalJobs: region.totalJobs,
                    type: 'region'
                };
            });

            // ✅ NUEVO: Añadir grupo "Other Regions" si hay regiones pequeñas
            if (smallRegions.length > 0) {
                const otherTotal = smallRegions.reduce((sum, r) => sum + r.totalJobs, 0);
                const otherPercentage = ((otherTotal / total) * 100).toFixed(1);
                const otherAvgSalary = Math.round(
                    smallRegions.reduce((sum, r) => sum + (r.avgSalary * r.totalJobs), 0) / otherTotal
                );
                
                children.push({
                    name: 'Other Regions',
                    value: otherTotal,
                    percentage: otherPercentage,
                    avgSalary: otherAvgSalary,
                    totalJobs: otherTotal,
                    type: 'grouped',
                    regions: smallRegions  // ✅ NUEVO: Guardar regiones agrupadas
                });
            }

            rootData = {
                name: 'Global',
                children: children
            };

            titleText = 'Global View - Click region to drill down (regions <9% are grouped)';

        } else if (viewType === 'grouped') {
            // ✅ NUEVO: Vista de regiones agrupadas
            const groupedRegions = selectedRegion.regions;
            total = groupedRegions.reduce((sum, r) => sum + r.totalJobs, 0);

            const children = groupedRegions.map(region => {
                const percentage = ((region.totalJobs / total) * 100).toFixed(1);
                return {
                    name: region.name,
                    value: region.totalJobs,
                    percentage: percentage,
                    avgSalary: region.avgSalary,
                    totalJobs: region.totalJobs,
                    type: 'region'
                };
            });

            rootData = {
                name: 'Other Regions',
                children: children
            };

            titleText = 'Other Regions (Combined) - Click region to explore countries';

        } else {
            // Vista de países dentro de una región
            const regionData = hierarchicalData.regions.find(r => r.name === selectedRegion);
            total = regionData.totalJobs;

            const children = regionData.countries.map(country => {
                const percentage = ((country.jobs / total) * 100).toFixed(1);
                return {
                    name: country.name,
                    value: country.jobs,
                    percentage: percentage,
                    avgSalary: country.avgSalary,
                    jobs: country.jobs,
                    type: 'country'
                };
            });

            rootData = {
                name: selectedRegion,
                children: children
            };

            titleText = `${selectedRegion} (100%) - Right-click to go back`;
        }

        const root = d3.hierarchy(rootData)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        d3.treemap()
            .size([width, height])
            .paddingTop(30)
            .paddingInner(3)
            (root);

        const cells = g.selectAll('.treemap-cell')
            .data(root.leaves(), d => d.data.name);

        cells.exit()
            .transition()
            .duration(600)
            .style('opacity', 0)
            .remove();

        const cellsEnter = cells.enter()
            .append('g')
            .attr('class', 'treemap-cell')
            .style('opacity', 0);

        cellsEnter.append('rect')
            .attr('class', 'treemap-rect');

        cellsEnter.append('text')
            .attr('class', 'treemap-name');

        cellsEnter.append('text')
            .attr('class', 'treemap-percent');

        cellsEnter.append('text')
            .attr('class', 'treemap-info');

        const cellsMerge = cellsEnter.merge(cells);

        cellsMerge
            .transition()
            .duration(600)
            .style('opacity', 1)
            .attr('transform', d => `translate(${d.x0},${d.y0})`);

        cellsMerge.select('.treemap-rect')
            .style('cursor', d => (d.data.type === 'region' || d.data.type === 'grouped') ? 'pointer' : 'default')
            .on('click', function(event, d) {
                if (d.data.type === 'region') {
                    window.treemapState.view = 'region';
                    window.treemapState.region = d.data.name;
                    updateTreemap('region', d.data.name);
                } else if (d.data.type === 'grouped') {
                    window.treemapState.view = 'grouped';
                    window.treemapState.region = d.data;
                    updateTreemap('grouped', d.data);
                }
            })
            .on('contextmenu', function(event) {
                event.preventDefault();
                if (window.treemapState.view !== 'global') {
                    window.treemapState.view = 'global';
                    window.treemapState.region = null;
                    updateTreemap('global');
                }
            })
            .on('mouseover', function(event, d) {
                d3.select(this).attr('stroke-width', 4);
                
                let tooltip = `<strong>${d.data.name}</strong><br/>`;
                tooltip += `<strong>Percentage: ${d.data.percentage}%</strong><br/><br/>`;
                
                if (d.data.type === 'region' || d.data.type === 'grouped') {
                    tooltip += `Total Jobs: ${d.data.totalJobs.toLocaleString()}<br/>`;
                    tooltip += `Avg Salary: $${d.data.avgSalary.toLocaleString()}<br/>`;
                    tooltip += `<em>Click to explore ${d.data.type === 'grouped' ? 'regions' : 'countries'}</em>`;
                } else {
                    tooltip += `Jobs: ${d.data.jobs.toLocaleString()}<br/>`;
                    tooltip += `Avg Salary: $${d.data.avgSalary.toLocaleString()}`;
                }
                
                showTooltip(event, tooltip);
            })
            .on('mouseout', function() {
                d3.select(this).attr('stroke-width', 2);
                hideTooltip();
            })
            .transition()
            .duration(600)
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('fill', d => {
                if (d.data.type === 'grouped') {
                    return hierarchicalColors['Other Regions'];
                } else if (d.data.type === 'region') {
                    return hierarchicalColors[d.data.name] || '#ccc';
                } else {
                    const region = window.treemapState.region;
                    const regionName = typeof region === 'string' ? region : 'Other Regions';
                    return d3.color(hierarchicalColors[regionName] || '#ccc').brighter(0.3);
                }
            })
            .attr('opacity', 0.85)
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .attr('rx', 4);

        cellsMerge.select('.treemap-name')
            .transition()
            .duration(600)
            .attr('x', 8)
            .attr('y', 18)
            .style('font-size', '13px')
            .style('font-weight', 'bold')
            .style('fill', 'white')
            .style('pointer-events', 'none')
            .text(d => (d.x1 - d.x0) > 70 ? d.data.name : '');

        cellsMerge.select('.treemap-percent')
            .transition()
            .duration(600)
            .attr('x', 8)
            .attr('y', 40)
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .style('fill', 'white')
            .style('pointer-events', 'none')
            .text(d => (d.x1 - d.x0) > 70 ? `${d.data.percentage}%` : '');

        cellsMerge.select('.treemap-info')
            .transition()
            .duration(600)
            .attr('x', 8)
            .attr('y', 56)
            .style('font-size', '11px')
            .style('fill', 'white')
            .style('pointer-events', 'none')
            .text(d => {
                if ((d.x1 - d.x0) < 70) return '';
                if (d.data.type === 'region' || d.data.type === 'grouped') {
                    return `${d.data.totalJobs.toLocaleString()} jobs`;
                } else {
                    return `$${(d.data.avgSalary / 1000).toFixed(0)}K avg`;
                }
            });

        svg.selectAll('.treemap-title').remove();
        
        svg.append('text')
            .attr('class', 'treemap-title')
            .attr('x', containerWidth / 2)
            .attr('y', 30)
            .attr('text-anchor', 'middle')
            .style('font-size', '14px')
            .style('font-weight', '600')
            .style('fill', '#666')
            .style('opacity', 0)
            .text(titleText)
            .transition()
            .duration(400)
            .style('opacity', 1);

        updateLegend(viewType, selectedRegion);
    }

    function updateLegend(viewType, region) {
        const legendContainer = container.node().parentElement;
        let legend = legendContainer.querySelector('.hierarchical-legend');
        
        if (!legend) {
            legend = document.createElement('div');
            legend.className = 'hierarchical-legend';
            legendContainer.appendChild(legend);
        }

        legend.style.opacity = '0';
        setTimeout(() => {
            legend.innerHTML = '';
            
            if (viewType === 'global') {
                Object.entries(hierarchicalColors).forEach(([name, color]) => {
                    const item = document.createElement('div');
                    item.className = 'hierarchical-legend-item';
                    item.innerHTML = `
                        <div class="hierarchical-legend-color" style="background-color: ${color}"></div>
                        <div>${name}</div>
                    `;
                    legend.appendChild(item);
                });
            } else {
                const regionName = typeof region === 'string' ? region : 'Other Regions';
                const item = document.createElement('div');
                item.className = 'hierarchical-legend-item';
                item.innerHTML = `
                    <div class="hierarchical-legend-color" style="background-color: ${hierarchicalColors[regionName]}"></div>
                    <div>${regionName} = 100%</div>
                `;
                legend.appendChild(item);
            }
            
            legend.style.transition = 'opacity 0.4s';
            legend.style.opacity = '1';
        }, 300);
    }

    updateTreemap(window.treemapState.view, window.treemapState.region);
    console.log('✅ Treemap with grouping (<9%) and correct sizing drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 13. HIERARCHICAL BUBBLE CHART
// ═══════════════════════════════════════════════════════════════════

function drawHierarchicalBubble() {
    const container = d3.select('#hierarchical-bubble-chart');
    container.html('');

    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;

    // ✅ CAMBIO: Márgenes más grandes para evitar solapamiento
    const margin = { top: 40, right: 120, bottom: 80, left: 120 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const bubbleData = hierarchicalData.regions.map(region => ({
        name: region.name,
        jobs: region.totalJobs,
        avgSalary: region.avgSalary,
        totalPayroll: region.totalJobs * region.avgSalary,
        countries: region.countries.length
    }));

    // ✅ CAMBIO: Escalas ajustadas para mejor distribución
    const x = d3.scaleLinear()
        .domain([0, d3.max(bubbleData, d => d.jobs) * 1.15])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([d3.min(bubbleData, d => d.avgSalary) * 0.90, d3.max(bubbleData, d => d.avgSalary) * 1.10])
        .range([height, 0]);

    // ✅ CAMBIO: Burbujas más pequeñas
    const size = d3.scaleSqrt()
        .domain([0, d3.max(bubbleData, d => d.totalPayroll)])
        .range([25, 55]);

    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));

    svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickSize(-height).tickFormat(''));

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => d >= 1000 ? (d / 1000).toFixed(1) + 'K' : d));

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y).tickFormat(d => `$${(d / 1000).toFixed(0)}K`));

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 60)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Total Tech Jobs (Market Size)');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -80)
        .attr('x', -(height / 2))
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Average Salary (Compensation Level)');

    svg.selectAll('circle')
        .data(bubbleData)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.jobs))
        .attr('cy', d => y(d.avgSalary))
        .attr('r', d => size(d.totalPayroll))
        .attr('fill', d => hierarchicalColors[d.name] || '#ccc')
        .attr('opacity', 0.7)
        .attr('stroke', 'white')
        .attr('stroke-width', 3)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            d3.select(this)
                .attr('opacity', 1)
                .attr('stroke-width', 4);
            showTooltip(event, `
                <strong>${d.name}</strong><br/>
                <hr style="margin: 6px 0; border: none; border-top: 1px solid rgba(255,255,255,0.3);">
                Countries: <strong>${d.countries}</strong><br/>
                Total Jobs: <strong>${d.jobs.toLocaleString()}</strong><br/>
                Avg Salary: <strong style="color: #34C759">$${d.avgSalary.toLocaleString()}</strong><br/>
                Total Payroll: <strong style="color: #007AFF">$${(d.totalPayroll / 1000000).toFixed(1)}M</strong><br/>
                <em style="opacity: 0.8; font-size: 11px;">Regional aggregate</em>
            `);
        })
        .on('mousemove', function(event, d) {
            showTooltip(event, `
                <strong>${d.name}</strong><br/>
                <hr style="margin: 6px 0; border: none; border-top: 1px solid rgba(255,255,255,0.3);">
                Countries: <strong>${d.countries}</strong><br/>
                Total Jobs: <strong>${d.jobs.toLocaleString()}</strong><br/>
                Avg Salary: <strong style="color: #34C759">$${d.avgSalary.toLocaleString()}</strong><br/>
                Total Payroll: <strong style="color: #007AFF">$${(d.totalPayroll / 1000000).toFixed(1)}M</strong><br/>
                <em style="opacity: 0.8; font-size: 11px;">Regional aggregate</em>
            `);
        })
        .on('mouseout', function() {
            d3.select(this)
                .attr('opacity', 0.7)
                .attr('stroke-width', 3);
            hideTooltip();
        });

    // ✅ CAMBIO: Etiquetas más pequeñas y mejor posicionadas
    svg.selectAll('.region-label')
        .data(bubbleData)
        .enter()
        .append('text')
        .attr('x', d => x(d.jobs))
        .attr('y', d => y(d.avgSalary))
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('font-size', '13px')
        .style('font-weight', 'bold')
        .style('fill', 'white')
        .style('pointer-events', 'none')
        .style('text-shadow', '2px 2px 4px rgba(0,0,0,0.5)')
        .text(d => {
            if (d.name === 'North America') return 'N. America';
            if (d.name === 'South America') return 'S. America';
            if (d.name === 'Asia Pacific') return 'Asia Pac.';
            if (d.name === 'Africa & Middle East') return 'Africa & ME';
            return d.name;
        });

    svg.selectAll('.region-sublabel')
        .data(bubbleData)
        .enter()
        .append('text')
        .attr('x', d => x(d.jobs))
        .attr('y', d => y(d.avgSalary) + 16)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('font-weight', '500')
        .style('fill', 'white')
        .style('pointer-events', 'none')
        .style('opacity', '0.9')
        .style('text-shadow', '1px 1px 3px rgba(0,0,0,0.6)')
        .text(d => `${(d.jobs / 1000).toFixed(1)}K jobs`);

    console.log('✅ Hierarchical bubble chart (improved spacing) drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 14. HIERARCHICAL SUNBURST
// ═══════════════════════════════════════════════════════════════════

function drawHierarchicalSunburst() {
    const container = d3.select('#hierarchical-sunburst-chart');
    
    if (!container.select('svg').node()) {
        container.html('');
    }

    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;

    const width = Math.min(containerWidth, containerHeight - 40);
    const radius = width / 2;

    let svg = container.select('svg');
    if (svg.empty()) {
        svg = container.append('svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight);
    }

    let g = svg.select('g.sunburst-group');
    if (g.empty()) {
        g = svg.append('g')
            .attr('class', 'sunburst-group')
            .attr('transform', `translate(${containerWidth / 2},${containerHeight / 2})`);
    }

    if (!window.sunburstState) {
        window.sunburstState = { view: 'regions', region: null };
    }

    function updateSunburst(viewType, selectedRegion = null) {
        let rootData, centerText;

        if (viewType === 'regions') {
            const children = hierarchicalData.regions.map(region => ({
                name: region.name,
                value: region.totalJobs,
                avgSalary: region.avgSalary,
                totalJobs: region.totalJobs
            }));

            rootData = {
                name: 'Global',
                children: children
            };

            centerText = 'Click Region';

        } else {
            const regionJobs = topJobsByRegion[selectedRegion] || [];
            
            // ✅ CAMBIO: SOLO Top 5, sin "Other Roles"
            const top5 = [...regionJobs]
                .sort((a, b) => b.avgSalary - a.avgSalary)
                .slice(0, 5);

            const children = top5.map(role => ({
                name: role.role,
                value: role.jobs,
                avgSalary: role.avgSalary,
                jobs: role.jobs,
                type: 'role'
            }));

            rootData = {
                name: selectedRegion,
                children: children
            };

            centerText = 'Top 5\nRoles';
        }

        const root = d3.hierarchy(rootData)
            .sum(d => d.value || 0)
            .sort((a, b) => b.value - a.value);

        const partition = d3.partition()
            .size([2 * Math.PI, radius]);

        partition(root);

        const arc = d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .innerRadius(d => d.y0)
            .outerRadius(d => d.y1);

        const paths = g.selectAll('path')
            .data(root.descendants(), d => d.data.name);

        paths.exit()
            .transition()
            .duration(500)
            .style('opacity', 0)
            .remove();

        const pathsEnter = paths.enter()
            .append('path')
            .style('opacity', 0);

        const pathsMerge = pathsEnter.merge(paths);

        pathsMerge
            .style('cursor', d => d.depth > 0 ? 'pointer' : 'default')
            .on('click', function(event, d) {
                if (d.depth === 1 && window.sunburstState.view === 'regions') {
                    window.sunburstState.view = 'roles';
                    window.sunburstState.region = d.data.name;
                    updateSunburst('roles', d.data.name);
                }
            })
            .on('contextmenu', function(event) {
                event.preventDefault();
                if (window.sunburstState.view === 'roles') {
                    window.sunburstState.view = 'regions';
                    window.sunburstState.region = null;
                    updateSunburst('regions');
                }
            })
            .on('mouseover', function(event, d) {
                if (d.depth === 0) return;
                d3.select(this).attr('opacity', 0.7).attr('stroke-width', 3);
                
                let tooltip = `<strong>${d.data.name}</strong><br/>`;
                
                if (viewType === 'regions' && d.depth === 1) {
                    tooltip += `Total Jobs: ${d.data.totalJobs.toLocaleString()}<br/>`;
                    tooltip += `Avg Salary: $${d.data.avgSalary.toLocaleString()}<br/>`;
                    tooltip += `<em>Click to see top 5 roles</em>`;
                } else if (viewType === 'roles' && d.depth === 1) {
                    tooltip += `Jobs: ${d.data.jobs.toLocaleString()}<br/>`;
                    tooltip += `Avg Salary: $${d.data.avgSalary.toLocaleString()}`;
                }
                
                showTooltip(event, tooltip);
            })
            .on('mouseout', function(event, d) {
                if (d.depth === 0) return;
                d3.select(this).attr('opacity', 1).attr('stroke-width', 1.5);
                hideTooltip();
            })
            .transition()
            .duration(500)
            .style('opacity', 1)
            .attr('d', arc)
            .attr('fill', d => {
                if (d.depth === 0) return '#f5f5f7';
                if (viewType === 'regions') {
                    return hierarchicalColors[d.data.name] || '#ccc';
                } else {
                    const baseColor = hierarchicalColors[selectedRegion] || '#ccc';
                    return d3.color(baseColor).brighter(0.4);
                }
            })
            .attr('stroke', 'white')
            .attr('stroke-width', 1.5);

        g.selectAll('.sunburst-label').remove();
        
        g.selectAll('.sunburst-label')
            .data(root.descendants().filter(d => d.depth === 1 && (d.x1 - d.x0) > 0.1))
            .enter()
            .append('text')
            .attr('class', 'sunburst-label')
            .attr('transform', d => {
                const angle = (d.x0 + d.x1) / 2 * 180 / Math.PI - 90;
                const radius = (d.y0 + d.y1) / 2;
                return `rotate(${angle}) translate(${radius},0) rotate(${angle > 90 ? 180 : 0})`;
            })
            .attr('text-anchor', 'middle')
            .style('font-size', viewType === 'regions' ? '13px' : '9px')
            .style('font-weight', 'bold')
            .style('fill', 'white')
            .style('pointer-events', 'none')
            .style('opacity', 0)
            .text(d => {
                if (viewType === 'regions') return d.data.name;
                return d.data.name.length > 15 ? d.data.name.substring(0, 12) + '...' : d.data.name;
            })
            .transition()
            .duration(500)
            .style('opacity', 1);

        g.selectAll('.sunburst-center').remove();
        
        const centerLines = centerText.split('\n');
        centerLines.forEach((line, i) => {
            g.append('text')
                .attr('class', 'sunburst-center')
                .attr('text-anchor', 'middle')
                .attr('y', (i - centerLines.length / 2 + 0.5) * 18)
                .style('font-size', '14px')
                .style('font-weight', 'bold')
                .style('fill', '#333')
                .style('opacity', 0)
                .text(line)
                .transition()
                .duration(500)
                .style('opacity', 1);
        });
    }

    updateSunburst(window.sunburstState.view, window.sunburstState.region);
    console.log('✅ Sunburst with ONLY top 5 roles drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 15. HIERARCHICAL MATRIX (4 BAR CHARTS)
// ═══════════════════════════════════════════════════════════════════

function drawHierarchicalMatrix() {
    const container = d3.select('#hierarchical-matrix-chart');
    container.html('');

    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;

    const chartHeight = (containerHeight - 40) / 4;
    const margin = { top: 20, right: 40, bottom: 30, left: 150 };
    const width = containerWidth - margin.left - margin.right;

    const metrics = [
        {
            title: 'Average Salary (USD)',
            data: hierarchicalData.regions.map(r => ({ name: r.name, value: r.avgSalary })),
            format: d => `$${(d / 1000).toFixed(0)}K`,
            color: '#667eea'
        },
        {
            title: 'Total Jobs',
            data: hierarchicalData.regions.map(r => ({ name: r.name, value: r.totalJobs })),
            format: d => d >= 1000 ? (d / 1000).toFixed(1) + 'K' : d.toString(),
            color: '#f59e0b'
        },
        {
            title: 'Number of Countries',
            data: hierarchicalData.regions.map(r => ({ name: r.name, value: r.countries.length })),
            format: d => d.toString(),
            color: '#10b981'
        },
        {
            title: 'Salary Range (Max - Min)',
            data: hierarchicalData.regions.map(r => {
                const salaries = r.countries.map(c => c.avgSalary);
                const range = salaries.length > 1 ? Math.max(...salaries) - Math.min(...salaries) : 0;
                return { name: r.name, value: range };
            }),
            format: d => `$${(d / 1000).toFixed(0)}K`,
            color: '#ec4899'
        }
    ];

    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight);

    metrics.forEach((metric, index) => {
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${index * chartHeight + 30})`);

        const sortedData = metric.data.sort((a, b) => b.value - a.value);

        const x = d3.scaleLinear()
            .domain([0, d3.max(sortedData, d => d.value)])
            .range([0, width]);

        const y = d3.scaleBand()
            .domain(sortedData.map(d => d.name))
            .range([0, chartHeight - margin.bottom - margin.top])
            .padding(0.2);

        g.selectAll('rect')
            .data(sortedData)
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', d => y(d.name))
            .attr('width', d => x(d.value))
            .attr('height', y.bandwidth())
            .attr('fill', metric.color)
            .attr('opacity', 0.8)
            .attr('rx', 4)
            .style('cursor', 'pointer')
            .on('mouseover', function(event, d) {
                d3.select(this).attr('opacity', 1);
                showTooltip(event, `
                    <strong>${d.name}</strong><br/>
                    ${metric.title}: ${metric.format(d.value)}
                `);
            })
            .on('mousemove', function(event, d) {
                showTooltip(event, `
                    <strong>${d.name}</strong><br/>
                    ${metric.title}: ${metric.format(d.value)}
                `);
            })
            .on('mouseout', function() {
                d3.select(this).attr('opacity', 0.8);
                hideTooltip();
            });

        g.selectAll('.value-label')
            .data(sortedData)
            .enter()
            .append('text')
            .attr('x', d => x(d.value) + 5)
            .attr('y', d => y(d.name) + y.bandwidth() / 2)
            .attr('dominant-baseline', 'middle')
            .style('font-size', '10px')
            .style('font-weight', 'bold')
            .attr('fill', '#333')
            .text(d => metric.format(d.value));

        g.append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(y));

        g.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0,${chartHeight - margin.bottom - margin.top})`)
            .call(d3.axisBottom(x).ticks(5).tickFormat(metric.format));

        g.append('text')
        .attr('x', -10)
        .attr('y', -10)
        .attr('text-anchor', 'start')
        .style('font-size', '13px')
        .style('font-weight', 'bold')
        .attr('fill', metric.color)
        .text(index === 0 ? `${metric.title} (${sortedData.length} Regions)` : metric.title);
    });

    console.log('✅ Hierarchical Matrix drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 16. NETWORK ANALYSIS - UPDATE ALL CHARTS
// ═══════════════════════════════════════════════════════════════════

function updateNetworkCharts() {
    console.log('🔄 Updating network charts...');
    drawNetworkForceDirected();
    drawNetworkCentrality();
    drawNetworkCommunity();
}

// ═══════════════════════════════════════════════════════════════════
// 17. NETWORK CHART 1: FORCE-DIRECTED GRAPH
// ═══════════════════════════════════════════════════════════════════

function drawNetworkForceDirected() {
    const container = d3.select('#network-force-chart');
    container.html('');

    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;

    const width = containerWidth;
    const height = containerHeight;

    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g');

    const zoom = d3.zoom()
        .scaleExtent([0.5, 3])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    svg.call(zoom);

    const colorScale = d3.scaleOrdinal()
        .domain([1, 2, 3, 4])
        .range(['#667eea', '#f59e0b', '#10b981', '#ec4899']);

    const sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(networkData.nodes, d => d.jobs)])
        .range([5, 30]);

    // ✅ CAMBIO: Mejor distribución visual
    const simulation = d3.forceSimulation(networkData.nodes)
        .force('link', d3.forceLink(networkData.links).id(d => d.id).distance(150).strength(0.5))
        .force('charge', d3.forceManyBody().strength(-800))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => sizeScale(d.jobs) + 15))
        .force('x', d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY(height / 2).strength(0.05));

    const link = g.append('g')
        .selectAll('line')
        .data(networkData.links)
        .enter()
        .append('line')
        .attr('class', 'network-link')
        .attr('stroke-width', d => Math.sqrt(d.value / 50));

    const node = g.append('g')
        .selectAll('circle')
        .data(networkData.nodes)
        .enter()
        .append('circle')
        .attr('class', 'network-node')
        .attr('r', d => sizeScale(d.jobs))
        .attr('fill', d => colorScale(d.group))
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended))
        .on('mouseover', function(event, d) {
            d3.select(this).classed('highlighted', true);
            
            link.classed('highlighted', l => l.source.id === d.id || l.target.id === d.id);
            
            // ✅ CAMBIO: Mostrar nombre completo del país
            const countryName = worldMapData.countries.find(c => c.code === d.id)?.name || d.name;
            
            showTooltip(event, `
                <strong>${countryName}</strong><br/>
                Code: ${d.id}<br/>
                Region: ${d.region}<br/>
                <hr style="margin: 6px 0; border: none; border-top: 1px solid rgba(255,255,255,0.3);">
                Tech Jobs: <strong style="color: #34C759">${d.jobs.toLocaleString()}</strong><br/>
                Avg Salary: <strong style="color: #007AFF">$${d.avg_salary.toLocaleString()}</strong><br/>
                Network Degree: <strong>${d.degree}</strong><br/>
                In-Degree: ${d.in_degree} | Out-Degree: ${d.out_degree}<br/>
                Community: ${d.group}
            `);
        })
        .on('mouseout', function() {
            d3.select(this).classed('highlighted', false);
            link.classed('highlighted', false);
            hideTooltip();
        });

    const label = g.append('g')
        .selectAll('text')
        .data(networkData.nodes)
        .enter()
        .append('text')
        .attr('class', d => d.jobs > 5000 ? 'network-label large' : 'network-label')
        .text(d => d.id);

    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

        label
            .attr('x', d => d.x)
            .attr('y', d => d.y + 4);
    });

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    const totalNodes = networkData.nodes.length;
    const totalLinks = networkData.links.length;
    const avgDegree = d3.mean(networkData.nodes, d => d.degree).toFixed(1);
    const density = (2 * totalLinks / (totalNodes * (totalNodes - 1))).toFixed(3);

    const statsContainer = container.node().parentElement;
    let statsDiv = statsContainer.querySelector('.network-stats');
    if (!statsDiv) {
        statsDiv = document.createElement('div');
        statsDiv.className = 'network-stats';
        statsContainer.appendChild(statsDiv);
    }

    statsDiv.innerHTML = `
        <div class="network-stat">
            <span class="network-stat-value">${totalNodes}</span>
            <span class="network-stat-label">Countries</span>
        </div>
        <div class="network-stat">
            <span class="network-stat-value">${totalLinks}</span>
            <span class="network-stat-label">Connections</span>
        </div>
        <div class="network-stat">
            <span class="network-stat-value">${avgDegree}</span>
            <span class="network-stat-label">Avg Degree</span>
        </div>
        <div class="network-stat">
            <span class="network-stat-value">${density}</span>
            <span class="network-stat-label">Density</span>
        </div>
    `;

    console.log('✅ Network force-directed graph drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 18. NETWORK CHART 2: CENTRALITY ANALYSIS
// ═══════════════════════════════════════════════════════════════════

function drawNetworkCentrality() {
    const container = d3.select('#network-centrality-chart');
    container.html('');

    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;

    const margin = { top: 20, right: 40, bottom: 100, left: 80 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // ✅ CAMBIO: Usar topInfluencers del JSON en vez de networkData.nodes
    const top10 = topInfluencers.slice(0, 10).map(node => {
        const countryName = worldMapData.countries.find(c => c.code === node.id)?.name || node.name;
        return {
            ...node,
            fullName: countryName
        };
    });

    const x = d3.scaleBand()
        .domain(top10.map(d => d.id))
        .range([0, width])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(top10, d => d.degree) * 1.1])
        .range([height, 0]);

    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-45)');

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 90)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Country');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -60)
        .attr('x', -(height / 2))
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Network Degree (Centrality)');

    const colorScale = d3.scaleSequential()
        .domain([d3.min(top10, d => d.degree), d3.max(top10, d => d.degree)])
        .interpolator(d3.interpolateBlues);

    svg.selectAll('rect')
        .data(top10)
        .enter()
        .append('rect')
        .attr('x', d => x(d.id))
        .attr('y', d => y(d.degree))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.degree))
        .attr('fill', d => colorScale(d.degree))
        .attr('rx', 4)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 0.7);
            showTooltip(event, `
                <strong>${d.fullName}</strong><br/>
                Code: ${d.id}<br/>
                <hr style="margin: 6px 0; border: none; border-top: 1px solid rgba(255,255,255,0.3);">
                Network Degree: <strong>${d.degree}</strong><br/>
                In-Degree: ${d.in_degree} (incoming)<br/>
                Out-Degree: ${d.out_degree} (outgoing)<br/>
                Total Jobs: ${d.jobs.toLocaleString()}<br/>
                Avg Salary: $${d.avg_salary.toLocaleString()}<br/>
                <em style="opacity: 0.8; font-size: 11px;">Rank: #${top10.indexOf(d) + 1}</em>
            `);
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 1);
            hideTooltip();
        });

    svg.selectAll('.value-label')
        .data(top10)
        .enter()
        .append('text')
        .attr('x', d => x(d.id) + x.bandwidth() / 2)
        .attr('y', d => y(d.degree) - 5)
        .attr('text-anchor', 'middle')
        .style('font-size', '11px')
        .style('font-weight', 'bold')
        .attr('fill', '#333')
        .text(d => d.degree);

    console.log('✅ Network centrality chart drawn (using JSON topInfluencers)');
}

// ═══════════════════════════════════════════════════════════════════
// 19. NETWORK CHART 3: COMMUNITY DETECTION
// ═══════════════════════════════════════════════════════════════════

function drawNetworkCommunity() {
    const container = d3.select('#network-community-chart');
    container.html('');

    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;

    // Márgenes amplios
    const margin = { top: 35, right: 55, bottom: 95, left: 55 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // ✅ Verificar que communityData existe
    if (!communityData || communityData.length === 0) {
        console.error('❌ communityData not found');
        return;
    }

    // ✅ Preparar datos con nombres completos
    // ✅ Preparar datos con nombres completos
    const communities = communityData.map(comm => {
        const membersWithNames = comm.members.map(code => {
            // Buscar país en worldMapData
            const country = worldMapData.countries.find(c => c.code === code);
            
            console.log(`Mapping ${code} to ${country ? country.name : 'NOT FOUND'}`); // Debug
            
            return {
                code: code,
                name: country ? country.name : code
            };
        });
        
        return {
            group: comm.group,
            size: comm.size,
            totalJobs: comm.totalJobs,
            avgDegree: comm.avgDegree,
            avgSalary: comm.avgSalary,
            region: comm.region,
            members: membersWithNames
        };
    });

    console.log('Processed communities:', communities); // Debug

    const colorScale = d3.scaleOrdinal()
        .domain([1, 2, 3, 4])
        .range(['#667eea', '#f59e0b', '#10b981', '#ec4899']);

    // Layout en grid 2x2 con espaciado generoso
    const gridCols = 2;
    const gridRows = 2;
    const cellWidth = width / gridCols;
    const cellHeight = height / gridRows;
    
    // Radio pequeño para evitar solapamiento
    const maxRadius = Math.min(cellWidth, cellHeight) / 2.4;

    communities.forEach((comm, i) => {
        const col = i % gridCols;
        const row = Math.floor(i / gridCols);
        
        // Centrar en cada celda
        const centerX = col * cellWidth + cellWidth / 2;
        const centerY = row * cellHeight + cellHeight / 2;

        const commGroup = g.append('g')
            .attr('transform', `translate(${centerX},${centerY})`);

        // ✅ Gradiente único por comunidad
        const gradientId = `comm-gradient-${comm.group}-${i}`;
        const defs = svg.append('defs');
        const gradient = defs.append('radialGradient')
            .attr('id', gradientId);

        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', colorScale(comm.group))
            .attr('stop-opacity', 0.4);

        gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', colorScale(comm.group))
            .attr('stop-opacity', 0.1);

        // Círculo principal
        commGroup.append('circle')
            .attr('r', maxRadius)
            .attr('fill', `url(#${gradientId})`)
            .attr('stroke', colorScale(comm.group))
            .attr('stroke-width', 4)
            .attr('opacity', 0.9)
            .style('cursor', 'pointer')
            .on('mouseover', function(event) {
                d3.select(this)
                    .attr('stroke-width', 6)
                    .attr('opacity', 1);
                
                // ✅ CORRECCIÓN: Asegurar que estamos tomando los nombres correctos
                const countryNames = comm.members
                    .map(member => {
                        // Buscar el país en worldMapData usando el código
                        const country = worldMapData.countries.find(c => c.code === member.code);
                        // Retornar el nombre si existe, sino el código
                        return country ? country.name : member.code;
                    })
                    .join(', ');
                
                console.log('Community members:', comm.members); // Debug
                console.log('Country names:', countryNames); // Debug
                
                showTooltip(event, `
                    <strong style="font-size: 15px;">Community ${comm.group}</strong><br/>
                    <hr style="margin: 8px 0; border: none; border-top: 1px solid rgba(255,255,255,0.3);">
                    <strong>Metrics:</strong><br/>
                    Countries: <strong style="color: #34C759">${comm.size}</strong><br/>
                    Total Jobs: <strong style="color: #007AFF">${comm.totalJobs.toLocaleString()}</strong><br/>
                    Avg Salary: <strong style="color: #f59e0b">$${comm.avgSalary.toLocaleString()}</strong><br/>
                    Avg Degree: <strong>${comm.avgDegree.toFixed(1)}</strong><br/>
                    Region: ${comm.region}<br/>
                    <hr style="margin: 8px 0; border: none; border-top: 1px solid rgba(255,255,255,0.3);">
                    <div style="max-width: 300px; line-height: 1.5;">
                        <strong style="font-size: 12px;">Member Countries:</strong><br/>
                        <span style="font-size: 11px; opacity: 0.95;">${countryNames}</span>
                    </div>
                `);
            })
            .on('mousemove', function(event) {
                // ✅ CORRECCIÓN: Misma lógica que mouseover
                const countryNames = comm.members
                    .map(member => {
                        const country = worldMapData.countries.find(c => c.code === member.code);
                        return country ? country.name : member.code;
                    })
                    .join(', ');
                
                showTooltip(event, `
                    <strong style="font-size: 15px;">Community ${comm.group}</strong><br/>
                    <hr style="margin: 8px 0; border: none; border-top: 1px solid rgba(255,255,255,0.3);">
                    <strong>Metrics:</strong><br/>
                    Countries: <strong style="color: #34C759">${comm.size}</strong><br/>
                    Total Jobs: <strong style="color: #007AFF">${comm.totalJobs.toLocaleString()}</strong><br/>
                    Avg Salary: <strong style="color: #f59e0b">$${comm.avgSalary.toLocaleString()}</strong><br/>
                    Avg Degree: <strong>${comm.avgDegree.toFixed(1)}</strong><br/>
                    Region: ${comm.region}<br/>
                    <hr style="margin: 8px 0; border: none; border-top: 1px solid rgba(255,255,255,0.3);">
                    <div style="max-width: 300px; line-height: 1.5;">
                        <strong style="font-size: 12px;">Member Countries:</strong><br/>
                        <span style="font-size: 11px; opacity: 0.95;">${countryNames}</span>
                    </div>
                `);
            })
            .on('mouseout', function() {
                d3.select(this)
                    .attr('stroke-width', 4)
                    .attr('opacity', 0.9);
                hideTooltip();
            });

        // Título encima del círculo
        commGroup.append('text')
            .attr('text-anchor', 'middle')
            .attr('y', -maxRadius - 15)
            .style('font-size', '18px')
            .style('font-weight', 'bold')
            .style('fill', colorScale(comm.group))
            .style('pointer-events', 'none')
            .text(`Community ${comm.group}`);

        // Número grande (cantidad de países)
        commGroup.append('text')
            .attr('text-anchor', 'middle')
            .attr('y', -10)
            .style('font-size', '40px')
            .style('font-weight', 'bold')
            .style('fill', '#333')
            .style('pointer-events', 'none')
            .text(comm.size);

        // Label "Countries"
        commGroup.append('text')
            .attr('text-anchor', 'middle')
            .attr('y', 15)
            .style('font-size', '13px')
            .style('fill', '#666')
            .style('font-weight', '500')
            .style('pointer-events', 'none')
            .text('Countries');

        // Métrica de jobs
        commGroup.append('text')
            .attr('text-anchor', 'middle')
            .attr('y', 40)
            .style('font-size', '16px')
            .style('font-weight', '600')
            .style('fill', colorScale(comm.group))
            .style('pointer-events', 'none')
            .text(`${(comm.totalJobs / 1000).toFixed(1)}K jobs`);

        // Salario promedio
        commGroup.append('text')
            .attr('text-anchor', 'middle')
            .attr('y', 60)
            .style('font-size', '12px')
            .style('fill', '#666')
            .style('pointer-events', 'none')
            .text(`Avg: $${(comm.avgSalary / 1000).toFixed(0)}K`);

        // Badge de conectividad (arriba a la derecha)
        const badgeX = maxRadius * 0.7;
        const badgeY = -maxRadius * 0.7;
        
        commGroup.append('circle')
            .attr('cx', badgeX)
            .attr('cy', badgeY)
            .attr('r', 14)
            .attr('fill', 'white')
            .attr('stroke', colorScale(comm.group))
            .attr('stroke-width', 3)
            .style('pointer-events', 'none');

        commGroup.append('text')
            .attr('x', badgeX)
            .attr('y', badgeY + 5)
            .attr('text-anchor', 'middle')
            .style('font-size', '11px')
            .style('font-weight', 'bold')
            .style('fill', colorScale(comm.group))
            .style('pointer-events', 'none')
            .text(comm.avgDegree.toFixed(1));
    });

    // Leyenda en la parte inferior
    const legendY = containerHeight - 80;
    const legend = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${legendY})`);

    legend.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .attr('fill', '#333')
        .text('💡 How to read this chart:');

    const legendItems = [
        'Large number inside = Total countries in the community',
        'Top-right badge = Average network connectivity (degree)',
        'Hover over circles to see full list of member countries'
    ];

    legendItems.forEach((text, idx) => {
        legend.append('text')
            .attr('x', 0)
            .attr('y', 22 + (idx * 18))
            .style('font-size', '12px')
            .attr('fill', '#666')
            .text(`• ${text}`);
    });

    console.log('✅ Community detection chart drawn successfully');
    console.log(`   Communities: ${communities.length}`);
    communities.forEach(c => {
        console.log(`   - Community ${c.group}: ${c.size} countries, ${c.members.map(m => m.name).join(', ')}`);
    });
}