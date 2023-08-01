const http = require("http")
const fs = require("fs")

function ListarProdutos(){
    try {
      const dados = JSON.parse(fs.readFileSync("dados.json", "utf-8"))
      return JSON.stringify(dados.produtos)
    } catch (erro){
      return "Não foi possivel executar a função."
    }
  }

const servidor = http.createServer((request, response) => {    
    switch(request.method){
        case "GET":      
          break
        case "POST":       
          break       
      }
 })
    
  servidor.listen(3000)
  console.log("Servidor rodando na porta 3000")