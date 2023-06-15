import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Image, Flex, Text, Box, Stack, HStack, SimpleGrid, Button, ModalFooter } from "@chakra-ui/react";
import Frete from "./Frete";
import axios from 'axios'
import {React,useCallback, useEffect, useState} from 'react'
const xml2js = require('xml2js')
const ProdutoModal = ({isOpen, onClose, produto}) => {


        // const [fretes, setFretes] = useState([])
        
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
        
            let fretes = ""
        const getFrete = useCallback(async () => {
            try {
            
                const { data } = await axios.get(api,{
                "Content-Type": "application/xml; charset=utf-8"
    
                })

                xml2js.parseString(data, (err, result) => {
                    if (err) {
                      throw err
                    }
                  
                    // `result` is a JavaScript object
                    // convert it to a JSON string
                    // const freteJson = JSON.parse(result)
                    result.Servicos.cServico.map(item => {
                        fretes = item.Valor
                      })
                  })
                return fretes
        }
         catch(error) {
                console.log(error)
            }
        }, [] )


    const produtoImage = "http://localhost/admin/fotos/" + produto.imagem + "p.jpg"
    
    const LinhaProduto = ({label, value}) => (
        <Flex direction="row" gap={1} padding={"10px"}>
            <Text fontWeight="bold" textTransform={"capitalize"}>{label}:</Text>
            <Text>{value}</Text>
        </Flex>
    )

    function formatarValor(valor) {
        const valorFormatado = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(valor)
        return(valorFormatado)
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader textTransform={"capitalize"}>{produto.produto}</ModalHeader>
                <ModalCloseButton/>
                    <ModalBody>
                        <Image src={produtoImage} spacing={5}/>  
                        <SimpleGrid backgroundColor={"#E2E8F0"} borderRadius={"10px"} columns={1}>
                            <LinhaProduto label={"Descrição"} value={produto.produto}/>
                            <LinhaProduto label={"Categoria"} value={produto.categoria}/>
                            <LinhaProduto label={"Preço"} value={formatarValor(produto.valor)}/>
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter gap={2} justifyContent="flex-start">
                        <Button backgroundColor="#E2E8F0">{"Comprar"}</Button>
                        <Button colorScheme='green'>{"Adicionar ao Carrinho"}</Button>
                        <Button onClick={getFrete}>
                            Frete
                        </Button>
                        <Text value={fretes}></Text>
                    </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ProdutoModal;