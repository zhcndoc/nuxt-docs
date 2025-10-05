---
title: 'useNuxtData'
description: '访问数据获取组合函数的当前缓存值。'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
`useNuxtData` 让你访问使用显式提供的 key 的 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)、[`useLazyAsyncData`](/docs/4.x/api/composables/use-lazy-async-data)、[`useFetch`](/docs/4.x/api/composables/use-fetch) 和 [`useLazyFetch`](/docs/4.x/api/composables/use-lazy-fetch) 的当前缓存值。
::

## 用法

`useNuxtData` 组合函数用于访问数据获取组合函数（例如 `useAsyncData`、`useLazyAsyncData`、`useFetch` 和 `useLazyFetch`）的当前缓存值。通过提供在数据获取期间使用的键（key），你可以检索缓存的数据并按需使用它。

这对于通过重用已获取的数据来优化性能或实现诸如乐观更新（Optimistic Updates）或级联数据更新之类的功能特别有用。

要使用 `useNuxtData`，请确保用于获取数据的组合函数（`useFetch`、`useAsyncData` 等）已使用显式提供的 key 被调用。

:video-accordion{title="观看来自 LearnVue 的有关 useNuxtData 的视频" videoId="e-_u6swXRWk"}

## 参数

- `key`：标识缓存数据的唯一键。此键应与原始数据获取时使用的键匹配。

## 返回值

- `data`：指向与提供的 key 关联的缓存数据的响应式引用（Ref）。如果没有缓存的数据，则该值为 `null`。当缓存数据更改时，该 `Ref` 会自动更新，从而在组件中实现无缝的响应性。

## 示例

下面的示例展示了如何在从服务器获取最新数据时使用缓存数据作为占位符。

```vue [app/pages/posts.vue]
<script setup lang="ts">
// 我们可以使用 'posts' 键在稍后访问相同的数据
const { data } = await useFetch('/api/posts', { key: 'posts' })
</script>
```

```vue [app/pages/posts/[id\\].vue]
<script setup lang="ts">
// 访问 posts.vue（父路由）中 useFetch 的缓存值
const { data: posts } = useNuxtData('posts')

const route = useRoute()

const { data } = useLazyFetch(`/api/posts/${route.params.id}`, {
  key: `post-${route.params.id}`,
  default () {
    // 从缓存中查找单个文章并将其设置为默认值。
    return posts.value.find(post => post.id === route.params.id)
  },
})
</script>
```

## 乐观更新

下面的示例展示了如何使用 useNuxtData 实现乐观更新（Optimistic Updates）。

乐观更新是一种技术，界面会立即更新，假设服务器操作会成功。如果操作最终失败，则界面会回滚到先前状态。

```vue [app/pages/todos.vue]
<script setup lang="ts">
// 我们可以使用 'todos' 键在稍后访问相同的数据
const { data } = await useAsyncData('todos', () => $fetch('/api/todos'))
</script>
```

```vue [app/components/NewTodo.vue]
<script setup lang="ts">
const newTodo = ref('')
let previousTodos = []

// 访问 todos.vue 中 useAsyncData 的缓存值
const { data: todos } = useNuxtData('todos')

async function addTodo () {
  await $fetch('/api/addTodo', {
    method: 'post',
    body: {
      todo: newTodo.value,
    },
    onRequest () {
      // 存储之前的缓存值，以便在请求失败时恢复。
      previousTodos = todos.value

      // 乐观地更新 todos。
      todos.value = [...todos.value, newTodo.value]
    },
    onResponseError () {
      // 如果请求失败，则回滚数据。
      todos.value = previousTodos
    },
    async onResponse () {
      // 如果请求成功，则在后台使 todos 失效（重新获取）。
      await refreshNuxtData('todos')
    },
  })
}
</script>
```

## 类型

```ts [Signature]
export function useNuxtData<DataT = any> (key: string): { data: Ref<DataT | undefined> }
```