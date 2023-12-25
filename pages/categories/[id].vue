<script setup lang="ts">
	const supabase = useSupabaseClient();
	const route = useRoute();
	const categoryId = ref('');

	const { data: category } = await useAsyncData(async () => {
		const { data } = await supabase
		.from('category').select('id,title, items(id, title, brands(id, title))').eq('id', route.params.id);
		return data;
	});

	// Obtén el primer elemento del array o un objeto vacío si el array está vacío
	const categoryInfo = category.value[0] || {};

	const pageTitle = categoryInfo.title
	useSeoMeta({
		title:  pageTitle,
		ogTitle: pageTitle,
	})
</script>

<template>
	<h1>{{ pageTitle }}</h1>
	<template v-if="categoryInfo.items.length > 0">
		<h2 class="uk-heading-divider">Items in this Category</h2>
		<ul  class="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@m uk-child-width-1-4@l" uk-grid uk-height-match="target: .uk-card">
			<li v-for="item in categoryInfo.items" :key="item.id">
				<Item :id="item.id" :title="item.title" :brandId="item.brands.id" :brandTitle="item.brands.title" />
			</li>
		</ul>
	</template>
	<template v-else>
		<p class="uk-alert uk-alert-warning uk-text-center">
			Categoria vacia
		</p>
	</template>

	<pre>
		{{ category }}
	</pre>
</template>