# **Portfolio Unit 2: Advanced Data Analysis Projects**

## 👥 **Team Information**
| Full Name |
| :--- |
| Damaris Dzul and Ariel Buenfil |

## 📝 **Portfolio Overview**

This portfolio for Unit 2 contains a collection of three distinct data analysis projects, each exploring a different analytical domain:

1. **Hierarchical Analysis:** A supply-risk and expansion strategy analysis for "Terra Cotta Foods," focusing on market potential (Total GDP) in Latin America and Asia.
2. **Relational Analysis:** A graph-based social network analysis of US Congress members on Twitter, identifying key influencers and community structures using centrality metrics.
3. **Spatiotemporal Analysis:** An exploration of the relationship between cryptocurrency market volatility and global public interest (Google Search Trends), combining time-series statistics and geospatial mapping.

## 📁 **Project Structure**

This repository is organized into distinct notebooks for each analysis, a shared data directory, and a documentation folder for AI disclosures.

```
PortfolioU2/
├── 📂 Chekpoint 1/
│   └── 📓 03_spatiotemporal_analysis_fixed.ipynb
├── 📂 Chekpoint 2/
│   └── 📓 01_hierarchical_analysis.ipynb
├── 📂 Chekpoint 3/
│   └── 📓 02_relational_analysis.ipynb
├── 📂 Docs/
│   ├── 📂 AI DISCLOSURE_checkpoint1/
│   ├── 📂 AI DISCLOSURE_checkpoint2/
│   ├── 📂 AI DISCLOSURE_checkpoint3/
│   └── 📄 readme.md
├── 📂 data/
│   ├── 📂 congress_network/
│   ├── 📄 01_gdp_population.csv
│   ├── 📄 Wiki-Vote.txt
│   ├── 📄 acf_returns_squared.json
│   ├── 📄 asia_latam.json
│   ├── 📄 budget.json
│   ├── 📄 budget_rellocation.json
│   ├── 📄 ccf_full.json
│   ├── 📄 correlation.json
│   ├── 📄 countries.json
│   ├── 📄 interests.json
│   ├── 📄 job_rellocation.json
│   ├── 📄 map_data.csv
│   ├── 📄 organization.json
│   ├── 📄 sample_temporal.csv
│   ├── 📄 top10_asia_latam.json
│   ├── 📄 trends.csv
│   ├── 📄 trends_fixed.csv
│   └── 📄 vol_stats.json
```

---

## 🚀 **Instructions to Run the Analysis**

To replicate these analyses, please follow the steps below.

1. **Navigate to the Portfolio Directory:**
   ```bash
   cd PortfolioU2
   ```

2. **Set Up a Virtual Environment (Recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install Required Libraries:**
   Install all dependencies required for the three notebooks.
   ```bash
   pip install pandas numpy matplotlib seaborn plotly statsmodels jupyter networkx scipy country_converter squarify
   ```

4. **Launch Jupyter Notebook:**
   ```bash
   jupyter notebook
   ```

5. **Run the Notebooks:**
   Open the Jupyter interface and select one of the notebooks from their respective checkpoint folders:
   - `Chekpoint 2/01_hierarchical_analysis.ipynb` (for Terra Cotta Foods analysis)
   - `Chekpoint 3/02_relational_analysis.ipynb` (for US Congress Twitter analysis)
   - `Chekpoint 1/03_spatiotemporal_analysis_fixed.ipynb` (for Cryptocurrency analysis)

---

## 🎯 **Analysis 1: Hierarchical Analysis (Terra Cotta Foods)**

This notebook conducts a hierarchical, country-level study to evaluate supply risk and expansion strategy for Terra Cotta Foods (TCF).

- **Notebook:** `Chekpoint 2/01_hierarchical_analysis.ipynb`
- **Purpose:** To shortlist candidate countries in Latin America and Asia by "Total GDP" (GDP per capita × population), produce hierarchical visualizations (dendrogram, treemap, sunburst, Sankey, comparative charts), and propose tactical labor & budget reallocations to enable incremental expansion.
- **Main Methods & Visuals:**
  - **Data Enrichment:** Continent mapping via `country_converter` and custom region mapping.
  - **Metrics:** Computed "Total GDP" and per-continent correlations to evaluate market scale vs. purchasing power.
  - **Clustering:** Geographic proximity clustering (Ward linkage) used to build a dendrogram for hub/cluster planning.
  - **Hierarchical Visuals:** Interactive treemap (Region → Country), Sunburst (headcount distribution), Dendrogram (proximity clusters), Scatter/bubble (Population vs GDP), and Sankey (budget reallocation).
- **Key Outputs:** Dataframes are converted to JSON artifacts (see data dictionary) to feed a potential web dashboard.

## 🎯 **Analysis 2: Relational Analysis (US Congress Twitter)**

This notebook performs a social network analysis on the interactions between US Congress members on Twitter.

- **Notebook:** `Chekpoint 3/02_relational_analysis.ipynb`
- **Purpose:** To identify the most central and influential members within the network and to discover underlying community structures, likely representing political affiliations.
- **Main Methods & Visuals:**
  - **Graph Creation:** A directed graph is built using `networkx` where nodes are members and edges represent interactions.
  - **Centrality Metrics:** Calculation and comparison of PageRank, Betweenness Centrality, In-Degree, and Out-Degree to identify different types of influencers (e.g., "broadcasters" vs. "authorities").
  - **Community Detection:** Use of the 'greedy_modularity' algorithm to partition the network into distinct communities.
- **Key Findings:** The analysis identifies key influencers (e.g., Node '322') and quantifies the high degree of political polarization (Modularity score ≈ 0.40) by confirming a strong 3-community structure.

## 🎯 **Analysis 3: Spatiotemporal Analysis (Cryptocurrency)**

This notebook undertakes a comprehensive spatiotemporal analysis to explore the intricate relationship between cryptocurrency market volatility and global public interest.

- **Notebook:** `Chekpoint 1/03_spatiotemporal_analysis_fixed.ipynb`
- **Purpose:** To determine if patterns in public curiosity (Google Search Trends) correlate with or predict fluctuations in the cryptocurrency market.
- **Analysis Goals:**
  1. Is there evidence of **volatility clustering** in the cryptocurrency market?
  2. Is there a significant **correlation** between public search interest and market volatility?
  3. What is the **global distribution** of public interest in cryptocurrencies?

### **Progress and Evidence (Analysis 3)**

#### 1. Data Ingestion and Preprocessing
- **Description:** Loaded historical crypto price data and Google Trends data. Calculated daily returns and squared them to proxy for daily volatility.
- **Tools/Files:** `data/sample_temporal.csv`, `data/trends_fixed.csv`

#### 2. Temporal Analysis: Volatility Clustering (ACF)
- **Description:** Computed the Autocorrelation Function (ACF) on the squared returns. The resulting slowly decaying ACF plot confirmed the presence of volatility clustering.
- **Evidence:** The Autocorrelation Function (ACF) plot for the squared returns.
  
  ![ACF Plot of Squared Returns](https://i.imgur.com/vHq8u93.png)
  
- **Tools/Files:** `data/acf_returns_squared.json`

#### 3. Temporal Analysis: Cross-Correlation (CCF)
- **Description:** Employed the Cross-Correlation Function (CCF) to measure the relationship between market volatility and Google Search interest. The plot revealed a statistically significant correlation, suggesting public interest spikes coincide with or precede market turbulence.
- **Tools/Files:** `data/ccf_full.json`, `data/correlation.json`

#### 4. Spatiotemporal Analysis: Geographic Interest Distribution
- **Description:** Aggregated Google Trends data by country to generate a choropleth world map, visualizing regional hotspots of cryptocurrency interest, particularly in South America, Africa, and Eastern Europe.
- **Tools/Files:** `data/interests.json`, `data/map_data.csv`

---

## 🗂️ **Data Dictionary**

The `data/` directory contains all datasets generated and used throughout the three analyses.

### Project 1: Hierarchical Analysis
| File Name | Description |
| :--- | :--- |
| `01_gdp_population.csv` | Input data with country, GDP per capita, and population. |
| `organization.json` | Hierarchical JSON of organizational headcount for sunburst chart. |
| `budget.json` | Hierarchical JSON of organizational budget for sunburst chart. |
| `countries.json` | Processed country data with calculated Total GDP. |
| `asia_latam.json` | Filtered data for only Asian and Latin American countries. |
| `top10_asia_latam.json` | Top 10 countries from Asia/LatAm by Total GDP. |
| `job_rellocation.json` | Data for proposed job reallocations. |
| `budget_rellocation.json` | Data for proposed budget reallocations (Sankey diagram). |

### Project 3: Spatiotemporal Analysis
| File Name | Description |
| :--- | :--- |
| `acf_returns_squared.json` | Stores the results of the ACF on the squared returns. |
| `ccf_full.json` | Contains the full output of the CCF between volatility and search trends. |
| `correlation.json` | Pearson correlation coefficient between the primary time series. |
| `interests.json` | Aggregated Google Trends data by country. |
| `map_data.csv` | Processed CSV formatted for the choropleth map visualization. |
| `sample_temporal.csv` | Raw historical daily price data for selected cryptocurrencies. |
| `trends.csv` / `trends_fixed.csv` | Raw and cleaned time-series data from Google Trends. |
| `vol_stats.json` | Descriptive statistics for the daily volatility series. |

*(Note: `02_relational_analysis` uses a dataset loaded directly via `networkx` and does not write new files to the data directory.)*

---

## 🤖 **AI Disclosures**

During the development of this project, AI-powered tools were utilized to assist with various tasks. Specific AI disclosure forms for each project component can be found in the `📂 Docs/` directory.

- **Code Generation & Debugging:** AI was used as a programming assistant to generate boilerplate code, suggest optimizations, and help debug complex functions within the Jupyter Notebooks.
- **Documentation & Explanation:** AI tools were leveraged to generate clear and concise explanations for statistical methods (ACF, CCF, Centrality) and to help structure this README file in a professional and comprehensive manner.

All analytical conclusions and interpretations of the results were performed by the project team members.