---
title: "usePreviewMode"
description: "使用 usePreviewMode 在 Nuxt 中检测和控制预览模式"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preview.ts
    size: xs
---

# `usePreviewMode`

预览模式允许你查看更改在在线站点上如何显示，而不会向用户公开这些更改。

你可以使用内置的 `usePreviewMode` 组合式函数在 Nuxt 中访问和控制预览状态。如果该组合式函数检测到预览模式，它会自动强制任何 [`useAsyncData`](/docs/api/composables/use-async-data) 和 [`useFetch`](/docs/api/composables/use-fetch) 的更新以重新渲染预览内容。

```js
const { enabled, state } = usePreviewMode()
```

## 选项

### 自定义 `enable` 检查

你可以指定自定义的方式来启用预览模式。默认情况下，如果 URL 中存在且等于 `true` 的 `preview` 参数（例如，`http://localhost:3000?preview=true`），`usePreviewMode` 组合式函数会启用预览模式。你可以将 `usePreviewMode` 封装成自定义组合式函数，以保持使用中的选项一致，避免任何错误。

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

`usePreviewMode` 会尝试将 URL 中的 `token` 参数的值存储在状态中。你可以修改这个状态，这个状态将在所有 [`usePreviewMode`](/docs/api/composables/use-preview-mode) 调用中可用。

```js
const data1 = ref('data1')

const { enabled, state } = usePreviewMode({
  getState: (currentState) => {
    return { data1, data2: 'data2' }
  }
})
```

::note
`getState` 函数会将返回的值追加到当前状态中，因此请注意不要意外覆盖重要状态。
::

### 自定义 `onEnable` 和 `onDisable` 回调

默认情况下，当启用 `usePreviewMode` 时，它会调用 `refreshNuxtData()` 来重新从服务器获取所有数据。

当禁用预览模式时，该组合式函数会附加一个回调，在随后的路由导航后调用 `refreshNuxtData()`。

你可以通过为 `onEnable` 和 `onDisable` 选项提供自定义函数，指定自定义回调。

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
    一些基础内容
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

现在你可以生成站点并进行服务：

```bash [Terminal]
npx nuxt generate
npx nuxt preview
```

然后，你可以通过在要查看的页面末尾添加查询参数 `preview` 来访问预览页面：

```js
?preview=true
```

::note
`usePreviewMode` 应该在本地使用 `nuxt generate` 然后 `nuxt preview` 进行测试，而不是使用 `nuxt dev`。（[preview 命令](/docs/api/commands/preview) 与预览模式无关。）
::
