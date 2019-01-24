import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import ProductForm from './ProductForm'
import productMessages from '../productMessages.js'


class ProductEdit extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      updated: false,
      product: {
        name: '',
        brand: '',
        quantity: '',
        cost: '',
        sale: ''
      },
      token: this.props.user.token
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id

    fetch(`${apiUrl}/products/${id}`)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ product: data.product }))
      .catch(() => this.setState({ notFound: true }))
  }

  handleChange = event => {
    const editedProduct = {
      ...this.state.product, [event.target.name]:event.target.value
    }
    this.setState({ product: editedProduct })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('submitted form')

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${this.props.user.token}`
      },
      body: JSON.stringify({
        product: this.state.product
      })
    }

    const { flash, history, setUser } = this.props
    const id = this.props.match.params.id

    fetch(`${apiUrl}/products/${id}`, options)
      .then(res => res.ok ? res : new Error())
      .then(data => this.setState({ updated: true }))
      .then(() => flash(productMessages.editProductSuccess, 'flash-success'))
      .catch(() => flash(productMessages.editProductFailure, 'flash-error'))
  }

  render () {
    const id = this.props.match.params.id

    if (this.state.updated) {
      return<Redirect to={`/products/${id}`} />
    }


    const { name, brand, quantity, cost, sale } = this.state.product
    return (
      <ProductForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        product={this.state.product}
      />
    )
  }

}

export default withRouter(ProductEdit)
