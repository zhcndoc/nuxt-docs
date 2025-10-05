---
title: 'updateAppConfig'
description: '在运行时更新应用配置。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/config.ts
    size: xs
---

::note
使用深度赋值更新 [`app.config`](/docs/4.x/guide/directory-structure/app-config)。现有的（嵌套的）属性将被保留。
::

## 用法

```js
import { updateAppConfig, useAppConfig } from '#imports'

const appConfig = useAppConfig() // { foo: 'bar' }

const newAppConfig = { foo: 'baz' }
updateAppConfig(newAppConfig)

console.log(appConfig) // { foo: 'baz' }
```

:read-more{to="/docs/4.x/guide/directory-structure/app-config"}