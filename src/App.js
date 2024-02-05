import React from 'react'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './pages/AboutPage'
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'
import AboutIconLink from './components/AboutIconLink'
import Post from './components/Post'
import { FeedbackProvider } from './components/context/FeedbackContext'



function App() {


    return (
        <>
            <FeedbackProvider>
                <BrowserRouter >
                    <Header />
                    <div className='container'>

                        <Routes>
                            <Route path='/' element={
                                <>
                                    <FeedbackForm />
                                    <FeedbackStats />
                                    <FeedbackList />
                                </>
                            } />
                            <Route path='/about' element={<AboutPage />} />
                            <Route path='/post/*' element={<Post />} />
                        </Routes>
                        <AboutIconLink />
                    </div >
                </BrowserRouter >
            </FeedbackProvider>
        </>
    )
}


export default App