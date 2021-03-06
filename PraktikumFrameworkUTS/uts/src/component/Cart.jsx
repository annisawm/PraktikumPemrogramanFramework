import React from "react";
import formatRupiah from "./formatRupiah";

const Cart = (props)=>{
    return(
        <tr>
            <td>{props.id}</td>
            <td>{props.idProduk}</td>
            <td>{props.nama}</td>
            <td>{formatRupiah(props.harga)}</td>
            <td>{props.qty}</td>
            <td>{formatRupiah(props.subTotal)}</td>
        </tr>
    )
}

export default Cart;