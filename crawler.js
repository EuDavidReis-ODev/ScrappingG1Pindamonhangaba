const rp = require('request-promise')
const cheerio = require('cheerio')
//const salvaNoticias = require('./db-manager')

const options = {
  uri: 'https://g1.globo.com/sp/vale-do-paraiba-regiao/cidade/pindamonhangaba/',
  transform: function (body) {
    return cheerio.load(body)
  }
}

function coletaDados(){
  rp(options)
  .then(($) => {
    var dados = []
    $('.bastian-page .feed-post-body').each((i, item) => {
      //console.log(i)
      var title = $(item).find('a')
      var titulo = title[0].children[0].data
      var linkPath = title[0].attribs.href
      
      var materiaItem = $(item).find(".feed-post-body-resumo")
      var materia = materiaItem[0].children[0].data
      
      
      var dataItem = $(item).find(".feed-post-datetime")
      var dataMateria = dataItem[0].children[0].data

      var imageLinkItem = $(item).find(".feed-media-wrapper a")
      try{
      var imageLink = imageLinkItem[0].attribs.href
      }catch{
        var imageLink = null
      }

      /*console.log(dataMateria)
      console.log(titulo)
      console.log(linkPath)
      */
      //console.log("2222222222222222")

      //console.log(title[1])

      dados.push({'titulo': titulo , 'link':linkPath , 'materia':materia , 'data':dataMateria , 'linkImagem': imageLink})

  
    })
    //salvaNoticias(dados)  
    console.log("Dados")  
    console.log(dados)
})
  .catch((err) => {
    console.log(err);
    return [{"erro": err}]
  })
}

module.exports = coletaDados
