import React from 'react'

export const PaginationMUI = ({nextPage, prevPage, goToPage, pages, nextPageUrl, prevPageUrl}) => {
    let pageButtons = [];
    for(let i = 1; i <= pages; i++)
    {
        pageButtons.push(<button 
                            key={i}
                            type="button" 
                            className="btn btn-info"
                            onClick={() => goToPage(i)}
                            >
                                {i}
                            </button>)
    }
    console.log(`prevpage ${prevPageUrl} nextpage ${nextPageUrl}`);
    return (
        <div className="btn-group btn-group-sm my-5" role="group" >
            {
                prevPageUrl &&
                <button type="button" className="btn btn-info" onClick={prevPage}>←</button>
            }
                {pageButtons}

            {
                nextPageUrl &&
                <button type="button" className="btn btn-info" onClick={nextPage}>→</button>
            }
            </div>
    )
}
