<template>
  <div>
    <div class="hero-home is-cover is-relative is-fullheight-with-navbar is-primary">
    	<div class="hero-body">
    		<div class="container">
				<h1 class="title is-1"> {{ translate('greeting') }} Adriel.</h1>
				<h2 class="subtitle is-3"> {{ translate('intro') }} </h2>
			</div>
		</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "home",
	data() {
		return {
			language: 'pt'
		}
	},
	created() {
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
</script>
