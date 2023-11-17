# Simplificación de Gramáticas Independientes

%%
Date:: [[2023-04-20]]
Course:: [[Informática Teórica]]
Source:: [[Gramáticas Libres de Contexto]]
#infoteo/gramatica 
%%

Explique el funcionamiento del algoritmos de simplificación de gramáticas independientes.
?
## Algoritmo para la simplificación de Gramáticas Independientes
- <mark style="background: #FFF3A3A6;">Eliminación símbolos inútiles</mark>
	1. Eliminación de **símbolos no derivables**
		- Un símbolo no terminal es derivable si del lado derecho de ese símbolo solo existen símbolos terminales $$A\rightarrow a; a\in VT$$ entonces $A$ es derivable.
		- Si todos los símbolos no terminales de la parte derecha de una producción son derivables o útiles, el símbolo no terminal de la parte izquierda lo es $$B\rightarrow CcA$$ si $A$ y $C$ son derivables entonces $B$ también lo es.
	 2. Eliminación de los **símbolos no alcanzables o inaccesibles.**
		 - Los símbolos accesibles son aquellos que se llegan a través de la producción de inicio. Los símbolos no alcanzables son símbolos (VT y VN)  a los que no se llega a través del símbolo inicial.
		 - El símbolo inicial siempre es accesible.
		 - Si el símbolo no terminal del lado izquierdo es accesible, todos los símbolos (VN y VT) del lado derecho también lo son $$S\rightarrow AcB$$ y si $S$ es accesible entonces $A$, $c$ y $B$ son accesibles
- <mark style="background: #FFF3A3A6;">Eliminación de las producciones la palabra vacía</mark>
	- Las producciones nulas son aquellas producciones del tipo $A\rightarrow \lambda$ 
	- Los símbolos anulables son los que en uno o más pasos de derivación pueden generar la cadena vacía. 
- <mark style="background: #FFF3A3A6;">Eliminación de las producciones unitarias</mark> 
	- Son aquellas de la forma $A\rightarrow B$ para las variables $A$ y $B$


___
## Flashcards