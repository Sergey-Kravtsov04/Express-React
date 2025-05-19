import { Route,Routes } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";


import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullMajor, Registration, AddMajor, Login } from "./pages";
import { useEffect } from "react";
import { fetchUserAuth,isAuthSelector } from "./redux/slices/auth";

function App() {
  const discpatch = useDispatch();

  useEffect(()=>{
    discpatch(fetchUserAuth())
  },[])
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/majors/:id" element={<FullMajor />}></Route>
          <Route path="/majors/:id/edit" element={<AddMajor />}></Route>
          <Route path="/add-major" element={<AddMajor />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Registration />}></Route>
        </Routes>  
      </Container>
    </>
  );
}

export default App;
