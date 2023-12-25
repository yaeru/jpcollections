<template>
	<div class="page-head uk-grid uk-flex-middle uk-grid-match" uk-grid>
		<div class="uk-width-1-5@m">
			<figure class="uk-card uk-card-body uk-card-default uk-card-small uk-text-center uk-flex uk-flex-middle uk-flex-center">
				<slot name="image"></slot>
			</figure>
		</div>
		<div class="uk-width-expand">
			<h1 class="uk-margin-remove-bottom">
				<slot name="title"></slot>
			</h1>
			<p class="uk-text-lead">
				<slot name="description"></slot>
			</p>
		</div>
	</div>
</template>