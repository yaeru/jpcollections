<script setup lang="ts">
	const supabase = useSupabaseClient();

	const { data: brands } = await useAsyncData(async () => {
		const { data } = await supabase.from('brands').select('id, title,logo').order('id', { ascending: true })
		return data
	});
	const { data: franchises } = await useAsyncData(async () => {
		const { data } = await supabase.from('franchises').select('id, title,logo').order('id', { ascending: true })
		return data
	});

</script>

<template>
	<h1>Changelog</h1>
	<p class="uk-text-lead">
		All notable changes to this project will be documented in this file.
	</p>
<article class="uk-section uk-section-small">
	<h2 class="uk-h3 uk-heading-divider">
		[0.1] - 2023-12-25
	</h2>
	<p>
		Lanzamiento Beta
	</p>
	<h4>
		Added
	</h4>
	<ul>
		<li>Google Tag Manager</li>
		<li>Términos y condiciones en Registro</li>
		<li>Changelog</li>
	</ul>
	<h4>
		Changed
	</h4>
	<ul>
		<li>Limpieza de tests</li>
	</ul>
	<h4>
		Fixed
	</h4>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.
	</p>
</article>
</template>