# **Programación Orientada a Objetos en [[Python]]**

Conceptos teóricos [[Programacion Orientada a Objetos (OOP)]]

La Programación Orientada a Objetos (POO) es un paradigma fundamental en la programación, y Python es un lenguaje que lo implementa de manera integral. En este tema, exploraremos los conceptos clave de la POO en Python.

**1. Conceptos Fundamentales:**
   - La POO se basa en la idea de que los objetos son instancias de clases y que estas clases definen las propiedades y comportamientos de los objetos.
   - Una clase es un plano o plantilla que define la estructura de los objetos, incluyendo sus atributos (variables) y métodos (funciones).

**2. Clases y Objetos:**
   - En Python, puedes definir una clase mediante la palabra clave `class`. A partir de una clase, puedes crear múltiples objetos (instancias) que comparten la misma estructura.
   - Ejemplo de definición de una clase `Persona` y creación de objetos:

```python
class Persona:
 def __init__(self, nombre, edad):
	 self.nombre = nombre
	 self.edad = edad
 
 def saludar(self):
	 print(f"Hola, mi nombre es {self.nombre} y tengo {self.edad} años.")

juan = Persona("Juan", 30)
maria = Persona("Maria", 25)
```

**3. Atributos y Métodos:**
   - Los atributos son variables que almacenan datos relacionados con el objeto. Los métodos son funciones que definen el comportamiento del objeto.
   - En el ejemplo anterior, `nombre` y `edad` son atributos, mientras que `saludar` es un método.

**4. El Constructor `__init__`:**
   - El método `__init__` es un constructor especial que se llama cuando se crea un objeto a partir de una clase.
   - Se utiliza para inicializar los atributos del objeto.
   
**5. Encapsulación:**
   - En Python, los atributos y métodos pueden ser públicos, protegidos o privados, lo que controla su acceso.
   - Los atributos públicos son accesibles desde cualquier lugar. Los atributos protegidos comienzan con un guion bajo (por ejemplo, `_nombre`) y se consideran convenciones de privacidad. Los atributos privados comienzan con dos guiones bajos (por ejemplo, `__edad`) y se utilizan para evitar conflictos de nombres.

**6. Herencia:**
   - La herencia es un concepto fundamental en la POO que permite crear una nueva clase basada en una clase existente.
   - La clase derivada (hija) hereda atributos y métodos de la clase base (padre) y puede agregar sus propios atributos y métodos.
   
**7. Polimorfismo:**
   - El polimorfismo permite que diferentes clases puedan ser tratadas de manera uniforme. Esto se logra a través del uso de métodos con el mismo nombre en diferentes clases.

