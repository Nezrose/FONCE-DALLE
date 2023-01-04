import React from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom'

const Breadcrumbss = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.length > 0 ? (
         <Link  to={'/'} >
            Acceuil
         </Link>         
      ) : (
        <Typography>  </Typography>
      )}
      {pathnames.map((name , index, url) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={index}>{name}</Typography>
        ) : (
          <Link key={index}  to={to} >
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumbss;
