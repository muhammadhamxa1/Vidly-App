// import { map } from 'lodash';
import React from 'react';

const ListGroup = (props) => {
    const {items,textProperty,idProperty,onItemSelect,selectItems}=props;
    return (<ul className="list-group">
                {items.map(item =><li onClick={()=>onItemSelect(item)}
                key={item[idProperty]} 
                style={{cursor:'pointer'}}
                className={item===selectItems ? "list-group-item active": "list-group-item"}>
                    {item[textProperty]}
                    </li> )}
  </ul>);
}

ListGroup.defaultProps={
    textProperty:"name",
    idProperty:"_id"
}
 
export default ListGroup;