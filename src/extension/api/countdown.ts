import { get as nodecg } from '../util/nodecg'
import { countdownReplicant } from '../util/replicants'

const PREFIX = '/slogo-nodecg/api/countdown/'
const router = nodecg().Router()

router.get(PREFIX + 'take', (req, res) => {
	countdownReplicant.value.onAir = true

	res.status(200)
	res.end()
})
router.get(PREFIX + 'clear', (req, res) => {
	countdownReplicant.value.onAir = false

	res.status(200)
	res.end()
})
router.get(PREFIX + 'toggle', (req, res) => {
	countdownReplicant.value.onAir = !countdownReplicant.value.onAir

	res.status(200)
	res.end()
})

nodecg().mount(router)
