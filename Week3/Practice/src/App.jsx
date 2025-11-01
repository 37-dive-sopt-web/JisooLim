import { useState } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Search from './components/Search';
import { members } from './member';

function App() {
const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredMembers = members.filter((member) =>
    member.name.includes(search)
  );

  return (
    <>
      <Header />
      <Search search={search} handleSearchChange={handleSearch} />
      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            name={member.name}
            englishName={member.englishName}
            github={member.github}
          />
        ))}
      </section>
    </>
  );
}

export default App;