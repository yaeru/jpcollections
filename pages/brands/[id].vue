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
</script>

<template>
	<h1>{{ brandInfo.title }}</h1>
	<h2>Items in this Brand</h2>
	<ul class="uk-grid uk-child-width-1-2@s uk-grid uk-child-width-1-3@m uk-child-width-1-5@l" uk-grid uk-height-match="target: .uk-card">
		<li v-for="item in brandInfo.items" :key="item.id">
			<Item :id="item.id" :title="item.title" :brandId="brandInfo.id" :brandTitle="brandInfo.title" />
		</li>
	</ul>
	<pre>
		{{ brand }}
	</pre>
</template>