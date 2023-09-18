<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useReplicant } from 'nodecg-vue-composable'

import TransitionSlot from './transitionSlot.vue'

import L3dGfx from './components/lowerThird.vue'
import StrapGfx from './components/strap.vue'
import OverlayGfx from './components/overlay.vue'
import CountdownGfx from './components/countdown.vue'

import { Config, Countdown, LowerThirds, Overlays, Straps } from '@slogo-nodecg/types/schemas'
import { computed, ref } from 'vue'
import NodeCG from '@nodecg/types'

// Set the title of this page.
useHead({ title: 'Main template' })

// config
const config = useReplicant<Config>('config', 'slogo-nodecg')

const fillColour = computed(() => '#' + (config?.data?.colours.main ?? 'eda413'))
const secondaryColour = computed(() => (config?.data?.colours.secondary === 'light' ? '#fff' : '#3e3e3e'))
const secondaryTextColour = computed(() => (config?.data?.colours.secondary === 'light' ? '#000' : '#fff'))

// Lower third data
const l3d = useReplicant<LowerThirds>('lowerThirds', 'slogo-nodecg')
const l3dData = computed(() => l3d?.data?.items.find((i) => i.id === l3d.data?.onAir))
const l3dKey = computed(() => (l3dData.value?.f0 ?? '') + l3dData.value?.f1)

// Strap data
const straps = useReplicant<Straps>('straps', 'slogo-nodecg')
const strapData = computed(() => straps?.data?.items.find((i) => i.id === straps.data?.onAir))

// overlays
const overlayAssets = useReplicant<NodeCG.AssetFile[]>('assets:overlays', 'slogo-nodecg')
const overlayReplicant = useReplicant<Overlays>('overlays', 'slogo-nodecg')
const overlayData = computed(() =>
	overlayAssets?.data?.map((asset) => ({ overlay: asset.url, onAir: overlayReplicant?.data?.[asset.base] }))
)

// Countdown data
const countdown = useReplicant<Countdown>('countdown', 'slogo-nodecg')
</script>

<template>
	<div>
		<TransitionSlot v-slot="{ setAnimation }">
			<L3dGfx v-if="l3dData" :f0="l3dData.f0" :f1="l3dData.f1" :key="l3dKey" :set-animation="setAnimation" />
		</TransitionSlot>

		<TransitionSlot v-slot="{ setAnimation }">
			<StrapGfx v-if="strapData" :f0="strapData.f0" :key="strapData.f0" :set-animation="setAnimation" />
		</TransitionSlot>

		<TransitionSlot v-for="item of overlayData" :key="item.overlay" v-slot="{ setAnimation }">
			<OverlayGfx v-if="item.onAir" :overlay="item.overlay" :key="item.overlay" :set-animation="setAnimation" />
		</TransitionSlot>

		<TransitionSlot v-slot="{ setAnimation }">
			<CountdownGfx v-if="countdown?.data?.onAir" :start="countdown.data.start" :set-animation="setAnimation" />
		</TransitionSlot>
	</div>
</template>

<style scoped>
div {
	--fill-color: v-bind(fillColour);
	--secondary-color: v-bind(secondaryColour);
	--secondary-text-color: v-bind(secondaryTextColour);
}
</style>
