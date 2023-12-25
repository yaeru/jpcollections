<script setup>
	const props = defineProps({
		id: String,
		title: String,
		picture: String,
		brand: Array,
		brandId: String,
		brandTitle: String,
		categoryTitle: String,
	});
</script>


<template>
	<NuxtLink :to="'/items/' + id" class="uk-link-reset">
		<article class="item-card uk-card uk-card-default uk-card-small">
			<div class="uk-card-media-top">
				<img v-if="picture" :src="picture"  :alt="title" width="1800" height="1200">
				<img v-else src="assets/placeholder.png" :alt="title" width="1800" height="1200">
			</div>
			<div class="uk-card-body">
				<h3 class="uk-card-title uk-margin-remove-bottom">{{title}}</h3>
				<p class="uk-margin-small-top" v-if="brandTitle">{{brandTitle}}<!-- - {{categoryTitle}}--></p>
			</div>
		</article>
	</NuxtLink>
</template>