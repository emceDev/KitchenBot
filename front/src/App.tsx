import "./App.css";
import ContainerManager from "./Container/Container";
import { RecipeComponent } from "./Receipe/Receipe";
import { Provider } from "react-redux";
import store from "./state/store";

function App() {
  return (
    <Provider store={store}>
      {
        // <><ContainerManager/></>
        <RecipeComponent />
      }
    </Provider>
  );
}

export default App;
