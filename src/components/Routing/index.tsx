import { Routes, Route } from 'react-router-dom';
import Dashboard from "../Dashboard/Dashboard";
import Navbar from "../Navbar/Navbar";
import UpcomingLaunches from "../UpcomingLaunches/UpcomingLaunches";
import LaunchDetails from "../LaunchDetails/LaunchDetails";


function Routing() {
    return (<div>
        <Navbar></Navbar>
        <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/launchdetails/:id' element={< LaunchDetails />}></Route>
            <Route path='/upcoming' element={< UpcomingLaunches />}></Route>
        </Routes>
    </div>);
}

export default Routing;
