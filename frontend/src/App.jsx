import { useEffect } from "react"
import { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { uploadFile, loadData, deleteImg } from "./api/imgApi"

const App = () => {

  const [ title, setTitle ] = useState("")
  const [ creator, setCreator ] = useState("")
  const [ file, setFile ] = useState(null)

  const [ data, setData ] = useState([])

  const load = async () => {
    const response = await loadData()
    setData(response.data)
  }

  const save = async () => {
    const response = await uploadFile({ file, title, creator })
    load()
  }

  const del = async (id) => {
    const response = await deleteImg(id)
    load()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <main>
      <section>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Creator" value={creator} onChange={e => setCreator(e.target.value)} />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button onClick={save}>
          Upload
        </button>
        <hr />
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {data.map(imgData => (
            <SwiperSlide key={imgData.id}>
              <div>
                <p>
                  <strong>{ imgData.title }</strong>
                  - ({ imgData.creator })
                  <button onClick={() => del(imgData.id)}>Delete</button>
                </p>
                <img width={"200px"} src={`http://127.0.0.1:5000/static/${imgData.filename}`} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  )
}

export default App
