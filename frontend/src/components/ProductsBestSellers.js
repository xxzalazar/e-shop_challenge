import React from 'react'
import '../styles/home.css'
import '../styles/mediaQuerys/mediaCards.css'
import ItemCard from './ItemCard'

class ProductsBestSellers extends React.Component{
    state = {
        firstThree: [],
        secondThree:[],
    }

    async componentDidMount(){
        
        var ordered = await this.props.products.sort((a,b) => b.views-a.views)
        
        var first = ordered.slice(0, 3)
        var second = ordered.slice(3, 6)
        
        this.setState({
            ...this.state,
            firstThree: first,
            secondThree: second
        })

    }


    render(){
 
        return(
            <>
            <div className="conteiner-card">
                {this.state.firstThree.map(product => {
                    return (
                        <>
                            <ItemCard key={product.id} item={product}/>
                        </>
                    )
                })}
            </div>
            <div className="conteiner-card">
                {this.state.secondThree.map(product => {
                    return (
                        <>
                            <ItemCard key={product.id} item={product}/>
                        </>
                    )
                })}
            </div>
            </>
        )
        
    }

}

export default ProductsBestSellers