import axios from "axios";
import { useEffect, useState } from "react";
import ElementsForm from "./components/ElementsForm";
import ListElements from "./components/ListElements";

function App() {
  const [elementsList, setElementsList] = useState([]);
  const [elementSelected, setElementSelected] = useState(null);
  const [userForm, setUserForm] = useState(false);
  
  useEffect(() => {
    getElements();
  }, []);
  
  const getElements = () => {
    axios.get('https://users-crud.academlo.tech/users/')
    .then((res) => setElementsList(res.data));
  };
  
  const selectElement = (element) => {
    openForm();
    setElementSelected(element);
  };
  
  const openForm = () => setUserForm(true);
  const closeForm = () => {
    setUserForm(false);
    setElementSelected(null);
  }
  
  return (
    <div className="App">
      <ListElements 
        elementsList={elementsList} 
        selectElement={selectElement} 
        getElements={getElements}
        openForm={openForm} 
        closeForm={closeForm} />
      {userForm &&
        <ElementsForm
        getElements={getElements}
        elementSelected={elementSelected}
        selectElement={selectElement}
        closeForm={closeForm}
        />}
    </div>
  );
}
export default App;


// null             -> si no hay carro seleccionado
// { id, brand ...} -> si hay un carro seleccionado