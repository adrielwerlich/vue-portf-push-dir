<template>
	<div>
		<section class="hero is-medium is-primary is-bold">
			<div class="hero-body">
				<div class="container">
					<h1 class="title is-2">
						{{ translate('meet') }}
					</h1>
				</div>
			</div>
		</section>
		<section class="section">
			<h2 class="title is-3 has-text-weight-medium has-text-centered">
				{{ translate('proposal') }}
			</h2>
			<div class="container">
				<div class="columns">
					<div class="column">
						<div class="box">
							<h3 class="title is-4 has-text-weight-medium">
								Full Stack
							</h3>
							<p>
								{{ translate('focus') }}
							</p>
						</div>
					</div>
					<div class="column">
						<div class="box">
							<h3 class="title is-4 has-text-weight-medium">
								Full Stack Experience
							</h3>
							<p>
								{{ translate('exp') }}
							</p>
						</div>
					</div>
					<div class="column">
						<div class="box">
							<h3 class="title is-4 has-text-weight-medium">
								{{ translate('remote') }}
							</h3>
							<p>
								{{ translate('rem_exp') }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="section has-background-light">
			<h2 class="title is-3 has-text-weight-medium has-text-centered">
				{{ translate('origin') }}
			</h2>
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-four-fifths">
						<p>
							{{ translate('desc') }}
						</p>
					</div>
				</div>
			</div>
		</section>
		<section class="section">
			<h2 class="title is-3 has-text-weight-medium has-text-centered">
				{{ translate('techs') }}
			</h2>
			<div class="container">
				<div class="columns is-centered" style="flex-wrap: wrap;">
					<div class="column is-one-fifth">
						<div class="box">
							<figure class="image is-square">
								<img src="../assets/vue-logo.png" alt="Placeholder image">
							</figure>
							<h3 class="tech-box-title title is-4 has-text-weight-medium has-text-centered">
								Vue.js
							</h3>
							<p>
								Full production applications written in Vue
							</p>
						</div>
					</div>
					<div class="column is-one-fifth">
						<div class="box">
							<figure class="image is-square">
								<img src="../assets/js-logo.png" alt="Placeholder image">
							</figure>
							<h3 class="tech-box-title title is-4 has-text-weight-medium has-text-centered">
								JavaScript
							</h3>
							<p>
								Proficient in ES6 and ES5 JS
							</p>
						</div>
					</div>
					<div class="column is-one-fifth">
						<div class="box">
							<figure class="image is-square">
								<img src="../assets/node-logo.png" alt="Placeholder image">
							</figure>
							<h3 class="tech-box-title title is-4 has-text-weight-medium has-text-centered">
								Node.js
							</h3>
							<p>
								Back-ends written using Node and Express
							</p>
						</div>
					</div>
					<div class="column is-one-fifth">
						<div class="box">
							<figure class="image is-square">
								<img src="../assets/firebase-logo.png" alt="Placeholder image">
							</figure>
							<h3 class="tech-box-title title is-4 has-text-weight-medium has-text-centered">
								Firebase
							</h3>
							<p>
								Apps using Cloud Firestore and Cloud Storage
							</p>
						</div>
					</div>
					<div class="column is-one-fifth">
						<div class="box">
							<figure class="image is-square">
								<img src="../assets/adonis-logo.jpg" alt="Placeholder image">
							</figure>
							<h3 class="tech-box-title title is-4 has-text-weight-medium has-text-centered">
								Adonis
							</h3>
							<p>
								Apps using Adonis.js
							</p>
						</div>
					</div>
					<div class="column is-one-fifth">
						<div class="box">
							<figure class="image is-square">
								<img src="../assets/laravel-logo.png" alt="Placeholder image">
							</figure>
							<h3 class="tech-box-title title is-4 has-text-weight-medium has-text-centered">
								Laravel
							</h3>
							<p>
								Apps using Laravel
							</p>
						</div>
					</div>
				</div>
				<p class="tech-box-title title is-4 has-text-weight-light has-text-centered">
				Web API's • Mongodb • Vue •
					MySQL • MariaDB • Postgresql • Firebase • Js • Node.js • Android</p>
			</div>
		</section>
		<section class="section has-background-light">
			<h2 class="title is-3 has-text-weight-medium has-text-centered">
				{{ translate('drive') }}
			</h2>
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-half content">
						<ul>
							<li><Strong>{{ translate('desire') }}</Strong> 
								{{ translate('d1') }}	
							</li>
							<li><Strong>{{ translate('for_users') }}</Strong> 
								{{ translate('for_users1') }}
							</li>
							<li><Strong>{{ translate('better_world') }}</Strong> 
								{{translate('bw1') }}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style type="text/css">
	.box {
		height: 100%;
	}

	.tech-box-title {
		margin-top: 1.5rem;
	}
</style>

<script>

	export default {
		name: "about",
		data() {
			return {
				language: 'pt'
			}
		},
		created() {
			this.$route.params.lang ? this.language = this.$route.params.lang : null
			this.$parent.$on('changeLang', this.setLang)
		},
		methods: {
			setLang(lang) {
				this.language = lang //= 'en' ? this.language = 'pt' : this.language = 'en'
			},
			translate(section) {
				switch (section) {
					case 'meet':
						if (this.language == 'en') {
							return 'Meet Adriel'
						} else if (this.language == 'pt') {
							return 'Conheça Adriel'
						}
					case 'proposal':
						if (this.language == 'en') {
							return 'What I Bring'
						} else if (this.language == 'pt') {
							return 'Minha contribuição'
						}
					case 'focus':
						if (this.language == 'en') {
							return 'Experience in building user interfaces with JS (Vue, Vanilla Js, ES6), HTML, and CSS that are well designed and functional. In back-end with Node.js (Adonis, Express, Firebase) and Laravel(PHP)'
						} else if (this.language == 'pt') {
							return 'Experiência em construir interfaces de usuário com JS (Vue, Vanilla Js, ES6), HTML, e CSS que são bonitas e funcionais. No back-end Node.js (Adonis, Express, Firebase) and Laravel(PHP)'
						}
					case 'exp':
						if (this.language == 'en') {
							return 'Experience working across the application stack using APIs, Node, Mongo, Git, Firebase and Heroku to deliver production applications from design to deployment.'
						} else if (this.language == 'pt') {
							return 'Experiência trabalhando através de APIs, Node, Mongo, Git, Firebase e Heroku para produzir aplicações desde design até implantação'
						}
					case 'remote':
						if (this.language == 'en') {
							return 'Working experience with remote freelance'
						} else if (this.language == 'pt') {
							return 'Experiência de trabalho com freelance remoto'
						}
					case 'rem_exp':
						if (this.language == 'en') {
							return 'Interested in projects that are challenging that allow for professional experience growth'
						} else if (this.language == 'pt') {
							return 'Interessado em projetos desafiadores que conduzam ao crescimento de experiência professional'
						}
					case 'origin':
						if (this.language == 'en') {
							return 'Where I Come From'
						} else if (this.language == 'pt') {
							return 'De onde venho'
						}
					case 'desc':
						if (this.language == 'en') {
							return 'Studiyng software engineering and programming since 2007. From 2011 to current date working as volunteer in a religious organization and since 2018 working with remote freelance web development'
						} else if (this.language == 'pt') {
							return 'Estudando e trabalhando com engenharia de software e programação desde 2007. Desde 2011 trabalhando como voluntário numa organização religiosa e desde 2018 trabalhando com desenvolvimento web remoto freelance'
						}
					case 'techs':
						if (this.language == 'en') {
							return 'Technologies I\'ve Worked With'
						} else if (this.language == 'pt') {
							return 'Tecnologias com as quais trabalhei'
						}
					case 'drive':
						if (this.language == 'en') {
							return 'What drives me'
						} else if (this.language == 'pt') {
							return 'O que me motiva'
						}
						case 'desire':
						if (this.language == 'en') {
							return 'An innate desire to learn:'
						} else if (this.language == 'pt') {
							return 'Forte desejo de aprender'
						}
						case 'd1':
						if (this.language == 'en') {
							return 'Use the opportunity of software technology to bring solutions'
						} else if (this.language == 'pt') {
							return 'Usar a oportunidade que a tecnologia de software oferece para criar e soluções'
						}
						case 'for_users':
						if (this.language == 'en') {
							return 'Deliver nice user experience:'
						} else if (this.language == 'pt') {
							return 'Entregar experiência de usuário:'
						}
						case 'for_users1':
						if (this.language == 'en') {
							return 'Strive to make products that give greate user experience'
						} else if (this.language == 'pt') {
							return 'Criar produtos que ofereçam excelente experiência de usuário'
						}
						case 'better_world':
						if (this.language == 'en') {
							return 'A passion for justice:'
						} else if (this.language == 'pt') {
							return 'Desejo de justiça:'
						}
						case 'bw1':
						if (this.language == 'en') {
							return 'I want to put my skills to work to make the world a better place for everyone'
						} else if (this.language == 'pt') {
							return 'Quero usar minhas habilidades para criar um mundo melhor'
						}
						
				}
			},
		},
	};
</script>