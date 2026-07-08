import '../../Css/Login.css';
import { useNavigate } from 'react-router-dom';
import { use, useState } from 'react';
import wall4 from '../../assets/m4.mp4'
import open from '../../assets/open.png'
import off from '../../assets/off.png'

import wall5 from '../../assets/m5.mp4'

export default function Login (){
    const navi = (useNavigate())
    const [email,setemail] = useState('')
    const [senha,setsenha] = useState('')
    const [Confirmar,setConfirmar] = useState(false)
    const [mensagem,setmensagem] = useState('')
    const [mensagelogin,setmensagelogin] = useState('')
    const [mostrarSenha, setMostrarSenha] = useState(false);
   
    const ema = async ()=>{
        email.trim()
        email.toLowerCase()
        
        if (!email.endsWith("@gmail.com")){
            setmensagem("Insira um Email Válido")
            return
        }
        if (email.length<16){
            setmensagem("Email com Menos de 6 Caracteres Insira um Email Válido ")
            return
        }
        setConfirmar(true)
        setmensagelogin('')
        setmensagem('')
    }
    

    const login =async ()=>{
        if (senha==""){
            setmensagelogin('Senha Inválida')
            return
        }
        const response = await fetch("http://localhost:5115/api/Controll/Login",{
            method:'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({Email:email,Senha:senha})
        })
        if (response.ok){
            const resposta = await response.json();
            setmensagelogin(resposta.mensagem)
            localStorage.setItem('tokenzin', resposta.token)
            navi('/')
        }
        else {
            const resposta = await response.text();
            setmensagelogin(resposta)
        }
    }










    return (
        <div className='fundologin'>
            
                <img className='IMGfundo' src="https://images.hdqwalls.com/download/days-gone-2024-ec-1366x768.jpg" alt="" />
                
                <div className={`vidrofosco1 ${Confirmar ? 'desativar' : ''}`}>
                    <div className='logol'>
                    <p>WALL</p>
                    <h1 className='fini'>ECLIPSE</h1>
                    </div>
                    <h1 className='fini2'>Entre na Eclipse Wall</h1>
                    <input value={email} className='inputel' type="text" placeholder='EMAIL' onChange={(event)=>{setemail(event.target.value)}}/>
                    <p className='msgerro'>{mensagem}</p>
                    <button className='lgbtt' onClick={()=>{ema()}}>CONTINUAR</button>
                    <p>Sua primeira vez aqui ? <span className='pp' onClick={()=>{navi('/Cadastro')}}>Criar uma conta</span></p>
                    <span className='pp1'></span>
                    <div className='contentwall'>
                        <div><video className='vd' src={wall4} autoPlay loop muted disablePictureInPicture /></div>
                    </div>
                    <div className='contentwall'>
                        <div><video className='vd' src={wall5} autoPlay loop muted disablePictureInPicture/></div>
                    </div>
                    <span className='pp2'></span>
                    
                </div>
                <div className={`senha ${Confirmar ? 'active' : ''}`}>

                    <div className='return'>
                    <svg onClick={()=>{setConfirmar(false),setmensagelogin(''),setmensagem('')}} fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 558.957 558.957" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <polygon points="462.745,0 96.212,279.479 462.745,558.957 462.745,419.221 278.713,279.479 462.745,139.738 "></polygon> </g> </g> </g></svg> 
                    <p>Voltar</p>
                    </div>
                    <h1>Insira sua senha</h1>
                    <p className='ppp'>Você está entrando com  <span style={{color: 'red'}}>{email}</span></p>
                    <p style={{marginTop:'20px', fontSize:'20px',color: 'white'}}>Senha</p>
                    <div className='senhaeyes'>
                    <input value={senha} onChange={(event)=>{setsenha(event.target.value)}}  className='senhafil' type={mostrarSenha ? "text" : "password"} style={{fontFamily:'arial'}} />
                    <button onClick={()=>{setMostrarSenha(!mostrarSenha)}} style={{backgroundColor:'white'}}><img className='eye' src={mostrarSenha ? off : open} alt="" /></button>
                    </div>
                    <p style={{color: 'red'}}>{mensagelogin}</p>
                    <button className='btnsenhaentrar' onClick={()=>{login()}}>Entrar</button>
                </div>
           
            
            
        </div>
    );
}