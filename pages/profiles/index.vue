<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: profiles } = await useAsyncData(async () => {
		const { data } = await supabase.from('profiles').select('*')
		return data
	});

</script>

<template>
	<h1>Site Users</h1>
	<ul>
		<li v-for="profile in profiles" :key="profile.id">
			{{profile.full_name}} -
			<NuxtLink :to="'/profiles/' + profile.id">
				Ver
			</NuxtLink>
		</li>
	</ul>

	<pre>
		{{ profiles }}
	</pre>
</template>