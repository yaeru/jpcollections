<script setup lang="ts">
	definePageMeta({
		middleware: 'authenticated',
	});
	
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	
	const { data: useritems } = await useAsyncData(async () => {
		const { data: { user } } = await supabase.auth.getUser()
		const { data } = await supabase.from('view_my_items').select('*').eq('user_id', user.id)
		return data
	});
</script>

<template>

	<PageHead>
		<template v-slot:image>
			<img src="assets/placeholder.png" width="200" height="200">
		</template>
		<template v-slot:title>
			User
		</template>
		<template v-slot:description>
			<ul class="uk-list">
				<li>Email: {{ user.email }}</li>
			</ul>
		</template>
	</PageHead>

	<section class="uk-section uk-section-small">
		<h3>My current items</h3>

		<GridGeneral v-if="useritems.length > 0">
			<li v-for="item in useritems" :key="item.id">
				<Item :id="item.items_id" :title="item.title"  />
			</li>
		</GridGeneral>
		<AppAlert v-else state="danger">No hay Items en tu coleccion. Añadí algunos de <NuxtLink to="/items">acá!</NuxtLink></AppAlert>
	</section>

</template>