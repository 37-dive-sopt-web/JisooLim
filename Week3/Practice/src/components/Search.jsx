const Search = ({search, handleSearchChange}) => {
    return (
    <div>
      <input type="text" placeholder="검색어를 입력하세요" value={search} onChange={handleSearchChange}/>
      <button>검색</button>
    </div>
  );
}

export default Search;
