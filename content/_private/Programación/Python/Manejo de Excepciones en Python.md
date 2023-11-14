# **Manejo de Excepciones en [[Python]]**

En este tema, exploraremos el manejo de excepciones en Python, una técnica fundamental para controlar y gestionar situaciones inesperadas o errores en tus programas.

**1. ¿Qué es una Excepción?:**
   - Una excepción es un evento que ocurre durante la ejecución de un programa y que interrumpe el flujo normal de las operaciones.
   - Las excepciones pueden deberse a diversos motivos, como errores de sintaxis, divisiones por cero, acceso a archivos inexistentes, entre otros.

**2. Bloques `try`, `except`, `finally`:**
   - En Python, puedes manejar excepciones utilizando bloques `try`, `except` y, opcionalmente, `finally`.
   - El bloque `try` se utiliza para rodear el código que podría lanzar una excepción.
   - El bloque `except` se utiliza para manejar la excepción si se produce.
   - El bloque `finally` se utiliza para ejecutar código que debe ejecutarse, independientemente de si se lanza una excepción o no.

**3. Captura de Excepciones:**
   - En el bloque `except`, puedes especificar el tipo de excepción que deseas capturar. Por ejemplo:
   
```python
try:
resultado = 10 / 0
except ZeroDivisionError:
print("¡División por cero!")
```

**4. Excepciones Múltiples:**
   - Puedes manejar múltiples tipos de excepciones en un solo bloque `try` usando varias cláusulas `except`.
   - Esto te permite abordar diferentes situaciones de error de manera específica.

**5. Excepciones Genéricas:**
   - Puedes usar `except` sin especificar un tipo de excepción para capturar cualquier excepción no manejada de manera específica. Sin embargo, esto debe hacerse con precaución, ya que puede ocultar problemas inesperados en el código.

**6. Lanzamiento de Excepciones:**
   - Puedes lanzar tus propias excepciones usando la palabra clave `raise`. Esto es útil cuando deseas indicar un error específico en tu código.
   - Ejemplo de lanzamiento de excepción:
   
```python
if x < 0:
 raise ValueError("El valor no puede ser negativo")
```


Continuación: 
[[Programación Orientada a Objetos en Python]]