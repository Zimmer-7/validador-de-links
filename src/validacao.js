function extraiLink(arrLink){
    return arrLink.map((objetoLink) => Object.values(objetoLink).join()) 
}

async function checaStatus(arrURLs){
    const arrStatus = await Promise.all(
        arrURLs.map(async (url) => {
            try{
                const response = await fetch(url)
                return `${response.status} - ${response.statusText}`
            }catch(erro){
                return trataErro(erro)
            }
        })

    )
    return arrStatus

}

function trataErro(erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return 'link não encontrado'
    }else{
        return 'erro inesperado'
    }
}

export default async function validaLista(lista){
    const links = extraiLink(lista)
    const status = await checaStatus(links)
    
    return lista.map((objeto, i) => ({
        ...objeto,
        status: status[i]
    }))

}