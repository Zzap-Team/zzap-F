import { ArticleCard } from './components/ArticleCard';
import { AddArticle } from './components/AddArticle';

function App() {
  return (
    <>
      <h1>HEllo</h1>
      <AddArticle />
      <ArticleCard
        key={'123'}
        title={'마법천자문'}
        description={'삼장과 원숭이, 그리고 조제'}
        author="김테스트1"
        createdAt="2023-07-02"
      />
    </>
  );
}

export default App;
