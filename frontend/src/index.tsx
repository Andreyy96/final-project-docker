import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {LoaderContext} from "./hoc/LoaderContext";
import {routes} from "./routers/router";
import {store} from "./store/store";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <LoaderContext>
        <Provider store={store}>
            <RouterProvider router={routes}/>
        </Provider>
    </LoaderContext>
);
