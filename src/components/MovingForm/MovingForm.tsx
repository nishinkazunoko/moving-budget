import { useState } from 'react'
import styles from './MovingForm.module.css'
const MovingForm = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [boxes, setBoxes] = useState(0)
  const [furniture, setFurniture] = useState(0)
  const [appliances, setAppliances] = useState(0)
  const handleSubmit = async () => {
    const response = await fetch('/api/stats')
    const data = await response.json()
    console.log(data)
  }
  return (
    <section className={styles.form}>
      <h1>引っ越し費用シミュレーター</h1>
      <div className={styles.route}>
        <div>
          <label htmlFor="from">現在地</label>
          <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="">選択してください</option>
            <option value="nagoya">名古屋市</option>
          </select>
        </div>
        <div>
          <label htmlFor="to">引越し先</label>
          <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="">選択してください</option>
            <option value="tokyo">東京23区</option>
          </select>
        </div>
      </div>
      <div className={styles.quantity}>
        <div>
          <label htmlFor="boxes">ダンボール</label>
          <input id="boxes" type="number" min="0" value={boxes} onChange={(e) => setBoxes(Number(e.target.value))} />
          <span>個</span>
        </div>
        <div>
          <label htmlFor="furniture">家具</label>
          <input id="furniture" type="number" min="0" value={furniture} onChange={(e) => setFurniture(Number(e.target.value))} />
          <span>点</span>
        </div>
        <div>
          <label htmlFor="appliances">家電</label>
          <input id="appliances" type="number" min="0" value={appliances} onChange={(e) => setAppliances(Number(e.target.value))} />
          <span>点</span>
        </div>
      </div>
      <button type="button" onClick={handleSubmit}>概算費用を計算</button>
    </section>
  )
}
export default MovingForm