import { useState } from 'react'
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Explore} from './pages/Explore'
import {Home} from './pages/Home'
import { NavBar } from './components/NavBar'
import { FilterTag } from './components/FilterTag'
import { TopModel } from './pages/TopModel'
import { ModelPage } from './pages/ModelPage'
import { TryOut } from './pages/TryOut'
import { Search } from './pages/Search'
import {UploadModel} from './pages/UploadModel'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/topModel" element = {<TopModel/>}> </Route>
          <Route path="/Models/:modelId" element={<ModelPage />}> </Route>
          <Route path= "/Models/:modelId/Try" element={<TryOut />}> </Route>
          <Route path= "/search/:searchQuery" element = {<Search />}></Route>
          <Route path="/UploadModel" element = {<UploadModel />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
