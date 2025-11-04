```markdown
# Project Unit 2: AI Job Market Analysis

This directory contains all data analysis notebooks, utility scripts, and data files (both raw and processed) used for the Unit 2 Project. The focus of this analysis is to explore the AI job market, with a specific emphasis on temporal, hierarchical, relational, and spatiotemporal trends.

## 📁 Directory Structure

ML/U2/ProjectU2/
├── 01_Temporal/
│   └── Data/
│       └── jobs_ai_skills.csv
├── 02_Hierarchical/
│   └── Data/
│       ├── jobs_distribution.json
│       └── jobs_potential_countries.json
├── 03_Relational/
│   └── Data/
│       └── employees_level.json
├── data/
│   ├── countries_locations.json
│   ├── employees_level.json
│   ├── jobs_ai_skills.csv
│   ├── jobs_distribution.json
│   ├── jobs_potential_countries.json
│   └── projectU2.csv
├── Analysis_v2.ipynb
└── extract_salary_data.py

##  Methodology and Workflow

The workflow for this machine learning component is as follows:

1.  **Raw Data:** The analysis begins with the primary dataset `data/projectU2.csv`, which contains detailed information on AI-specific job salaries, roles, locations, and experience levels.

2.  **Analysis & Processing:** The Jupyter notebooks (primarily `Analysis_v2.ipynb`) are used to:
    * Clean and pre-process the raw data.
    * Perform exploratory data analysis (EDA).
    * Aggregate, filter, and transform the data to answer specific research questions.

3.  **Analysis Types:** The project is broken down into three main analytical approaches, which are reflected in the sub-directory structure:
    * **Temporal (`01_Temporal`):** Analyzes how AI roles and salaries have evolved over time.
    * **Hierarchical (`02_Hierarchical`):** Uses visualizations (like Treemaps) to break down the job market structure by category, experience level, and company size.
    * **Relational / Spatiotemporal (`03_Relational`):** Explores relationships between variables (e.g., skill level vs. salary) and the geographic distribution of AI jobs (e.g., average salary by country).

4.  **JSON Output Generation:** The notebooks process the data and generate clean, pre-calculated `JSON` files. These are staged in the `data/` directory.

5.  **API Consumption:** These generated JSON files are the final product of this directory. They are designed to be read directly by the `API` service (specifically by the `API/Endpoints/Unit2/proyecto.py` endpoint) to efficiently serve the analysis results to the frontend dashboard.

###  Key Notebooks

* **`Analysis_v2.ipynb`**: The main notebook for hierarchical (treemap) and relational (scatter plots, bar charts) analyses.
```