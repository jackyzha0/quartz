# Gramáticas Libres de Contexto

%%
Date:: [[2023-04-20]]
Course:: [[Informática Teórica]]
Source:: [[]]
#main_page 
#infoteo/gramatica 
%%

Qué tipos de gramáticas existen?
?
## Tipos de gramáticas
- Gramática generativa
	- Trata de formular una serie de reglas capaces de producir todas las oraciones posibles y aceptables en un idioma.
- Gramática incontextual GIC
	- Conjunto de variables, símbolos terminales y una variable, así como de producción.
	- Cada producción consta de una variable de cabeza y un cuerpo.

Qué son las gramáticas libres de contexto (definición no formal)?
?
## Gramáticas libres de contexto
- Forman la base de una notación BNF (Backus-Naur Form)
	- Cual es la forma y los símbolos que voy a utilizar para construir mis reglas de producción
	- Describen formatos de documentos para el intercambio de información en la web.
- Son gramáticas tipo 2 (jerarquía de Chomsky) que pueden ser representadas por <mark style="background: #FFF3A3A6;">autómatas de pila.</mark>
- Permiten describir la mayoría de los lenguajes de programación.
- Están compuesta por 
	- Símbolos terminales (T)
	- No terminales (V)
	- Conjunto de Producciones (P)
	- Símbolo inicial (S)

Qué es el Backus-Naur Form (BNF)?
?
## BNF (Backus-Naur Form)
- Técnica más común para definir la sintaxis de los lenguajes de programación
- Convenciones de BNF
	- Los no terminales se escriben entre paréntesis angulares <>
	- Los terminales se representan con cadenas de caracteres sin paréntesis angulares
	- El lado izquierdo de cada regla debe tener únicamente un **no terminal** (ya que es libre de contexto)
	- El símbolo ::= (se define como) se utiliza en lugar de $\rightarrow$
- 

Qué es el XML y cómo se relaciona con DTD?
?
## XML
- El DTD (Document Type Definition) es una gramática independiente del contexto que describe las etiquetas permitidas y las formas en que dichas etiquetas pueden anidarse
	- Estructura que tine internamente un XML.
- Las etiquetas son las palabras clave encerradas entre corchetes triangulares que el lector puede conocer del HTML. Sin embargo, las etiquetas XML sirven para dar significado.

Cómo se define formalmente una gramática libre de contexto?
?
>[!important] Definición de Gramática Libre de Contexto
>Una gramática $G=(V,T,S,P)$ se dice que es **libre de contexto** si todas las producciones de $P$ tienen la forma $$A\rightarrow x_i$$
>donde $A\in V$ y $x \in (V \cup T)^*$
>Se dice que un lenguaje $L$ es libre de contexto si y solo si existe una gramática libre de tal contexto $G$ tal que $L=L(G)$

Cómo se define un árbol de derivación?
?
>[!important] Definición árbol de derivación
>Sea $G=(V,T,S,P)$ una gramática libre de contexto. Un árbol ordenado es un árbol de derivación de $G$ si y sólo si tiene las siguientes propiedades.
>1. La raíz tiene etiqueta $S$
>2. Cada hoja tiene una etiqueta en $T\cup \{\lambda \}$
>3. Cada vértice interior tiene una etiqueta en $V$
>4. Si un vértice tiene una etiqueta en $A\in V$ y sus hijos están etiquetados (de derecha a izquierda) $a_1,a_2,\dots, a_n$ entonces $P$ debe contener una producción de la forma $$A\rightarrow a_1,a_2,\dots, a_n$$
>5. Una hoja con etiqueta $\lambda$ no puede tener hermanos, es decir, un vértice con un hijo etiquetado $\lambda$ no puede tener otro hijo.

