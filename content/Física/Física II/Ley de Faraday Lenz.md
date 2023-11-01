
Date: February 15, 2023 12:24 PM
Status: Done
Year: 2022

La **ley de Faraday**, descubierta por el físico del siglo XIX Michael Faraday. Relaciona la razón de cambio de flujo magnético que pasa a través de una espira (o lazo) con la magnitud de la fuerza electromotriz $\varepsilon$ inducida en la espira. La relación es

$$
\varepsilon = \dfrac{d\Phi}{dt}
$$

La fuerza electromotriz, o FEM, se refiere a la diferencia de potencial a través de la espira descargada (es decir, cuando la resistencia en el circuito es alta). En la práctica es a menudo suficiente pensar la FEM como un voltaje, pues tanto el voltaje y como la FEM se miden con la misma unidad, el volt.

**La ley de Lenz** es una consecuencia del [principio de conservación de la energía](https://es.khanacademy.org/science/physics/work-and-energy/work-and-energy-tutorial/a/what-is-conservation-of-energy) aplicado a la inducción electromagnética. Fue formulada por [Heinrich Lenz](https://en.wikipedia.org/wiki/Heinrich_Lenz)
 en 1833. Mientras que la ley de Faraday nos dice la magnitud de la FEM 
producida, la ley de Lenz nos dice en qué dirección fluye la corriente, y
 establece que la dirección siempre es tal que **se opone al cambio de flujo que la produce**. Esto significa que cada campo magnético generado por una corriente inducida va en la dirección **opuesta** al cambio en el campo original.

Típicamente
 incorporamos la ley de Lenz a la ley de Faraday con un signo menos, que
 nos permite utilizar el mismo sistema de coordenadas para el flujo y la
 FEM. A veces nos referimos al resultado como la ley de Faraday-Lenz,

$$
\varepsilon = -\dfrac{d\Phi}{dt}
$$

En la práctica, frecuentemente lidiamos con la inducción magnética en 
espiras múltiples de alambre, donde cada una contribuye con la misma 
FEM. Por esta razón, incluimos un término adicional $N$ para representar el número de vueltas, *es decir*,

$$
\varepsilon=-N\dfrac{d\Phi}{dt}
$$