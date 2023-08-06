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

function CadastrarProduto(novoProduto) {
    try {
        const dados = JSON.parse(fs.readFileSync("dados.json", "utf-8"))
        dados.produtos.push(JSON.parse(novoProduto))
        fs.writeFileSync("dados.json", JSON.stringify(dados))
        return "Produto cadastrado com sucesso!"
    } catch {
        return "Erro ao executar"
    }
}

function produtoJaExiste(produto) {
    const produtoVerificar = JSON.parse(produto)
    try {
        const dados = JSON.parse(fs.readFileSync('dados.json', 'utf-8'));        
        for (let i = 0; i < dados.produtos.length; i++) {
            if (produtoVerificar.nome === dados.produtos[i].nome)  return true;           
        }
    } catch (error) {
        console.error('Erro ao ler o arquivo de dados:', error);
        return true;
    }
}

const servidor = http.createServer((request, response) => {
    if (request.url == "/produto") {
        switch (request.method) {
            case "GET":
                response.writeHead(200, { "Content-Type": "application/json; charset: utf-8;" })
                response.end(ListarProdutos())
                break
            case "POST":
                let produto = ''
                request.on("data", (chunk) => {
                    produto += chunk
                })
                console.log(produto)
                request.on("end", () => {
                    if (!produtoJaExiste(produto)) {
                        response.writeHead(200, { "Content-Type": "text/plain; charset: utf-8;" });
                        response.end(CadastrarProduto(produto));
                    } else {                        
                        response.writeHead(409, { "Content-Type": "text/plain; charset: utf-8;" });
                        response.end("Produto já existe no sistema");
                    }
                })
                break
        }
    }
})
servidor.listen(3000)
console.log("Servidor rodando na porta 3000")