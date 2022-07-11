<template>
  <div>
    <h1 mb>
      In View
    </h1>

    <div h-30rem w-30rem overflow-y-auto p>
      <div w-full h-full flex items-center justify-center>
        Scroll down
      </div>
      <section ref="sectionRef0" translate-x="-100%" w-full h-full bg-purple>
        <span>Scroll</span>
      </section>
      <section ref="sectionRef1" w-full h-full>
        <span>to</span>
      </section>
      <section w-full h-full>
        <span>trigger</span>
      </section>
      <section w-full h-full>
        <span>animations!</span>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { animate, inView } from 'core/index'
import { useInView } from './in-view-hook'

const sectionRef0 = ref()

useInView(sectionRef0, ({ target }) => {
  console.log('enter')
  animate(target, {
    transform: 'none',
  })

  return () => {
    console.log('out')
    // animate(target, {
    //   x: [0, 100],
    // })
  }
}, {
  amount: 0.2,
})

const sectionRef1 = ref()

useInView(sectionRef1, ({ target }) => {
  animate(target, {
    rotate: [0, 360],
  })

  return () => {
    animate(target, {
      x: [360, 0],
    })
  }
})
</script>
