<script setup lang="ts">
import { Overlays } from '@slogo-nodecg/types/schemas'
import { useHead } from '@vueuse/head'
import { useReplicant } from 'nodecg-vue-composable'
import NodeCG from '@nodecg/types'

const overlayAssets = useReplicant<NodeCG.AssetFile[]>('assets:overlays', 'slogo-nodecg')
const overlayReplicant = useReplicant<Overlays>('overlays', 'slogo-nodecg')

const save = () => {
	overlayReplicant?.save()
}
const update = (base: string, v: boolean) => {
	if (!overlayReplicant?.data) return

	overlayReplicant.data[base] = v
	save()
}

// Set the title of this page.
useHead({ title: 'Overlays' })
</script>

<template>
	<div>
		<div class="row items-center" v-for="(item, i) in overlayAssets?.data">
			<div class="col-auto q-ma-sm">{{ i + 1 }}.</div>
			<div class="col q-ma-sm">{{ item.base }}</div>
			<div class="col-auto q-ma-sm">
				<QToggle
					:model-value="overlayReplicant?.data?.[item.base] ?? false"
					@update:model-value="(v) => update(item.base, v)"
				/>
			</div>
		</div>
	</div>
</template>
