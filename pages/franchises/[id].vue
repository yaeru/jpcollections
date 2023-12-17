<script setup lang="ts">
	const supabase = useSupabaseClient();
	const route = useRoute();
	const franchiseId = ref('');

	console.log(route.params.id)

	const { data: franchise } = await useAsyncData(async () => {
		const { data } = await supabase
		.from('franchises').select('*, items(id, title, brands(id,title))').eq('id', route.params.id);
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
	<h1>{{ franchiseInfo.title }}</h1>
	<h2>Items in this Franchise</h2>
	<ul class="uk-grid uk-child-width-1-2@s uk-grid uk-child-width-1-3@m uk-child-width-1-5@l" uk-grid uk-height-match="target: .uk-card">
		<li v-for="item in franchiseInfo.items" :key="item.id">
			<Item :id="item.id" :title="item.title" :brandId="item.brands.id" :brandTitle="item.brands.title" />
		</li>
	</ul>

	<pre>
		{{ franchise }}
	</pre>
</template>