export const ADD_CART = 'ADD_CART';

export const addToCart = (menu = {}, cart = []) => {
    let exists = false;

    if (cart.length > 0) {
        for (const c of cart) {
            if (c.id === menu.id) {
                c.qty++
                exists = true;
            }
        }
    }
if (!exists) {
    cart.push(menu);
}
    const total = cart.reduce((total, value) => total + value.qty, 0);
    return{
        type: ADD_CART,
        payload:{
            cart:cart,
            total:total
        }
    }
}