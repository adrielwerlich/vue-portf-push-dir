<template>
	<div>
		<section class="hero is-medium is-primary is-bold">
			<div class="hero-body">
				<div class="container">
					<h1 class="title is-2">
						{{ translate('touch') }}
					</h1>
				</div>
			</div>
		</section>
		<section class="section">
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-one-third">
						<div class="box">					
							<h3 class="is-size-4 has-text-weight-medium">
								Email
							</h3>
							<p>
								<a href="mailto:adrielwerlich@gmail.com">adrielwerlich@gmail.com</a>
							</p>
							<h3 class="is-size-4 has-text-weight-medium">
								Linkedin
							</h3>
							<p>
								<a href="https://www.linkedin.com/in/adriel-werlich-61430428/">Linkedin - Adriel</a>
							</p>
							<h3 class="is-size-4 has-text-weight-medium">
								Github
							</h3>
							<p>
								<a href="https://github.com/adrielwerlich">github.com/adrielwerlich</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>

export default {
  name: "contact",

	mounted() {
		this.$route.params.lang ? this.language = this.$route.params.lang : null
		this.$parent.$on('changeLang', this.setLang)
	},

	methods: {
		
		setLang(lang) {
				this.language = lang
			},
			translate(section) {
				switch (section) {
					case 'touch':
						if (this.language == 'en') {
							return 'Get In Touch'
						} else if (this.language == 'pt') {
							return 'Entre em contato'
						}
				}
			}
	},
};

</script>
