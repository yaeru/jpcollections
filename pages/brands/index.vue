<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: brands } = await useAsyncData(async () => {
		const { data } = await supabase.from('brands').select('*')
		return data
	});

	const pageTitle = 'Brands'
	useSeoMeta({
		title:  pageTitle,
		ogTitle: pageTitle,
	})

</script>

<template>
	<h1>{{pageTitle}}</h1>
	<ul>
		<li v-for="brand in brands" :key="brand.id">
			{{brand.title}} -
			<NuxtLink :to="'/brands/' + brand.id">
				Ver
			</NuxtLink>
		</li>
	</ul>

	<pre>
		{{ brands }}
	</pre>
</template>