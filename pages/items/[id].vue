<script setup lang="ts">
	import { ref, onMounted } from 'vue';

	const supabase = useSupabaseClient();
	const user = useSupabaseUser();
	const route = useRoute();
	const itemId = ref('');
	const isInCollection = ref(false);	
	
	onMounted(async () => {
		const { data: { user } } = await supabase.auth.getUser();
		if (user) {
			// Comprueba si el item está en la colección del usuario
			isInCollection.value = useritems.value.some((userItem) => userItem.items_id === itemInfo.id);
		}
	});

	const { data: item } = await useAsyncData(async () => {
		const { data } = await supabase
		.from('items').select('*, category(id, title), brands(id, title, logo), franchises(id, title, logo), series(id, title, logo))').order('id', { ascending: true }).eq('id', route.params.id);
		return data;
	});

	const { data: useritems } = await useAsyncData(async () => {
		const { data: { user } } = await supabase.auth.getUser()
		const { data } = await supabase.from('view_my_items').select('*').eq('user_id', user.id)
		return data
	});
	const { data: userItemsTableId } = await useAsyncData(async () => {
		const { data: { user } } = await supabase.auth.getUser()
		const { data } = await supabase.from('userItems').select('id').eq('items_id', route.params.id)
		return data
	});

	// Obtén el primer elemento del array o un objeto vacío si el array está vacío
	const itemInfo = item.value[0] || {};
	const userItemsTableIdInfo = userItemsTableId.value[0] || {};

	const addtocollection = async () => {
		const { data: { user } } = await supabase.auth.getUser();
		const { data } = await supabase.from('userItems').insert([{ user_id: user.id, items_id: itemInfo.id }]).select('id');

    	// Actualizar el estado local con el nuevo ID de la relación
		if (data && data.length > 0) {
			isInCollection.value = true;
			userItemsTableIdInfo.id = data[0].id;
		}
	};

	const removetocollection = async () => {
		const { data: { user } } = await supabase.auth.getUser();

    	// Usar el ID existente o el ID del itemInfo
		const itemId = userItemsTableIdInfo.id || itemInfo.id;

		if (itemId) {
			const { data } = await supabase.from('userItems').delete().eq('id', itemId);
        	// Actualizar el estado local
			isInCollection.value = false;
		}
	};

	const pageTitle = itemInfo.title
	useSeoMeta({
		title:  pageTitle,
		ogTitle: pageTitle,
	})
</script>

<template>

	<div class="uk-grid" uk-grid>
		<figure class="uk-width-2-5@m uk-width-1-3@l">
			<img v-if="itemInfo.picture" :src="itemInfo.picture" :alt="itemInfo.title" class="uk-border-rounded" width="100%">
			<img v-else src="assets/placeholder.png" class="uk-border-rounded" width="100%">

			<div class="uk-visible@m uk-margin-small-top">
				<template v-if="user">
					<NuxtLink v-if="!isInCollection" class="uk-button uk-button-primary uk-width-expand" @click="addtocollection">
						<span class="uk-margin-small-right" uk-icon="check"></span> Añadir a mi colección
					</NuxtLink>

					<NuxtLink v-if="isInCollection" class="uk-button uk-button-danger uk-width-expand" @click="removetocollection">
						<span class="uk-margin-small-right" uk-icon="close"></span> Quitar de mi colección
					</NuxtLink>
				</template>
				<template v-else>
					<NuxtLink to="/login" class="uk-button uk-button-primary uk-width-expand">
						Ingresa para administrar tu cuenta
					</NuxtLink>
				</template>
			</div>
		</figure>
		<div class="uk-width-3-5@m uk-width-2-3@l">
			<h1>{{ itemInfo.title }}</h1>

			<div class="uk-grid uk-grid-small" uk-grid>
				<div class="uk-width-2-3@m">
					<ul class="uk-list uk-list-divider">
						<li v-if="itemInfo.category">Category: <NuxtLink :to="'/categories/' + itemInfo.category.id"> {{ itemInfo.category.title }}</NuxtLink></li>
						<li>Brand: <NuxtLink :to="'/brands/' + itemInfo.brands.id"> {{ itemInfo.brands.title }}</NuxtLink></li>
						<li>Franchise: <NuxtLink :to="'/franchises/' + itemInfo.franchises.id"> {{ itemInfo.franchises.title }}</NuxtLink></li>
						<li v-if="itemInfo.series">Series: <NuxtLink :to="'/franchises/' + itemInfo.franchises.id + '/series/' + itemInfo.series.id">{{ itemInfo.series.title }}</NuxtLink></li>
					</ul>
				</div>
				<div class="uk-width-expand@m item-boxes uk-text-center uk-align-right@m" uk-margin>
					<div class="uk-card uk-card-body uk-card-small uk-card-default">
						<img :src="itemInfo.brands.logo" :alt="itemInfo.brands.title" v-if="itemInfo.brands.logo">
						<img v-else src="assets/placeholder.png" :alt="itemInfo.brands.title">
					</div>
				</div>
			</div>

			<section class="item-boxes uk-margin-medium">
				<div class="uk-grid uk-grid-small uk-flex-middle uk-child-width-1-3 uk-child-width-expand@m uk-text-center" uk-grid uk-height-match="target: .uk-card">

					<!-- <div>
						<div class="uk-card uk-card-body uk-card-small uk-card-default">
							<img :src="itemInfo.brands.logo" :alt="itemInfo.brands.title" v-if="itemInfo.brands.logo">
							<img v-else src="assets/placeholder.png" :alt="itemInfo.brands.title">
						</div>
					</div> -->

					<div>
						<div class="uk-card uk-card-body uk-card-small uk-card-default">
							<img :src="itemInfo.series.logo" :alt="itemInfo.series.title" v-if="itemInfo.series">
							<img :src="itemInfo.franchises.logo" :alt="itemInfo.franchises.title" v-else>
						</div>
					</div>
					<div v-if="itemInfo.code">
						<div class="uk-card uk-card-body uk-card-small uk-card-default">
							<div class="item-code">
								<img :src="'/codes/code-' + itemInfo.franchises.title.replace(/\s+/g, '') + '.svg'" width="50" class="item-code-letters">
								<div class="item-code-number">
									{{ itemInfo.code }}
								</div>
							</div>
						</div>
					</div>
					<!-- <div>
						<div class="uk-card uk-card-body uk-card-small uk-card-default">
							📂<br>
							{{ itemInfo.category.title }}
						</div>
					</div> -->
					<div v-if="itemInfo.release_year">
						<div class="uk-card uk-card-body uk-card-small uk-card-default">
							📅<br>
							{{ itemInfo.release_year }}
						</div>
					</div>
					<div>
						<div class="uk-card uk-card-body uk-card-small uk-card-default">
							<template v-if="itemInfo.type === 'Dinosaurio' ">
								🦖
							</template>
							<template v-if="itemInfo.type === 'Humano' ">
								🙍‍♂️
							</template>
							<template v-if="itemInfo.type === 'Vehículo' ">
								🚙
							</template>
							<template v-if="itemInfo.type === 'Set' ">
								🏘️
							</template>
							<template v-if="itemInfo.type === 'Otro' ">
								🎲
							</template>
							<br>
							{{itemInfo.type}}
						</div>
					</div>
				</div>
			</section>

			<div class="uk-hidden@m uk-margin-small-top">
				<template v-if="user">
					<NuxtLink v-if="!isInCollection" class="uk-button uk-button-primary uk-width-expand" @click="addtocollection">
						<span class="uk-margin-small-right" uk-icon="check"></span> Añadir a mi colección
					</NuxtLink>

					<NuxtLink v-if="isInCollection" class="uk-button uk-button-danger uk-width-expand" @click="removetocollection">
						<span class="uk-margin-small-right" uk-icon="close"></span> Quitar de mi colección
					</NuxtLink>

					<NuxtLink class="uk-button uk-button-default uk-width-expand uk-margin-small-top">
						<span class="uk-margin-small-right" uk-icon="heart"></span> Wishlist
					</NuxtLink>
				</template>
				<template v-else>
					<NuxtLink to="/login" class="uk-button uk-button-primary uk-width-expand">
						Ingresa para administrar tu cuenta
					</NuxtLink>
				</template>
			</div>
		</div>
	</div>

	<div class="uk-grid" uk-grid>
		<div class="uk-width-2-3@m">
			<h3>Info</h3>
			<AppAlert state="warning">Próximamente</AppAlert>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				consequat.
			</p>
		</div>
		<div class="uk-width-1-3@m">
			<h3>Accesories</h3>
			<AppAlert state="warning">Próximamente</AppAlert>
			<ul>
				<li>Lorem ipsum dolor sit amet, consectetur</li>
				<li>Lorem ipsum dolor sit amet, consectetur</li>
				<li>Lorem ipsum dolor sit amet, consectetur</li>
				<li>Lorem ipsum dolor sit amet, consectetur</li>
			</ul>
		</div>
	</div>
	<!-- <pre>
		{{ item }}
	</pre> -->
</template>