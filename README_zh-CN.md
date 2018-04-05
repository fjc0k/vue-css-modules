# Vue CSS Modules

<img src="./assets/logo.png" width="150" height="150" />

## 目的为何？

### CSS Modules：局部作用域 & 模块化

`CSS Modules` 为每一个局部类名产生全局唯一的类名，这样组件样式间就不会相互影响了。如：

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

### vue-css-modules：简化类名映射

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
