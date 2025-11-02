# Hierarchical Data Visualization: Supply risk in Terra Cotta Foods' expansion strategy 

**Author(s):** Ariel Joel Buenfil Góngora  
**Date:** October 20, 2025  
**Course:** Visual Modeling Information  
**Program:** Data Engineering  
**Institution:** Universidad Politécnica de Yucatán  

---

## AI Assistance Disclosure

This document was created with assistance from AI tools. The following outlines the nature and extent of AI involvement:

- **AI Tool Used:** Gemini (Google) - Gemini Flash 2.5

- **Type of Assistance:** 
  - Code generation for hierarchical visualizations (Interactive treemap, sunburst chart, dendrogram, stacked bar chart, Sankey chart).
  - Suggestions in the expansion strategy process (part of the analysis) and metric calculation.
  - Support in insights interpretations.
  - Strategic business interpretation for executive audience.
  
- **Extent of Use:** 
  - 80% AI-generated code for visualizations with custom requirements.
  - 50% AI-assisted analysis methodology
  - 35% AI-supported narrative and insights
  - 100% human-directed strategic focus and requirements
  
- **Human Contribution:** 
  - Dataset selection and cleaning.
  - Business context (Terra Cotta Foods scenario) and scope definition.
  - Target audience specification (CEO Marco Antonelli)
  - Geographic classification (Continents).
  - Correlation and metrics computation.
  - Expansion strategy requirements and basis.
  - Validation of all outputs and business logic.
  - Constant interpretation and decision-making framework through the checkpoint development.

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

This project supports Terra Cotta Foods (TCF) leadership in evaluating economic viability and supply risk when expanding sourcing and production into Latin America and Asia. Using open country-level GDP-per-capita and population data, combined with internally modeled organizational and budget datasets, the analysis produces hierarchical visualizations (dendrogram, sunburst, treemap, sankey, and comparative charts) to:

- quantify "economic potential" as Total GDP = GDP per capita * Population,
- measure correlations between population and economic potential by region,
- visualize proximity clusters for potential supply hubs, and
- present organizational and financial reallocation proposals to enable an incremental expansion plan.

The deliverables produced in the notebook include analysis tables, interactive figures, and JSON exports for integration into TCF's web dashboard.

## Objectives

- Identify countries in Latin America and Asia with the highest economic potential (Total GDP) for sourcing/production decisions.
- Quantify the correlation between population size and total economic potential by continent to inform product and labor strategy.
- Use hierarchical visualizations to expose geographic proximity clusters and organizational cost/employee distributions relevant to expansion.
- Propose a prioritized, near-term expansion strategy that aligns budget reallocations and labor reassignments with sourcing goals.

## Methodology

- **Dataset 1:** `01_gdp_population.csv`

### Tools and Technologies
- **Programming Language:** Python 3.13.1
- **Environment:** Jupyter Notebook - Python Kernel 3.13.1
- **Libraries:** 
  - `pandas` - Data manipulation
  - `matplotlib.pyplot`, `plotly.express`, `plotly.graph_objects`, `scipy.cluster.hierarchy` & `seaborn`- Data visualization
  - `scipy.cluster.hierarchy`, `scipy.spatial.distance` & `numpy` - Mathematics operations and numerical computations
  - `country_converter` - Data retrieval

### Approach
1. Ingest and clean country dataset; exclude invalid/zero GDP entries.
2. Enrich with continent labels using country_converter and apply custom region mapping to split Latin America and North America.
3. Compute Total GDP = GDP per capita * Population (used as proxy for macro economic potential).
4. Segment data by continent and compute correlations (population vs Total GDP, GDP per capita vs population).
5. Select top candidate countries in Latin America and Asia by Total GDP for focused analysis.
6. Construct hierarchical visualizations:
   - Dendrogram of geographic proximity (latitude/longitude) for candidate countries.
   - Sunburst for organizational headcount distribution.
   - Treemap for budget allocation per department and project.
   - Sankey for proposed budget reallocation flows.
   - Bubble/scatter plot for Population vs GDP per capita with bubble size = Total GDP.
7. Propose labor reallocation and budget shifts; export datasets to JSON for dashboard use.
8. Summarize findings and tactical recommendations for the CEO.

## Implementation

### Phase 1 — Data ingestion & cleaning
- Loaded 01_gdp_population.csv into pandas, filtered out rows with missing/zero GDP.
- Used country_converter to map ISO country codes to continents; applied a small custom function to classify "Latin America" separately from North America.

```python
# Example (concise)
import pandas as pd
import country_converter as coco

countries_df = pd.read_csv('./data/01_gdp_population.csv')
countries_df = countries_df[countries_df['GDP'] > 0]  # drop invalid GDP rows

cc = coco.CountryConverter()
countries_df['Continent'] = cc.pandas_convert(series=countries_df['Country Code'], to='continent')
# apply small custom mapping to separate Latin America from North America
# ...existing code...
```

### Phase 2 — Metrics & correlation analysis
- Added a Total GDP column (GDP per capita * Population).
- Computed per-continent correlation matrices (Population, GDP per capita, Total GDP) to evaluate the relationship between labor/consumer base and macroeconomic size.
- Filtered countries to the Asia and Latin America subsets and produced a ranked top-10 by Total GDP for each region.

```python
# Example (concise)
countries_df['Total GDP'] = countries_df['GDP'] * countries_df['Population']
asia = countries_df[countries_df['Continent'] == 'Asia']
latam = countries_df[countries_df['Continent'] == 'Latin America']

# quick correlation check
asia_corr = asia[['Population', 'GDP', 'Total GDP']].corr()
latam_corr = latam[['Population', 'GDP', 'Total GDP']].corr()
# ...existing code...
```

### Phase 3 — Hierarchical visualizations & clustering
- Geographic clustering: used countries' latitude/longitude and scipy hierarchical linkage (Ward) to create a dendrogram highlighting proximity-based clusters and a threshold for cluster grouping.
- Organizational visuals: created a sunburst chart for department/subdepartment headcount (df_org) and a treemap for project-level budget distribution (df_budget).
- Strategic visuals: scatter/bubble plot (Population vs GDP per capita, bubble size = Total GDP), comparative bar chart for proposed labor reallocation, and a Sankey diagram to illustrate budget reflows into expansion efforts.

```python
# Example (concise)
from scipy.cluster.hierarchy import linkage, dendrogram
coords = df_geo[['Latitude', 'Longitude']].values
linkage_matrix = linkage(coords, method='ward')  # Ward linkage on lat/lon
# produce dendrogram with labels
dendrogram(linkage_matrix, labels=df_geo['Country Name'].tolist(), color_threshold=25)
# ...existing code...
```

(Organizational and treemap visual code are present in the notebook and were exported as interactive Plotly figures; see notebook cells for full details.)

### Phase 4 — Export & integration artifacts
- Exported visualization datasets to JSON for web use:
  - `./data/organization.json`
  - `./data/budget.json`
  - `./data/countries.json`
  - `./data/asia_latam.json`
  - `./data/top10_asia_latam.json`
  - `./data/job_rellocation.json`
  - `./data/budget_rellocation.json`

```python
# Example (concise)
df_org.to_json('./data/organization.json', orient='records', index=False)
df_budget.to_json('./data/budget.json', orient='records', index=False)
```

<!-- ...existing code... -->

## Results

### Key Findings
1. Strong positive correlation between population and Total GDP across most continents — high-population countries generally show greater macroeconomic potential measured as Total GDP. This supports locating capacity where labor/consumer base scale is large.
2. Latin America and Asia contain the top candidate countries by Total GDP (per the filtered top-10 lists). These regions provide the best combination of large markets and production potential for TCF's sourcing/production expansion.
3. Organizational emphasis: current headcount and budget allocation show the company is operations- and supply-chain-centric. Reallocating workforce (+ hires in Logistics/Procurement; modest reductions elsewhere) and redirecting project funds into regional sourcing/logistics is a viable near-term approach to enable expansion with limited net budget increase.

### Visualizations (generated in the notebook)
- Population vs GDP per Capita scatter (bubble size = Total GDP) — used log-scale for Population.
- Dendrogram of geographic proximity across selected countries — identifies clusters for regional hub planning.
- Sunburst chart — visualizes TCF organizational labor distribution.
- Treemap — shows project-level budget allocation by department.
- Comparative bar chart — shows proposed labor reallocation by sub-department.
- Sankey diagram — illustrates proposed budget reallocation flows into expansion investments.
All figures are interactive where created with Plotly and were also exported as JSON to support web embedding.

### Performance Metrics
| Metric | Value | Description |
|--------|-------|-------------|
| Dataset size | ~200 countries | Country-level rows used for analysis (after filtering) |
| Notebook runtime | < 2 min (typical laptop run) | Full pipeline (data prep + visualizations) on a modern laptop — interactive figure rendering time depends on environment |
| Exports | 7 JSON files | Data artifacts created for dashboard integration |

## Conclusions

### Summary
The analysis indicates that prioritizing expansion efforts in targeted countries within Latin America and Asia is economically justified when using Total GDP as the primary proxy for market and production potential. Population is a strong predictor of Total GDP, implying that scale-focused manufacturing and distribution strategies (low-to-mid price tiers) are appropriate for these regions. Internally, shifting headcount toward logistics and procurement and reallocating specific project budgets into regional sourcing and logistics planning will materially improve TCF's readiness to scale.

### Lessons Learned
- Total GDP (population × GDP per capita) is a practical first-order metric to shortlist candidate countries but must be complemented with trade, political, and labor data for final site selection.
- Hierarchical visualizations (dendrograms, sunbursts, treemaps, Sankey) make trade-offs and organizational impacts tangible to executive stakeholders.
- Exporting structured JSON artifacts from notebooks streamlines integration into web dashboards for stakeholder review.

### Future Work
- Add supplier-level datasets (lead time, cost, reliability) and logistics cost modeling to produce a multi-criteria supplier scoring matrix.
- Incorporate risk indices: political stability, trade barriers, tariffs, and ease-of-doing-business metrics for a more robust country-level rank.
- Run scenario and sensitivity analyses (fuel cost changes, tariff shocks, demand fluctuations).
- Add local labor market studies, wage expectations, and regulatory/compliance assessments before committing capex.
- Automate dashboard refresh and include interactive filters (region, cluster, cost thresholds) for executive decision sessions.

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

**Note:** This document is part of the academic portfolio for the Data Engineering program at Universidad Politécnica de Yucatán. All analysis was conducted in October 2025 using Jupyter Notebook and Python 3.13.1

**AI Conversation Log:** [https://gemini.google.com/share/daee5fec28f4]  
**Repository:** [https://github.com/areo-17]  
**Contact:** [2209025@upy.edu.mx]