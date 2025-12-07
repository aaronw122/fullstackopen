import {useState} from "react";

const SearchFilter = ({searchText, handleSearchChange}) => {

    return(
        <div>
            filter shown with:<input value={searchText} onChange={handleSearchChange}/>
        </div>
    )
}

export default SearchFilter