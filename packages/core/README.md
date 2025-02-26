# frame

## Animation util for vue based on [Motion One](https://motion.dev/)

[![NPM version](https://img.shields.io/npm/v/@bryce-loskie/frame?color=a1b858&label=)](https://www.npmjs.com/package/@bryce-loskie/frame)

## Get Started

```bash
pnpm i @bryce-loskie/frame
```

## Usage

### 1. `Framer` component

```html
<template>
  <Framer appear :variants="variants">
    <div v-if="isShow" i-carbon-windy-snow text-4xl inline-block />
  </Framer>
</template>

<script lang="ts" setup>
  import { Framer, defineVariants, spring } from '@bryce-loskie/frame'

  const variants = defineVariants({
    enter: {
      x: [-200, 0],
      scale: [1, 2],
      options: {
        type: spring,
      },
    },
    leave: {
      x: 200,
      opacity: 0.5,
      scale: 1,
    },
  })
</script>
```

### 2. `useFrame` hook

```html
<template>
  <div ref="elRef" i-carbon-windy-snow text="4xl sky-500" inline-block />
  <button class="m-3 text-sm btn capitalize" @click="animation?.reverse()">
    reverse
  </button>
</template>

<script lang="ts" setup>
  import { useFrame, spring } from '@bryce-loskie/frame'

  const elRef = ref()
  const animation = useFrame(
    elRef,
    {
      x: [-200, 0],
      scale: [1, 2],
    },
    {
      easing: spring(),
    }
  )
</script>
```

### 3. directive

```html
<template>
  <div v-frame="keyframes" i-carbon-windy-snow text="4xl sky-500" inline-block />
</template>

<script lang="ts" setup>
  import { defineDirective, defineFrame, spring } from '@bryce-loskie/frame'

  const vFrame = defineDirective()
  const keyframes = defineFrame({
    x: [-200, 0],
    scale: [1, 2],
  }, {
    easing: spring(),
  })
</script>
```

## License

[MIT](./LICENSE) License © 2022 [guygubaby](https://github.com/guygubaby)

## TODO:

- [x] Add Transition component
- [x] Add useFrame hook
- [x] Add directive
- [x] Export animate,spring,stagger fn
