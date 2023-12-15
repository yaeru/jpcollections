<script setup lang="ts">
	const supabase = useSupabaseClient();

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
	<h1>Wellcome to JP Collections</h1>
	<section class="uk-section uk-section-small">
		<h2>Brands <NuxtLink to="/brands" class="uk-button uk-button-primary uk-button-small">See all</NuxtLink></h2>
		<ul class="uk-grid uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l" uk-grid uk-height-match="target: .uk-card">
			<li v-for="brand in brands" :key="brand.id">
				<BrandItem :id="brand.id" :title="brand.title" />
			</li>
		</ul>
	</section>

	<section class="uk-section uk-section-small">
		<h2>Franchises <NuxtLink to="/franchises" class="uk-button uk-button-primary uk-button-small">See all</NuxtLink></h2>
		<ul class="uk-grid uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l" uk-grid uk-height-match="target: .uk-card">
			<li v-for="franchise in franchises" :key="franchise.id">
				<FranchiseItem :id="franchise.id" :title="franchise.title" />
			</li>
		</ul>
	</section>
	
</template>