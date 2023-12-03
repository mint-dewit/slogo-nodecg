/**
 * Ideally their would be a native integration for companion to work with nodecg bundles
 * NodeCG should expose an API for letting bundles expose things to companion as well as an API (websockets?)
 * for the companion plugin to read and write.
 *
 * It should (could) (possibly) also work with other integrations, like exposing things on HTTP / ws api
 *
 * The primary thing for bundles is to expose actions, feedback states and variables.
 *
 * For now, just triggering over http will do....
 */

export * from './lowerThirds'
export * from './straps'
export * from './overlays'
export * from './countdown'
