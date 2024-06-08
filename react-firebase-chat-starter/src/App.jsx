import Detail from "./components/detail/Detail";
import Chat from "./components/chat/Chat";
import List from "./components/list/List";

const App = () => {
  return (
    <div className="container">
      <List />
      <Chat />
      <Detail />
    </div>
  );
};

export default App;
