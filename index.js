const http = require("http")
const fs = require("fs")

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