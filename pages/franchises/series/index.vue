<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: series } = await useAsyncData(async () => {
		const { data } = await supabase.from('series').select('*')
		return data
	});

	const pageTitle = 'Series'
	useSeoMeta({
		title:  pageTitle,
		ogTitle: pageTitle,
	})

</script>

<template>
	<h1>{{pageTitle}}</h1>
	<ul>
		<li v-for="serie in series" :key="serie.id">
			{{serie.title}} -
			<NuxtLink :to="'/series/' + serie.id">
				Ver
			</NuxtLink>
		</li>
	</ul>

	<pre>
		{{ series }}
	</pre>
</template>