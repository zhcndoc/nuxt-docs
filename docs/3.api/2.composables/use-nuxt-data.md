---
title: 'useNuxtData'
description: '访问数据获取组合式 API 当前缓存的值。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
`useNuxtData` 让您能够访问带有显式提供的键的 [`useAsyncData`](/docs/api/composables/use-async-data)、[`useLazyAsyncData`](/docs/api/composables/use-lazy-async-data)、[`useFetch`](/docs/api/composables/use-fetch) 和 [`useLazyFetch`](/docs/api/composables/use-lazy-fetch) 的当前缓存值。
::

## 使用方法

`useNuxtData` 组合式 API 用于访问数据获取组合式 API（如 `useAsyncData`、`useLazyAsyncData`、`useFetch` 和 `useLazyFetch`）的当前缓存值。通过提供在数据获取过程中使用的键，您可以获取缓存的数据并根据需要使用它。

这在通过重用已获取的数据或实现乐观更新或级联数据更新等功能来优化性能时特别有用。

要使用 `useNuxtData`，请确保数据获取组合式 API（`useFetch`、`useAsyncData` 等）已使用显式提供的键进行调用。

## 参数

- `key`: 用于标识缓存数据的唯一键。此键应与原始数据获取时使用的键匹配。

## 返回值

- `data`: 一个指向与提供的键关联的缓存数据的响应式引用。如果没有缓存数据，值将为 `null`。如果缓存数据发生变化，这个 `Ref` 会自动更新，从而在您的组件中实现无缝反应。

## 示例

下面的示例展示了如何在从服务器获取最新数据时使用缓存数据作为占位符。

```vue [pages/posts.vue]
<script setup lang="ts">
// 我们可以稍后使用 'posts' 键访问相同的数据
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
    // 从缓存中查找单个帖子并将其设置为默认值。
    return posts.value.find(post => post.id === route.params.id)
  }
})
</script>
```

## 乐观更新

下面的示例展示了如何使用 useNuxtData 实现乐观更新。

乐观更新是一种技术，其中用户界面会立即更新，假设服务器操作将成功。如果操作最终失败，用户界面将回滚到先前的状态。

```vue [pages/todos.vue]
<script setup lang="ts">
// 我们可以稍后使用 'todos' 键访问相同的数据
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
      // 存储之前的缓存值以便在获取失败时恢复。
      previousTodos = todos.value

      // 乐观更新 todos。
      todos.value = [...todos.value, newTodo.value]
    },
    onResponseError () {
      // 如果请求失败，回滚数据。
      todos.value = previousTodos
    },
    async onResponse () {
      // 如果请求成功，后台使 todos 无效。
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