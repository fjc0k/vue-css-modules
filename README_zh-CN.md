🇨🇳中文 | [English](./README.md)

# Vue CSS Modules

[![npm](https://img.shields.io/npm/v/vue-css-modules.svg?style=for-the-badge)](https://npm.im/vue-css-modules)
[![npm downloads](https://img.shields.io/npm/dt/vue-css-modules.svg?style=for-the-badge)](https://npm.im/vue-css-modules)
[![Travis](https://img.shields.io/travis/fjc0k/vue-css-modules.svg?style=for-the-badge)](https://travis-ci.org/fjc0k/vue-css-modules)
[![Codecov](https://img.shields.io/codecov/c/github/fjc0k/vue-css-modules.svg?style=for-the-badge)](https://codecov.io/gh/fjc0k/vue-css-modules)
[![minified size](https://img.shields.io/badge/minified%20size-1.87%20KB-blue.svg?MIN&style=for-the-badge)](https://github.com/fjc0k/vue-css-modules/blob/master/dist/vue-css-modules.min.js)
[![minzipped size](https://img.shields.io/badge/minzipped%20size-970%20B-blue.svg?MZIP&style=for-the-badge)](https://github.com/fjc0k/vue-css-modules/blob/master/dist/vue-css-modules.min.js)
[![license](https://img.shields.io/github/license/fjc0k/vue-css-modules.svg?style=for-the-badge)](https://github.com/fjc0k/vue-css-modules/blob/master/LICENSE)

顺滑地将 Vue 组件内的 CSS Modules 转换为全局类名。

```shell
yarn add vue-css-modules
```

CDN：[jsDelivr](//www.jsdelivr.com/package/npm/vue-css-modules) | [UNPKG](//unpkg.com/vue-css-modules/) (可通过 `window.VueCSSModules` 使用)

<img src="./assets/logo.png" width="150" height="150" />

## CSS Modules：局部作用域 & 模块化

[`CSS Modules`](https://github.com/css-modules/css-modules) 为每一个局部类赋予全局唯一的类名，这样组件样式间就不会相互影响了。如：

```css
/* button.css */
.button {
  font-size: 16px;
}
.mini {
  font-size: 12px;
}
```

它会被转换为类似这样：

```css
/* button.css */
.button__button--d8fj3 {
  font-size: 16px;
}
.button__mini--f90jc {
  font-size: 12px;
}
```

当导入一个 CSS 模块文件时，它会将局部类名到全局类名的映射对象提供给我们。就像这样：

```javascript
import styles from './button.css'
// styles = {
//   button: 'button__button--d8fj3',
//   mini: 'button__mini--f90jc'
// }

element.innerHTML = '<button class="' + styles.button + ' ' + styles.mini + '" />'
```

## `vue-css-modules`：简化类名映射

下面是一个使用了 CSS Modules 的按钮组件：

```html
<template>
  <button :class="{
    'global-button-class-name': true,
    [styles.button]: true,
    [styles.mini]: mini
  }">点我</button>
</template>

<script>
  import styles from './button.css'

  export default {
    props: { mini: Boolean },
    data: () => ({ styles })
  }
</script>
```

的确，CSS Modules 对于 Vue 组件是一个不错的选择。但也存在以下几点不足：

- 你必须在 `data` 中传入 `styles`
- 你必须使用 `styles.localClassName` 导入全局类名
- 如果有其他全局类名，你必须将它们放在一起
- 如果要和组件的属性值绑定，就算局部类名和属性名一样，也要显式指定

对于上面的按钮组件，使用 `vue-css-modules` 后：

```html
<template>
  <button
    class="global-button-class-name"
    styleName="button :mini">
    点我
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

现在：

- 你不必在 `data` 中传入 `styles`，但得在 `mixins` 中传入 `styles` 🌝
- 你可以跟 `styles.localClassName` 说拜拜了
- 将局部类名放在 `styleName` 属性，全局类名放在 `class` 属性，规整了许多
- 局部类名绑定组件同名属性，只需在其前面加上 `:` 修饰符

## 修饰符

### @button

```html
<button styleName="@button">按钮</button>
```

这等同于：

```html
<button styleName="button" data-component-button="true">按钮</button>
```

这让你能在外部重置组件的样式：

```css
.form [data-component-button] {
  font-size: 20px;
}
```

### $type

```html
<button styleName="$type">按钮</button>
```

这等同于：

```html
<button :styleName="type">按钮</button>
```

### :mini

```html
<button styleName=":mini">按钮</button>
```

这等同于：

```html
<button :styleName="mini ? 'mini' : ''">按钮</button>
```

### disabled=isDisabled

```html
<button styleName="disabled=isDisabled">按钮</button>
```

这等同于：

```html
<button :styleName="isDisabled ? 'disabled' : ''">按钮</button>
```

## 使用方法

### 在 Vue 模板中使用

#### 引入模板外部的 CSS 模块

```html
<template>
  <button
    class="global-button-class-name"
    styleName="button :mini">
    点我
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

#### 使用模板内部的 CSS 模块

```html
<template>
  <button
    class="global-button-class-name"
    styleName="button :mini">
    点我
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

### 在 Vue JSX 中使用

```javascript
import CSSModules from 'vue-css-modules'
import styles from './button.css'

export default {
  mixins: [CSSModules(styles)],
  props: { mini: Boolean },
  render() {
    return (
      <button styleName="@button :mini">点我</button>
    )
  }
}
```

### 在 Vue 渲染函数中使用

```javascript
import CSSModules from 'vue-css-modules'
import styles from './button.css'

export default {
  mixins: [CSSModules(styles)],
  props: { mini: Boolean },
  render(h) {
    return h('button', {
      styleName: '@button :mini'
    }, '点我')
  }
}
```

## 实现原理

`vue-css-modules` 注册了 [`beforeCreate`](https://cn.vuejs.org/v2/api/#beforeCreate) 钩子，在钩子中劫持了组件的渲染函数。对于传给渲染函数的参数，将会解析其 `data` 或 `data.attrs` 中的 `styleName` 属性生成全局类名字符串，并将它附着在 `data.staticClass` 值的后面。
