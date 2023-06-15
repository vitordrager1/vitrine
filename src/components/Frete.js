import axios from 'axios'
import {React,useCallback, useEffect, useState} from 'react'

import {Box} from '@chakra-ui/react'

// import File System Module
// import fs from "fs"; 
  
// import xml2js Module
import { parseString } from "xml2js"; 
const Frete = () => {
    const [frete, setFrete] = useState([])
    // let cep_origem = document.getElementById('cep_origem').value
    // let cep_destino = document.getElementById('cep_destino').value
    // const comprimento = 14
    // const altura = 15
    // const largura = 30
    // const valor_declarado = 0
    // let cod_servico = document.getElementById('cod_servico').value
    // const peso = 10

    //   const api = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&sCepOrigem=${cep_origem}&sCepDestino=${cep_destino}&nVlPeso=${peso}&nCdFormato=1&nVlComprimento=${comprimento}&nVlAltura=${altura}&nVlLargura=${largura}&sCdMaoPropria=n&nVlValorDeclarado=${valor_declarado}&sCdAvisoRecebimento=n&nCdServico=${cod_servico}&nVlDiametro=0&StrRetorno=xml`

    const api = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&sCepOrigem=87300090&sCepDestino=87305550&nVlPeso=50&nCdFormato=1&nVlComprimento=50&nVlAltura=50&nVlLargura=50&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=40010&nVlDiametro=0&StrRetorno=xml`

        // const getFrete = useCallback(async()=> {
        //     try{
        //         const {data} = await axios.get(`http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&sCepOrigem=${cep_origem}&sCepDestino=${cep_destino}&nVlPeso=${peso}&nCdFormato=1&nVlComprimento=${comprimento}&nVlAltura=${altura}&nVlLargura=${largura}&sCdMaoPropria=n&nVlValorDeclarado=${valor_declarado}&sCdAvisoRecebimento=n&nCdServico=${cod_servico}&nVlDiametro=0&StrRetorno=xml`)
        //         console.log(data)
        //     } catch(error){
        //         console.log(error)
        //     } 
        // } )
    
    const getFrete = useCallback(async () => {
        try {
        
            const { data } = await axios.get(api,{
            "Content-Type": "application/xml; charset=utf-8"

            })

            setFrete(data)
            
    }
     catch(error) {
            console.log(error)
        }
    }, [])


    parseString(frete, function (err, results) {
    
        let freteJson = JSON.stringify(results)
        console.log(freteJson)
})
    
    return(
        <Box>
            {/* {freteJson.Servicos.cServico.Valor} */}
        </Box>
    )
    
    }
    
    export default Frete