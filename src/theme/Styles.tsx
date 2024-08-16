import { StyleSheet } from "react-native";
import { SECUNDARY_COLOR, INPUT_COLOR, PRIMARY_COLOR } from "../Constantes/Constante";

export const styles = StyleSheet.create({

    //STYLES DE FORMULARIOS
    globalTitle: {
        color: SECUNDARY_COLOR,
        fontSize: 60,
        paddingHorizontal: 5,
        paddingVertical: 5,
        fontWeight: 'bold',
        paddingTop: 10
    },
    contentBody: {
        backgroundColor: SECUNDARY_COLOR,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 50
    },
    titleHeaderBody: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    textBody: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    inputText: {
        backgroundColor: INPUT_COLOR,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5
    },
    contentInput: {
        marginTop: 35,
        gap: 20
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 20,
        borderRadius: 5,
        marginTop: 35
    },
    buttonText: {
        color: SECUNDARY_COLOR,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    iconPassword:{
        position:'absolute',
        right:20,
        zIndex:1, 
        marginTop:15
    },
    textRedirection:{
        marginTop:35,
        fontSize:15,
        color:PRIMARY_COLOR,
        fontWeight:'bold',
        textAlign:'center'
    },


    //ESTILO DE LA PANTALLA PRINCIPAL 

    PantallaPrincipalTitle:{
    color: SECUNDARY_COLOR,
        fontSize: 60,
        paddingHorizontal: 5,
        paddingVertical: 5,
        fontWeight: 'bold',
        paddingTop: 10
    },
    productCard: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginVertical: 10,
        padding: 5,
        shadowColor: PRIMARY_COLOR,
        elevation: 10,
    },
    productImage: {
        width: '100%',
        height: 200,
    },

    productInfo: {
        marginTop: 10,
    },
    productName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    productPrice: {
        fontSize: 25,
        color: PRIMARY_COLOR,
        marginVertical: 5,
    },


    //NO SE
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
        fontWeight: 'bold',
        paddingTop: 150
        
      },
      productImage1: {
        width: 450, 
        height: 450, 
        borderRadius: 15, 
        borderWidth: 5, 
        borderColor: PRIMARY_COLOR,
        
      },
      productName1: { 
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        marginBottom: 5,
        textAlign: 'center',
        
      },
      productPrice1: {
        fontSize: 25, 
        color: PRIMARY_COLOR, 
        textAlign: 'center',
        fontWeight: 'bold',
        borderWidth: 1,
        height: 30,
        width:200,
        borderColor: PRIMARY_COLOR,
        marginBottom: 15,
      },
      quantityContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        justifyContent: 'center',
        
      },
      quantityButton1: {
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 25, 
        paddingHorizontal: 25,
        borderRadius: 10
      },


      quantityButtonText1: {
        fontSize: 25, 
        color: '#fff',
        fontWeight: 'bold',
      },
      quantityText1: {
        fontSize: 50,
        marginHorizontal: 150, 
        color: '#333',
        fontWeight: 'bold', 
      },
      totalAmount1: {
        fontSize: 25, 
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 35,
      },
      purchaseButton1: {
        backgroundColor: '#28a745',
        paddingVertical: 30, 
        alignItems: 'center',
        width: '100%', 
      },
      purchaseButtonText1: {
        fontSize: 25, 
        color: '#fff',
        fontWeight: 'bold',
      },
      PantallaPrincipalTitle1:{
        color: PRIMARY_COLOR,
        fontSize: 40,
        paddingVertical: 0,
        fontWeight: 'bold',
        top: -90
      }

});






