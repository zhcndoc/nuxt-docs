---
title: 'useNuxtData'
description: '访问数据获取组合函数当前缓存的值。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
`useNuxtData` 允许你访问带有显式提供的 key 的 [`useAsyncData`](/docs/api/composables/use-async-data)、[`useLazyAsyncData`](/docs/api/composables/use-lazy-async-data)、[`useFetch`](/docs/api/composables/use-fetch) 和 [`useLazyFetch`](/docs/api/composables/use-lazy-fetch) 的当前缓存值。
::

## 用法

`useNuxtData` 组合函数用于访问数据获取组合函数（如 `useAsyncData`、`useLazyAsyncData`、`useFetch` 和 `useLazyFetch`）当前缓存的值。通过提供在数据获取时使用的 key，你可以检索缓存数据并按需使用。

这对于优化性能非常有用，可以重用已获取的数据，或者实现乐观更新（Optimistic Updates）以及级联数据更新等功能。

使用 `useNuxtData` 时，请确保对应的数据获取组合函数（`useFetch`、`useAsyncData` 等）已使用显式提供的 key 被调用。

:video-accordion{title="观看 LearnVue 关于 useNuxtData 的视频" videoId="e-_u6swXRWk"}

## 参数

- `key`：标识缓存数据的唯一键。该键应与原始数据获取时使用的键相同。

## 返回值

- `data`：一个响应式引用，指向与提供的键相关联的缓存数据。如果没有缓存数据，则值为 `null`。该 `Ref` 会随着缓存数据的变化自动更新，使组件内的响应性无缝对接。

## 示例

以下示例展示了如何在从服务器获取最新数据时使用缓存数据作为占位符。

```vue [pages/posts.vue]
<script setup lang="ts">
// 我们可以通过 'posts' 键在后续访问相同数据
const { data } = await useFetch('/api/posts', { key: 'posts' })
</script>
```

```vue [pages/posts/[id\\].vue]
<script setup lang="ts">
// 访问 posts.vue（父路由）中 useFetch 的缓存值
const { data: posts } = useNuxtData('posts')

const route = useRoute()

const { data } = useLazyFetch(`/api/posts/${route.params.id}`, {
  key: `post-${route.params.id}`,
  default() {
    // 从缓存中找到对应的单条文章并设置为默认值。
    return posts.value.find(post => post.id === route.params.id)
  }
})
</script>
```

## 乐观更新

下面的示例展示如何使用 useNuxtData 实现乐观更新。

乐观更新是一种技术，用户界面会立即更新，假设服务器操作会成功。如果操作最终失败，界面会回滚到之前的状态。

```vue [pages/todos.vue]
<script setup lang="ts">
// 我们可以通过 'todos' 键在后续访问相同数据
const { data } = await useAsyncData('todos', () => $fetch('/api/todos'))
</script>
```

```vue [components/NewTodo.vue]
<script setup lang="ts">
const newTodo = ref('')
let previousTodos = []

// 访问 todos.vue 中 useAsyncData 的缓存值
const { data: todos } = useNuxtData('todos')

async function addTodo () {
  return $fetch('/api/addTodo', {
    method: 'post',
    body: {
      todo: newTodo.value
    },
    onRequest () {
      // 存储之前的缓存值，以防请求失败时恢复。
      previousTodos = todos.value

      // 乐观地更新 todos。
      todos.value = [...todos.value, newTodo.value]
    },
    onResponseError () {
      // 请求失败时回滚数据。
      todos.value = previousTodos
    },
    async onResponse () {
      // 请求成功后后台刷新 todos 的缓存数据。
      await refreshNuxtData('todos')
    }
  })
}
</script>
```

## 类型

```ts
useNuxtData<DataT = any> (key: string): { data: Ref<DataT | null> }
```
