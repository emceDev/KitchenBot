import "./App.css";
import { ManualSteering } from "./Pages/ManualSteering";
import { Machine } from "./Pages/machine/Machine";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./Pages/navbar/Navbar";
import {
  CreateUtility,
  EditUtilities,
  UtilityList,
} from "./Pages/utility/Utility";
import { CreateTask, EditTask, Task } from "./Pages/tasks/Task";
import { Todo } from "./Pages/Todo/Todo";

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
            <Route path="Tasks/:t_id/" element={<Task />}>
              <Route path="edit" element={<EditTask />} />
              {/* <Route path=":t_id/" element={<JobList />} /> */}
            </Route>
            <Route path="Tasks/create" element={<CreateTask />} />
          </Route>
        </Routes>
      </Router>

      {/* <Todo /> */}
    </div>
  );
}

export default App;
