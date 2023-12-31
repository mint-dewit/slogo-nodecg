/* eslint-disable max-len */

// import type { ExampleReplicant } from '@slogo-nodecg/types/schemas';
import type { Countdown, LowerThirds, Overlays, Straps } from '@slogo-nodecg/types/schemas'
import { get as nodecg } from './nodecg'

/**
 * This is where you can declare all your replicant to import easily into other files,
 * and to make sure they have any correct settings on startup.
 */

// YOU CAN REMOVE THIS RULE WHEN YOU GET MULTIPLE REPLICANTS!
// eslint-disable-next-line import/prefer-default-export
// export const exampleReplicant = nodecg().Replicant<ExampleReplicant>('exampleReplicant');

export const lowerThirdsReplicant = nodecg().Replicant<LowerThirds>('lowerThirds')
export const strapsReplicant = nodecg().Replicant<Straps>('straps')
export const overlaysReplicant = nodecg().Replicant<Overlays>('overlays')
export const countdownReplicant = nodecg().Replicant<Countdown>('countdown')
