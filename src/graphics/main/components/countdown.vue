<script setup lang="ts">
import NodeCG from '@nodecg/types'
import gsap from 'gsap'
import { useReplicant } from 'nodecg-vue-composable'
import { useAttrs, onMounted, ref, toRefs, computed } from 'vue'

const STREAM_START_COUNTDOWN = 'De uitzending begint over {clock}'
const STREAM_START_NOW = 'De uitzending begint zometeen...'

const props = defineProps(['setAnimation', 'start'])
const { start } = toRefs(props)

const timelineIntro = gsap.timeline({ paused: true })
const timelineOutro = gsap.timeline({ paused: true })
const timelineCountdownFinished = gsap.timeline({ paused: true })

const logoAssets = useReplicant<NodeCG.AssetFile[]>('assets:logo', 'slogo-nodecg')
const backgroundAssets = useReplicant<NodeCG.AssetFile[]>('assets:background', 'slogo-nodecg')

const logo = computed(() => `url(${logoAssets?.data?.[0]?.url})`)
const background = computed(() => `url(${backgroundAssets?.data?.[0]?.url})`)

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
if (props.setAnimation) (props.setAnimation as any)(play, stop)

const message = ref('')
let clockInterval: NodeJS.Timer | null = null

const wrapperRef = ref<any>(null)
const lineRef = ref<any>(null)

onMounted(() => {
	timelineIntro.to(wrapperRef.value, {
		duration: 0.3,
		opacity: 1,
	})
	timelineOutro.to(wrapperRef.value, {
		duration: 0.3,
		opacity: 0,
	})

	timelineCountdownFinished.to(lineRef.value, { duration: 0.9, opacity: 0 })
	timelineCountdownFinished.to(lineRef.value, { duration: 0.9, opacity: 1 }, '>.5')

	const updateText = () => {
		const now = new Date()
		const start2 = new Date(now.toDateString() + ' ' + start?.value)
		const time = Math.round((start2.getTime() - now.getTime()) / 1000)

		let template = STREAM_START_COUNTDOWN

		if (start?.value) {
			if (time < 0) {
				template = STREAM_START_NOW
			} else if (time < 1) {
				timelineCountdownFinished.play()
			}

			const pad = (t: string | number) => ('00' + t).substr(-2)
			const clock = `${pad(Math.floor(time / 60))}:${pad(time % 60)}`
			message.value = template.replace(/{clock}/, clock)
		} else {
			template = STREAM_START_NOW
		}
	}

	clockInterval = setInterval(updateText, 200)
	updateText()
})
</script>

<template>
	<div class="wrapper" ref="wrapperRef">
		<div class="logo"></div>
		<div class="text">
			<div class="line" ref="lineRef">{{ message }}</div>
		</div>
	</div>
</template>

<style scoped>
.wrapper {
	opacity: 0;

	position: absolute;
	width: 100%;
	height: 100%;
	background-size: cover;
	background-image: v-bind(background);
}
.logo {
	position: absolute;

	top: 108px;
	bottom: 108px;
	left: 192px;
	width: 500px;

	background-image: v-bind(logo);
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
}
.text {
	position: absolute;

	top: 108px;
	bottom: 108px;
	right: 192px;
	width: 1036px;

	display: flex;
	flex-direction: column;
	justify-content: center;
}
.text .line {
	font-size: 59px;
	text-align: center;
	font-weight: 700;
}
</style>
