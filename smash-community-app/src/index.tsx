import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./components/Landing";
import Login from "./components/Login";
import { SignUp } from "./components/SignUp";
import { CommunityFinder } from "./components/CommunityFinder";
import { EventFinder } from "./components/EventFinder";
import { MyEvents } from "./components/MyEvents";
import { MyCommunities } from "./components/MyCommunities";
import { GeneralMessageBoard } from "./components/GeneralMessageBoard";
import { MyProfile } from "./components/MyProfile";
import { CommunityEventManager } from "./components/CommunityEventManager";
import { SiteNavigation } from "./components/SiteNav";
import { CreateEvent } from "./components/EventForm";
import { CreateCommunity } from "./components/CommunityForm";
import { Header } from "./components/Header";
import { UserContextProvider } from "./contexts/UserContextProvider";
import { userInfo } from "os";
import { createContext } from "react";
import UserContext from "./contexts/UserContext";
import { EditProfile } from "./components/EditProfile";
import { Message } from "./components/Message";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <App />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route
            path="/generalmessageboard"
            element={<GeneralMessageBoard />}
          />
          <Route path="/message" element={<Message />} />
          <Route path="/mycommunities" element={<MyCommunities />} />
          <Route path="/communityfinder" element={<CommunityFinder />} />
          <Route path="/myevents" element={<MyEvents />} />
          <Route path="/eventfinder" element={<EventFinder />} />
          <Route path="/communityform" element={<CreateCommunity />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route
            path="/communityeventmanager"
            element={<CommunityEventManager />}
          />
          <Route path="/sitenav" element={<SiteNavigation />} />
          <Route path="/communityform" element={<CreateCommunity />} />
          <Route path="/eventform" element={<CreateEvent />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
