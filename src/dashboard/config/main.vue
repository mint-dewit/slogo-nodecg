<script setup lang="ts">
import { useReplicant } from 'nodecg-vue-composable'
import { Config } from '@slogo-nodecg/types/schemas'

const bundleConfig = useReplicant<Config>('config', 'slogo-nodecg')

if (!bundleConfig) throw new Error('Config not found')

const save = () => {
	bundleConfig.save()
}
</script>

<template>
	<div>
		<div class="row items-center">
			<div class="col">Primary colour</div>
			<div class="col-auto" v-if="bundleConfig && bundleConfig.data">
				<QInput v-model="bundleConfig.data.colours.main" @update:model-value="save()" label="Primary colour" />
			</div>
		</div>

		<div class="row items-center">
			<div class="col">Secondary colour</div>
			<div class="col-auto" v-if="bundleConfig && bundleConfig.data">
				<QSelect
					v-model="bundleConfig.data.colours.secondary"
					@update:model-value="save()"
					:options="['light', 'dark']"
				/>
			</div>
		</div>
	</div>
</template>
