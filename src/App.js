import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/ProductList/ProductList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import CreateProduct from './components/CreateProduct/CreateProduct';

function App() {
  return (
    <>
    <ToastContainer position='top-right'  autoClose={2000}/>
    <Navbar />
    <Routes>
      <Route path='/phone-store-reactjs' element={<ProductList />} />
      <Route path='/phone-store-reactjs/product/create' element={<CreateProduct />} />
    </Routes>
  </>
  );
}

export default App;
