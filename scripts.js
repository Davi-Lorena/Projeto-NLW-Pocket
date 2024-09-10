const { select, input } = require('@inquirer/prompts')

let meta = { // exemplo/padrão a ser seguido
    value: 'Estudar 8H por dia',
    checked: true
}

let metas = [ meta

]

const cadastrarMeta = async () => {
const meta = await input({message: "Digite a meta"})

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
    break
    case "sair": 
    console.log("Até a próxima!")
    return
    }
 }
}

start()