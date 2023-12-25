<script setup lang="ts">
	const supabase = useSupabaseClient();
	const route = useRoute();
	const brandId = ref('');

	const { data: brand } = await useAsyncData(async () => {
		const { data } = await supabase
		.from('brands').select('*, items(id, title, picture)').eq('id', route.params.id).order('id', {foreignTable: 'items'})
		return data;
	});

	// Obtén el primer elemento del array o un objeto vacío si el array está vacío
	const brandInfo = brand.value[0] || {};

	// Meta
	const pageTitle = brandInfo.title
	useSeoMeta({
		title:  pageTitle,
		ogTitle: pageTitle,
	})
</script>

<template>
	<PageHead>
		<template v-slot:image>
			<img v-if="brandInfo.logo" :src="brandInfo.logo" :alt="brandInfo.title" width="120" height="120">
			<img v-else src="assets/placeholder.png" :alt="brandInfo.title" width="120" height="120">
		</template>
		<template v-slot:title>
			{{ pageTitle }}
		</template>
		<template v-slot:description>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
		</template>
	</PageHead>

	<h2 class="uk-heading-divider">Items in this Brand</h2>
	<GridGeneral v-if="brandInfo.items.length > 0">
		<li v-for="item in brandInfo.items" :key="item.id">
			<Item :id="item.id" :title="item.title" :brandId="brandInfo.id" :brandTitle="brandInfo.title" :picture="item.picture" />
		</li>
	</GridGeneral>
	<AppAlert v-else state="danger">No hay Items</AppAlert>


	<pre>
		{{brandInfo}}
	</pre>
</template>