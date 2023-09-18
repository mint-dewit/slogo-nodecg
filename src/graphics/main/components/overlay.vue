<script setup lang="ts">
import gsap from 'gsap'
import { useAttrs, onMounted, ref } from 'vue'

const { overlay, 'set-animation': setAnimation } = useAttrs()

const timelineIntro = gsap.timeline({ paused: true })
const timelineOutro = gsap.timeline({ paused: true })

const play = async () => {
	timelineIntro.seek(0)
	timelineIntro.play()

	await new Promise<void>((r) => setTimeout(() => r(), 450))
}
const stop = async () => {
	timelineOutro.seek(0)
	timelineOutro.play()

	await new Promise<void>((r) => setTimeout(() => r(), 450))
}
if (setAnimation) (setAnimation as any)(play, stop)

const img = ref<any>(null)

onMounted(() => {
	timelineIntro.to(img.value, {
		duration: 0.3,
		opacity: 1,
	})

	timelineOutro.to(img.value, {
		duration: 0.3,
		opacity: 0,
	})
})
</script>

<template>
	<div>
		<div ref="img" class="img" :style="{ backgroundImage: `url(${overlay})` }"></div>
	</div>
</template>

<style scoped>
.img {
	opacity: 0;

	position: absolute;
	width: 100%;
	height: 100%;

	background-size: contain; /** maybe cover is better... hm */
}
</style>
