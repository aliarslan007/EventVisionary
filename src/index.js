import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Pricing from './(root)/Pricing/page'
import EventsPage from './(root)/EventsPage/page.js'
import NewEvent from './(root)/NewEvent/page'
import Dashboard from './(root)/Dashboard/page.js'
import Event from './(root)/Event/page.js'
import Archived from './(root)/archived/page.js'
import Draft from './(root)/Draft/page.js'
import EventDash from './(root)/eventdash/page.js'
import SellTickets from './(root)/sellTickets/page.js'
import Hold_Seats from './(root)/managetwo/page.js'
import ScanTickets from './(root)/scanTickets/page.js'
import Attendees from './(root)/attendees/page.js'
import ManageOrder from './(root)/ManageOrder/page.js'
import Eventdetails from './(root)/eventdetails/page.js'
import Ticketprices from './(root)/ticketprices/page.js'
import SettingChart from './(root)/settingChart/page.js'
import Venues from './(root)/venues/page.js'
import TrialOPT from './(root)/TrialOPT/page.js'
import Reports from './(root)/reports/page.js'
import Settingdash from './(root)/settingdash/page.js'
import Myaccount from './(root)/myaccount/page.js'
import About from './(root)/About/page.js'
import ArchivedAttendees from './(root)/ArchivedAttendess/page.js'
import ArchivedChart from './(root)/ArchivedChart/page.js'
import ArchivedEvent from './(root)/ArchivedEvent/page.js'
import ArchivedOrder from './(root)/ArchivedOrder/page.js'
import ArchivedPrice from './(root)/ArchivedPrice/page.js'
import CustomerAccount from './(root)/CustomerAccount/page.js'
import DefineTicket from './(root)/DefineTicket/page.js'
import Events from './(root)/Events/page.js'
import Forgot from './(root)/forgot/page.js'
import Keywords from './(root)/Keywords/page.js'
import Login from './(root)/Login/page.js'
import Login_org from './(root)/Login_org/page.js'
import Sign_Up from './(root)/Sign_Up/page.js'
import Sign_Up_org from './(root)/Sign_Up_org/page.js'
import MyPlan from './(root)/MyPlan/page.js'
import MyPurchases from './(root)/MyPurchases/page.js'
import PublishEvent from './(root)/PublishEvent/page.js'
import Setting from './(root)/Setting/page.js'
import ShareEvent from './(root)/ShareEvent/page.js'
import SingleEvent from './(root)/SingleEvent/page.js'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/EventsPage" element={<EventsPage />} />
        <Route path="/NewEvent" element={<NewEvent />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/archived" element={<Archived />} />
        <Route path="/Draft" element={<Draft />} />
        <Route path="/eventdash" element={<EventDash />} />
        <Route path="/sellTickets" element={<SellTickets />} />
        <Route path="/managetwo" element={<Hold_Seats />} />
        <Route path="/scanTickets" element={<ScanTickets />} />
        <Route path="/attendees" element={<Attendees />} />
        <Route path="/ManageOrder" element={<ManageOrder />} />
        <Route path="/eventdetails" element={<Eventdetails />} />
        <Route path="/ticketprices" element={<Ticketprices />} />
        <Route path="/settingChart" element={<SettingChart />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/TrialOPT" element={<TrialOPT />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settingdash" element={<Settingdash />} />
        <Route path="/myaccount" element={<Myaccount />} />
        <Route path="/About" element={<About />} />
        <Route path="/ArchivedAttendess" element={<ArchivedAttendees />} />
        <Route path="/ArchivedChart" element={<ArchivedChart />} />
        <Route path="/ArchivedEvent" element={<ArchivedEvent />} />
        <Route path="/ArchivedOrder" element={<ArchivedOrder />} />
        <Route path="/ArchivedPrice" element={<ArchivedPrice />} />
        <Route path="/CustomerAccount" element={<CustomerAccount />} />
        <Route path="/DefineTicket" element={<DefineTicket />} />
        <Route path="/Events/:token" element={<Events />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/Keywords" element={<Keywords />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Login_org" element={<Login_org />} />
        <Route path="/Sign_Up" element={<Sign_Up />} />
        <Route path="/Sign_Up_org" element={<Sign_Up_org />} />
        <Route path="/MyPlan" element={<MyPlan />} />
        <Route path="/MyPurchases" element={<MyPurchases />} />
        <Route path="/PublishEvent" element={<PublishEvent />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/ShareEvent" element={<ShareEvent />} />
        <Route path="/SingleEvent/:eventId" element={<SingleEvent />} />
        {/* Define additional pages/routes */}
      </Routes>
    </Router>
  </React.StrictMode>
);
