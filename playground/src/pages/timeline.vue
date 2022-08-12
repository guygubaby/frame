<template>
  <div flex="~ col" items-center>
    <h1 text-2xl>
      Timeline
    </h1>

    <section h-100>
      <div ref="targetRef" top-4 w-20 h-20 bg-purple text-white flex items-center justify-center>
        target
      </div>

      <div ref="targetRef1" top-40 w-20 h-20 bg-cyan text-white flex items-center justify-center>
        target1
      </div>
    </section>

    <button class="btn" @click="reverse">
      reverse
    </button>

    <div text-center mt>
      <router-link
        to="/"
        class="icon-btn flex items-center ring px-2 py-1 rounded"
      >
        <div i-carbon-arrow-left mr-1 />
        Back
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTimeline } from 'core/index'

const targetRef = ref<HTMLDivElement>()
const targetRef1 = ref<HTMLSpanElement>()

const { controlRef } = useTimeline([
  [targetRef, { x: 100 }, { duration: 1 }],
  [targetRef, { y: 100 }, { duration: 1, at: 0.2 }],
  [targetRef, { scale: 2 }, { duration: 1, at: '<' }],
  [targetRef1, { opacity: [0, 1], x: 100, y: 200 }, { duration: 1 }],
])

const reverse = () => {
  controlRef.value?.reverse()
}
</script>
