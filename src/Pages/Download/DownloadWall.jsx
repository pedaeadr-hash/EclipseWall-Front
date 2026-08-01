import "../../Css/Download.css"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { API_URL } from '../../config';
export default function Download (){
    const [categoriawall,setctwall]=useState("")
    const [nomewall,setnomewall]=useState("")
    const [urlwall,seturlwall]=useState("")
    const [downloadwall,setdownloadwall]=useState("")
    const {slug} = useParams()
    const pegarwall = async ()=>{
        try {
        const response = await fetch(`${API_URL}/api/WallEndPoints/downloadslg?slugid=${slug}`)
        if (response.ok){
            const objeto = await response.json();
            setnomewall(objeto.nome)
            seturlwall(objeto.url)
            setdownloadwall(objeto.downloads)
            setctwall(objeto.categoria)
        }
        } catch (error){
            console.log(error)
        }
    }


    // Função que força o download baixando os dados da imagem primeiro
    const forcarDownload = async () => {
        if (!urlwall) return;

        try {
            // 1. Busca os dados binários da imagem
            const response = await fetch(urlwall);
            const blob = await response.blob();
            
            // 2. Cria um link temporário apontando para a memória local
            const blobUrl = window.URL.createObjectURL(blob);
            
            // 3. Cria a tag <a> virtual para disparar o download no PC
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `${nomewall || "wallpaper"}.jpg`;
            
            document.body.appendChild(link);
            link.click();
            link.remove();

            // 4. Limpa o objeto da memória
            window.URL.revokeObjectURL(blobUrl);
            Add()
        } catch (error) {
            console.error("Erro ao tentar baixar:", error);
            // Se o servidor da imagem bloquear o fetch por CORS, abre a imagem em uma nova aba
            window.open(urlwall, "_blank");
        }
    };




    const Add = async ()=>{
        try{
            const response = await fetch(`${API_URL}/api/WallEndPoints/contardown?name=${nomewall}`);
            if (response.ok){
                console.log("tudo certo downloads atualizado")
            }
        } catch (error){
            alert(error)
        }
    }











    useEffect(()=>{
        pegarwall()
    },[slug])
    return(
        <div className="download">
            <img className="fundodown" src={urlwall} alt="" />
            <img className="downloadimg" src={urlwall} alt="" />
            <p className="pforwall">{nomewall} <span style={{color:"red"}}>{categoriawall}</span></p>
            <div className="contentdown">
                <div className="down"><p>Donwloads ({downloadwall})</p></div>
                <button onClick={forcarDownload} className="meu-botao-download">
                    Install
                </button>
            </div>
        </div>
    )
}