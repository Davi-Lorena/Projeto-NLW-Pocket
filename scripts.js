const { select, input, checkbox } = require('@inquirer/prompts')

const fs = require("fs").promises

let mensagem = "Bem vindo ao app de metas!!!"

let metas 

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    } catch (error) {
     metas = []   
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}


const cadastrarMeta = async () => {
const meta = await input({message: "Digite a meta:"})

 /* Validação de inputs:
 Length significa mais de um dígito e se eles forem vazios o "if" entra em ação (baseado nas condições que eu coloquei nesse caso em específico) e o que for escrito dentro dos parênteses acontecerá, pois com o valor true para essa condição, o input está inválido. Vale destacar, novamente, a importância do "return". 
 Caso eu quisesse que o usuário permanecesse com a "tela" dos dígitos vazios, deveria chamar novamente a function na frente do return (return cadastrar meta()), criando assim um ciclo. 
 */
if(meta.length == 0) {
    mensagem = "Digite uma meta! Não queremos dígitos vazios nem aqui nem na sua rotina :) "
    return
}

metas.push({
    value: meta, checked: false
}
)

mensagem = "Meta cadastrada com sucesso"

}

const listarMetas = async () => {
if(metas.length == 0) {
    mensagem = "Não existem metas"
    return
}


    const respostas = await checkbox({
    message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.",
    choices: [...metas],
    instructions: false,
})

metas.forEach((m) => {
    m.checked = false 
})

if(respostas.length == 0) { // validação no padrão 
   mensagem = "Nenhuma meta selecionada..."
    return
}

respostas.forEach((resposta) => {
const meta = metas.find((m) => {
    return m.value == resposta
})


meta.checked = true 

})

mensagem = "Meta(s) marcada(s) como concluída(s)!!"

}

const metasRealizadas = async () => {

    if(metas.length == 0) {
        mensagem = "Não existem metas"
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

if(realizadas.length == 0) {
    mensagem = "Não existem metas realizadas :("
    return
}

await select ({
    message: "Metas realizadas: " + realizadas.length,
    choices: [...realizadas]
})

}

const metasAbertas = async () => {

    if(metas.length == 0) {
        mensagem = "Não existem metas"
        return
    }

    const abertas = metas.filter((meta) => {
        return !meta.checked // !Somente relembrando que a exclamação significa inversão de valor para falso em !booleanos! 
    })

if(abertas.length == 0) {
    mensagem = "Não existem metas abertas! :)"
    return
}

await select({
    message: "Metas abertas: " + abertas.length, // a concatenação aqui exibe o número de metas abertas  
    choices: [...abertas]
})

}

const deletarMetas = async () => {

    if(metas.length == 0) {
        mensagem = "Não existem metas"
        return
    }

const metasDesmarcadas = metas.map((meta) => {
return { value: meta.value, checked: false }
})

    const itensADeletar = await checkbox({
        message: "Selecione um item para ser deletado",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

if(itensADeletar.length == 0){
    mensagem = "Nenhum item para deletar!"
    return
}

itensADeletar.forEach((item) => {
    metas = metas.filter((meta) => {
        return meta.value != item
    })
})

mensagem = "Meta(s) deletada(s) com sucesso!"

}

const mostrarMensagem = () => {
    console.clear();

if(mensagem != "") {
    console.log(mensagem)
    console.log("")
    mensagem = ""
}

}


const start = async () => {
    await carregarMetas()

await salvarMetas()

 while(true) {  
mostrarMensagem()
    const opcao = await select({
        message: "Menu >",
        choices: [
            {
                name: "Cadastrar meta",
                value: "cadastrar"
            },
            {
                name: "Listar metas",
                value: "listar"
            },
            {
                name: "Metas realizadas",
                value: "realizadas"
            },
            {
                name: "Metas abertas",
                value: "abertas"
            },
            {
                name: "Deletar metas",
                value: "deletar"
            },
            { 
                name: "Sair",
                value: "sair"
            }
        ]
    })

    switch(opcao) {
case "cadastrar": 
await cadastrarMeta()
break
case "listar":
    await listarMetas()
    break
    case "realizadas":
        await metasRealizadas()
        break
        case "abertas":
            await metasAbertas()
            break
            case "deletar":
                await deletarMetas ()
                break
    case "sair": 
    console.log("Até a próxima!")
    return
    }
 }

}

start()