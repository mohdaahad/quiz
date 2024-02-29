import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';
import Home from './components/home';
import Quiz from './components/quiz';
import Summary from './components/summary';
import Review from './components/review';
import Attempts from './components/attempts';
import CourseInput from './components/coursei_input';
import QuizInput from './components/quiz_input';
function App() {

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/summary/:attemptId" element={<Summary />} />
              <Route path="/quiz/:courseId" element={<Quiz />} />
              <Route path="/review/:attemptId" element={<Review />} />
              <Route path="/attempts/:userId/:courseId" element={<Attempts />} />
              <Route path="/courses" element={<CourseInput />} />
              <Route path="/quizz" element={<QuizInput />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App