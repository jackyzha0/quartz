[[Análisis matemático II]]

Date: February 13, 2023 8:11 PM
Status: Done
Year: 2022

- Cómo se definen las coordenadas esféricas?
    
    Si llamamos $\rho$ a la norma del vector de $P$; $\varphi$ al ángulo diedro que el semiplano $\vec{OP}$ y $\vec{OZ}$ forma con el semiplano $y=0$ que contiene al semieje positivo de $\vec{OX}$; y $\theta$ el ángulo forma con la dirección positiva de $\vec{OZ}$
    
    $$
    0\leq \rho\leq \infty\\0\leq \varphi\leq 2\pi\\0 \leq \theta \leq \pi
    $$
    
    ![Untitled](Images/Integrales%20triples%20en%20coordenadas%20esféricas/Untitled.png)
    
    ![Untitled](Images/Integrales%20triples%20en%20coordenadas%20esféricas/Untitled%201.png)
    
- Cómo se define la función aplicación de coordenadas esféricas?
    
    $$
    g:[0,\infty)\times[0,2\pi]\times[0,\pi]\sub \mathbb{R^3}\rightarrow \mathbb{R^3}\\(\rho,\varphi,\theta)\mapsto (\rho\sin\theta\cos\varphi, \rho\sin\theta\sin\varphi,\rho\cos\theta)
    $$
    
    ![Untitled](Images/Integrales%20triples%20en%20coordenadas%20esféricas/Untitled%202.png)
    
    $$
    J(r,\varphi,z)= \left|\begin{matrix}
    x_r & x_\varphi & x_z \\
    y_r & y_\varphi & y_z \\
    z_r & z_\varphi & z_Z 
    \end{matrix}\right|_P=\\ \left|\begin{matrix}
    \sin\theta\cos\varphi & -\rho\sin\theta\sin\varphi & \rho\cos\theta\cos\varphi \\
    \sin\theta\sin\varphi & \rho\sin\theta\cos\varphi & \rho\cos\theta\sin\varphi \\
    \cos\theta & 0 & -\rho\sin\theta 
    \end{matrix}\right|=\rho^2\sin\theta
    $$
    
    Luego, $J=\rho ^2 \sin\theta$ pues para la transformación $J \geq 0$ entonces podemos plantear las siguientes integrales en coordenadas cilíndricas
    
    $$
    \iiint_{D=g(D')}f(x,y,z)\enspace dxdydz=\iiint_{D'}f(\rho\sin\theta\cos\varphi, \rho\sin\theta\sin\varphi,\rho\cos\theta)\enspace\rho^2\sin\theta\enspace d\rho d\varphi d\theta
    $$
    
    ![Untitled](Images/Integrales%20triples%20en%20coordenadas%20esféricas/Untitled%203.png)
    
    ![Untitled](Images/Integrales%20triples%20en%20coordenadas%20esféricas/Untitled%204.png)
    
    ![Untitled](Images/Integrales%20triples%20en%20coordenadas%20esféricas/Untitled%205.png)