import React, {Component} from "react";
import './BlogPost.css';
import Post from "../component/Post";

class BlogPost extends Component{
    state = {           // komponen state dari React untuk Statefull component
        listArtikel:[],  // variabel array yang digunakan untuk menyimpan data API
        insertArtikel: {
            userId: 1,
            id: 1,
            title: " ",
            body: ""
        }
    }

    ambilDataDariServerAPI = () => {
        fetch(`http://localhost:3000/posts?_sort=id&_order=desc`) // alamat URL API yang ingin kita ambil datanya    
            .then(response => response.json())      // ubah response data dari URL API menjadi sebuah data json
            .then(jsonHasilAmbilDariAPI => {        // data json hasil ambil dari API kita masukkan ke dalam list Artikel pada state
                    this.setState({
                        listArtikel: jsonHasilAmbilDariAPI
                    })
                })
        }

        componentDidMount() {
            this.ambilDataDariServerAPI() //ambil data dari server API lokal
        }

        handleHapusArtikel = (data) => {    // fungsi untuk menghapus
            fetch(`http://localhost:3000/posts/${data}`, {method: 'DELETE'}) // alamat URL API yang akan dihapusD
            .then(res => {      // ketika proses hapus berhasil maka ambil data dari server API Lokal
                this.ambilDataDariServerAPI()
            })
        }

        handleTambahArtikel = (event) => {          // Fungsi untuk meng-handle form tambah data artikel 
            let formInsertArtikel = {...this.state.insertArtikel};      // Clonning data state insertArtikel ke dalam variabel formInsertArtikel
            let timestamp = new Date().getTime();                       // Digunakan untuk menyimpan waktu (sebagai ID artikel)
            formInsertArtikel['id'] = timestamp;
            formInsertArtikel[event.target.name] = event.target.value;  // Menyimpan data onchane ke formInsertArtikel sesuai dengan target yang diisi
            this.setState({
                insertArtikel: formInsertArtikel
            });
        }
    
        handleTombolSimpan = () => {                                // Fungsi untuk meng-handle tombol simpan
            fetch(`http://localhost:3000/posts`, {
                method: 'post',                                     // Method POST untuk input/insert data
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.insertArtikel)      // Kirimkan ke body request untuk data artikel yang akan ditambahkan (insert)
            })
                .then( (response) => {
                    this.ambilDataDariServerAPI();                    // Reload / refresh data
                });
        }
    

    render() {
        return(
            <div className="post-artikel">
            <div className="form pb-2 border-bottom">
                <div className="form-group row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Judul</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="title" name="title" onChange={this.handleTambahArtikel}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="body" className="col-sm-2 col-form-label">Isi</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" id="body" name="body" rows="3" onChange={this.handleTambahArtikel}></textarea>
                    </div>
                </div>
            
                <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
            </div>

            <h2>Daftar Artikel</h2>
            {
                this.state.listArtikel.map(artikel => {
                    return <Post key={artikel.id} judul={artikel.title} isi={artikel.body} 
                    idArtikel={artikel.id} hapusArtikel={this.handleHapusArtikel}/>
                })
            }
        </div>
        )
    }

}

export default BlogPost;