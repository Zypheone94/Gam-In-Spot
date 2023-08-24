import CategoryList from "../pages/categories/CategoryList.jsx";
import CategoryDetail from "../pages/categories/CategoryDetail.jsx";

const CategoryRoutes = [
    {
        path: "/category",
        element: <CategoryList/>,
    },
    {
        path: "/category/:slug",
        element: <CategoryDetail/>,
    },
];

export default CategoryRoutes;