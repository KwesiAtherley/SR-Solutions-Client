import React, { Component } from 'react'
import { withRouter } from 'react-router'
import apiUrl from '../../apiConfig'
import { Redirect} from 'react-router-dom'
import { Link } from 'react-router-dom'
import productMessages from '../productMessages.js'
import MUIDataTable from 'mui-datatables'
import Button from '@material-ui/core/Button'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'


class Product extends Component {
  constructor (props) {
    super(props)

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
     const { product, notFound, deleted } = this.state
     const columns = ['Name', 'Brand','Quantity', 'Cost Price','Retail Price', 'Profit', 'Edit','Delete']


     const options = {
       responsive: 'stacked',
       selectableRows: false,
       filter: false
     }

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

     const { name, brand, quantity, cost, sale, profit, _id } = this.state.product

     const data = [
       [
         name,
         brand,
         quantity,
         `$${cost}`,
         `$${sale}`,
         `${profit}%`,
         <Button key={_id}>
           <Link to={`/products/${_id}/edit`}>Edit</Link>
         </Button>,
         <Button key={_id} color="primary" onClick={this.destroy}>Delete</Button>
       ]
     ]

     return (
       <React.Fragment>
         <MUIDataTable
           title={'Products'}
           data={data}
           columns={columns}
           options={options}
         />
       </React.Fragment>
     )
   }
}

export default withRouter(Product)
