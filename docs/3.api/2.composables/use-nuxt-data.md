---
title: 'useNuxtData'
description: '访问数据获取组合式 API 的当前缓存值。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
`useNuxtData` 让你可以访问 [`useAsyncData`](/docs/api/composables/use-async-data)、[`useLazyAsyncData`](/docs/api/composables/use-lazy-async-data)、[`useFetch`](/docs/api/composables/use-fetch) 和 [`useLazyFetch`](/docs/api/composables/use-lazy-fetch) 的当前缓存值，前提是提供了显式的关键字。
::

## 用法

`useNuxtData` 组合式 API 用于访问数据获取组合式 API（如 `useAsyncData`、`useLazyAsyncData`、`useFetch` 和 `useLazyFetch`）的当前缓存值。通过提供数据获取时使用的关键字，你可以获取缓存的数据并根据需要使用它。

这对于通过重用已获取的数据来优化性能或实现类似乐观更新或级联数据更新的特性特别有用。

使用 `useNuxtData` 时，确保已使用显式提供的关键字调用了数据获取组合式 API（如 `useFetch`、`useAsyncData` 等）。

## 参数

- `key`: 唯一键，用于标识缓存数据。该键应与原始数据获取期间使用的键匹配。

## 返回值

- `data`: 一个反应式引用，指向与提供的键关联的缓存数据。如果不存在缓存数据，则值为 `null`。此 `Ref` 会在缓存数据更改时自动更新，从而实现组件中的无缝响应式。

## 示例

以下示例展示了如何在从服务器获取最新数据时使用缓存数据作为占位符。

```vue [pages/posts.vue]
<script setup lang="ts">
// 我们可以使用 'posts' 关键字以后访问相同的数据
const { data } = await useFetch('/api/posts', { key: 'posts' })
</script>
```

```vue [pages/posts/[id\\].vue]
<script setup lang="ts">
// 访问 posts.vue 中 useFetch 的缓存值（父路由）
const { data: posts } = useNuxtData('posts')

const route = useRoute()

const { data } = useLazyFetch(`/api/posts/${route.params.id}`, {
  key: `post-${route.params.id}`,
  default() {
    // 从缓存中查找单个帖子并将其设置为默认值。
    return posts.value.find(post => post.id === route.params.id)
  }
})
</script>
```

## 乐观更新

以下示例展示了如何使用 useNuxtData 实现乐观更新。

乐观更新是一种技术，其中用户界面立即更新，假设服务器操作将成功。如果操作最终失败，用户界面将回滚到之前的状态。

```vue [pages/todos.vue]
<script setup lang="ts">
// 我们可以使用 'todos' 关键字以后访问相同的数据
const { data } = await useAsyncData('todos', () => $fetch('/api/todos'))
</script>
```

```vue [components/NewTodo.vue]
<script setup lang="ts">
const newTodo = ref('')
let previousTodos = []

// 访问 todos.vue 中 useAsyncData 的缓存值
const { data: todos } = useNuxtData('todos')

const addTodo = async () => {
  return $fetch('/api/addTodo', {
    method: 'post',
    body: {
      todo: newTodo.value
    },
    onRequest () {
      // 存储之前的缓存值以便在获取失败时恢复。
      previousTodos = todos.value

      // 乐观地更新 todos。
      todos.value = [...todos.value, newTodo.value]
    },
    onResponseError () {
      // 如果请求失败，回滚数据。
      todos.value = previousTodos
    },
    async onResponse () {
      // 如果请求成功，后台使 todos 失效。
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
