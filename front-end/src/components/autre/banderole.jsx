import React from 'react'
import "./banderole.css"
const Banderole = () =>   {
    const [position, setPosition] = React.useState();
    const text = "Vivez une nouvelle expérience de restauration rapide et futuriste • Vivez une nouvelle expérience de restauration rapide et futuriste • Vivez une nouvelle expérience de restauration rapide et futuriste • Vivez une nouvelle expérience de restauration rapide et futuriste • Vivez une nouvelle expérience de restauration rapide et futuriste • Vivez une nouvelle expérience de restauration rapide et futuriste • Vivez une nouvelle expérience de restauration rapide et futuriste"

    return (
        <div className="Banderole">
            {text}
        </div>
    )

}
export default Banderole;