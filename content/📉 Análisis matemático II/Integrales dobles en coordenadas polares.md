[[Análisis matemático II]]

Date: February 13, 2023 8:09 PM
Status: Done
Year: 2022

- Caracterice un sistema de coordenadas polares
    - Podemos representar un punto en $R^2$ de dos formas: de forma cartesiana, y de forma polar.
    - El cambio a coordenadas polares, en muchas regiones, nos va a convenir hacer un planteo en coordenadas polares. Facilita el cálculo.
    
    Dado un punto $P$ llamamos $r$ a la norma del vector, $\varphi$ al ángulo positivo (en sentido antihorario y entre $0$ y $2\pi$). Por lo tanto, cada punto del plano puede ser representado por 
    
    $$
    0 \leq r \leq \infty \wedge 0\leq \varphi \leq 2\pi
    $$
    
    ![Untitled](Images/Integrales%20dobles%20en%20coordenadas%20polares/Untitled.png)
    
    Tenemos la siguiente transformación
    
    $$
    (x,y)\mapsto (r,\varphi)
    $$
    
    $$
    x=r\cos \varphi \\ y = \sin \varphi
    $$
    
- Defina la función ******************************************************Aplicación de Coordenadas Polares******************************************************
    
    Podemos crear la función $g$ para realizar el cambio de variables
    
    - Aplicacion de coordenadas polares es el nombre de la función que realiza el cambio de variables
    
    $$
    g:[0,\infty)\times[0,2\pi]\sub R^2 \rightarrow R^2 \\ (r,\varphi) \mapsto (r\cos\varphi,r\sin\varphi)
    $$
    
    Por lo tanto, la integral doble queda definida como 
    
    $$
    \iint_{R=g(R')}f(x,y)dxdy=\iint_{R'}f(r\cos\varphi, r\sin\varphi)J\left(\dfrac{x,y}{r,\varphi}\right)drd\varphi
    $$
    
    donde $J\left(\dfrac{x,y}{r,\varphi}\right)$ es el Jacobiano de la transformación.
    
    $$
    J\left(\dfrac{x,y}{r,\varphi}\right)=\left|\begin{matrix}
    x_r & x_\varphi \\
    y_r & y_\varphi 
    \end{matrix}\right|=\left|\begin{matrix}
    \cos\varphi & -r\sin \varphi \\
    \sin \varphi & r \cos \varphi 
    \end{matrix}\right| =r(\cos^2\varphi+\sin^2\varphi)=r
    $$
    
    Por lo tanto, reemplazando el Jacobiano
    
    $$
    \iint_{R=g(R')}f(x,y)dxdy=\iint_{R'}f(r\cos\varphi, r\sin\varphi)rdrd\varphi
    $$
    
- Qué relación hay entre los sistemas de coordenadas
    
    ![Untitled](Images/Integrales%20dobles%20en%20coordenadas%20polares/Untitled%201.png)


