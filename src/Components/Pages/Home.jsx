import React ,{ useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios'
import Spinne from '../Layout/Spinne'
import moment from 'moment'
import {DatePicker, Modal , Form , Input, Select, message, Table } from 'antd'
import { UnorderedListOutlined , AreaChartOutlined} from '@ant-design/icons' 
import Analytics from '../Layout/Analytics'
const { RangePicker } = DatePicker;

function Home() {
  const [ showModal , setShowModal ] = useState(false);
  const [ loading , setLoading ] = useState(false);
  const [ allTransaction , setAllTransaction  ] = useState([]);
  const [ frequency , setFrequency ] = useState("7")
  const [ selectedDate , setSelectedDate ] = useState([])
  const [ type , setType] = useState('all')
  const [ viewData , setViewData ] = useState('table')
  const columns = [
    {
      title:"Date",
      dataIndex:'date',
      render : (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title:"Amount",
      dataIndex:'amount',
    },
    {
      title:"Type",
      dataIndex:'type',

    },
    {
      title:"Category",
      dataIndex:'category',
      
    },
    {
      title:"Referrence",
      dataIndex:'referrence',
     
    },
    {
      title:"Action",
    },
  ]
  


  //===========Getting the data Transactions================ 
  
  //UseEffect hook for Displaying the Transactions 
  
  useEffect(() => {
    const  getAlltransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        setLoading(true)
        const res = await axios.post('/transactions/get-transaction', {
          userId : user._id,
          frequency ,
          selectedDate,
          type,
        });
        setLoading(false)
        setAllTransaction(res.data)
        console.log(res.data);
        
         } 
      catch (error) 
      {
        console.log(error)
        message.error("Fetching Issue !!")
      }
    };
    getAlltransactions();
  }, [frequency , selectedDate, type ])
  //Showinhg data in table
  
  const handleSubmit = async(values)=>{
    try{
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      await axios.post('/transactions/add-transaction', {...values,userId:user._id})
      setLoading(false)
      message.success("Transaction added successfully !!!")
      setShowModal(false)
      console.log(user);
    }
    catch(error)
    {
      setLoading(false)
      message.error("Failed to add transactions !!")
    }
      
  }
  return (
    <Layout>
    {loading && <Spinne />}

        <div className='filter'>
          <div className='filters'>
            <h5>Filter Frequency</h5>
            <Select value = {frequency} onChange={(values)=> setFrequency(values)} >
              <Select.Option value="7">Last 1  Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Customized</Select.Option>
            </Select>
            { frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values)=> setSelectedDate(values)} ></RangePicker>}
          </div>


          <div className='filters'>
            <h5>Select Type </h5>
            <Select value = { type } onChange={(values)=> setType(values)} >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">INCOME</Select.Option>
              <Select.Option value="expense">EXPENSE</Select.Option>
            </Select>
            { frequency == 'custom' && <RangePicker value={selectedDate} onChange={(values)=> setSelectedDate(values)} ></RangePicker>}
          </div>

          <div className="switch-Icon">
            <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={()=> setViewData('table')}></UnorderedListOutlined>
            <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={()=> setViewData('analytics')}></AreaChartOutlined>
          </div>
          
          
          <div>
            <button className='btn btn-primary' onClick={()=> setShowModal(true)}>Add New </button>
          </div>
        </div>
        <div className='content'>
        {viewData === 'table' ? ( <Table columns={columns} dataSource={allTransaction}></Table>) : ( <Analytics allTransaction={allTransaction}></Analytics>)}
        </div>
        <Modal title="Add transaction" open={showModal}  onCancel={()=> setShowModal(false)} footer={false}>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Amount" name="amount">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="expense">Tip</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="fee">Fees</Select.Option>
                <Select.Option value="tax">Tax</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Referrence" name="referrence">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <div className='d-flex justify-content-end'>
              <button type='submit' className='btn btn-success'>
              SAVE</button>
            </div>
          </Form>
        </Modal>
    </Layout>
  )
}

export default Home
