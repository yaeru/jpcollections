<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: franchises } = await useAsyncData(async () => {
		const { data } = await supabase.from('franchises').select('*, series(id, title)')
		return data
	});

</script>

<template>
	<h1>Franchises</h1>
	<ul class="uk-list">
		<li v-for="franchise in franchises" :key="franchise.id">
			<NuxtLink :to="'/franchises/' + franchise.id">{{franchise.title}}</NuxtLink>
			<ul>
				<li v-for="serie in franchise.series" :key="serie.id">
					<NuxtLink :to="'/franchises/' + franchise.id + '/series/' + serie.id">{{serie.title}}</NuxtLink>
				</li>
			</ul>
		</li>
	</ul>

	<pre>
		{{ franchises }}
	</pre>
</template>