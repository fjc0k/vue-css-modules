English | [🇨🇳中文](./README_zh-CN.md)

# Vue CSS Modules

<img src="./assets/logo.png" width="150" height="150" />

## CSS Modules: local scope & modular

[`CSS Modules`](https://github.com/css-modules/css-modules) assigns a local class a global unique name, so a component styles will not affect other components. e.g.

```css
/* button.css */
.button {
  font-size: 16px;
}
.mini {
  font-size: 12px;
}
```

It's will transformed to something similar to:

```css
/* button.css */
.button__button--d8fj3 {
  font-size: 16px;
}
.button__mini--f90jc {
  font-size: 12px;
}
```

When importing the CSS Module from a JS Module, it exports an object with all mappings from local names to global names. Just like this:

```javascript
import styles from './button.css'
// styles = {
//   button: 'button__button--d8fj3',
//   mini: 'button__mini--f90jc'
// }

element.innerHTML = '<button class="' + styles.button + ' ' + styles.mini + '" />'
```

## `vue-css-modules`: simplify mapping name

Here's a button component with CSS Modules:

```html
<template>
  <button :class="{
    'global-button-class-name': true,
    [styles.button]: true,
    [styles.mini]: mini
  }">Click me</button>
</template>

<script>
  import styles from './button.css'

  export default {
    props: { mini: Boolean },
    data: () => ({ styles })
  }
</script>
```

Surely, CSS Modules is a good choice for Vue components. But here are a few disadvantages:

- You have to pass `styles` object into `data` function.
- You have to use `styles.localClassName` importing a global class name.
- If there are other global class names, you have to put them together.
- If you want to bind a class name to a component property value, you have to explicitly specify the property name, even if the class name is equals the property name.

Now, you can use `vue-css-modules` to remake it:

```html
<template>
  <button
    class="global-button-class-name"
    styleName="button :mini">
    Click me
  </button>
</template>

<script>
  import CSSModules from 'vue-css-modules'
  import styles from './button.css'

  export default {
    mixins: [CSSModules(styles)],
    props: { mini: Boolean }
  }
</script>
```

Using `vue-css-modules`:

- You don't need pass `styles` object into `data` function, but the `CSSModules` mixin. 🌝
- You can completely say byebye to `styles.localClassName`.
- There is clear distinction between global CSS and CSS Modules.
- You can use the `:` modifier to bind the property with the same name.

## Modifiers

### @button

```html
<button styleName="@button">Button</button>
```

This is the equivalent to:

```html
<button styleName="button" data-component-button="true">Button</button>
```

This allows you to override component styles in context:

```css
.form [data-component-button] {
  font-size: 20px;
}
```

### $type

```html
<button styleName="$type">Button</button>
```

This is the equivalent to:

```html
<button :styleName="type">Button</button>
```

### :mini

```html
<button styleName=":mini">Button</button>
```

This is the equivalent to:

```html
<button :styleName="mini ? 'mini' : ''">Button</button>
```

### disabled=isDisabled

```html
<button styleName="disabled=isDisabled">Button</button>
```

This is the equivalent to:

```html
<button :styleName="isDisabled ? 'disabled' : ''">Button</button>
```

## Usage

### In templates

#### CSS Modules outside the template

```html
<template>
  <button
    class="global-button-class-name"
    styleName="button :mini">
    Click me
  </button>
</template>

<script>
  import CSSModules from 'vue-css-modules'
  import styles from './button.css'

  export default {
    mixins: [CSSModules(styles)],
    props: { mini: Boolean }
  }
</script>
```

#### CSS Modules inside the template

```html
<template>
  <button
    class="global-button-class-name"
    styleName="button :mini">
    Click me
  </button>
</template>

<script>
  import CSSModules from 'vue-css-modules'

  export default {
    mixins: [CSSModules()],
    props: { mini: Boolean }
  }
</script>

<style module>
  .button {
    font-size: 16px;
  }
  .mini {
    font-size: 12px;
  }
</style>
```

### In JSX

```javascript
import CSSModules from 'vue-css-modules'
import styles from './button.css'

export default {
  mixins: [CSSModules(styles)],
  props: { mini: Boolean },
  render() {
    return (
      <button styleName="@button :mini">Click me</button>
    )
  }
}
```

### In render functions

```javascript
import CSSModules from 'vue-css-modules'
import styles from './button.css'

export default {
  mixins: [CSSModules(styles)],
  props: { mini: Boolean },
  render(h) {
    return h('button', {
      styleName: '@button :mini'
    }, 'Click me')
  }
}
```

## The implementation

`vue-css-modules` extends `$createElement` method of the current component. It will use the value of `styleName` in `data` or `data.attrs` to look for CSS Modules in the associated styles object and will prepend the matching unique CSS class names to the `data.staticClass` value.
