<script setup lang="ts">
import { defineScrollbar } from '@bryce-loskie/scrollbar'
import { EasingPresets, Framer, defineDirective, defineFrame, defineVariants, spring, useFrame } from 'core/index'
import { version } from '../../../packages/core/package.json'

defineScrollbar({
  width: '6px',
})

const variants = defineVariants({
  enter: {
    x: [-120, 0],
    scale: [1, 2],
    options: {
      easing: spring(),
    },
  },
  leave: {
    x: 120,
    opacity: 0.5,
    scale: 1,
  },
})

const isShow = ref(true)
const toggle = useToggle(isShow)

const elRef = ref<HTMLElement>()
const animation = useFrame(elRef, {
  x: [-120, 0],
  scale: [1, 2],
}, {
  easing: spring(),
})

const vFrame = defineDirective()
const keyframes = defineFrame({
  x: [-200, 0],
  scale: [1, 2],
}, {
  easing: EasingPresets.easeInOutQuart,
  duration: 2,
})
</script>

<template>
  <div container m-auto>
    <p text="2xl" m="b6" class="capitalize">
      frame playground
      <sup text-gray:80>{{ version }}</sup>
    </p>

    <ul flex="~ col" gap-2>
      <li>
        <p text="lg" m="b4">
          Use <code bg="gray-100 dark:gray-600" p-1 rounded>Framer</code> component
        </p>
        <div class="ring rounded-xl shadow" flex="~ col" items="center">
          <div class="p-10 h-32">
            <Framer appear :variants="variants">
              <div v-if="isShow" i-carbon-windy-snow text-4xl inline-block />
            </Framer>
          </div>

          <div>
            <button
              class="m-3 text-sm btn"
              @click="toggle()"
            >
              Toggle
            </button>
          </div>
        </div>
      </li>

      <li>
        <p text="lg" m="b4">
          Use <code bg="gray-100 dark:gray-600" p-1 rounded>useFrame</code> hook
        </p>
        <div class="ring rounded-xl shadow" flex="~ col" items="center">
          <div class="p-10 h-32">
            <div ref="elRef" i-carbon-windy-snow text="4xl sky-500" inline-block />
          </div>

          <div>
            <button
              class="m-3 text-sm btn capitalize"
              @click="animation?.reverse()"
            >
              reverse
            </button>
          </div>
        </div>
      </li>

      <li>
        <p text="lg" m="b4">
          Use <code bg="gray-100 dark:gray-600" p-1 rounded>directive</code>
        </p>
        <div class="ring rounded-xl shadow" flex="~ col" items="center">
          <div class="p-10 h-32">
            <div v-frame="keyframes" i-carbon-windy-snow text="4xl sky-500" inline-block />
          </div>
        </div>
      </li>

      <li flex justify-center mt>
        <router-link to="in-view" class="icon-btn flex items-center ring px-2 py-1 rounded">
          InView
          <div i-carbon-arrow-right ml-1 />
        </router-link>
      </li>

      <li flex justify-center mt>
        <router-link to="timeline" class="icon-btn flex items-center ring px-2 py-1 rounded">
          Timeline
          <div i-carbon-arrow-right ml-1 />
        </router-link>
      </li>
    </ul>
  </div>
</template>
