<template>
  <div container>
    <p text="2xl" m="b6" class="capitalize">
      frame playground
      <sup text-gray:80>WIP</sup>
    </p>

    <ul flex="~ col" gap-2>
      <li>
        <p text="lg" m="b4">
          Use Framer component
        </p>
        <div class="ring rounded-xl shadow" flex="~ col" items="center">
          <div class="p-20 h-20">
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
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Framer, defineVariants, spring } from 'core/index'

const variants = defineVariants({
  initial: {
    x: -100,
    color: 'red',
  },
  enter: {
    x: 0,
    scale: 2,
    color: 'blue',
    transition: {
      easing: spring(),
    },
  },
  leave: {
    x: 100,
    opacity: 0,
    scale: 1,
  },
})

const isShow = ref(true)
const toggle = useToggle(isShow)
</script>
