const http = require("http")
const fs = require("fs")

function ListarProdutos() {
    try {
        const dados = JSON.parse(fs.readFileSync("dados.json", "utf-8"))
        return JSON.stringify(dados.produtos)
    } catch (erro) {
        return "Não foi possivel executar a função."
    }
}

const servidor = http.createServer((request, response) => {
    if(request.url == "/produto"){
        switch (request.method) {
            case "GET":
                response.writeHead(200, { "Content-Type": "application/json; charset: utf-8;" })
                response.end(ListarProdutos())
                break
            case "POST":
                break
        }
    }
})
servidor.listen(3000)
console.log("Servidor rodando na porta 3000")