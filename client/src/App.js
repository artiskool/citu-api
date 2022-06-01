import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Dogs from './components/Dogs';
import DogsAdd from './components/DogAdd';
import DogsDelete from './components/DogDelete';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import DogAdd from './components/DogAdd';
import DogDetail from './components/DogDetail';
import DogEdit from './components/DogEdit';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  const [dogs, setDogs] = useState([]);
  const [url, setUrl] = useState('/dogs/?limit=3&offset=0');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const getDogs = async (url, options = null) => {
    setUrl(url);
      try {
          const response = await axiosPrivate.get(url, options);
          console.log(response.data);
          setDogs(response.data);
      } catch (err) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
      }
  }
  useEffect(() => {
      const controller = new AbortController();
    getDogs(url, {
          signal: controller.signal
      });
      return () => {
          controller.abort();
      }
  }, []);

  const dogDelHandler = async (dog) => {
    console.log('DOG to be deleted: ', dog.id);
    const response = await axiosPrivate.delete(`/dogs/${dog.id}`);
    console.log(response.data);
    getDogs(url);
  }

  const dogAddHandler = async (dog) => {
    console.log('DOG: ', dog);
    const response = await axiosPrivate.post('/dogs/', JSON.stringify(dog));
    console.log(response.data);
    getDogs(url);
  }

  useEffect(() => {
      const controller = new AbortController();
      getDogs(url, {
          signal: controller.signal
      });
      return () => {
          controller.abort();
      }
  }, []);
  const dogUpdateHandler = async (dog) => {
    console.log('DOG: ', dog);
    const response = await axiosPrivate.put('/dogs/', JSON.stringify(dog));
    console.log(response.data);
    getDogs(url);
  }
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="dogs" element={<Dogs dogs={dogs} getDogs={getDogs} />} />
          <Route path="dogs/new" element={<DogsAdd addHandler={dogAddHandler} />} />
          {/* <Route path="dogs/view/:id" element={<DogsView />} /> */}
          <Route path="dogs/delete/:id" element={<DogsDelete delHandler={dogDelHandler} />} />
          <Route path="dogs/view/:id" element={<DogDetail />} />
          <Route path="dogs/edit/:id" element={<DogEdit updateHandler={dogUpdateHandler} />} />
        </Route>

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="dogs/delete" element={<Dogs />} />
        </Route> */}
        

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;