---
title: useRuntimeHook
description: 在 Nuxt 应用程序中注册一个运行时钩子，并确保在作用域被销毁时正确清理它。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/runtime-hook.ts
    size: xs
---

::important
此组合式在 Nuxt v3.14+ 中可用。
::

```ts [signature]
function useRuntimeHook<THookName extends keyof RuntimeNuxtHooks>(
  name: THookName,
  fn: RuntimeNuxtHooks[THookName] extends HookCallback ? RuntimeNuxtHooks[THookName] : never
): void
```

## 用法

### 参数

- `name`: 要注册的运行时钩子的名称。您可以在 [此处查看完整的运行时 Nuxt 钩子列表](/docs/api/advanced/hooks#app-hooks-runtime)。
- `fn`: 当钩子被触发时执行的回调函数。函数签名根据钩子名称而有所不同。

### 返回值

此组合式不返回值，但当组件的作用域被销毁时，它会自动注销钩子。

## 示例

```vue twoslash [pages/index.vue]
<script setup lang="ts">
// 注册一个每次预获取链接时运行的钩子，但在组件卸载时
// 会自动清理（并且不会再次调用）
useRuntimeHook('link:prefetch', (link) => {
  console.log('预获取', link)
})
</script>
```