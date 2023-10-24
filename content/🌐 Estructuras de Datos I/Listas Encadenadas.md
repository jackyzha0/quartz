# Listas Encadenadas

- Date:: [[2022-02-20]]
- Course:: [[Estructuras de Datos I]]

#main_page 

-   En que se diferencia una lista en arreglo a una **lista** **encadenada**? ↓
    -   A diferencia de la representación mediante arreglos (en espacios contiguos de memoria), en una representación encadenada utilizamos nodos, los cuales se encuentran en cualquier parte de dicha memoria.
-   Cómo está compuesto un **nodo**? ↓
    -   Un nodo está compuesto de al menos un dato, y al menos un puntero (que apunta al siguiente nodo de la lista)

### Pilas Encadenadas

-  Cuál es el procedimiento para **agregar** elementos a una **pila encadenada**? ↓
	![[Pasted image 20230219141628.png]]
-  Cuál es el procedimiento para **eliminar** elementos a una **pila encadenada**? ↓
	  ![<https://remnote-user-data.s3.amazonaws.com/rd8SW9pqq6pCIiftlQACYY4tWk_RCodx1xWGAPFjtmW20EowXiil9YIb0P6o3QZJDhuBf3XF5HvW8ZDyfVbKVpr8JfZhA_RAV6RhAiWC0tfN0F5Yb2r4otwIURD4YpLq.png>](<https://remnote-user-data.s3.amazonaws.com/rd8SW9pqq6pCIiftlQACYY4tWk_RCodx1xWGAPFjtmW20EowXiil9YIb0P6o3QZJDhuBf3XF5HvW8ZDyfVbKVpr8JfZhA_RAV6RhAiWC0tfN0F5Yb2r4otwIURD4YpLq.png>)
	
### Colas Encadenadas

-   Cuál es el procedimiento para **agregar** elementos a una **cola encadenada**? ↓
  
	  ![<https://remnote-user-data.s3.amazonaws.com/V43Y2g1azvpNttLLyUobvfngh1BjDpUpYsSYFTPtITu9ZJe4YY4SyBItkaqH-GZ80-I5AYLD4xZBQAfWLG0G0wG1Qf40A33iCx95S90AoOKKSr3ul3tXyL1m1aHXcpKt.png>](<https://remnote-user-data.s3.amazonaws.com/V43Y2g1azvpNttLLyUobvfngh1BjDpUpYsSYFTPtITu9ZJe4YY4SyBItkaqH-GZ80-I5AYLD4xZBQAfWLG0G0wG1Qf40A33iCx95S90AoOKKSr3ul3tXyL1m1aHXcpKt.png>)
-  Cuál es el procedimiento para **eliminar** elementos a una **cola encadenada**? ↓
	  ![<https://remnote-user-data.s3.amazonaws.com/vohPDF7x-zYVe349oZyAm7gsUpQHfvx7vik6_M3six32ACzYVW2Lu-ULaZ8PbjVQ0h4f5k5VDxGXayR-QC4q1-Q1r0xa13QwYeeyOKIx2bXFyfaFR2xPikt45t7CSyPp.png>](<https://remnote-user-data.s3.amazonaws.com/vohPDF7x-zYVe349oZyAm7gsUpQHfvx7vik6_M3six32ACzYVW2Lu-ULaZ8PbjVQ0h4f5k5VDxGXayR-QC4q1-Q1r0xa13QwYeeyOKIx2bXFyfaFR2xPikt45t7CSyPp.png>)

### El Espacio Disponible

-   En qué consiste el manejo del **espacio disponible**? ↓
	-   El espacio disponible contiene todos los nodos que no están siendo utilizados. Para ello se hará uso de otra lista encadenada, de nodos en desuso.
-   Cómo se **inicializa** la lista de espacio disponible? ↓
	  ![<https://remnote-user-data.s3.amazonaws.com/Ox9LxoRwmiFQEY1D2XIDEwo_q4ogMK737ohXGXJyGIgDzG0uGaQtePw6Hi87XXhLBcuccCllD9dcz64NAIlIqKQjjR4xSy9e_IB4tROaI6tEBESnaU52HzxYRZQitQyh.png>](<https://remnote-user-data.s3.amazonaws.com/Ox9LxoRwmiFQEY1D2XIDEwo_q4ogMK737ohXGXJyGIgDzG0uGaQtePw6Hi87XXhLBcuccCllD9dcz64NAIlIqKQjjR4xSy9e_IB4tROaI6tEBESnaU52HzxYRZQitQyh.png>)
-   Cómo es el procedimiento **GETNODE**? ↓
	

	  ![<https://remnote-user-data.s3.amazonaws.com/t8U_QCWzMhWdoVIK96I5c137LXfebPAGBTW_D7MktWJa661PJwernswhx2rwHFjPirwtbwJYVnxhXODyOtN55o81uU4AXVxqJNTIQXpzHD_sPIrTtTqFc5md4HGIZPa6.png>](<https://remnote-user-data.s3.amazonaws.com/t8U_QCWzMhWdoVIK96I5c137LXfebPAGBTW_D7MktWJa661PJwernswhx2rwHFjPirwtbwJYVnxhXODyOtN55o81uU4AXVxqJNTIQXpzHD_sPIrTtTqFc5md4HGIZPa6.png>)
-   Cómo es el procedimiento **RET**? ↓
	
	  ![<https://remnote-user-data.s3.amazonaws.com/FBcslwPdzrbHXgcJzbqF8P82NsYm3dcZPXSHwJGXYzKqRzaK1N9bCSNSeNDsFfrNDZzTPaGczhnoV5SXQQ847kC3ugxCUpYn7H_C2pm3D6H1NpBrgtP16Sed300uMcua.png>](<https://remnote-user-data.s3.amazonaws.com/FBcslwPdzrbHXgcJzbqF8P82NsYm3dcZPXSHwJGXYzKqRzaK1N9bCSNSeNDsFfrNDZzTPaGczhnoV5SXQQ847kC3ugxCUpYn7H_C2pm3D6H1NpBrgtP16Sed300uMcua.png>)

### Listas Circulares Encadenadas

-   En qué consiste una **lista circular encadenada**?
	- Simplemente el nodo final, apunta al primer elemento de la lista.
-   En qué consiste el **encabezado**?
	- Es un nodo especial (con dato: *** * **) que se encuentra en primera posición de la lista.

### Listas Doblemente Encadenadas

-   En que consisten las listas **doblemente** encadenadas? ↓
-   Cuál es el procedimiento para **agregar** elementos a una **lista doblemente encadenada**? ↓
-   Cuál es el procedimiento para **eliminar** elementos a una **lista doblemente encadenada**? ↓

### Listas Generalizadas

-   En que consisten las listas **generalizadas**? ↓
-   Cómo se **representan** las listas **generalizadas**? ↓
