/**
 * ═══════════════════════════════════════════════════════════════════
 * TECH SALARY ANALYTICS DASHBOARD - JAVASCRIPT (CORRECTED)
 * ═══════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════
// 1. DATA - TAB 1: SALARY EVOLUTION
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

const experienceLevelData = [
    { level: 'Entry-level', preAI: 65000, postAI: 85000 },
    { level: 'Mid-level', preAI: 95000, postAI: 125000 },
    { level: 'Senior', preAI: 135000, postAI: 165000 },
    { level: 'Executive', preAI: 190000, postAI: 235000 }
];

// ═══════════════════════════════════════════════════════════════════
// 2. DATA - TAB 2: GLOBAL DISTRIBUTION
// ═══════════════════════════════════════════════════════════════════

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

// Department colors
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

// Treemap data - Organizational hierarchy with salary investments
const treemapData = {
    name: 'Organization',
    children: [
        {
            name: 'Cybersecurity',
            children: [
                { name: 'Security Engineering', value: 2500000 },
                { name: 'Cloud Security', value: 800000 },
                { name: 'Application Security', value: 600000 }
            ]
        },
        {
            name: 'Executive & Leadership',
            children: [
                { name: 'C-Suite', value: 3500000 },
                { name: 'VP Level', value: 2200000 },
                { name: 'Directors', value: 1800000 }
            ]
        },
        {
            name: 'Engineering & Development',
            children: [
                { name: 'Backend Development', value: 4200000 },
                { name: 'Frontend Development', value: 3100000 },
                { name: 'DevOps', value: 2400000 },
                { name: 'Mobile Development', value: 1900000 }
            ]
        },
        {
            name: 'Data & Analytics',
            children: [
                { name: 'Data Science', value: 3800000 },
                { name: 'Data Engineering', value: 2900000 },
                { name: 'Business Intelligence', value: 1700000 }
            ]
        },
        {
            name: 'Product Management',
            children: [
                { name: 'Product Strategy', value: 2800000 },
                { name: 'Product Operations', value: 1500000 }
            ]
        },
        {
            name: 'Operations',
            children: [
                { name: 'IT Operations', value: 2100000 },
                { name: 'Business Operations', value: 1400000 }
            ]
        },
        {
            name: 'Sales & Consulting',
            children: [
                { name: 'Enterprise Sales', value: 2300000 },
                { name: 'Technical Consulting', value: 1600000 }
            ]
        },
        {
            name: 'Finance & Accounting',
            children: [
                { name: 'Financial Planning', value: 1800000 },
                { name: 'Accounting', value: 900000 }
            ]
        },
        {
            name: 'Legal & Compliance',
            children: [
                { name: 'Corporate Legal', value: 1600000 },
                { name: 'Compliance', value: 1100000 }
            ]
        },
        {
            name: 'Human Resources',
            children: [
                { name: 'Talent Acquisition', value: 1300000 },
                { name: 'People Operations', value: 800000 }
            ]
        },
        {
            name: 'Information Technology',
            children: [
                { name: 'IT Infrastructure', value: 1900000 },
                { name: 'IT Support', value: 1200000 }
            ]
        }
    ]
};

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
    
    switch(tabName) {
        case 'overview':
            updateOverviewCharts();
            break;
        case 'volatilidad':
            updateGlobalDistributionCharts();
            break;
        case 'detalle':
            // Empty for now
            break;
    }
}

// ═══════════════════════════════════════════════════════════════════
// 5. INITIALIZATION
// ═══════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Dashboard initializing...');
    updateOverviewCharts();
    setupResponsiveResize();
    console.log('✅ Dashboard initialized successfully');
});

function setupResponsiveResize() {
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const activeTab = document.querySelector('.tab-content.active');
            if (activeTab) changeTab(activeTab.id);
        }, 250);
    });
}

// ═══════════════════════════════════════════════════════════════════
// 6. TAB 1 CHARTS - SALARY EVOLUTION
// ═══════════════════════════════════════════════════════════════════

function updateOverviewCharts() {
    drawTemporalEvolution();
    drawDepartmentEvolution();
    drawExperienceImpact();
}

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
    
    // Grid
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));
    
    // Axes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format('d')));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y).tickFormat(d => '$' + (d/1000).toFixed(0) + 'K'));
    
    // Labels
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
    
    // AI Adoption line (2023)
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
    
    // Area under line
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
    
    // Line
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
    
    // Points - CADA AÑO TIENE SU PUNTO
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
                Salary: <span style="color: #34C759">$${d.salary.toLocaleString()}</span><br/>
                ${d.year > 2020 ? `Growth: +${growth}%` : 'Base Year'}
            `);
        })
        .on('mousemove', function(event, d) {
            const growth = d.year > 2020 ? 
                ((d.salary - globalSalaryData[0].salary) / globalSalaryData[0].salary * 100).toFixed(1) : 0;
            showTooltip(event, `
                <strong>${d.year}</strong><br/>
                Salary: <span style="color: #34C759">$${d.salary.toLocaleString()}</span><br/>
                ${d.year > 2020 ? `Growth: +${growth}%` : 'Base Year'}
            `);
        })
        .on('mouseout', function() {
            d3.select(this).attr('r', 6);
            hideTooltip();
        });
    
    // Value labels - MÁS ESPACIO
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
        .text(d => '$' + (d.salary/1000).toFixed(0) + 'K');
    
    // Total growth annotation
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

function drawDepartmentEvolution() {
    const container = d3.select('#department-evolution-chart');
    container.html('');
    
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    
    const margin = { top: 20, right: 30, bottom: 60, left: 80 };
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
    
    // Grid
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));
    
    // Axes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format('d')));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y).tickFormat(d => '$' + (d/1000).toFixed(0) + 'K'));
    
    // Labels
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
    
    // Draw lines with interactive points
    Object.entries(departmentData).forEach(([dept, data]) => {
        const lineGroup = svg.append('g')
            .attr('class', `dept-group-${dept.replace(/\s+/g, '-')}`);
        
        lineGroup.append('path')
            .datum(data)
            .attr('class', `line-${dept.replace(/\s+/g, '-')}`)
            .attr('fill', 'none')
            .attr('stroke', departmentColors[dept])
            .attr('stroke-width', 2.5)
            .attr('d', line)
            .style('opacity', 0.8);
        
        // PUNTOS INTERACTIVOS POR CADA AÑO
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
                    Salary: <span style="color: ${departmentColors[dept]}">$${d.salary.toLocaleString()}</span>
                `);
            })
            .on('mousemove', function(event, d) {
                showTooltip(event, `
                    <strong>${dept}</strong><br/>
                    Year: ${d.year}<br/>
                    Salary: <span style="color: ${departmentColors[dept]}">$${d.salary.toLocaleString()}</span>
                `);
            })
            .on('mouseout', function() {
                d3.select(this).attr('r', 4);
                hideTooltip();
            });
    });
    
    // External Legend
    const legendContainer = container.node().parentElement;
    let externalLegend = legendContainer.querySelector('.department-legend');
    
    if (!externalLegend) {
        externalLegend = document.createElement('div');
        externalLegend.className = 'department-legend';
        legendContainer.appendChild(externalLegend);
    }
    
    externalLegend.innerHTML = '';
    
    Object.keys(departmentData).forEach(dept => {
        const legendItem = document.createElement('div');
        legendItem.className = 'department-legend-item';
        legendItem.innerHTML = `
            <div class="department-legend-color" style="background-color: ${departmentColors[dept]}"></div>
            <div class="department-legend-text">${dept}</div>
        `;
        
        legendItem.addEventListener('click', function() {
            const isActive = activeDepartments.has(dept);
            if (isActive) {
                activeDepartments.delete(dept);
                this.classList.add('inactive');
                svg.select(`.dept-group-${dept.replace(/\s+/g, '-')}`).style('opacity', 0.1);
            } else {
                activeDepartments.add(dept);
                this.classList.remove('inactive');
                svg.select(`.dept-group-${dept.replace(/\s+/g, '-')}`).style('opacity', 1);
            }
        });
        
        externalLegend.appendChild(legendItem);
    });
    
    console.log('✅ Department evolution chart drawn');
}

function drawExperienceImpact() {
    const container = d3.select('#experience-impact-chart');
    container.html('');
    
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    
    const margin = { top: 80, right: 40, bottom: 60, left: 80 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x0 = d3.scaleBand()
        .domain(experienceLevelData.map(d => d.level))
        .range([0, width])
        .padding(0.3);
    
    const x1 = d3.scaleBand()
        .domain(['preAI', 'postAI'])
        .range([0, x0.bandwidth()])
        .padding(0.1);
    
    const y = d3.scaleLinear()
        .domain([0, 250000])
        .range([height, 0]);
    
    // Grid
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));
    
    // Axes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x0))
        .selectAll('text')
        .style('font-size', '11px');
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y).tickFormat(d => '$' + (d/1000).toFixed(0) + 'K'));
    
    // Labels
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 50)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Experience Level');
    
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -60)
        .attr('x', -(height / 2))
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Average Salary (USD)');
    
    // Bars
    const levelGroups = svg.selectAll('.level-group')
        .data(experienceLevelData)
        .enter()
        .append('g')
        .attr('class', 'level-group')
        .attr('transform', d => `translate(${x0(d.level)},0)`);
    
    // Pre-AI bars
    levelGroups.append('rect')
        .attr('x', x1('preAI'))
        .attr('y', d => y(d.preAI))
        .attr('width', x1.bandwidth())
        .attr('height', d => height - y(d.preAI))
        .attr('fill', '#007AFF')
        .attr('opacity', 0.8)
        .attr('rx', 4)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 1);
            showTooltip(event, `
                <strong>${d.level}</strong><br/>
                Pre-AI (2020-2022)<br/>
                Salary: <span style="color: #007AFF">$${d.preAI.toLocaleString()}</span>
            `);
        })
        .on('mousemove', function(event, d) {
            showTooltip(event, `
                <strong>${d.level}</strong><br/>
                Pre-AI (2020-2022)<br/>
                Salary: <span style="color: #007AFF">$${d.preAI.toLocaleString()}</span>
            `);
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            hideTooltip();
        });
    
    // Post-AI bars
    levelGroups.append('rect')
        .attr('x', x1('postAI'))
        .attr('y', d => y(d.postAI))
        .attr('width', x1.bandwidth())
        .attr('height', d => height - y(d.postAI))
        .attr('fill', '#34C759')
        .attr('opacity', 0.8)
        .attr('rx', 4)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 1);
            showTooltip(event, `
                <strong>${d.level}</strong><br/>
                Post-AI (2023-2025)<br/>
                Salary: <span style="color: #34C759">$${d.postAI.toLocaleString()}</span>
            `);
        })
        .on('mousemove', function(event, d) {
            showTooltip(event, `
                <strong>${d.level}</strong><br/>
                Post-AI (2023-2025)<br/>
                Salary: <span style="color: #34C759">$${d.postAI.toLocaleString()}</span>
            `);
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            hideTooltip();
        });
    
    // Value labels - MÁS SEPARADOS
    levelGroups.selectAll('.value-label-pre')
        .data(d => [d])
        .enter()
        .append('text')
        .attr('x', d => x1('preAI') + x1.bandwidth() / 2)
        .attr('y', d => y(d.preAI) - 8)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('font-weight', 'bold')
        .attr('fill', '#007AFF')
        .text(d => '$' + (d.preAI/1000).toFixed(0) + 'K');
    
    levelGroups.selectAll('.value-label-post')
        .data(d => [d])
        .enter()
        .append('text')
        .attr('x', d => x1('postAI') + x1.bandwidth() / 2)
        .attr('y', d => y(d.postAI) - 8)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('font-weight', 'bold')
        .attr('fill', '#34C759')
        .text(d => '$' + (d.postAI/1000).toFixed(0) + 'K');
    
    // Percentage change - MEJOR POSICIONADO Y VISIBLE
    levelGroups.selectAll('.change-arrow')
        .data(d => [d])
        .enter()
        .append('text')
        .attr('x', x0.bandwidth() / 2)
        .attr('y', -25)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .attr('fill', '#34C759')
        .style('text-shadow', '0 1px 3px rgba(0,0,0,0.3)')
        .text(d => {
            const change = ((d.postAI - d.preAI) / d.preAI * 100).toFixed(0);
            return `↑ ${change}%`;
        });
    
    // Legend - MEJOR UBICADA Y MÁS ARRIBA
    const legend = svg.append('g')
        .attr('transform', `translate(${width - 200}, -60)`);
    
    legend.append('rect')
        .attr('x', 0).attr('y', 0)
        .attr('width', 20).attr('height', 15)
        .attr('fill', '#007AFF')
        .attr('rx', 3);
    
    legend.append('text')
        .attr('x', 25).attr('y', 12)
        .style('font-size', '11px')
        .attr('fill', '#333')
        .text('Pre-AI (2020-2022)');
    
    legend.append('rect')
        .attr('x', 100).attr('y', 0)
        .attr('width', 20).attr('height', 15)
        .attr('fill', '#34C759')
        .attr('rx', 3);
    
    legend.append('text')
        .attr('x', 125).attr('y', 12)
        .style('font-size', '11px')
        .attr('fill', '#333')
        .text('Post-AI (2023-2025)');
    
    console.log('✅ Experience impact chart drawn');
}

// ═══════════════════════════════════════════════════════════════════
// 7. TAB 2 CHARTS - GLOBAL DISTRIBUTION
// ═══════════════════════════════════════════════════════════════════

function updateGlobalDistributionCharts() {
    drawWorldMap();
    drawTopCountriesChart();
    drawTreemap();
}

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
                .on('mousemove', function(event, d) {
                    let countryData = jobsMap.get(parseInt(d.id));
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

function drawTreemap() {
    const container = d3.select('#treemap-chart');
    container.html('');
    
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    
    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight - 40)
        .style('display', 'block');
    
    // Preparar datos planos correctamente
    const flatData = [];
    treemapData.children.forEach(dept => {
        dept.children.forEach(subdept => {
            flatData.push({
                department: dept.name,
                subdepartment: subdept.name,
                value: subdept.value
            });
        });
    });
    
    // Crear jerarquía plana
    const root = d3.hierarchy({ children: flatData })
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
    
    // Layout del treemap
    const treemap = d3.treemap()
        .size([containerWidth, containerHeight - 40])
        .paddingInner(3)
        .paddingOuter(5)
        .round(true);
    
    treemap(root);
    
    // Escala de color
    const colorScale = d3.scaleOrdinal()
        .domain(Object.keys(departmentColors))
        .range(Object.values(departmentColors));
    
    // Crear celdas
    const cell = svg.selectAll('g')
        .data(root.leaves())
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x0},${d.y0})`);
    
    // Rectángulos
    cell.append('rect')
        .attr('class', 'treemap-cell')
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .attr('fill', d => colorScale(d.data.department))
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            d3.select(this)
                .attr('opacity', 0.8)
                .attr('stroke', '#000')
                .attr('stroke-width', 3);
            
            const total = d3.sum(root.leaves(), n => n.value);
            const percentage = ((d.value / total) * 100).toFixed(1);
            
            showTooltip(event, `
                <strong>${d.data.department}</strong><br/>
                ${d.data.subdepartment}<br/>
                Investment: <span style="color: #34C759; font-weight: bold;">$${(d.value/1000000).toFixed(1)}M</span><br/>
                Share: ${percentage}%
            `);
        })
        .on('mousemove', function(event, d) {
            const total = d3.sum(root.leaves(), n => n.value);
            const percentage = ((d.value / total) * 100).toFixed(1);
            
            showTooltip(event, `
                <strong>${d.data.department}</strong><br/>
                ${d.data.subdepartment}<br/>
                Investment: <span style="color: #34C759; font-weight: bold;">$${(d.value/1000000).toFixed(1)}M</span><br/>
                Share: ${percentage}%
            `);
        })
        .on('mouseout', function() {
            d3.select(this)
                .attr('opacity', 1)
                .attr('stroke', 'white')
                .attr('stroke-width', 2);
            hideTooltip();
        });
    
    // Textos con mejor lógica de visibilidad
    cell.each(function(d) {
        const width = d.x1 - d.x0;
        const height = d.y1 - d.y0;
        const cell = d3.select(this);
        
        // Solo mostrar texto si hay espacio suficiente
        if (width > 80 && height > 40) {
            const text = cell.append('text')
                .attr('class', 'treemap-text')
                .attr('x', 5)
                .attr('y', 15)
                .style('font-size', width > 120 ? '12px' : '10px')
                .style('font-weight', 'bold')
                .attr('fill', 'white')
                .style('text-shadow', '1px 1px 2px rgba(0,0,0,0.7)');
            
            // Nombre del subdepartamento
            text.append('tspan')
                .attr('x', 5)
                .attr('dy', 0)
                .text(d.data.subdepartment);
            
            // Valor si hay espacio
            if (height > 55) {
                text.append('tspan')
                    .attr('x', 5)
                    .attr('dy', 14)
                    .style('font-size', width > 120 ? '11px' : '9px')
                    .text(`$${(d.value/1000000).toFixed(1)}M`);
            }
        }
    });
    
    // Leyenda externa mejorada
    const legendContainer = container.node().parentElement;
    let legendDiv = legendContainer.querySelector('.treemap-legend-external');
    
    if (!legendDiv) {
        legendDiv = document.createElement('div');
        legendDiv.className = 'treemap-legend-external';
        legendContainer.appendChild(legendDiv);
    }
    
    legendDiv.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-top: 15px;
        padding: 12px;
        background: #f9f9f9;
        border-radius: 8px;
        border: 1px solid #e5e5ea;
    `;
    
    legendDiv.innerHTML = `
        <span style="font-size: 12px; color: #666; font-weight: 600;">Low Investment</span>
        <div style="
            width: 220px;
            height: 14px;
            background: linear-gradient(to right, 
                ${Object.values(departmentColors)[0]}, 
                ${Object.values(departmentColors)[5]},
                ${Object.values(departmentColors)[10]});
            border-radius: 7px;
            border: 1px solid #ddd;
        "></div>
        <span style="font-size: 12px; color: #666; font-weight: 600;">High Investment</span>
    `;
    
    console.log('✅ Treemap chart drawn with correct structure');
}