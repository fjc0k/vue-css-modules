# Vue CSS Modules

<img src="./assets/logo.png" width="150" height="150" />

> Inspired by [react-css-modules](https://github.com/gajus/react-css-modules).

Vue CSS Modules implement automatic mapping of CSS modules. Every CSS class is assigned a local-scoped identifier with a global unique name. CSS Modules enable a modular and reusable CSS!

## CSS Modules

[CSS Modules](https://github.com/css-modules/css-modules) are awesome. If you are not familiar with CSS Modules, it is a concept of using a module bundler such as webpack to load CSS scoped to a particular document. CSS module loader will generate a unique name for each CSS class at the time of loading the CSS document ([Interoperable CSS](https://github.com/css-modules/icss) to be precise). To see CSS Modules in practice, [webpack-demo](https://css-modules.github.io/webpack-demo/).

In the template of Vue, CSS Modules look like this:

```html
<template>
  <div :class="[
    $style.button,
    $style[type],
    {
      [$style.loading]: loading,
      [$style.disabled]: isDisabled
    }
  ]">
    <div :class="$style.icon">⭐</div>
    <div :class="$style.text">OK</div>
  </div>
</template>

<script>
export default {
  name: 'my-button',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    loading: Boolean,
    disabled: Boolean
  },
  computed: {
    isDisabled() {
      return this.disabled || this.loading
    }
  }
}
</script>

<style module>
  /* CSS here */
</style>
```

Rendering the `<my-button />` will produce a markup similar to:
```html
<div class="button__button--34id2 button__primary--fi3pd">
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
  <div styleName="button $type :loading disabled=isDisabled">
    <div styleName="icon">⭐</div>
    <div styleName="text">OK</div>
  </div>
</template>
```

Using `vue-css-modules`:

- You do not need to refer to the `$style` object every time you use a CSS Module.
- There is clear distinction between global CSS and CSS Modules, e.g.
```html
<div class="global-css" styleName="local-module"></div>
```

## The Implementation

`vue-css-modules` extends `$createElement` method of the current component. It will use the value of `styleName` in `data` or `data.attrs` to look for CSS Modules in the associated styles object and will append the matching unique CSS class names to the `data.staticClass` property value.
