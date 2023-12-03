import { get as nodecg } from '../util/nodecg'
import { strapsReplicant } from '../util/replicants'

const PREFIX = '/slogo-nodecg/api/straps/'
const router = nodecg().Router()

router.get(PREFIX + 'next', (req, res) => {
	const { items, selected } = strapsReplicant.value

	if (!selected) {
		strapsReplicant.value.selected = items[0]?.id
	} else {
		const selectedIndex = items.findIndex((v) => v.id === selected)
		const next = items[selectedIndex + 1]
		if (!next) {
			res.status(400)
			res.end()
			return
		}

		strapsReplicant.value.selected = next.id
	}

	res.status(200)
	res.end()
})
router.get(PREFIX + 'prev', (req, res) => {
	const { items, selected } = strapsReplicant.value

	if (!selected) {
		strapsReplicant.value.selected = items[0]?.id
	} else {
		const selectedIndex = items.findIndex((v) => v.id === selected)
		const next = items[selectedIndex - 1]
		if (!next) {
			res.status(400)
			res.end()
			return
		}

		strapsReplicant.value.selected = next.id
	}

	res.status(200)
	res.end()
})
router.get(PREFIX + 'take', (req, res) => {
	const { items, selected } = strapsReplicant.value
	const strap = items.find((l) => l.id === selected)

	if (!strap) {
		res.status(404)
		res.end()
		return
	}

	strapsReplicant.value.onAir = strap.id

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

	const strap = strapsReplicant.value.items[id - 1]

	if (!strap) {
		res.status(404)
		res.end()
		return
	}

	strapsReplicant.value.onAir = strap.id

	res.status(200)
	res.end()
})
router.get(PREFIX + 'clear', (req, res) => {
	strapsReplicant.value.onAir = ''

	res.status(200)
	res.end()
})

nodecg().mount(router)
