import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import { Link, withRouter } from 'react-router-dom'

class Products extends Component {
  constructor (props) {
    super(props)


    this.state = {
      products: null // if not working use empty array instead of null
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

    fetch(`${apiUrl}/products`, options)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ products: data.products }) )
      .catch(console.error)
  }

  render () {
    if (!this.state.products) {
      return <p>loading...</p>
    }
    const products = this.state.products.map(product => {
      return (
        <li key={product._id}>
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </li>
      )
    })

    return (
      <React.Fragment>
        <button type="button" className="btn btn-link"><Link to={'/products-create'}>Create Product</Link></button>
        <h4>Products:</h4>
        <ol>
          {products}
        </ol>
      </React.Fragment>
    )
  }
}




export default withRouter(Products)
