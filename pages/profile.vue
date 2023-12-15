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
	<section class="uk-section uk-section-small">
		<h1>User:</h1>
		<ul>
			<li>ID: {{ user.id }}</li>
			<li>Email: {{ user.email }}</li>
			<li>phone: {{ user.phone }}</li>
		</ul>
	</section>

	<section class="uk-section uk-section-small">
		<h3>My current items</h3>

		<template v-if="useritems.length > 0">
			<ul class="uk-grid uk-child-width-1-2@s uk-grid uk-child-width-1-3@m uk-child-width-1-5@l" uk-grid uk-height-match="target: .uk-card">
				<li v-for="item in useritems" :key="item.id">
					<Item :id="item.items_id" :title="item.title"  />
				</li>
			</ul>
		</template>
		<template v-else>
			No hay Items en tu coleccion. Añadí algunos de <NuxtLink to="/items">acá!</NuxtLink>
		</template>
		
		<pre>
			{{useritems}}
		</pre>
	</section>

</template>