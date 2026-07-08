import '../../Css/Cadastro.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Home (){
    const [Nome,setNome]=useState('')
    const [Email,setEmail]=useState('')
    const [Senha,setSenha]=useState('')
    const [Mensagem,setMensagem]=useState('')
    const navi = useNavigate();

    const CreatUser = async () => {
        try {
        const UserCadastro = {Nome:Nome,Email:Email,Senha:Senha,}
        const response = await fetch ("http://localhost:5115/api/Controll/Create",{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(UserCadastro)
        })
        const resposta = await response.text();
        if (response.ok){
            setMensagem(resposta)
            setEmail("");
            setNome("");
            setSenha("");
            navi("/Login")
        }
        else  {
            setMensagem(resposta);
        }
        } catch (error){
            setMensagem(`Algo Aconteceu${error}`)
            return
        }
        }
    return (
        <div className='fundocadastro'>
            <header></header>
            <section>
                <div className='inputscd'>
                    <input type="text" value={Nome} onChange={(e)=> setNome(e.target.value)} placeholder='Nome'/>
                    <input type="text" value={Email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email'/>
                    <input type="password" value={Senha} onChange={(e)=> setSenha(e.target.value)} placeholder='Senha'/>
                    <div style={{display:'flex', alignItems:'center', justifyContent: 'start', width:'100%' }}>
                        <p>{Mensagem}</p>
                    </div>    
                    <div className='btnscd'>
                        <button className='btncd' onClick={CreatUser}>Cadastrar</button>
                        <button onClick={()=>{navi("/Login")}}>Já tenho login</button>
                    </div>   
                </div>
                
                
            </section>
        </div>
    )
}