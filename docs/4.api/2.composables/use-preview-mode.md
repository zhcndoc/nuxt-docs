---
title: "usePreviewMode"
description: "在 Nuxt 中使用 usePreviewMode 检查和控制预览模式"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preview.ts
    size: xs
---

# `usePreviewMode`

预览模式允许你在不向用户公开更改的情况下查看这些更改在网站上的显示效果。

你可以使用内置的 `usePreviewMode` 组合式函数来访问和控制 Nuxt 中的预览状态。如果该组合式函数检测到预览模式，它会自动强制任何必要的更新，以便 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 和 [`useFetch`](/docs/4.x/api/composables/use-fetch) 重新渲染预览内容。

```ts
const { enabled, state } = usePreviewMode()
```

## 选项

### 自定义 `enable` 检查

你可以指定自定义的启用预览模式的方式。默认情况下，如果 URL 中存在一个等于 `true` 的 `preview` 参数（例如 `http://localhost:3000?preview=true`），`usePreviewMode` 组合式函数会启用预览模式。你可以将 `usePreviewMode` 包装到自定义组合式函数中，以在不同使用场景中保持选项一致并防止任何错误。

```ts
export function useMyPreviewMode () {
  const route = useRoute()
  return usePreviewMode({
    shouldEnable: () => {
      return !!route.query.customPreview
    },
  })
}
```

### 修改默认状态

`usePreviewMode` 会尝试将 URL 中的 `token` 参数的值存储到状态中。你可以修改此状态，并且它将在所有 [`usePreviewMode`](/docs/4.x/api/composables/use-preview-mode) 调用中可用。

```ts
const data1 = ref('data1')

const { enabled, state } = usePreviewMode({
  getState: (currentState) => {
    return { data1, data2: 'data2' }
  },
})
```

::note
`getState` 函数会将返回的值追加到当前状态中，因此请注意不要意外覆盖重要的状态。
::

### 自定义 `onEnable` 和 `onDisable` 回调

默认情况下，当启用 `usePreviewMode` 时，它会调用 `refreshNuxtData()` 来重新从服务器获取所有数据。

当禁用预览模式时，该组合式函数会在随后的路由导航后附加一个回调以调用 `refreshNuxtData()`。

你可以通过为 `onEnable` 和 `onDisable` 选项提供自定义函数来指定自定义回调。

```ts
const { enabled, state } = usePreviewMode({
  onEnable: () => {
    console.log('preview mode has been enabled')
  },
  onDisable: () => {
    console.log('preview mode has been disabled')
  },
})
```

## 示例

下面的示例创建了一个页面，其中部分内容仅在预览模式下渲染。

```vue [app/pages/some-page.vue]
<script setup>
const { enabled, state } = usePreviewMode()

const { data } = await useFetch('/api/preview', {
  query: {
    apiKey: state.token,
  },
})
</script>

<template>
  <div>
    Some base content
    <p v-if="enabled">
      Only preview content: {{ state.token }}
      <br>
      <button @click="enabled = false">
        disable preview mode
      </button>
    </p>
  </div>
</template>
```

现在你可以生成站点并进行预览：

```bash [Terminal]
npx nuxt generate
npx nuxt preview
```

然后你可以通过在要查看的页面末尾添加查询参数 `preview` 来查看你的预览页面，例如 `http://localhost:3000/?preview=true`。

::note
`usePreviewMode` 应当在本地通过 `nuxt generate` 然后 `nuxt preview` 进行测试，而不是通过 `nuxt dev`。（[preview 命令](/docs/4.x/api/commands/preview) 与预览模式无关。）
::