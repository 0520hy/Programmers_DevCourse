import styled from 'styled-components';
import Title from '../components/common/Title';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';

function Cart() {
  const { carts,deleteCartItem } =useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      // uncheck
      setCheckedItems(checkedItems.filter((item) => item !== id))
  }else{
      // check
      setCheckedItems([...checkedItems, id]);
  }
}

const handleItemDelete = (id : number) => {
  deleteCartItem(id);
}
  return (
   <>
    <Title size='large'>장바구니</Title>
    <CartStyle>
      <div className="content">
     { carts.map ((item) => (
      <CartItem 
      key={item.id} 
      cart={item} 
      checkedItems={checkedItems} 
      onCheck={handleCheckItem} 
      onDelete={handleItemDelete}/>
     ))}
      </div>
      <div className="summary"></div>
    </CartStyle>
    </>
  )
}

const CartStyle = styled.div`
    
`

export default Cart;
