import {HashRouter} from "react-router-dom";
import {
    Routes, Route,
    Navigate
} from "react-router";
import HomePage from "./Components/Home";
import Header from "./Components/common/Header";
import Quiz from "./Components/Quiz";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
    return (
        <HashRouter>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<Navigate to="/Home/*"/>}/>
                    <Route path="/Home/*" element={<HomePage/>}/>
                    <Route path="/Quiz" element={<Quiz/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/Register" element={<Signup/>}/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
