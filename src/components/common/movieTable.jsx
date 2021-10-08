import React,{Component} from 'react';
import Like from './like';
 class MoviesTable extends Component {
     constructor(){
         super();
         this.myref=React.createRef();
     }
    raiseSort = path => {
        const sortColumn={...this.props.sortColumn};
        if(sortColumn.path === path)
            sortColumn.order=(sortColumn.order === 'asc') ? 'desc' : 'asc';
        else{
            sortColumn.path=path;
            sortColumn.order='asc';
        } 
        this.props.onSort(sortColumn);
    };
     render() { 

        const {movies,onLike,onDelete} =this.props;
         return <div ref={this.myref}>
             <table className="table">
                <thead className="table-dark">
                    <tr>
                    <th onClick={()=>this.raiseSort("title")} scope="col">Title</th>
                    <th onClick={()=>this.raiseSort("genre.name")} scope="col">Genere</th>
                    <th onClick={()=>this.raiseSort("numberInStock")} scope="col">Stock</th>
                    <th onClick={()=>this.raiseSort("dailyRentalRate")} scope="col">Rate</th>
                    <th scope="col">Likes</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie =>(
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><Like liked={movie.liked} onClick={()=>onLike(movie)}/></td>
                            <td><button  onClick={() => onDelete(movie)} className="btn btn-danger">Delete</button></td>
                        </tr> 
                    ))}
                </tbody>
            </table>
         </div>;
     }
 }
  
 
export default MoviesTable;