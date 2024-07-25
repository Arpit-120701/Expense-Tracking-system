import React from 'react'
import { Progress } from 'antd'
import { TransactionOutlined } from '@ant-design/icons'

function Analytics({allTransaction}) {

    const categories = [ 'salary' , 'expense', ' project', 'food', 'movie', 'bills', 'fee','tax']
    const totalTransaction = allTransaction.length
    const totalIncomeTransaction = allTransaction.filter(transaction => transaction.type ==="income")
    const totalExpenseTransaction =  allTransaction.filter(transaction => transaction.type ==="expense")
    const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction)* 100
    const totalExpensePercent = (totalExpenseTransaction.length/ totalTransaction)* 100

    const totalTurnOver= allTransaction.reduce((acc,transaction)=> acc+ transaction.amount, 0)

    const totalIncomeTurnover = allTransaction.filter(
        (transaction) => transaction.type === "income").reduce((acc , transaction) => acc +transaction.amount , 0)

    const totalExpenseTurnover = allTransaction.filter((transaction)=> transaction.type === "expense").reduce
                   (( acc , transaction)=> acc + transaction.amount , 0)

    const totalIncomeTurnoverPercent = ( totalIncomeTurnover / totalTurnOver ) *100;
    const totalExpenseTuroverPercent = ( totalExpenseTurnover / totalTurnOver) *100;
  return (
    <>
       <div className="row m-3 ">
        <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                    Total Transactions : { totalTransaction }
                </div>
                <div className='card-body'>
                    <h5 className='text-success'>INCOME : {totalIncomeTransaction.length}</h5>
                    <h5 className='text-danger'>EXPENSE :{totalExpenseTransaction.length}</h5>
                    <Progress type="circle" strokeColor={'green'} className='mx-2' percent={totalIncomePercent.toFixed(0)}></Progress>
                    <Progress type="circle" strokeColor={'red'} className='mx-2' percent={totalExpensePercent .toFixed(0)}></Progress>
                </div>
            </div>
            
        </div>

        <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                    Total Turnover  : { totalTurnOver }
                </div>
                <div className='card-body'>
                    <h5 className='text-success'>INCOME TURNOVER : {totalIncomeTurnover}</h5>
                    <h5 className='text-danger'>EXPENSE TURNOVER  :{totalExpenseTurnover}</h5>
                    <Progress type="circle" strokeColor={'green'} className='mx-2' percent={totalIncomeTurnoverPercent.toFixed(0)}></Progress>
                    <Progress type="circle" strokeColor={'red'} className='mx-2' percent={totalExpenseTuroverPercent .toFixed(0)}></Progress>
                </div>
                
            </div>
        </div>
       </div> 
       <div className='row mt-3'>
        <div className='col-md-5'>
            <h4>Category wise Expenditure </h4>
            {
                categories.map((category) => {
                    const amount = allTransaction.filter((transaction ) => transaction.type === 'income' && transaction.category === category ).reduce((acc, transaction)=> acc + transaction.amount , 0);
                    return(
                        <div className='card'>
                            <div className='card-body'>
                            <h5>{category}</h5>
                            <Progress percent={((amount/totalIncomeTurnover)  * 100).toFixed(0)} ></Progress>
                            </div>
                        </div>
                        
                        
                    )
                })
            }
        </div>


        <div className='col-md-5'>
            <h4>Categorywise Expense  </h4>
            {
                categories.map((category) => {
                    const amount = allTransaction.filter((transaction ) => transaction.type === 'expense' && transaction.category === category ).reduce((acc, transaction)=> acc + transaction.amount , 0);
                    return(
                        <div className='card'>
                            <div className='card-body'>
                            <h5>{category}</h5>
                            <Progress percent={((amount/totalExpenseTurnover)  * 100).toFixed(0)} ></Progress>
                            </div>
                        </div>
                        
                        
                    )
                })
            }
        </div>





       </div>
    </>
  )
}

export default Analytics
