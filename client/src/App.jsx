import List from "./components/list.jsx";
import "./App.css"
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateTask from "./components/update.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route default path="/" element={<List />} />
                <Route path="/update/:parameter" element={<UpdateTask />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
