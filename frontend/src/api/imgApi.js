import Axios from 'axios'

const http = Axios.create({ baseURL: "http://127.0.0.1:5000" })

export const loadData = async () => {
    const response = await http.get("/api/images")
    return response
}

export const uploadFile = async ({ file, title, creator }) => {    
    const formData = new FormData()
    formData.append("image", file)
    formData.append("title", title)
    formData.append("creator", creator)
    const customHeader = {
      headers: {
        "Content-Type": 'multipart/form-data',
      },
    }
    const response = await http.post("/api/images", formData, customHeader)
    return response
}

export const deleteImg = async (id) => {
    const response = await http.delete("/api/images/" + id)
    return response
}