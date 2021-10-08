import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService'
import Pagination from "./common/pagination";
import ListGroup from './common/genre';
import MoviesTable from './common/movieTable';
import Paginate  from '../utils/paginate'
import _ from 'lodash';


export default class Movies extends Component {
    state={
        movies: [],
        genre:[],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: 'title' ,order:  'asc' }
    }; 
    handleDelete = movie =>{
        const movies=this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies})
    };
    handleLike=movie=>{
        const movies=[...this.state.movies]
        const index=movies.indexOf(movie);
        movies[index]={...movies[index]};
        movies[index].liked=!movies[index].liked;
        this.setState({movies});
    };
    handleChange=page=>{
       this.setState({currentPage:page});
    };
    handleSort=sortColumn=>{
      
        this.setState({sortColumn});
    }
  
    componentDidMount(){
        const genre =[{name:'All Movies',_id:'0'},...getGenres()];
        this.setState({movies:getMovies(),genre});
    };
    handleGenreSelect=genre=>{ 
        this.setState({selectedGenre:genre });

    };
    render() { 
        const {length: count}=this.state.movies;
        const {
            pageSize,
            currentPage,
            selectedGenre,
            sortColumn,
            movies:allMovies
        }=this.state;

        if (count === 0)
          return <p>There are no movie in database</p>

          const filtered =
            selectedGenre && selectedGenre._id !== '0' ? 
            allMovies.filter (m=> m.genre._id === selectedGenre._id) :
            allMovies;

          const sorted =_.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
           
          const movies =Paginate(sorted,currentPage,pageSize);

        return (
            
                <div className="row">
                    <div className="col-2">
                        <ListGroup 
                        items={this.state.genre}
                        selectItems={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                        />
                    </div>
                    <div className="col">
                    <p> There are {filtered.length} movie in database</p>
                       <MoviesTable 
                       sortColumn={sortColumn}
                       movies={movies}
                       onLike={this.handleLike}
                       onDelete={this.handleDelete}
                       onSort={this.handleSort}
                       />
                        <Pagination 
                        itemsCount={filtered.length} 
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handleChange}
                        /> 
                    </div>
                </div>
             
            
           
      
        );
    }
}
 
// Movies;