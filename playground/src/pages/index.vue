<template>
  <div class="ring rounded-xl" flex="~ col" items="center">
    <div class="p-20 h-20">
      <Framer appear :variants="variants">
        <div v-if="isShow" i-carbon-campsite text-4xl inline-block />
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
</template>

<script setup lang="ts">
import { Framer, defineVariants, spring } from './component'

const variants = defineVariants({
  initial: {
    x: -100,
  },
  enter: {
    x: 0,
    backgroundColor: 'red',
    options: {
      easing: spring(),
    },
  },
  leave: {
    x: 100,
    opacity: 0,
  },
})

const isShow = ref(true)
const toggle = useToggle(isShow)
</script>
