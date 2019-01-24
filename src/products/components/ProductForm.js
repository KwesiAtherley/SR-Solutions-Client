import React from 'react'
import { Redirect} from 'react-router-dom'
import { withRouter } from 'react-router'

const ProductForm = ({ handleChange, handleSubmit, product, id, name, brand, quantity, cost, sale }) => (
  <form onSubmit={handleSubmit}>
    <div className='form-group'>
      <label>Name</label>
      <input type="text"
        className="form-control"
        id="exampleInputName1"
        name='name'
        placeholder="Name"
        value={name}
        onChange={handleChange}
      />
    </div>
    <div className='form-group'>
      <label>Manufactorer</label>
      <input type="text"
        className="form-control"
        id="exampleInputBrand1"
        name="brand"
        placeholder="Brand"
        value={brand}
        onChange={handleChange}
      />
    </div>
    <div className='form-group'>
      <label>Quantity</label>
      <input type="number"
        className="form-control"
        id="exampleInputQuantity1"
        name="quantity"
        placeholder="# of Cases"
        value={quantity}
        onChange={handleChange}
      />
    </div>
    <div className='form-group'>
      <label>Cost</label>
      <input type="number"
        className="form-control"
        id="exampleInputCost1"
        name="cost"
        placeholder="Wholesale Price"
        value={cost}
        onChange={handleChange}
      />
    </div>
    <div className='form-group'>
      <label>Sale</label>
      <input type="number"
        className="form-control"
        id="exampleInputSale1"
        name="sale"
        placeholder="Retail Price"
        value={sale}
        onChange={handleChange}
      />
    </div>
    <input type="submit" value="Submit" />
  </form>
)

export default withRouter(ProductForm)
