# 🏛️ Congress Twitter Network Analytics Dashboard

## 🎯 Checkpoint Objective

**Unit 2 Checkpoint 3** focuses on **Network Graph Visualization and Social Network Analysis** using **D3.js**. This checkpoint implements an interactive analytics dashboard for exploring the Twitter interaction network of U.S. Congress members through force-directed graphs, community detection, centrality metrics, and temporal analysis.

## 📚 Theoretical Foundation

### Network Analysis Concepts Implemented

#### 1. **Force-Directed Graph Visualization**
- Interactive network layout with physics simulation
- Node size encoding (PageRank centrality)
- Community-based color coding
- Dynamic edge highlighting on hover
- Drag-and-drop node repositioning

#### 2. **Community Detection Analysis**
- Louvain algorithm for community structure
- Modularity metric (0.4408)
- 4 distinct communities identified
- Community size distribution visualization
- Inter-community connection strength

#### 3. **Centrality Metrics**
- **PageRank**: Overall network importance
- **Betweenness**: Bridge nodes controlling information flow
- **In-Degree**: Members receiving most attention
- **Out-Degree**: Members actively reaching out
- Top 10 influencers per metric

#### 4. **Interaction Type Analysis**
- Retweets (40%)
- Mentions (30%)
- Replies (20%)
- Quotes (10%)
- Proportional donut chart visualization

#### 5. **Temporal Evolution**
- 30-day interaction time series
- Trend analysis with smoothed line chart
- Peak detection and pattern identification
- Interactive date-based tooltips

## 🏗 Dashboard Architecture

```
Frontend (Flask + D3.js)
     │
     ├─→ JSON Data Loading
     │   ├── congress_network_data.json
     │   ├── 475 nodes
     │   └── 13,289 edges
     │
     ├─→ Interactive Visualizations
     │   ├── Network Graph (Force Layout)
     │   ├── Community Distribution (Donut Chart)
     │   ├── Degree Distribution (Bar Chart)
     │   ├── Top Influencers (Horizontal Bar)
     │   ├── Centrality Comparison (Bar Chart)
     │   ├── Interaction Types (Donut Chart)
     │   ├── Temporal Evolution (Line Chart)
     │   ├── Community Analysis (Bar Chart)
     │   └── Community Connections (Force Layout)
     │
     └─→ Tab System
         ├── Overview
         ├── Influencers
         ├── Interactions
         └── Communities
```

## 🎨 Visual Components

### 📊 Overview Tab

#### 1. Network Visualization - Force-Directed Graph
**Purpose**: Interactive exploration of Congressional Twitter network structure

**Data Encoding**:
- **Node Size** = PageRank centrality (5-30px radius)
- **Node Color** = Community membership (4 colors)
- **Edge Width** = Interaction strength (sqrt scale)
- **Edge Opacity** = Connection emphasis (0.1-0.8)

**Interactive Features**:
- Drag nodes to explore local neighborhoods
- Hover to highlight direct connections
- Auto-layout with force simulation physics
- Labels for high-centrality members
- Real-time physics adjustment

**Strategic Insight**: Identifies key influencers, information brokers, and community structures within Congress social media landscape.

#### 2. Community Distribution - Donut Chart
**Purpose**: Visualize proportional size of detected communities

**Data Encoding**:
- **Arc Length** = Community size (number of members)
- **Color** = Community identifier
- **Inner Radius** = 50% of outer radius (donut effect)

**Communities Detected**:
- **Community 0**: 204 members (43.0%)
- **Community 1**: 171 members (36.0%)
- **Community 2**: 94 members (19.8%)
- **Community 3**: 6 members (1.3%)

**Strategic Insight**: Reveals major political or ideological groupings within Congress Twitter activity.

#### 3. Degree Distribution - Histogram
**Purpose**: Understand connection density across network

**Data Encoding**:
- **X-Axis** = Connection degree (number of edges)
- **Y-Axis** = Number of members with that degree
- **Bar Color** = Primary theme color (#667eea)

**Distribution Pattern**:
- Most members have 10-50 connections
- Average degree: 55.95
- Network density: 0.059 (5.9%)

**Strategic Insight**: Identifies super-connectors vs. peripheral members; helps understand information diffusion potential.

### 👑 Influencers Tab

#### 4. Top Influencers - Horizontal Bar Chart
**Purpose**: Rank most influential Congress members by selected metric

**Metrics Available**:
1. **PageRank** (default)
   - Identifies globally important nodes
   - Top member: #322 (score: 0.0167)

2. **Betweenness Centrality**
   - Identifies information brokers
   - Top member: #322 (score: 0.0730)

3. **In-Degree**
   - Identifies most-mentioned members
   - Top member: #322 (score: 0.268)

**Data Encoding**:
- **Bar Length** = Centrality score
- **Bar Color** = Community membership
- **Y-Axis** = Member ID
- **X-Axis** = Metric value

**Strategic Insight**: Different metrics reveal different types of influence - global importance, bridge roles, or popularity.

#### 5. Centrality Comparison - Bar Chart
**Purpose**: Compare top 5 members within selected metric

**Data Encoding**:
- **Bar Height** = Centrality score
- **Bar Color** = Metric-specific color
- **X-Axis** = Member ID
- **Y-Axis** = Score value

**Color Coding**:
- PageRank: Purple (#9f7aea)
- Betweenness: Orange (#ed8936)
- In-Degree: Blue (#4299e1)
- Out-Degree: Teal (#38b2ac)

**Strategic Insight**: Quick visual comparison of leadership hierarchy within each influence dimension.

### 💬 Interactions Tab

#### 6. Interaction Types - Donut Chart
**Purpose**: Breakdown of Twitter interaction modalities

**Distribution**:
- **Retweets**: 5,321 (40%) - Content amplification
- **Mentions**: 3,987 (30%) - Direct engagement
- **Replies**: 2,658 (20%) - Conversation
- **Quotes**: 1,323 (10%) - Commentary

**Data Encoding**:
- **Arc Length** = Interaction count
- **Color** = Interaction type
- **Inner Text** = Type label

**Strategic Insight**: Retweets dominate, suggesting Congress members focus more on amplification than original dialogue.

#### 7. Temporal Evolution - Line Chart
**Purpose**: Track interaction volume over 30-day period

**Data Encoding**:
- **X-Axis** = Date (30 days in January 2024)
- **Y-Axis** = Number of interactions
- **Line Color** = Primary theme (#667eea)
- **Curve** = MonotoneX (smoothed)

**Key Patterns**:
- Peak on Jan 1: 632 interactions (New Year effect)
- Peak on Jan 16: 798 interactions (mid-month surge)
- Average: ~420 interactions/day
- Weekend dips visible

**Strategic Insight**: Identifies event-driven spikes and baseline activity patterns for strategic communication timing.

### 🔗 Communities Tab

#### 8. Community Analysis - Bar Chart
**Purpose**: Compare community sizes side-by-side

**Data Encoding**:
- **Bar Height** = Number of members
- **Bar Color** = Community color
- **X-Axis** = Community label
- **Y-Axis** = Member count

**Community Sizes**:
1. Community 0: 204 members
2. Community 1: 171 members
3. Community 2: 94 members
4. Community 3: 6 members

**Strategic Insight**: Helps understand balance of power and coalition structures.

#### 9. Community Connections - Force-Directed Graph
**Purpose**: Visualize inter-community relationship strength

**Data Encoding**:
- **Node Size** = Community size (sqrt scale)
- **Node Color** = Community identifier
- **Edge Width** = Connection strength (simulated)
- **Layout** = Force simulation with link distance

**Interactive Features**:
- Drag communities to explore connections
- Hover for community statistics
- Dynamic layout adjustment

**Strategic Insight**: Reveals bridges between communities and isolated vs. interconnected groups.

## 📊 Data Structure

### JSON Data Schema

```javascript
{
  "stats": {
    "num_nodes": 475,
    "num_edges": 13289,
    "num_communities": 4,
    "modularity": 0.4408,
    "average_degree": 55.95,
    "density": 0.0590,
    "clustering_coefficient": 0.3014
  },
  "communities": {
    "0": { "size": 204, "color": "#667eea", "label": "Comunidad 0" },
    "1": { "size": 171, "color": "#f56565", "label": "Comunidad 1" },
    "2": { "size": 94, "color": "#48bb78", "label": "Comunidad 2" },
    "3": { "size": 6, "color": "#ed8936", "label": "Comunidad 3" }
  },
  "network": {
    "nodes": [
      { "id": "322", "group": "1", "centrality": 16.696, "degree": 284 }
    ],
    "links": [
      { "source": "322", "target": "147", "value": 0.0059 }
    ]
  },
  "topInfluencers": {
    "pagerank": [{ "node": "322", "score": 0.0167, "community": "1" }],
    "betweenness": [...],
    "indegree": [...]
  },
  "degreeDistribution": [
    { "degree": 2, "count": 1 },
    { "degree": 5, "count": 5 }
  ],
  "interactionTypes": [
    { "type": "Retweets", "count": 5321, "percentage": 40.0 }
  ],
  "temporalData": [
    { "date": "2024-01-01", "interactions": 632 }
  ]
}
```

### Color Encoding System

```javascript
// Community Colors
const communityColors = {
    '0': '#667eea',  // Purple
    '1': '#f56565',  // Red
    '2': '#48bb78',  // Green
    '3': '#ed8936'   // Orange
};

// Centrality Metric Colors
const centralityColors = {
    'pagerank': '#9f7aea',      // Purple
    'betweenness': '#ed8936',   // Orange
    'indegree': '#4299e1',      // Blue
    'outdegree': '#38b2ac'      // Teal
};
```

## 🗂 Project Structure

```
Web/
│
├── static/
│   └── Portfolio/
│       ├── css/
│       │   └── checkpoint3/
│       │       └── main.css           # Dashboard styles
│       └── js/
│           └── checkpoint3/
│               ├── main.js            # D3.js visualizations
│               └── congress_network_data.json  # Network data
│
├── templates/
│   └── Portfolio/
│       └── checkpoint3/
│           └── main.html              # Dashboard template
│
├── app.py                             # Flask application
├── requirements.txt
└── README_U2_C3.md
```

## 🎨 Technology Stack

### Frontend
- **D3.js 7.8.5** - Interactive network graph visualizations
- **Flask 2.3.3** - Web framework
- **Tabler Icons** - Modern iconography
- **Custom CSS** - Apple-inspired design system
- **Vanilla JavaScript** - Tab system and data management

### Data Processing
- **NetworkX** (Python) - Graph analysis and metrics calculation
- **Community Detection** - Louvain algorithm
- **Centrality Metrics** - PageRank, Betweenness, Degree centrality
- **JSON Export** - Static data embedding

### Design System
- **Apple Design Language** - Clean, minimalist aesthetics
- **Glassmorphism** - Frosted glass effects for headers
- **Smooth Animations** - 0.3s cubic-bezier transitions
- **Responsive Layout** - Mobile-first approach

## 📌 Routes

| Route | Method | Description | Data Source |
|-------|--------|-------------|-------------|
| / | GET | Main navigation | - |
| /portfolio/checkpoint3 | GET | Congress Network Dashboard | congress_network_data.json |

## 🔄 Data Flow

```
[User Accesses Dashboard]
       │
       ▼
[Flask Renders main.html]
       │
       ▼
[Browser Loads main.js]
       │
       ▼
[Async JSON Data Loading]
   - Try multiple paths
   - Parse network data
   - Validate structure
       │
       ▼
[JavaScript Initialization]
   - Setup tooltip system
   - Initialize tab handlers
   - Render default tab (Overview)
       │
       ▼
[D3.js Renders Visualizations]
   - Network graph (force simulation)
   - Statistical charts (bars, donuts, lines)
   - Community analysis
       │
       ▼
[User Interactions]
   - Tab switching
   - Node dragging
   - Metric selection
   - Hover tooltips
   - Window resize (responsive)
```

## 🎯 D3.js Implementation Patterns

### 1. Force-Directed Graph with Physics

```javascript
const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links)
        .id(d => d.id)
        .distance(50))
    .force('charge', d3.forceManyBody()
        .strength(-50))
    .force('center', d3.forceCenter(width / 2, height / 2));

// Update positions on tick
simulation.on('tick', () => {
    link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
    
    node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
});
```

### 2. Dynamic Edge Highlighting on Hover

```javascript
node.on('mouseover', function(event, d) {
    // Highlight node
    d3.select(this)
        .attr('stroke', '#fbbf24')
        .attr('stroke-width', 3);
    
    // Highlight connected edges
    link.style('stroke-opacity', l => 
        (l.source.id === d.id || l.target.id === d.id) ? 0.8 : 0.1
    )
    .style('stroke', l => 
        (l.source.id === d.id || l.target.id === d.id) ? '#fbbf24' : '#94a3b8'
    );
    
    // Show tooltip
    showTooltip(event, `<strong>Member ${d.id}</strong>...`);
});
```

### 3. Donut Chart with Inner Labels

```javascript
const pie = d3.pie()
    .value(d => d.size)
    .sort(null);

const arc = d3.arc()
    .innerRadius(radius * 0.5)  // Donut effect
    .outerRadius(radius);

svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => d.data.color);

// Add labels at centroids
svg.selectAll('text')
    .data(pie(data))
    .enter()
    .append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text(d => d.data.label);
```

### 4. Smooth Line Chart with Curve

```javascript
const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.interactions))
    .curve(d3.curveMonotoneX);  // Smooth interpolation

svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#667eea')
    .attr('stroke-width', 2.5)
    .attr('d', line);

// Add interactive points
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => x(d.date))
    .attr('cy', d => y(d.interactions))
    .attr('r', 3)
    .on('mouseover', showTooltip);
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
            changeTab(tabId);  // Re-render active visualizations
        }, 250);  // Debounce 250ms
    });
}
```

### 6. Advanced Tooltip Positioning

```javascript
function showTooltip(event, html) {
    const tooltip = d3.select('#tooltip');
    tooltip.html(html).style('opacity', 1);
    
    const tooltipWidth = tooltip.node().offsetWidth;
    const tooltipHeight = tooltip.node().offsetHeight;
    
    // Smart positioning to avoid viewport edges
    let left = event.clientX + 15;
    let top = event.clientY - tooltipHeight - 15;
    
    if (left + tooltipWidth > window.innerWidth) {
        left = event.clientX - tooltipWidth - 15;
    }
    
    if (top < 0) {
        top = event.clientY + 15;
    }
    
    tooltip
        .style('left', left + 'px')
        .style('top', top + 'px');
}
```

## 🛠 Setup and Execution

### Prerequisites
- Python 3.8+
- Modern browser with SVG/Canvas support
- No external APIs required (data embedded in JSON)

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
- **Dashboard**: http://localhost:5000/portfolio/checkpoint3

## 🎨 Dashboard Features

### Tab 1: Overview

#### Network Graph Interactions
- **Drag nodes** → Reposition and explore local neighborhoods
- **Hover node** → Highlight direct connections with golden edges
- **Release node** → Physics simulation resumes
- **Auto-layout** → Force simulation finds optimal positions

#### Community Distribution
- **Hover arc** → See exact member count and percentage
- **Color legend** → Identify community by color
- **Proportional sizing** → Larger arcs = larger communities

#### Degree Distribution
- **Hover bar** → See exact number of members at that degree
- **Pattern analysis** → Identify super-connectors (right tail)

### Tab 2: Influencers

#### Top Influencers
- **Select metric** → PageRank, Betweenness, or In-Degree
- **Hover bar** → See score, community, and member ID
- **Dynamic description** → Explanation updates per metric
- **Color coding** → Community membership visible

#### Centrality Comparison
- **Top 5 focus** → Leadership hierarchy visible at glance
- **Metric-specific colors** → Visual differentiation
- **Score labels** → Exact values displayed on bars

### Tab 3: Interactions

#### Interaction Types
- **Hover slice** → See count and percentage
- **Proportional arcs** → Visual comparison of interaction modes
- **Color differentiation** → Each type has unique color

#### Temporal Evolution
- **Hover points** → See date and interaction count
- **Trend line** → Smoothed curve shows patterns
- **Peak detection** → Identify high-activity days

### Tab 4: Communities

#### Community Analysis
- **Side-by-side comparison** → Bar chart of sizes
- **Hover bars** → See member count and percentage
- **Color consistency** → Matches main network graph

#### Community Connections
- **Drag communities** → Explore inter-group links
- **Hover nodes** → See community statistics
- **Edge thickness** → Represents connection strength

## 🔧 Key Technical Decisions

### Why Force-Directed Layout Instead of Static?
1. **Organic Structure**: Natural clustering emerges from physics
2. **Interactive Exploration**: Users can manually adjust layout
3. **Community Visibility**: Groups naturally separate visually
4. **Aesthetic Appeal**: Dynamic, living network feels more engaging

### Why JSON Instead of Live API?
1. **Performance**: No network latency on page load
2. **Reliability**: No API downtime risk
3. **Reproducibility**: Consistent data for academic evaluation
4. **Simplicity**: Single-file deployment

### Why D3.js Over Other Libraries?
1. **Flexibility**: Complete control over SVG rendering
2. **Force Simulation**: Built-in physics engine
3. **Data Binding**: Declarative updates on data changes
4. **Community**: Extensive examples and documentation

### Why Multiple Centrality Metrics?
1. **Multi-Dimensional Analysis**: Different influence types
2. **Strategic Insights**: PageRank ≠ Betweenness ≠ Degree
3. **Academic Rigor**: Comprehensive network analysis
4. **User Education**: Teaches network science concepts

### Why Apple Design Language?
1. **Professional Aesthetic**: Clean, modern, trustworthy
2. **Accessibility**: High contrast, readable typography
3. **Consistency**: Familiar patterns reduce cognitive load
4. **Mobile-First**: Responsive breakpoints at 768px and 480px

## 🛠 Troubleshooting

### Network Graph Not Rendering
```javascript
// Check data structure
console.log("Nodes:", networkData.nodes.length);
console.log("Links:", networkData.links.length);
// Ensure nodes array exists and links reference valid IDs
```

### Force Simulation Too Slow
```javascript
// Reduce force strength
.force('charge', d3.forceManyBody().strength(-30))  // Was -50

// Reduce iterations
simulation.alpha(0.3).alphaDecay(0.05);
```

### JSON Loading Fails
```javascript
// Check all possible paths
const possiblePaths = [
    '/portfolio/unit2/checkpoint3/congress_network_data.json',
    '/static/Portfolio/js/checkpoint3/congress_network_data.json',
    './congress_network_data.json'
];
```

### Tooltip Positioning Issues
```javascript
// Ensure tooltip is fixed, not absolute
.tooltip {
    position: fixed;  // Not absolute
    pointer-events: none;
    z-index: 10000;
}
```

### Centrality Selector Not Updating
```javascript
// Check event binding
document.getElementById('centrality-metric').addEventListener('change', function() {
    updateCentralityMetric();
});
```

## 📚 Network Metrics Interpretation

### Centrality Metrics Explained

| Metric | Definition | Interpretation | Top Member |
|--------|-----------|----------------|------------|
| **PageRank** | Recursive importance score | Globally influential; connected to other influential members | #322 (0.0167) |
| **Betweenness** | Shortest paths through node | Information broker; controls flow between groups | #322 (0.073) |
| **In-Degree** | Incoming edges count | Popular; receives most mentions/interactions | #322 (0.268) |
| **Out-Degree** | Outgoing edges count | Active; reaches out to many others | Not shown |
| **Clustering** | Local triangle density | Cohesive neighborhoods; group membership | 0.301 avg |

### Network-Level Metrics

| Metric | Value | Interpretation |
|--------|-------|----------------|
| **Nodes** | 475 | Total Congress members in dataset |
| **Edges** | 13,289 | Total Twitter interactions captured |
| **Density** | 0.059 (5.9%) | Sparse network; most potential connections unrealized |
| **Avg Degree** | 55.95 | Average member interacts with ~56 others |
| **Modularity** | 0.4408 | Strong community structure detected |
| **Clustering** | 0.3014 | Moderate local cohesion |

### Community Structure

| Community | Size | Interpretation |
|-----------|------|----------------|
| **Community 0** | 204 (43%) | Dominant group; likely major party |
| **Community 1** | 171 (36%) | Secondary group; likely opposing party |
| **Community 2** | 94 (20%) | Smaller faction; moderates or specific caucus |
| **Community 3** | 6 (1%) | Outliers or independent members |

## 📖 Academic Integrity

This project demonstrates:
- ✅ **Force-directed graph layout** (D3 force simulation)
- ✅ **Community detection** (Louvain algorithm, modularity optimization)
- ✅ **Centrality analysis** (PageRank, Betweenness, Degree metrics)
- ✅ **Temporal analysis** (Time series interaction patterns)
- ✅ **Interactive visualization** (Drag, hover, dynamic updates)
- ✅ **Real-world application** (Congressional social media analysis)

### Theoretical Foundations

**Graph Theory**:
- Vertices (nodes) represent Congress members
- Edges (links) represent Twitter interactions
- Weighted edges encode interaction frequency

**Network Science**:
- Small-world properties (high clustering, low diameter)
- Scale-free distribution (power-law degree distribution)
- Assortative mixing (similar nodes cluster)

**Social Network Analysis**:
- Structural holes (betweenness centrality)
- Homophily (community structure)
- Tie strength (edge weights)

### References

- **Newman, M.E.J.** (2010). *Networks: An Introduction*. Oxford University Press.
- **Barabási, A.L.** (2016). *Network Science*. Cambridge University Press.
- **Bostock, M., Ogievetsky, V., & Heer, J.** (2011). D³ Data-Driven Documents. *IEEE TVCG*.
- **Blondel, V.D., et al.** (2008). Fast unfolding of communities in large networks. *Journal of Statistical Mechanics*.

## 👥 Team

**Authors**: Alan Valbuena & Sergio Barrera

### Responsibilities

#### Network Analysis & Data Processing
- ✅ NetworkX graph construction from Twitter data
- ✅ Community detection (Louvain algorithm)
- ✅ Centrality metrics calculation (PageRank, Betweenness, Degree)
- ✅ JSON export and data structuring

#### Frontend Development & Visualization
- ✅ D3.js force simulation implementation
- ✅ Interactive node/edge highlighting
- ✅ Multi-tab dashboard architecture
- ✅ Responsive design and CSS styling
- ✅ Tooltip system and user interactions

## 📄 License

Distributed under MIT License.

---

**Version**: 2.3.0 - Checkpoint 3 (Network Graph Visualization)  
**Last Updated**: November 2024  
**Framework**: Flask + D3.js 7.8.5  
**Focus**: Social Network Analysis of U.S. Congress Twitter Interactions  
**Dataset**: 475 nodes, 13,289 edges, 4 communities  
**Metrics**: PageRank, Betweenness, In-Degree, Clustering, Modularity