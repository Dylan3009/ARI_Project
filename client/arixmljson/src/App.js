import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import TextToJson from './Pages/Converters/TextToJson';
import JsonToText from './Pages/Converters/JsonToText';
import XmlToText from './Pages/Converters/XmlToText';
import TextToXml from './Pages/Converters/TextToXml';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path="/convert/json" element={<TextToJson/>}></Route>
          <Route path="/convert/json/text" element={<JsonToText/>}></Route>
          <Route path="/convert/xml" element={<TextToXml/>}></Route>
          <Route path="/convert/xml/text" element={<XmlToText/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
