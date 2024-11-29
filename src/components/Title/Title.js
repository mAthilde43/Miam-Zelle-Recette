import classes from './Title.module.css'

const Title = ({type, children}) => {
    let title ;
    if (type === "h1"){
        title = <h1 className={classes.titre}>{children}</h1> 
    } 
    else if (type === "h2"){
        title = <h2 className={classes["titreh2"]}>{children}</h2>
    }
    else if (type === "h3"){
        title = <h3 className={classes["titreh3"]}>{children}</h3>
    }
    else if (type === "h4"){
        title = <h4 className={classes["titreh4"]}>{children}</h4>
    }

    return title;
}

export default Title