---
title: "usePreviewMode"
description: "使用 usePreviewMode 来检查和控制 Nuxt 中的预览模式"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preview.ts
    size: xs
---

# `usePreviewMode`

预览模式允许您查看更改在实时网站上的显示效果，而不向用户透露这些更改。

您可以使用内置的 `usePreviewMode` 组合式函数来访问和控制 Nuxt 中的预览状态。如果组合式函数检测到预览模式，它将自动强制 [`useAsyncData`](/docs/api/composables/use-async-data) 和 [`useFetch`](/docs/api/composables/use-fetch) 进行任何必要的更新以重新渲染预览内容。

```js
const { enabled, state } = usePreviewMode()
```

## 选项

### 自定义 `enable` 检查

您可以指定一种自定义方法来启用预览模式。默认情况下，如果 URL 中存在等于 `true` 的 `preview` 参数（例如，`http://localhost:3000?preview=true`），`usePreviewMode` 组合式函数将启用预览模式。您可以将 `usePreviewMode` 包装成自定义组合式函数，以保持选项在各个用法中的一致性，并防止任何错误。

```js
export function useMyPreviewMode () {
  return usePreviewMode({
    shouldEnable: () => {
      return !!route.query.customPreview
    }
  });
}
```

### 修改默认状态

`usePreviewMode` 将尝试在状态中存储 URL 中 `token` 参数的值。您可以修改此状态，它将在所有 [`usePreviewMode`](/docs/api/composables/use-preview-mode) 调用中可用。

```js
const data1 = ref('data1')

const { enabled, state } = usePreviewMode({
  getState: (currentState) => {
    return { data1, data2: 'data2' }
  }
})
```

::note
`getState` 函数将返回的值附加到当前状态，因此要小心，不要意外覆盖重要状态。
::

### 自定义 `onEnable` 和 `onDisable` 回调

默认情况下，当启用 `usePreviewMode` 时，它将调用 `refreshNuxtData()` 以重新从服务器获取所有数据。

当禁用预览模式时，组合式函数将附加一个回调，以在随后的路由导航后调用 `refreshNuxtData()`。

您可以通过为 `onEnable` 和 `onDisable` 选项提供自己的函数，来指定自定义回调。

```js
const { enabled, state } = usePreviewMode({
  onEnable: () => {
    console.log('预览模式已启用')
  },
  onDisable: () => {
    console.log('预览模式已禁用')
  }
})
```

## 示例

下面的示例创建了一个页面，其中部分内容仅在预览模式下渲染。

```vue [pages/some-page.vue]
<script setup>
const { enabled, state } = usePreviewMode()

const { data } = await useFetch('/api/preview', {
  query: {
    apiKey: state.token
  }
})
</script>

<template>
  <div>
    一些基本内容
    <p v-if="enabled">
      仅预览内容：{{ state.token }}
      <br>
      <button @click="enabled = false">
        禁用预览模式
      </button>
    </p>
  </div>
</template>
```

现在您可以生成您的网站并提供服务：

```bash [Terminal]
npx nuxi generate
npx nuxi preview
```

然后您可以通过将查询参数 `preview` 添加到您想查看的页面末尾来查看您的预览页面：

```js
?preview=true
```

::note
`usePreviewMode` 应在本地使用 `nuxi generate` 然后 `nuxi preview` 测试，而不是 `nuxi dev`。（[预览命令](/docs/api/commands/preview) 与预览模式无关。）
::