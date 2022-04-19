import React from "react";
import formatRupiah from "./formatRupiah";

const Produk = (props)=>{
    return(
        <div className="row">
            <div className="col-md-3 text-center">
                <img src={props.gambar} alt="setrika" width={200} height={200} />
            </div>
            <div className="row konten">
                <div className="col-md-12">
                    <p>
                        {props.nama} <br />
                        Price : {formatRupiah(props.harga)} <br />
                    </p>
                </div>
                <div className="col-md text-left">
                    <p>
                        Stock : {props.stok} <br />
                    </p>
                    <button className="btn btn-primary" onClick={()=>{props.beli(props)}}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Produk;