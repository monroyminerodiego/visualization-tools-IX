import traceback, logging, os
from flask import Flask, render_template, send_from_directory
from dotenv import load_dotenv
from jinja2 import ChoiceLoader, FileSystemLoader, PrefixLoader

# =============== Configs ===============
load_dotenv()

# Crear la app de Flask
app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

# Configurar múltiples carpetas de templates con prefijos
app.jinja_loader = PrefixLoader({
    'main': FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')),
    'unidad1': FileSystemLoader(os.path.join(os.path.dirname(__file__), 'Unidad_1', 'templates')),
    'unidad2': FileSystemLoader(os.path.join(os.path.dirname(__file__), 'Unidad_2', 'templates')),
})

# Verificar que las carpetas existen
template_folders = {
    'main': os.path.join(os.path.dirname(__file__), 'templates'),
    'unidad1': os.path.join(os.path.dirname(__file__), 'Unidad_1', 'templates'),
    'unidad2': os.path.join(os.path.dirname(__file__), 'Unidad_2', 'templates'),
}

print("\n🔍 Verificando carpetas de templates:")
for name, folder in template_folders.items():
    exists = os.path.exists(folder)
    status = "✅" if exists else "❌"
    print(f"{status} [{name}] {folder}")
    if exists:
        try:
            for root, dirs, files in os.walk(folder):
                level = root.replace(folder, '').count(os.sep)
                indent = ' ' * 2 * level
                print(f"{indent}{os.path.basename(root)}/")
                sub_indent = ' ' * 2 * (level + 1)
                for file in files:
                    print(f"{sub_indent}{file}")
        except Exception as e:
            print(f"   Error listando archivos: {e}")

# Leer endpoints de API desde variables de entorno
API_ENDPOINT_UNIT1 = os.getenv('API_ENDPOINT_UNIT1', 'https://upy-homeworks.xpert-ia.com.mx/visualization-tools/api/unit-1/project')
API_ENDPOINT_UNIT2 = os.getenv('API_ENDPOINT_UNIT2', 'https://upy-homeworks.xpert-ia.com.mx/visualization-tools/api/unit-2/project')

# =============== Rutas para archivos estáticos de cada unidad ===============
@app.route('/unidad1/proyecto/<path:filename>')
def unidad1_proyecto_static(filename):
    """Servir archivos estáticos de Unidad 1 - Proyecto"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_1', 'static', 'Project')
    return send_from_directory(static_dir, filename)

@app.route('/unidad1/portafolio/<path:filename>')
def unidad1_portafolio_static(filename):
    """Servir archivos estáticos de Unidad 1 - Portfolio"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_1', 'static', 'Portfolio')
    return send_from_directory(static_dir, filename)

@app.route('/unidad2/proyecto/<path:filename>')
def unidad2_proyecto_static(filename):
    """Servir archivos estáticos de Unidad 2 - Proyecto"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_2', 'static', 'Project')
    return send_from_directory(static_dir, filename)

@app.route('/unidad2/portafolio/<path:filename>')
def unidad2_portafolio_static(filename):
    """Servir archivos estáticos de Unidad 2 - Portfolio"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_2', 'static', 'Portfolio')
    return send_from_directory(static_dir, filename)

# =============== RUTAS PARA ARCHIVOS ESTÁTICOS DE CHECKPOINTS ===============
@app.route('/unidad2/portafolio/checkpoint1/<path:filename>')
def unidad2_portafolio_checkpoint1_static(filename):
    """Servir archivos estáticos de Checkpoint 1 - Unidad 2"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_2', 'static', 'Portfolio', 'checkpoint1')
    return send_from_directory(static_dir, filename)

@app.route('/unidad2/portafolio/checkpoint2/<path:filename>')
def unidad2_portafolio_checkpoint2_static(filename):
    """Servir archivos estáticos de Checkpoint 2 - Unidad 2"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_2', 'static', 'Portfolio', 'checkpoint2')
    return send_from_directory(static_dir, filename)

@app.route('/unidad2/portafolio/checkpoint3/<path:filename>')
def unidad2_portafolio_checkpoint3_static(filename):
    """Servir archivos estáticos de Checkpoint 3 - Unidad 2"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_2', 'static', 'Portfolio', 'checkpoint3')
    return send_from_directory(static_dir, filename)

# =============== Rutas de páginas ===============
# ===== Home =====
@app.route('/')
def home():
    try:
        return render_template('main/index.html')
    except Exception as e:
        error = traceback.format_exc()
        app.logger.error(f"Error cargando la página principal: {e}")
        return f"Ocurrió un error al cargar la página principal: <pre>{error}</pre>", 500

# ===== Proyectos =====
@app.route('/project/unit1')
def project_unit1():
    try:
        return render_template('unidad1/Project/main.html', api_endpoint=API_ENDPOINT_UNIT1)
    except Exception as e:
        error = traceback.format_exc()
        app.logger.error(f"Error cargando proyecto unidad 1: {e}")
        return f"Ocurrió un error al cargar el proyecto de la unidad 1: <pre>{error}</pre>", 500

@app.route('/project/unit2')
def project_unit2():
    try:
        return render_template('unidad2/Project/main.html', api_endpoint=API_ENDPOINT_UNIT2)
    except Exception as e:
        error = traceback.format_exc()
        app.logger.error(f"Error cargando proyecto unidad 2: {e}")
        return f"Ocurrió un error al cargar el proyecto de la unidad 2: <pre>{error}</pre>", 500

# ===== Portafolios =====
@app.route('/portfolio/unit1')
def portfolio_unit1():
    try:
        return render_template('unidad1/Portfolio/main.html', api_endpoint=API_ENDPOINT_UNIT1)
    except Exception as e:
        error = traceback.format_exc()
        app.logger.error(f"Error cargando portafolio unidad 1: {e}")
        return f"Ocurrió un error al cargar el portafolio de la unidad 1: <pre>{error}</pre>", 500

@app.route('/portfolio/unit2')
def portfolio_unit2():
    try:
        return render_template('unidad2/Portfolio/main.html', api_endpoint=API_ENDPOINT_UNIT2)
    except Exception as e:
        error = traceback.format_exc()
        app.logger.error(f"Error cargando portafolio unidad 2: {e}")
        return f"Ocurrió un error al cargar el portafolio de la unidad 2: <pre>{error}</pre>", 500

# ===== Checkpoints Unit 2 =====
@app.route('/portfolio/unit2/checkpoint1')
def checkpoint1_unit2():
    try:
        return render_template('unidad2/Portfolio/checkpoint1/main.html', api_endpoint=API_ENDPOINT_UNIT2)
    except Exception as e:
        error = traceback.format_exc()
        app.logger.error(f"Error cargando checkpoint 1 unidad 2: {e}")
        return f"Ocurrió un error al cargar el checkpoint 1 de la unidad 2: <pre>{error}</pre>", 500

@app.route('/portfolio/unit2/checkpoint2')
def checkpoint2_unit2():
    try:
        return render_template('unidad2/Portfolio/checkpoint2/main.html', api_endpoint=API_ENDPOINT_UNIT2)
    except Exception as e:
        error = traceback.format_exc()
        app.logger.error(f"Error cargando checkpoint 2 unidad 2: {e}")
        return f"Ocurrió un error al cargar el checkpoint 2 de la unidad 2: <pre>{error}</pre>", 500

@app.route('/portfolio/unit2/checkpoint3')
def checkpoint3_unit2():
    try:
        return render_template('unidad2/Portfolio/checkpoint3/main.html', api_endpoint=API_ENDPOINT_UNIT2)
    except Exception as e:
        error = traceback.format_exc()
        app.logger.error(f"Error cargando checkpoint 3 unidad 2: {e}")
        return f"Ocurrió un error al cargar el checkpoint 3 de la unidad 2: <pre>{error}</pre>", 500

# =============== RUTAS PARA CHECKPOINT1 ===============
@app.route('/static/Portfolio/css/checkpoint1/<path:filename>')
def checkpoint1_css(filename):
    """Servir CSS de Checkpoint 1"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_2', 'static', 'Portfolio', 'css', 'checkpoint1')
    return send_from_directory(static_dir, filename)

@app.route('/static/Portfolio/js/checkpoint1/<path:filename>')
def checkpoint1_js(filename):
    """Servir JS de Checkpoint 1"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_2', 'static', 'Portfolio', 'js', 'checkpoint1')
    return send_from_directory(static_dir, filename)

# =============== RUTAS PARA CHECKPOINT2 ===============
@app.route('/static/Portfolio/css/checkpoint2/<path:filename>')
def checkpoint2_css(filename):
    """Servir CSS de Checkpoint 2"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_2', 'static', 'Portfolio', 'css', 'checkpoint2')
    return send_from_directory(static_dir, filename)

@app.route('/static/Portfolio/js/checkpoint2/<path:filename>')
def checkpoint2_js(filename):
    """Servir JS de Checkpoint 2"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_2', 'static', 'Portfolio', 'js', 'checkpoint2')
    return send_from_directory(static_dir, filename)

# =============== RUTAS PARA CHECKPOINT3 ===============
@app.route('/static/Portfolio/css/checkpoint3/<path:filename>')
def checkpoint3_css(filename):
    """Servir CSS de Checkpoint 3"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_2', 'static', 'Portfolio', 'css', 'checkpoint3')
    return send_from_directory(static_dir, filename)

@app.route('/static/Portfolio/js/checkpoint3/<path:filename>')
def checkpoint3_js(filename):
    """Servir JS de Checkpoint 3"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_2', 'static', 'Portfolio', 'js', 'checkpoint3')
    return send_from_directory(static_dir, filename)


# Ejecutar la aplicación solo si este archivo se ejecuta directamente
if __name__ == '__main__':
    print("\n=== FLASK INICIADO CORRECTAMENTE ===")
    print("Accede a estas URLs en tu navegador:")
    print("• Página principal: http://127.0.0.1:502/")
    print("• Proyecto Unidad 1: http://127.0.0.1:502/project/unit1")
    print("• Portafolio Unidad 1: http://127.0.0.1:502/portfolio/unit1")
    print("• Proyecto Unidad 2: http://127.0.0.1:502/project/unit2")
    print("• Portafolio Unidad 2: http://127.0.0.1:502/portfolio/unit2")
    print("• Checkpoint 1 Unidad 2: http://127.0.0.1:502/portfolio/unit2/checkpoint1")
    print("• Checkpoint 2 Unidad 2: http://127.0.0.1:502/portfolio/unit2/checkpoint2")
    print("• Checkpoint 3 Unidad 2: http://127.0.0.1:502/portfolio/unit2/checkpoint3")
    print(f"• API Endpoint Unit 1: {API_ENDPOINT_UNIT1}")
    print(f"• API Endpoint Unit 2: {API_ENDPOINT_UNIT2}")
    print("\n📁 Rutas estáticas configuradas:")
    print("  • /unidad1/proyecto/")
    print("  • /unidad1/portafolio/")
    print("  • /unidad2/proyecto/")
    print("  • /unidad2/portafolio/")
    print("  • /unidad2/portafolio/checkpoint1/")
    print("  • /unidad2/portafolio/checkpoint2/")
    print("  • /unidad2/portafolio/checkpoint3/")
    print("====================================\n")
    app.run(debug=True, host='127.0.0.1', port=502)