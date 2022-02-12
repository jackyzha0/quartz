# Direct Coding

## 1. What is direct coding?
- **def**::Certain amount of storage  space are used to represent each pixel to code its color <!--SR:!2022-02-08,1,230-->
```ad-ex
3 bits for each pixel, one for each primary color. Hence the result will be something like this ...

![[Pasted image 20220202205243.png]]
```

- For industry standart *direct coding,* we use 3 bytes/ 24 bits per pixel.
	- Thus ...
		- Each primary has 256 different intensity level
		- In this case total number of pixels are 256X256X256 = 16.7 million.

- A notable special case of direct coding is the representation of black-and-white (bilevel) and gray-scale images, where the three primaries always have the same value and hence need not be coded separately. A black-and-white image requires only one bit per pixel, with bit value 0 representing black and 1 representing white.
