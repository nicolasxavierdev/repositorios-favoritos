import React, {useState, useCallback, useEffect} from 'react';
import {Conteiner, Form, SubmitButtom, List, DeletButton} from './styles';
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import api from '../../services/baseUrl';


export default function Main(){

    const [newRepo, setNewRepo] = useState(''); 
    const [repositorios, setrepositorios] = useState([]); 
    const [Loading, setLoading] = useState(false); 
    const [alert, setAlert] = useState(null);


    //Did Mount - Buscar toda vez que iniar

    useEffect(()=> {
        const repoStorage = localStorage.getItem('repos');

        if(repoStorage){
            setrepositorios(JSON.parse(repoStorage));
        }

    }, [])


    //Did Update - SALVAR ALTERAÇÕES
    useEffect(()=> {
        localStorage.setItem('repos', JSON.stringify(repositorios));
    }, [repositorios])

    function handleInputChange(e){
        setNewRepo(e.target.value);
        setAlert(null);
    };

  const handleSubmit = useCallback((e)=>{
    e.preventDefault();

    async function submit(){
        setLoading(true);
        setAlert(null);
        try{

            if(newRepo === ''){
                throw new Error('Você precisa indicar um repositório!');
            }
            const response = await api.get(`repos/${newRepo}`);

            const hasRepo = repositorios.find(repo => repo.name === newRepo);

            if(hasRepo){
                throw new Error('Repositório duplicado!');
            }

        const data = {
            name: response.data.full_name,
        }

        setrepositorios([...repositorios, data]);
        setNewRepo('');

        }catch(error){
            setAlert(true);
            console.log(error);
        }finally{
            setLoading(false);
        }


    }

    submit();

  }, [newRepo, repositorios]);


  const handleDelet = useCallback((repo) =>{
    const find = repositorios.filter(r => r.name !== repo);
    setrepositorios(find);
  }, [repositorios]);




    return(
        <Conteiner>
            <h1>
                <FaGithub size={25}/>
                Meus Repositórios 
            </h1>

            <Form onSubmit={handleSubmit} error={alert}>
                <input type="text" placeholder="Adicionar Repositórios"
                    value={newRepo} onChange={handleInputChange} />

                <SubmitButtom loading={Loading ? 1 : 0}>
                    {Loading ? (
                        <FaSpinner color="#fff" size={14} />
                    ):(
                         <FaPlus color="#fff" size={14} />
                    )}

                </SubmitButtom>
            </Form>

            <List>
                 {repositorios.map(repo =>(
                     <li key={repo.name}>
                         <span>
                        <DeletButton onClick={() => handleDelet(repo.name)}>
                            <FaTrash size={14} />
                        </DeletButton>
                         {repo.name}
                         </span>
                         <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                             <FaBars size={20} />
                        </Link>
                     </li>
                ))}       
            </List>
        </Conteiner>
    )
}; 