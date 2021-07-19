import React, {useContext, useState} from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {


    //Modal de MaterialUI
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () =>{
        setOpen(true);
    }
  const handleClose = () =>{
        setOpen(false);
    }
    //extraer valores context

    const {guardarIdReceta, informacion, guardarReceta} = useContext(ModalContext);

    console.log(informacion);


    const mostrarIngredientes = informacion => {
        let ingredientes = [];          //array que contendra los ingredientes y sus cantidades
        for(let i = 1; i < 16; i++){  //cantidad de ingredientes suministrados por la api
            if( informacion[`strIngredient${i}`] ) { //validar que no haya ingredientes nulos
                ingredientes.push(
                    <li> { informacion[`strIngredient${i}`] }  { informacion[`strMeasure${i}`] }</li>//agrega la lista que se renderiza en el modal
                )
            }
        }

        return ingredientes;
    }



    return ( 

        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`} className="card-img-top" />
            </div>
        <div className="card-body">
            <button
            type="button"
            className="btn btn-block btn-primary"
            onClick = {() => {guardarIdReceta(receta.idDrink);
                             handleOpen()}}
                             >Ver Receta     
            </button>

           
            <Modal
                        open={open}
                        onClose={() => {
                            guardarIdReceta(null);
                            guardarReceta({}); //vacio para que al cambiar  de receta refresque sin mostrar la receta anterior
                            handleClose();

                        }}
                     >
                <div style = {modalStyle} className ={classes.paper}>
                    <h2>{informacion.strDrink}</h2>
                    <h3 className="mt-4">Instrucciones</h3>
                    <p>{informacion.strInstructions}</p>
                    <img src={informacion.strDrinkThumb} alt={informacion.strDrink} className="img-fluid my-4" />
                    <h3>Ingredientes y cantidades</h3>
                            <ul>
                            { mostrarIngredientes(informacion) }
                            </ul>
                
                </div>
            </Modal>
            </div>
        </div>
     );
}
 
export default Receta;