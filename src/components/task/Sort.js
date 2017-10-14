import React, { Component, PropTypes } from 'react';
// import {render} from 'react-dom';
// import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

// const SortableItem = SortableElement(({value}) =>
//   <div className="task-card">{value}</div>
// );

// const SortableList = SortableContainer(({items}) => {
//   return (
//     <div>
//       {items.map((value, index) => (
//         <SortableItem key={`item-${index}`} index={index} value={value} />
//       ))}
//     </div>
//   );
// });

class SortableComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
//       items: this.props.tasks,
    };

//     this.onSortEnd = this.onSortEnd.bind(this);
  }

//   onSortEnd ({oldIndex, newIndex}) {
//     this.setState({
//       items: arrayMove(this.state.items, oldIndex, newIndex),
//     });
//   };

  render() {
    return <div>"sort commmented out"</div>;
    //     return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

// SortableComponent.propTypes = {
//   tasks: PropTypes.array.isRequired
// };

export default SortableComponent;