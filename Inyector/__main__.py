# =============== Librerias comunes ===============
import os, platform, sys
from dotenv import load_dotenv

# =============== Configuraciones comunes ===============
load_dotenv()

if platform.system() == 'Linux':   command = 'clear'
elif platform.system == 'Windows': command = 'cls'
else:                              command = ''

os.system(command)

# =============== UNIDAD 2 ===============
# ===== Proyecto
from Scripts.Project.unit_2 import Proyecto_2_Data

args = sys.argv

if '--local' in args:    tipo_envio = 'local'
elif '--cloud' in args:  tipo_envio = 'cloud'
else: tipo_envio = 'docker'

proyecto_u2 = Proyecto_2_Data(tipo_envio)
proyecto_u2.inyectar_información()