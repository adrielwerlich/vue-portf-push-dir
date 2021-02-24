<template>
	<div>
		<section class="hero is-medium is-primary is-bold">
			<div class="hero-body">
				<div class="container">
					<h1 class="title is-2">
						{{ translate('ive_built') }}
					</h1>
				</div>
			</div>
		</section>
		<section class="section">
			<div class="container is-fluid">
				<div class="columns is-multiline">
					<div class="column is-one-third" v-for="project in projects" 
						v-show="project.language === language">
						<post-card v-bind="project"></post-card>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style type="text/css">

</style>

<script>
	import ProjectsService from '@/services/ProjectsService'
	import PostCard from '@/components/PostCard'
	export default {
		name: "projects",
		components: {
			PostCard
		},
		data() {
			return {
				airtableResponse: [],
				language: 'pt'
			}
		},
		mounted: function () {
			let self = this

			async function getProjects() {
				try {
					const response = await ProjectsService.getProjects()

					self.airtableResponse = response

				} catch (err) {
					console.log(err)
				}
			}
			getProjects()

			this.$route.params.lang ? this.language = this.$route.params.lang : null
			this.$parent.$on('changeLang', this.setLang)

		},
		computed: {
			projects() {
				let self = this
				let projectList = []
				for (var i = 0; i < self.airtableResponse.length; i++) {
					if (Object.keys(self.airtableResponse[i].fields).length > 0){
					let project = {
						title: self.airtableResponse[i].fields.Title,
						date: self.airtableResponse[i].fields["Date Published"],
						snippet: self.airtableResponse[i].fields.Excerpt,
						image: self.airtableResponse[i].fields.Image[0].url,
						slug: self.airtableResponse[i].fields.slug,
						language: self.airtableResponse[i].fields.language,
						link: self.airtableResponse[i].fields.link,
						body: self.airtableResponse[i].fields.Body
					}
					projectList.push(project)
					}
				}
				return projectList
			}
		},

		methods: {
			setLang(lang) {
				this.language = lang
			},
			translate(section) {
				switch (section) {
					case 'ive_built':
						if (this.language == 'en') {
							return 'Projects that I have built'
						} else if (this.language == 'pt') {
							return 'Projetos que construí'
						}

				}
			}
		},
	}
</script>