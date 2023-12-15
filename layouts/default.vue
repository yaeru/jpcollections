<script setup lang="ts">
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
</script>


<template>
	<Navbar />
	<main class="uk-container">
		<div class="uk-section uk-section-small">
			<slot />
		</div>
	</main>
	<footer class="uk-padding uk-text-center">
		<div class="uk-container uk-container-large">
			<p class="uk-margin-remove">© {{ new Date().getFullYear() }} - Todos los derechos reservados.</p>
		</div>
	</footer>
</template>