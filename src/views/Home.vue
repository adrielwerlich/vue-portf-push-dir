<template>
	<div>
		<div class="hero-home is-cover is-relative is-fullheight-with-navbar is-primary">
			<div class="hero-body">
				<div class="container">
					<h1 class="title is-1"> {{ translate('greeting') }} Adriel.</h1>
					<h2 class="subtitle is-3"> {{ translate('intro') }} </h2>
				</div>
			</div>
			<carousel-3d v-show="slidesPt && slidesPt.length > 0  && language === 'pt'" :autoplay="true" 
				:autoplay-timeout="5000" :height="410"
				:controls-visible="true">
				<slide v-for="(slide, i) in slidesPt" :index="i">
					<post-card v-bind="slide"></post-card>
				</slide>
			</carousel-3d>
			<carousel-3d v-show="slidesEn && slidesEn.length > 0 && language === 'en'" :autoplay="true" 
				:autoplay-timeout="5000" :height="410"
				:controls-visible="true">
				<slide v-for="(slide, i) in slidesEn" :index="i">
					<post-card v-bind="slide"></post-card>
				</slide>
			</carousel-3d>
		</div>
	</div>
</template>

<script>
	import { Carousel3d, Slide } from 'vue-carousel-3d'
	import ProjectsService from '@/services/ProjectsService'
	import PostCard from '@/components/PostCard'
	export default {
		name: "home",
		components: {
			'carousel-3d': Carousel3d,
			'slide': Slide,
			'post-card': PostCard
		},
		mounted() {
		},
		computed: {
			slidesEn() {
				if (this.projectsEn && this.projectsEn.length > 0) {
					return this.projectsEn
				}
				return null
			},
			slidesPt() {
				if (this.projectsPt && this.projectsPt.length > 0) {
					return this.projectsPt
				}
				return null
			}
		},
		data() {
			return {
				language: 'pt',
				projectsPt: [],
				projectsEn: [],
			}
		},
		created() {

			const self = this
			ProjectsService.getProjects()
				.then(projects => {
					for (var i = 0; i < projects.length; i++) {
						let project = {
							title: projects[i].fields.Title,
							date: projects[i].fields["Date Published"],
							snippet: projects[i].fields.Excerpt,
							image: projects[i].fields.Image[0].url,
							slug: projects[i].fields.slug,
							language: projects[i].fields.language,
							link: projects[i].fields.link,
							body: projects[i].fields.Body
						}
						if (project.language === 'pt') {
							self.projectsPt.push(project)
						} else {
							self.projectsEn.push(project)
						}
					}
				})
				.catch(err => {
					console.log(err)
				})

			this.$parent.$on('changeLang', this.setLang)
		},
		methods: {
			setLang(lang) {
				this.language = lang //= 'en' ? this.language = 'pt' : this.language = 'en'
			},
			translate(section) {
				switch (section) {
					case 'greeting':
						if (this.language == 'en') {
							return 'Hello, I\'m'
						} else if (this.language == 'pt') {
							return 'Olá, me chamo'
						}
					case 'intro':
						if (this.language == 'en') {
							return 'A solution delivery focused, technically minded web developer'
						} else if (this.language == 'pt') {
							return 'Um desenvolvedor web com mindset inovador focado em entregar soluções'
						}

				}
			},
		},
	};
	// let projectList = []

				// for (var i = 0; i < this.projects.length; i++) {
				// 	if (Object.keys(this.projects[i].fields).length > 0) {
				// 		let project = {
				// 			title: this.projects[i].fields.Title,
				// 			date: this.projects[i].fields["Date Published"],
				// 			snippet: this.projects[i].fields.Excerpt,
				// 			image: this.projects[i].fields.Image[0].url,
				// 			slug: this.projects[i].fields.slug,
				// 			language: this.projects[i].fields.language,
				// 			link: this.projects[i].fields.link,
				// 			body: this.projects[i].fields.Body
				// 		}
				// 		projectList.push(project)
				// 	}
				// }
				// return projectList
</script>

<style>
	.carousel-3d-slide {
		padding: 3%;
	}

	.hero-body {
		/* height: 1400px; */
	}

	.carousel-3d-container {
		/* position: absolute; */
		top: 40%;
		/* width: 85%; */
	}
</style>