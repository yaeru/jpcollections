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
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
		</template>
	</PageHead>
	
	<h2>Items in this Franchise</h2>
	<GridGeneral>
		<li v-for="item in franchiseInfo.items" :key="item.id">
			<Item :id="item.id" :title="item.title" :brandId="item.brands.id" :brandTitle="item.brands.title" :categoryTitle="item.category.title" />
		</li>
	</GridGeneral>

	<ul>
		<li v-for="item in franchiseInfo.items" :key="item.id">
			<h3>{{item.category.title}}</h3>
		</li>
	</ul>

	<pre>
		{{ franchise }}
	</pre>
</template>