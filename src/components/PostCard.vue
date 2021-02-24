<template>
	<div class="post-card">
		<div class="card" :title="body">
			<div class="card-image">
				<figure class="image is-square" style="padding-top: 50%;">
					<img :src="image" alt="Placeholder image"
						:class="checkImage(title)" :id="'image-' + title">
				</figure>
			</div>
			<div class="card-content">
				<div class="media">
					<div class="media-content">
						<p class="title is-4" style="min-height: 60px;">{{title}}</p>
					</div>
				</div>
				<div class="content">
					<p style="min-height: 100px;">{{snippet}}</p>
					<a :href="link" target="__blank" class="button is-fullwidth">
						{{ translate('view-project') }}
					</a>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: "PostCard",
		props: {
			title: String,
			date: String,
			snippet: String,
			body: String,
			image: String,
			slug: String,
			link: String
		},
		data() {
			return {
				lang: null
			}
		},
		mounted() {
			this.lang = sessionStorage.getItem('lan')
			!this.lang ? this.lang = 'pt' : null
			this.$parent.$parent.$on('changeLang', this.setLang)
		},
		computed: {
			language() {
				return this.lang
			}
		},
		methods: {
			setLang(lang) {
				this.lang = lang
			},
			checkImage(title) {
				
				if (this.image.indexOf('krishna-said.png') > -1) {
					
					setTimeout( () => {
						document.getElementById(`image-${title}`).classList.add('less-width')
					},2000)
				} 
				
			},
			translate(section) {
				switch(section) {
					case 'view-project':
						if (this.language === 'pt') {
							return 'Ver projeto'
						} else {
							return 'View Project'
						}

				}
			}
		},
	}
</script>

<style>
	.img-style {
		padding: 1%; 
		margin: 4% auto; 
		height: 95%; 
		width: 95%;
	}

	.less-width {
		width: 35% !important;
		margin: 0 auto;
	}
</style>