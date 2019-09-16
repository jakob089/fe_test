import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';

class ProductActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            cbStatus: ''
        }
    }

    componentDidMount() {        
        let { match } = this.props;
        if (match) {
            let id = match.params.id;
            this.props.onEditProduct(id)
        }
    }

    componentWillReceiveProps(NextProps) {
        if (NextProps && NextProps.itemEditing) {
            let {itemEditing} = NextProps;
            this.setState({
                id: itemEditing.id,
                txtName: itemEditing.name,
                txtPrice: itemEditing.price,
                cbStatus: itemEditing.status
            })
        }
    }

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }

    onSave = (e) => {
        let { id, txtName, txtPrice, cbStatus } = this.state;
        let { history } = this.props;
        let product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: cbStatus
        }
        e.preventDefault();
        if (id) {
            this.props.onUpdateProduct(product)
        } else {
            this.props.onAddProduct(product)
            
        }
        history.goBack()


    }

    render() {
        let { txtName, txtPrice, cbStatus } = this.state;
        return (

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                <form onSubmit={this.onSave}>

                    <div className="form-group">
                        <label>Tên sản phẩm</label>
                        <input type="text" className="form-control" name="txtName" value={txtName} onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Giá</label>
                        <input type="number" className="form-control" name="txtPrice" value={txtPrice} onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái</label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name="cbStatus" value={cbStatus} onChange={this.onChange} checked={cbStatus} />
                            Còn hàng
            </label>
                    </div>


                    <Link to="/product-list" className="btn btn-danger mr-10">Trở lại</Link>
                    <button type="submit" className="btn btn-primary">Lưu lại</button>
                </form>

            </div>
        );
    }



}



const mapStateToProps = (state) => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct: (product) => {
            dispatch(actions.actAddProductRequest(product))
        },
        onEditProduct: (id) => {
            dispatch(actions.actGetProductRequest(id))
        },
        onUpdateProduct: (product) => {
            dispatch(actions.actUpdateProductRequest(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);