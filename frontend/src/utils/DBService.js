import axios from 'axios'
const URI = 'http://localhost:5000'

class DBService {
    static getContent(search = null){
        return axios.get(`${URI}/api/library/contents`,{
            params:{search}
        })
    }

    static logIn(formdata){
        return axios.post(`${URI}/api/auth/login`,{
            email: formadata.email,
            password: formadata.password
        })
    }

    static createAccount(formdata){
        return axios.post(`${URI}/api/auth/createuser`,{
            email: formadata.email,
            name: formdata.name,
            password: formadata.password
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

    static borrowLibraryBook(formdata){
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