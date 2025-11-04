Aquí tienes el texto del README en inglés, en formato normal:

# Project Unit 2: AI Job Market Analysis

This directory contains all the data analysis notebooks, processing scripts, and data files (both raw and processed) used for the Unit 2 Project. The objective of this analysis is to explore the Artificial Intelligence job market, focusing on temporal, hierarchical, and relational/spatiotemporal trends.

## Directory Structure

```
ML/U2/ProjectU2/
│
├── 01_Temporal/
│   └── Data/
│       └── jobs_ai_skills.csv           # Processed data for temporal analysis
│
├── 02_Hierarchical/
│   └── Data/
│       ├── jobs_distribution.json       # JSON for hierarchical visualization
│       └── jobs_potential_countries.json # JSON for hierarchical visualization
│
├── 03_Relational/
│   └── Data/
│       └── employees_level.json         # JSON for relational analysis
│
├── data/
│   ├── projectU2.csv                    # Main dataset for AI salaries
│   ├── jobs_ai_skills.csv               # AI skills dataset
│   ├── countries_locations.json         # JSON for maps (spatiotemporal)
│   ├── employees_level.json             # JSON for level analysis (relational)
│   ├── jobs_distribution.json           # JSON for job distribution (hierarchical)
│   └── jobs_potential_countries.json    # JSON for country analysis (hierarchical)
│
├── Analysis_v2.ipynb                    # Analysis notebook (version 2)
```

## Methodology and Workflow

The workflow for this Machine Learning component is as follows:

1.  **Raw Data:** The analysis begins with the main dataset `data/projectU2.csv`, which contains detailed information on salaries, roles, locations, and experience levels in the AI sector.
2.  **Analysis & Processing:** The Jupyter notebooks (like `Analysis_v2.ipynb` and `analisis_espaciotemporal.ipynb`) are used to:
      * Clean and pre-process the data.
      * Perform exploratory data analysis (EDA).
      * Group, filter, and transform the data to answer the research questions.
3.  **Analysis Types:** The project is divided into three main analytical approaches, which are reflected in the folder structure:
      * **Temporal (`01_Temporal`):** Analyzes how roles and salaries have evolved over time.
      * **Hierarchical (`02_Hierarchical`):** Uses visualizations (like Treemaps) to break down the job market structure by job category, experience level, and company size.
      * **Relational/Spatiotemporal (`03_Relational`):** Explores relationships between variables (e.g., skill level vs. salary) and the geographic distribution (e.g., average salaries by country) of AI jobs.
4.  **JSON Output Generation:** The notebooks process the data and generate clean, aggregated `JSON` files (e.g., `jobs_distribution.json`, `countries_locations.json`, `employees_level.json`).
5.  **API Consumption:** These JSON files are the final products of this directory. They are read directly by the `API` service (specifically by the `API/Endpoints/Unit2/proyecto.py` endpoint) to efficiently serve the pre-calculated data to the frontend.

### Analysis Notebooks

  * **`Analysis_v2.ipynb`:** Contains the analysis for the hierarchical (Treemaps) and relational (scatter plots, bar charts) visualizations.

-----