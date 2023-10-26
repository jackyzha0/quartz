# Unidad de Memoria RAM

%%
Date:: [[2023-04-28]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Memorias]]
#arqcompu/memorias 
%%


![[Pasted image 20230428165617.png]]
1.  **Input lines:** Son las terminales que se utilizan para introducir los datos que se van a almacenar en la memoria RAM. Estos datos pueden provenir de cualquier fuente externa, como un procesador o un dispositivo de entrada.
2.  **Address lines:** También conocidas como líneas de dirección, son las terminales que se utilizan para especificar la ubicación de los datos que se desean leer o escribir en la memoria RAM. Cada línea de dirección se utiliza para especificar un bit diferente de la dirección de memoria, lo que permite a la memoria RAM direccionar una gran cantidad de posiciones de memoria.
3.  **Read line:** Es la terminal que se utiliza para solicitar a la memoria RAM que lea los datos almacenados en la ubicación de memoria especificada por las líneas de dirección. Al activar esta terminal, la memoria RAM envía los datos solicitados a través de las líneas de salida.
4.  **Write line:** Es la terminal que se utiliza para solicitar a la memoria RAM que escriba los datos que se han introducido a través de las líneas de entrada en la ubicación de memoria especificada por las líneas de dirección. Al activar esta terminal, los datos de entrada se escriben en la memoria RAM y se almacenan en la ubicación de memoria especificada.
5.  **Output lines:** Son las terminales que se utilizan para enviar los datos almacenados en la memoria RAM al procesador o al dispositivo de salida. 

![[Pasted image 20230428165919.png]]
- La unidad de memoria posee 1024 posiciones de memoria (addresses lines) y cada una puede almacenera un número binario de 16 bits. En este caso, 1024 posiciones de memoria multiplicadas por 16 bits por posición dan como resultado una capacidad total de almacenamiento de 16,384 bits

## Estructura interna de una celda de memoria.
![[Pasted image 20230428170037.png]]
