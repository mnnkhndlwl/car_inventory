import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import { publicRequest } from '../../config';
// import all_orders from '../../constants/orders';
// import {calculateRange, sliceData} from '../../utils/table-pagination';

import '../styles.css';
import DoneIcon from '../../assets/icons/done.svg';
import CancelIcon from '../../assets/icons/cancel.svg';
import RefundedIcon from '../../assets/icons/refunded.svg';

function Orders () {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState([]);
    var carRes;

    // const [page, setPage] = useState(1);
    // const [pagination, setPagination] = useState([]);

    // useEffect(() => {
    //     setPagination(calculateRange(all_orders, 5));
    //     setOrders(sliceData(all_orders, page, 5));
    // }, []);

    // to fetch car
  useEffect(() => {
    const fetchData = async () => {
      try {
        carRes = await publicRequest.get(`/api/car/get/allOrders`);
        console.log(carRes);
        setOrders(carRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


    // Search
    const __handleSearch = (event) => {
        var search_results;
        setSearch(event.target.value);
        if (event.target.value !== '') {
            search_results = orders.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.brand.toLowerCase().includes(search.toLowerCase()) 
            );
            setOrders(search_results);
        }
        else {
            console.log("not found");
        }
    };

    // // Change Page 
    // const __handleChangePage = (new_page) => {
    //     setPage(new_page);
    //     setOrders(sliceData(all_orders, new_page, 5));
    // }

    return(
        <div className='dashboard-content'>

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Orders List</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

                <table>
                    <thead>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                        <th>COSTUMER</th>
                        <th>PRODUCT</th>
                        <th>REVENUE</th>
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order._id}</span></td>
                                    <td><span>{order.title}</span></td>
                                    <td>
                                        <div>
                                            {order.status === 'Paid' ?
                                                <img
                                                    src={DoneIcon}
                                                    alt='paid-icon'
                                                    className='dashboard-content-icon' />
                                            : order.status === 'Canceled' ?
                                                <img
                                                    src={CancelIcon}
                                                    alt='canceled-icon'
                                                    className='dashboard-content-icon' />
                                            : order.status === 'Refunded' ?
                                                <img
                                                    src={RefundedIcon}
                                                    alt='refunded-icon'
                                                    className='dashboard-content-icon' />
                                            : null}
                                            <span>{order.status}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <img 
                                                src={order.carImage}
                                                className='dashboard-content-avatar' />
                                            <span>{order.title}</span>
                                        </div>
                                    </td>
                                    <td><span>{order.seats}</span></td>
                                    <td><span>${order.price}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {/* {orders.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                } */}
            </div>
        </div>
    )
}

export default Orders;