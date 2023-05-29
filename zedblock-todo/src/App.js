import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Layouts/Main";
import TaskList from "./Pages/TaskList/TaskList";
import Login from "./Pages/Login/Login";
import TaskEdit from "./Pages/TaskEdit/TaskEdit";
import TaskDetails from "./Pages/TaskDetails/TaskDetails";
import Error from "./Components/Error/Error";
import TaskAdd from "./Pages/TaskAdd/TaskAdd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<TaskList />}></Route>
          <Route path="/edit-task" element={<TaskEdit />}></Route>
          <Route path="/task-details" element={<TaskDetails />}></Route>
          <Route path="/add-task" element={<TaskAdd />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error direction={""} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
