---
title: "usePreviewMode"
description: "使用 usePreviewMode 在 Nuxt 中检查和控制预览模式"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preview.ts
    size: xs
---

# `usePreviewMode`

预览模式允许您查看更改将如何在现场站点上显示，而不会向用户透露它们。

您可以使用内置的 `usePreviewMode` 组合工具来访问和控制 Nuxt 中的预览状态。如果组合工具检测到预览模式，它将自动强制任何必要的更新，以便为 [`useAsyncData`](/docs/api/composables/use-async-data) 和 [`useFetch`](/docs/api/composables/use-fetch) 重新渲染预览内容。

```js
const { enabled, state } = usePreviewMode()
```

## 选项

### 自定义 `enable` 检查

您可以为启用预览模式指定一种自定义方式。默认情况下，`usePreviewMode` 组合工具如果 url 中有一个 `preview` 参数，并且等于 `true`（例如，`http://localhost:3000?preview=true`），将启用预览模式。您可以将 `usePreviewMode` 组合工具包装到自定义组合工具中，以保持选项的一致性，并防止任何错误。

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

`usePreviewMode` 将尝试在状态中存储 url 中 `token` 参数的值。您可以修改此状态，并且它将在所有 [`usePreviewMode`](/docs/api/composables/use-preview-mode) 调用中可用。

```js
const data1 = ref('data1')

const { enabled, state } = usePreviewMode({
  getState: (currentState) => {
    return { data1, data2: 'data2' }
  }
})
```

::note
`getState` 函数将附加返回值到当前状态，因此请小心不要意外覆盖重要状态。
::

## 示例

下面的示例创建了一个页面，该页面的一部分内容仅在预览模式下渲染。

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
      仅预览内容: {{ state.token }}
      <br>
      <button @click="enabled = false">
        disable preview mode
      </button>
    </p>
  </div>
</template>
```

现在，您可以生成您的网站并为其提供服务：

```bash [Terminal]
npx nuxi generate
npx nuxi preview
```

现在您可以通过在您想看到的页面末尾添加查询参数 `preview` 来生成您的站点并提供它：

```js
?preview=true
```

::note
`usePreviewMode` 应该在使用 `nuxi generate` 然后 `nuxi preview` 而不是 `nuxi dev` 进行本地测试时进行测试。（[preview 命令](/docs/api/commands/preview)与预览模式不相关。）
::
