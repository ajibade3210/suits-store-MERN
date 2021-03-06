import React, { Component } from 'react';
import formatCurrency from '../util';
import "./cart.css"
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCheckOut: false,
            name: "",
            email: "",
            address: "",
        }
    }

    handleInput = (e) => {
        e.preventDefault()
        this.setState({ [e.target.name] : e.target.value});
    }

    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name : this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        }
        this.props.createOrder(order);
    };

    render() {
        const {cartItems} = this.props;
        return (
            <>
            <div>
                {cartItems.length === 0
                ? <div className="cart cart-headers">Cart is empty</div>
                : <div className="cart cart-header">
                    You have {cartItems.length} in the cart{' '}
                </div>
                }
            </div>
            <div className="">
                <div className="cart">
                {/* <Fade left cascade> */}
                    <ul className="cart-items">
                        {cartItems.map(item => (
                            <li key={cartItems._id}>
                            <div>
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div>
                                <div>{item.title}</div>
                                <div className="right">
                                    {formatCurrency(item.price)} x {item.count}{" "}
                                <button
                                className="button"
                                 onClick={()=>this.props.removeFromCart(item)}>
                                    Remove
                                </button>
                                </div>
                            </div>
                            </li>
                        ))}
                    </ul>
                {/* </Fade> */}
                </div>
            </div>
            <div>
            {cartItems.length !==0 && (
                <div className="">
            <div className="cart">
                <div className="total">
                    <div>
                        Total: {" "}
                        {formatCurrency(
                            cartItems.reduce((a,c) => a + c.price * c.count, 0)
                        )}
                    </div>
                    <button onClick={()=> {
                        this.setState({showCheckOut: true});
                    }} className="button primary">Proceed</button>
                </div>
            </div>
            {this.state.showCheckOut && (
                <Fade right cascade>
                <div className="cart">
                    <form onSubmit={this.createOrder}>
                        <ul className="form-container">
                            <li>
                                <label htmlFor="email">Email</label>
                                <input name="email"  type="email" required onChange={this.handleInput} />
                            </li>
                            <li>
                                <label htmlFor="name">Name</label>
                                <input name="name" type="text" required onChange={this.handleInput} />
                            </li>
                            <li>
                                <label htmlFor="address">Address</label>
                                <input name="address" type="text" required onChange={this.handleInput} />
                            </li>
                            <li>
                                <button className="button primary" type="submit" onSubmit={this.createOrder}>Checkout</button>
                                 </li>
                        </ul>
                    </form>

                </div>
                </Fade>
            )}
                </div>

            )}
            </div>
            </>

        )
    }
}
