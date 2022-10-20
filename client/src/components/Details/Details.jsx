import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGame } from '../../redux/actions/games';
import { UserContext } from '../../Context/UserContext';
import styles from './Details.module.css';
import { useState } from 'react';
import {clearDetail} from "../../redux/actions/games/index"



export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(state => state.games.game);
  const { cart, setCart, order, setOrder, total, setTotal} = useContext(UserContext)
  const [msg, setmsg] = useState('')
  
  
console.log(cart)
  useEffect(() => {
    dispatch(getGame(id));

//* limpiamos el estado cuando renderiza clear detail

    return(()=>{
      dispatch(clearDetail())   
    })
  }, [dispatch, id]);
  //console.log(details)

  const onClick = () => {
    let arrcart = [...cart]
    if(cart.length<1){
      arrcart.push(details)
      setTotal(total + details.price)
      setOrder(arrcart)
      setCart(arrcart)
      setmsg('Game added to cart')
    }else{
      let idarr = []
    for(let i = 0; i<cart.length; i++)
{
  idarr.push(cart[i].id)
}
  const incluye = idarr.includes(details.id)
  if(!incluye){
    arrcart.push(details)
    setTotal(total + details.price)
    setCart(arrcart)
    setOrder(arrcart)
    setmsg('Game added to cart')
  }else{
    setmsg('Game is already in the cart')
  }
  }
  }

 

  return details.id ? (
    <section className={styles.container}>
      <div className={styles.leftSide}>
        <h3>{details.name}</h3>
        <div className={styles.imageContainer}>
          <img src={details.image} alt={details.name} />
        </div>
      </div>
      <div className={styles.middle}>
        <div>
          <h2>Release Date: {details.releaseDate}</h2>
          <div className={styles.btns}>
            <h2>Price: ${details.price}</h2>
            <button  className ={styles.addCart} onClick={onClick}>Add to Cart</button>
            { msg ? <p className={styles.confirmation}>{msg}</p> : <div></div>}
            {/* 
            <button>Write review</button> */}
          </div>
          <div className={styles.ratings}>
            <p>{details.audiences[0].name}</p>
            <p>Rating {details.rating}</p>
          </div>
        </div>
        <p className={styles.description}>{details.description}</p>
      </div>
    </section>
  ) : <h1>Loading...</h1>;
}
