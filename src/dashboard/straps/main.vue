<script setup lang="ts">
import { Straps } from '@slogo-nodecg/types/schemas'
import { useHead } from '@vueuse/head'
import { useReplicant } from 'nodecg-vue-composable'
import { ref } from 'vue'
import { v4 as uuid } from 'uuid'

const f0 = ref('')

const straps = useReplicant<Straps>('straps', 'slogo-nodecg')

// Set the title of this page.
useHead({ title: 'Lower thirds' })

const addNew = () => {
	console.log(straps?.data)
	if (!straps?.data) return

	straps.data.items.push({ id: uuid(), f0: f0.value })
	straps.save()

	f0.value = ''
}
const remove = (id: string) => {
	if (!straps?.data) return

	straps.data.items.splice(
		straps.data.items.findIndex((v) => v.id === id),
		1
	)
	straps.save()
}
const show = (id: string) => {
	if (!straps?.data) return

	if (straps.data.onAir === id) {
		straps.data.onAir = ''
	} else {
		straps.data.onAir = id
	}
	straps.save()
}
</script>

<template>
	<div>
		<div class="row items-center">
			<div class="col q-ma-sm">
				<QInput v-model="f0" label="f0" />
			</div>
			<div class="col-auto q-ma-sm">
				<QBtn color="primary" label="Add" @click="addNew" />
			</div>
		</div>

		<div
			:class="['row', 'items-center', item.id === straps?.data?.selected && 'selected']"
			v-for="(item, i) in straps?.data?.items"
			:key="item.id"
		>
			<div class="col-auto q-ma-sm">{{ i + 1 }}.</div>
			<div class="col q-ma-sm">{{ item.f0 }}</div>

			<div class="col-auto q-ma-sm">
				<QBtnGroup>
					<QBtn color="red" icon="delete" @click="remove(item.id)" />
					<QBtn :color="item.id === straps?.data?.onAir ? '' : 'primary'" @click="show(item.id)">
						{{ item.id === straps?.data?.onAir ? 'HIDE' : 'SHOW' }}
					</QBtn>
				</QBtnGroup>
			</div>
		</div>
	</div>
</template>

<style scoped>
.selected::before {
	content: ' ';
	position: fixed;

	height: 28px;
	border-left: #1876d2 solid 3px;
}
</style>
