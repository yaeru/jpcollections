<script setup lang="ts">
	const user = useSupabaseUser();
	const supaAuth = useSupabaseClient().auth;

	const logout = async () => {
		const { error } = await supaAuth.signOut();
		if (error) {
			alert(error.message);
		} else {
			//return navigateTo('/login');
		}
	};
</script>

<template>
	<nav class="uk-navbar-container">
		<div class="uk-container">
			<div class="uk-navbar" uk-navbar>
				<div class="uk-navbar-left">
					<NuxtLink to="/" class="uk-navbar-item uk-logo">JP Collections</NuxtLink>
					<ul class="uk-navbar-nav uk-visible@m">
						<li>
							<NuxtLink to="/">Home</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/items">Items</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/brands">Brands</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/franchises">Franchises</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/profiles">Profiles</NuxtLink>
						</li>
					</ul>		
				</div>

				<div class="uk-navbar-right">
					<ul class="uk-navbar-nav">
						<template v-if="!user">
							<li>
								<NuxtLink to="/login">Login</NuxtLink>
							</li>
							<li>
								<NuxtLink to="/register">Register</NuxtLink>
							</li>
						</template>
						<template v-else>
							<div class="uk-navbar-item">
								<NuxtLink to="/profile" class="uk-button uk-button-default"><span uk-icon="icon: database"></span> My Collection</NuxtLink>
							</div>
							<li>
								<a href="#" uk-icon="icon: chevron-down">
									<span class="uk-hidden@m">😎</span>
									<span class="uk-visible@m">
										{{ user.email }}
									</span>
								</a>
								<div class="uk-navbar-dropdown">
									<ul class="uk-nav uk-navbar-dropdown-nav">
										<li class="uk-nav-header">{{ user.email }}</li>
										<li class="uk-nav-divider"></li>
										<li><NuxtLink to="/profile">Mi Perfil</NuxtLink></li>
										<li class="uk-nav-divider"></li>
										<li><a href="" @click="logout">Salir</a></li>
									</ul>
								</div>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</template>