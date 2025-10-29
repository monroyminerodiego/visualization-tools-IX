# 🌍 Terra Cotta Foods - Global Market Analytics Dashboard

## 🎯 Checkpoint Objective

**Unit 2 Checkpoint 2** focuses on **Hierarchical Data Visualization** using **Plotly.js**. This checkpoint implements an interactive executive dashboard for analyzing global market expansion opportunities through treemaps, scatter plots, sunburst charts, and multi-dimensional comparisons.

## 📚 Theoretical Foundation

### Hierarchical Visualization Concepts Implemented

#### 1. **Treemap Analysis**
- Space-filling hierarchical visualization
- Proportional area representation (GDP = market capacity)
- Global → Region → Country drill-down structure
- Intelligent grouping of countries with GDP < $100B
- Interactive pathbar navigation

#### 2. **Scatter Plot Correlation**
- Two-dimensional relationship analysis
- Logarithmic scaling for population (workforce)
- Bubble size encoding (Total GDP)
- Top 10 markets by GDP focus
- Multi-series regional comparison

#### 3. **Sunburst Hierarchical Structure**
- Radial hierarchical visualization
- Proportional arc length representation
- Center-to-periphery information flow
- Interactive zoom and exploration
- Parent-child relationship encoding

#### 4. **Matrix Comparison Dashboard**
- Multi-metric simultaneous comparison
- 2×2 grid layout for 4 key dimensions
- Synchronized color encoding by region
- Independent axis scaling per metric
- Strategic decision support

#### 5. **Executive Recommendations**
- Data-driven priority ranking
- Strategic segmentation logic
- Actionable insights generation
- Top 10 investment targets

## 🏗 Dashboard Architecture

```
Frontend (Flask + Plotly.js)
     │
     ├─→ Embedded Data (main.js)
     │   ├── 4 Regions
     │   └── 194 Countries
     │
     ├─→ Interactive Visualizations
     │   ├── Treemap (Hierarchical GDP)
     │   ├── Scatter (Population vs GDP per Capita)
     │   ├── Matrix (4-Metric Comparison)
     │   ├── Sunburst (Proportional Structure)
     │   └── Recommendations Table
     │
     └─→ Tab System
         ├── Market Overview
         ├── Regional Analysis
         └── Strategic Insights
```

## 🎨 Visual Components

### 🌐 KPI Dashboard
- **Total Global GDP**: Aggregate market capacity across all regions
- **Top 5 Concentration**: Market share of 5 largest economies
- **Regions Covered**: Number of strategic regions analyzed
- **Total Population**: Global workforce/consumer base

### 📊 Market Overview Tab

#### 1. Treemap - Purchasing Power Hierarchy
**Purpose**: Visualize hierarchical market structure from global to country level

**Data Encoding**:
- **Area Size** = Total GDP (billions USD)
- **Color** = Region affiliation
- **Hierarchy** = Global → Region → Country
- **Grouping Logic**: Countries with GDP < $100B grouped as "Other"

**Interactive Features**:
- Click-to-drill from global to regional to country level
- Pathbar navigation for hierarchy context
- Hover tooltips with exact GDP values
- Responsive resizing

**Strategic Insight**: Immediately identifies largest market opportunities and their proportional weight in the global economy.

#### 2. Scatter Plot - Viability Matrix
**Purpose**: Correlate workforce availability (population) with purchasing power (GDP per capita)

**Data Encoding**:
- **X-Axis** = Population (log scale) → Workforce size
- **Y-Axis** = GDP per Capita (USD) → Individual purchasing power
- **Bubble Size** = Total GDP → Aggregate market capacity
- **Color** = Region
- **Data Scope** = Top 10 countries by GDP

**Strategic Insight**: Answers "Where can we manufacture (large population) with economic viability (high GDP per capita)?"

### 🗺 Regional Analysis Tab

#### 3. Matrix Comparison - 4-Metric Dashboard
**Purpose**: Multi-dimensional regional comparison across strategic metrics

**Metrics Visualized**:
1. **Total GDP** (Market Capacity)
   - Aggregate purchasing power per region
   - Direct indicator for distribution center investment

2. **GDP per Capita** (Purchasing Power)
   - Individual consumer spending capacity
   - Premium product viability indicator

3. **Number of Countries** (Diversification)
   - Risk distribution across multiple markets
   - Supply chain resilience factor

4. **Total Population** (Workforce)
   - Available labor for manufacturing
   - Consumer base size

**Layout**: 2×2 grid with independent axes, synchronized colors

**Strategic Insight**: Enables multi-factor decision making: "Which region optimizes workforce, purchasing power, and market size?"

#### 4. Sunburst - Proportional Market Structure
**Purpose**: Radial hierarchical visualization of market contribution

**Data Encoding**:
- **Inner Ring** = Regions
- **Outer Ring** = Countries
- **Arc Length** = Proportional to GDP
- **Color Intensity** = Hierarchy depth
- **Grouping** = Countries with GDP < $100B combined

**Interactive Features**:
- Click to zoom into specific regions
- Hover for GDP values and percentage contribution
- Radial text orientation for readability

**Strategic Insight**: Visual understanding of proportional market importance and regional concentration.

### 💡 Strategic Insights Tab

#### 5. Recommendations Table
**Purpose**: Executive summary with actionable investment priorities

**Table Structure**:
- **Ranking**: Top 10 countries by Total GDP
- **Columns**:
  - Country name
  - Region (color-coded)
  - Total GDP (market capacity)
  - GDP per Capita (purchasing power)
  - Population (workforce)
  - Strategic Recommendation

**Recommendation Logic**:
```javascript
if (gdpTotal > 10000B) → "🌟 Giant Market - Maximum Priority"
else if (gdpTotal > 3000B && gdpPerCapita > 40000) → "💎 High Value - Premium Products"
else if (population > 200M) → "👥 Massive Base - Economies of Scale"
else if (gdpPerCapita > 50000) → "💰 High Purchasing Power"
else → "📈 Viable Emerging Market"
```

**Strategic Insights Panel**:
- Priority distribution centers by region
- High-value market identification
- Latin America opportunity analysis
- Pricing strategy recommendations
- Manufacturing location suggestions

## 📊 Data Structure

### Embedded Data Architecture

```javascript
const marketData = {
  "regions": [
    {
      "name": "Asia Pacific",
      "countries": [
        {
          "name": "China",
          "population": 1408975000,
          "gdpPerCapita": 13303.15,
          "gdpTotal": 18747.54,
          "code": "CHN"
        },
        // ... 36 more countries
      ]
    },
    // ... 3 more regions
  ]
};
```

### Color Encoding System

```javascript
const regionColors = {
    'Asia Pacific': '#10b981',      // Green
    'North America': '#667eea',     // Blue
    'Latin America': '#ec4899',     // Pink
    'Middle East & Africa': '#8b5cf6' // Purple
};
```

## 🗂 Project Structure

```
Web/
│
├── static/
│   ├── Portfolio/
│   │   ├── css/
│   │   │   └── checkpoint2/
│   │   │       └── main.css           # Dashboard styles
│   │   └── js/
│   │       └── checkpoint2/
│   │           └── main.js            # Plotly visualizations + embedded data
│
├── templates/
│   └── Portfolio/
│       └── checkpoint2/
│           └── main.html              # Dashboard template
│
├── app.py                             # Flask application
├── requirements.txt
└── README_U2_C2.md
```

## 🎨 Technology Stack

### Frontend
- **Plotly.js 2.26.0** - Interactive hierarchical visualizations
- **Flask 2.3.3** - Web framework
- **Tabler Icons** - Modern iconography
- **Custom CSS** - Dashboard styling
- **Vanilla JavaScript** - Tab system and KPI calculations

### Data
- **Embedded JSON** - 194 countries across 4 regions
- **No external API** - Self-contained application
- **Real GDP data** - 2024 estimates (World Bank/IMF)

## 📌 Routes

| Route | Method | Description | Data Source |
|-------|--------|-------------|-------------|
| / | GET | Main navigation | - |
| /portfolio/checkpoint2 | GET | Terra Cotta Foods Dashboard | Embedded in main.js |

## 🔄 Data Flow

```
[User Accesses Dashboard]
       │
       ▼
[Flask Renders main.html]
       │
       ▼
[Browser Loads main.js with Embedded Data]
       │
       ▼
[JavaScript Initialization]
   - Calculate KPIs
   - Render default tab (Market Overview)
   - Setup event listeners
       │
       ▼
[Plotly.js Renders Visualizations]
   - Treemap (hierarchical)
   - Scatter plot (correlation)
   - Matrix (comparison)
   - Sunburst (proportional)
       │
       ▼
[User Interactions]
   - Tab switching
   - Click-to-drill (treemap/sunburst)
   - Hover tooltips
   - Window resize (responsive)
```

## 🎯 Plotly.js Implementation Patterns

### 1. Treemap with Intelligent Grouping

```javascript
const GDP_THRESHOLD = 100; // Group countries < $100B

// Separate major and minor countries
region.countries.forEach(country => {
    if (country.gdpTotal >= GDP_THRESHOLD) {
        majorCountries.push(country);
    } else {
        minorCountries.push(country);
    }
});

// Add major countries individually
majorCountries.forEach(country => {
    labels.push(country.name);
    parents.push(region.name);
    values.push(country.gdpTotal);
});

// Group minor countries
if (minorCountries.length > 0) {
    const minorTotal = minorCountries.reduce((sum, c) => sum + c.gdpTotal, 0);
    labels.push(`Other ${region.name} (${minorCountries.length})`);
    parents.push(region.name);
    values.push(minorTotal);
}
```

### 2. Scatter Plot with Top 10 Focus

```javascript
// Get top 10 countries by GDP
const allCountries = [];
marketData.regions.forEach(region => {
    region.countries.forEach(country => {
        allCountries.push({ ...country, region: region.name });
    });
});

const top10Countries = allCountries
    .sort((a, b) => b.gdpTotal - a.gdpTotal)
    .slice(0, 10);

// Proportional bubble sizing
const MIN_SIZE = 25;
const MAX_SIZE = 70;
const scaledSizes = sizes.map(gdp => {
    const normalized = (gdp - minGDP) / (maxGDP - minGDP);
    return MIN_SIZE + (normalized * (MAX_SIZE - MIN_SIZE));
});
```

### 3. Matrix Comparison (2×2 Grid)

```javascript
const layout = {
    grid: {
        rows: 2,
        columns: 2,
        pattern: 'independent',
        roworder: 'top to bottom',
        xgap: 0.18,
        ygap: 0.25
    },
    xaxis1: { domain: [0, 0.41] },      // Top-left
    yaxis1: { domain: [0.62, 1] },
    xaxis2: { domain: [0.59, 1] },      // Top-right
    yaxis2: { domain: [0.62, 1] },
    xaxis3: { domain: [0, 0.41] },      // Bottom-left
    yaxis3: { domain: [0, 0.38] },
    xaxis4: { domain: [0.59, 1] },      // Bottom-right
    yaxis4: { domain: [0, 0.38] }
};
```

### 4. Sunburst with Hierarchical Colors

```javascript
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
    insidetextorientation: 'radial'
}];
```

### 5. Responsive Resize Handler

```javascript
function setupResponsiveResize() {
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const activeTab = document.querySelector('.tab-content.active');
            const tabId = activeTab.id;
            
            if (tabId === 'market-overview') {
                Plotly.Plots.resize('treemap-chart');
                Plotly.Plots.resize('scatter-chart');
            } else if (tabId === 'regional-analysis') {
                Plotly.Plots.resize('matrix-chart');
                Plotly.Plots.resize('sunburst-chart');
            }
        }, 250);
    });
}
```

## 🛠 Setup and Execution

### Prerequisites
- Python 3.8+
- Modern browser with SVG/Canvas support
- No external APIs required (data embedded)

### Local Installation

1. **Navigate to project**
```bash
cd Web
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Run application**
```bash
python app.py
```

### Access URL
- **Dashboard**: http://localhost:5000/portfolio/checkpoint2

## 🎨 Dashboard Features

### Tab 1: Market Overview

#### Treemap Interactions
- **Click region** → Drill down to countries
- **Click country** → Focus on individual market
- **Click pathbar** → Navigate back up hierarchy
- **Hover** → See exact GDP values
- **Grouped countries** → "Other [Region]" for GDP < $100B

#### Scatter Plot Interactions
- **Hover bubble** → See country details (population, GDP per capita, total GDP)
- **Legend click** → Toggle region visibility
- **Zoom/pan** → Explore specific quadrants
- **Color coding** → Regional identification

### Tab 2: Regional Analysis

#### Matrix Comparison
- **4 independent charts** → Total GDP, GDP per Capita, Country Count, Population
- **Synchronized colors** → Same region = same color across all charts
- **Hover bars** → Exact metric values
- **Visual comparison** → Side-by-side regional performance

#### Sunburst Interactions
- **Click inner ring** → Zoom to region
- **Click outer ring** → Highlight country
- **Hover** → GDP value and percentage share
- **Center click** → Reset to global view

### Tab 3: Strategic Insights

#### Recommendations Table
- **Top 10 ranking** → Sorted by Total GDP
- **Color-coded regions** → Visual regional identification
- **Strategic labels** → Automated recommendations
- **Executive insights panel** → Key takeaways for decision-makers

## 📊 Strategic Decision Support

### Question: "Where should we open distribution centers?"
**Answer**: Treemap + Matrix
- **Treemap** shows proportional market size (GDP)
- **Matrix** compares regional total GDP
- **Top priority**: Asia Pacific ($34.2T), North America ($33.3T)

### Question: "Which markets have both workforce and purchasing power?"
**Answer**: Scatter Plot
- **Top-right quadrant**: High population + High GDP per capita
- **Examples**: USA, Japan, South Korea
- **Manufacturing + Premium products strategy**

### Question: "What's the risk diversification across regions?"
**Answer**: Matrix (Country Count metric)
- **Asia Pacific**: 37 countries → High diversification
- **North America**: 3 countries → Concentrated risk
- **Strategy**: Hedge with Asia Pacific expansion

### Question: "Where is the proportional contribution of each market?"
**Answer**: Sunburst
- **Visual hierarchy**: Global → Region → Country
- **Percentage shares**: Hover to see % of parent
- **Example**: China = 54.8% of Asia Pacific GDP

## 🔧 Key Technical Decisions

### Why Embed Data Instead of API?
1. **Performance**: No network latency
2. **Reliability**: No API downtime risk
3. **Simplicity**: Single-file deployment
4. **Education**: Clear data structure visibility

### Why Group Small Countries in Treemap?
1. **Visual Clarity**: Prevent label overlap for 194 countries
2. **Focus**: Highlight major markets (GDP > $100B)
3. **Hierarchy Depth**: Limit drill-down complexity
4. **Performance**: Reduce DOM elements

### Why Top 10 Only in Scatter Plot?
1. **Readability**: Prevent bubble overlap
2. **Strategic Focus**: Target highest-value markets
3. **Label Legibility**: Country codes fit inside bubbles
4. **Decision Support**: CEO focuses on top opportunities

### Why 2×2 Matrix Instead of Single Chart?
1. **Multi-dimensional Analysis**: 4 metrics simultaneously
2. **Independent Scaling**: Each metric has optimal axis range
3. **Visual Comparison**: Side-by-side regional bars
4. **Executive Summary**: Holistic regional evaluation

## 🛠 Troubleshooting

### Treemap Not Rendering
```javascript
// Check data structure
console.log("Labels:", labels.length);
console.log("Parents:", parents.length);
console.log("Values:", values.length);
// All arrays must have same length
```

### Scatter Plot Bubbles Too Small/Large
```javascript
// Adjust size scaling constants
const MIN_SIZE = 25;  // Increase for larger minimum
const MAX_SIZE = 70;  // Increase for larger maximum
```

### Matrix Charts Overlapping
```javascript
// Adjust grid gaps
grid: {
    xgap: 0.18,  // Increase for more horizontal space
    ygap: 0.25   // Increase for more vertical space
}
```

### Sunburst Text Not Readable
```javascript
// Adjust text orientation and size
textfont: { 
    size: 12,  // Increase for better readability
    color: '#fff'
},
insidetextorientation: 'radial'  // or 'horizontal'
```

### KPI Cards Not Updating
```javascript
// Check element IDs match
const kpiElements = {
    'total-gdp': ...,
    'top5-concentration': ...,
    'regions-covered': ...,
    'total-population': ...
};
```

## 📚 Data Interpretation Guide

### GDP Metrics Explained

| Metric | Definition | Strategic Use |
|--------|-----------|---------------|
| **Total GDP** | Aggregate economic output | Market capacity, distribution center priority |
| **GDP per Capita** | Average individual income | Purchasing power, premium product viability |
| **Population** | Total inhabitants | Workforce availability, consumer base |
| **Country Count** | Markets in region | Risk diversification, supply chain resilience |

### Regional Priorities (by Total GDP)

1. **Asia Pacific** - $34.2T
   - **Strength**: Massive market + workforce
   - **Strategy**: Manufacturing hub + distribution
   - **Risk**: Diverse economies (China dominates 54.8%)

2. **North America** - $33.3T
   - **Strength**: High GDP per capita ($63,758)
   - **Strategy**: Premium products, limited manufacturing
   - **Risk**: Low diversification (3 countries)

3. **Latin America** - $5.2T
   - **Strength**: Proximity to North America
   - **Strategy**: Regional distribution, emerging middle class
   - **Risk**: Economic volatility

4. **Middle East & Africa** - $4.3T
   - **Strength**: Growing markets, resource-rich
   - **Strategy**: Strategic partnerships, gradual entry
   - **Risk**: Political instability in some regions

## 📖 Academic Integrity

This project demonstrates:
- ✅ **Hierarchical visualization principles** (treemaps, sunbursts)
- ✅ **Multi-dimensional data analysis** (4-metric comparison)
- ✅ **Correlation analysis** (scatter plots)
- ✅ **Interactive dashboard design** (tabs, drill-down, responsive)
- ✅ **Executive reporting** (KPIs, recommendations)
- ✅ **Real-world business application** (market expansion analysis)

All visualizations follow best practices from:
- Tufte's "Visual Display of Quantitative Information"
- Cleveland & McGill's graphical perception research
- Ben Shneiderman's information visualization principles

## 👥 Team

**Authors**: Alan Valbuena & Sergio Barrera

### Responsibilities

#### Frontend Development
- ✅ Plotly.js treemap, scatter, matrix, sunburst implementations
- ✅ Tab system and interactive features
- ✅ Responsive design and CSS styling
- ✅ KPI calculations and recommendations logic

#### Data Processing
- ✅ 194 countries data compilation from World Bank/IMF
- ✅ Data structuring and validation
- ✅ Regional aggregation logic
- ✅ Strategic segmentation algorithms

## 📄 License

Distributed under MIT License.

---

**Version**: 2.2.0 - Checkpoint 2 (Hierarchical Data Visualization)  
**Last Updated**: October 2025  
**Framework**: Flask + Plotly.js 2.26.0  
**Focus**: Global Market Expansion Analytics for Terra Cotta Foods  
**Business Case**: Executive dashboard for Marco Antonelli's expansion strategy