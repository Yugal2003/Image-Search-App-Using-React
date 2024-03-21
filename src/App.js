import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [inputquery, setQuery] = useState('random');
  let pageNum = 1;


  let api = `https://api.unsplash.com/search/photos`;
  let accesskey = 'GBgi4fJ3qY6jRCF5wd9nuw8-BQnfVF6x0Ko0Zan5Xr0';

  async function fetchAPI() {

    let response;

    try {
      console.log(pageNum)
       response = await axios.get(api, {
        params: {
          client_id: accesskey,
          page: pageNum,
          query: inputquery,
        }
      }); 
      console.log(response)
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    let output = response.data.results;

    return output;
  }

  useEffect(() => {

    async function newData(){
      let alldata = await fetchAPI();
      setData(alldata);
    }

    newData();
   
  }, [])



  const getQuery  = (e) => {
    setQuery(e.target.value);
  }

  const searchQuery = () => {

    if(inputquery === ""){
      alert('Please enter the text in search bar');
    }
    else{
        async function newData(){
        let Data = await fetchAPI();
        setQuery(inputquery);
        setData([...Data]);
      }
      newData();
    }
  }


  const showMoreImg = () => {

    pageNum += 1;

    async function newData(){
      let allData = [...data];
      let Data = await fetchAPI();
      let adata = [...allData, ...Data];
      setData(adata);
      console.log('====================');
      console.log(data);
      console.log('====================');
    }

    newData();
    
  }

  return (
    <>
      <div className='searching'>
        <h1>Image Generation App</h1>
        <input placeholder='Search Anything' type='text' onChange={(e) => getQuery(e)}></input>
        <button onClick={searchQuery}>Search Image</button>
        <div className='images'>
          {
            !data || data.map((item) => {
              return(
                <div className='image' key={item.id}>
                  <img alt='img' src={item.urls.full}></img>
                </div>
              )
              
            })
          }
        </div>
        <button onClick={showMoreImg}>Show More</button>
      </div>
    </>
  )
}

export default App;