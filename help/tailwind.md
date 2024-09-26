# Clases Importantes de Posicionamiento y Tamaños de Contenedores en Tailwind CSS

## 1. Clases de Contenedor

La clase `.container` establece el ancho máximo de un elemento para coincidir con el ancho mínimo del breakpoint actual. Esto es útil si prefieres diseñar para un conjunto fijo de tamaños de pantalla.

| Clase         | Breakpoint | Propiedades       |
|---------------|------------|-------------------|
| `.container`  | Ninguno    | `width: 100%;`    |
| `sm` (640px)  |            | `max-width: 640px;` |
| `md` (768px)  |            | `max-width: 768px;` |
| `lg` (1024px) |            | `max-width: 1024px;` |
| `xl` (1280px) |            | `max-width: 1280px;` |
| `2xl` (1536px)|            | `max-width: 1536px;` |

### Uso Básico
Para centrar un contenedor, utiliza la clase `.mx-auto`.

```html
<div class="container mx-auto">
  <!-- Contenido aquí -->
</div>
```


