<template>
	<div class="uk-grid uk-flex-middle" uk-grid>
		<div class="uk-width-1-5">
			<figure class="uk-card uk-card-body uk-card-default uk-card-small uk-text-center">
				<slot name="image"></slot>
			</figure>
		</div>
		<div class="uk-width-expand">
			<h1>
				<slot name="title"></slot>
			</h1>
			<p>
				<slot name="description"></slot>
			</p>
		</div>
	</div>
</template>