import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Products from './Pages/Products'
import NotFound from './Pages/Errors'
import ProductById from './Pages/ProductById'
import RegistrationForm from './Pages/RegistrationForm'
import Login from './Pages/Login'
import CreateProduct from './Pages/CreateProduct'
import AboutUs from './Pages/AboutUs'
import AuthProvider, { AuthContext } from './Context/AuthContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AuthContext.Consumer>
            {
              ({login}) => (
                <Routes>
                  {login &&
                  <>
                    <Route path="/product/:id" element={<ProductById />} />
                    <Route path='/new_product' element={<CreateProduct />} />
                    <Route path='/new_product/:id' element={<CreateProduct />} />
                  </>
                  }
                  <Route path='/registration' element={<RegistrationForm />} />
                  <Route path="/" element={<Products />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='aboutus' element={<AboutUs/>} />
                </Routes>
              )
            }
          </AuthContext.Consumer>
        </AuthProvider>
      </BrowserRouter> 
    </>
  )
}

export default App
