<script setup>
	const props = defineProps({
		id: String,
		title: String,
	});
</script>

<template>
	<NuxtLink :to="'/franchises/' + id">
		<article class="uk-card uk-card-small uk-text-center">
			<div class="uk-card-media-top">
				<img src="https://getuikit.com/docs/images/light.jpg" width="1800" height="1200" alt="">
			</div>
			<div class="uk-card-body">
				<h3 class="uk-card-title">{{title}}</h3>
			</div>
		</article>
	</NuxtLink>
</template>