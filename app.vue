<script setup lang="ts">
	// useSeoMeta({
	// 	title: 'JP Collections',
	// 	ogTitle: 'JP Collections',
	// 	description: 'This is JP Collections, let me tell you all about it.',
	// 	ogDescription: 'This is my amazing site, let me tell you all about it.',
	// 	ogImage: 'https://example.com/image.png',
	// 	twitterCard: 'summary_large_image',
	// })

	// useSeoMeta({
	// 	titleTemplate: (titleChunk) => {
	// 		return titleChunk ? `${titleChunk} - JP Collections` : 'JP Collections';
	// 	},
	// 	description: 'This is JP Collections, let me tell you all about it.',
	// 	ogDescription: 'This is my amazing site, let me tell you all about it.',
	// })

	useSeoMeta({
		titleTemplate: '%s - JP Collections',
		ogTitle: '%s - JP Collections',
		description: 'This is JP Collections, let me tell you all about it.',
		ogDescription: 'This is my amazing site, let me tell you all about it.',
	})
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
