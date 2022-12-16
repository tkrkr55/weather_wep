
import './App.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WeatherButton } from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";


//1. 앱이 실행이 되자마자 현재위치 기반의 날씨가 보인다.
//2. 현재도시, 섭시온도 화시온도, 현재날씨 상태
//3. 밑에는 버튼이 5개가 있다. (1개는 현재위치, 4개는 다른도시)
//4. 도시 버튼을 누를때마다 도시별 날씨가 보인다.
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
//6. 데이터를 들고 오는 동안 로딩스피너가 돈다.
function App() {

  const[weather,setWeater]=useState(null)
  const cities =['brazil','Argentina','Croatia','seoul']
  const [city,setcity]=useState('')
  const[loading,setLoding]=useState(false)
 console.log(city)

    const getCurrentLocation = () =>{
      navigator.geolocation.getCurrentPosition((position)=>{
          let lat = position.coords.latitude
          let lon = position.coords.longitude
          getWeatherByCurrentLocation(lat,lon)
         
      });
    }
    const getWeatherByCurrentLocation = async(lat,lon)=>{
      let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a096297cfdb54636dbac32dc1212cd51&units=metric`
      setLoding(true)
      let response =  await fetch(url)
      let data = await response.json();
      setWeater(data)
      setLoding(false)
    }

    const getWeatherByCity = async()=>{
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a096297cfdb54636dbac32dc1212cd51&units=metric`
      setLoding(true)
      let response =  await fetch(url)
      let data = await response.json();
      setWeater(data)
      setLoding(false)
    }
    const handleCityChange = (city) => {
      if (city === "current") {
        setcity(null);
      } else {
        setcity(city);
      }
    };

 

    useEffect(()=>{
      if(city==""){
        return getCurrentLocation()
      }else{
        getWeatherByCity()
      }
    },[city])

   

  return (
    <div>
      {loading? (
      <div className='weather'>
      <ClipLoader
        color="#f88c6b"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>) : (
        <div className='weather'>
      <WeatherBox weather={weather}/>
      <WeatherButton  cities={cities} setCity={setcity} />
    </div>)}
    
    </div>
  );
}

export default App;
