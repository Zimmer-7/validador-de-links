#!/usr/bin/env node

import chalk from 'chalk'
import fs from 'fs'
import encontraArquivo from './index.js'
import validaLista from './validacao.js'

const caminho = process.argv

async function imprimeLista(valida, resultado, caminho = ''){

    if(valida) {
        console.log(
            chalk.cyan('lista de links'),
            chalk.bgGreen(caminho),
            await validaLista(resultado),
        )
    } else {
        console.log(
            chalk.cyan('lista de links'),
            chalk.bgGreen(caminho),
            resultado,
        )       
    }

}

async function processaArquivo(argumento){
    const caminho = argumento[3]
    const valida = argumento[2] === '--valida'

    try {
        fs.lstatSync(caminho)
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.error(chalk.bgRed('arquivo não encontrado'))
            return
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await encontraArquivo(caminho)
        imprimeLista(valida, resultado)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (i) => {
            const lista = await encontraArquivo(`${caminho}/${i}`)
            imprimeLista(valida, lista, arquivos)
        })
    }  
        
    }

processaArquivo(caminho)