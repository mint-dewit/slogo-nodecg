import { get as nodecg } from '../util/nodecg'
import { overlaysReplicant } from '../util/replicants'

const PREFIX = '/slogo-nodecg/api/overlays/'
const router = nodecg().Router()

router.get(PREFIX + ':id/take', (req, res) => {
	const id = parseInt(req.params.id)
	if (typeof id !== 'number') {
		res.status(400)
		res.end()
		return
	}

	const keys = Object.keys(overlaysReplicant.value)
	const overlay = keys[id - 1]

	if (!overlay) {
		res.status(404)
		res.end()
		return
	}

	overlaysReplicant.value[overlay] = true

	res.status(200)
	res.end()
})
router.get(PREFIX + ':id/clear', (req, res) => {
	const id = parseInt(req.params.id)
	if (typeof id !== 'number') {
		res.status(400)
		res.end()
		return
	}

	const keys = Object.keys(overlaysReplicant.value)
	const overlay = keys[id - 1]

	if (!overlay) {
		res.status(404)
		res.end()
		return
	}

	overlaysReplicant.value[overlay] = false

	res.status(200)
	res.end()
})
router.get(PREFIX + ':id/toggle', (req, res) => {
	const id = parseInt(req.params.id)
	if (typeof id !== 'number') {
		res.status(400)
		res.end()
		return
	}

	const keys = Object.keys(overlaysReplicant.value)
	const overlay = keys[id - 1]

	if (!overlay) {
		res.status(404)
		res.end()
		return
	}

	overlaysReplicant.value[overlay] = !overlaysReplicant.value[overlay]

	res.status(200)
	res.end()
})

nodecg().mount(router)
