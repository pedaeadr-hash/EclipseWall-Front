import { use, useEffect } from "react";
import '../../Css/Menu.css';
import '../../Css/loading.css';
import { useState } from "react";

import { useNavigate } from 'react-router-dom';
import logo from '../../assets/loginto.png'


export default function Menu (){
    const[ fotoperfil,setfotoperfil] = useState ("https://i.pinimg.com/736x/d7/b9/48/d7b948ff970f7d92ee265072da06fd07.jpg")
    const [QueryCategoria, setQueryCategoria ] =useState("Default")
    const [listauniquecategoria,setlistauniquecategoria] = useState([])
    const [menu,setmenu] = useState(false)
    const [EditIcon,setEditIcon] = useState(false)
    const [upload,setupload] = useState(false)
    const [categoria,setcategoria] = useState(false)
    const [Popular, setPopular] = useState (0)
    const [carregarmais,setcarregarmais] = useState (1)
    const navi = useNavigate();
    const [limitecarregar,setlc] = useState();
    const [listwall,setlistwall] = useState([]);
    const [idz,setidz] = useState ('id undefined');
    const [nomez,setnomez] = useState ('email undefined');
    const [emailz,setemailz] = useState ('e-mail undefined');
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
            setnomez(resposta.nome)
            setidz(resposta.id)
        }else {
            localStorage.removeItem('tokenzin')
            navi('/Login');
        }
        } catch (error){
        console.log(error)
        return
        }
        }
        const SaveIcon = async ()=>{
            const objetoform = {
                UserId:idz,
                UrlIcon:fotoperfil
            }
            try { 
            const response = await fetch("http://localhost:5115/api/Icon/SaveIcon", {
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body: JSON.stringify(objetoform)
            })
            if (response.ok){
                alert("tudo ceeto salvo")
            }
        } catch {
            console.log("algodeuerrado")
        }

        }

        const pegaricon = async ()=>{
            
        }



        const trazeruniqcategory = async()=>{
            try {
            const response = await fetch("http://localhost:5115/api/WallEndPoints/categoriasuniq");
            if (response.ok){
                const resposta = await response.json();
                setlistauniquecategoria(resposta)

            }} catch (error){
                console.log(error)
            }
        }



        const extrairwall = async()=>{
            const response= await fetch(`http://localhost:5115/api/WallEndPoints/wall?carregar=${carregarmais}&limit=12&ordem=${Popular}&PorCategoria=${QueryCategoria}`)
            if (response.ok){
                const resposta = await response.json()
                setlistwall(prevLista => carregarmais === 1 ? resposta.lista : [...prevLista, ...resposta.lista])
                setlc(resposta.limitecarregarmais)
            }
            else {
                
                console.log('nada encontrado')
            }
        }
        const upadmin = async ()=>{
            try {
                const Token =  await localStorage.getItem('tokenzin')
                const response = await fetch("http://localhost:5115/api/WallEndPoints/VERIFY", {
            method: 'GET', // Deve estar dentro do objeto
            headers: {
                "Authorization": `Bearer ${Token}` // O nome correto é 'headers' (plural)
            }
        });
                if (response.ok)(
                    setupload(true)
                )
                else  (
                    console.log("error")
                    
                )
            }catch(error) {
                console.log(error)
            }
        }

    useEffect(()=>{
        verificar();
        trazeruniqcategory();
       
    },[])  
    useEffect(() => {
    extrairwall();
}, [carregarmais,Popular,QueryCategoria]);  

    return (
        <div className={`fundomenu ${menu ? "no-scroll" : ""}`}>
            <img className="imgfun" src="https://images.hdqwalls.com/download/electric-blue-flow-lines-zk-3840x2400.jpg" alt="" />
            <div className={`loading ${load ? '' : 'desativar'}`}>
                <span className="loader"></span>
            </div>

            <div className={`menu ${load ? 'desativar' : ''}`}>
                <div className={`uploadadmin ${upload ? "ativoupload" : ""}`}>
                    <div className="blocoup">
                        <span className="contentclose">
                            <svg onClick={()=>{setupload(false)}} className="close" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                        </span>

                    </div>
                </div>
                <div className={`EditIconConteiner ${EditIcon ? "iconative" : ""}`}>
                    <span className="contentclose">
                            <svg onClick={()=>{setEditIcon(!EditIcon)}} className="close" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                
                    </span>
                    <div className="gird">
                        <div className="iconsselect" onClick={()=>{setfotoperfil("https://i.pinimg.com/1200x/29/dc/83/29dc83410cc93ca8676b36024b0b10d1.jpg")}}><img src="https://i.pinimg.com/1200x/29/dc/83/29dc83410cc93ca8676b36024b0b10d1.jpg" alt="" /></div>
                        <div className="iconsselect" onClick={()=>{setfotoperfil("https://i.pinimg.com/736x/58/a7/76/58a776f87a2ea378c2189de3d6867e35.jpg")}}><img src="https://i.pinimg.com/736x/58/a7/76/58a776f87a2ea378c2189de3d6867e35.jpg" alt="" /></div>
                        <div className="iconsselect" onClick={()=>{setfotoperfil("https://i.pinimg.com/736x/0f/34/50/0f345020fd30f06446f04ce4190dd5fd.jpg")}}><img src="https://i.pinimg.com/736x/0f/34/50/0f345020fd30f06446f04ce4190dd5fd.jpg" alt="" /></div>
                        <div className="iconsselect" onClick={()=>{setfotoperfil("https://i.pinimg.com/736x/f2/09/05/f20905444b575e4f47cd2e1b9d4561ae.jpg")}}><img src="https://i.pinimg.com/736x/f2/09/05/f20905444b575e4f47cd2e1b9d4561ae.jpg" alt="" /></div>
                        <div className="iconsselect" onClick={()=>{setfotoperfil("https://i.pinimg.com/736x/c6/f1/f2/c6f1f232bb40981feb49e46a89aaa797.jpg")}}><img src="https://i.pinimg.com/736x/c6/f1/f2/c6f1f232bb40981feb49e46a89aaa797.jpg" alt="" /></div>
                        <div className="iconsselect" onClick={()=>{setfotoperfil("https://i.pinimg.com/736x/05/cf/dc/05cfdc2f6a1962875dfd79ed970f267c.jpg")}}><img src="https://i.pinimg.com/736x/05/cf/dc/05cfdc2f6a1962875dfd79ed970f267c.jpg" alt="" /></div>
                        <div className="iconsselect" onClick={()=>{setfotoperfil("https://i.pinimg.com/736x/02/ab/9f/02ab9f7d1b45a323de6aba3474900cb9.jpg")}}><img src="https://i.pinimg.com/736x/02/ab/9f/02ab9f7d1b45a323de6aba3474900cb9.jpg" alt="" /></div>
                        <div className="iconsselect" onClick={()=>{setfotoperfil("https://i.pinimg.com/736x/71/91/88/7191881a4f1c409409e8871201b9333b.jpg")}}><img src="https://i.pinimg.com/736x/71/91/88/7191881a4f1c409409e8871201b9333b.jpg" alt="" /></div>
                        <div className="iconsselect" onClick={()=>{setfotoperfil("https://i.pinimg.com/1200x/4c/7b/9e/4c7b9ed3cc2821f806efb68be096f7b5.jpg")}}><img src="https://i.pinimg.com/1200x/4c/7b/9e/4c7b9ed3cc2821f806efb68be096f7b5.jpg" alt="" /></div>
                        <div className="iconsselect" onClick={()=>{setfotoperfil("https://i.pinimg.com/736x/4f/40/ad/4f40ad521516a8e57b5bd43b1e5efb08.jpg")}}><img src="https://i.pinimg.com/736x/4f/40/ad/4f40ad521516a8e57b5bd43b1e5efb08.jpg" alt="" /></div>
                        
                        
                        
                    </div>
                    <div className="salvaricon"><button onClick={()=>{SaveIcon()}}>Salvar</button></div>
                </div>
                <div className={`categoria ${categoria ? "ativo" : ""}`}>
                    <p>CATEGORIAS</p>
                    <div className="conteinercaregoria">
                        {listauniquecategoria.map((listcate)=>{
                            return(
                                <div className="cardcategoria" key={listcate}>
                                    <p onClick={()=>{setcarregarmais(1);setQueryCategoria(listcate)}}>{listcate}</p>
                                </div>
                            )
                        })}
                        <div className="cardcategoria" >
                                    <p onClick={()=>{setcarregarmais(1);setQueryCategoria("Default")}}>All</p>
                                </div>
                    </div>
                </div>
                <div className={`MenuPerfil ${menu ? "ativoMenu" : ""}`}>
                    <div className="fotoename"> <div className="fotocircle"><p className="editicon" onClick={()=>{setEditIcon(!EditIcon)}}>EDIT</p><img src={fotoperfil} alt=""/></div> <p className="nomeuser">{nomez}</p></div>
                    <div className="upload" onClick={()=>upadmin()}><p>Faça Upload</p></div>
                </div>
                <header>
                    <div className="logocontent">
                    <img className="logo" src={logo} alt="logo" /> 
                    <p>ECLIPSEWALL</p>
                    </div>
                    <nav>
                        <div onClick={()=>{ if (Popular === 1) return; setlistwall([]);setcarregarmais(1);setPopular(1)}}><p>POPULAR</p></div>
                        <div onClick={()=>{ setcategoria(!categoria)}}><p>CATEGORIA</p></div>
                        <div onClick={()=>{setmenu(!menu)}}><p>MENU</p></div>
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