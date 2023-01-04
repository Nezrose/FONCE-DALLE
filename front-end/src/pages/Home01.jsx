import React from 'react';
import { useRef } from 'react'
import Header from '../components/header/Header'
import Breadcrumbss from '../components/layout/breadcrum'
import Chrome from '../3d/Chrome'
import Banderole from '../components/autre/banderole';
const Home01 = () => {
  
    return (
        <div>
            <Banderole/>
            <Header/>
            <Breadcrumbss/>
            <Chrome/>
        </div>
    )
}

export default Home01