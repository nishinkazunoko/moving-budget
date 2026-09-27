import { useEffect, useState } from 'react'
import styles from './WeatherDashboard.module.css'
type City = {
  name: string
  latitude: number
  longitude: number
}
type WeatherData = {
  current: {
    time: string
    temperature_2m: number
    relative_humidity_2m: number
    precipitation: number
    wind_speed_10m: number
    weather_code: number
  }
}
const cities: City[] = [
  { name: '名古屋市', latitude: 35.1815, longitude: 136.9066 },
  { name: '豊田市', latitude: 35.0833, longitude: 137.1567 },
  { name: '岡崎市', latitude: 34.9546, longitude: 137.1741 },
  { name: '一宮市', latitude: 35.3039, longitude: 136.8000 },
  { name: '豊橋市', latitude: 34.7692, longitude: 137.3915 },
]
const WeatherDashboard = () => {
  const [selectedCity, setSelectedCity] = useState(cities[0])
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      setError('')
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&timezone=Asia%2FTokyo`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('天気情報の取得に失敗しました')
        }
        const data = await response.json()
        setWeather(data)
      } catch {
        setError('天気情報を取得できませんでした')
      } finally {
        setLoading(false)
      }
    }
    fetchWeather()
  }, [selectedCity])
  return (
    <section className={styles.dashboard}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>愛知県の天気</h1>
          <p className={styles.subtitle}>
            {weather ? `現在（${weather.current.time.slice(11, 16)}）の気象情報` : '気象情報を読み込んでいます...'}
          </p>
        </header>
        <select
          className={styles.select}
          value={selectedCity.name}
          onChange={(e) => {
            const city = cities.find((city) => city.name === e.target.value)
            if (city) setSelectedCity(city)
          }}
        >
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {loading && <div className={styles.loading}>天気情報を読み込んでいます...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {weather && !loading && !error && (
          <div className={styles.weather}>
            <p className={styles.location}>{selectedCity.name}</p>
            <div className={styles.temperature}>
              <span>{weather.current.temperature_2m}</span>
              <small>℃</small>
            </div>
            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>湿度</span>
                <span className={styles.detailValue}>{weather.current.relative_humidity_2m}%</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>降水量</span>
                <span className={styles.detailValue}>{weather.current.precipitation} mm</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>風速</span>
                <span className={styles.detailValue}>{weather.current.wind_speed_10m} km/h</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
export default WeatherDashboard