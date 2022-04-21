import Toolbar from "../Toolbar/Toolbar";
import Settings from "../Settings/Settings";
import Canvas from "../Canvas/Canvas";
import styled from './App.module.scss';
import { Routes, Route, Navigate } from "react-router-dom";


function App() {
  return (
          <div className={styled.app}>
              <Routes>
                  <Route path='/:id' element={
                      <>
                          <Toolbar/>
                          <Settings/>
                          <Canvas/>
                      </>}>
                  </Route>
                  <Route path='*' element={<Navigate to={`f${(+new Date()).toString(16)}`} />}/>
              </Routes>
          </div>

  );
}

export default App;
