<script setup lang="ts">
import { onMounted } from 'vue'
import RecentSearches from '@/components/Search/RecentSearches/RecentSearches.vue'

onMounted(() => {
	window.scroll(0,0)
})
</script>


<template>

	<section class="dashboard mt_5">
		

		<section class="collections_blueprint">

			<img src="/imgs/blueprint.jpg" />

		</section>

		<section class="site_status_notification">
			<p>
				Hello, this is a static-site demo and not all features of the full application are available.
			</p>
			<p>
				This site is under development and not all design features are yet optimized for IOS platforms,
				nor is the site yet responsive on mobile and smaller platforms.
			</p>
		</section>

		<RecentSearches />
	
	</section>

</template>


<style scoped>
section.dashboard {
	display:grid;
	grid-template-columns:1fr;
}
section.dashboard section {
	margin:1rem;
	padding:1rem 2rem;
	/* border:solid 1px white; */
	border-radius:.5rem;
}
@media (min-width: 768px) {
	section.dashboard {
		grid-template-columns:1.5fr 1fr 1fr;
	}
}
ul {
	list-style:none;
	user-select: none;
}
section.site_status_notification {
	/* border:solid 1px white; */
	border-radius:.5rem;
}

img {
	border:solid 1px black;
	border-radius:.5rem;
	max-width:100%;
}
</style>