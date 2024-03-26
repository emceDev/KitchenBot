import "./App.css";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Machine } from "./Machine/Machine";
import ContainerManager from "./Container/Container";
import { ReceipeCreate } from "./Receipe/ReceipeCreate";
import { ReceipeDetails } from "./Receipe/ReceipeDetails";
import { ReceipeEdit } from "./Receipe/ReceipeEdit";
import { ReceipeList } from "./Receipe/ReceipeList";
import { ReceipeConfigure } from "./Receipe/ReceipeConfigure";
import { MachineMain } from "./Machine/MachineMain";
function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/Machine/:m_id/" element={<Machine />}>
              <Route path="" element={<MachineMain />} />
              <Route
                path="registerContainers/"
                element={<ContainerManager />}
              />
              <Route path="receipe/create" element={<ReceipeCreate />} />
              <Route path="receipe/:r_id/" element={<ReceipeDetails />} />
              <Route path="receipe/:r_id/edit" element={<ReceipeEdit />} />
              <Route path="receipe/list" element={<ReceipeList />} />
              <Route
                path="receipe/:r_id/configure"
                element={<ReceipeConfigure />}
              />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
