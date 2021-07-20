import React, {useEffect, useState} from 'react';
import {Container, Owner, Loading, BackButtom, IssuesList, PageActions, FilterList} from './styles';
import api from '../../services/baseUrl';
import {FaSpinner, FaArrowLeft} from 'react-icons/fa';

//{decodeURIComponent(match.params.repositorio)}

export default function Repositorio({match}){

    const [repositorio, setRrepositorio] = useState({});

    const [issues, setIssues] = useState([]);

    const [load, setLoad] = useState(true);

    const [page, setPage] = useState(1);

    const [filters, setFilters] = useState([
        {state: 'all', label:'Todas', active:true},
        {state: 'open', label:'Abertas', active:false},
        {state: 'closed', label:'Fechadas', active:false}
    ]);

    const [filterIndex, setFilterIndex] = useState(0);




    useEffect(()=>{
        async function load(){
            const nomeRepo = decodeURIComponent(match.params.repositorio);

            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params:{
                        state: filters.find(f => f.active).state,
                        per_page: 5
                    }
                })
            ]);

           setRrepositorio(repositorioData.data);
           setIssues(issuesData.data);
           setLoad(false);
        }

        load();
    }, [filters, match.params.repositorio]);

    useEffect(()=>{
        async function loadInssue(){
            const nomeRepo = decodeURIComponent(match.params.repositorio);

            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params:{
                    state: filters[filterIndex].state,
                    page: page,
                    per_page: 5
                }
            })
            setIssues(response.data);
        }

        loadInssue();

    }, [filterIndex, filters, match.params.repositorio, page])

    function handlePage(action){
        setPage(action === 'back' ? page -1 : page +1)
    }

    function handleFilter(index){
        setFilterIndex(index);
    }

  if(load){
    return(
        <Loading>
            <h1>Carregando....</h1>
            <FaSpinner color="#fff" size={54} />
        </Loading>
    )
  }

    return(
        <Container>
            <BackButtom to="/">
                <FaArrowLeft color="#363636" size={30} />
            </BackButtom>

            <Owner>
                <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} />
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
            </Owner>

            <FilterList active={filterIndex}>
                {filters.map((filter, index) => (
                    <button typer="button" key={filter.label} onClick={()=> handleFilter(index)}>
                        {filter.label}
                    </button>
                ))}
            </FilterList>


            <IssuesList>
                {issues.map(issue =>(
                     <li key={String(issue.id)}>
                         <img src={issue.user.avatar_url} alt={issue.user.login} />

                         <div>
                             <strong>
                                 <a href={issue.html_url} target="_blank">{issue.title}</a>

                                 {issue.labels.map(label => (
                                    <span key={String(label.id)}>{label.name}</span>
                                  ))}
                             </strong>

                             <p>{issue.user.login}</p>
                         </div>
                     </li>
                ))}
            </IssuesList>


            <PageActions>
                <button type="button" onClick={()=> handlePage('back')} disabled={page < 2}>
                    Voltar
                </button>

                <button type="button" onClick={()=> handlePage('next')}>
                    Próxima
                </button>

            </PageActions>
        </Container>
    )
}; 