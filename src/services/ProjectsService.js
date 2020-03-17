

var Airtable = require('airtable')

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyJPjJCpUST9JaU7'
})

var base = Airtable.base('app1Y9Pp4VCeMYqhf')

export default{
  getProjects() {
    
      return base.table('projects').select().all().then( result =>  {
        return result
      })

  },
  getProject(slug) {
  	return Axios.get("?filterByFormula={Slug}='" + slug + "'")
  }
}

