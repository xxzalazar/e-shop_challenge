import React from 'react';
import '../styles/itemsprofile.css';
import Header from '../components/Header'
import ItemCard from '../components/ItemCard';
import Footer from '../components/Footer';
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import productsActions from '../redux/actions/productsActions';
import '../styles/mediaQuerys/mediaCards.css'

class Products extends React.Component {

    state = {
        category: "",
        order:"",
        items: [],
        filteredItems:[]
    }

    async componentDidMount() {
        window.scrollTo({top: 0, behavior: 'smooth'})
        await this.props.getProducts()
        const products = this.props.products
        this.setState({
            ...this.state,
            items:products,
            filteredItems:products
        })
        
    }

    filterItem = e => {
        const property = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            [property]: value
        })
 
    }

    filterP = () =>{
        var filtered = this.state.items
        if (this.state.category !== ""){
            switch (this.state.category){
                case "Todo":
                    return(filtered)

                case "Secos":
                    filtered = this.state.items.filter(item=>(
                        item.category === "Secos"
                    ))
                    return(filtered)
                    
                case "Refrigerados":
                    filtered = this.state.items.filter(item=>(
                        item.category === "Refrigerados")
                    )
                    return(filtered)
                case "Congelados":   
                    filtered = this.state.items.filter(item=>(
                        item.category === "Congelados"
                    ))
                    return(filtered)
            }
        }
    }

    orderF = (filtered) =>{
       
        if(this.state.order !==""){
            switch (this.state.order){
                case "MasStock":
                    filtered.sort((a,b) => b.stock - a.stock)
                    return(filtered)
                case "MenosStock":
                    filtered.sort((a,b) => a.stock - b.stock)
                    return(filtered)
                case "MasPrecio":
                    filtered.sort((a,b) => b.price - a.price)
                    return(filtered)
                case "MenosPrecio":
                    filtered.sort((a,b) => a.price - b.price)
                    return(filtered)
            }
        }else{
            return filtered
        }
    }
    
    

    render() {
       
        const searchFilterHome = async (e) => {
            const filtered =  await this.filterP()
            if (filtered === undefined){
                const allfiltered = this.orderF(this.state.items)
                this.setState({
                    ...this.state,
                    filteredItems: allfiltered
                })
            }else{
                this.orderF(filtered)
                this.setState({
                    ...this.state,
                    filteredItems: filtered
                })
            }                        
        }

        return (
            <>
            <Header/>
            <div className="containerP">
                <h4>LOS MEJORES PRODUCTOS, AL ALCANCE DE TU MANO</h4>
                <div className="search">
                    <div>
                        <select onChange={this.filterItem} className="inputSelect" name="category" placeholder="Filtrar por categoría" >
                            <option className="titleOption" disabled selected>Filtrar por categoría</option>
                            <option value="Todo" className="option">Ver todo</option>
                            <option value="Secos" className="option">Secos</option>
                            <option value="Refrigerados" className="option">Refrigerados</option>
                            <option value="Congelados" className="option">Congelados</option>
                        </select><FontAwesomeIcon icon={faFilter} />
                    </div>
                    <div className="selectContainer">
                        <select onChange={this.filterItem} className="inputSelect" name="order" placeholder="Filtrar por categoría" >
                            <option className="titleOption" disabled selected>Ordenar por</option>
                            <option value="MasStock" className="option">Mayor stock</option>
                            <option value="MenosStock" className="option">Menor stock</option>
                            <option value="MasPrecio" className="option">Mayor precio</option>
                            <option value="MenosPrecio" className="option">Menor precio</option>
                        </select><FontAwesomeIcon icon={faSort} />
                    </div>
                    <Button className="btnFilter" onClick={searchFilterHome} >Buscar</Button>
                </div>
                <div className="cardsContainer">
                    {this.state.filteredItems.map((item, index) => {
                        return (<ItemCard key={item.id} item={item}/>)
                    })}
                </div>
            </div>
            <Footer />
            </>
        )
    }
}

const mapDispatchToProps = {
    getProducts: productsActions.getProducts
}

const  mapStateToProps = (state) =>{
    return {
        products: state.productsRed.products
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (Products);
