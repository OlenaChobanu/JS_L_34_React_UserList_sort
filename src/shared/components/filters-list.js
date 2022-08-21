import React from "react";
import { FILTERS } from "../constants/filter.js";
import FilterItem from "./filter-item";

export default class FiltersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilter: FILTERS.all,
    };

    this.changeFilter = this.changeFilter.bind(this);
  }

  changeFilter(filter) {
    this.setState({ activeFilter: filter });
    this.props.change(filter);
  }

  render() {
    return (
      <div className="filters-container">
        {this.props.filters.map((e, i) => (
          <FilterItem
            key = {i}
            isActive={e === this.state.activeFilter}
            title={e}
            cb={this.changeFilter}
          ></FilterItem>
        ))}
      </div>
    );
  }
}
