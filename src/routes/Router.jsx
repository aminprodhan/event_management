import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "../components/public/Home";
import Login from "../components/auth/Login";
import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../components/admin/Dashboard";
import MyEvent from "../components/admin/event/MyEvent";
import EventList from "../components/admin/event/EventList";
import DeafultLayout from "../layouts/DefaultLayout";
import { getUserSession } from "../utils/auth";
import EventDetails from "../components/public/EventDetails";
import {  RootProvider } from "../contexts/RootContext";
import AttendeeList from "../components/admin/event/AttendeeList";

const PrivateRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
};
const RootRouter=()=>{
    const isAuthenticated= getUserSession('token');
    return(
        <RootProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<DeafultLayout />}>
                        <Route
                            index
                            element={<Home />} 
                        />
                        <Route
                            path="event/:slug"
                            element={<EventDetails />} 
                        />
                    </Route>
                    {/* <Route
                        path="/login"
                        element={<Login  />}
                    /> */}
                    <Route 
                        path="admin" 
                        element={<PrivateRoute isAuthenticated={isAuthenticated}> <AuthLayout/> </PrivateRoute>}>
                            <Route
                                path="dashboard" 
                                element={<Dashboard />} 
                            />
                            <Route
                                path="event/create" 
                                element={<MyEvent title="Event Create" />} 
                            />
                            <Route
                                path="events" 
                                element={<EventList title="Event List" />} 
                            />
                            <Route
                                path="events/attendees" 
                                element={<AttendeeList title="Attendee List" />} 
                            />
                    </Route>
                </Routes>
            </Router>
        </RootProvider>
    )
}
export default RootRouter;