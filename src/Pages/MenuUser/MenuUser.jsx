import { use, useEffect } from "react";
import '../../Css/Menu.css';
import '../../Css/loading.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/loginto.png'


export default function Menu (){
    const [categoria,setcategoria] = useState(false)
    const [Popular, setPopular] = useState (0)
    const [carregarmais,setcarregarmais] = useState (1)
    const navi = useNavigate();
    const [limitecarregar,setlc] = useState();
    const [listwall,setlistwall] = useState([]);
    const [emailz,setemailz] = useState ('email undefined');
    const [role,setrole] = useState ('');
    const [load,setload] = useState(true) //ela ja esta ativa
    const verificar = async () => {
        try {
        const token = localStorage.getItem("tokenzin")
        if (!token){
            navi('/Login')
            return
        }
        const response = await fetch("http://localhost:5115/api/Controll/verificartt",{
            method:'GET',
            headers:{"Authorization": `Bearer ${token}`}
        });
        if (response.ok){
            const resposta = await response.json()
            setload(false)
            setemailz(resposta.email)
            setrole(resposta.role)
        }else {
            localStorage.removeItem('tokenzin')
            navi('/Login');
        }
        } catch (error){
        console.log(error)
        return
        }
        }



        const extrairwall = async()=>{
            const response= await fetch(`http://localhost:5115/api/WallEndPoints/wall?carregar=${carregarmais}&limit=9&ordem=${Popular}`)
            if (response.ok){
                const resposta = await response.json()
                setlistwall(prevLista => carregarmais === 1 ? resposta.lista : [...prevLista, ...resposta.lista])
                setlc(resposta.limitecarregarmais)
            }
            else {
                
                console.log('nada encontrado')
            }
        }

    useEffect(()=>{
        verificar();
       
    },[])  
    useEffect(() => {
    extrairwall();
}, [carregarmais,Popular]);  

    return (
        <div className="fundomenu">
            <img className="imgfun" src="https://images.hdqwalls.com/download/days-gone4k-01-3840x2400.jpg" alt="" />
            <div className={`loading ${load ? '' : 'desativar'}`}>
                <span className="loader"></span>
            </div>

            <div className={`menu ${load ? 'desativar' : ''}`}>
                <div className={`categoria ${categoria ? "ativo" : ""}`}></div>
                <header>
                    <div className="logocontent">
                    <img className="logo" src={logo} alt="logo" /> 
                    <p>ECLIPSEWALL</p>
                    </div>
                    <nav>
                        <div><p onClick={()=>{ if (Popular === 1) return; setlistwall([]);setcarregarmais(1);setPopular(1)}}>POPULAR</p></div>
                        <div><p onClick={()=>{ setcategoria(!categoria)}}>CATEGORIA</p></div>
                        <div><p>MENU</p></div>
                    </nav>

                </header>
                
                <div className="box">
                   {listwall.map((wall)=>{
                    return (
                    <div className="cardwall" key={wall.id}>
                        <img className="cardimg" src={wall.url} alt="image" />
                        <div className="organiz">
                            <p>{wall.nome}</p>
                        </div>
                    </div>
                   )})}
                </div>
                <button disabled={carregarmais==limitecarregar} className="carregarmais" onClick={()=>{setcarregarmais(carregarmais + 1)}}><p>Carregar mais</p></button>
                
            </div>




        </div>
        
    )
}