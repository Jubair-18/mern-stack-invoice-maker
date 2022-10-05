import * as api from '../api/index'

import { ADD_NEW_STOCKS, 
        UPDATE_STOCKS,
        DELETE_STOCKS,
        GET_STOCK,
        FETCH_STOCK_BY_USER,
        START_LOADING, 
        END_LOADING } from './constants'

// export const getInvoices = () => async (dispatch)=> {
//     try {
//         const { data } = await api.fetchInvoices()
//         dispatch({ type: FETCH_ALL, payload: data })
//     } catch (error) {
//         console.log(error)
//     }
// }

export const getStocksByUser =(searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING })
    const  { data: { data } } = await api.fetchStocksByUser(searchQuery)
      dispatch({ type: FETCH_STOCK_BY_USER, payload: data });
      dispatch({ type: END_LOADING })
    } catch (error) {
      console.log(error.response)
      
    }
  }


export const getStock = (id) => async (dispatch)=> {

    const user = JSON.parse(localStorage.getItem('profile'))

    try {
        const { data } = await api.fetchStock(id)
        const businessDetails = await api.fetchProfilesByUser({search: user?.result?._id || user?.result?.googleId})
        const StockData = {...data, businessDetails}
        // console.log(invoiceData)
        dispatch({ type: GET_STOCK, payload: StockData  })
    } catch (error) {
        console.log(error.response)
    }
}

export const createStock =(invoice, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.addStock(invoice)
        dispatch({ type: ADD_NEW_STOCKS, payload: data })
        history.push(`/stock/${data._id}`)
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const updateStock =(id, stock) => async (dispatch) => {

    try {
        const { data } = await api.updateStock(id, stock)
        dispatch({ type: UPDATE_STOCKS, payload: data })
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteStock =(id, openSnackbar) => async (dispatch) => {
    try {
        await api.deleteStock(id)

        dispatch({type: DELETE_STOCKS, payload: id})
        openSnackbar("Stock deleted successfully")
    } catch (error) {
        console.log(error.response)
    }
}