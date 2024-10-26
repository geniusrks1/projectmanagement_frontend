import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddJob, JobDetail, JobList, Login, Register, NotFound,  ProjectApp } from "../pages/index";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< ProjectApp />} />
        <Route path="/addjob" element={<AddJob />} />
        <Route path="/editjob/:id" element={<AddJob />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/list/:id" element={<JobDetail />} />
        <Route path="/list" element={<JobList />}>
        <Route index element={<JobList />} /> 
       </Route> 
      </Routes>
    </BrowserRouter>
  )
}