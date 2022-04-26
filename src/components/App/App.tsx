import Toolbar from "../Toolbar/Toolbar";
import Settings from "../Settings/Settings";
import Canvas from "../Canvas/Canvas";
import styled from './App.module.scss';
import { Routes, Route, Navigate } from "react-router-dom";
import {v4 as uuidv4} from 'uuid'


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
                  <Route path='*' element={<Navigate to={uuidv4()} />}/>
              </Routes>
          </div>

  );
}

export default App;
