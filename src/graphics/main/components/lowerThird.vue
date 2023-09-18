<script setup lang="ts">
import gsap from 'gsap'
import { useAttrs, onMounted, ref } from 'vue'

const { f0, f1, 'set-animation': setAnimation } = useAttrs()

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

const f0Ref = ref<any>(null)
const f1Ref = ref<any>(null)

onMounted(() => {
	timelineIntro.to(f0Ref.value, {
		duration: 0.3,
		opacity: 1,
	})
	timelineIntro.to(
		f1Ref.value,
		{
			duration: 0.3,
			opacity: 1,
		},
		'<0.15'
	)

	timelineOutro.to(f1Ref.value, {
		duration: 0.3,
		opacity: 0,
	})
	timelineOutro.to(
		f0Ref.value,
		{
			duration: 0.3,
			opacity: 0,
		},
		'<0.15'
	)
})
</script>

<template>
	<div>
		<div ref="f0Ref" class="f0">{{ f0 }}</div>
		<div ref="f1Ref" class="f1" v-if="f1">{{ f1 }}</div>
	</div>
</template>

<style scoped>
.f0 {
	opacity: 0;

	position: absolute;
	left: 96px;
	bottom: 122px;

	/* width: 396px; */
	/* height: 64px; */
	flex-shrink: 0;

	background: linear-gradient(270deg, rgba(0, 0, 0, 0.11) 0%, rgba(0, 0, 0, 0) 24.49%), var(--fill-color);

	padding: 4px 13px;

	color: var(--primary-text-color);
	/* font-family: Roboto; */
	font-size: 41px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
}
.f1 {
	opacity: 0;

	position: absolute;
	left: 185px;
	bottom: 58px;

	/* width: 396px; */
	/* height: 64px; */
	flex-shrink: 0;

	background: var(--secondary-color);

	padding: 4px 13px;

	color: var(--secondary-text-color);
	/* font-family: Roboto; */
	font-size: 36px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
}
</style>
