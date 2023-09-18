<script setup lang="ts">
import { useReplicant } from 'nodecg-vue-composable'
import { Countdown } from '@slogo-nodecg/types/schemas'

const countdown = useReplicant<Countdown>('countdown', 'slogo-nodecg')

if (!countdown) throw new Error('wehlp')

const save = () => {
	countdown.save()
}
const show = () => {
	if (!countdown.data) return

	countdown.data.onAir = !countdown.data?.onAir
	countdown.save()
}
</script>

<template>
	<div>
		<div class="row items-center">
			<div class="col q-ma-sm" v-if="countdown && countdown.data">
				<QInput v-model="countdown.data.start" @update:model-value="save()" label="Start" />
			</div>
			<div class="col-auto" v-if="countdown && countdown.data">
				<QBtn :color="countdown.data?.onAir ? '' : 'primary'" @click="show()">
					{{ countdown?.data?.onAir ? 'HIDE' : 'SHOW' }}
				</QBtn>
			</div>
		</div>
	</div>
</template>
