# Vue CSS Modules

<img src="./assets/logo.png" width="150" height="150" />

> Todo.

## The Implementation
`vue-css-modules` extends `$createElement` method of the current component. It will use the value of `styleName` in `data` or `data.attrs` to look for CSS Modules in the associated styles object and will append the matching unique CSS class names to the `data.staticClass` property value.
