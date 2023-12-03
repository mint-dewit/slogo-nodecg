# Slogo NodeCG bundle

Based on the excellent template by [zoton2](https://github.com/zoton2/nodecg-vue-ts-template). Many thanks.

## Templates

- [x] Lower thirds
- [x] Strap (location / time)
- [x] Logo overlays
- [x] Countdown

## Configurability

Logos, images and colours should all be configurable such that the templates can be used throughout the programming but a consistent style can be kept.

## API

This bundle exposes the following HTTP endpoints on the url `/slogo-nodecg/api`:

### Lower thirds

`/lowerThirds/next`

`/lowerThirds/prev`

`/lowerThirds/take`

`/lowerThirds/:id/take`

`/lowerThirds/clear`

### Straps

`/straps/next`

`/straps/prev`

`/straps/take`

`/straps/:id/take`

`/straps/clear`

### Overlays

`/overlays/:id/take`

`/overlays/:id/clear`

`/overlays/:id/toggle`

### Countdown

`/overlays/take`

`/overlays/clear`

`/overlays/toggle`
