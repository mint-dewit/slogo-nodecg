<script setup lang="ts">
import { useHead } from '@vueuse/head'

// Set the title of this page.
useHead({ title: 'Preview' })
</script>

<template>
	<div class="wrapper">
		<div class="preview">
			<iframe src="/bundles/slogo-nodecg/graphics/main.html" width="1920" height="1080"></iframe>
		</div>
	</div>
</template>

<style scoped>
.wrapper {
	width: 480px;
	height: 270px;
	border: black solid 1px;
}
.preview {
	width: 1920px;
	height: 1080px;
	transform: translate(-50%, 0rem) scale(0.249479);
	position: relative;
	left: 50%;
	top: 0;
	transform-origin: center top;
}

.preview iframe {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	transform-origin: center center;
	border: 0;
}
</style>
