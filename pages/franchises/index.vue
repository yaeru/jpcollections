<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: franchises } = await useAsyncData(async () => {
		const { data } = await supabase.from('franchises').select('*')
		return data
	});

</script>

<template>
	<h1>Franchises</h1>
	<ul>
		<li v-for="franchise in franchises" :key="franchise.id">
			{{franchise.title}} -
			<NuxtLink :to="'/franchises/' + franchise.id">
				Ver
			</NuxtLink>
		</li>
	</ul>

	<pre>
		{{ franchises }}
	</pre>
</template>