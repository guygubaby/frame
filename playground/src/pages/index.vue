<template>
  <div>
    <div i-carbon-campsite text-4xl inline-block />
    <p>
      <span text-sm op75>It works, {{ foo }}</span>
    </p>

    <div py-4 />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { foo } from 'core/index'

const name = ref('')
const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>