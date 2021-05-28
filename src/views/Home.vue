<template>
	<div style="height: 900px;">
		<div class="hero-home is-cover is-relative is-fullheight-with-navbar">
			<canvas id="home-bg"></canvas>
			<div class="hero-body">
				<div class="container">
					<h1 class="title is-1" style="color: #64c9e0;"> {{ translate('greeting') }} Adriel.</h1>
					<h2 class="subtitle is-3" style="color: #0043ff;"> {{ translate('intro') }} </h2>
				</div>
			</div>
			<carousel-3d v-show="slidesPt && slidesPt.length > 0  && language === 'pt'" :autoplay="true"
				:autoplay-timeout="5000" :height="480" :controls-visible="true">
				<slide v-for="(slide, i) in slidesPt" :index="i">
					<post-card v-bind="slide"></post-card>
				</slide>
			</carousel-3d>
			<carousel-3d v-show="slidesEn && slidesEn.length > 0 && language === 'en'" :autoplay="true"
				:autoplay-timeout="5000" :height="480" :controls-visible="true">
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
	import CloudCanvas from '../components/CloudCanvas.vue'
	export default {
		name: "home",
		components: {
			'carousel-3d': Carousel3d,
			'slide': Slide,
			'post-card': PostCard,
			'cloud-canvas': CloudCanvas
		},
		destroyed() {
			let el = document.getElementById('home-bg')
			el.parentNode.removeChild(el)

		},
		mounted() {
			// if (!this.cloud) {
				let scene, camera, cloudParticles = [], composer;
				scene = new THREE.Scene();
				camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
				camera.position.z = 1;
				camera.rotation.x = 1.16;
				camera.rotation.y = -0.12;
				camera.rotation.z = 0.27;
	
				let ambient = new THREE.AmbientLight(0x555555);
				scene.add(ambient);
	
				let directionalLight = new THREE.DirectionalLight(0xff8c19);
				directionalLight.position.set(0, 0, 1);
				scene.add(directionalLight);
	
				let orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
				orangeLight.position.set(200, 300, 100);
				scene.add(orangeLight);
				let redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7);
				redLight.position.set(100, 300, 100);
				scene.add(redLight);
				let blueLight = new THREE.PointLight(0x3677ac, 50, 450, 1.7);
				blueLight.position.set(300, 300, 200);
				scene.add(blueLight);
	
				const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('home-bg') });
				renderer.setSize(window.innerWidth, window.innerHeight);
				scene.fog = new THREE.FogExp2(0x03544e, 0.001);
				renderer.setClearColor(scene.fog.color);
				document.body.appendChild(renderer.domElement);
	
				let loader = new THREE.TextureLoader();
				loader.load("smoke.png", function (texture) {
					const cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
					const cloudMaterial = new THREE.MeshLambertMaterial({
						map: texture,
						transparent: true
					});
	
					for (let p = 0; p < 50; p++) {
						let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
						cloud.position.set(
							Math.random() * 800 - 400,
							500,
							Math.random() * 500 - 500
						);
						cloud.rotation.x = 1.16;
						cloud.rotation.y = -0.12;
						cloud.rotation.z = Math.random() * 2 * Math.PI;
						cloud.material.opacity = 0.55;
						cloudParticles.push(cloud);
						scene.add(cloud);
					}
				});
				loader.load("stars.jpg", function (texture) {
					const textureEffect = new POSTPROCESSING.TextureEffect({
						blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
						texture: texture
					});
					textureEffect.blendMode.opacity.value = 0.2;
	
					const bloomEffect = new POSTPROCESSING.BloomEffect({
						blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
						kernelSize: POSTPROCESSING.KernelSize.SMALL,
						useLuminanceFilter: true,
						luminanceThreshold: 0.3,
						luminanceSmoothing: 0.75
					});
					bloomEffect.blendMode.opacity.value = 1.5;
	
					let effectPass = new POSTPROCESSING.EffectPass(
						camera,
						bloomEffect,
						textureEffect
					);
					effectPass.renderToScreen = true;
	
					composer = new POSTPROCESSING.EffectComposer(renderer);
					composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
					composer.addPass(effectPass);
	
					window.addEventListener("resize", onWindowResize, false);
					function onWindowResize() {
						camera.aspect = window.innerWidth / window.innerHeight;
						camera.updateProjectionMatrix();
						renderer.setSize(window.innerWidth, window.innerHeight);
					}
					function render() {
						cloudParticles.forEach(p => {
							p.rotation.z -= 0.001;
						});
						composer.render(0.1);
						requestAnimationFrame(render);
					}
					render();
			});

			// 		this.cloud = true
			// } else {
			// 	document.getElementById('bg').style.display = 'none'
			// }
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

	.hero-home {
		/* height: 1400px; */
		background: unset;
		z-index: 1;
	}

	.carousel-3d-container {
		/* position: absolute; */
		top: 40%;
		/* width: 85%; */
	}
</style>