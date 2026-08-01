import '../../Css/Cadastro.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Config';

export default function Home (){
    const [Nome,setNome]=useState('')
    const [Email,setEmail]=useState('')
    const [Senha,setSenha]=useState('')
    const [Mensagem,setMensagem]=useState('')
    const navi = useNavigate();

    const CreatUser = async () => {
        try {
        const UserCadastro = {Name:Nome,Email:Email,Senha:Senha,}
        const response = await fetch (`${API_URL}/api/Controll/Create`,{
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
            <div className='painelcd'>
                <div className='marcacd'>
                    <span className='wallcd'>WALL</span>
                    <span className='eclipsecd'>ECLIPSE</span>
                </div>
                <h1 className='tituloCd'>Crie sua conta no Eclipse Wall</h1>

                <div className='inputscd'>
                    <input type="text" value={Nome} onChange={(e)=> setNome(e.target.value)} placeholder='Nome'/>
                    <input type="text" value={Email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email'/>
                    <input type="password" value={Senha} onChange={(e)=> setSenha(e.target.value)} placeholder='Senha'/>

                    {Mensagem && <p className='msgcd'>{Mensagem}</p>}

                    <button className='btncd' onClick={CreatUser}>Cadastrar</button>
                    <p className='linkcd'>
                        Já tem uma conta? <span onClick={()=>{navi("/Login")}}>Entrar</span>
                    </p>
                </div>
            </div>
        </div>
    )
}