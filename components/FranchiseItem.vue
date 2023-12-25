<script setup>
	const props = defineProps({
		id: String,
		title: String,
		logo: String,
	});
</script>

<template>
	<NuxtLink :to="'/franchises/' + id" class="uk-link-reset uk-text-center">
		<article class="uk-card uk-card-small uk-card-default uk-card-body uk-flex uk-flex-middle">
			<div class="uk-card-media-top">
				<img v-if="logo" :src="logo" :alt="title" width="200" height="200">
				<img v-else src="assets/placeholder.png" :alt="title" width="200" height="200">
			</div>
		</article>
		<h3 class="uk-card-title uk-margin-top">{{title}}</h3>
	</NuxtLink>
</template>