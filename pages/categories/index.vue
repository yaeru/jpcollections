<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: categories } = await useAsyncData(async () => {
		const { data } = await supabase.from('category').select('*')
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
	<ul>
		<li v-for="category in categories" :key="category.id">
			{{category.title}} -
			<NuxtLink :to="'/categories/' + category.id">
				Ver
			</NuxtLink>
		</li>
	</ul>

	<pre>
		{{ brands }}
	</pre>
</template>