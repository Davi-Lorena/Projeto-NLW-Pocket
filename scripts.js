const { select, input, checkbox } = require('@inquirer/prompts')

let meta = { // exemplo/padrão a ser seguido
    value: 'Estudar 8H por dia',
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
const meta = await input({message: "Digite a meta:"})

 /* Validação de inputs:
 Length significa mais de um dígito e se eles forem vazios o "if" entra em ação (baseado nas condições que eu coloquei nesse caso em específico) e o que for escrito dentro dos parênteses acontecerá, pois com o valor true para essa condição, o input está inválido. Vale destacar, novamente, a importância do "return". 
 Caso eu quisesse que o usuário permanecesse com a "tela" dos dígitos vazios, deveria chamar novamente a function na frente do return (return cadastrar meta()), criando assim um ciclo. 
 */
if(meta.length == 0) {
    console.log("Digite uma meta! Não queremos dígitos vazios nem aqui nem na sua rotina :) ")
    return
}

metas.push({
    value: meta, checked: false
}
)

}


const listarMetas = async () => {
    const respostas = await checkbox({
    message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.",
    choices: [...metas],
    instructions: false,
})

metas.forEach((m) => {
    m.checked = false 
})

if(respostas.length == 0) { // validação no padrão 
    console.log("Nenhuma meta selecionada...")
    return
}

respostas.forEach((resposta) => {
const meta = metas.find((m) => {
    return m.value = resposta
})


meta.checked = true 

})

console.log("Meta(s) marcada(s) como concluída(s)!!")

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

if(realizadas.length == 0) {
    console.log("Não existem mets realizadas :(")
    return
}

await select ({
    message: "Metas realizadas",
    choices: [...realizadas]
})

}


const start = async () => {
 while(true) {  

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
                name: "Sair",
                value: "sair"
            }
        ]
    })

    switch(opcao) {
case "cadastrar": 
await cadastrarMeta()
console.log(metas)
break
case "listar":
    await listarMetas()
    break
    case "realizadas":
        await metasRealizadas()
        break
    case "sair": 
    console.log("Até a próxima!")
    return
    }
 }

}

start()