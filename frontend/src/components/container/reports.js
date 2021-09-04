import Reportbookholder from '../ui/reportbookholder'

import {connect} from 'react-redux'

const mapStateToProps = state =>{
    return {
        loading: state.loadinglibrary,
        bookdata: state.borrowedreport
    }
}

export default connect(
    mapStateToProps,
    null
)(Reportbookholder)