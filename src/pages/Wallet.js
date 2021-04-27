import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Creators as walletActions } from '../actions/wallet.action';
import Header from '../components/Header';
import FormExpense from '../components/FormExpense';
import './wallet.css';
import ExpensesTable from '../components/ExpensesTable';
import EditExpense from '../components/editExpense';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { isExpenseEdit } = this.props;
    return (
      <div>
        <Header />
        {isExpenseEdit && <EditExpense />}
        {!isExpenseEdit && <FormExpense />}
        <ExpensesTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  isExpenseEdit: PropTypes.bool.isRequired,
};

function mapStateToProps({ wallet: { editExpense, isExpenseEdit } }) {
  return { editExpense, isExpenseEdit };
}

const mapDispatchToProps = (dispatch) => bindActionCreators(walletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
