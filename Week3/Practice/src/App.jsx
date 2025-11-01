import Card from './components/Card';
import Header from './components/Header';
import { members } from './member';

const App = () => {
  return (
    <>
      <Header />
      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {members.map((member) => (
          <Card
            key={member.id}
            name={member.name}
            github={member.github}
            englishName={member.englishName}
          />
        ))}
      </section>
    </>
  );
}

export default App;