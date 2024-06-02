import React from "react";
import { Link } from "react-router-dom";
import MENUITEMS from "./data/menu";

function Menu() {
  return (
    <div className="nk-sidebar-bar text-center">
      <div className="nk-apps-brand">
        <strong>Gorilla</strong>
      </div>
      <div className="nk-sidebar-element">
        <div className="nk-sidebar-body">
          <div className="nk-sidebar-content" data-simplebar>
            <div className="nk-sidebar-menu">
              <ul className="nk-menu apps-menu text-center pl-0">
                {MENUITEMS.map((item, index) => (
                  <li className="nk-menu-item" key={index}>
                    <Link
                      to={item.target}
                      className="nk-menu-link nk-menu-switch"
                    >
                      <span className="nk-menu-icon">
                        <em className={`icon ni ${item.icon}`}></em>
                      </span>
                    </Link>
                    <small>{item.title}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Menu;
