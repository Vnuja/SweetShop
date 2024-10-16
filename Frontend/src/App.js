
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './ItemComponent/Footer';

import Header1 from './ItemComponent/header';
import Login from './pages/Login';
import Register from "./pages/Register";
import Header from "./components/Header";
import UserProfile from "./pages/UserProfile";
import Footer1 from "./components/Footer";
import Feedback from "./pages/Feedback";
import Navbar from "./components/Navbar";
import OrderForm from "./components/OrderForm";
import Table from "./components/table"; // Ensure the component name is correct (Table)
import Sweetmenu from "./components/Sweetmenu"; // Import Sweetmenu component
import PaymentForm from "./components/PaymentForm"; // Import PaymentForm component
import PaymentTable from "./components/PaymentTable"; // Import PaymentTable component
import AddToCart from "./components/AddtoCart"; // Import AddToCart component
import ReportPage from "./components/ReportPage";
import ItemDetails from './ItemComponent/Itemdetails';
import ItemRepoart from './ItemComponent/ItemRepoart';
import UpdateItem from './ItemComponent/UpdateItem';

import Product from './ItemComponent/product';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/home' element={<Product />}></Route>
          <Route path='/itemdetails' element={<ItemDetails />}></Route>
          <Route path='/itemupdate/:id' element={<UpdateItem />}></Route>
          <Route path='/itemrepoart' element={<ItemRepoart />}></Route>
        </Routes>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/header" element={<Header />} />
          <Route path="/userProfile/:id" element={<UserProfile />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Router>
      <Navbar />
      <Routes>
        <Route path="/sweetmenu" element={<Sweetmenu addCartItem={addCartItem} />} />
        <Route path="/addtocart" element={<AddToCart cartItems={cartItems} />} />
        <Route path="/orderform" element={<OrderForm selectedItem={selectedItem} addOrder={addOrder} />}/>
        <Route path="/table" element={<Table orders={orders} setOrders={setOrders} />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/payment-table" element={<PaymentTable />} />
        <Route path="/" element={<Sweetmenu addCartItem={addCartItem} />} /> {/* Default route */}
        <Route path="/" element={<Table />} /> {/* Default path */}
        <Route path="/report" element={<ReportPage />} /> {/* Report page */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
