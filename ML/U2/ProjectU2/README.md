Claro, aquí tienes una propuesta de `README.md` para la carpeta `ML/U2/ProjectU2`, basado en la estructura y los archivos que has proporcionado.

-----

# Proyecto Unidad 2: Análisis del Mercado Laboral de IA

Este directorio contiene todos los notebooks de análisis de datos, scripts de procesamiento y archivos de datos (tanto crudos como procesados) utilizados para el Proyecto de la Unidad 2. El objetivo de este análisis es explorar el mercado laboral de la Inteligencia Artificial, centrándose en las tendencias temporales, jerárquicas y relacionales/espaciotemporales.

##  Estructura del Directorio

```
ML/U2/ProjectU2/
│
├── 01_Temporal/
│   └── Data/
│       └── jobs_ai_skills.csv       # Datos procesados para análisis temporal
│
├── 02_Hierarchical/
│   └── Data/
│       ├── jobs_distribution.json   # JSON para visualización jerárquica
│       └── jobs_potential_countries.json # JSON para visualización jerárquica
│
├── 03_Relational/
│   └── Data/
│       └── employees_level.json     # JSON para análisis relacional
│
├── data/
│   ├── projectU2.csv                # Dataset principal de salarios de IA
│   ├── jobs_ai_skills.csv           # Dataset de habilidades de IA
│   ├── countries_locations.json     # JSON para mapas (espaciotemporal)
│   ├── employees_level.json         # JSON para análisis de nivel (relacional)
│   ├── jobs_distribution.json       # JSON para distribución de trabajos (jerárquico)
│   └── jobs_potential_countries.json # JSON para análisis de países (jerárquico)
│
├── Analysis_v2.ipynb                # Notebook de análisis (versión 2)
```

##  Metodología y Flujo de Trabajo

El flujo de trabajo de este componente de Machine Learning es el siguiente:

1.  **Datos Crudos:** El análisis comienza con el dataset principal `data/projectU2.csv`, que contiene información detallada sobre salarios, roles, ubicaciones y niveles de experiencia en el sector de la IA.
2.  **Análisis y Procesamiento:** Los notebooks de Jupyter (como `Analysis_v2.ipynb` y `analisis_espaciotemporal.ipynb`) se utilizan para:
      * Limpiar y pre-procesar los datos.
      * Realizar análisis exploratorio (EDA).
      * Agrupar, filtrar y transformar los datos para responder a las preguntas de investigación.
3.  **Tipos de Análisis:** El proyecto se divide en tres enfoques analíticos principales, que se reflejan en la estructura de carpetas:
      * **Temporal (`01_Temporal`):** Analiza cómo han evolucionado los roles y salarios a lo largo del tiempo.
      * **Jerárquico (`02_Hierarchical`):** Utiliza visualizaciones (como Treemaps) para descomponer la estructura del mercado laboral por categoría de trabajo, nivel de experiencia y tamaño de empresa.
      * **Relacional/Espaciotemporal (`03_Relational`):** Explora las relaciones entre variables (ej. nivel de habilidad vs. salario) y la distribución geográfica (ej. salarios promedio por país) de los trabajos de IA.
4.  **Generación de Salidas (JSON):** Los notebooks procesan los datos y generan archivos `_json_` limpios y agregados (ej. `jobs_distribution.json`, `countries_locations.json`, `employees_level.json`).
5.  **Consumo de la API:** Estos archivos JSON son los productos finales de este directorio. Son leídos directamente por el servicio `API` (específicamente por el endpoint `API/Endpoints/Unit2/proyecto.py`) para servir los datos pre-calculados al *frontend* de manera eficiente.

###  Notebooks de Análisis

  * **`Analysis_v2.ipynb`:** Contiene el análisis para las visualizaciones jerárquicas (Treemaps) y relacionales (gráficos de dispersión, barras).

-----