# 📊 Tech Salary Analytics Dashboard - Unit 2

## 🎯 Project Overview

The **Tech Salary Analytics Dashboard** is an advanced data visualization microservice that transforms complex tech salary data into interactive, multi-dimensional visual analytics. Built for Unit 2 of the Visualization Tools course, this dashboard provides comprehensive insights into global technology workforce trends, AI impact analysis, and network employment patterns.

### Key Features

- **🌍 Spatiotemporal Analysis**: Interactive world maps, temporal evolution charts, and department-wise salary trends (2020-2025)
- **🔷 Hierarchical Analysis**: Multi-level treemaps, bubble charts, sunburst diagrams, and comparative matrices
- **🔗 Network Analysis**: Force-directed graphs, centrality rankings, and community detection visualization
- **📈 AI Impact Tracking**: Pre-AI vs Post-AI era comparison with 2023 inflection point analysis
- **🎨 Apple-Inspired Design**: Modern, clean UI with smooth animations and responsive layouts

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Flask Application                        │
│                      (app.py)                               │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ├── Serves HTML Templates
                 │   └── templates/Project/main.html
                 │
                 ├── Static Assets
                 │   ├── CSS (Apple-style design)
                 │   ├── JavaScript (D3.js visualizations)
                 │   └── JSON Data (tech_salary_analytics.json)
                 │
                 └── Data Flow
                     └── JSON → D3.js → Interactive Charts
```

## 📁 Project Structure

```
Unidad_2/
│
├── static/
│   └── Project/
│       ├── css/
│       │   └── main.css                    # Apple-inspired styling
│       └── js/
│           ├── main.js                     # Core visualization logic
│           └── tech_salary_analytics.json  # Complete dataset
│
├── templates/
│   └── Project/
│       └── main.html                       # Main dashboard template
│
└── Docs/
    ├── Checkpoint1/                        # Documentation phase 1
    └── Checkpoint2/                        # Documentation phase 2
```

## 📊 Data Structure

The dashboard consumes a comprehensive JSON dataset with three main analysis dimensions:

### 1. Spatiotemporal Analysis
```json
{
  "spatiotemporal": {
    "globalSalaryData": [...],      // Yearly aggregate data (2020-2025)
    "departmentData": {...},         // Department-wise trends
    "worldMapData": {...},           // Geographic distribution
    "aiComparison": {...}            // Pre-AI vs Post-AI metrics
  }
}
```

### 2. Hierarchical Analysis
```json
{
  "hierarchical": {
    "regions": [...],                // 5 global regions
    "topJobsByRegion": {...},       // Top 5 roles per region
    "aiComparison": {...}            // Regional AI impact
  }
}
```

### 3. Network Analysis
```json
{
  "network": {
    "network": {
      "nodes": [...],                // Countries as network nodes
      "links": [...]                 // Employment flow connections
    },
    "stats": {...},                  // Network metrics
    "topInfluencers": [...],         // Centrality rankings
    "communities": [...]             // Louvain community detection
  }
}
```

## 🎨 Visualization Catalog

### Tab 1: Spatiotemporal Analysis

| Visualization | Type | Purpose | Key Insights |
|--------------|------|---------|--------------|
| **Global Distribution Map** | Choropleth | Geographic job concentration | USA leads with 15K+ positions |
| **Top 10 Countries** | Horizontal Bar Chart | Employment ranking | Comparative market size |
| **Department Evolution** | Multi-line Chart | Salary trends by department | Top 5 highest-paying roles |
| **Temporal Evolution** | Area Chart | Global salary growth | 2023 AI inflection point |

### Tab 2: Hierarchical Analysis

| Visualization | Type | Purpose | Key Insights |
|--------------|------|---------|--------------|
| **Hierarchical Treemap** | Interactive Treemap | Region→Country drill-down | Size = total jobs (9% grouping) |
| **Bubble Chart** | Scatter Plot | Salary vs Employment matrix | Regional competitiveness |
| **Sunburst Diagram** | Radial Hierarchy | Regional role distribution | Top 5 roles per region |
| **Comparative Matrix** | 4-Bar Chart Grid | Multi-metric comparison | Salary, jobs, countries, variance |

### Tab 3: Network Analysis

| Visualization | Type | Purpose | Key Insights |
|--------------|------|---------|--------------|
| **Force-Directed Graph** | Network Graph | Employment flow patterns | Drag nodes, zoom/pan enabled |
| **Centrality Ranking** | Bar Chart | Network hub identification | Top 10 connected countries |
| **Community Detection** | Clustered Circles | Regional clustering | Louvain algorithm results |

## 🚀 Setup & Installation

### Prerequisites

- Python 3.8+
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for CDN resources)

### Local Development

1. **Clone the repository**
   ```bash
   cd Web/Unidad_2
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file
   API_ENDPOINT_UNIT2=https://your-api-endpoint.com/api/unit-2/project
   ```

4. **Run the Flask application**
   ```bash
   python app.py
   ```

5. **Access the dashboard**
   ```
   http://127.0.0.1:502/project/unit2
   ```

### Docker Deployment

```bash
# Build the container
docker build -t tech-salary-dashboard .

# Run the container
docker run -p 502:502 --env-file .env tech-salary-dashboard
```

## 🔧 Configuration

### Flask Routes (app.py)

```python
# Main dashboard route
@app.route('/project/unit2')
def project_unit2():
    return render_template('unidad2/Project/main.html', 
                         api_endpoint=API_ENDPOINT_UNIT2)

# Static file routes
@app.route('/unidad2/proyecto/<path:filename>')
def unidad2_proyecto_static(filename):
    static_dir = os.path.join(os.path.dirname(__file__), 
                             'Unidad_2', 'static', 'Project')
    return send_from_directory(static_dir, filename)

# JSON data route
@app.route('/project/tech_salary_analytics.json')
def tech_salary_analytics_json():
    static_dir = os.path.join(os.path.dirname(__file__), 
                             'Unidad_2', 'static', 'Project', 'js')
    return send_from_directory(static_dir, 'tech_salary_analytics.json')
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `API_ENDPOINT_UNIT2` | Backend API endpoint | `https://upy-homeworks.xpert-ia.com.mx/visualization-tools/api/unit-2/project` |
| `FLASK_ENV` | Environment mode | `development` |
| `FLASK_DEBUG` | Debug mode | `True` |

## 📚 Technology Stack

### Backend
- **Flask 2.3.3**: Web framework
- **Jinja2**: Template engine
- **python-dotenv**: Environment management

### Frontend
- **D3.js 7.8.5**: Core visualization library
- **TopoJSON 3.0**: Geographic data processing
- **Tabler Icons**: Icon system
- **Pure CSS3**: Apple-inspired styling

### Data Format
- **JSON**: Structured dataset (28,050 records)
- **GeoJSON**: World map topology

## 🎯 Key Functionality

### 1. Data Loading System

```javascript
async function loadTechSalaryData() {
    const possiblePaths = [
        '/project/tech_salary_analytics.json',
        '/static/Project/js/tech_salary_analytics.json',
        // Fallback paths...
    ];
    
    // Automatic path resolution
    for (const path of possiblePaths) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                const data = await response.json();
                // Load into global state
                globalSalaryData = data.spatiotemporal.globalSalaryData;
                hierarchicalData = data.hierarchical;
                networkData = data.network;
                return true;
            }
        } catch (err) {
            console.log(`Failed path: ${path}`);
        }
    }
}
```

### 2. Interactive Tooltip System

```javascript
function showTooltip(event, html) {
    const tooltip = d3.select('#tooltip');
    tooltip.html(html);
    tooltip.style('opacity', 1);
    
    // Smart positioning (avoids screen edges)
    let left = event.clientX + 15;
    let top = event.clientY - tooltipHeight - 15;
    
    // Boundary checks...
    tooltip.style('left', left + 'px').style('top', top + 'px');
}
```

### 3. Tab Navigation System

```javascript
function changeTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content')
            .forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Trigger chart updates
    if (tabName === 'spatiotemporal') {
        updateSpatiotemporalCharts();
    } else if (tabName === 'hierarchical') {
        updateHierarchicalCharts();
    } else if (tabName === 'detalle') {
        updateNetworkCharts();
    }
}
```

### 4. Responsive Chart Resizing

```javascript
function setupResponsiveResize() {
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const activeTab = document.querySelector('.tab-content.active');
            // Redraw active charts only
            if (activeTab.id === 'spatiotemporal') {
                updateSpatiotemporalCharts();
            }
            // ... other tabs
        }, 250);
    });
}
```

## 🔍 Chart Implementation Details

### World Map (Choropleth)

**Features:**
- D3 Mercator projection
- Zoom & pan (1x-8x scale)
- ISO3 country code mapping
- Color intensity = job density
- Gradient legend

**Key Code:**
```javascript
const projection = d3.geoMercator()
    .scale(width / 7.5)
    .center([0, 20])
    .translate([width / 2, height / 2]);

const colorScale = d3.scaleLinear()
    .domain([0, maxJobs])
    .range(['#e3f2fd', '#1565c0']);

// Map 95 countries with tooltips
g.selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', d => colorScale(jobsMap.get(d.id)))
    .on('mouseover', showCountryTooltip);
```

### Department Evolution (Multi-line)

**Features:**
- Interactive legend (click to toggle)
- Top 5 highest-paying departments
- Realistic salary variation (±1.5% noise)
- 2023 AI adoption marker
- Smooth curve interpolation

**Key Code:**
```javascript
function addRealisticVariation(data) {
    return data.map((d, i) => {
        const yearTrend = (d.year - 2020) * 1200; // Growth
        const randomNoise = (Math.random() - 0.5) * 4000;
        return {
            ...d,
            salary: Math.round(d.salary + yearTrend + randomNoise)
        };
    });
}

// Interactive legend
legendItem.on('click', function() {
    const isActive = activeDepartments.has(dept);
    if (isActive) {
        activeDepartments.delete(dept);
        svg.select(`.dept-group-${dept}`).style('opacity', 0);
    } else {
        activeDepartments.add(dept);
        svg.select(`.dept-group-${dept}`).style('opacity', 1);
    }
});
```

### Hierarchical Treemap

**Features:**
- Drill-down navigation (click regions)
- Right-click to return
- Size = total jobs (not salary-weighted)
- Regions <9% grouped into "Other Regions"
- Smooth transitions (600ms)

**Key Code:**
```javascript
function updateTreemap(viewType, selectedRegion = null) {
    if (viewType === 'global') {
        // Group small regions (<9%)
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
        
        // Add "Other Regions" group
        if (smallRegions.length > 0) {
            children.push({
                name: 'Other Regions',
                value: smallRegions.reduce((sum, r) => sum + r.totalJobs, 0),
                type: 'grouped',
                regions: smallRegions
            });
        }
    }
    
    // D3 treemap layout
    d3.treemap()
        .size([width, height])
        .paddingTop(30)
        .paddingInner(3)
        (root);
}
```

### Network Force-Directed Graph

**Features:**
- Draggable nodes
- Zoom & pan navigation
- Community colors (4 groups)
- Node size = total jobs
- Edge thickness = salary flow

**Key Code:**
```javascript
const simulation = d3.forceSimulation(networkData.nodes)
    .force('link', d3.forceLink(networkData.links)
        .id(d => d.id)
        .distance(150)
        .strength(0.5))
    .force('charge', d3.forceManyBody().strength(-800))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide()
        .radius(d => sizeScale(d.jobs) + 15));

// Drag behavior
.call(d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended))
```

## 📊 Data Insights

### Key Metrics (2020-2025)

| Metric | Pre-AI Era<br/>(2020-2022) | Post-AI Era<br/>(2023-2025) | Growth |
|--------|-------------------|---------------------|--------|
| **Avg Salary** | $119,515 | $146,020 | **+22.2%** |
| **Total Jobs** | 2,277 | 25,773 | **+1032%** |
| **Median Salary** | $112,900 | $137,000 | **+21.3%** |
| **Peak Salary** | — | $156,580 (2023) | — |

### Regional Distribution

| Region | Jobs | Avg Salary | Countries | Growth |
|--------|------|------------|-----------|--------|
| **North America** | 6,200 | $138,625 | 4 | +23.5% |
| **Europe** | 2,912 | $76,885 | 31 | +18.9% |
| **Asia Pacific** | 562 | $75,247 | 13 | +32.8% |
| **Africa & Middle East** | 81 | $102,267 | 11 | +28.5% |
| **South America** | 52 | $67,308 | 5 | +45.9% |

### Top 5 Departments (Avg Salary)

1. **Executive & Leadership**: $158,840
2. **Engineering & Development**: $161,469
3. **Cybersecurity**: $139,770
4. **Sales & Consulting**: $148,820
5. **Information Technology**: $135,834

### Network Analysis

- **Total Nodes**: 95 countries
- **Total Edges**: 180 employment flows
- **Network Density**: 0.0201 (sparse network)
- **Communities Detected**: 5 (Louvain algorithm)
- **Top Hub**: United States (degree = 95)

## 🎨 Design System

### Color Palette

```css
:root {
    /* Apple Colors */
    --apple-blue: #007AFF;
    --apple-blue-hover: #0051D5;
    --apple-bg: #F5F5F7;
    --apple-white: #FFFFFF;
    --apple-gray-light: #F9F9F9;
    --apple-gray: #E5E5EA;
    --apple-gray-dark: #8E8E93;
    --apple-text: #1D1D1F;
    --apple-text-secondary: #6E6E73;
    
    /* Status Colors */
    --pre-ai-color: #007AFF;
    --post-ai-color: #34C759;
    --growth-positive: #34C759;
    --growth-negative: #FF3B30;
}
```

### Typography

```css
body {
    font-family: -apple-system, BlinkMacSystemFont, 
                 'SF Pro Display', 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

### Shadows & Borders

```css
:root {
    /* Shadows */
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
    
    /* Border Radius */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
}
```

## 📱 Responsive Design

### Breakpoints

| Device | Width | Adjustments |
|--------|-------|-------------|
| **Desktop** | ≥1100px | Full 2-column grid |
| **Tablet** | 768px-1099px | Single column, reduced chart height |
| **Mobile** | ≤767px | Stacked layout, smaller fonts, vertical tabs |
| **Small Mobile** | ≤480px | Minimal padding, compact stats |

### Chart Height Scaling

```css
/* Desktop */
#world-map-chart { height: 550px; }
#department-evolution-chart { height: 400px; }
#network-force-chart { height: 600px; }

/* Tablet */
@media (max-width: 768px) {
    #world-map-chart { height: 400px; }
    #department-evolution-chart { height: 350px; }
    #network-force-chart { height: 450px; }
}

/* Mobile */
@media (max-width: 480px) {
    #world-map-chart { height: 400px; }
    #department-evolution-chart { height: 300px; }
    #network-force-chart { height: 400px; }
}
```

## 🐛 Troubleshooting

### Common Issues

#### 1. JSON File Not Found

**Symptom:**
```
❌ Error loading data: Could not load JSON from any path
```

**Solution:**
```bash
# Verify file exists
ls Web/Unidad_2/static/Project/js/tech_salary_analytics.json

# Check Flask route
curl http://127.0.0.1:502/project/tech_salary_analytics.json

# Verify file permissions
chmod 644 tech_salary_analytics.json
```

#### 2. Charts Not Rendering

**Symptom:**
- Blank white spaces where charts should appear
- Console errors: `d3 is not defined`

**Solution:**
```html
<!-- Verify CDN scripts are loaded -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
<script src="https://d3js.org/topojson.v3.min.js"></script>

<!-- Check browser console for errors -->
<!-- Ensure JavaScript executes after DOM loads -->
<script>
document.addEventListener('DOMContentLoaded', async function() {
    await loadTechSalaryData();
    updateSpatiotemporalCharts();
});
</script>
```

#### 3. Tooltip Not Showing

**Symptom:**
- Hover events work but tooltip doesn't appear

**Solution:**
```css
/* Verify tooltip styling */
.tooltip {
    position: fixed;
    z-index: 10000;
    pointer-events: none;
    opacity: 0; /* Changed by JS */
}
```

```javascript
// Check tooltip div exists
<div class="tooltip" id="tooltip"></div>

// Verify showTooltip() is called
console.log('Tooltip triggered:', event);
```

#### 4. World Map Missing Countries

**Symptom:**
- Some countries render as gray (no data)

**Solution:**
```javascript
// Verify ISO3 mapping
const iso3ToId = {
    'USA': 840,  // Correct
    'CAN': 124,
    // Add missing countries...
};

// Check data structure
console.log('Countries in data:', worldMapData.countries.length);
console.log('Mapped countries:', Object.keys(iso3ToId).length);
```

#### 5. Department Legend Not Toggling

**Symptom:**
- Click legend but lines don't hide/show

**Solution:**
```javascript
// Verify class naming consistency
const deptClass = sanitizeClassName(dept); // Convert "Executive & Leadership" → "Executive-and-Leadership"

// Check SVG group selection
svg.select(`.dept-group-${deptClass}`)
   .style('opacity', isActive ? 1 : 0);

// Debug state
console.log('Active departments:', activeDepartments);
```

#### 6. Network Graph Not Draggable

**Symptom:**
- Nodes don't move when dragged

**Solution:**
```javascript
// Ensure drag behavior is attached
.call(d3.drag()
    .on('start', function(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    })
    .on('drag', function(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    })
    .on('end', function(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null; // Release fixed position
        d.fy = null;
    }));
```

#### 7. Treemap Not Drilling Down

**Symptom:**
- Click regions but view doesn't change

**Solution:**
```javascript
// Check state management
if (!window.treemapState) {
    window.treemapState = { view: 'global', region: null };
}

// Verify click handler
.on('click', function(event, d) {
    if (d.data.type === 'region') {
        window.treemapState.view = 'region';
        window.treemapState.region = d.data.name;
        updateTreemap('region', d.data.name);
    }
});

// Debug state transitions
console.log('Treemap state:', window.treemapState);
```

### Performance Optimization

#### Slow Chart Rendering

**Problem:** Charts take >3 seconds to load

**Solutions:**

1. **Reduce data points**
   ```javascript
   // For temporal charts, use yearly aggregates instead of monthly
   const yearlyData = data.filter(d => d.month === 1);
   ```

2. **Implement progressive loading**
   ```javascript
   async function loadChartsProgressively() {
       await drawWorldMap();
       await new Promise(resolve => setTimeout(resolve, 50));
       await drawTopCountriesChart();
       // Stagger chart rendering...
   }
   ```

3. **Debounce resize events**
   ```javascript
   let resizeTimer;
   window.addEventListener('resize', function() {
       clearTimeout(resizeTimer);
       resizeTimer = setTimeout(redrawCharts, 250); // Wait 250ms
   });
   ```

#### High Memory Usage

**Problem:** Browser tab uses >500MB RAM

**Solutions:**

1. **Clear old visualizations**
   ```javascript
   function drawChart() {
       // Remove old chart before drawing new one
       d3.select('#chart').selectAll('*').remove();
       
       // Draw new chart
       const svg = d3.select('#chart').append('svg');
   }
   ```

2. **Limit network graph nodes**
   ```javascript
   // Show only top 50 nodes instead of all 95
   const topNodes = networkData.nodes
       .sort((a, b) => b.jobs - a.jobs)
       .slice(0, 50);
   ```

### Browser Compatibility

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| **Chrome** | ≥90 | ✅ Full Support | Recommended |
| **Firefox** | ≥88 | ✅ Full Support | Works perfectly |
| **Safari** | ≥14 | ✅ Full Support | Requires `-webkit-` prefixes |
| **Edge** | ≥90 | ✅ Full Support | Chromium-based |
| **IE11** | — | ❌ Not Supported | D3.js v7 requires ES6 |

### Debugging Tools

```javascript
// Enable verbose logging
localStorage.setItem('DEBUG_CHARTS', 'true');

if (localStorage.getItem('DEBUG_CHARTS')) {
    console.log('📊 Data loaded:', globalSalaryData);
    console.log('🗺️ Map data:', worldMapData);
    console.log('🔷 Hierarchical data:', hierarchicalData);
    console.log('🔗 Network data:', networkData);
}

// Performance monitoring
console.time('Chart Render');
drawWorldMap();
console.timeEnd('Chart Render'); // Chart Render: 1847ms
```

## 🔐 Security Considerations

### Data Sanitization

```javascript
// Sanitize country names for class attributes
function sanitizeClassName(name) {
    return name
        .replace(/\s+/g, '-')           // Spaces → hyphens
        .replace(/&/g, 'and')            // & → and
        .replace(/[()]/g, '')            // Remove parentheses
        .replace(/[^a-zA-Z0-9-]/g, '');  // Remove special chars
}
```

### XSS Prevention

```javascript
// Always use .text() instead of .html() for user data
svg.append('text')
    .text(d.countryName); // Safe ✅

// If HTML is required, sanitize first
const sanitizedHTML = DOMPurify.sanitize(userInput);
tooltip.html(sanitizedHTML);
```

## 📈 Future Enhancements

### Planned Features

1. **Export Capabilities**
   - SVG download for charts
   - CSV export for filtered data
   - PNG/PDF report generation

2. **Advanced Filters**
   - Date range selector
   - Department multi-select
   - Salary range slider
   - Country search/filter

3. **Real-time Updates**
   - WebSocket integration
   - Live data streaming
   - Auto-refresh every 5 minutes

4. **AI Predictions**
   - Salary trend forecasting (2026-2030)
   - Job demand prediction
   - Regional growth projections

5. **User Preferences**
   - Save favorite views
   - Custom color themes
   - Persistent filter state

## 👥 Contributors

- **Alan Valbuena** - Lead Developer & Data Analyst
- **Sergio Barrera** - Frontend Engineer & UX Designer

## 📄 License

This project is part of the **Visualization Tools IX** course at Universidad Politécnica de Yucatán. All rights reserved.


**Last Updated:** November 3, 2025  
**Version:** 2.0.0  
**Dashboard Status:** ✅ Production Ready