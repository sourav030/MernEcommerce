import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;

   const backendUrl=import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const navigate = useNavigate();
    const [token,setToken]=useState('')

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size')
            return;
        }
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};

            cartData[itemId][size] = 1
        }
        setCartItems(cartData);

        if(token){
            try{

              const response=  await axios.post('http://localhost:4000/api/cart/add',{itemId,size},{headers:{token}})
              

            }catch(err){
                console.log(err);
                toast.error(err.message)
            }
        }
        else{
            console.log('nhi hai toke')
            console.log(token)
        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if(token){

            try{

                await axios.post('http://localhost:4000/api/cart/update',{itemId,size,quantity}, {headers:{token}})
            }catch(err){
                console.log(err);
                toast.error(err.message)
            }

        }
    }

//--------------------------------------------------ye user ke cart ke data ko laya ja rha hai--------------------------------------

    const getUserCart=async(token)=>{
        try{

            const response= await axios.post('http://localhost:4000/api/cart/get',{},{headers:{token}})
           
            if(response.data.success){
                setCartItems(response.data.cartData);
            }

        }catch(err){
            console.log(err);
                toast.error(err.message)
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }

                } catch (err) {

                }
            }
        }
        return totalAmount;
    }
//----------------------------------------------------ye collection of list ke liye hai------------------------------------------

    const getProductData = async () => {
        try {
            const response=await axios.get('http://localhost:4000/api/product/list');
            console.log(response.data)
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message);
            }

        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getProductData();
    }, [])



    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    },[])



    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl, setCartItems,
        setToken,token
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;