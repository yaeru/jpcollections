<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: franchises } = await useAsyncData(async () => {
		const { data } = await supabase.from('franchises').select('id,title,logo').order('id', { ascending: true })
		return data
	});
	const pageTitle = "Franchises"
	useSeoMeta({
		title:  pageTitle,
		ogTitle: pageTitle,
	})
</script>

<template>
	<h1>{{pageTitle}}</h1>
	<GridGeneral>
		<li v-for="franchise in franchises" :key="franchise.id">
			<FranchiseItem :id="franchise.id" :title="franchise.title" :logo="franchise.logo" />
		</li>
	</GridGeneral>

	<!-- <pre>
		{{ franchises }}
	</pre> -->
</template>