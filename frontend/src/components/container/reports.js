import Reportbookholder from '../ui/reportbookholder'
import C from '../../store/actiontype'
import {connect} from 'react-redux'

const mapStateToProps = state =>{
    return {
        screen: state.popupscreen,
        loading: state.loadinglibrary,
        bookdata: state.borrowedreport,
        loadreport: state.loadingreport,
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        cancelOverlay: ()=>{
            dispatch({
                type:C.SET_SCREEN,
                value: -1
            })
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reportbookholder)