import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import { Link, withRouter } from 'react-router-dom'
import productMessages from '../productMessages.js'
import MUIDataTable from 'mui-datatables'


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
      .catch(() => flash(productMessages.getProductFailure, 'flash-error'))
  }

  render () {
    if (!this.state.products) {
      return <p>loading...</p>
    }

    const columns = ['View','Name', 'Brand', 'Quantity', 'Cost Price','Retail Price', 'Profit']

    let data = {}

    const options = {
      responsive: 'stacked',
      selectableRows: false,
      filter: false
    }

    const products = this.state.products.map(product => {
      return (
        data = [
          <Link key={product._id} to={`/products/${product._id}`}>Click Here</Link>,
          product.name,
          product.brand,
          product.quantity,
          `$${product.cost}`,
          `$${product.sale}`,
          `${product.profit}%`
        ]
      )
    })

    return (
      <React.Fragment>
        <button type="button" className="btn btn-link"><Link to={'/products-create'}>Create Product</Link></button>
        <MUIDataTable
          title={'Products'}
          data={products}
          columns={columns}
          options={options}
        />
      </React.Fragment>
    )
  }
}




export default withRouter(Products)
