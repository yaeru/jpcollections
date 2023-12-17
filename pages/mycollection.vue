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

	const { data: brands } = await useAsyncData(async () => {
		const { data } = await supabase.from('brands').select('*')
		return data
	});
	const { data: franchises } = await useAsyncData(async () => {
		const { data } = await supabase.from('franchises').select('*')
		return data
	});
</script>

<template>
	<section class="uk-section uk-section-small">
		<h1>{{ user.email }}'s Collection</h1>
		<div class="uk-grid uk-grid-divider" uk-grid>
			<aside class="uk-width-1-4@m">
				<h3>Filters</h3>
				<h4>Brands</h4>
				<ul class="uk-list uk-list-divider">
					<li v-for="brand in brands" :key="brand.id">
						<input type="checkbox" :name="brand.title" :id="brand.title">
						<label :for="brand.title" class="uk-margin-small-left">{{brand.title}}</label>
					</li>
				</ul>

				<h4>Franchises</h4>
				<ul class="uk-list uk-list-divider">
					<li v-for="franchise in franchises" :key="franchise.id">
						<input type="checkbox" :name="franchise.title" :id="franchise.title">
						<label :for="franchise.title" class="uk-margin-small-left">{{franchise.title}}</label>
					</li>
				</ul>
			</aside>
			<main class="uk-width-3-4@m">
				<template v-if="useritems.length > 0">
					<GridGeneral>
						<li v-for="item in useritems" :key="item.id">
							<Item :id="item.items_id" :title="item.title"  />
						</li>
					</GridGeneral>
				</template>
				<template v-else>
					No hay Items en tu coleccion. Añadí algunos de <NuxtLink to="/items">acá!</NuxtLink>
				</template>
			</main>
		</div>
		<pre>
			{{useritems}}
		</pre>
	</section>

</template>