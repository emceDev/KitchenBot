import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./Pages/components/Navbar";
import { Machine } from "./Pages/Machine/Machine";

import { UtilityList } from "./Pages/Utility/UtilityList";
import { Task } from "./Pages/Task/components/Task/Task";
function App() {
  return (
    <div className="App">
      {/* {/* <ManualSteering/>
      {/* <Machine /> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Machine/:m_id/" element={<Machine />}>
            <Route path="UtilityList" element={<UtilityList />} />
            <Route path="Tasks/:t_id/" element={<Task />} />
            {/* <Route path="Tasks/:t_id/edit" element={<EditTask />} />
            <Route path="Tasks/create" element={<CreateTask />} /> */}
          </Route>
        </Routes>
      </Router>

      {/* <Todo /> */}
    </div>
  );
}

export default App;
