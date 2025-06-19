import PrintStorage from "@features/PrintStorage";
import "./App.css";
import SaveSession from "@features/SaveSession";

function App() {
  return (
    <>
      <h1 className="font-bold">Tabmark</h1>
      <SaveSession />
      <PrintStorage />
    </>
  );
}

export default App;
