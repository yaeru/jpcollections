<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: brands } = await useAsyncData(async () => {
		const { data } = await supabase.from('brands').select('*').order('id', { ascending: true })
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

	<GridGeneral>
		<li v-for="brand in brands" :key="brand.id">
			<BrandItem :id="brand.id" :title="brand.title" :logo="brand.logo" />
		</li>
	</GridGeneral>

	<!-- <pre>
		{{ brands }}
	</pre> -->
</template>