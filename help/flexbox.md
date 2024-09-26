# Guía de Clases Flexbox en Tailwind CSS

## 1. Flex Container
Estas clases se usan para convertir un contenedor en un contenedor flexible.

| Clase          | Descripción                              |
| -------------- | ---------------------------------------- |
| `flex`         | Aplica `display: flex` al contenedor.    |
| `inline-flex`  | Aplica `display: inline-flex` al contenedor. |

## 2. Flex Direction
Define la dirección del eje principal (horizontal o vertical).

| Clase              | Descripción                                            |
| ------------------ | ------------------------------------------------------ |
| `flex-row`         | Coloca los elementos en una fila horizontal (por defecto). |
| `flex-row-reverse` | Coloca los elementos en una fila, pero invertida.       |
| `flex-col`         | Coloca los elementos en una columna vertical.           |
| `flex-col-reverse` | Coloca los elementos en una columna invertida.          |

## 3. Flex Wrap
Controla si los elementos deben ajustarse o no cuando no hay espacio suficiente.

| Clase             | Descripción                                  |
| ----------------- | -------------------------------------------- |
| `flex-wrap`       | Permite que los elementos se ajusten a la siguiente línea. |
| `flex-wrap-reverse`| Ajusta los elementos, pero en orden inverso. |
| `flex-nowrap`     | Evita que los elementos se ajusten.           |

## 4. Align Items
Alinea los elementos hijos a lo largo del eje transversal (perpendicular al eje principal).

| Clase           | Descripción                                             |
| --------------- | ------------------------------------------------------- |
| `items-start`   | Alinea los elementos al inicio del contenedor (arriba).  |
| `items-end`     | Alinea los elementos al final del contenedor (abajo).    |
| `items-center`  | Alinea los elementos al centro del contenedor.           |
| `items-baseline`| Alinea los elementos según su línea base de texto.       |
| `items-stretch` | Estira los elementos para llenar el contenedor (por defecto). |

## 5. Justify Content
Alinea los elementos a lo largo del eje principal (horizontal o vertical, según la dirección).

| Clase                | Descripción                                         |
| -------------------- | --------------------------------------------------- |
| `justify-start`      | Alinea los elementos al inicio del eje principal.    |
| `justify-end`        | Alinea los elementos al final del eje principal.     |
| `justify-center`     | Alinea los elementos al centro del eje principal.    |
| `justify-between`    | Distribuye los elementos con espacio entre ellos.    |
| `justify-around`     | Distribuye los elementos con espacio alrededor de ellos. |
| `justify-evenly`     | Distribuye los elementos con igual espacio entre ellos. |

## 6. Align Content
Alinea las líneas del contenedor flexible cuando hay múltiples líneas.

| Clase              | Descripción                                            |
| ------------------ | ------------------------------------------------------ |
| `content-start`    | Alinea las líneas al inicio del contenedor.             |
| `content-end`      | Alinea las líneas al final del contenedor.              |
| `content-center`   | Alinea las líneas al centro del contenedor.             |
| `content-between`  | Distribuye las líneas con espacio entre ellas.          |
| `content-around`   | Distribuye las líneas con espacio alrededor de ellas.   |
| `content-evenly`   | Distribuye las líneas con igual espacio entre ellas.    |

## 7. Align Self
Permite anular la alineación de un elemento específico a lo largo del eje transversal.

| Clase              | Descripción                                            |
| ------------------ | ------------------------------------------------------ |
| `self-auto`        | Usa el valor predeterminado de `align-self`.            |
| `self-start`       | Alinea el elemento al inicio del contenedor.            |
| `self-end`         | Alinea el elemento al final del contenedor.             |
| `self-center`      | Alinea el elemento al centro del contenedor.            |
| `self-stretch`     | Estira el elemento para que llene el contenedor.        |
| `self-baseline`    | Alinea el elemento con la línea base de texto.          |

## 8. Flex Grow
Define cómo un elemento puede crecer en relación con los otros elementos flexibles.

| Clase        | Descripción                                     |
| ------------ | ----------------------------------------------- |
| `flex-grow`  | Permite que el elemento crezca si es necesario. |
| `flex-grow-0`| Evita que el elemento crezca.                   |

## 9. Flex Shrink
Controla cómo un elemento puede reducirse en relación con los otros elementos flexibles.

| Clase          | Descripción                                         |
| -------------- | --------------------------------------------------- |
| `flex-shrink`  | Permite que el elemento se reduzca si es necesario. |
| `flex-shrink-0`| Evita que el elemento se reduzca.                   |

## 10. Flex Basis
Establece el tamaño inicial de un elemento antes de que se distribuya el espacio restante.

| Clase              | Descripción                                            |
| ------------------ | ------------------------------------------------------ |
| `basis-auto`       | Usa el valor predeterminado para `flex-basis`.          |
| `basis-1` a `basis-96` | Define el tamaño en unidades de Tailwind (`rem`).   |
| `basis-full`       | Hace que el elemento ocupe el 100% del contenedor.      |
| `basis-1/2`, `basis-1/3`, etc. | Define fracciones del tamaño del contenedor. |

## 11. Order
Controla el orden de los elementos en el contenedor flexible.

| Clase         | Descripción                                   |
| ------------- | --------------------------------------------- |
| `order-1` a `order-12` | Cambia el orden de los elementos.    |
| `order-first` | Mueve el elemento al principio del contenedor.|
| `order-last`  | Mueve el elemento al final del contenedor.    |
| `order-none`  | Usa el orden por defecto.                    |

## 12. Flex (Combinación de Grow, Shrink y Basis)
Controla cómo un elemento puede crecer y reducirse en relación con los otros elementos flexibles.

| Clase        | Descripción                                      |
| ------------ | ------------------------------------------------ |
| `flex-1`     | Equivalente a `flex-grow: 1`, `flex-shrink: 1`, y `flex-basis: 0%`. |
| `flex-auto`  | Equivalente a `flex-grow: 1`, `flex-shrink: 1`, y `flex-basis: auto`. |
| `flex-initial`| Equivalente a `flex-grow: 0`, `flex-shrink: 1`, y `flex-basis: auto`. |
| `flex-none`  | Equivalente a `flex-grow: 0`, `flex-shrink: 0`, y `flex-basis: auto`. |
