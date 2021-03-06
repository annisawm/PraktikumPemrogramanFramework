import React, { Component } from "react";
import './BlogPost.css';
import Post from "../components/BlogPost/Post";
// import API from "../../service";
import firebase from 'firebase/compat/app';
import firebaseConfig from "../firebase/config";
import 'firebase/compat/database';

class BlogPost extends Component {
    constructor(props) {
        super(props)
        firebase.initializeApp(firebaseConfig); // inisialisasi konfigurasi firebase
        
        this.state = {          // komponen state dari react statefull component
            listArtikel: []     // variable array yang digunakan untuk menyimpan data API
        }
    }

    ambilDataDariServerAPI = () => {    // fungsi untuk mengambil data dari Realtine Database Firebase
        let ref = firebase.database().ref('/');
        ref.on('value', snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
    }

    simpanDataKeServerAPI = () => {  // fungsi untuk mengirim/insert data ke API Realtine Database Firebase
        firebase.database()
            .ref("/")
            .set(this.state);
    }

    componentDidMount() {   // komponen untuk mengecek ketika component telah di mount-ing, maka panggil API
        this.ambilDataDariServerAPI() // ambil data dari server API lokal
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.simpanDataKeServerAPI();
        }
    }

    handleHapusArtikel = (idArtikel) => { // fungsi yang meng-handle button action hapus data
        const { listArtikel } = this.state; 
        const newState = listArtikel.filter(data => { 
            return data.uid !== idArtikel; 
        });
        this.setState({ listArtikel: newState }); 
    }

    handleTombolSimpan = () => { // fungsi untuk meng-handle saat tombol submit di klik
        let title = this.refs.judulArtikel.value; // mengacu pada input field(text, textarea,dll)
        let body = this.refs.isiArtikel.value; 
        let uid = this.refs.uid.value; 

        if (uid && title && body) { // fungsi untuk menghandle saat tombol submit diklik
            const { listArtikel } = this.state; // mengacu pada input field(text, textarea,dll)
            const indeksArtikel = listArtikel.findIndex(data => { 
                return data.uid === uid; 
            });
            listArtikel[indeksArtikel].title = title; 
            listArtikel[indeksArtikel].body = body; 
            this.setState({ listArtikel }); 
        } else if (title && body) { // jika data belum ada di server
            const uid = new Date().getTime().toString(); 
            const { listArtikel } = this.state; 
            listArtikel.push({ 
                uid, 
                title, 
                body 
            });
            this.setState({ listArtikel }); 
        }
        this.refs.judulArtikel.value = ''; 
        this.refs.isiArtikel.value = ''; 
        this.refs.uid.value = ''; 
    }

    render() {
        return (
            <div className="post-artikel">
                <div className="form pb-2 border-bottom">
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Judul</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="title" name="title" ref="judulArtikel" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="body" className="col-sm-2 col-form-label">Isi</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="body" name="body" rows="3" ref="isiArtikel"></textarea>
                        </div>
                    </div>
                    <input type="hidden" name="uid" ref="uid" />
                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div>
                <h2> Daftar Artikel </h2>
                {
                    this.state.listArtikel.map(artikel => { 
                        return <Post key={artikel.uid} judul={artikel.title} isi={artikel.body}
                                    idArtikel={artikel.uid} hapusArtikel={this.handleHapusArtikel} />
                    })
                }
            </div>
        );
    }

}
export default BlogPost;