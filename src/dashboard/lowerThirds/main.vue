<script setup lang="ts">
import { LowerThirds } from '@slogo-nodecg/types/schemas'
import { useHead } from '@vueuse/head'
import { useReplicant } from 'nodecg-vue-composable'
import { ref } from 'vue'
import { v4 as uuid } from 'uuid'

const f0 = ref('')
const f1 = ref('')

const l3ds = useReplicant<LowerThirds>('lowerThirds', 'slogo-nodecg')

// Set the title of this page.
useHead({ title: 'Lower thirds' })

const addNew = () => {
	console.log(l3ds?.data)
	if (!l3ds?.data) return

	l3ds.data.items.push({ id: uuid(), f0: f0.value, f1: f1.value })
	l3ds.save()

	f0.value = ''
	f1.value = ''
}
const remove = (id: string) => {
	if (!l3ds?.data) return

	l3ds.data.items.splice(
		l3ds.data.items.findIndex((v) => v.id === id),
		1
	)
	l3ds.save()
}
const show = (id: string) => {
	if (!l3ds?.data) return

	if (l3ds.data.onAir === id) {
		l3ds.data.onAir = ''
	} else {
		l3ds.data.onAir = id
	}
	l3ds.save()
}
</script>

<template>
	<div>
		<div class="row items-center">
			<div class="col q-ma-sm">
				<QInput v-model="f0" label="f0" />
			</div>
			<div class="col q-ma-sm">
				<QInput v-model="f1" label="f1" />
			</div>
			<div class="col-auto q-ma-sm">
				<QBtn color="primary" label="Add" @click="addNew" />
			</div>
		</div>

		<div class="row items-center" v-for="(item, i) in l3ds?.data?.items" :key="item.id">
			<div class="col-auto q-ma-sm">{{ i + 1 }}.</div>
			<div class="col q-ma-sm">{{ item.f0 }}</div>
			<div class="col q-ma-sm">{{ item.f1 }}</div>

			<div class="col-auto q-ma-sm">
				<QBtnGroup>
					<QBtn color="red" icon="delete" @click="remove(item.id)" />
					<QBtn :color="item.id === l3ds?.data?.onAir ? '' : 'primary'" @click="show(item.id)">
						{{ item.id === l3ds?.data?.onAir ? 'HIDE' : 'SHOW' }}
					</QBtn>
				</QBtnGroup>
			</div>
		</div>
	</div>
</template>
