Course: [[Algebra I]]

La diagonalización de una matriz cuadrada es un proceso mediante el cual se transforma la matriz en una forma diagonal mediante una transformación de similitud. En otras palabras, se busca una matriz invertible $P$ tal que $P^{-1}AP$ sea una matriz diagonal. La diagonalización de una matriz es útil porque permite simplificar el cálculo de potencias de la matriz y resolver sistemas de ecuaciones diferenciales lineales.

Para diagonalizar una matriz $A$, se deben seguir los siguientes pasos:

1. Calcular los valores propios de $A$ y sus correspondientes vectores propios.
2. Formar la matriz $P$ cuyas columnas son los vectores propios normalizados de $A$.
3. Calcular la matriz diagonal $D$ cuyos elementos diagonales son los valores propios de $A$.
4. Verificar que $P^{-1}AP = D$.


    
- **¿Qué significa que A sea diagonalizable?**
	Si una matriz cuadrada $A$ es diagonalizable, significa que se puede transformar en una matriz diagonal mediante una transformación de similitud. En otras palabras, existe una matriz invertible $P$ tal que $P^{-1}AP$ es una matriz diagonal. La diagonalización de una matriz es útil porque permite simplificar el cálculo de potencias de la matriz y resolver sistemas de ecuaciones diferenciales lineales. La diagonalización de una matriz depende de los valores y vectores propios de la matriz. Si una matriz tiene $n$ valores propios distintos, entonces es diagonalizable. Si una matriz tiene menos de $n$ valores propios distintos, entonces puede o no ser diagonalizable. Si una matriz tiene valores propios repetidos, entonces es diagonalizable si y solo si el espacio generado por los vectores propios correspondientes a cada valor propio tiene dimensión igual a la multiplicidad algebraica del valor propio.