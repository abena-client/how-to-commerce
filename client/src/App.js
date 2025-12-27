import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WalletStatus from './components/WalletStatus'
import Home from './pages/Home'
import Products from './pages/Products'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import NFTMarketplace from './pages/NFTMarketplace'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import CheckOutSuccess from './components/CheckOutSuccess'


const App = () => {

  const isNavActiveStyles=({isActive})=>{
    return {
      color: isActive ? "#f97316":null,
    };
  }

  return (
   <>
    <div className='app min-h-screen bg-black text-white'>
        <Navbar  isNavActiveStyles={isNavActiveStyles}/>
        <WalletStatus />
        <ToastContainer 
          theme="dark"
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/products/:id' element={<Products/>}/>
          <Route path='/cart' element={<Cart/>} />
          <Route path='/nft-marketplace' element={<NFTMarketplace/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/checkout-success' element={<CheckOutSuccess/>} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
    </div>
    <Footer/>
   </>
  )
}

export default App