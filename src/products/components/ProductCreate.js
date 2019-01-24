import React, { Component } from 'react'
import { withRouter } from 'react-router'
import apiUrl from '../../apiConfig'
import { Redirect} from 'react-router-dom'
import ProductForm from './ProductForm'
import { createProduct } from './api'
import productMessages from '../productMessages.js'


class ProductCreate extends Component {
  constructor (props) {
    super(props)
    console.log(props)

    this.state = {
      id: null,
      product: {
        name: '',
        brand: '',
        quantity: '',
        cost: '',
        sale: '',
        owner: props.user._id
      },
      token: props.user.token
    }
  }

  handleChange = event => {
    const editedProduct = {
      ...this.state.product, [event.target.name]: event.target.value
    }
    this.setState({ product: editedProduct })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { flash, history, setUser } = this.props

    console.log(this.state)
    createProduct(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ created: true, id: data.product.id }))
      .then(() => flash(productMessages.createProductSuccess, 'flash-success'))
      .catch(() => flash(productMessages.createProductFailure, 'flash-error'))
  }

  render() {
    const { created } = this.state
    if (created === true) {
      return <Redirect to='/products' />
    }
    const { name, brand, quantity, cost, sale } = this.state.product
    return (
      <ProductForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(ProductCreate)
