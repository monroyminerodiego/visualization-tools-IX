/**
 * ═══════════════════════════════════════════════════════════════════
 * TECH SALARY ANALYTICS DASHBOARD - COMPLETE JAVASCRIPT
 * Spatiotemporal + Hierarchical + Network Analysis (Pure D3.js)
 * ═══════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════
// 1. DATA - SPATIOTEMPORAL ANALYSIS
// ═══════════════════════════════════════════════════════════════════

const globalSalaryData = [
    { year: 2020, salary: 102997 },
    { year: 2021, salary: 102939 },
    { year: 2022, salary: 130948 },
    { year: 2023, salary: 156580 },
    { year: 2024, salary: 146934 },
    { year: 2025, salary: 144329 }
];

const departmentData = {
    'Cybersecurity': [
        { year: 2020, salary: 95000 },
        { year: 2021, salary: 98000 },
        { year: 2022, salary: 125000 },
        { year: 2023, salary: 152000 },
        { year: 2024, salary: 148000 },
        { year: 2025, salary: 145000 }
    ],
    'Executive & Leadership': [
        { year: 2020, salary: 180000 },
        { year: 2021, salary: 185000 },
        { year: 2022, salary: 200000 },
        { year: 2023, salary: 245000 },
        { year: 2024, salary: 235000 },
        { year: 2025, salary: 230000 }
    ],
    'Engineering & Development': [
        { year: 2020, salary: 105000 },
        { year: 2021, salary: 108000 },
        { year: 2022, salary: 135000 },
        { year: 2023, salary: 165000 },
        { year: 2024, salary: 158000 },
        { year: 2025, salary: 155000 }
    ],
    'Operations': [
        { year: 2020, salary: 75000 },
        { year: 2021, salary: 78000 },
        { year: 2022, salary: 95000 },
        { year: 2023, salary: 115000 },
        { year: 2024, salary: 110000 },
        { year: 2025, salary: 108000 }
    ],
    'Data & Analytics': [
        { year: 2020, salary: 110000 },
        { year: 2021, salary: 115000 },
        { year: 2022, salary: 140000 },
        { year: 2023, salary: 170000 },
        { year: 2024, salary: 162000 },
        { year: 2025, salary: 158000 }
    ],
    'Sales & Consulting': [
        { year: 2020, salary: 85000 },
        { year: 2021, salary: 88000 },
        { year: 2022, salary: 110000 },
        { year: 2023, salary: 135000 },
        { year: 2024, salary: 130000 },
        { year: 2025, salary: 128000 }
    ],
    'Information Technology': [
        { year: 2020, salary: 90000 },
        { year: 2021, salary: 92000 },
        { year: 2022, salary: 118000 },
        { year: 2023, salary: 145000 },
        { year: 2024, salary: 138000 },
        { year: 2025, salary: 135000 }
    ],
    'Finance & Accounting': [
        { year: 2020, salary: 80000 },
        { year: 2021, salary: 82000 },
        { year: 2022, salary: 105000 },
        { year: 2023, salary: 130000 },
        { year: 2024, salary: 125000 },
        { year: 2025, salary: 122000 }
    ],
    'Legal & Compliance': [
        { year: 2020, salary: 95000 },
        { year: 2021, salary: 98000 },
        { year: 2022, salary: 120000 },
        { year: 2023, salary: 148000 },
        { year: 2024, salary: 142000 },
        { year: 2025, salary: 140000 }
    ],
    'Human Resources': [
        { year: 2020, salary: 70000 },
        { year: 2021, salary: 72000 },
        { year: 2022, salary: 90000 },
        { year: 2023, salary: 110000 },
        { year: 2024, salary: 105000 },
        { year: 2025, salary: 103000 }
    ],
    'Product Management': [
        { year: 2020, salary: 115000 },
        { year: 2021, salary: 120000 },
        { year: 2022, salary: 145000 },
        { year: 2023, salary: 175000 },
        { year: 2024, salary: 168000 },
        { year: 2025, salary: 165000 }
    ]
};

const worldMapData = {
    countries: [
        { name: 'United States', code: 'USA', jobs: 15234, avgSalary: 148500 },
        { name: 'United Kingdom', code: 'GBR', jobs: 8750, avgSalary: 132000 },
        { name: 'Canada', code: 'CAN', jobs: 6890, avgSalary: 125000 },
        { name: 'Germany', code: 'DEU', jobs: 5620, avgSalary: 118000 },
        { name: 'Australia', code: 'AUS', jobs: 4320, avgSalary: 135000 },
        { name: 'India', code: 'IND', jobs: 3950, avgSalary: 45000 },
        { name: 'France', code: 'FRA', jobs: 3180, avgSalary: 110000 },
        { name: 'Netherlands', code: 'NLD', jobs: 2890, avgSalary: 115000 },
        { name: 'Spain', code: 'ESP', jobs: 2450, avgSalary: 95000 },
        { name: 'Singapore', code: 'SGP', jobs: 2120, avgSalary: 140000 }
    ]
};

const iso3ToId = {
    'USA': 840, 'GBR': 826, 'CAN': 124, 'DEU': 276, 'AUS': 36,
    'IND': 356, 'FRA': 250, 'NLD': 528, 'ESP': 724, 'SGP': 702
};

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

// ═══════════════════════════════════════════════════════════════════
// 2. HIERARCHICAL DATA
// ═══════════════════════════════════════════════════════════════════

const hierarchicalData = {
    regions: [
        {
            name: 'North America',
            avgSalary: 140000,
            totalJobs: 22124,
            countries: [
                {
                    name: 'United States',
                    avgSalary: 148500,
                    jobs: 15234
                },
                {
                    name: 'Canada',
                    avgSalary: 125000,
                    jobs: 6890
                }
            ]
        },
        {
            name: 'Europe',
            avgSalary: 115000,
            totalJobs: 22890,
            countries: [
                {
                    name: 'United Kingdom',
                    avgSalary: 132000,
                    jobs: 8750
                },
                {
                    name: 'Germany',
                    avgSalary: 118000,
                    jobs: 5620
                },
                {
                    name: 'France',
                    avgSalary: 110000,
                    jobs: 3180
                },
                {
                    name: 'Netherlands',
                    avgSalary: 115000,
                    jobs: 2890
                },
                {
                    name: 'Spain',
                    avgSalary: 95000,
                    jobs: 2450
                }
            ]
        },
        {
            name: 'Asia Pacific',
            avgSalary: 106667,
            totalJobs: 10390,
            countries: [
                {
                    name: 'Singapore',
                    avgSalary: 140000,
                    jobs: 2120
                },
                {
                    name: 'Australia',
                    avgSalary: 135000,
                    jobs: 4320
                },
                {
                    name: 'India',
                    avgSalary: 45000,
                    jobs: 3950
                }
            ]
        }
    ]
};

const hierarchicalColors = {
    'North America': '#667eea',
    'Europe': '#f59e0b',
    'Asia Pacific': '#10b981'
};

const topJobsByRegion = {
    'North America': [
        { role: 'AI/ML Engineer', avgSalary: 175000, jobs: 3200 },
        { role: 'Solutions Architect', avgSalary: 168000, jobs: 2800 },
        { role: 'DevOps Engineer', avgSalary: 155000, jobs: 3500 },
        { role: 'Data Scientist', avgSalary: 152000, jobs: 2900 },
        { role: 'Cloud Engineer', avgSalary: 148000, jobs: 3100 },
        { role: 'Security Engineer', avgSalary: 145000, jobs: 2400 },
        { role: 'Full Stack Developer', avgSalary: 138000, jobs: 4200 },
        { role: 'Product Manager', avgSalary: 142000, jobs: 1800 },
        { role: 'Backend Engineer', avgSalary: 135000, jobs: 3600 },
        { role: 'Frontend Developer', avgSalary: 128000, jobs: 2950 }
    ],
    'Europe': [
        { role: 'AI/ML Engineer', avgSalary: 142000, jobs: 2100 },
        { role: 'Solutions Architect', avgSalary: 135000, jobs: 1850 },
        { role: 'DevOps Engineer', avgSalary: 125000, jobs: 2400 },
        { role: 'Data Scientist', avgSalary: 122000, jobs: 1950 },
        { role: 'Cloud Engineer', avgSalary: 118000, jobs: 2200 },
        { role: 'Security Engineer', avgSalary: 115000, jobs: 1600 },
        { role: 'Full Stack Developer', avgSalary: 108000, jobs: 2800 },
        { role: 'Product Manager', avgSalary: 112000, jobs: 1200 },
        { role: 'Backend Engineer', avgSalary: 105000, jobs: 2500 },
        { role: 'Frontend Developer', avgSalary: 98000, jobs: 1900 }
    ],
    'Asia Pacific': [
        { role: 'AI/ML Engineer', avgSalary: 98000, jobs: 1450 },
        { role: 'Solutions Architect', avgSalary: 92000, jobs: 1200 },
        { role: 'DevOps Engineer', avgSalary: 85000, jobs: 1600 },
        { role: 'Data Scientist', avgSalary: 82000, jobs: 1350 },
        { role: 'Cloud Engineer', avgSalary: 78000, jobs: 1500 },
        { role: 'Security Engineer', avgSalary: 75000, jobs: 1100 },
        { role: 'Full Stack Developer', avgSalary: 68000, jobs: 1900 },
        { role: 'Product Manager', avgSalary: 72000, jobs: 850 },
        { role: 'Backend Engineer', avgSalary: 65000, jobs: 1700 },
        { role: 'Frontend Developer', avgSalary: 58000, jobs: 1300 }
    ]
};

// ═══════════════════════════════════════════════════════════════════
// 3. NETWORK DATA (Based on notebook analysis)
// ═══════════════════════════════════════════════════════════════════

const networkData = {
    nodes: [
        { id: 'US', name: 'United States', jobs: 15234, degree: 45, group: 1 },
        { id: 'GB', name: 'United Kingdom', jobs: 8750, degree: 38, group: 1 },
        { id: 'CA', name: 'Canada', jobs: 6890, degree: 32, group: 1 },
        { id: 'DE', name: 'Germany', jobs: 5620, degree: 35, group: 2 },
        { id: 'AU', name: 'Australia', jobs: 4320, degree: 28, group: 3 },
        { id: 'IN', name: 'India', jobs: 3950, degree: 25, group: 3 },
        { id: 'FR', name: 'France', jobs: 3180, degree: 30, group: 2 },
        { id: 'NL', name: 'Netherlands', jobs: 2890, degree: 27, group: 2 },
        { id: 'ES', name: 'Spain', jobs: 2450, degree: 22, group: 2 },
        { id: 'SG', name: 'Singapore', jobs: 2120, degree: 24, group: 3 },
        { id: 'BR', name: 'Brazil', jobs: 1850, degree: 18, group: 4 },
        { id: 'JP', name: 'Japan', jobs: 1680, degree: 20, group: 3 },
        { id: 'CH', name: 'Switzerland', jobs: 1520, degree: 26, group: 2 },
        { id: 'SE', name: 'Sweden', jobs: 1340, degree: 23, group: 2 },
        { id: 'PL', name: 'Poland', jobs: 1180, degree: 19, group: 2 }
    ],
    links: [
        { source: 'US', target: 'GB', value: 850, salary: 145000 },
        { source: 'US', target: 'CA', value: 1200, salary: 138000 },
        { source: 'US', target: 'DE', value: 450, salary: 132000 },
        { source: 'US', target: 'IN', value: 680, salary: 48000 },
        { source: 'GB', target: 'US', value: 520, salary: 155000 },
        { source: 'GB', target: 'DE', value: 380, salary: 125000 },
        { source: 'GB', target: 'FR', value: 290, salary: 118000 },
        { source: 'GB', target: 'NL', value: 340, salary: 122000 },
        { source: 'CA', target: 'US', value: 980, salary: 142000 },
        { source: 'CA', target: 'GB', value: 180, salary: 135000 },
        { source: 'DE', target: 'GB', value: 220, salary: 130000 },
        { source: 'DE', target: 'FR', value: 420, salary: 115000 },
        { source: 'DE', target: 'NL', value: 380, salary: 118000 },
        { source: 'DE', target: 'CH', value: 280, salary: 128000 },
        { source: 'AU', target: 'US', value: 320, salary: 148000 },
        { source: 'AU', target: 'SG', value: 280, salary: 138000 },
        { source: 'IN', target: 'US', value: 520, salary: 85000 },
        { source: 'IN', target: 'GB', value: 280, salary: 78000 },
        { source: 'FR', target: 'DE', value: 350, salary: 112000 },
        { source: 'FR', target: 'ES', value: 240, salary: 105000 },
        { source: 'NL', target: 'DE', value: 320, salary: 120000 },
        { source: 'NL', target: 'GB', value: 280, salary: 125000 },
        { source: 'ES', target: 'FR', value: 180, salary: 98000 },
        { source: 'SG', target: 'AU', value: 220, salary: 142000 },
        { source: 'SG', target: 'IN', value: 180, salary: 95000 },
        { source: 'BR', target: 'US', value: 280, salary: 72000 },
        { source: 'JP', target: 'US', value: 240, salary: 125000 },
        { source: 'CH', target: 'DE', value: 220, salary: 135000 },
        { source: 'SE', target: 'DE', value: 180, salary: 128000 },
        { source: 'PL', target: 'DE', value: 280, salary: 88000 }
    ]
};

// ═══════════════════════════════════════════════════════════════════
// 4. TOOLTIP SYSTEM
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
// 5. TAB SYSTEM
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
// 6. INITIALIZATION
// ═══════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Dashboard initializing...');
    updateSpatiotemporalCharts();
    setupResponsiveResize();
    console.log('✅ Dashboard initialized successfully');
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
// 7. SPATIOTEMPORAL ANALYSIS - 4 CHARTS
// ═══════════════════════════════════════════════════════════════════

function updateSpatiotemporalCharts() {
    drawWorldMap();
    drawTopCountriesChart();
    drawDepartmentEvolution();
    drawTemporalEvolution();
}

// ═══════════════════════════════════════════════════════════════════
// 8. CHART 1: WORLD MAP
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
                            Avg Salary: <span style="color: #007AFF; font-weight: bold;">${countryData.avgSalary.toLocaleString()}</span>
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
// 9. CHART 2: TOP COUNTRIES
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

    const sortedCountries = [...worldMapData.countries].sort((a, b) => b.jobs - a.jobs);

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
                Avg Salary: ${d.avgSalary.toLocaleString()}
            `);
        })
        .on('mousemove', function(event, d) {
            showTooltip(event, `
                <strong>${d.name}</strong><br/>
                Jobs: ${d.jobs.toLocaleString()}<br/>
                Avg Salary: ${d.avgSalary.toLocaleString()}
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
// 10. CHART 3: DEPARTMENT EVOLUTION
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

    const x = d3.scaleLinear()
        .domain([2020, 2025])
        .range([0, width]);

    const allSalaries = Object.values(departmentData).flat().map(d => d.salary);
    const y = d3.scaleLinear()
        .domain([60000, d3.max(allSalaries)])
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
        .call(d3.axisLeft(y).tickFormat(d => `${(d / 1000).toFixed(0)}K`));

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

    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.salary))
        .curve(d3.curveMonotoneX);

    const activeDepartments = new Set(Object.keys(departmentData));

    Object.entries(departmentData).forEach(([dept, data]) => {
        const lineGroup = svg.append('g')
            .attr('class', `dept-group dept-group-${dept.replace(/\s+/g, '-')}`);

        lineGroup.append('path')
            .datum(data)
            .attr('class', `line-${dept.replace(/\s+/g, '-')}`)
            .attr('fill', 'none')
            .attr('stroke', departmentColors[dept])
            .attr('stroke-width', 2.5)
            .attr('d', line)
            .style('opacity', 0.8);

        lineGroup.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => x(d.year))
            .attr('cy', d => y(d.salary))
            .attr('r', 4)
            .attr('fill', departmentColors[dept])
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer')
            .on('mouseover', function(event, d) {
                d3.select(this).attr('r', 7);
                showTooltip(event, `
                    <strong>${dept}</strong><br/>
                    Year: ${d.year}<br/>
                    Salary: <span style="color: ${departmentColors[dept]}">${d.salary.toLocaleString()}</span>
                `);
            })
            .on('mousemove', function(event, d) {
                showTooltip(event, `
                    <strong>${dept}</strong><br/>
                    Year: ${d.year}<br/>
                    Salary: <span style="color: ${departmentColors[dept]}">${d.salary.toLocaleString()}</span>
                `);
            })
            .on('mouseout', function() {
                d3.select(this).attr('r', 4);
                hideTooltip();
            });
    });

    const legendX = width + 15;
    const legendY = 0;
    const lineHeight = 20;

    const legend = svg.append('g')
        .attr('class', 'compact-legend')
        .attr('transform', `translate(${legendX},${legendY})`);

    Object.keys(departmentData).forEach((dept, i) => {
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
            .attr('x2', 18)
            .attr('y1', 0)
            .attr('y2', 0)
            .attr('stroke', departmentColors[dept])
            .attr('stroke-width', 3);

        const shortLabel = dept.length > 18 ? dept.substring(0, 16) + '...' : dept;
        legendItem.append('text')
            .attr('x', 22)
            .attr('y', 4)
            .style('font-size', '10px')
            .style('font-weight', '500')
            .attr('fill', '#333')
            .text(shortLabel)
            .append('title')
            .text(dept);

        legendItem.on('mouseover', function() {
            d3.select(this).style('opacity', 0.7);
        })
        .on('mouseout', function() {
            const isActive = activeDepartments.has(dept);
            d3.select(this).style('opacity', isActive ? 1 : 0.3);
        });
    });

    const legendContainer = container.node().parentElement;
    const externalLegend = legendContainer.querySelector('.department-legend');
    if (externalLegend) {
        externalLegend.remove();
    }

    console.log('✅ Department evolution chart with compact legend drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 11. CHART 4: TEMPORAL EVOLUTION
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
        .domain([2020, 2025])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([90000, 170000])
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
        .call(d3.axisLeft(y).tickFormat(d => `${(d / 1000).toFixed(0)}K`));

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
            const growth = d.year > 2020 ?
                ((d.salary - globalSalaryData[0].salary) / globalSalaryData[0].salary * 100).toFixed(1) : 0;
            showTooltip(event, `
                <strong>${d.year}</strong><br/>
                Salary: <span style="color: #34C759">${d.salary.toLocaleString()}</span><br/>
                ${d.year > 2020 ? `Growth: +${growth}%` : 'Base Year'}
            `);
        })
        .on('mousemove', function(event, d) {
            const growth = d.year > 2020 ?
                ((d.salary - globalSalaryData[0].salary) / globalSalaryData[0].salary * 100).toFixed(1) : 0;
            showTooltip(event, `
                <strong>${d.year}</strong><br/>
                Salary: <span style="color: #34C759">${d.salary.toLocaleString()}</span><br/>
                ${d.year > 2020 ? `Growth: +${growth}%` : 'Base Year'}
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
        .text(d => `${(d.salary / 1000).toFixed(0)}K`);

    const totalGrowth = ((globalSalaryData[5].salary - globalSalaryData[0].salary) / globalSalaryData[0].salary * 100).toFixed(1);
    svg.append('text')
        .attr('x', width - 10)
        .attr('y', 15)
        .attr('text-anchor', 'end')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .attr('fill', '#34C759')
        .text(`Total Growth 2020-2025: +${totalGrowth}%`);

    console.log('✅ Temporal evolution chart drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 12. HIERARCHICAL ANALYSIS - UPDATE ALL CHARTS
// ═══════════════════════════════════════════════════════════════════

function updateHierarchicalCharts() {
    console.log('🔄 Updating hierarchical charts...');
    drawHierarchicalTreemap();
    drawHierarchicalBubble();
    drawHierarchicalSunburst();
    drawHierarchicalMatrix();
}

// ═══════════════════════════════════════════════════════════════════
// 13. HIERARCHICAL TREEMAP (D3 Pure)
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

    const globalTotal = hierarchicalData.regions.reduce((sum, r) => 
        sum + r.countries.reduce((s, c) => s + (c.avgSalary * c.jobs), 0), 0);

    function updateTreemap(viewType, selectedRegion = null) {
        let rootData, total, titleText;

        if (viewType === 'global') {
            total = globalTotal;
            const children = hierarchicalData.regions.map(region => {
                const regionTotal = region.countries.reduce((s, c) => s + (c.avgSalary * c.jobs), 0);
                const percentage = ((regionTotal / total) * 100).toFixed(1);
                
                return {
                    name: region.name,
                    value: regionTotal,
                    percentage: percentage,
                    avgSalary: region.avgSalary,
                    totalJobs: region.totalJobs,
                    type: 'region'
                };
            });

            rootData = {
                name: 'Global',
                children: children
            };

            titleText = 'Global View - Click region to drill down';

        } else {
            const regionData = hierarchicalData.regions.find(r => r.name === selectedRegion);
            total = regionData.countries.reduce((s, c) => s + (c.avgSalary * c.jobs), 0);

            const children = regionData.countries.map(country => {
                const countryValue = country.avgSalary * country.jobs;
                const percentage = ((countryValue / total) * 100).toFixed(1);

                return {
                    name: country.name,
                    value: countryValue,
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
            .style('cursor', d => d.data.type === 'region' ? 'pointer' : 'default')
            .on('click', function(event, d) {
                if (d.data.type === 'region') {
                    window.treemapState.view = 'region';
                    window.treemapState.region = d.data.name;
                    updateTreemap('region', d.data.name);
                }
            })
            .on('contextmenu', function(event) {
                event.preventDefault();
                if (window.treemapState.view === 'region') {
                    window.treemapState.view = 'global';
                    window.treemapState.region = null;
                    updateTreemap('global');
                }
            })
            .on('mouseover', function(event, d) {
                d3.select(this).attr('stroke-width', 4);
                
                let tooltip = `<strong>${d.data.name}</strong><br/>`;
                tooltip += `<strong>Percentage: ${d.data.percentage}%</strong><br/><br/>`;
                
                if (d.data.type === 'region') {
                    tooltip += `Total Jobs: ${d.data.totalJobs.toLocaleString()}<br/>`;
                    tooltip += `Avg Salary: ${d.data.avgSalary.toLocaleString()}<br/>`;
                    tooltip += `Total Payroll: ${(d.value / 1000000).toFixed(1)}M<br/>`;
                    tooltip += `<em>Click to explore countries</em>`;
                } else {
                    tooltip += `Jobs: ${d.data.jobs.toLocaleString()}<br/>`;
                    tooltip += `Avg Salary: ${d.data.avgSalary.toLocaleString()}<br/>`;
                    tooltip += `Total Payroll: ${(d.value / 1000000).toFixed(1)}M`;
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
                if (d.data.type === 'region') {
                    return hierarchicalColors[d.data.name];
                } else {
                    const region = window.treemapState.region;
                    return d3.color(hierarchicalColors[region]).brighter(0.3);
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
                if (d.data.type === 'region') {
                    return `${d.data.totalJobs.toLocaleString()} jobs`;
                } else {
                    return `${(d.data.avgSalary / 1000).toFixed(0)}K avg`;
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
                const item = document.createElement('div');
                item.className = 'hierarchical-legend-item';
                item.innerHTML = `
                    <div class="hierarchical-legend-color" style="background-color: ${hierarchicalColors[region]}"></div>
                    <div>${region} = 100%</div>
                `;
                legend.appendChild(item);
            }
            
            legend.style.transition = 'opacity 0.4s';
            legend.style.opacity = '1';
        }, 300);
    }

    updateTreemap(window.treemapState.view, window.treemapState.region);
    console.log('✅ Interactive Treemap with percentages drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 14. HIERARCHICAL BUBBLE CHART
// ═══════════════════════════════════════════════════════════════════

function drawHierarchicalBubble() {
    const container = d3.select('#hierarchical-bubble-chart');
    container.html('');

    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;

    const margin = { top: 40, right: 80, bottom: 60, left: 80 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const bubbleData = [];
    hierarchicalData.regions.forEach(region => {
        region.countries.forEach(country => {
            bubbleData.push({
                name: country.name,
                region: region.name,
                jobs: country.jobs,
                avgSalary: country.avgSalary,
                totalPayroll: country.jobs * country.avgSalary
            });
        });
    });

    const x = d3.scaleLinear()
        .domain([0, d3.max(bubbleData, d => d.jobs) * 1.1])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([30000, d3.max(bubbleData, d => d.avgSalary) * 1.1])
        .range([height, 0]);

    const size = d3.scaleSqrt()
        .domain([0, d3.max(bubbleData, d => d.totalPayroll)])
        .range([5, 50]);

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
        .call(d3.axisBottom(x).tickFormat(d => (d / 1000).toFixed(0) + 'K'));

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y).tickFormat(d => `${(d / 1000).toFixed(0)}K`));

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 50)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Number of Jobs');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -60)
        .attr('x', -(height / 2))
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Average Salary (USD)');

    svg.selectAll('circle')
        .data(bubbleData)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.jobs))
        .attr('cy', d => y(d.avgSalary))
        .attr('r', d => size(d.totalPayroll))
        .attr('fill', d => hierarchicalColors[d.region])
        .attr('opacity', 0.6)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            d3.select(this)
                .attr('opacity', 1)
                .attr('stroke-width', 3);
            showTooltip(event, `
                <strong>${d.name}</strong><br/>
                Region: ${d.region}<br/>
                Jobs: ${d.jobs.toLocaleString()}<br/>
                Avg Salary: ${d.avgSalary.toLocaleString()}<br/>
                Total Payroll: ${(d.totalPayroll / 1000000).toFixed(1)}M
            `);
        })
        .on('mousemove', function(event, d) {
            showTooltip(event, `
                <strong>${d.name}</strong><br/>
                Region: ${d.region}<br/>
                Jobs: ${d.jobs.toLocaleString()}<br/>
                Avg Salary: ${d.avgSalary.toLocaleString()}<br/>
                Total Payroll: ${(d.totalPayroll / 1000000).toFixed(1)}M
            `);
        })
        .on('mouseout', function() {
            d3.select(this)
                .attr('opacity', 0.6)
                .attr('stroke-width', 2);
            hideTooltip();
        });

    svg.selectAll('.country-label')
        .data(bubbleData)
        .enter()
        .append('text')
        .attr('x', d => x(d.jobs))
        .attr('y', d => y(d.avgSalary))
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('font-size', d => d.jobs > 5000 ? '11px' : '9px')
        .style('font-weight', 'bold')
        .style('fill', 'white')
        .style('pointer-events', 'none')
        .text(d => {
            if (d.jobs > 5000) return d.name.substring(0, 3).toUpperCase();
            return d.name.substring(0, 2).toUpperCase();
        });

    console.log('✅ Hierarchical bubble chart drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 15. HIERARCHICAL SUNBURST
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
            
            const sortedJobs = [...regionJobs].sort((a, b) => b.avgSalary - a.avgSalary);
            const top10 = sortedJobs.slice(0, 10);
            const rest = sortedJobs.slice(10);

            const children = top10.map(role => ({
                name: role.role,
                value: role.jobs,
                avgSalary: role.avgSalary,
                jobs: role.jobs,
                type: 'role'
            }));

            if (rest.length > 0) {
                const restJobs = rest.reduce((sum, r) => sum + r.jobs, 0);
                const restValue = rest.reduce((sum, r) => sum + (r.avgSalary * r.jobs), 0);
                const restAvgSalary = Math.round(restValue / restJobs);

                children.push({
                    name: `Other Roles (${rest.length})`,
                    value: restJobs,
                    avgSalary: restAvgSalary,
                    jobs: restJobs,
                    type: 'grouped'
                });
            }

            rootData = {
                name: selectedRegion,
                children: children
            };

            centerText = 'Right-click\nback';
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
                    tooltip += `Avg Salary: ${d.data.avgSalary.toLocaleString()}<br/>`;
                    tooltip += `<em>Click to see top 10 roles</em>`;
                } else if (viewType === 'roles' && d.depth === 1) {
                    tooltip += `Jobs: ${d.data.jobs.toLocaleString()}<br/>`;
                    tooltip += `Avg Salary: ${d.data.avgSalary.toLocaleString()}`;
                    if (d.data.type === 'grouped') {
                        const count = parseInt(d.data.name.match(/\((\d+)\)/)[1]);
                        tooltip += `<br/><em>${count} roles combined</em>`;
                    }
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
                    const baseColor = hierarchicalColors[selectedRegion];
                    return d.data.type === 'grouped' 
                        ? d3.color(baseColor).brighter(0.8)
                        : d3.color(baseColor).brighter(0.4);
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
                if (d.data.type === 'grouped') {
                    const count = parseInt(d.data.name.match(/\((\d+)\)/)[1]);
                    return `Other (${count})`;
                }
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
    console.log('✅ Interactive Sunburst with top 10 roles drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 16. HIERARCHICAL MATRIX (4 BAR CHARTS)
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
            format: d => `${(d / 1000).toFixed(0)}K`,
            color: '#667eea'
        },
        {
            title: 'Total Jobs',
            data: hierarchicalData.regions.map(r => ({ name: r.name, value: r.totalJobs })),
            format: d => (d / 1000).toFixed(1) + 'K',
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
            format: d => `${(d / 1000).toFixed(0)}K`,
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
            .text(metric.title);
    });

    console.log('✅ Hierarchical Matrix drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 17. NETWORK ANALYSIS - UPDATE ALL CHARTS
// ═══════════════════════════════════════════════════════════════════

function updateNetworkCharts() {
    console.log('🔄 Updating network charts...');
    drawNetworkForceDirected();
    drawNetworkCentrality();
    drawNetworkCommunity();
}

// ═══════════════════════════════════════════════════════════════════
// 18. NETWORK CHART 1: FORCE-DIRECTED GRAPH
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

    const simulation = d3.forceSimulation(networkData.nodes)
        .force('link', d3.forceLink(networkData.links).id(d => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => sizeScale(d.jobs) + 5));

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
            
            showTooltip(event, `
                <strong>${d.name}</strong><br/>
                Country Code: ${d.id}<br/>
                Tech Jobs: ${d.jobs.toLocaleString()}<br/>
                Network Degree: ${d.degree}<br/>
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
// 19. NETWORK CHART 2: CENTRALITY ANALYSIS
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

    const sortedNodes = [...networkData.nodes].sort((a, b) => b.degree - a.degree).slice(0, 10);

    const x = d3.scaleBand()
        .domain(sortedNodes.map(d => d.id))
        .range([0, width])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(sortedNodes, d => d.degree)])
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
        .domain([d3.min(sortedNodes, d => d.degree), d3.max(sortedNodes, d => d.degree)])
        .interpolator(d3.interpolateBlues);

    svg.selectAll('rect')
        .data(sortedNodes)
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
                <strong>${d.name}</strong><br/>
                Network Degree: ${d.degree}<br/>
                Total Jobs: ${d.jobs.toLocaleString()}<br/>
                <em>Higher degree = more connections</em>
            `);
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 1);
            hideTooltip();
        });

    svg.selectAll('.value-label')
        .data(sortedNodes)
        .enter()
        .append('text')
        .attr('x', d => x(d.id) + x.bandwidth() / 2)
        .attr('y', d => y(d.degree) - 5)
        .attr('text-anchor', 'middle')
        .style('font-size', '11px')
        .style('font-weight', 'bold')
        .attr('fill', '#333')
        .text(d => d.degree);

    console.log('✅ Network centrality chart drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 20. NETWORK CHART 3: COMMUNITY DETECTION
// ═══════════════════════════════════════════════════════════════════

function drawNetworkCommunity() {
    const container = d3.select('#network-community-chart');
    container.html('');

    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;

    const width = containerWidth;
    const height = containerHeight - 80;

    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height + 80);

    const communities = d3.group(networkData.nodes, d => d.group);
    const communityData = Array.from(communities, ([group, nodes]) => ({
        group: group,
        nodes: nodes,
        totalJobs: d3.sum(nodes, n => n.jobs),
        avgDegree: d3.mean(nodes, n => n.degree)
    }));

    const pack = d3.pack()
        .size([width - 40, height - 40])
        .padding(20);

    const root = d3.hierarchy({ children: communityData })
        .sum(d => d.totalJobs)
        .sort((a, b) => b.value - a.value);

    pack(root);

    const colorScale = d3.scaleOrdinal()
        .domain([1, 2, 3, 4])
        .range(['#667eea', '#f59e0b', '#10b981', '#ec4899']);

    const g = svg.append('g')
        .attr('transform', 'translate(20,20)');

    const communities_g = g.selectAll('g')
        .data(root.leaves())
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x},${d.y})`);

    communities_g.append('circle')
        .attr('r', d => d.r)
        .attr('fill', d => colorScale(d.data.group))
        .attr('opacity', 0.6)
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 0.9);
            showTooltip(event, `
                <strong>Community ${d.data.group}</strong><br/>
                Countries: ${d.data.nodes.length}<br/>
                Total Jobs: ${d.data.totalJobs.toLocaleString()}<br/>
                Avg Degree: ${d.data.avgDegree.toFixed(1)}<br/>
                <em>Members: ${d.data.nodes.map(n => n.id).join(', ')}</em>
            `);
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.6);
            hideTooltip();
        });

    communities_g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.5em')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .style('fill', 'white')
        .text(d => `C${d.data.group}`);

    communities_g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1em')
        .style('font-size', '11px')
        .style('fill', 'white')
        .text(d => `${d.data.nodes.length} countries`);

    communities_g.each(function(communityData) {
        const communityG = d3.select(this);
        const nodes = communityData.data.nodes;
        
        const angleStep = (2 * Math.PI) / nodes.length;
        const radius = communityData.r * 0.6;

        nodes.forEach((node, i) => {
            const angle = i * angleStep;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            communityG.append('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', 6)
                .attr('fill', '#fff')
                .attr('stroke', colorScale(communityData.data.group))
                .attr('stroke-width', 2)
                .style('cursor', 'pointer')
                .on('mouseover', function(event) {
                    d3.select(this).attr('r', 9);
                    showTooltip(event, `
                        <strong>${node.name}</strong><br/>
                        Code: ${node.id}<br/>
                        Jobs: ${node.jobs.toLocaleString()}<br/>
                        Degree: ${node.degree}
                    `);
                })
                .on('mouseout', function() {
                    d3.select(this).attr('r', 6);
                    hideTooltip();
                });

            communityG.append('text')
                .attr('x', x)
                .attr('y', y + 3)
                .attr('text-anchor', 'middle')
                .style('font-size', '8px')
                .style('font-weight', 'bold')
                .style('fill', colorScale(communityData.data.group))
                .style('pointer-events', 'none')
                .text(node.id);
        });
    });

    const legend = svg.append('g')
        .attr('transform', `translate(20,${height + 30})`);

    communityData.forEach((comm, i) => {
        const legendItem = legend.append('g')
            .attr('transform', `translate(${i * 150},0)`);

        legendItem.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 8)
            .attr('fill', colorScale(comm.group));

        legendItem.append('text')
            .attr('x', 15)
            .attr('y', 4)
            .style('font-size', '12px')
            .text(`Community ${comm.group} (${comm.nodes.length})`);
    });

    console.log('✅ Network community detection chart drawn');
}