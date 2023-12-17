<script setup lang="ts">
	const supabase = useSupabaseClient();
	const route = useRoute();
	const serieId = ref('');

	console.log(route.params.id)

	const { data: serie } = await useAsyncData(async () => {
		const { data } = await supabase
		.from('series').select('*, items(id, title)').eq('id', route.params.id);
		return data;
	});

	// Obtén el primer elemento del array o un objeto vacío si el array está vacío
	const serieInfo = serie.value[0] || {};


	const pageTitle = serieInfo.title
	useSeoMeta({
		title:  pageTitle,
		ogTitle: pageTitle,
	})
</script>

<template>
	<h1>{{ pageTitle }}</h1>
	<h2>Items in this serie</h2>
	<ul class="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@m uk-child-width-1-4@l" uk-grid uk-height-match="target: .uk-card">
		<li v-for="item in serieInfo.items" :key="item.id">
			<Item :id="item.id" :title="item.title" :serieId="serieInfo.id" :serieTitle="serieInfo.title" />
		</li>
	</ul>
	<pre>
		{{ serie }}
	</pre>
</template>