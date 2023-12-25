<script setup lang="ts">
	const supabase = useSupabaseClient();
	const route = useRoute();
	const franchiseId = ref('');

	console.log(route.params.id)

	const { data: franchise } = await useAsyncData(async () => {
		const { data } = await supabase
		.from('franchises').select('id,title,logo, items(id,title, brands(id,title), category(id,title))').eq('id', route.params.id);
		return data;
	});

	// Obtén el primer elemento del array o un objeto vacío si el array está vacío
	const franchiseInfo = franchise.value[0] || {};

	// Meta
	const pageTitle = franchiseInfo.title
	useSeoMeta({
		title:  pageTitle,
		ogTitle: pageTitle,
	})
</script>

<template>
	<PageHead>
		<template v-slot:image>
			<img v-if="franchiseInfo.logo" :src="franchiseInfo.logo" :alt="franchiseInfo.title" width="200" height="200">
			<img v-else src="assets/placeholder.png" :alt="franchiseInfo.title" width="200" height="200">
		</template>
		<template v-slot:title>
			{{ franchiseInfo.title }}
		</template>
		<template v-slot:description>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.
		</template>
	</PageHead>
	
	<h2 class="uk-heading-divider">Items in this Franchise</h2>

	<GridGeneral v-if="franchiseInfo.items.length > 0">
		<li v-for="item in franchiseInfo.items" :key="item.id">
			<Item :id="item.id" :title="item.title" :brandId="item.brands.id" :brandTitle="item.brands.title" :categoryTitle="item.category.title" />
		</li>
	</GridGeneral>

	<AppAlert v-else state="danger">No hay Items</AppAlert>
</template>