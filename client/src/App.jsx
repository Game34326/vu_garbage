import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Teachable_Machine from "./Teachable_Machine/Teachable_Machine";


function App() {

  return (
    <Router basename='/garbage' hashType="noslash">
    <Routes>
      <Route path='/' element={<Teachable_Machine />} />
    </Routes>
  </Router>
  )
}

export default App
