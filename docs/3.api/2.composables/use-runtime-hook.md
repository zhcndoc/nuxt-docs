---
title: useRuntimeHook
description: 在 Nuxt 应用中注册一个运行时钩子，并确保在作用域销毁时正确释放它。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/runtime-hook.ts
    size: xs
---

::important
此组合函数在 Nuxt v3.14 及以上版本中可用。
::

```ts [signature]
function useRuntimeHook<THookName extends keyof RuntimeNuxtHooks>(
  name: THookName,
  fn: RuntimeNuxtHooks[THookName] extends HookCallback ? RuntimeNuxtHooks[THookName] : never
): void
```

## 用法

### 参数

- `name`：要注册的运行时钩子名称。你可以在此处查看完整的[运行时 Nuxt 钩子列表](/docs/api/advanced/hooks#app-hooks-runtime)。
- `fn`：当钩子被触发时执行的回调函数。函数签名根据钩子名称有所不同。

### 返回值

该组合函数不返回值，但会在组件作用域销毁时自动注销该钩子。

## 示例

```vue twoslash [pages/index.vue]
<script setup lang="ts">
// 注册一个钩子，每当链接被预取时执行，
// 并且当组件卸载时会自动清理（不会再次调用）
useRuntimeHook('link:prefetch', (link) => {
  console.log('正在预取', link)
})
</script>
```