import axios from 'axios'


const API = 'http://localhost:3000'



const axiosInstance = axios.create({
    baseURL: API,
})

const getCourses = () => axios.get(`${API}/courses`)

const editCourses = (courses,id)=>axiosInstance.put(`${API}/courses/edit/${id}`,courses)

const addCourses = (courses) => axiosInstance.post(`${API}/courses/add`, courses)

const deleteCourses = (id) => axiosInstance.delete(`${API}/courses/delete/${id}`)

export{
    getCourses, editCourses,addCourses,deleteCourses
}