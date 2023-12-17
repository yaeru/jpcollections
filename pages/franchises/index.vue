<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: franchises } = await useAsyncData(async () => {
		const { data } = await supabase.from('franchises').select('id,title,logo').order('id', { ascending: true })
		return data
	});

</script>

<template>
	<h1>Franchises</h1>
	<GridGeneral>
		<li v-for="franchise in franchises" :key="franchise.id">
			<FranchiseItem :id="franchise.id" :title="franchise.title" :logo="franchise.logo" />
		</li>
	</GridGeneral>

	<!-- <pre>
		{{ franchises }}
	</pre> -->
</template>