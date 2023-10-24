[[Análisis matemático II]]

Date: February 13, 2023 8:11 PM
Status: Done
Year: 2022

- Cómo se definen las coordenadas cilíndricas?
    
    Se llama $r$ a la norma del vector posición de $P'$, proyección de $P$ en el plano $XOY$, $\varphi$  al ángulo positivo del eje $\vec{OX}$ medido en sentido anti horario de $z$
    
    $$
    0\leq r\leq \infty\\0\leq \varphi\leq 2\pi\\-\infty < z < \infty
    $$
    
    ![Untitled](Images/Integrales%20triples%20en%20coordenadas%20cilíndricas/Untitled.png)
    
    Quedan definidas las coordenadas polares como la función que realiza el siguiente mapeo
    
    - $z$ continúa siendo dicho valor, no se transforma.
    
    $$
    g:[0,\infty)\times[0,2\pi]\times(-\infty,\infty)\sub \mathbb{R^3}\rightarrow \mathbb{R^3}\\(r,\varphi,z)\mapsto (r\cos\varphi, r\sin\varphi,z)
    $$
    
    ![Untitled](Images/Integrales%20triples%20en%20coordenadas%20cilíndricas/Untitled%201.png)
    
- Cómo es la aplicación de coordenadas cilíndricas con respecto al eje OZ?
    - También, podemos definir esta aplicación con respecto a los otros ejes. Proyectándolo en distintos planos
    
    $$
    J(r,\varphi,z)= \left|\begin{matrix}
    x_r & x_\varphi & x_z \\
    y_r & y_\varphi & y_z \\
    z_r & z_\varphi & z_Z 
    \end{matrix}\right|_P= \left|\begin{matrix}
    \cos\varphi & -r\sin\varphi & 0 \\
    \sin\varphi & r\cos\varphi & 0 \\
    0 & 0 & 1 
    \end{matrix}\right|=r(\cos^2\varphi+\sin^2\varphi)=r
    $$
    
    - Derivo cada componente con respecto a las mismas componentes.
    
    Luego, $J=r$ pues para la transformación $r\geq0$ (no pongo el valor absoluto) entonces podemos plantear las siguientes integrales en coordenadas cilíndricas
    
    $$
    \iiint_{D=g(D')}f(x,y,z)\enspace dxdydz=\iiint_{D'}f(r\cos\varphi,r\sin\varphi,z)\enspace r\enspace drd\varphi dz
    $$
    
    ![Untitled](Images/Integrales%20triples%20en%20coordenadas%20cilíndricas/Untitled%202.png)
    
    - Existe una relación entre las coordenadas rectangulares y cilíndricas. Dado un punto en cualquiera de las coordenadas, puedo transformarla al otro tipo.


