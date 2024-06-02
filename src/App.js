import SidebarRoutes from "./components/sidebar/data/SidebarRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import "./App.css";
import stores from "./data/stores";

function App() {
  return (
    <Provider {...stores}>
      <Router>
        <div className="nk-body ui-rounder npc-default">
          <div className="nk-app-root">           
            <div className="nk-main ">
              <div className="nk-wrap">
                <div className="nk-content ">
                  <div className="container-fluid">
                    <div className="nk-content-inner">
                      <div className="nk-content-body">
                        <Routes>
                          {SidebarRoutes.map((route, index) => (
                            <Route
                              key={index}
                              path={route.path}
                              exact={route.exact}
                              element={<route.main />}
                            />
                          ))}
                        </Routes>                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
