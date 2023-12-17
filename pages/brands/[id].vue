<script setup lang="ts">
	const supabase = useSupabaseClient();
	const route = useRoute();
	const brandId = ref('');

	console.log(route.params.id)

	const { data: brand } = await useAsyncData(async () => {
		const { data } = await supabase
		.from('brands').select('*, items(id, title)').eq('id', route.params.id);
		return data;
	});

	// Obtén el primer elemento del array o un objeto vacío si el array está vacío
	const brandInfo = brand.value[0] || {};


	const pageTitle = brandInfo.title
	useSeoMeta({
		title:  pageTitle,
		ogTitle: pageTitle,
	})
</script>

<template>

	<PageHead>
		<template v-slot:image>
			<img v-if="brandInfo.logo" :src="brandInfo.logo" :alt="brandInfo.title" width="150" height="150">
			<img v-else src="assets/placeholder.png" :alt="brandInfo.title" width="150" height="150">
		</template>
		<template v-slot:title>
			{{ pageTitle }}
		</template>
		<template v-slot:description>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
		</template>
	</PageHead>

	<h2>Items in this Brand</h2>
	<ul class="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@m uk-child-width-1-4@l" uk-grid uk-height-match="target: .uk-card">
		<li v-for="item in brandInfo.items" :key="item.id">
			<Item :id="item.id" :title="item.title" :brandId="brandInfo.id" :brandTitle="brandInfo.title" />
		</li>
	</ul>
	<pre>
		{{ brand }}
	</pre>
</template>