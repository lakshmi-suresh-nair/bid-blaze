// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import GetStarted from './components/GetStarted';
import ViewProducts from './components/ViewProducts';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
import Checkout from './components/CheckoutForm';
import PaymentPage from './components/PaymentPage';
import VerifyEmail from './components/VerifyEmail';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import CategoryPage from './components/CategoryPage';
import MyAccount from './components/MyAccount'; // Import MyAccount component
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/get-started" element={<GetStarted />} />
                    <Route path="/view-products" element={<ViewProducts />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="/category/:category" element={<CategoryPage />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route
                        path="/product/:id"
                        element={
                            <ProtectedRoute>
                                <ProductDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-product"
                        element={
                            <ProtectedRoute>
                                <AddProduct />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/payment"
                        element={
                            <ProtectedRoute>
                                <PaymentPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-account"
                        element={
                            <ProtectedRoute>
                                <MyAccount />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
