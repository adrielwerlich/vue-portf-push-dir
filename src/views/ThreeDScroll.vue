<template>
  <div id="3d-scroll">
    <canvas id="bg"></canvas>

    <main>

      <header>
        <h1>Adriel Werlich</h1>
        <p>🚀 {{ translate('welcome') }}</p>
      </header>

      <blockquote>
        <p>{{ translate('i-like') }}</p>
      </blockquote>

      <section>
        <h2>📜 Manifesto</h2>
        <div v-show="language != 'pt'">
          <h4 id="logical-thinking-good-software">Logical thinking === good software</h4>
          <p>Programming is the new literacy. But how do we write good programs? Here are the recurrent questions we need to solve:</p>
          <ul>
            <li>How do we come up with algorithmic solutions to a problem?</li>
            <li>Then, how do we know the solution actually works?</li>
            <li>Even if we’re sure it works, how do we tell the computer to execute it?</li>
          </ul>
        </div>
        <div v-show="language == 'pt'">
          <h4 id="logical-thinking-good-software">Pensamento lógico === software de qualidade</h4>
          <p>A programação é a nova alfabetização. Mas como escrevemos bons programas? Aqui estão as questões recorrentes que precisamos resolver:</p>
          <ul>
            <li>Como podemos encontrar soluções algorítmicas para um problema?</li>
            <li>Então, como sabemos se a solução realmente funciona?</li>
            <li>Mesmo se tivermos certeza de que funciona, como  dizer ao computador para executá-lo?</li>
          </ul>
        </div>
        <p> {{ translate('source') }} 
          <a href="https://www.freecodecamp.org/news/the-philosophy-of-programming-e901bd37363a/">
            freecodecamp
          </a>
          </p>
      </section>

      <section class="light" style="display:none">
        <h2>👩🏽‍🚀 Projects</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <h2>🏆 Accomplishments</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

      </section>

      <blockquote>
        <p>The best way out is always through <br>-Robert Frost</p>
      </blockquote>

      <section class="left">
        <h2>🌮 Work History</h2>

        <h3>Freelance</h3>
        <p>
          {{ translate('freelance') }}
        </p>
        <h3>Artlab</h3>
        <p>
          {{ translate('artlab') }}
        </p>
        <h3>Compasso</h3>
        <p>
          {{ translate('compasso') }}
        </p>

      </section>

      <blockquote>
        <p>{{ translate('thanks') }}</p>
      </blockquote>

    </main>
  </div>
</template>

<script>
import * as THREE from "three"
export default {
  name: "three-d-scroll",
  data() {
    return {
      language: "pt",
    }
  },
  created() {
    this.$route.params.lang ? (this.language = this.$route.params.lang) : null
    this.$parent.$on("changeLang", this.setLang)
  },
  destroyed() {
    this.$options.parent.$el.classList.add("position-relative")
  },
  mounted() {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#bg"),
    })

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.setZ(30)
    camera.position.setX(-3)

    renderer.render(scene, camera)

    // Torus

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
    const material = new THREE.MeshStandardMaterial({ color: 0xff6347 })
    const torus = new THREE.Mesh(geometry, material)

    scene.add(torus)
    // Lights

    const pointLight = new THREE.PointLight(0xffffff)
    pointLight.position.set(5, 5, 5)

    const ambientLight = new THREE.AmbientLight(0xffffff)
    scene.add(pointLight, ambientLight)

    function addStar() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24)
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
      const star = new THREE.Mesh(geometry, material)

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100))

      star.position.set(x, y, z)
      scene.add(star)
    }

    Array(200).fill().forEach(addStar)

    // Background

    const spaceTexture = new THREE.TextureLoader().load("space.jpg")
    scene.background = spaceTexture

    // Avatar

    const adrielTexture = new THREE.TextureLoader().load("adriel.jpg")

    const adriel = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.MeshBasicMaterial({ map: adrielTexture })
    )

    scene.add(adriel)

    // Moon

    const moonTexture = new THREE.TextureLoader().load("moon.jpg")
    const normalTexture = new THREE.TextureLoader().load("normal.jpg")

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
      })
    )

    scene.add(moon)

    moon.position.z = 30
    moon.position.setX(-10)

    adriel.position.z = -5
    adriel.position.x = 2

    // Scroll Animation

    function moveCamera() {
      const t = document.body.getBoundingClientRect().top
      moon.rotation.x += 0.05
      moon.rotation.y += 0.075
      moon.rotation.z += 0.05

      adriel.rotation.y += 0.01
      adriel.rotation.z += 0.01

      camera.position.z = t * -0.01
      camera.position.x = t * -0.0002
      camera.rotation.y = t * -0.0002
    }

    document.body.onscroll = moveCamera
    moveCamera()

    // Animation Loop

    function animate() {
      requestAnimationFrame(animate)

      torus.rotation.x += 0.01
      torus.rotation.y += 0.005
      torus.rotation.z += 0.01

      moon.rotation.x += 0.005

      adriel.rotation.y += 0.01
      adriel.rotation.x += 0.005

      // controls.update();

      renderer.render(scene, camera)
    }

    animate()
    this.$options.parent.$el.classList.remove("position-relative")
  },
  methods: {
    setLang(lang) {
      this.language = lang //= 'en' ? this.language = 'pt' : this.language = 'en'
    },
    translate(section) {
      switch (section) {
        case "thanks":
          if (this.language == "en") {
            return "Thanks for being interested in my work"
          } else if (this.language == "pt") {
            return "Obrigado por se interessar no meu trabalho"
          }
        case "source":
          if (this.language == "en") {
            return "Source:"
          } else if (this.language == "pt") {
            return "Fonte:"
          }
        case "i-like":
          if (this.language == "en") {
            return "I like to make money on the internet"
          } else if (this.language == "pt") {
            return "Eu gosto de ganhar dinheiro na internet"
          }
        case "welcome":
          if (this.language == "en") {
            return "Welcome to my website!"
          } else if (this.language == "pt") {
            return "Bem vindo ao meu site!"
          }
        case "freelance":
          if (this.language == "en") {
            return "Since 2018 I had the opportunity to work on 2 freelance projects. The first we use Laravel and Vue. The second we used Vanilla JS in the MVC standard (https://chat-s.web.app/)"
          } else if (this.language == "pt") {
            return "Desde 2018 tive a oportunidade de trabalhar em 2 projetos freelance. O primeiro usamos Laravel e Vue. O segundo usamos Vanilla JS no padrão MVC (https://chat-s.web.app/)"
          }

        case "artlab":
          if (this.language == "en") {
            return "I helped build a social media MVP focused on politics (https://app.eianna.com.br/)"
          } else if (this.language == "pt") {
            return "Ajudei a construir um MPV de rede social voltada pra política (https://app.eianna.com.br/)"
          }

        case "compasso":
          if (this.language == "en") {
            return "Using Oracle Cloud Commerce I had the opportunity to work on building an ecommerce (http://melissa.com.br/). And also work on a maintenance project for another product (http://koerich.com.br/)"
          } else if (this.language == "pt") {
            return "Usando Oracle Cloud Commerce tive a oportunidade de trabalhar na construção de um ecommerce (http://melissa.com.br/). E também atuar num projeto de manutenção de outro produto (http://koerich.com.br/)"
          }
      }
    },
  },
}
</script>

<style>
@import url("https://use.typekit.net/jmk3xov.css");

canvas {
  position: fixed;
  top: 0;
  left: 0;
}

:root {
  --dark-bg: rgba(15, 15, 15, 0.95);
  --spacing: 350px;

  font-family: brandon-grotesque, sans-serif;
  font-weight: 400;
  font-style: normal;
}

main {
  width: 100vw;
  color: white;
  z-index: 99;
  position: absolute;
  width: 100%;
  margin: 0px auto;
  padding: 120px 0px;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

h1,
h2,
h3,
blockquote {
  font-family: elevon, sans-serif;
  font-weight: 700;
  font-style: normal;
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
}

header {
  grid-column: 2 / span 5;
  font-size: 2.5rem;
  padding: 2rem;
  margin-bottom: var(--spacing);
}

section {
  grid-column: 2 / 8;
  padding: 1rem;
  background: var(--dark-bg);
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: var(--spacing);
}

blockquote {
  margin: 0;
  padding: 0;
  grid-column: 2 / span 9;
  margin-bottom: var(--spacing);
}

blockquote p {
  color: black;
  background-color: white;
  font-size: 4rem;
  display: inline;
  line-height: 1;
}

.left {
  grid-column: 6 / 12;
}
</style>