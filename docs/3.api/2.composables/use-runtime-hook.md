---
title: useRuntimeHook
description: 在 Nuxt 应用程序中注册一个运行时钩子，并确保在作用域被销毁时正确处理。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/runtime-hook.ts
    size: xs
---

::important
此可组合组件在 Nuxt v3.14+ 中可用。
::

```ts [signature]
function useRuntimeHook<THookName extends keyof RuntimeNuxtHooks>(
  name: THookName,
  fn: RuntimeNuxtHooks[THookName] extends HookCallback ? RuntimeNuxtHooks[THookName] : never
): void
```

## 用法

### 参数

- `name`: 要注册的运行时钩子的名称。您可以在这里查看完整的 [运行时 Nuxt 钩子列表](/docs/api/advanced/hooks#app-hooks-runtime)。
- `fn`: 当钩子被触发时要执行的回调函数。函数签名根据钩子名称而有所不同。

### 返回值

该组合式函数不返回值，但在组件的作用域被销毁时会自动注销钩子。

## 示例

```vue twoslash [pages/index.vue]
<script setup lang="ts">
// Register a hook that runs every time a link is prefetched, but which will be
// automatically cleaned up (and not called again) when the component is unmounted
useRuntimeHook('link:prefetch', (link) => {
  console.log('Prefetching', link)
})
</script>
```
