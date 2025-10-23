import os, traceback, pandas as pd, requests
from typing import Literal

class Proyecto_2_Data:
    # =============== CONSTRUCTOR ===============
    def __init__(self,tipo_envio:Literal['local','cloud'] = 'local'):
        self.location_path = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        if tipo_envio == 'local':   self.link = 'http://api_visualization:503'
        elif tipo_envio == 'cloud': self.link = 'https://upy-homeworks.xpert-ia.com.mx/visualization-tools/'

    # =============== METODOS PRIVADOS ===============
    def __cargar_datos(self,):
        jobs_path = os.path.join(self.location_path,'Files','Data','Project','U2','jobs.csv')
        jobs_df = pd.read_csv(jobs_path)

        locations_path = os.path.join(self.location_path,'Files','Data','Project','U2','locations.csv')
        locations_df = pd.read_csv(locations_path)

        return jobs_df, locations_df

    def __subir_df(self,dataframe: pd.DataFrame, table: str, batch_size: int = 250):
        """
        Sube un DataFrame a la base de datos en lotes.
        
        Args:
            dataframe: DataFrame a subir
            table: Nombre de la tabla destino
            batch_size: Tamaño de cada lote (default: 250)
        
        Returns:
            dict: Resumen de la operación con éxitos y errores
        """
        total_filas = len(dataframe)
        total_lotes = (total_filas + batch_size - 1) // batch_size  # Redondeo hacia arriba
        
        resultados = {
            'total_filas': total_filas,
            'total_lotes': total_lotes,
            'exitosos': 0,
            'fallidos': 0,
            'errores': []
        }
        
        print(f"📊 Iniciando carga de {total_filas:,} registros en {total_lotes} lotes de {batch_size}")
        print("=" * 70)
        
        for i in range(0, total_filas, batch_size):
            lote_num = (i // batch_size) + 1
            batch = dataframe.iloc[i:i + batch_size]
            registros_en_lote = len(batch)
            
            try:
                response = requests.post(
                    url=f'{self.link}/api/postgres',
                    json={
                        "table": table,
                        "data": batch.to_dict(orient='records')
                    },
                    headers={"Content-Type": "application/json; charset=utf-8"},
                    timeout=60  # Timeout de 60 segundos
                )
                response.raise_for_status()
                
                resultados['exitosos'] += registros_en_lote
                                
            except Exception as e:
                resultados['fallidos'] += registros_en_lote
                error_msg = f"Lote {lote_num}: {str(e)[:100]}"
                resultados['errores'].append(error_msg)
        
        # Resumen final
        print("=" * 70)
        print(f"🏁 Carga completada:")
        print(f"   ✅ Registros exitosos: {resultados['exitosos']:,}/{total_filas:,}")
        print(f"   ❌ Registros fallidos: {resultados['fallidos']:,}/{total_filas:,}")
        print(f"   📈 Tasa de éxito: {(resultados['exitosos']/total_filas)*100:.1f}%")
        
        if resultados['errores']:
            print(f"\n⚠️  Se encontraron {len(resultados['errores'])} errores:")
            for error in resultados['errores'][:5]:  # Mostrar máximo 5 errores
                print(f"   - {error}")
            if len(resultados['errores']) > 5:
                print(f"   ... y {len(resultados['errores']) - 5} errores más")
        
        return resultados
    
    def __validar_funcionamiento_api(self):
        ''' 
        '''
        response = requests.get(
            url=f'{self.link}/api/info',
            headers={"Content-Type": "application/json; charset=utf-8"},
        )
        response.raise_for_status()
        response = response.json()
        if response['status'] != 'healthy': raise Exception(f'Quien sabe watefok con la API: {response}')
        else: print('✅ API Funcionando correctamente')
    
    # ===== Procesamiento de datos
    def __categorize_job(self,title):
        """
        Asigna una categoría a un título de trabajo buscando palabras clave.
        """
        categories = {
            'Application Security & DevSecOps': [
                'application security', 'appsec', 'devsecops', 'secdevops', 'penetration test', 
                'pentester', 'vulnerability assessment', 'offensive security', 'ethical hacker', 
                'exploit developer', 'security developer', 'dev security operations'
            ],
            
            'Security Operations (SOC)': [
                'soc', 'securit operations', 'incident response', 'incident handler', 'threat hunt', 
                'siem', 'secops', 'splunk', 'detection engineer', 'cyber defense', 'red team',
                'cyber incident responder', 'cyber network defense', 'cyber operations analyst',
                'cyber operations specialist', 'detection & response', 'detection and response',
                'incident responder', 'intrusion analyst', 'security operation engineer',
                'security operations analyst', 'security operations center', 'security operations engineer',
                'security operations expert', 'security operations specialist', 'security operator',
                'soar engineer'
            ],
            
            'Threat Intelligence & Forensics': [
                'threat intelligence', 'malware', 'reverse engineer', 'forensic', 'threat analyst', 
                'osint', 'exploitation analyst', 'biothreats', 'cyber intelligence analyst',
                'cyberspace intelligence', 'insider threat', 'intelligence analyst',
                'target digital network', 'technical targeting', 'threat researcher', 'threat specialist'
            ],
            
            'Governance, Risk & Compliance (GRC)': [
                'grc', 'compliance', 'risk', 'audit', 'privacy', 'assurance', 'isso', 'issm',
                'cyber a&a', 'security control assessor', 'security controls assessor'
            ],
            
            'Security Engineering & Architecture': [
                'security engineer', 'security architect', 'cloud security', 'network security', 
                'iam', 'identity', 'pki', 'infrastructure security', 'cryptography', 'endpoint', 
                'firewall', 'attack surface analyst', 'cloud cyber security', 

                'cybersecurity',

                'cryptologic computer scientist','cyber architect', 'cyber engineer', 
                'cyber security administrator', 'cyber security analyst','cyber security expert', 
                'cyber security project engineer', 'cyber security specialist',
                'cyber security technologist', 'cyber systems engineer', 'cyberark engineer',
                'global information security', 'information security administrator', 'information security analyst',
                'information security specialist', 'infosec engineer', 'it security analyst',
                'it security expert', 'it security professional', 'it security specialist',
                'security administrator', 'security analyst', 'security automation engineer',
                'security expert', 'security research engineer', 'security researcher',
                'security solution architect', 'security solutions architect', 'security specialist',
                'security technical specialist', 'zero trust architect'
            ],
            
            'Management & Leadership': [
                'manager', 'director', 'lead', 'head of', 'ciso', 'officer', 'principal',
                'product owner'
            ],
            
            'Data & AI Security': [
                'data security', 'data scientist', 'machine learning', 'ai security', 'data engineer',
                'data analyst', 'data architect'
            ],
            
            'Sales, Consulting & Support': [
                'sales', 'consultant', 'customer success', 'account manager', 'support', 
                'professional services', 'advisor', 'account executive'
            ],
            
            'General IT & DevOps': [
                'system admin', 'network admin', 'database', 'devops', 'platform engineer', 
                'site reliability', 'it support', 'help desk', 'system engineer',
                'automation engineer', 'cloud architect', 'cloud engineer', 'computer operator',
                'infrastructure engineer', 'it specialist', 'mainframe business specialist',
                'network analyst', 'network architect', 'network engineer', 'resident engineer',
                'servicenow developer', 'systems administrator', 'systems analyst',
                'systems engineer', 'systems integration engineer', 'systems management',
                'systems specialist'
            ],
            
            'Software Development': [
                'software developer', 'software engineer', 'backend engineer', 'full stack', 
                'application developer', 'software architect', 'software development engineer',
                'solution architect', 'solutions architect', 'solutions engineer'
            ],
            
            'Cyber Warfare & Military Operations': [
                'cryptologic cyber planner', 'cyber mission specialist', 'electronic warfare engineer',
                'electronic warfare operator'
            ],
            
            'Training & Education': [
                'cyber content development trainer', 'cyber security training specialist',
                'technical trainer'
            ],
            
            'Specialized Infrastructure & Testing': [
                'cyber range engineer', 'enterprise architect', 'qa engineer', 'systems architect',
                'technical architect', 'test engineer'
            ],
            
            'Vulnerability Management': [
                'vulnerability analyst', 'vulnerability engineer', 'vulnerability management analyst',
                'vulnerability management engineer', 'vulnerability management specialist',
                'vulnerability researcher'
            ],
            
            'Administrative & Support': [
                'analyst', 'business analyst', 'security administrative assistant', 'technical writer'
            ]
        }
        title_lower = title.lower()
        for category, keywords in categories.items():
            for keyword in keywords:
            
                if keyword in title_lower:
                    return category
        return 'Uncategorized' # Si no encuentra ninguna coincidencia
    
    def __subcategorize_job(self,title):
        ''' 
        '''
        sub_categories = {
            'Application Security': [
                'application security', 'appsec', 'security developer'
            ],
            'DevSecOps': [
                'devsecops', 'secdevops', 'dev security operations'
            ],
            'Penetration Testing & Offensive Security': [
                'penetration test', 'pentester', 'vulnerability assessment', 'offensive security', 
                'ethical hacker', 'exploit developer', 'red team'
            ],
            'SOC Operations & Monitoring': [
                'soc', 'securit operations', 'secops', 'siem', 'splunk', 'soar engineer', 
                'security operation engineer', 'security operations analyst', 'security operations center', 
                'security operations engineer', 'security operations expert', 'security operations specialist', 
                'security operator'
            ],
            'Incident Response': [
                'incident response', 'incident handler', 'cyber incident responder', 'incident responder',
                'intrusion analyst'
            ],
            'Threat Hunting & Detection': [
                'threat hunt', 'detection engineer', 'cyber defense', 'detection & response', 
                'detection and response'
            ],
            'Cyber Operations': [
                'cyber network defense', 'cyber operations analyst', 'cyber operations specialist'
            ],
            'Threat Intelligence': [
                'threat intelligence', 'threat analyst', 'osint', 'cyber intelligence analyst', 
                'cyberspace intelligence', 'insider threat', 'intelligence analyst', 'threat researcher', 
                'threat specialist'
            ],
            'Malware Analysis & Forensics': [
                'malware', 'reverse engineer', 'forensic', 'exploitation analyst'
            ],
            'Military Intelligence': [
                'biothreats', 'target digital network', 'technical targeting'
            ],
            'Risk & Compliance': [
                'grc', 'compliance', 'risk', 'privacy'
            ],
            'Audit & Assurance': [
                'audit', 'assurance', 'isso', 'issm', 'cyber a&a', 'security control assessor', 
                'security controls assessor'
            ],
            'Cloud & Network Security': [
                'cloud security', 'network security', 'firewall', 'attack surface analyst', 
                'cloud cyber security', 'zero trust architect'
            ],
            'Identity & Access Management (IAM)': [
                'iam', 'identity', 'pki', 'cyberark engineer'
            ],
            'Security Engineering': [
                'security engineer', 'infrastructure security', 'cryptography', 'endpoint', 
                'cryptologic computer scientist', 'cyber engineer', 'cyber systems engineer', 
                'infosec engineer'
            ],
            'Security Architecture': [
                'security architect', 'cyber architect', 'security solution architect', 
                'security solutions architect'
            ],
            'General Security Analysis & Administration': [
                'cybersecurity', 'cyber security administrator', 'cyber security analyst', 
                'cyber security expert', 'cyber security project engineer', 'cyber security specialist', 
                'cyber security technologist', 'global information security', 'information security administrator', 
                'information security analyst', 'information security specialist', 'it security analyst', 
                'it security expert', 'it security professional', 'it security specialist', 
                'security administrator', 'security analyst', 'security automation engineer', 'security expert', 
                'security research engineer', 'security researcher', 'security specialist', 
                'security technical specialist'
            ],
            'Executive Leadership': [
                'director', 'head of', 'ciso', 'officer'
            ],
            'Management & Team Leadership': [
                'manager', 'lead', 'principal', 'product owner'
            ],
            'Data Science & Analytics': [
                'data scientist', 'data analyst'
            ],
            'Data Engineering & Architecture': [
                'data engineer', 'data architect'
            ],
            'AI/ML & Data Security': [
                'data security', 'machine learning', 'ai security'
            ],
            'Sales & Account Management': [
                'sales', 'account manager', 'account executive'
            ],
            'Consulting & Support': [
                'consultant', 'customer success', 'support', 'professional services', 'advisor'
            ],
            'Systems & Network Administration': [
                'system admin', 'network admin', 'database', 'it support', 'help desk', 
                'system engineer', 'computer operator', 'it specialist', 'mainframe business specialist', 
                'network analyst', 'systems administrator', 'systems analyst', 'systems management', 
                'systems specialist', 'systems engineer'
            ],
            'DevOps & Infrastructure': [
                'devops', 'platform engineer', 'site reliability', 'automation engineer', 
                'cloud architect', 'cloud engineer', 'infrastructure engineer', 'network architect', 
                'network engineer', 'resident engineer', 'systems integration engineer'
            ],
            'Software Engineering': [
                'software developer', 'software engineer', 'backend engineer', 'full stack', 
                'application developer', 'software development engineer', 'servicenow developer'
            ],
            'Solution Architecture': [
                'software architect', 'solution architect', 'solutions architect', 'solutions engineer'
            ],
            'Military & Cyber Warfare': [
                'cryptologic cyber planner', 'cyber mission specialist', 'electronic warfare engineer', 
                'electronic warfare operator'
            ],
            'Technical Training & Education': [
                'cyber content development trainer', 'cyber security training specialist', 
                'technical trainer'
            ],
            'QA & Testing': [
                'qa engineer', 'test engineer'
            ],
            'Enterprise & Systems Architecture': [
                'cyber range engineer', 'enterprise architect', 'systems architect', 
                'technical architect'
            ],
            'Vulnerability Management': [
                'vulnerability analyst', 'vulnerability engineer', 'vulnerability management analyst', 
                'vulnerability management engineer', 'vulnerability management specialist', 
                'vulnerability researcher'
            ],
            'Business Analysis & Support': [
                'analyst', 'business analyst', 'security administrative assistant', 'technical writer'
            ]
        }
        title_lower = title.lower()
        for category, keywords in sub_categories.items():
            for keyword in keywords:
                if keyword in title_lower:
                    return category
        return 'Uncategorized' # Si no encuentra ninguna coincidencia
    
    def __departament_job(self,title):
        departments = {
            'Executive & Leadership': [
                'ceo', 'cfo', 'chief executive officer', 'chief financial officer',
                'chief information officer', 'chief information security officer', 'ciso', 'coo', 'cpo',
                'cto', 'director', 'founder', 'head of', 'lead', 'lead analyst',
                'manager', 'president', 'principal', 'product security lead',
                'security lead', 'security manager', 'software team leader', 'technical lead', 'vp',
                'vice president'
            ],
            
            'Engineering & Development': [
                'architect', 'automation engineer', 'backend', 'cryptography engineer',
                'database engineer', 'developer', 'devops', 'devsecops engineer',
                'engineering manager', 'frontend', 'full stack', 'pki engineer',
                'principal engineer', 'qa engineer', 'resident engineer', 'sre', 'site reliability',
                'software developer', 'software development engineer', 'software engineer',
                'software reverse engineer', 'solutions engineer', 'systems integration engineer',
                'test engineer', 'product support engineer'
            ],
            
            'Information Technology (IT)': [
                'cloud engineer', 'computer operator', 'database administrator', 'dba',
                'firewall administrator', 'firewall engineer', 'help desk',
                'infrastructure engineer', 'it manager', 'it specialist', 'it support',
                'mainframe business specialist', 'network admin', 'network administrator',
                'network analyst', 'network computer support technician', 'network engineer',
                'platform engineer', 'splunk administrator', 'splunk engineer',
                'sysadmin', 'system administrator', 'systems analyst', 'systems engineer',
                'systems management', 'systems specialist', 'user support technician',
                'technical support engineer', 'system engineer', 'systems administrator'
            ],
            
            'Cybersecurity': [
                'appsec', 'application security', 'attack surface analyst',
                'biothreats technical targeter', 'cloud security', 'compliance',
                'cryptologic computer scientist', 'cryptologic cyber planner',
                'cyber a&a engineer', 'cyber analyst', 'cyber defense',
                'cyber engineer', 'cyber incident responder', 'cyber intelligence analyst',
                'cyber mission specialist', 'cyber network defense', 'cyber operations',
                'cyber range engineer', 'cyber risk', 'cyber security',
                'cyberspace intelligence analyst', 'cyberark engineer', 'detection engineer',
                'detection and response', 'dev security operations', 'devsecops',
                'digital forensic analyst', 'digital network exploitation analyst',
                'endpoint engineer', 'ethical hacker', 'exploitation analyst',
                'grc', 'iam administrator', 'iam analyst', 'iam engineer', 'iam lead',
                'iam specialist', 'identity engineer', 'incident handler',
                'incident responder', 'incident response', 'infosec', 'information assurance',
                'information security', 'insider threat', 'intrusion analyst', 'issm',
                'isso', 'malware analyst', 'malware reverse engineer', 'osint analyst',
                'penetration tester', 'pentester', 'pentesing testing engineer',
                'privacy engineer', 'privacy manager', 'product security', 'red team',
                'reverse engineer', 'risk analyst', 'risk manager', 'secops',
                'security administrator', 'security analyst', 'security automation engineer',
                'security controls assessor', 'security engineer', 'security expert',
                'security operations', 'security researcher', 'security specialist',
                'siem engineer', 'soar engineer', 'soc', 'target digital network analyst',
                'technical targeting analyst', 'threat analyst', 'threat hunter',
                'threat hunting', 'threat intelligence', 'threat researcher',
                'threat specialist', 'vulnerability analyst', 'vulnerability engineer',
                'vulnerability management', 'vulnerability researcher',
                'it security professional', 'cybersecurity', 'security control assessor',
                'russian osint specialist', 'cyber support engineer', 'security operator',
                'penetration testing engineer', 'security technical specialist',
                'security operation engineer', 'detection & response engineer',
                'security research engineer', 'security administrative assistant'
            ],
            
            'Product Management': [
                'chief product officer', 'head of product', 'product analyst',
                'product manager', 'product owner'
            ],
            
            'Data & Analytics': [
                'analytics manager', 'bi developer', 'business intelligence',
                'data analyst', 'data engineer', 'data scientist',
                'machine learning engineer', 'ml engineer'
            ],
            
            'Sales & Consulting': [
                'account executive', 'account manager', 'business development representative',
                'bdr', 'client services', 'consultant', 'customer success',
                'enterprise sales representative', 'implementation specialist',
                'professional services', 'regional manager', 'sales director',
                'sales engineer', 'sales executive', 'sales development representative',
                'sdr', 'security consultant', 'security sales specialist', 'technical consultant',
                'vp of sales'
            ],
            
            'Marketing': [
                'brand manager', 'chief marketing officer', 'cmo', 'content creator',
                'digital marketing', 'marketing manager', 'product marketing',
                'seo specialist', 'social media manager'
            ],
            
            'Human Resources (HR)': [
                'benefits specialist', 'chief human resources officer', 'chro',
                'compensation analyst', 'cyber content development trainer', 'hr generalist',
                'hr business partner', 'hrbp', 'recruiter', 'talent acquisition',
                'technical trainer'
            ],
            
            'Finance & Accounting': [
                'accountant', 'accounts payable', 'accounts receivable', 'auditor',
                'bookkeeper', 'cfo', 'controller', 'financial analyst', 'fp&a'
            ],
            
            'Operations': [
                'analyst', 'bizops', 'business analyst', 'business operations',
                'chief operating officer', 'coo', 'logistics', 'operations manager',
                'program manager', 'project manager', 'supply chain', 'technical writer',
                'electronic warfare engineer', 'electronic warfare operator'
            ],
            
            'Legal & Compliance': [
                'attorney', 'compliance officer', 'general counsel', 'lawyer',
                'legal counsel', 'paralegal', 'privacy officer',
                'staff security contracts manager'
            ]
        }

        title_lower = title.lower()
        for category, keywords in departments.items():
            for keyword in keywords:
                if keyword in title_lower:
                    return category
        return 'Uncategorized' # Si no encuentra ninguna coincidencia
    
    def __merge_jobs_w_locations(self,jobs_df:pd.DataFrame,locations_df:pd.DataFrame):
        jobs_df = jobs_df.merge(
            locations_df,
            left_on='employee_residence',
            right_on='country',
            how='left',
            suffixes=('', '_employee')
        ).drop('country', axis=1).rename(columns={
            'latitude': 'employee_latitude',
            'longitude': 'employee_longitude',
            'name': 'employee_country_name'
        })

        jobs_df = jobs_df.merge(
            locations_df,
            left_on='company_location',
            right_on='country',
            how='left',
            suffixes=('', '_company')
        ).drop('country', axis=1).rename(columns={
            'latitude': 'company_latitude',
            'longitude': 'company_longitude',
            'name': 'company_country_name'
        })

        return jobs_df


    # =============== METODOS HTTP ===============
    def inyectar_información(self):
        '''
        '''
        self.__validar_funcionamiento_api()

        jobs_df, locations_df = self.__cargar_datos()

        jobs_df['category'] = jobs_df['job_title'].apply(self.__categorize_job)

        jobs_df['subcategory'] = jobs_df['job_title'].apply(self.__subcategorize_job)

        jobs_df['department'] = jobs_df['job_title'].apply(self.__departament_job)

        jobs_df.drop('Unnamed: 0',axis=1,inplace=True)

        jobs_df = self.__merge_jobs_w_locations(jobs_df,locations_df)

        self.__subir_df(jobs_df, 'jobs_proyect_u2')
        
        try:
            return {"status":"success","info":"Se subio la data a la base de datos"}, 200
        except:
            return {"status":"error","info":"Fallo el metodo GET","detalles":traceback.format_exc().splitlines()}, 500
        
if __name__ == '__main__':
    data = Proyecto_2_Data('cloud')
    data.inyectar_información()