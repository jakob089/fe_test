import React, { Component } from "react";
import ProductList from "./../../components/ProductList/ProductList";
import ProductItem from "../../components/ProductItem/ProductItem";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "./../../actions/index";

class ProductListPage extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  onDelete = id => {
    this.props.onDeleteProduct(id);
  };

  render() {
    let { products } = this.props;

    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <form action="http://localhost:3001/api/article/import" method="post" enctype="multipart/form-data">
          <div class="form-group">
            <label for=""></label>
            <input
              type="file"
              class="form-control-file"
              name="fileToImport"
              id=""
              placeholder=""
              aria-describedby="fileHelpId"
            />
            <input type="text"  name="text" />
            <input type="submit" value="Import File" name="submit" />
            <small id="fileHelpId" class="form-text text-muted">
              Help text
            </small>
          </div>
        </form>
        <hr />
        <Link to="/product/add" className="btn btn-info mb-10">
          Thêm Sản Phẩm
        </Link>
        <ProductList>{this.showProducts(products)}</ProductList>
      </div>
    );
  }

  showProducts = products => {
    let result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <ProductItem
            key={index}
            product={product}
            index={index}
            onDelete={this.onDelete}
          />
        );
      });
    }
    return result;
  };
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchProducts: () => {
      dispatch(actions.actFetchProductsRequest());
    },
    onDeleteProduct: id => {
      dispatch(actions.actDeleteProductRequest(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListPage);
