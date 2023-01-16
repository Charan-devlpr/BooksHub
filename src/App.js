import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import BookShelves from './components/BookShelves'
import BookDetails from './components/BookDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/shelf" component={BookShelves} />
      <ProtectedRoute exact path="/books/:id" component={BookDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
