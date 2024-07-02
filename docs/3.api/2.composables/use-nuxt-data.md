---
title: 'useNuxtData'
description: '访问数据获取组合组件的当前缓存值。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
`useNuxtData` 提供了访问 [`useAsyncData`](/docs/api/composables/use-async-data) 、 `useLazyAsyncData` 、 [`useFetch`](/docs/api/composables/use-fetch) 和 [`useLazyFetch`](/docs/api/composables/use-lazy-fetch) 的当前缓存值的便捷方式，并且需要提供显式的键。
::

## 使用

以下例子展示了如何使用缓存数据作为占位符，同时从服务器获取最新的数据。

```vue [pages/posts.vue]
<script setup lang="ts">
// 我们稍后可以使用 'posts' 键访问相同的数据
const { data } = await useFetch('/api/posts', { key: 'posts' })
</script>
```

```vue [pages/posts/[id\\].vue]
<script setup lang="ts">
// 访问 posts.vue（父路由）中 useFetch 的缓存值
const { id } = useRoute().params
const { data: posts } = useNuxtData('posts')
const { data } = useLazyFetch(`/api/posts/${id}`, {
  key: `post-${id}`,
  default() {
    // 从缓存中找到单个帖子并将其作为默认值。
    return posts.value.find(post => post.id === id)
  }
})
</script>
```

## 乐观更新

我们可以利用缓存来在后台数据失效时更新 UI。

```vue [pages/todos.vue]
<script setup lang="ts">
// 我们可以使用 'todos' 键稍后访问相同的数据
const { data } = await useAsyncData('todos', () => $fetch('/api/todos'))
</script>
```

```vue [components/NewTodo.vue]
<script setup lang="ts">
const newTodo = ref('')
const previousTodos = ref([])

// 访问 todos.vue 中的 useFetch 缓存值
const { data: todos } = useNuxtData('todos')

const { data } = await useFetch('/api/addTodo', {
  method: 'post',
  body: {
    todo: newTodo.value
  },
  onRequest () {
    previousTodos.value = todos.value // 存储先前缓存的值以在请求失败时恢复。

    todos.value.push(newTodo.value) // 乐观地更新待办事项。
  },
  onRequestError () {
    todos.value = previousTodos.value // 如果请求失败，回滚数据。
  },
  async onResponse () {
    await refreshNuxtData('todos') // 如果请求成功，在后台使待办事项失效。
  }
})
</script>
```

## 类型

```ts
useNuxtData<DataT = any> (key: string): { data: Ref<DataT | null> }
```
