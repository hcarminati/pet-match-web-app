import {BrowserRouter, HashRouter} from "react-router-dom";
import {
    Routes, Route,
    Navigate
} from "react-router";
import HomePage from "./Components/Home";
import Header from "./Components/common/Header";
import Quiz from "./Components/Quiz";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Search from "./Components/Search";
import Profile from "./Components/Profile";
import PetProfile from "./Components/PetProfile";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<Navigate to="/Home/*"/>}/>
                    <Route path="/Home/*" element={<HomePage/>}/>
                    <Route path="/Quiz" element={<Quiz/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/Register" element={<Signup/>}/>
                    <Route path="/Search" element={<Search/>}/>
                    <Route path="/Profile/*" element={<Profile/>}/>
                    <Route path="/Pet/:id" element={<PetProfile/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
