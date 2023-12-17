<script setup>
	const props = defineProps({
		id: String,
		title: String,
		logo: String,
	});
</script>

<template>
	<NuxtLink :to="'/brands/' + id" class="uk-link-reset">
		<article class="uk-card uk-card-small uk-card-default uk-card-body uk-text-center brand-item">
			<img v-if="logo" :src="logo" :alt="title" width="200" height="200">
			<img v-else src="assets/placeholder.png" :alt="title" width="200" height="200">
		</article>
	</NuxtLink>
</template>