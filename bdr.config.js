module.exports = {
  entry: {
    'vue-css-modules': [
      'src/index.js',
      'VueCSSModules'
    ]
  },
  getUmdMinSize(rawSize, gzippedSize) {
    const path = require('path')
    const fs = require('fs')

    const tasks = [
      ['README.md', /[^-]+(?=-blue\.svg\?MIN)/, /[^-]+(?=-blue\.svg\?MZIP)/],
      ['README_zh-CN.md', /[^-]+(?=-blue\.svg\?MIN)/, /[^-]+(?=-blue\.svg\?MZIP)/]
    ]

    tasks.forEach(task => {
      const filePath = path.resolve(__dirname, task[0])
      const content = fs.readFileSync(filePath)
      fs.writeFileSync(
        filePath,
        String(content)
          .replace(task[1], encodeURIComponent(rawSize))
          .replace(task[2], encodeURIComponent(gzippedSize))
      )
    })
  }
}
