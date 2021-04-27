import { Types } from '../actions/wallet.action';

const initialState = {
  currencies: [],
  expenses: [],
  idCount: 0,
  editExpense: [],
  isExpenseEdit: false,
};

const saveCurrencies = (state = initialState, action) => ({
  ...state, currencies: action.payload,
});

const addExpense = (state = initialState, action) => {
  const newExpense = {
    id: state.idCount,
    ...action.payload,
  };
  return {
    ...state,
    expenses: [...state.expenses, newExpense],
    idCount: state.idCount + 1,
  };
};

function removeExpense(expenses, id) {
  return expenses.filter((expense) => expense.id !== id);
}

function selectExpense(expenses, id) {
  return expenses.filter((expense) => expense.id === id);
}

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case Types.SAVE_CURRENCIES:
    return saveCurrencies(state, action);
  case Types.ADD_EXPENSE:
    return addExpense(state, action);
  case Types.ADD_EXPENSE_WITH_CURRENCIES:
    return {
      ...state,
      expenses:
      [...state.expenses, { id: state.idCount, ...action.payload }],
      idCount: state.idCount + 1,
    };
  case Types.REMOVE_EXPENSE:
    return {
      ...state, expenses: [...removeExpense(state.expenses, action.payload)],
    };
  case Types.SELECT_EXPENSE:
    console.log(action.payload);
    return {
      ...state,
      editExpense: [...selectExpense(state.expenses, action.payload)],
      expenses: [...removeExpense(state.expenses, action.payload)],
      isExpenseEdit: true,
    };
  case Types.EDIT_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      editExpense: [],
      isExpenseEdit: false,
    };
  default:
    return state;
  }
};

export default wallet;
