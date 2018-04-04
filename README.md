# Vue CSS Modules

<img src="./assets/logo.png" width="150" height="150" />

> Inspired by [react-css-modules](https://github.com/gajus/react-css-modules).

Vue CSS Modules implement automatic mapping of CSS modules. Every CSS class is assigned a local-scoped identifier with a global unique name. CSS Modules enable a modular and reusable CSS!

## CSS Modules

[CSS Modules](https://github.com/css-modules/css-modules) are awesome. If you are not familiar with CSS Modules, it is a concept of using a module bundler such as webpack to load CSS scoped to a particular document. CSS module loader will generate a unique name for each CSS class at the time of loading the CSS document ([Interoperable CSS](https://github.com/css-modules/icss) to be precise). To see CSS Modules in practice, [webpack-demo](https://css-modules.github.io/webpack-demo/).

In the template of Vue, CSS Modules look like this:

```html
<template>
  <div :class="$style.button">
    <div :class="$style.icon">⭐</div>
    <div :class="$style.text">OK</div>
  </div>
</template>

<style module>
  /* CSS here */
</style>
```

Rendering the component will produce a markup similar to:
```html
<div class="button__button--34id2">
  <div class="button__icon--eep9s">⭐</div>
  <div class="button__text--d26bd">OK</div>
</div>
```

and a corresponding CSS file that matches those CSS classes.

Awesome!

### vue-loader

[CSS Modules](https://github.com/css-modules/css-modules) is a specification that can be implemented in multiple ways. In Vue, here has an official tool: [vue-loader](https://github.com/vuejs/vue-loader/).

## What's the Problem?

The [vue-loader](https://github.com/vuejs/vue-loader/) itself has several disadvantages:

- You can only use `$style` in Vue template files, i.e. `.vue` files.
- You have to use `$style` object whenever constructing a `className`.
- Mixing CSS Modules and global CSS classes is cumbersome.

Vue CSS Modules component automates loading of CSS Modules using `styleName` property, e.g.

In Vue template:

```html
<template>
  <div styleName="button">
    <div styleName="icon">⭐</div>
    <div styleName="text">OK</div>
  </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import styles from '../styles/button.css'

export default {
  name: 'button',
  mixins: [
    CSSModules(styles)
  ]
}
</script>
```

In Vue JSX:

```js
import CSSModules from 'vue-css-modules'
import styles from '../styles/button.css'

export default {
  name: 'button',
  mixins: [
    CSSModules(styles)
  ],
  render() {
    return (
      <div styleName="button">
        <div styleName="icon">⭐</div>
        <div styleName="text">OK</div>
      </div>
    )
  }
}
```

In Vue render functions:

```js
import CSSModules from 'vue-css-modules'
import styles from '../styles/button.css'

export default {
  name: 'button',
  mixins: [
    CSSModules(styles)
  ],
  render(h) {
    return h('div', { styleName: 'button' }, [
      h('div', { styleName: 'icon' }, '⭐'),
      h('div', { styleName: 'text' }, 'OK')
    ])
  }
}
```

## The Implementation

`vue-css-modules` extends `$createElement` method of the current component. It will use the value of `styleName` in `data` or `data.attrs` to look for CSS Modules in the associated styles object and will append the matching unique CSS class names to the `data.staticClass` property value.
