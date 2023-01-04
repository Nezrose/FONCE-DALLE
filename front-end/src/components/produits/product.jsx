
import { React, useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbss from '../layout/breadcrum';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';
import Header from '../header/Header'
import axios from 'axios'
import authAPI from '../../services/authAPI'


const Product = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [postState, setPostState] = useState(null)
  const id = useParams().id;
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(true)
  
  const [order,setOrders]=useState({
    "data": {
        stripeid: "ZZZZ",
        products:{
          postState
        }
      }
  }) 

  const handleCard = async (event) => {
    event.preventDefault();

    try { 
      

      await authAPI.order(order)
      
      console.log(order)


    }catch(error) {
      console.log(error);
    }

  }




  useEffect(() => {

    fetch(`http://localhost:1337/api/products/${id}?populate=*`,
      {
        method: "GET",
        headers: {
          'Accept': 'Application/json'
        }
      })
      .then(res => res.json())
      .then(reponse => {
        setPostState(reponse)
        setIsLoading(false)
        setOrders({
          "data": {
            stripeid: "ZZZZ",
            products:{
              reponse
            }
          }
        })
      })
  }, [id]);



  return (
    <section>
        <div className="container">
        <div className="col-12">

            <Header/>


      {isLoading ? 'loading..' : <div><Breadcrumbss/>
      <Box
      sx={{
        color: 'action.active',
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          marginTop: 20,
        },
        
        '& .MuiBadge-root': {
          marginRight: 4,
        },
      }}
    >
      <div>

        <Badge color="secondary" badgeContent={count}>
          <MailIcon />
        </Badge>
        <ButtonGroup>
          <Button
            aria-label="reduce"
            onClick={() => {
              
              setCount(Math.max(count - 1, 0))
              setTotal(Math.max(total - postState.data.attributes.prix,0));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
              setTotal(Math.max(total + postState.data.attributes.prix));

            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
    </Box>

      <h1>Prix :{postState.data.attributes.prix}</h1>
      <h3>Total : {total}</h3>
      <Button
        aria-label="increase"
        onClick={handleCard}
      > Ajouter au panier
      </Button>
      </div> 
      }


      </div>
      <script type="text/javascript" src="http://localhost:1337/plugins/strapi-stripe/static/stripe.js" > </script>
      <button class="css style" type="button" className="SS_ProductCheckout" data-id="" data-url="http://localhost:1337"> Acheter maintenant </button>

    </div>
    </section>
  );
}
export default Product;

