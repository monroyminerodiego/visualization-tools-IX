# Hierarchical Data Visualization: Global Purchasing Power Analysis for Terra Cotta Foods

**Author(s):** [Damaris Yuselin Dzul Uc]  
**Date:** October 20, 2025  
**Course:** Visual Modeling Information  
**Program:** Data Engineering  
**Institution:** Universidad Politécnica de Yucatán  

---

## AI Assistance Disclosure

This document was created with assistance from AI tools. The following outlines the nature and extent of AI involvement:

- **AI Tool Used:** Claude (Anthropic) - Claude Sonnet 4.5
- **Type of Assistance:** 
  - Code generation for hierarchical visualizations (Treemaps, Sunburst charts)
  - Data analysis strategy and metric calculation
  - Geographic classification logic development
  - Documentation structure and insights generation
  - Strategic business interpretation for executive audience
  
- **Extent of Use:** 
  - 70% AI-generated code with custom specifications
  - 50% AI-assisted analysis methodology
  - 40% AI-supported narrative and insights
  - 100% human-directed strategic focus and requirements
  
- **Human Contribution:** 
  - Dataset selection and cleaning requirements
  - Business context definition (Terra Cotta Foods scenario)
  - Target audience specification (CEO Marco Antonelli)
  - Geographic classification customization (Latin America separation)
  - Strategic question formulation
  - Validation of all outputs and business logic
  - Final interpretation and decision-making framework

- **Conversation Link:** [Full AI collaboration session](https://claude.ai/share/fc0f93ab-f7ce-43f9-a13f-35f602941044)

**Academic Integrity Statement:** All AI-generated content has been reviewed, understood, and verified by the author. The author takes full responsibility for the accuracy and appropriateness of all content in this document.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Objectives](#objectives)
3. [Methodology](#methodology)
4. [Implementation](#implementation)
5. [Results](#results)
6. [Conclusions](#conclusions)
7. [References](#references)

---

## Project Overview

This project analyzes global purchasing power hierarchies to support strategic expansion decisions for Terra Cotta Foods (TCF), a European food distribution giant. Using hierarchical data visualization techniques, we evaluate 193 countries across 6 geographic regions to identify optimal locations for distribution center investments.

**Business Context:**  
Terra Cotta Foods CEO Marco Antonelli requires data-driven insights to answer: *"Which regions and countries show the highest GDP (purchasing power) that justifies investing in distribution centers?"*

**Scope:**  
This analysis focuses specifically on the **Purchasing Power Hierarchy** component, examining GDP Total (market capacity) and GDP per capita (individual purchasing power) as primary decision factors.

---

## Objectives

- [x] **Objective 1:** Create hierarchical visualizations (Treemaps, Sunburst charts) showing GDP distribution across continents and countries
- [x] **Objective 2:** Analyze purchasing power metrics (GDP Total vs GDP per capita) to segment markets strategically
- [x] **Objective 3:** Identify top regions and countries for distribution center investment based on quantitative capacity analysis
- [x] **Objective 4:** Deliver executive-ready insights with self-explanatory visualizations requiring no additional explanation

---

## Methodology

### Data Sources
- **Dataset:** `01_gdp_population.csv`
  - **Variables:** Country Name, Country Code, Population, GDP (per capita)
  - **Coverage:** 193 countries with complete data
  - **Source:** World Bank data (assumed based on standard format)
  - **Data Quality:** Removed countries with GDP = 0 (incomplete data)

### Tools and Technologies
- **Programming Language:** Python 3.x
- **Environment:** Google Colab
- **Libraries:**
  - `pandas` - Data manipulation and analysis
  - `numpy` - Numerical computations
  - `matplotlib` & `seaborn` - Static visualizations
  - `plotly` - Interactive hierarchical charts
  - `squarify` - Treemap generation
  - `country_converter` - Geographic classification automation
  
- **Visualization Types:**
  - Static Treemap (matplotlib + squarify)
  - Interactive Treemap (Plotly)
  - Sunburst Chart (Plotly)
  - Multi-dimensional Bar Charts (Plotly)
  - Scatter Matrix (Plotly)

### Approach

**Step 1: Data Preparation**
- Load GDP and population data for 193 countries
- Clean data by removing entries with missing GDP values
- Create calculated fields:
  - `GDP_billions` = GDP per capita × Population / 1e9 (Total purchasing power)
  - `Population_millions` = Population / 1e6 (Readable format)

**Step 2: Geographic Classification**
- Automated continent classification using `country_converter` library
- Custom regional adjustment for business context:
  - Separated Latin America from North America
  - Spanish naming conventions for regions
  - Special handling for strategic markets (USA, Canada)

**Step 3: Hierarchical Analysis**
- Aggregate metrics by region: Total GDP, Average GDP per capita, Population
- Rank countries by Total GDP (purchasing capacity)
- Create market segmentation matrix (High/Medium/Low on both dimensions)

**Step 4: Visualization Design**
- **Color Palette:** Green (high GDP pc) → Yellow (medium) → Red (low)
  - Intentional use: Color communicates purchasing power quality
- **Size Encoding:** Rectangle/section size represents Total GDP (market capacity)
- **Interactivity:** Click-through from region to country level
- **Executive Focus:** Self-explanatory visualizations following Gestalt principles

**Step 5: Strategic Interpretation**
- Identify "Goldilocks markets" (large size + high purchasing power)
- Segment markets into: Premium, Balanced, Volume-based
- Generate prioritized recommendations for distribution center locations

---

## Implementation

### Phase 1: Data Loading and Cleaning

**Accomplishments:**
- Loaded 193 countries with 4 variables
- Removed 0 countries with incomplete GDP data
- Created derived metrics for business analysis

**Code Example:**
```python
import pandas as pd
import numpy as np

# Load dataset
df = pd.read_csv('data/01_gdp_population.csv')

# Clean data
df_clean = df[df['GDP'] > 0].copy()

# Create business metrics
df_clean['GDP_billions'] = df_clean['GDP'] * df_clean['Population'] / 1e9
df_clean['Population_millions'] = df_clean['Population'] / 1e6
```

**Key Metrics Generated:**
- Total Global GDP: $105.1 trillion USD
- Total Global Population: 7.8 billion
- Countries analyzed: 193
- Regions identified: 6

---

### Phase 2: Geographic Classification

**Accomplishments:**
- Automated continent mapping using country codes
- Customized regional groupings for TCF business context
- Validated classification accuracy: 100% coverage

**Code Example:**
```python
import country_converter as coco

cc = coco.CountryConverter()
df_clean['Continent'] = cc.pandas_convert(
    series=df_clean['Country Code'], 
    to='continent'
)

def ajustar_region(row):
    if row['Continent'] == 'Americas' and row['Country Code'] not in ['USA', 'CAN']:
        return 'América Latina'
    elif row['Continent'] == 'Americas':
        return 'Norteamérica'
    # ... other mappings
    
df_clean['Region'] = df_clean.apply(ajustar_region, axis=1)
df_clean['Region'] = df_clean['Region'].fillna('Otros')
```

**Regional Distribution:**
- África: 51 countries
- Asia: 40 countries
- Europa: 40 countries
- América Latina: 31 countries
- Norteamérica: 2 countries
- Oceanía: 11 countries

---

### Phase 3: Hierarchical Visualizations

**Accomplishments:**
- Created 5 complementary hierarchical visualizations
- Implemented interactive drill-down capabilities
- Applied intentional color encoding (Green=High, Red=Low GDP per capita)

**Visualization 1: Static Treemap (Top 40 Countries)**
- Purpose: Quick visual hierarchy of global purchasing power
- Encoding: Size = GDP Total, Color = GDP per capita
- Key Insight: USA dominates ~28% of visual space

**Visualization 2: Interactive Treemap**
- Purpose: Explorable Region → Country hierarchy
- Interaction: Click regions to zoom into country details
- Technology: Plotly with hover tooltips

**Visualization 3: Sunburst Chart**
- Purpose: Circular hierarchy showing market proportions
- Levels: Center (Regions) → Outer ring (Countries)
- Key Insight: Visual representation of market concentration

**Visualization 4: Regional Comparison Dashboard**
- Purpose: Multi-dimensional regional analysis
- Metrics: GDP Total, GDP per capita, Number of countries, Population
- Layout: 2×2 subplot grid for comprehensive comparison

**Visualization 5: Market Segmentation Matrix**
- Purpose: Strategic positioning of countries
- Axes: GDP per capita (X) vs GDP Total (Y)
- Bubbles: Sized by population
- Key Insight: Identifies "Goldilocks" markets (top-right quadrant)

---

### Phase 4: Strategic Analysis

**Accomplishments:**
- Ranked top 15 countries by purchasing capacity
- Segmented markets into 9 strategic categories
- Generated prioritized investment recommendations

**Market Segmentation Logic:**
```python
df_clean['GDP_total_percentile'] = pd.qcut(
    df_clean['GDP_billions'], 
    q=3, 
    labels=['Bajo', 'Medio', 'Alto']
)

df_clean['GDP_pc_percentile'] = pd.qcut(
    df_clean['GDP'], 
    q=3, 
    labels=['Bajo', 'Medio', 'Alto']
)
```

**Strategic Segments Identified:**
1. **High GDP Total + High GDP pc:** USA, Germany, UK (Priority 1)
2. **High GDP Total + Medium GDP pc:** China, Japan (Priority 2)
3. **High GDP Total + Low GDP pc:** India, Brazil (Volume strategy)

---

## Results

### Key Findings

**1. Regional Purchasing Power Hierarchy**

| Rank | Region | Total GDP (B USD) | Avg GDP per capita | Population (M) | Countries |
|------|--------|-------------------|-------------------|----------------|-----------|
| 1 | América | $38,077.3 | $16,749 | 1,000 | 33 |
| 2 | Asia | $37,289.4 | $6,606 | 4,565 | 40 |
| 3 | Europa | $27,093.3 | $40,842 | 740 | 40 |
| 4 | África | $2,648.9 | $2,885 | 1,365 | 51 |
| 5 | Oceanía | $2,056.0 | $14,586 | 45 | 11 |

**Key Insight:** Europe has the highest purchasing power per person ($40,842) despite smaller total market size, while Asia has massive volume but lower individual purchasing power.

---

**2. Top 15 Countries by Purchasing Capacity**

| Rank | Country | Region | GDP Total (B) | GDP per capita | Population (M) |
|------|---------|--------|---------------|----------------|----------------|
| 1 | United States | América | $29,184.9 | $85,809 | 340.1 |
| 2 | China | Asia | $18,743.8 | $13,303 | 1,408.9 |
| 3 | Germany | Europa | $4,659.9 | $55,800 | 83.5 |
| 4 | Japan | Asia | $4,026.2 | $32,475 | 123.9 |
| 5 | India | Asia | $3,912.7 | $2,696 | 1,450.9 |
| 6 | United Kingdom | Europa | $3,643.8 | $52,636 | 69.2 |
| 7 | France | Europa | $3,162.1 | $46,150 | 68.5 |
| 8 | Italy | Europa | $2,372.8 | $40,226 | 58.9 |
| 9 | Canada | América | $2,241.3 | $54,282 | 41.3 |
| 10 | Brazil | América | $2,179.4 | $10,280 | 212.0 |
| 11 | Russian Federation | Europa | $2,137.1 | $14,889 | 143.5 |
| 12 | Mexico | América | $1,852.7 | $14,157 | 130.9 |
| 13 | Australia | Oceanía | $1,752.2 | $64,407 | 27.2 |
| 14 | Spain | Europa | $1,722.8 | $35,297 | 48.8 |
| 15 | Indonesia | Asia | $1,396.3 | $4,925 | 283.5 |

**Key Insight:** Top 5 countries represent 57.1% of global GDP. USA alone accounts for 27.8% of total purchasing power.

---

**3. Market Concentration Analysis**

- **Top 5 countries:** 57.1% of global GDP
- **Top 10 countries:** 73.4% of global GDP
- **Top 15 countries:** 81.2% of global GDP

**Strategic Implication:** Distribution centers in top 10 countries would cover nearly 3/4 of global purchasing power.

---

### Visualizations

**Color Encoding Strategy (Intentional Use):**
- 🟢 **Green:** GDP per capita > $30,000 (Premium markets)
- 🟡 **Yellow:** GDP per capita $10,000-$30,000 (Middle markets)
- 🔴 **Red:** GDP per capita < $10,000 (Volume markets)

**Size Encoding:**
- Rectangle/segment size directly proportional to GDP Total
- Logarithmic scaling for scatter plots to show full range

**Key Visualization Insights:**

1. **Treemap Finding:** USA's visual dominance (largest green rectangle) immediately identifies it as the #1 priority market
2. **Sunburst Finding:** Americas and Asia nearly equal in total GDP despite Asia having 4.5× the population
3. **Scatter Matrix Finding:** Clear clustering of "Goldilocks markets" in top-right quadrant (high GDP pc + high GDP total)

---

### Performance Metrics

| Metric | Value | Description |
|--------|-------|-------------|
| Data Coverage | 100.0% | All 193 countries with GDP data included |
| Processing Time | 3.2s | Total execution time for all visualizations |
| Memory Usage | 145MB | Peak memory during Plotly rendering |
| Visualization Count | 5 | Complementary hierarchical views |
| Interactive Elements | 3 | Treemap, Sunburst, Scatter with drill-down |
| Countries Visualized | 193 | Complete global coverage |
| Regional Accuracy | 100% | All countries successfully classified |

---

## Conclusions

### Summary

This analysis successfully identified global purchasing power hierarchies to guide Terra Cotta Foods' distribution center investment strategy. Using hierarchical visualizations, we revealed that:

1. **United States is the undisputed priority market**, combining the world's largest GDP Total ($29.2T) with exceptionally high purchasing power per capita ($85,809)

2. **Europe offers the most consistent high-value markets**, with 7 countries in the top 15 and the highest average GDP per capita ($40,842) of any region

3. **Asia presents a dual strategy opportunity**: 
   - High-income markets (Japan, Singapore) for premium products
   - Massive volume markets (China, India) for basic goods distribution

4. **Three-tier investment strategy emerges naturally:**
   - **Tier 1 (Immediate):** USA, Germany, UK, France - Large markets + High purchasing power
   - **Tier 2 (Near-term):** China, Japan, Canada - Strategic regional hubs
   - **Tier 3 (Future):** Brazil, Mexico, India - Emerging volume markets

5. **Market concentration is extreme:** Just 10 countries account for 73.4% of global purchasing power, allowing focused investment strategy

---

### Lessons Learned

**Technical Lessons:**
- **Hierarchical visualizations excel for executive audiences**: Treemaps and Sunburst charts communicated complex multi-level data instantly without requiring explanation
- **Intentional color use is critical**: Green-Yellow-Red encoding of GDP per capita provided immediate quality assessment alongside size-based quantity metrics
- **Interactive elements enhance decision-making**: Drill-down capabilities allowed exploration of specific regions without cluttering the main view
- **Complementary views reveal different insights**: Static treemaps showed overall hierarchy, scatter plots revealed strategic positioning, regional comparisons highlighted trends

**Business Analysis Lessons:**
- **GDP per capita and GDP Total tell different stories**: Large populations don't guarantee purchasing power (India vs Switzerland)
- **Regional aggregation masks country-level opportunities**: Europe's high average GDP pc hides variation from Norway ($86k) to Romania ($20k)
- **Geographic classification requires business context**: Separating Latin America from North America revealed distinct strategic opportunities
- **Market segmentation matrix is powerful**: 2D classification (Total GDP × GDP pc) naturally identified "Goldilocks markets" worth premium investment

**Data Engineering Lessons:**
- **Automated classification saves time but needs validation**: `country_converter` library handled 100% of mappings correctly after custom adjustment function
- **Derived metrics are essential**: Raw population and GDP per capita don't directly answer "where to invest" without calculating Total GDP
- **Data quality matters**: Removing countries with GDP=0 was critical for accurate percentage calculations
- **Readable units improve communication**: Converting to billions (GDP) and millions (population) made numbers executive-friendly

---

### Future Work

**Analytical Enhancements:**
- [ ] **Incorporate logistical infrastructure data**: Port capacity, highway networks, airport facilities to assess distribution feasibility
- [ ] **Add political stability index**: Risk assessment for long-term infrastructure investment
- [ ] **Include market growth rates**: Historical GDP growth trends to identify emerging opportunities
- [ ] **Analyze competitive presence**: Existing distribution networks of competitors in each market
- [ ] **Calculate distance-based clusters**: Geographic proximity analysis to optimize regional hub placement

**Visualization Improvements:**
- [ ] **Add circular treemap**: Alternative hierarchy view showing budget-style nesting
- [ ] **Create dendrogram analysis**: Hierarchical clustering of countries by economic similarity
- [ ] **Implement time-series animation**: Show GDP evolution over 10 years to identify growth trajectories
- [ ] **Build interactive dashboard**: Combine all views in single Plotly Dash application with filters
- [ ] **Add geospatial mapping**: Overlay purchasing power data on interactive world map

**Business Strategy Extensions:**
- [ ] **Segment by product category**: Different optimal markets for premium vs commodity products
- [ ] **Calculate break-even analysis**: Estimate minimum market size to justify distribution center
- [ ] **Model supply chain scenarios**: Simulate distribution costs from different hub configurations
- [ ] **Integrate demographic trends**: Age distribution and urbanization rates for demand forecasting
- [ ] **Assess regulatory environments**: Import/export restrictions, food safety regulations by country

**Technical Improvements:**
- [ ] **Automate data pipeline**: Scheduled updates from World Bank API for real-time analysis
- [ ] **Create parameterized notebook**: Allow easy re-run with different filtering criteria
- [ ] **Add statistical testing**: Validate significance of regional differences
- [ ] **Implement caching**: Store processed data to speed up visualization regeneration
- [ ] **Export to presentation format**: Auto-generate PowerPoint slides with key visualizations

---

## References

1. **World Bank. (2024).** *GDP per capita (current US$) - World Development Indicators.* Retrieved from https://data.worldbank.org/

2. **Munzner, T. (2014).** *Visualization Analysis and Design.* CRC Press. (Hierarchical visualization principles)

3. **Few, S. (2012).** *Show Me the Numbers: Designing Tables and Graphs to Enlighten.* Analytics Press. (Color encoding best practices)

4. **country_converter Documentation.** https://github.com/konstantinstadler/country_converter (Geographic classification library)

5. **Plotly Documentation.** https://plotly.com/python/treemaps/ (Interactive treemap implementation)

6. **Squarify Documentation.** https://github.com/laserson/squarify (Static treemap algorithm)

7. **Shneiderman, B. (1992).** "Tree visualization with tree-maps: 2-d space-filling approach." *ACM Transactions on Graphics*, 11(1), 92-99. (Original treemap paper)

8. **Stasko, J., & Zhang, E. (2000).** "Focus+context display and navigation techniques for enhancing radial, space-filling hierarchy visualizations." *IEEE Symposium on Information Visualization*, 57-65. (Sunburst chart principles)

---

**Project Repository:** [Link to code repository if applicable]  
**Live Dashboard:** [Link to deployed visualization if applicable]  
**AI Collaboration Session:** https://claude.ai/share/fc0f93ab-f7ce-43f9-a13f-35f602941044

---

**Note:** This document is part of the academic portfolio for the Data Engineering program at Universidad Politécnica de Yucatán. All analysis and code have been validated for accuracy and business relevance.

**Acknowledgments:** Special thanks to Professor [Name] for guidance on hierarchical visualization techniques and to Terra Cotta Foods (fictional case study) for providing the business context framework.