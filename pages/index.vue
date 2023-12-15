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
		<div class="uk-grid uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l" uk-grid uk-height-match="target: .uk-card">
			<div v-for="brand in brands" :key="brand.id">
				<NuxtLink :to="'/brands/' + brand.id">
					<div class="uk-card uk-card-default uk-card-small">
						<div class="uk-card-media-top">
							<img src="https://getuikit.com/docs/images/light.jpg" width="1800" height="1200" alt="">
						</div>
						<div class="uk-card-body">
							<h3 class="uk-card-title">{{brand.title}}</h3>
						</div>
					</div>
				</NuxtLink>
			</div>
		</div>
	</section>

	<section class="uk-section uk-section-small">
		<h2>Franchises <NuxtLink to="/franchises" class="uk-button uk-button-primary uk-button-small">See all</NuxtLink></h2>
		<div class="uk-grid uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l" uk-grid uk-height-match="target: .uk-card">
			<div v-for="franchise in franchises" :key="franchise.id">
				<NuxtLink :to="'/franchises/' + franchise.id">
					<div class="uk-card uk-card-default uk-card-small">
						<div class="uk-card-media-top">
							<img src="https://getuikit.com/docs/images/light.jpg" width="1800" height="1200" alt="">
						</div>
						<div class="uk-card-body">
							<h3 class="uk-card-title">{{franchise.title}}</h3>
						</div>
					</div>
				</NuxtLink>
			</div>
		</div>
	</section>
	
</template>