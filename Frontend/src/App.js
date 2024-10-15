
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Footer from './ItemComponent/Footer';

import Header from './ItemComponent/header';








import ItemDetails from './ItemComponent/Itemdetails';
import ItemRepoart from './ItemComponent/ItemRepoart';
import UpdateItem from './ItemComponent/UpdateItem';

import Product from './ItemComponent/product';


function App() {
  return (
    <div className="App">
 <Router>
 <Header/>
 <Routes>


<Route path='/home' element={<Product/>}></Route>
<Route path='/itemdetails' element={<ItemDetails/>}></Route>
<Route path='/itemupdate/:id' element={<UpdateItem/>}></Route>
<Route path='/itemrepoart' element={<ItemRepoart/>}></Route>



   </Routes>
   </Router>
   <Footer/>
    </div>
  );
}

export default App;
