---
title: 'useNuxtData'
description: '访问数据获取组合式函数当前缓存的值。'
minimalVersion: "3.1"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
`useNuxtData` 让你访问使用显式提供的 key 的 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)、[`useLazyAsyncData`](/docs/4.x/api/composables/use-lazy-async-data)、[`useFetch`](/docs/4.x/api/composables/use-fetch) 和 [`useLazyFetch`](/docs/4.x/api/composables/use-lazy-fetch) 的当前缓存值。
::

## Usage

The `useNuxtData` composable is used to access the current cached value of data fetching composables such as `useAsyncData`, `useLazyAsyncData`, `useFetch`, and `useLazyFetch`. By providing the key used during data fetching, you can retrieve cached data and use it on demand.

This is particularly useful for optimizing performance by reusing already fetched data, or for implementing features such as optimistic updates or cascading data updates.

To use `useNuxtData`, make sure the data fetching composable (`useFetch`, `useAsyncData`, etc.) has been called with an explicitly provided key.

:video-accordion{title="Watch a video about useNuxtData from LearnVue" videoId="e-_u6swXRWk"}

## 类型

```ts [Signature]
export function useNuxtData<DataT = any> (key: string): { data: Ref<DataT | undefined> }
```

## 参数

- `key`：标识缓存数据的唯一键。此键应与原始数据获取时使用的键匹配。

## 返回值

- `data`: 关联到所提供键的缓存数据的响应式引用。如果不存在缓存数据，则该值将为 `undefined`。当缓存数据发生变化时，此 `Ref` 会自动更新，从而让组件中的响应式表现无缝衔接。

## Example

The following example shows how to use cached data as a placeholder while fetching the latest data from the server.

```vue [app/pages/posts.vue]
<script setup lang="ts">
// We can use the 'posts' key to access the same data later
const { data } = await useFetch('/api/posts', { key: 'posts' })
</script>
```

```vue [app/pages/posts/[id\\].vue]
<script setup lang="ts">
// Access the cached value of useFetch in posts.vue (parent route)
const { data: posts } = useNuxtData('posts')

const route = useRoute()

const { data } = useLazyFetch(`/api/posts/${route.params.id}`, {
  key: `post-${route.params.id}`,
  default () {
    // Find a single post in the cache and set it as the default value.
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
const { data } = await useAsyncData('todos', (_nuxtApp, { signal }) => $fetch('/api/todos', { signal }))
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
