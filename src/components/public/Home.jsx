import { useContext, useEffect, useState } from "react";
import EventCard from "./EventCard";
import CommonRepository from "../../repositories/CommonRepository";
import { Alert, Button, Pagination, Select, Spin } from "antd";
import { Link } from "react-router-dom";
import { RootContext } from "../../contexts/RootContext";
const Home=()=>{
    let is_api_call=false;
    const [pagination,setPagination]=useState(null);
    const [errorCmp, setErrorCmp] = useState(null);
    const [filter, setFilter] = useState({day:0,time:0,sort:0,page:1});
    const [loading, setLoading] = useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    const { searchEventText } = useContext(RootContext);
    //console.log(searchEventText);
    
    const get=async(params={})=>{
        setPagination(null);
        setLoading(true);
        const api=await CommonRepository.get('/events',params);    
        if(api.error != undefined){
            const errors=api.error.errors.map((item) => <Alert key={item} message={item} type="error" />);
            setErrorCmp(errors);
        }
        else{
            setPagination(api.data);
        }
        setLoading(false);
      }
      useEffect(()=>{
        if(searchEventText || filter.search != undefined){
          setCurrentPage(1);
          setFilter({...filter,search:searchEventText,page:1});
        }
    },[searchEventText]);
      useEffect(()=>{
        if(!is_api_call){
            is_api_call=true;
            get(filter);
        }
      },[filter]);
      
    const handleFilter=async()=>{
        setCurrentPage(1);
        get(filter);
    }
    const onChange=(name,value)=>{
        setFilter({...filter,[name]:value});
    }
    const handlePagination=(page_no)=>{ 
        const filter_pagination={...filter,page:page_no};       
        get(filter_pagination);
        setCurrentPage(page_no);
    }
    const hasEvents=pagination && pagination.total > 0 ? (
        pagination.data.map((item)=>(
            <div className="w-full sm:w-1/3 lg:w-1/3 p-1" key={item.id}>
                <Link style={{textDecoration:'none'}} to={`/event/${item.slug}`}>
                    <EventCard    
                        title={item.title} 
                        description={item.description}
                        date={item.date}
                        id={item.id}
                        capacity={item.capacity}
                        registered={item.total_attendee} 
                    />
                </Link>
            </div>
        ))
    ) : (
        <div className="flex w-full items-center justify-center">
            <h1>No events found</h1>
        </div>
    ); 
    const EventCmp=!pagination ? 
        (<div className="flex w-full items-center justify-center"><Spin size="large" /></div>) : hasEvents;
    const option_days=[
        {label:'Any day',value:0},
        {label:'Today',value:1},
        {label:'Tomorrow',value:2},
    ];
    const options_time=[
        {label:'Any time',value:0},
        {label:'Online',value:'online'},
        {label:'Offline',value:'offline'},
    ]
    const options_sortby=[
        {label:'Any',value:0},
        {label:'Date',value:1},
    ];
    //console.log(pagination && pagination.total);
    
    return(
        <div className="w-full sm:w-2/3 lg:w-2/3 mx-auto">
            <div className="w-full mt-5">
                <div className="">
                    <h1 className="text-2xl">Events</h1>
                </div>
                <div className="flex">
                    <div className="w-1/2 sm:w-1/4 lg:w-1/4">
                        <Select
                            allowClear
                            name="day"
                            key="day"
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select"
                            onChange={(value)=>onChange('day',value)}
                            defaultValue={filter.day}
                            options={option_days}
                        />
                    </div>
                    <div className="w-1/2 sm:w-1/4 lg:w-1/4">
                        <Select
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select"
                            options={options_time}
                            onChange={(value)=>onChange('time',value)}
                            defaultValue={filter.time}
                            key={"time"}
                            name={"time"}
                        />
                    </div>
                    <div className="w-1/2 sm:w-1/4 lg:w-1/4">
                        <Select
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Sort By"
                            options={options_sortby}
                            onChange={(value)=>onChange('sort',value)}
                            defaultValue={filter.sort}
                            key={"sort"}
                            name={"sort"}
                        />
                    </div>
                    <div className="w-1/2 sm:w-1/4 lg:w-1/4">
                        <Button loading={loading} onClick={handleFilter} type="primary">Submit</Button>
                    </div>
                </div>
                <div className="flex flex-wrap mt-5 h-[calc(100vh-250px)] overflow-y-scroll">
                    {EventCmp}
                </div>
                <div>
                    {
                        pagination && pagination.total > 0 && (
                            <Pagination
                                current={currentPage}
                                disabled={loading} 
                                total={pagination.total}
                                pageSize={pagination.perPage}
                                size="small"
                                onChange={(page)=>handlePagination(page)}                              
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default Home;