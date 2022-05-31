// Account Component.
let Account = () => {
   // These lines use destructuring. useState() is a function of React.
   // This line defines the state of the account.
   let [accountState, setAccountState] = React.useState(0);
   // This line defines the state of the transactions.
   let [transactionState, setTransactionState] = React.useState(0);
   // This line defines the type of transaction. There are two options: deposit (true) or withdrawal (false).
   let [isDeposit, setIsDeposit] = React.useState(true);
 
   // Add Bootstrap styling to buttons.
   // Styling with Bootstrap changes the behavior of the Buttons (different from buttons). Clicking the Buttons does not fire an onSubmit event. Clicking the buttons does fire an onSubmit event.
   let {Button} = ReactBootstrap;

   // Function that handles changes to the input data.
   let handleChange = (e) => {
      console.log(`Current Value: ${e.target.value}`);
      setTransactionState(Number(e.target.value));
   };

   // Function that handles submission of the input clicks.
   let handleSubmit = (e) => {
      console.log(`Transaction: ${transactionState}`);
      let newTotal;
      if (isDeposit) {
         newTotal = accountState + transactionState;
         setAccountState(newTotal);
         console.log(`Deposit: ${transactionState}`);
      }
      if (!isDeposit) {
         if(accountState < transactionState) {
            newTotal = accountState;
            console.log('Insufficient Funds');
            alert('Insufficient Funds');
         }
         else {
            newTotal = accountState - transactionState;
            setAccountState(newTotal);
            console.log(`Withdraw: ${transactionState}`);
         }
      }
      console.log(newTotal);
      e.preventDefault();
   };

   return (
      <form onSubmit={handleSubmit}>
         <h1>ATM Machine</h1>
         <h2>Account Balance: ${accountState}</h2>
         <br/>
         <h3>Select Transaction Type:</h3>
         <Button onClick={() => setIsDeposit(true)}>Deposit</Button>
         <span> </span>
         <Button onClick={() => setIsDeposit(false)}>Withdraw</Button>
         <br/>
         <br/>
         <ATMDeposit onChange={handleChange} isDeposit={isDeposit}></ATMDeposit>
      </form>
   );
};

// ATMDeposit Component.
let ATMDeposit = ({onChange, isDeposit}) => {
   let selection = ['Deposit', 'Withdraw']
   return (
      // Add Bootstrap styling to labels.
      <label className="label huge">
         <h3>{selection[Number(!isDeposit)]}:</h3>
         <input type="number" onChange={onChange} placeholder="Enter $ Amount"></input>
         <span> </span>
         <input type="submit" value="Submit"></input>
      </label>
   );
};

// Previous Version:
// ReactDOM.render(<Account/>, document.getElementById('root'));
// Current Version:
let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Account/>);
