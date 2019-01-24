import React, { Component } from 'react'
import { withRouter } from 'react-router'
import apiUrl from '../../apiConfig'
import { Redirect} from 'react-router-dom'
import { Link } from 'react-router-dom'
import productMessages from '../productMessages.js'



class Product extends Component {
  constructor (props) {
    super(props)
    console.log(props)

    this.state = {
      product: null,
      notFound: false,
      deleted: false
    }
  }



  componentDidMount () {
    const id = this.props.match.params.id

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${this.props.user.token}`
      }
    }

    fetch(`${apiUrl}/products/${id}`, options)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ product: data.product }) )
      .catch(() => this.setState({ notFound: true }))
  }

   destroy = () => {
     const options = {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Token token=${this.props.user.token}`
       },
     }
     const { flash, history, setUser } = this.props
     const id = this.props.match.params.id

     fetch(`${apiUrl}/products/${id}`, options)
       .then(res => res.ok ? res : new Error())
       .then(() => this.setState({ deleted: true }))
       .then(() => flash(productMessages.deleteProductSuccess, 'flash-success'))
       .catch(() => flash(productMessages.deleteProductFailure, 'flash-error'))
   }

   render () {
     // if (!this.state.product) {
     //   return <p>loading...</p>
     // }
     console.log(this.state.product)

     const { product, notFound, deleted } = this.state

     if (notFound) {
       return <Redirect to='/' />
     } else   if (!product) {
       return <p>loading...</p>
     } else if (deleted) {
       return (
         <Redirect to={{
           pathname: '/products',
           state: {message: 'Product succesfully deleted'}
         }} />
       )
     }

     const { name, brand, quantity, cost, sale, _id } = this.state.product
     console.log(_id)
     return (
       <React.Fragment>
         <h5>Product</h5>
         <p>Name: {name}</p>
         <p>Brand: {brand}</p>
         <p>Quantity: {quantity}</p>
         <p>Wholesale Prce: {cost}</p>
         <p>Retail Price: {sale}</p>
         <button>
           <Link to={`/products/${_id}/edit`}>Edit</Link>
         </button>
         <button onClick={this.destroy}>Delete</button>
       </React.Fragment>
     )
   }
}

export default withRouter(Product)
