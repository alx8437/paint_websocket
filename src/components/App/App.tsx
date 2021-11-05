import Toolbar from "../Toolbar/Toolbar";
import Settings from "../Settings/Settings";
import Canvas from "../Canvas/Canvas";
import styled from './App.module.scss';


function App() {
  return (
    <div className={styled.app}>
        <Toolbar />
        <Settings />
        <Canvas />
    </div>
  );
}

export default App;
