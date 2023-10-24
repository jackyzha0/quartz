# Pilas y Colas

- Date:: [[2022-02-19]]
- Course:: [[Estructuras de Datos I]]

#main_page 

## Pilas
-   Qué es una **pila**? ↓
	-   Una colección de datos a los cuales se les puede acceder mediante un extremo, que se conoce generalmente como tope.
	-   Su característica fundamental es que al extraer se obtiene siempre el último elemento que acaba de insertarse. (LIFO)
	-   Tienen dos operaciones básicas:
		-   Meter(para insertar un elemento) y Sacar(para extraer un elemento).
-   Cuál es el procedimiento para **agregar** elementos a una **pila**? ↓
	
	![https://remnote-user-data.s3.amazonaws.com/OZ6hEbhx80KjkywOIGvqaoXpk7sElOSb0P0LBk10Jqg1V1SR5IK3yUKV61rH2BZY712cB5AoHHVIxHVIZkhcalapRgdiZMg8srd_vYNyA1vgGEAoUnLELssMWzDHmcg2.png](https://remnote-user-data.s3.amazonaws.com/OZ6hEbhx80KjkywOIGvqaoXpk7sElOSb0P0LBk10Jqg1V1SR5IK3yUKV61rH2BZY712cB5AoHHVIxHVIZkhcalapRgdiZMg8srd_vYNyA1vgGEAoUnLELssMWzDHmcg2.png)
-   Cuál es el procedimiento para **eliminar** elementos de una **pila**? ↓
	
	![https://remnote-user-data.s3.amazonaws.com/6uRFWOJvZ-BwfF-i_PgKAyRghQM8zCR70RPjntXwfMASe1U9ldx2MDnV6FPdhehGXldnTMyISKZzOgHy88C7HOKt8X0AG89g68oIKltClSvqkYyWfvJmdjpl8aVO7Cc7.png](https://remnote-user-data.s3.amazonaws.com/6uRFWOJvZ-BwfF-i_PgKAyRghQM8zCR70RPjntXwfMASe1U9ldx2MDnV6FPdhehGXldnTMyISKZzOgHy88C7HOKt8X0AG89g68oIKltClSvqkYyWfvJmdjpl8aVO7Cc7.png)
	
## Colas

-   Qué es una **cola**? ↓
	-   Es una estructura finita y lineal donde los elementos pueden ser de cualquier tipo que se requiera.
	-   La estructura posee dos partes:
		-   El front, es aquel por donde salen los elementos
		-   Rear, por donde ingresan los elementos.
	-   Utilizan el principio FIFO
-   Cuál es el procedimiento para **agregar** elementos a una **cola**? ↓
	
	![https://remnote-user-data.s3.amazonaws.com/cvF-vhAiYrX8gW_EESRjTXIZtTjEgU9kyizoUfekmujG3J2TeowYZw9SnY2S75wwevsQcCSOZcve-PWr01CqTidfRgeMRdX291HCY2O-7BeU7FlEtb7FWG17p7uLwBAX.png](https://remnote-user-data.s3.amazonaws.com/cvF-vhAiYrX8gW_EESRjTXIZtTjEgU9kyizoUfekmujG3J2TeowYZw9SnY2S75wwevsQcCSOZcve-PWr01CqTidfRgeMRdX291HCY2O-7BeU7FlEtb7FWG17p7uLwBAX.png)
-   Cuál es el procedimiento para **eliminar** elementos de una **cola**? ↓
	
	![https://remnote-user-data.s3.amazonaws.com/u1838dMcetTm1zJ1GrOlo67Oh9sb9xpJQw91bPeCwpwRZrn2WaKC-RqqEj-FyqHHM9loiDrorh3AWTPee2FjSdnk349WFWm8sWYeRpngIwQiuCFcRHE3e-uqEOLcWRHB.png](https://remnote-user-data.s3.amazonaws.com/u1838dMcetTm1zJ1GrOlo67Oh9sb9xpJQw91bPeCwpwRZrn2WaKC-RqqEj-FyqHHM9loiDrorh3AWTPee2FjSdnk349WFWm8sWYeRpngIwQiuCFcRHE3e-uqEOLcWRHB.png)
-   Qué es una **cola circular**? ↓
	
	-   Las colas "comunes" poseen el problema de que cuando se ingresan todos los elementos, se llena (por más que no posea elementos).
	-   Para solucionarlo, las colas circulares son una representación circular del vector, en el que se une el comienzo y el final.
	
	![https://remnote-user-data.s3.amazonaws.com/sWNJ9cj4FNmTGzC13HhRdBbmzIUq2CAYgwf9H5iOvs8KjCMter5w9uX5_ama1N4VneEPNNADwvaukF6Q4pRbp-xWWxvG5aVgOIv45np-rzzOtZkIHgAJWe2tB0kKC4yM.png](https://remnote-user-data.s3.amazonaws.com/sWNJ9cj4FNmTGzC13HhRdBbmzIUq2CAYgwf9H5iOvs8KjCMter5w9uX5_ama1N4VneEPNNADwvaukF6Q4pRbp-xWWxvG5aVgOIv45np-rzzOtZkIHgAJWe2tB0kKC4yM.png)
-   Cuál es el procedimiento para **agregar** elementos a una **cola circular**? ↓
	
	![https://remnote-user-data.s3.amazonaws.com/xOp-uS3pS7PzkL5anU7RG_rKYi7l5tvUuunJs6Boi9hqCDlQZGfy2e3-GKKbnwb8828yRw__zykbzKhi6ZWGeCFVvzBscp9tgvayEyPkMFPJBvhxaFaa8FF_hohNRkbs.png](https://remnote-user-data.s3.amazonaws.com/xOp-uS3pS7PzkL5anU7RG_rKYi7l5tvUuunJs6Boi9hqCDlQZGfy2e3-GKKbnwb8828yRw__zykbzKhi6ZWGeCFVvzBscp9tgvayEyPkMFPJBvhxaFaa8FF_hohNRkbs.png)
-   Cuál es el procedimiento para **eliminar** elementos de una **cola circular**? ↓
	![[Pasted image 20230219141555.png]]
