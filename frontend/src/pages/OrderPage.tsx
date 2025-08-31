import {Orders} from "../components/OrdersContainer/Orders/Orders";
import {OrderFilter} from "../components/OrdersContainer/OrderFilter/OrderFilter";

const OrderPage = () => {

    return (
        <div>
            <OrderFilter/>
            <Orders/>
        </div>
    );
};

export {OrderPage};
