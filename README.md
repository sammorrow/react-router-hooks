### Any feedback appreciated! Please submit any issues you encounter or send me an email.

* * *

# react-router-hooks

This package wraps react-router-v4's Route component in a higher-order component to enable the passing of lifecycle hooks as props. To use, import React- exported HOC instead of a normal Route.

The HOC interacts with the following functions:

**onEnter (routerProps, replace, callback)**

**onChange (prevProps, newProps, replace, callback)**

**onLeave (prevProps)**

The *replace* parameter is always passed a function that redirects the user (using browserHistory's history.push) to whatever route it is supplied.
If supplied a *callback* parameter, the hook will run asynchronously and not render the route until the callback is called or until the hook completes its execution.

* * *
## Example *routes* file:

````
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router-hooks';

const App = () => (
  <div>
    <Navbar />
    <Sidebar />
    <Switch>
      <Route
        exact path='/'
        component={ Main }
        onEnter={fetchAll}
      />
      <Route
        exact path="/catalog/:productId"
        component={Catalog}
        onEnter={selectProductType}
        onChange={selectProductType}
      />
      <Route
        path = '/help'
        onLeave={logVisit}
      />
      <Route
        path = '/logout'
        onEnter={forceLogout}
        render= {()=> {
          return (
            <div>
              <h1> Why am I here </h1>
              <Contact />
            </div>
          )}
        }
      />
    </Switch>
  </div>
)
````
