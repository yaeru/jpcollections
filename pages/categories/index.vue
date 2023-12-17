<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: categories } = await useAsyncData(async () => {
		const { data } = await supabase.from('category').select('id, title, items(id, title, brands(id,title))')
		return data
	});

	const pageTitle = 'Categories'
	useSeoMeta({
		title:  pageTitle,
		ogTitle: pageTitle,
	})

</script>

<template>
	<h1>{{pageTitle}}</h1>

	<ul uk-tab>
		<li v-for="category in categories" :key="category.id">
			<a href="#">{{category.title}}</a>
		</li>
	</ul>

	<ul class="uk-switcher uk-margin">
		<li v-for="category in categories" :key="category.id">
			<GridGeneral>
				<li v-for="item in category.items" :key="item.id">
					<Item :id="item.id" :title="item.title" :brandId="item.brands.id" :brandTitle="item.brands.title" />
				</li>
			</GridGeneral>
		</li>
	</ul>


	<ul>
		<li v-for="category in categories" :key="category.id">
			<NuxtLink :to="'/categories/' + category.id">
				{{category.title}}
			</NuxtLink>
		</li>
	</ul>

	<!-- <pre>
		{{ categories }}
	</pre> -->
</template>