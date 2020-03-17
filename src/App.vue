<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="data:image/jpeg;base64,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"
           width="112" height="28">
        </router-link>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
          data-target="navbarBasicExample" :class="{ 'is-active': showNav }" @click="showNav = !showNav">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" 
      :class="{ 'is-active': showNav }">
        <div class="navbar-start">

        </div>

        <div class="navbar-end">
          <label class="btn-translate-label">
            {{ translate('trans') }}
          </label>
          <div class="block-row" style="align-items: center;
          display: flex;
          flex-direction: column-reverse;">

            <a id="btn-change-language" class="col-4 btn" @click="setLang">

              <div v-show="language == 'en'" style="max-height: 100%;">

                <div class="row" style="margin-top: -3%;">
                  <div class="container" style="max-width:80px">
                    <img class=" img-language" src="flag-brazil.png" style="padding: 2px;" />
                  </div>
                </div>

              </div>

              <div v-show="language == 'pt'" style="max-height: 100%;">

                <div class="row" style="margin-top: -3%;">
                  <div class="container" style="max-width:80px">
                    <img class="img-language" src="flag-usa.png" style="padding: 2px;" />
                  </div>
                </div>

              </div>

            </a>

          </div>
          <router-link :to="{name: 'home' , params: { lang: language } }" class="navbar-item">
            Home
          </router-link>
          <router-link :to="{name: 'about' , params: { lang: language } }" 
                                              
          class="navbar-item">
            {{ translate('about') }}
          </router-link>
          <router-link :to="{name: 'projects' , params: { lang: language } }" class="navbar-item">
            {{ translate('projs') }}
          </router-link>
          <router-link :to="{name: 'contact' , params: { lang: language } }" class="navbar-item">
            {{ translate('contact') }}
          </router-link>
        </div>
      </div>
    </nav>
    <router-view />
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          {{ translate('builtWith') }}
        </p>
        <!-- <p>
          Want to see how this site was built? 
          <a href="https://dev.to/markjohnson303/building-a-portfolio-site-with-vue-bulma-and-airtable-5a58">
            Check out my tutorial on dev.to!</a>
        </p> -->
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        showNav: false,
        language: 'pt',
      }
    },

    created() {
      this.$route.params.lang ? this.language = this.$route.params.lang : null
    },

    methods: {
      setLang() {
        this.language == 'en' ? this.language = 'pt' : this.language = 'en'
        sessionStorage.setItem('lan', this.language)
        this.$emit('changeLang', this.language)
      },
      translate(section) {
        switch (section) {
          case 'about':
            if (this.language == 'en') {
              return 'About'
            } else if (this.language == 'pt') {
              return 'Sobre'
            }
          case 'projs':
            if (this.language == 'en') {
              return 'Projects'
            } else if (this.language == 'pt') {
              return 'Projetos'
            }
          case 'contact':
            if (this.language == 'en') {
              return 'Contact'
            } else if (this.language == 'pt') {
              return 'Contato'
            }
          case 'builtWith':
            if (this.language == 'en') {
              return 'Built with Vue.js, Bulma, and Airtable'
            } else if (this.language == 'pt') {
              return 'Feito com Vue.js, Bulma, and Airtable'
            }
          case 'trans':
            if (this.language == 'en') {
              return 'Clique pra traduzir'
            } else if (this.language == 'pt') {
              return 'Click to translate'
            }
        }
      },
    },
  };
</script>

<style type="text/css">

  #btn-change-language {
    position: relative;
    top: 18%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  @media screen and (max-width: 1023px){
    #btn-change-language {
      -webkit-transform: translateY(0%);
      -ms-transform: translateY(0%);
      transform: translateY(0%);
    } 
  }

  #app {
    min-height: 100vh;
    overflow: hidden;
    display: block;
    position: relative;
    padding-bottom: 210px;
    /* height of your footer */
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .btn-translate-label {  
    margin: 0% 0.2% 0 0;
    width: 20%;
  }
</style>

<style lang="sass">
  $primary: #72b5db;

  .hero-home
    @extend .hero
    background-image: url('./assets/cloud-background.png')
    background-size: cover


  @import "~bulma/bulma.sass"
</style>