import {makeStyles} from "@material-ui/core/styles";
export default makeStyles(()=>({
    appBar: {
        borderRadius: 15,
        marginBottom: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Algerian'
      },
    heading: {
      color: 'rgba(0,183,255, 1)',
    },
    image: {
      marginLeft: '15px',
    },
}))