import React, {useState, useEffect} from 'react';
import { Loading } from '../Loading/Loading';
import Character from './Character';
import { Pagination } from './Pagination';
export default function List() {
    const [characters, setCharacter] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [currentPageUrl, setCurrentPageUrl] = useState("https://rickandmortyapi.com/api/character")
    const [nextPageUrl, setNextPageUrl] = useState()
    const [prevPageUrl, setPrevPageUrl] = useState()
    const [pages, setPages] = useState()
    useEffect(() => {
        const url = currentPageUrl;
        async function fetchData() {
            const data = await fetch(url);
            const {results, info : {next, prev, pages}} = await data.json();
            setCharacter(results);

            setTimeout(() => {
                setLoading(false);
            }, 2000)

            setNextPageUrl(next);
            setPrevPageUrl(prev);
            setPages(pages)
        }

        fetchData();
    }, [currentPageUrl]);

    const nextPage = () => {
        setCurrentPageUrl(nextPageUrl);
    }
    const prevPage = () => {
        setCurrentPageUrl(prevPageUrl);
    }
    const goToPage = (num) => {
        setCurrentPageUrl(`https://rickandmortyapi.com/api/character?page=${num}`);
    }

    return (
        <div>
            <div>
                <Pagination 
                    nextPage={nextPage} 
                    prevPage={prevPage} 
                    goToPage={goToPage} 
                    pages={pages} 
                    nextPageUrl={nextPageUrl} 
                    prevPageUrl={prevPageUrl}
                />

            </div>
            <h2>Characters</h2>
            <div className="row">
                {
                    loading ? (
                        <Loading/>
                    ) 
                    :
                    (

                    
                        characters.map((character) => (
                            <Character
                                key={character.id}
                                name={character.name}
                                origin={character.origin}
                                image={character.image}
                            />
                        )))
                }
            </div>
            <div>
                <Pagination 
                    nextPage={nextPage} 
                    prevPage={prevPage} 
                    goToPage={goToPage} 
                    pages={pages} 
                    nextPageUrl={nextPageUrl} 
                    prevPageUrl={prevPageUrl}
                />

            </div>
        </div>
    )
}