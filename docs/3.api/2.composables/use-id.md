---
title: "useId"
description: 生成一个适用于 SSR 的唯一标识符，可以传递给可访问性属性。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/id.ts
    size: xs
---

::important
这个 composable 自 [Nuxt v3.10](/blog/v3-10#ssr-safe-accessible-unique-id-creation) 起可用。
::

`useId` 生成一个适用于 SSR 的唯一标识符，可以传递给可访问性属性。

在组件的顶级调用 `useId` 来生成一个唯一的字符串标识符：

```vue [components/EmailField.vue]
<script setup lang="ts">
const id = useId()
</script>

<template>
  <div>
    <label :for="id">Email</label>
    <input :id="id" name="email" type="email" />
  </div>
</template>
```

::note
`useId` 必须在具有单个根元素的组件中使用，因为它使用这个根元素的属性将 id 从服务器传递到客户端。
::

## 参数

`useId` 不接受任何参数。

## 返回值

`useId` 返回与这个特定 `useId` 调用相关的特定组件的唯一字符串。
