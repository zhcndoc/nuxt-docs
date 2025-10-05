---
title: useRuntimeHook
description: 在 Nuxt 应用中注册一个运行时钩子，并在作用域销毁时确保其被正确释放。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/runtime-hook.ts
    size: xs
---

::important
此组合式函数在 Nuxt v3.14+ 可用。
::

```ts [signature]
function useRuntimeHook<THookName extends keyof RuntimeNuxtHooks> (
  name: THookName,
  fn: RuntimeNuxtHooks[THookName] extends HookCallback ? RuntimeNuxtHooks[THookName] : never
): void
```

## 用法

### 参数

- `name`: 要注册的运行时钩子名称。您可以在此处查看完整的 [运行时 Nuxt 钩子](/docs/4.x/api/advanced/hooks#app-hooks-runtime)。
- `fn`: 钩子触发时要执行的回调函数。函数签名会根据钩子名称而不同。

### 返回值

该组合式函数不会返回值，但在组件的作用域销毁时会自动取消注册该钩子。

## 示例

```vue twoslash [pages/index.vue]
<script setup lang="ts">
// 注册一个在每次预取链接时运行的钩子，且在组件卸载时会自动清理（不会再次被调用）
useRuntimeHook('link:prefetch', (link) => {
  console.log('Prefetching', link)
})
</script>
```