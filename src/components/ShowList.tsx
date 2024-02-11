import React, {useEffect, useState} from 'react';
import IDataList  from '../models/IDataList';
import { getDataFromServer } from '../services/ItemService';
import ExpenseTrackerForm from './ExpenseTrackerForm';

export default function ShowList (){
    const [items,setItems] = useState<IDataList[]>([]);
    const [error,setError] = useState<Error|null>(null);
    const [sum,setSum] = useState<number|null>(0);
    const [rahulSpent,setRahulSpent] = useState<number>(0);
    const [rameshSpent,setRameshSpent] = useState<number>(0);
    const [showForm,setShowForm] = useState<boolean>(false);

    useEffect(() => {
        const fetchItem = async() => {
            try{
                const data= await getDataFromServer();
                setItems(data);
                setSum(data.reduce((sum,v) => sum + v.price,0));
                calculateShares(data);
            } catch( error:any){
                setError(error);
            }
        }
        fetchItem();
      }
        ,[showForm]);

    const calculateShares = (data:IDataList[])  => {
        var rahulSpent1 : number =0;
        var rameshSpent1:number =0;
        data.map(
            sum =>
            sum.payeeName==='Rahul' ?
              (rahulSpent1 =rahulSpent1 + sum.price ) :
              (rameshSpent1 =rameshSpent1 + sum.price )
        );
        setRahulSpent(rahulSpent1);
        setRameshSpent(rameshSpent1);
    }  
    const getTableHeaders = () => {
        return (
            <>
            <div className="use-inline date header-color">Date</div>
            <div className="use-inline header-color">Product Purchased</div>
            <div className="use-inline price header-color">Price</div>
            <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
            </>
        )
    }
  //add key to avoid error - eache child should have key for a set/map element
    const renderExpense = (expense:IDataList) => {
        return (<div key={expense.id}>
            <div className="use-inline date">{expense.setDate}</div>
            <div className="use-inline">{expense.product}</div>
        <div className="use-inline price">{expense.price}</div>
        <div className={`use-inline ${expense.payeeName}`}>{expense.payeeName}</div>
        </div>)
    }
    const renderSummary = () => {
        return (
            <>
            <div className="use-inline">Total</div>
            <div className="use-inline total">{sum}</div><br/>
            <div className="use-inline">Rahul</div>
            <div className="use-inline total Rahul">{rahulSpent}</div><br/>
            <div className="use-inline ">Ramesh paid: </div>
            <div className="use-inline total Ramesh">{rameshSpent}</div> <br />
            <div className="use-inline payable">{rahulSpent > rameshSpent ? "pay Rahul" : "pay Ramesh"} </div>
            <div className="use-inline payable price">{Math.abs(rahulSpent-rameshSpent)/2}</div>
            </>
        )
    }
    return (
        <>
            <header id="page-Header"> Expense Tracker</header>
            <button id="Add-Button" onClick={()=>setShowForm(true)}>Add</button>
            {
                showForm && (
                    <div className="form">
                        <ExpenseTrackerForm onTrue={()=>setShowForm(false)} onClose={()=>setShowForm(false)}></ExpenseTrackerForm>
                    </div>
                )
            }
            {/* showForm && ... render form as modal */}
            {getTableHeaders()}
            {items && items.map((expense)=>renderExpense(expense))}
            <hr/>
            {renderSummary()}
            {error && <> {error?.message} </>  } 
        </>
    )
   
}