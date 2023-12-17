# Regla del trapecio
$$\int_a^bf(x)\approx (b-a)\frac{f(a)+f(b)}{2}$$

$$E_t=-\frac{1}{12}f''(\xi)(b-a)^3$$

# Regla del trapecio de aplicación múltiple
$h=(b-a)/n$

$$\int_a^bf(x)dx\approx=\frac{(b-a)}{2n}[f(x_0)+2\sum f(x_i)+f(x_n)]$$

$$\overline{f}=\frac{\sum f''(\xi)}{n} $$

$$E_a=-\frac{(b-a)^3}{12n^2}\overline f$$


# Regla de Simpson 1/3 $h=(b-a)/2$
$$\int_a^bf(x)\approx \frac{h}{3}[f(x_0)+4f(x_1)+f(x_2)]$$

$$E_t=-\frac{(b-a)^5}{2880}f^{(4)}(\xi)$$

# Regla de Simpson 1/3 (aplicación múltiple) $h=(b-a)/n$
$$\int_a^bf(x)dx\approx \frac{h}{3}\left[f(x_0)+4\sum_{i=1,3,5}^{n-1}f(x_i)+2\sum_{j=2,4,6}^{n-2}f(x_j)=f(x_n)\right]$$

$$E_a=-\frac{(b-a)^5}{180n^4}\overline f^{(4)}$$

Donde $\overline f^{(4)}$ es el promedio de la cuarte derivada en el intervalo. 

# Regla de Simpson 3/8 $h=(b-a)/3$
$$\int_{a}^{b}f(x)dx \approx \frac{3h}{8}[f(x_0)+3f(x_1)+3f(x_2)+f(x_3)]$$

$$E_t=-\frac{(b-a)^5}{6480}f^{(4)}(\xi)$$
