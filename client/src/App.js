import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosPrivate from './hooks/useAxiosPrivate';

//DogImports
import Dogs from './components/DogComponents/Dogs';
import DogsAdd from './components/DogComponents/DogAdd';
import DogsDelete from './components/DogComponents/DogDelete';
import DogDetail from './components/DogComponents/DogDetail';
import DogEdit from './components/DogComponents/DogEdit';

//CatImports
import Cats from './components/CatComponents/Cats';
import CatsAdd from './components/CatComponents/CatAdd';
import CatsDelete from './components/CatComponents/CatDelete';
import CatDetail from './components/CatComponents/CatDetails';
import CatEdit from './components/CatComponents/CatEdit';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  //dogs
  const [dogs, setDogs] = useState();
  const [url, setUrl] = useState('/dogs/?limit=3&offset=0');

  //cats
  const [cats, setCats] = useState();
  const [urlCats, setUrlCats] = useState('/cats/?limit=3&offset=0');

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  
  const controller = new AbortController();
  
  var load = "";
  const GetLoad = async (loader) => {
    load = loader;
    console.log(load);

    if (load === "dog") {
      getDogs(url, { signal: controller.signal });
      return () => {
        controller.abort();
      }
    }
    else {
      getCats(urlCats, { signal: controller.signal });
      return () => {
        controller.abort();
      }
    }
  };

  // useEffect(() => {
  //   if (load === "dog") {
  //     getDogs(url, { signal: controller.signal });
  //     return () => {
  //       controller.abort();
  //     }
  //   }
  //   else {
  //     getCats(urlCats, { signal: controller.signal });
  //     return () => {
  //       controller.abort();
  //     }
  //   }
  // },[]);

  


  //dog functions
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
  const dogUpdateHandler = async (dog) => {
    console.log('DOG: ', dog);
    const response = await axiosPrivate.put('/dogs/', JSON.stringify(dog));
    console.log(response.data);
    getDogs(url);
  }

  //cat functions
  const getCats = async (urlCats, options = null) => {
    setUrlCats(urlCats);
      try {
          const response = await axiosPrivate.get(urlCats, options);
          console.log(response.data);
          setCats(response.data);
      } catch (err) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
      }
  }
  const catDelHandler = async (cat) => {
    console.log('CAT to be deleted: ', cat.id);
    const response = await axiosPrivate.delete(`/cats/${cat.id}`);
    console.log(response.data);
    getCats(urlCats);
  }
  const catAddHandler = async (cat) => {
    console.log('CAT: ', cat);
    const response = await axiosPrivate.post('/cats/', JSON.stringify(cat));
    console.log(response.data);
    getCats(urlCats);
  }
  const catUpdateHandler = async (cat) => {
    console.log('CAT: ', cat);
    const response = await axiosPrivate.put('/cats/', JSON.stringify(cat));
    console.log(response.data);
    getCats(urlCats);
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
          <Route path="/" element={<Home GetLoad={GetLoad} />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="dogs" element={<Dogs dogs={dogs} getDogs={getDogs}  />} />
          <Route path="dogs/new" element={<DogsAdd addHandler={dogAddHandler} />} />
          <Route path="dogs/delete/:id" element={<DogsDelete delHandler={dogDelHandler} />} />
          <Route path="dogs/view/:id" element={<DogDetail />} />
          <Route path="dogs/edit/:id" element={<DogEdit updateHandler={dogUpdateHandler} />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="cats" element={<Cats cats={cats} getCats={getCats}  />} />
          <Route path="cats/new" element={<CatsAdd addHandler={catAddHandler} />} />
          <Route path="cats/delete/:id" element={<CatsDelete delHandler={catDelHandler} />} />
          <Route path="cats/view/:id" element={<CatDetail />} />
          <Route path="cats/edit/:id" element={<CatEdit updateHandler={catUpdateHandler} />} />
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