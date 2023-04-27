import fs from 'fs'
import chalk from 'chalk'

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s]*?)\)/gm
    const captura = [...texto.matchAll(regex)]
    const resultado = captura.map(i => ({[i[1]]: i[2]}))
    return resultado.length !== 0 ? resultado : chalk.yellow('este arquivo não possui links')

}

function enviaErro(erro){
    console.log(chalk.bgRed(erro))
    throw new Error(chalk.red(erro))
    
}

//async await
async function encontraArquivo(enderecoDoArquivo){
    try{
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(enderecoDoArquivo, encoding)
        return extraiLinks(texto)
    } catch(erro){
        enviaErro(erro)
    }
  
}


// promises com then
/*function encontraArquivo(enderecoDoArquivo){
    const encoding = 'utf-8'
    fs.promises
        .readFile(enderecoDoArquivo, encoding)
        .then((texto) => console.log(texto))
        .catch(enviaErro) 
    
}*/

export default encontraArquivo

