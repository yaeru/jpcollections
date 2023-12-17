<script setup>
	const props = defineProps({
		id: String,
		title: String,
		brand: Array,
		brandId: String,
		brandTitle: String,
	});
</script>


<template>
	<NuxtLink :to="'/items/' + id" class="uk-link-reset">
		<article class="uk-card uk-card-default uk-card-small">
			<div class="uk-card-media-top">
				<img src="https://getuikit.com/docs/images/light.jpg" width="1800" height="1200" alt="">
			</div>
			<div class="uk-card-body">
				<h3 class="uk-card-title uk-margin-remove-bottom">{{title}}</h3>
				<p class="uk-margin-small-top">{{brandTitle}}</p>
			</div>
		</article>
	</NuxtLink>
</template>