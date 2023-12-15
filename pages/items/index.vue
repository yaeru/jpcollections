<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: items } = await useAsyncData(async () => {
		const { data } = await supabase.from('items').select('*, brands(id, title), franchises(id, title)')
		return data
	});

</script>

<template>
	<h1>Items</h1>
	<ul class="uk-grid uk-child-width-1-2@s uk-grid uk-child-width-1-3@m uk-child-width-1-5@l" uk-grid uk-height-match="target: .uk-card">
		<li v-for="item in items" :key="item.id">
			<Item :id="item.id" :title="item.title" :brandId="item.brands.id" :brandTitle="item.brands.title" />
		</li>
	</ul>

	<pre>
		{{ items }}
	</pre>
</template>