<script setup lang="ts">
	const supabase = useSupabaseClient();
	const route = useRoute();
	const profileId = ref('');

	console.log(route.params.id)

	const { data: profile } = await useAsyncData(async () => {
		const { data } = await supabase
		.from('profiles').select('*').eq('id', route.params.id);
		return data;
	});

	// Obtén el primer elemento del array o un objeto vacío si el array está vacío
	const profileInfo = profile.value[0] || {};
</script>

<template>
	<h1>Nombre: {{ profileInfo.full_name }}</h1>
	<pre>
		{{ profile }}
	</pre>
</template>