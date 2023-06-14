import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import JsonToText from './Pages/Converters/JsonToText';
import TextToJson from './Pages/Converters/TextToJson';
import XmlToText from './Pages/Converters/XmlToText';
import TextToXml from './Pages/Converters/TextToXml';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path="/convert/json" element={<JsonToText/>}></Route>
          <Route path="/convert/json/text" element={<TextToJson/>}></Route>
          <Route path="/convert/xml" element={<XmlToText/>}></Route>
          <Route path="/convert/xml/text" element={<TextToXml/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
