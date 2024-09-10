## Algoritmos : Sequência lógica e finita de passos para a resolução de um problema, passos esses queserão traduzidos por uma linguagem de programação para o computador 

## Fases da resolução de problemas: 
1) Coleta de dados  
2) Processamento de dados 
3) Apresentação dos dados 
(KFC da  programação)


### Comentários: Trechos de códigos não executados que atuam como anotações e documentação do que foi codado 

### Funções: Guardam informações de código para serem executadas. Pode ser chamada n vezes para executar, o que evita a repetição de código. 

## As estruturas, como console.log, são a mesma coisa sempre, praticamente, sendo: objeto.método(função)

--

# Tipos de dados: 

Strings - textos, podem ser escritos com "", '', ``

Number - Números (0.9328)


## Array: Fechado por [], contém vários índices. Concatenação é essencial aqui. É, Metafóricamente, um armário ou lista que contém vários dados.


## Objetos: var/let/const nome = {}, assim se cria um objeto, é ligeiramente diferente das funções. Apresenta valores e dados.

--


# Estruturas de repetição 

- ## While: Enquanto(condição) for verdadeiro ou falso, o que for escrito dentro das {} será executado 

Exemplo :

const start = () => {
    let count = 0 
while (count <= 10) {
    console.log(count)
    count = count + 1 
    return
}
}

start()

### Nota: Se o return não for colocado, o count será concatenado até se atingir o valor 10. Isso mostra a importância da atenção ao se colocar ou não return a depender do que quer que o código execute 


