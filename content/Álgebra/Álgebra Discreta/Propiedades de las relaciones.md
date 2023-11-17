Course: [[Álgebra Discreta]]

Date: February 13, 2023 8:34 PM
Status: Done
Year: 2022

- Propiedades de las relaciones
    - Definición de reflexividad ↓
        - $R \text{ es reflexiva} \Leftrightarrow \forall x \in A, (x,x)\in R
            
            ![https://remnote-user-data.s3.amazonaws.com/YOFHi09O5XXqNUYrMsYvSBsmg96rVKAhr8VRA0sTIZCPAaLQX1RoiOO1eVqBL7S_YxPqWyvxvugZvs6QtKtabx9j9hNh6h6ougmUSitKDdIZeJidlhRRPs0-aYA-tlJg.png](https://remnote-user-data.s3.amazonaws.com/YOFHi09O5XXqNUYrMsYvSBsmg96rVKAhr8VRA0sTIZCPAaLQX1RoiOO1eVqBL7S_YxPqWyvxvugZvs6QtKtabx9j9hNh6h6ougmUSitKDdIZeJidlhRRPs0-aYA-tlJg.png)
            
            - Todos los nodos se relacionan con sí mismos
            - Es reflexiva is tiene todos 1s en la diagonal de la matriz $A$.
        - $R \text{ no es reflexiva} \Leftrightarrow \exist x \in A, (x,x)\notin R$
            
            ![https://remnote-user-data.s3.amazonaws.com/snEtOzvtdkfyWKLeyhgPZKRxqO0g9KnRUydiau9tcMG_yWmsX5zaQn6dsHaAmvGjLWA9-fiiSraVjMYWFwFMjQwkIyjooiNJOjrKlLxKFGLEG2IFkO5wYmYjGjDs9nTO.png](https://remnote-user-data.s3.amazonaws.com/snEtOzvtdkfyWKLeyhgPZKRxqO0g9KnRUydiau9tcMG_yWmsX5zaQn6dsHaAmvGjLWA9-fiiSraVjMYWFwFMjQwkIyjooiNJOjrKlLxKFGLEG2IFkO5wYmYjGjDs9nTO.png)
            
    - Definición de arreflexividad ↓
        - $R \text{ es arreflexiva } \Leftrightarrow \forall x \in A, (x,x)\notin R$
            
            ![https://remnote-user-data.s3.amazonaws.com/cKTC9MXDeAQjp_6cGZL79C2D0D9WVTKi7WFtCi9-4l-qANcMbGnhn7YeJHpQjnUG5pNtGoSs2VnwV5Yir2oWNyuVMcJCPeF_KYjRJgZwkY6u2MJiFuPgK3yRJQy7cTT0.png](https://remnote-user-data.s3.amazonaws.com/cKTC9MXDeAQjp_6cGZL79C2D0D9WVTKi7WFtCi9-4l-qANcMbGnhn7YeJHpQjnUG5pNtGoSs2VnwV5Yir2oWNyuVMcJCPeF_KYjRJgZwkY6u2MJiFuPgK3yRJQy7cTT0.png)
            
            - No hay ningún nodo que se relacione consigo mismo.
            - Es arreflexiva cuando tiene todo 0s en la diagonal.
    - Definición de relación simétrica ↓
        - $R \text{ es simétrica }\Leftrightarrow \forall (x,y) \in A [(x,y)\in R \Rightarrow (y,x)\in R]$
            
            ![https://remnote-user-data.s3.amazonaws.com/DN9IYAFQET7r4uUrdNy5pfc6aZSv-c3anpQOv0jCQavd1zY6auknP-1o7LwitFRwnG5IA4CFLp1JkjtOiAPBeb-lpsnzr4XnNDow3q6PrQEIpawsLWRs-dSAjGbLkaPE.png](https://remnote-user-data.s3.amazonaws.com/DN9IYAFQET7r4uUrdNy5pfc6aZSv-c3anpQOv0jCQavd1zY6auknP-1o7LwitFRwnG5IA4CFLp1JkjtOiAPBeb-lpsnzr4XnNDow3q6PrQEIpawsLWRs-dSAjGbLkaPE.png)
            
            - Es simétrica cuando la matriz es simétrica.
            - En el digrafo, todas las relaciones son bidireccionales.
        - $R \text{ no es simétrica } \Leftrightarrow \exists x,y \in A / [(x,y)\in R\wedge (y,x)\notin R]$
            
            ![https://remnote-user-data.s3.amazonaws.com/Zb4V8pdEC_tWBVw6BGlbaTIi7jTnqarECTov64L75n4FvEoajP4K10U1QvI_EkPYXV6KBaUl23mIrWz2xjhnlU3nLjnTbJii6dnuhR_OtD2Js1oIumhB8ErrLBT0vBlw.png](https://remnote-user-data.s3.amazonaws.com/Zb4V8pdEC_tWBVw6BGlbaTIi7jTnqarECTov64L75n4FvEoajP4K10U1QvI_EkPYXV6KBaUl23mIrWz2xjhnlU3nLjnTbJii6dnuhR_OtD2Js1oIumhB8ErrLBT0vBlw.png)
            
            - Cuando existe una relación que no es bidireccional.
    - Definición de relación asimétrica ↓
        - $R \text{ es asimétrica }\Leftrightarrow \forall (x,y) \in A [(x,y)\in R \Rightarrow (y,x)\notin R]$
            
            ![https://remnote-user-data.s3.amazonaws.com/-_fCWRrIyFcL5lvUa1Z8JviriW-n_v61TxPAZHozO8I-d4j4YfGJHLQZOoCgTyyzthqWvG_fk0RmtHmmg7pH7zvNWP1gGh5tTEchC0wK9gHM8cIVMlSF_jb-AOZMhnjY.png](https://remnote-user-data.s3.amazonaws.com/-_fCWRrIyFcL5lvUa1Z8JviriW-n_v61TxPAZHozO8I-d4j4YfGJHLQZOoCgTyyzthqWvG_fk0RmtHmmg7pH7zvNWP1gGh5tTEchC0wK9gHM8cIVMlSF_jb-AOZMhnjY.png)
            
            - Cuando no existe ninguna relación que sea simétrica o bidireccional
    - Definición de relación antisimétrica ↓
        - $R \text{ es antisimétrica } \Leftrightarrow x,y \in A / [(x,y)\in R\wedge (y,x)\in R \Rightarrow x = y]$
            
            ![https://remnote-user-data.s3.amazonaws.com/mBm-1UyrUKaU_UK11IqN7POuFHoOLHgncTQ1uLJSBWRA2LaPzIctdwnp-RYsjLAHAE6xaTZvyIRIud_w-HeJHjfrmK0wtQmEtTcc00pHAqlOgI0lbjv3IoA8H7xZmzBW.png](https://remnote-user-data.s3.amazonaws.com/mBm-1UyrUKaU_UK11IqN7POuFHoOLHgncTQ1uLJSBWRA2LaPzIctdwnp-RYsjLAHAE6xaTZvyIRIud_w-HeJHjfrmK0wtQmEtTcc00pHAqlOgI0lbjv3IoA8H7xZmzBW.png)
            
            - Es antisimétrica cuando la única relación simétrica es la de la diagonal, el nodo consigo mismo.
    - Definición de relación transitiva ↓
        - $R \text{ es transitiva }\Leftrightarrow x,y,z \in A,[(x,y)\in R \wedge(y,z)\in R \Rightarrow (x,z)\in R]$
            - 
                
                ![https://remnote-user-data.s3.amazonaws.com/cEXE_Q3i0-JFNjSkBE-MFTpFcCviR-orJXEXyETlJ0JqL_PT8YQUBA87ooDY0OsDH4xgh9SPb_1zOQj3Q9NSvHpBB0cOeOgScFzoJu6KIqUhVFXfGEvpn1j8AMkGEsly.png](https://remnote-user-data.s3.amazonaws.com/cEXE_Q3i0-JFNjSkBE-MFTpFcCviR-orJXEXyETlJ0JqL_PT8YQUBA87ooDY0OsDH4xgh9SPb_1zOQj3Q9NSvHpBB0cOeOgScFzoJu6KIqUhVFXfGEvpn1j8AMkGEsly.png)
                
            - Si existe una trayectoria de longitud 2 entre $x$ y $z$, entonces existe una trayectoria de longitud 1 entre ellos.
        - $R \text{ es atransitiva }\Leftrightarrow x,y,z \in A,[(x,y)\in R \wedge(y,z)\in R \Rightarrow (x,z)\notin R]$
            - 
                
                ![https://remnote-user-data.s3.amazonaws.com/FR_jeqvTvxgv8L3snOVQn7_VtIYqVyF10Yeu4jzM_BhR-ZsQR3D2cFMHGqAYAugkgheWIbUpZh81v2-JYtu32sA-VQ2OtlztwrBkDffcq-edKIZp4FJTnqbdsTomnyeg.png](https://remnote-user-data.s3.amazonaws.com/FR_jeqvTvxgv8L3snOVQn7_VtIYqVyF10Yeu4jzM_BhR-ZsQR3D2cFMHGqAYAugkgheWIbUpZh81v2-JYtu32sA-VQ2OtlztwrBkDffcq-edKIZp4FJTnqbdsTomnyeg.png)
                
    - Cómo determino analíticamente la transitividad? ↓
        
        ![https://remnote-user-data.s3.amazonaws.com/AbP66-FJ4oIzdIiyF10qsj4evPkV6jxdeZKkNpSdQSXTs46cxyTX2Uugj5bNxMDSz_EspzJjwQ58ExdvKQkgM3zxuO41m-CEt2QNJDqEYkdvjL32E155EWQDnh_-mixQ.png](https://remnote-user-data.s3.amazonaws.com/AbP66-FJ4oIzdIiyF10qsj4evPkV6jxdeZKkNpSdQSXTs46cxyTX2Uugj5bNxMDSz_EspzJjwQ58ExdvKQkgM3zxuO41m-CEt2QNJDqEYkdvjL32E155EWQDnh_-mixQ.png)
        
        - Veo primero la matriz de $R^2$, y si hay trayectoria de longitud 2, entonces tiene que haber trayectoria de longitud 1 en la matriz de $R$