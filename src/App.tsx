import { useHello } from './hooks/useHello';
import kirby from '../public/kirby.jpg';
import ArticleCard from './components/ArticleCard';

function App() {
  const [hello, sayHello] = useHello();

  return (
    <>
      <h1>{hello} Zzap!</h1>
      <img src={kirby}></img>
      <button onClick={sayHello}>Hello!</button>
      <ArticleCard title="sample" contentPreview="이건 콘텐트 미리보기 내용인데 길면 ...으로 짤리게 만들거야" />
    </>
  );
}

export default App;
