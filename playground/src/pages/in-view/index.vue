<script lang="ts" setup>
import { animate, useInView } from 'core/index'

interface Item {
  id: number
  label: string
  bg: string
}

let uid = 0

const list: Item[] = [
  {
    id: ++uid,
    label: 'Scroll',
    bg: 'bg-teal-500',
  },
  {
    id: ++uid,
    label: 'to',
    bg: 'bg-indigo-500',
  },
  {
    id: ++uid,
    label: 'trigger',
    bg: 'bg-slate-500',
  },
  {
    id: ++uid,
    label: 'animations!',
    bg: 'bg-violet-500',
  },
]

const sectionRefs = ref<HTMLElement[]>([])

useInView(
  sectionRefs,
  ({ target }) => {
    const span = target.querySelector('.span')!

    const enterControl = animate(
      span,
      {
        transform: 'none',
        opacity: 1,
      },
      {
        delay: 0.2,
        duration: 0.9,
        easing: [0.17, 0.55, 0.55, 1],
      },
    )

    return () => {
      enterControl.stop()

      animate(span, {
        x: [0, -200],
        opacity: [1, 0],
      })
    }
  },
  {
    amount: 0.35,
  },
)
</script>

<template>
  <section w-screen flex="~ col" items-center container mx-auto>
    <h1 mb ml text-2xl>
      In View
    </h1>

    <div h-30rem w-30rem overflow-y-auto p-4 snap-y snap-mandatory>
      <section
        w-full
        h-full
        flex
        items-center
        justify-center
        ring
        text-2xl
        mb-5
        snap-center
        text-indigo
        dark:text-indigo-300
        font-bold
      >
        <span>Scroll down</span>
        <div i-carbon-arrow-down />
      </section>

      <section
        v-for="item in list"
        :key="item.id"
        ref="sectionRefs"
        :class="item.bg"
        snap-center
        w-full
        h-full
        flex
        items-center
        justify-center
        rounded
        not-last-of-type:mb-4
      >
        <div w-full text-center text-white text-2xl class="span">
          {{ item.label }}
        </div>
      </section>
    </div>

    <div text-center mt-10>
      <router-link
        to="/in-view/directive"
        class="icon-btn flex items-center ring px-2 py-1 rounded"
      >
        Directive Usage
        <div i-carbon-arrow-right ml-1 />
      </router-link>
    </div>

    <div text-center mt>
      <router-link
        to="/"
        class="icon-btn flex items-center ring px-2 py-1 rounded"
      >
        <div i-carbon-arrow-left mr-1 />
        Back
      </router-link>
    </div>
  </section>
</template>

<style lang="css" scoped>
.span {
  transform: translateX(-200px);
  opacity: 0;
}
</style>
