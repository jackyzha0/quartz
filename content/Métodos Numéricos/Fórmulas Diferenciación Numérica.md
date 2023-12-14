# Fórmulas Diferenciación Numérica

%%
Date:: [[2023-12-13]]
Course:: [[Métodos Numéricos]]
Source:: [[Diferenciación Numérica]]
%%

## Fórmulas Primeras Derivada
> Siempre tener en cuenta que $h=x_{i+1}-x_i$

### Diferenciación hacia adelante
$$f'(x_i)\approx \dfrac{f(x_{i+1})-f(x_i)}{h}$$
$$f'(x_i)\approx\dfrac{-f(x_{i+2})+4f(x_{i+1})-3f(x_i)}{2h}$$

### Diferenciación hacia atrás
$$f'(x_i)\approx\dfrac{f(x_i)-f(x_{i-1})}{h}$$
$$f'(x_i)\approx\dfrac{3f(x_i)-4f(x_{i-1})+f(x_{i-2})}{2h}$$

Diferenciación centrada
$$f'(x_i)\approx \dfrac{f(x_{i+1})-f(x_{i-1})}{2h}$$
$$f'(x_i)\approx\dfrac{-f(x_{i+2})+8f(x_{i+1})-8f(x_{i-1})+f(x_{i-2})}{12h}$$

___
## Fórmulas Segunda Derivada

Diferenciación hacia adelante
$$f''(x_i)\approx \dfrac{f(x_{i+2})-2f(x_{i+1})+f(x_i)}{h^2}$$
$$f''(x_i)\approx\dfrac{-f(x_{i+3})+4f(x_{i+2})-5f(x_{i+1})+2f(x_i)}{h^2}$$

Diferenciación hacia atrás
$$f''(x_i)\approx \dfrac{f(x_{i})-2f(x_{i-1})+f(x_{i-2})}{h^2}$$
$$f''(x_i)\approx\dfrac{2f(x_i)-5f(x_{i-1})+4f(x_{i-2})-f(x_{i-3})}{h^2}$$

Diferenciación centrada
$$f''(x_i)\approx \dfrac{f(x_{i+1})-2f(x_{i})+f(x_{i-1})}{h^2}$$
$$f''(x_i)\approx\dfrac{-f(x_{i+2})+16f(x_{i+1})-30f(x_i)+16f(x_{i-1})-f(x_{i-2})}{12h^2}$$

