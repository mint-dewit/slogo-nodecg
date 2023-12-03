import { get as nodecg } from '../util/nodecg'
import { lowerThirdsReplicant } from '../util/replicants'

const PREFIX = '/slogo-nodecg/api/lowerThirds/'
const router = nodecg().Router()

router.get(PREFIX + 'next', (req, res) => {
	const { items, selected } = lowerThirdsReplicant.value

	if (!selected) {
		lowerThirdsReplicant.value.selected = items[0]?.id
	} else {
		const selectedIndex = items.findIndex((v) => v.id === selected)
		const next = items[selectedIndex + 1]
		if (!next) {
			res.status(400)
			res.end()
			return
		}

		lowerThirdsReplicant.value.selected = next.id
	}

	res.status(200)
	res.end()
})
router.get(PREFIX + 'prev', (req, res) => {
	const { items, selected } = lowerThirdsReplicant.value

	if (!selected) {
		lowerThirdsReplicant.value.selected = items[0]?.id
	} else {
		const selectedIndex = items.findIndex((v) => v.id === selected)
		const next = items[selectedIndex - 1]
		if (!next) {
			res.status(400)
			res.end()
			return
		}

		lowerThirdsReplicant.value.selected = next.id
	}

	res.status(200)
	res.end()
})
router.get(PREFIX + 'take', (req, res) => {
	const { items, selected } = lowerThirdsReplicant.value
	const l3d = items.find((l) => l.id === selected)

	if (!l3d) {
		res.status(404)
		res.end()
		return
	}

	lowerThirdsReplicant.value.onAir = l3d.id

	res.status(200)
	res.end()
})
router.get(PREFIX + ':id/take', (req, res) => {
	const id = parseInt(req.params.id)
	if (typeof id !== 'number') {
		res.status(400)
		res.end()
		return
	}

	const l3d = lowerThirdsReplicant.value.items[id - 1]

	if (!l3d) {
		res.status(404)
		res.end()
		return
	}

	lowerThirdsReplicant.value.onAir = l3d.id

	res.status(200)
	res.end()
})
router.get(PREFIX + 'clear', (req, res) => {
	lowerThirdsReplicant.value.onAir = ''

	res.status(200)
	res.end()
})

nodecg().mount(router)
