import React from 'react';
import PostProduits from '../components/produits/products'
import Header from '../components/header/Header'
import Breadcrumbss from '../components/layout/breadcrum';
const Pageproduit = (post) => {
    return (
        <section>
            <div className="container">
                <div className="col-12">
                <Header/>
                <Breadcrumbss/>
                <PostProduits  />
                </div>
            </div>
        </section>
    );
}

export default Pageproduit;