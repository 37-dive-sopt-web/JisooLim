const Search = ({ search, handleSearchChange, handleSearch }) => {
  return (
    <div>
      <input
        type='text'
        value={search}
        onChange={handleSearchChange}
        placeholder='검색어를 입력하세요'
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default Search;