import Layout from './components/layout/Layout';
import Home from "./pages/Home";
import { BookStoreThemeProvider } from './context/themeContext';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from './components/common/Error';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';

const router = createBrowserRouter([
    {
        path: "/",
        element:   <Layout><Home/></Layout>,
        errorElement: <Error/>
    },
    {
        path: "/books",
        element: <Layout>
          <div>도서목록</div>
        </Layout>
    },
    {
      path: "/signup",
      element: <Layout>
        <Signup/>
      </Layout>
  },
  {
    path: "/reset",
    element: <Layout>
      <ResetPassword />
    </Layout>
}
])

function App() {

  return (
    <BookStoreThemeProvider>
        <RouterProvider router={router}/>
    </BookStoreThemeProvider>
  );
}

export default App;
