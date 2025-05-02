import axios from 'axios'


const API = 'http://localhost:3000'



const axiosInstance = axios.create({
    baseURL: API,
})

const getCourses = () => axios.get(`${API}/courses`)

const editCourses = (courses,id)=>axiosInstance.put(`${API}/courses/edit/${id}`,courses)

const addCourses = (courses) => axiosInstance.post(`${API}/courses/add`, courses)

const deleteCourses = (id) => axiosInstance.delete(`${API}/courses/delete/${id}`)

//Notes
const getNotes = () => axios.get(`${API}/notes`);
const addNotes = (data) => axiosInstance.post(`${API}/notes/add`, data);
const editNotes = (data,id)=>axiosInstance.put(`${API}/notes/edit/${id}`,data )
const deleteNotes = (id) => axiosInstance.delete(`${API}/notes/delete/${id}`);
export{
    getCourses, editCourses,addCourses,deleteCourses,
    getNotes, addNotes, deleteNotes, editNotes
}