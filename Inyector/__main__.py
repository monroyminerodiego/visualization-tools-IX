# =============== Librerias comunes ===============
import os, platform
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

proyecto_u2 = Proyecto_2_Data()
proyecto_u2.inyectar_información()