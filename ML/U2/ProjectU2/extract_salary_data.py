"""
═══════════════════════════════════════════════════════════════════
TECH SALARY ANALYTICS - DATA EXTRACTION SCRIPT CORREGIDO
Extrae datos del CSV manteniendo fidelidad con el análisis de la notebook
═══════════════════════════════════════════════════════════════════
"""

import pandas as pd
import numpy as np
import json
from pathlib import Path
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

print("="*70)
print("🚀 TECH SALARY ANALYTICS - DATA EXTRACTOR (CORREGIDO)")
print("="*70)

# ═══════════════════════════════════════════════════════════════════
# 1. CONFIGURACIÓN DE RUTAS
# ═══════════════════════════════════════════════════════════════════

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / 'data'
OUTPUT_DIR = BASE_DIR / 'Unidad_2' / 'static' / 'Portfolio' / 'js' / 'checkpoint3'

# Crear directorio de salida si no existe
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

print(f"\n📁 Directorios:")
print(f"   Base: {BASE_DIR}")
print(f"   Data: {DATA_DIR}")
print(f"   Output: {OUTPUT_DIR}")

# ═══════════════════════════════════════════════════════════════════
# 2. CARGAR DATASET Y APLICAR BALANCEO (COMO EN NOTEBOOK)
# ═══════════════════════════════════════════════════════════════════

print("\n🔄 Cargando dataset y aplicando balanceo...")

try:
    df = pd.read_csv(DATA_DIR / 'projectU2.csv')
    print(f"✅ Dataset cargado: {len(df):,} registros")
except FileNotFoundError:
    print(f"❌ ERROR: No se encontró el archivo en {DATA_DIR / 'projectU2.csv'}")
    exit(1)

# Validar columnas requeridas
required_cols = ['work_year', 'salary_in_usd', 'employee_country_name', 'company_country_name']
missing_cols = [col for col in required_cols if col not in df.columns]
if missing_cols:
    print(f"❌ ERROR: Faltan columnas requeridas: {missing_cols}")
    exit(1)

# Limpiar y preparar datos
df['work_year'] = pd.to_numeric(df['work_year'], errors='coerce')
df['salary_in_usd'] = pd.to_numeric(df['salary_in_usd'], errors='coerce')
df = df.dropna(subset=['work_year', 'salary_in_usd'])
df['work_year'] = df['work_year'].astype(int)

# ═══════════════════════════════════════════════════════════════════
# 2.1 BALANCEO DE DATOS (COMO EN NOTEBOOK)
# ═══════════════════════════════════════════════════════════════════

print("\n⚖️ Aplicando balanceo de datos...")

# Análisis de distribución por país (igual que notebook)
country_counts = df['employee_country_name'].value_counts()
dominant_country = country_counts.index[0]
dominant_count = country_counts.iloc[0]

print(f"   País dominante: {dominant_country} con {dominant_count:,} registros")

# Calcular mediana de otros países
other_countries_median = country_counts[1:].median()
print(f"   Mediana de otros países: {other_countries_median:.0f} registros")

# Submuestrear el país dominante para balancear (3x la mediana)
df_dominant = df[df['employee_country_name'] == dominant_country]
df_others = df[df['employee_country_name'] != dominant_country]

target_sample_size = min(int(other_countries_median * 3), len(df_dominant))
df_dominant_sampled = df_dominant.sample(n=target_sample_size, random_state=42)

# Combinar datos balanceados
df_balanced = pd.concat([df_dominant_sampled, df_others], ignore_index=True)
df = df_balanced.copy()

print(f"✅ Dataset balanceado:")
print(f"   {dominant_country}: {len(df_dominant_sampled):,} registros (reducido de {len(df_dominant):,})")
print(f"   Otros países: {len(df_others):,} registros")
print(f"   Total: {len(df):,} registros")

# ═══════════════════════════════════════════════════════════════════
# 2.2 CREAR PERIODO IA Y CUATRIMESTRES (COMO EN NOTEBOOK)
# ═══════════════════════════════════════════════════════════════════

print("\n📅 Creando variables temporales...")

# Periodo Pre-IA vs Post-IA (CRÍTICO para el análisis)
def classify_ai_period(year):
    if year <= 2022:
        return 'Pre-IA (2020-2022)'
    else:
        return 'Post-IA (2023-2025)'

df['ai_period'] = df['work_year'].apply(classify_ai_period)

# Crear cuatrimestres artificiales (igual que notebook)
np.random.seed(42)
df['cuatrimestre'] = np.random.choice([1, 2, 3], size=len(df))
cuatrimestre_mes = {1: 2, 2: 6, 3: 10}
df['mes_artificial'] = df['cuatrimestre'].map(cuatrimestre_mes)
df['fecha_artificial'] = pd.to_datetime(
    df['work_year'].astype(str) + '-' + df['mes_artificial'].astype(str) + '-01',
    errors='coerce'
)

# Verificar si existe columna department, si no, usar category
if 'department' not in df.columns:
    if 'category' in df.columns:
        print("⚠️  Columna 'department' no encontrada. Usando 'category'")
        df['department'] = df['category']
    elif 'subcategory' in df.columns:
        print("⚠️  Columna 'department' no encontrada. Usando 'subcategory'")
        df['department'] = df['subcategory']
    else:
        print("⚠️  Columna 'department' no encontrada. Creando departamento genérico")
        df['department'] = 'Technology'

# Limpiar nombres de países
df['employee_country_name'] = df['employee_country_name'].str.strip()
df['company_country_name'] = df['company_country_name'].str.strip()

print(f"   Años: {df['work_year'].min()}-{df['work_year'].max()}")
print(f"   Periodos IA: {df['ai_period'].value_counts().to_dict()}")
print(f"   Países (empleados): {df['employee_country_name'].nunique()}")
print(f"   Departamentos: {df['department'].nunique()}")

# ═══════════════════════════════════════════════════════════════════
# 3. MAPEO DE REGIONES Y CÓDIGOS ISO
# ═══════════════════════════════════════════════════════════════════

REGION_MAPPING = {
    'United States': 'North America',
    'Canada': 'North America',
    'Mexico': 'North America',
    'United Kingdom': 'Europe',
    'Germany': 'Europe',
    'France': 'Europe',
    'Spain': 'Europe',
    'Italy': 'Europe',
    'Netherlands': 'Europe',
    'Poland': 'Europe',
    'Sweden': 'Europe',
    'Norway': 'Europe',
    'Denmark': 'Europe',
    'Finland': 'Europe',
    'Switzerland': 'Europe',
    'Austria': 'Europe',
    'Belgium': 'Europe',
    'Ireland': 'Europe',
    'Portugal': 'Europe',
    'Greece': 'Europe',
    'Czech Republic': 'Europe',
    'Romania': 'Europe',
    'Hungary': 'Europe',
    'Australia': 'Asia Pacific',
    'Singapore': 'Asia Pacific',
    'India': 'Asia Pacific',
    'China': 'Asia Pacific',
    'Japan': 'Asia Pacific',
    'South Korea': 'Asia Pacific',
    'New Zealand': 'Asia Pacific',
    'Malaysia': 'Asia Pacific',
    'Thailand': 'Asia Pacific',
    'Indonesia': 'Asia Pacific',
    'Philippines': 'Asia Pacific',
    'Brazil': 'South America',
    'Argentina': 'South America',
    'Chile': 'South America',
    'Colombia': 'South America',
    'Peru': 'South America',
}

ISO3_MAPPING = {
    'United States': 'USA',
    'United Kingdom': 'GBR',
    'Canada': 'CAN',
    'Germany': 'DEU',
    'Australia': 'AUS',
    'India': 'IND',
    'France': 'FRA',
    'Netherlands': 'NLD',
    'Spain': 'ESP',
    'Singapore': 'SGP',
    'Poland': 'POL',
    'Sweden': 'SWE',
    'Switzerland': 'CHE',
    'Japan': 'JPN',
    'Brazil': 'BRA',
    'Mexico': 'MEX',
    'Italy': 'ITA',
    'Norway': 'NOR',
    'Denmark': 'DNK',
    'Belgium': 'BEL',
    'Austria': 'AUT',
    'Ireland': 'IRL',
    'Portugal': 'PRT',
    'Greece': 'GRC',
    'Finland': 'FIN',
    'Czech Republic': 'CZE',
    'Romania': 'ROU',
    'Hungary': 'HUN',
    'South Korea': 'KOR',
    'New Zealand': 'NZL',
    'Malaysia': 'MYS',
    'Thailand': 'THA',
    'Indonesia': 'IDN',
    'Philippines': 'PHL',
    'Argentina': 'ARG',
    'Chile': 'CHL',
    'Colombia': 'COL',
    'Peru': 'PER',
    'China': 'CHN',
}

# ═══════════════════════════════════════════════════════════════════
# 4. EXTRAER DATOS ESPACIOTEMPORALES (MEJORADO)
# ═══════════════════════════════════════════════════════════════════

print("\n🔄 Extrayendo datos espaciotemporales mejorados...")

# 4.1 Salarios globales por año (con datos balanceados)
global_salary = df.groupby('work_year').agg({
    'salary_in_usd': ['mean', 'median', 'count']
}).reset_index()
global_salary.columns = ['year', 'salary', 'median_salary', 'job_count']
global_salary = global_salary.sort_values('year')

globalSalaryData = [
    {
        'year': int(row['year']),
        'salary': round(float(row['salary']), 2),
        'median_salary': round(float(row['median_salary']), 2),
        'job_count': int(row['job_count'])
    }
    for _, row in global_salary.iterrows()
]

# 4.2 COMPARACIÓN PRE-IA vs POST-IA (CRÍTICO)
print("\n📊 Calculando comparativa Pre-IA vs Post-IA...")

pre_ia = df[df['ai_period'] == 'Pre-IA (2020-2022)']['salary_in_usd']
post_ia = df[df['ai_period'] == 'Post-IA (2023-2025)']['salary_in_usd']

ai_comparison = {
    'pre_ia': {
        'mean_salary': round(float(pre_ia.mean()), 2),
        'median_salary': round(float(pre_ia.median()), 2),
        'job_count': int(len(pre_ia)),
        'period': 'Pre-IA (2020-2022)'
    },
    'post_ia': {
        'mean_salary': round(float(post_ia.mean()), 2),
        'median_salary': round(float(post_ia.median()), 2),
        'job_count': int(len(post_ia)),
        'period': 'Post-IA (2023-2025)'
    },
    'growth_pct': round(((post_ia.mean() - pre_ia.mean()) / pre_ia.mean() * 100), 2),
    'job_growth_pct': round(((len(post_ia) - len(pre_ia)) / len(pre_ia) * 100), 2)
}

print(f"   ✅ Pre-IA: ${ai_comparison['pre_ia']['mean_salary']:,.2f} ({ai_comparison['pre_ia']['job_count']:,} jobs)")
print(f"   ✅ Post-IA: ${ai_comparison['post_ia']['mean_salary']:,.2f} ({ai_comparison['post_ia']['job_count']:,} jobs)")
print(f"   📈 Crecimiento salarial: {ai_comparison['growth_pct']}%")
print(f"   📈 Crecimiento empleos: {ai_comparison['job_growth_pct']}%")

# 4.3 Evolución por departamento (con datos balanceados)
departmentData = {}
departments = df['department'].dropna().unique()
for dept in departments:
    dept_df = df[df['department'] == dept]
    yearly = dept_df.groupby('work_year')['salary_in_usd'].mean().reset_index()
    yearly.columns = ['year', 'salary']
    yearly = yearly.sort_values('year')
    
    # También calcular crecimiento Pre-IA vs Post-IA por departamento
    dept_pre_ia = dept_df[dept_df['ai_period'] == 'Pre-IA (2020-2022)']['salary_in_usd'].mean()
    dept_post_ia = dept_df[dept_df['ai_period'] == 'Post-IA (2023-2025)']['salary_in_usd'].mean()
    dept_growth = round(((dept_post_ia - dept_pre_ia) / dept_pre_ia * 100), 2) if dept_pre_ia > 0 else 0
    
    departmentData[str(dept)] = {
        'timeline': [
            {
                'year': int(row['year']),
                'salary': round(float(row['salary']), 2)
            }
            for _, row in yearly.iterrows()
        ],
        'growth_pct': dept_growth,
        'pre_ia_salary': round(float(dept_pre_ia), 2) if not np.isnan(dept_pre_ia) else 0,
        'post_ia_salary': round(float(dept_post_ia), 2) if not np.isnan(dept_post_ia) else 0
    }

# 4.4 Top países por número de empleados (con datos balanceados)
country_stats = df.groupby('employee_country_name').agg({
    'salary_in_usd': 'mean',
    'work_year': 'count'
}).reset_index()
country_stats.columns = ['name', 'avgSalary', 'jobs']
country_stats['code'] = country_stats['name'].map(ISO3_MAPPING).fillna('XXX')
country_stats['region'] = country_stats['name'].map(REGION_MAPPING).fillna('Other')

# Filtrar países con datos significativos y ordenar
country_stats = country_stats[country_stats['jobs'] >= 5]
country_stats = country_stats.sort_values('jobs', ascending=False)

worldMapData = {
    'countries': [
        {
            'name': str(row['name']),
            'code': str(row['code']),
            'jobs': int(row['jobs']),
            'avgSalary': round(float(row['avgSalary']), 2),
            'region': str(row['region'])
        }
        for _, row in country_stats.iterrows()
    ]
}

print(f"✅ Espaciotemporal: {len(globalSalaryData)} años, {len(departmentData)} departamentos, {len(worldMapData['countries'])} países")

# ═══════════════════════════════════════════════════════════════════
# 5. EXTRAER DATOS JERÁRQUICOS (MEJORADO)
# ═══════════════════════════════════════════════════════════════════

print("\n🔄 Extrayendo datos jerárquicos mejorados...")

df['region'] = df['employee_country_name'].map(REGION_MAPPING)
df_with_region = df[df['region'].notna()].copy()

# 5.1 Estadísticas por región (con datos balanceados)
regions = []
for region_name in df_with_region['region'].unique():
    region_df = df_with_region[df_with_region['region'] == region_name]
    
    # Calcular crecimiento Pre-IA vs Post-IA por región
    region_pre_ia = region_df[region_df['ai_period'] == 'Pre-IA (2020-2022)']['salary_in_usd'].mean()
    region_post_ia = region_df[region_df['ai_period'] == 'Post-IA (2023-2025)']['salary_in_usd'].mean()
    region_growth = round(((region_post_ia - region_pre_ia) / region_pre_ia * 100), 2) if region_pre_ia > 0 else 0
    
    # Países en la región
    countries = []
    for country_name in region_df['employee_country_name'].unique():
        country_df = region_df[region_df['employee_country_name'] == country_name]
        if len(country_df) >= 3:  # Mínimo 3 registros
            countries.append({
                'name': str(country_name),
                'avgSalary': round(float(country_df['salary_in_usd'].mean()), 2),
                'jobs': int(len(country_df)),
                'code': ISO3_MAPPING.get(country_name, 'XXX')
            })
    
    if countries:  # Solo añadir región si tiene países
        regions.append({
            'name': str(region_name),
            'avgSalary': round(float(region_df['salary_in_usd'].mean()), 2),
            'totalJobs': int(len(region_df)),
            'growth_pct': region_growth,
            'pre_ia_salary': round(float(region_pre_ia), 2) if not np.isnan(region_pre_ia) else 0,
            'post_ia_salary': round(float(region_post_ia), 2) if not np.isnan(region_post_ia) else 0,
            'countries': sorted(countries, key=lambda x: x['jobs'], reverse=True)
        })

# 5.2 Top roles por región (si existe job_title)
topJobsByRegion = {}
if 'job_title' in df.columns:
    for region_name in df_with_region['region'].unique():
        region_df = df_with_region[df_with_region['region'] == region_name]
        
        job_stats = region_df.groupby('job_title').agg({
            'salary_in_usd': 'mean',
            'work_year': 'count'
        }).reset_index()
        job_stats.columns = ['role', 'avgSalary', 'jobs']
        job_stats = job_stats[job_stats['jobs'] >= 2]  # Mínimo 2 registros
        job_stats = job_stats.sort_values('avgSalary', ascending=False).head(10)
        
        topJobsByRegion[str(region_name)] = [
            {
                'role': str(row['role']),
                'avgSalary': round(float(row['avgSalary']), 2),
                'jobs': int(row['jobs'])
            }
            for _, row in job_stats.iterrows()
        ]

hierarchicalData = {
    'regions': sorted(regions, key=lambda x: x['totalJobs'], reverse=True),
    'ai_comparison': ai_comparison
}

print(f"✅ Jerárquico: {len(regions)} regiones, {sum(len(r['countries']) for r in regions)} países")

# ═══════════════════════════════════════════════════════════════════
# 6. EXTRAER DATOS DE RED (MEJORADO)
# ═══════════════════════════════════════════════════════════════════

print("\n🔄 Extrayendo datos de red mejorados...")

# Usar columnas disponibles para la red
if 'employee_residence' not in df.columns:
    df['employee_residence'] = df['employee_country_name']
if 'company_location' not in df.columns:
    df['company_location'] = df['company_country_name']

# 6.1 Red de employee_residence -> company_location (con datos balanceados)
network_df = df[['employee_residence', 'company_location', 'salary_in_usd']].copy()
network_df = network_df[
    (network_df['employee_residence'].notna()) &
    (network_df['company_location'].notna())
]

# Filtrar conexiones entre países diferentes
network_df = network_df[network_df['employee_residence'] != network_df['company_location']]

# Calcular estadísticas de nodos
node_stats = {}
all_countries = pd.concat([
    df['employee_residence'].dropna(),
    df['company_location'].dropna()
]).unique()

for country in all_countries:
    out_degree = len(network_df[network_df['employee_residence'] == country])
    in_degree = len(network_df[network_df['company_location'] == country])
    total_jobs = len(df[
        (df['employee_residence'] == country) | 
        (df['company_location'] == country)
    ])
    
    if total_jobs >= 5:  # Mínimo 5 trabajos (ajustado por balanceo)
        node_stats[country] = {
            'out_degree': out_degree,
            'in_degree': in_degree,
            'degree': out_degree + in_degree,
            'jobs': total_jobs,
            'avg_salary': float(df[
                (df['employee_residence'] == country) | 
                (df['company_location'] == country)
            ]['salary_in_usd'].mean())
        }

# Top nodos por jobs
top_nodes = sorted(node_stats.items(), key=lambda x: x[1]['jobs'], reverse=True)[:25]

# Crear nodos
nodes = []
for i, (country, stats) in enumerate(top_nodes):
    iso_code = ISO3_MAPPING.get(country, country[:3].upper())
    region = REGION_MAPPING.get(country, 'Other')
    
    # Asignar grupo basado en región
    region_groups = {'North America': 1, 'Europe': 2, 'Asia Pacific': 3, 'South America': 4}
    group = region_groups.get(region, (i % 4) + 1)
    
    nodes.append({
        'id': str(iso_code),
        'name': str(country),
        'jobs': int(stats['jobs']),
        'degree': int(stats['degree']),
        'in_degree': int(stats['in_degree']),
        'out_degree': int(stats['out_degree']),
        'avg_salary': round(stats['avg_salary'], 2),
        'region': region,
        'group': group
    })

node_ids = {node['id'] for node in nodes}
node_names = {node['name'] for node in nodes}

# 6.2 Crear enlaces
links_agg = network_df[
    network_df['employee_residence'].isin(node_names) &
    network_df['company_location'].isin(node_names)
].groupby(['employee_residence', 'company_location']).agg({
    'salary_in_usd': ['mean', 'count']
}).reset_index()
links_agg.columns = ['source', 'target', 'salary', 'value']

# Mapear a ISO3 y filtrar
links = []
name_to_id = {node['name']: node['id'] for node in nodes}

for _, row in links_agg.iterrows():
    if row['value'] >= 2:  # Mínimo 2 conexiones (ajustado por balanceo)
        source_id = name_to_id.get(row['source'])
        target_id = name_to_id.get(row['target'])
        
        if source_id and target_id and source_id != target_id:
            links.append({
                'source': str(source_id),
                'target': str(target_id),
                'value': int(row['value']),
                'salary': round(float(row['salary']), 2)
            })

# 6.3 Estadísticas de red
statsData = {
    'num_nodes': len(nodes),
    'num_edges': len(links),
    'avg_degree': round(float(np.mean([n['degree'] for n in nodes])), 2) if nodes else 0,
    'density': round(len(links) / (len(nodes) * (len(nodes) - 1)), 4) if len(nodes) > 1 else 0,
    'num_communities': len(set(n['group'] for n in nodes)),
    'avg_salary': round(float(np.mean([n['avg_salary'] for n in nodes])), 2) if nodes else 0
}

# 6.4 Top influencers
topInfluencers = sorted(nodes, key=lambda x: x['degree'], reverse=True)[:10]

# 6.5 Distribución de grados
degree_counts = {}
for node in nodes:
    degree = node['degree']
    degree_counts[degree] = degree_counts.get(degree, 0) + 1

degreeDistribution = sorted(
    [{'degree': int(k), 'count': int(v)} for k, v in degree_counts.items()],
    key=lambda x: x['degree']
)

# 6.6 Comunidades
communities = {}
for node in nodes:
    group = node['group']
    if group not in communities:
        communities[group] = []
    communities[group].append(node)

communityData = []
for group, members in sorted(communities.items()):
    communityData.append({
        'group': int(group),
        'size': len(members),
        'totalJobs': sum(m['jobs'] for m in members),
        'avgDegree': round(float(np.mean([m['degree'] for m in members])), 2),
        'avgSalary': round(float(np.mean([m['avg_salary'] for m in members])), 2),
        'region': members[0]['region'] if members else 'Unknown',
        'members': [m['id'] for m in members]
    })

print(f"✅ Red: {len(nodes)} nodos, {len(links)} enlaces, {len(communityData)} comunidades")

# ═══════════════════════════════════════════════════════════════════
# 7. CREAR JSON COMBINADO MEJORADO
# ═══════════════════════════════════════════════════════════════════

print("\n🔄 Generando JSON combinado mejorado...")

combined_data = {
    'spatiotemporal': {
        'globalSalaryData': globalSalaryData,
        'departmentData': departmentData,
        'worldMapData': worldMapData,
        'aiComparison': ai_comparison
    },
    'hierarchical': {
        'regions': hierarchicalData['regions'],
        'topJobsByRegion': topJobsByRegion,
        'aiComparison': hierarchicalData['ai_comparison']
    },
    'network': {
        'network': {
            'nodes': nodes,
            'links': links
        },
        'stats': statsData,
        'topInfluencers': topInfluencers,
        'degreeDistribution': degreeDistribution,
        'communities': communityData
    },
    'metadata': {
        'generated_at': datetime.now().isoformat(),
        'total_records': len(df),
        'date_range': f"{int(df['work_year'].min())}-{int(df['work_year'].max())}",
        'countries_analyzed': df['employee_country_name'].nunique(),
        'departments_analyzed': df['department'].nunique(),
        'is_balanced': True,
        'balance_notes': f"Dominant country ({dominant_country}) sampled to {target_sample_size:,} records",
        'version': '2.0.0-corrected'
    }
}

# ═══════════════════════════════════════════════════════════════════
# 8. GUARDAR ARCHIVO JSON ÚNICO
# ═══════════════════════════════════════════════════════════════════

print("\n💾 Guardando archivo JSON único...")

output_file = OUTPUT_DIR / 'tech_salary_analytics.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(combined_data, f, indent=2, ensure_ascii=False)

print(f"✅ Guardado: {output_file}")
print(f"   Tamaño: {output_file.stat().st_size / 1024:.2f} KB")

# ═══════════════════════════════════════════════════════════════════
# 9. RESUMEN FINAL MEJORADO
# ═══════════════════════════════════════════════════════════════════

print("\n" + "="*70)
print("🎉 EXTRACCIÓN COMPLETADA EXITOSAMENTE - CORREGIDA")
print("="*70)
print(f"\n📁 Archivo guardado en: {output_file}")

print(f"\n📊 RESUMEN DE DATOS EXTRAÍDOS (CON BALANCEO):")
print(f"   • Spatiotemporal:")
print(f"     - {len(globalSalaryData)} años de datos salariales")
print(f"     - {len(departmentData)} departamentos con crecimiento Pre/Post-IA")
print(f"     - {len(worldMapData['countries'])} países principales")
print(f"     - Crecimiento Post-IA: {ai_comparison['growth_pct']}%")

print(f"   • Hierarchical:")
print(f"     - {len(hierarchicalData['regions'])} regiones analizadas")
print(f"     - {sum(len(r['countries']) for r in hierarchicalData['regions'])} países totales")
print(f"     - Todos con métricas Pre/Post-IA")

print(f"   • Network:")
print(f"     - {len(nodes)} nodos (países)")
print(f"     - {len(links)} enlaces (conexiones)")
print(f"     - {len(communityData)} comunidades detectadas")
print(f"     - Grado promedio: {statsData['avg_degree']}")

print(f"\n⚖️ BALANCEO APLICADO:")
print(f"   - País dominante ({dominant_country}) reducido a {target_sample_size:,} registros")
print(f"   - Total dataset balanceado: {len(df):,} registros")

print(f"\n🔍 ANÁLISIS PRE/POST-IA INCLUIDO:")
print(f"   - Pre-IA: ${ai_comparison['pre_ia']['mean_salary']:,.2f} ({ai_comparison['pre_ia']['job_count']:,} jobs)")
print(f"   - Post-IA: ${ai_comparison['post_ia']['mean_salary']:,.2f} ({ai_comparison['post_ia']['job_count']:,} jobs)")
print(f"   - Crecimiento: {ai_comparison['growth_pct']}%")

print(f"\n🌐 Acceso desde Flask:")
print(f"   /static/Portfolio/js/checkpoint3/tech_salary_analytics.json")
print("\n" + "="*70)