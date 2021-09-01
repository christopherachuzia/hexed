const sortReport = (report) =>{
    const borrowed_report = report.reduce((output, data) =>{
        if(output[data.book_id]){
            output[data.book_id].users.push(data.user_id)
            return output
        }
        
        output[data.book_id] = {
            title: data.book_title,
            users: [data.user_id]
        }

        return output
    },{});

    const final_report = []
    for(const key in borrowed_report){
        final_report.push({
            _id: key,
            title: borrowed_report[key].title,
            users: [...borrowed_report[key].users]
        })
    }

    return final_report
}

module.exports = {
    updateStores: function(updatedata){
        return new Promise(resolve =>{
            setTimeout((updatedata)=>{
                const {action,data: bookdata} = updatedata;
                if(action === 'return'){
                    this.borrowed_list = [...this.borrowed_list.filter(book => book._id !== bookdata._id)]
                }
                else{
                    this.borrowed_list.push({
                        _id: bookdata._id,
                        book_id: bookdata.book_id,
                        user_id: bookdata.user_id
                    })
                }
                resolve([...this.borrowed_list.filter(book => book.user_id === bookdata.user_id)])
            },400,updatedata)
        })
    },

    readBorrowedBook: function(filterdata = null){
        if(filterdata){
            if('userid' in filterdata){
                const user_borrowed_book = [...this.borrowed_list.filter(book => book.user_id === filterdata.userid)];
                return Promise.resolve([...user_borrowed_book])
            }

            if('report' in filterdata){
                const borrowed_report = this.borrowed_list.length ? sortReport([...this.borrowed_list]) : []
                return Promise.resolve([...borrowed_report])
            }
        }
        else{
            return Promise.resolve([...this.borrowed_list])            
        }
    },

    readLibrary: function(filterdata = null){
        return new Promise((resolve, reject) =>{
            setTimeout((filterdata)=>{
                if(filterdata){
                    if(filterdata.present){
                        resolve({
                            _id: filterdata.bookid,
                            book_id: filterdata.bookid,
                            book_title: 'Test book'
                        })
                        return;
                    }
                    resolve(null)
                    return
                }
                else{
                    resolve([...this.book_available])
                }
            },100,filterdata)
        })
    },

    loadBorrowedList: function(borrowbooks){
        this.borrowed_list = borrowbooks
    },

    loadAvailableBooks: function(availablebbooks){
        this.book_available = availablebbooks
    },

    borrowed_list: [],
    book_available: []
}