<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';

	const supabase = useSupabaseClient();

	const filtro = ref('');
	const filtroBrands = ref({});
	const filtroFranchises = ref({});
	const brands = ref([]);
	const franchises = ref([]);
	const items = ref([]);

	onMounted(async () => {
		// Obtener datos de Supabase al cargar la página
		const { data } = await supabase.from('items').select('id, title, brands(id, title), franchises(id, title)');
		items.value = data;
		// Obtener marcas únicas de los datos
		brands.value = Array.from(new Set(data.map(item => item.brands)));
		// Inicializar el objeto de filtroBrands con todas las marcas
		brands.value.forEach(brand => {
			filtroBrands.value[brand.id] = false;
		});

		// Obtener franchises únicas de los datos
		franchises.value = Array.from(new Set(data.map(item => item.franchises)));
		// Inicializar el objeto de filtrofranchises con todas las franchises
		franchises.value.forEach(franchise => {
			filtroFranchises.value[franchise.id] = false;
		});
	});

	const itemsFiltrados = computed(() => {
		return items.value.filter(item => {
			const filtroNombre = item.title.toLowerCase().includes(filtro.value.toLowerCase());
			const filtroBrand =
			Object.entries(filtroBrands.value).every(([brandId, isChecked]) => {
				return !isChecked || (isChecked && parseInt(brandId) === item.brands.id);
			})
			const filtroFranchise =
			Object.entries(filtroFranchises.value).every(([franchiseId, isChecked]) => {
				return !isChecked || (isChecked && parseInt(franchiseId) === item.franchises.id);
			})
			return filtroNombre && filtroBrand && filtroFranchise;
		});
	});
	const pageTitle = 'Items'
	useSeoMeta({
		title:  pageTitle,
		ogTitle: pageTitle,
	})

</script>

<template>
	<h1>{{pageTitle}}</h1>
	<div class="uk-grid" uk-grid>
		<aside class="uk-width-1-3@s uk-width-1-4@m" uk-margin>
			
			<!-- Filtros para marcas -->
			<div class="uk-card uk-card-default uk-height-1-1 uk-card-body uk-card-small">
				<h4>Brands</h4>
				<ul class="uk-list uk-list-divider">
					<li v-for="brand in brands" :key="brand.id">
						<input type="checkbox" :name="brand.title" :id="brand.title" v-model="filtroBrands[brand.id]" :value="brand.id">
						<label :for="brand.title" class="uk-margin-small-left">{{ brand.title }}</label>
					</li>
				</ul>


				<!-- Filtros para franquicias -->

				<h4>Franchises</h4>
				<ul class="uk-list uk-list-divider">
					<li v-for="franchise in franchises" :key="franchise.id">
						<input type="checkbox" :name="franchise.title" :id="franchise.title" v-model="filtroFranchises[franchise.id]" :value="franchise.id">
						<label :for="franchise.title" class="uk-margin-small-left">{{ franchise.title }}</label>
					</li>
				</ul>
			</div>
		</aside>
		<main class="uk-width-2-3@s uk-width-3-4@m">

			<form class="uk-search uk-search-default uk-margin-bottom uk-width-expand">
				<span uk-search-icon></span>
				<input v-model="filtro" class="uk-search-input uk-input uk-form-large uk-width-expand" type="search" placeholder="Search items" aria-label="Search">
			</form>

			<ul class="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@m uk-child-width-1-4@l" uk-grid uk-height-match="target: .uk-card">
				<li v-for="item in itemsFiltrados" :key="item.id">
					<Item :id="item.id" :title="item.title" :brandId="item.brands.id" :brandTitle="item.brands.title" />
				</li>
			</ul>
		</main>
	</div>
</template>