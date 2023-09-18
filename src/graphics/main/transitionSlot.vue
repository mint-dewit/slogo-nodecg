<script setup lang="ts">
const emit = defineEmits(['play', 'playing', 'stop', 'stopped'])

const elementAnims = {
	play: async () => {},
	stop: async () => {},
}

const play = (_: Element, done: () => void) => {
	emit('play')
	elementAnims.play().finally(() => {
		done()
		emit('playing')
	})
}
const stop = (el: any, done: () => void) => {
	emit('stop')
	elementAnims.stop().finally(() => {
		done()
		emit('stopped')
	})
}

const setAnimations = (play: () => Promise<void>, stop: () => Promise<void>) => {
	elementAnims.play = play
	elementAnims.stop = stop
}
</script>

<template>
	<Transition appear @enter="play" @leave="stop" :css="false" mode="out-in">
		<slot :set-animation="setAnimations"></slot>
	</Transition>
</template>
