import axios from 'axios'
const URI = 'http://localhost:5000'

export default class DBService {
    static getContent(search = null){
        return axios.get(`${URI}/api/library/contents`,{
            params:{search}
        })
    }

    static logIn(formdata){
        return axios.post(`${URI}/api/auth/login`,{
            email: formdata.email,
            password: formdata.password
        })
    }

    static createAccount(formdata){
        return axios.post(`${URI}/api/auth/createuser`,{
            email: formdata.email,
            name: formdata.name,
            password: formdata.password
        })
    }

    static getBooklist(){
        return axios.get(`${URI}/api/library/booklist`,{
            headers:{
                'authorization': `Bearer ${localStorage.token ? localStorage.token : ''}`
            }
        })
    }

    static getReport(){
        return axios.get(`${URI}/api/library/reports`,{
            headers:{
                'authorization': `Bearer ${localStorage.token ? localStorage.token : ''}`
            }
        })
    }

    static borrowFromLibrary(formdata){
        return axios.post(`${URI}/api/library/borrow`,{
            ...formdata
        },{
            headers:{
                'authorization': `Bearer ${localStorage.token ? localStorage.token : ''}`
            }
        })
    }

    static returnBorrowedBook(formdata){
        return axios.post(`${URI}/api/library/retunbook`,{
            ...formdata
        },{
            headers:{
                'authorization': `Bearer ${localStorage.token ? localStorage.token : ''}`
            }
        })
    }

    static addLibraryBook(formdata){
        return axios.post(`${URI}/api/library/addbook`,{
            ...formdata
        },{
            headers:{
                'authorization': `Bearer ${localStorage.token ? localStorage.token : ''}`
            }
        })
    }

    static deleteLibraryBook(id){
        return axios.delete(`${URI}/api/library/delete/${id}`,{
            headers:{
                'authorization': `Bearer ${localStorage.token ? localStorage.token : ''}`
            }
        })
    }
}