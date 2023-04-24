import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Contacts } from "./pages/Contacts";
import { AddContact } from "./pages/AddContact";
import { EditContact } from "./pages/editContact";
import { CustManage } from "./pages/custManage";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <div className="h-100 layout-container">
            <Navbar />
            <Routes>
              <Route exact path="/index.html" element={<Contacts />} />
              <Route exact path="/" element={<Contacts />} />
              <Route exact path="/contacts" element={<Contacts />} />
              <Route exact path="/crm" element={<CustManage />} />
              <Route exact path="/add" element={<AddContact />} />
              <Route
                exact
                path="/edit/:contactId/:contactName"
                element={<EditContact />}
              />
              <Route render={() => <h1 className="notfound">Not found!</h1>} />
            </Routes>
            <Footer />
          </div>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
