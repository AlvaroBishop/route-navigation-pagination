import React, {useState, useEffect} from 'react';
import { Loading } from '../Loading/Loading';
import Character from './CharacterMUI';
import Pagination from '@mui/material/Pagination';
export default function ListMUI() {
    const [characters, setCharacter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPageUrl, setCurrentPageUrl] = useState("https://rickandmortyapi.com/api/character")
    const [currentPage, setCurrentPage] = useState(1);
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

            // setNextPageUrl(next);
            // setPrevPageUrl(prev);
            setPages(pages)
        }

        fetchData();
    }, [currentPageUrl]);

    // const nextPage = () => {
    //     setCurrentPageUrl(nextPageUrl);
    // }
    // const prevPage = () => {
    //     setCurrentPageUrl(prevPageUrl);
    // }
    // const goToPage = (num) => {
    //     setCurrentPageUrl(`https://rickandmortyapi.com/api/character?page=${num}`);
    // }

    const handleOnChange = (e, p) => {
        window.scroll(0, 0);
        setLoading(true);
        setCurrentPageUrl(`https://rickandmortyapi.com/api/character?page=${p}`);
        setCurrentPage(p);
        setTimeout(() => {
            setLoading(false);
        }, 500)
        console.log(`e ${e} p ${p}`)
    }
    return (
        <div>
            <div>
                <Pagination 
                    style={{
                        display:'flex',
                        justifyContent: 'center',
                        margin: '2rem'
                    }}
                    count={pages} 
                    page={currentPage}
                    color='success'
                    onChange={(e,page) => handleOnChange(e.target.textContent, page)}
                />
            </div>
            <h2>CharactersMUI</h2>
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
                    style={{
                        display:'flex',
                        justifyContent: 'center',
                        margin: '2rem'
                    }}
                    count={pages} 
                    page={currentPage}
                    color='success'
                    onChange={(e,page) => handleOnChange(e.target.textContent, page)}
                />
            </div>
        </div>
    )
}