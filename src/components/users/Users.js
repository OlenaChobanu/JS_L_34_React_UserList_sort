import React from "react";
import "./users-styles.css";
import AppButton from "../../shared/components/button";
import UsersList from "./users-list/users-list";
import UserCreate from "./user-create/user-create";
import FiltersList from "../../shared/components/filters-list";
import { FILTERS } from "../../shared/constants/filter";
const users = [
  {
    id: 1,
    name: "Ilya",
    lastName: "Some",
    age: 22,
    isActive: true,
  },
  {
    id: 2,
    name: "Bob",
    lastName: "Nice",
    age: 18,
    isActive: true,
  },
  {
    id: 3,
    name: "Vasya",
    lastName: "Clever",
    age: 17,
    isActive: true,
  },
  {
    id: 4,
    name: "John",
    lastName: "Connor",
    age: 17,
    isActive: true,
  },
  {
    id: 5,
    name: "Sara",
    lastName: "Mold",
    age: 17,
    isActive: true,
  },
];

export default class UsersComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      users,
      isEditMode: false,
      isCreateMode: false,
      sortedUsers: users,
    };

    this.onUserCreate = this.onUserCreate.bind(this);
    this.onDeactivate = this.onDeactivate.bind(this);
    this.onUserEdit = this.onUserEdit.bind(this);
    this.onUserCreated = this.onUserCreated.bind(this);
    this.onFiltersChange = this.onFiltersChange.bind(this);
  }

  render() {
    return (
      <div className="users-container">
        <div>
          <FiltersList
            filters={Object.values(FILTERS)}
            change={this.onFiltersChange}
          ></FiltersList>
          <AppButton cb={this.onUserCreate}>Create</AppButton>
        </div>
        {this.renderUserContent()}
      </div>
    );
  }

  onFiltersChange(activeFilter) {
    const mapped = this.state.users.map(function (u, i) {
      return { ...u, index: i, name: u.name.toLowerCase() };
    });

    switch (activeFilter) {
      case FILTERS.active:
        this.setState({
          ...this.state,
          sortedUsers: this.state.users.filter((u) => u.isActive),
        });
        break;

      case FILTERS.age:
        this.setState({
          ...this.state,
          sortedUsers: this.state.users.sort((a, b) => a.age - b.age),
        });
        break;

      case FILTERS.all:
        this.setState({
          ...this.state,
          sortedUsers: this.state.users,
        });
        break;

      case FILTERS.az:
        mapped.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        this.setState({
          ...this.state,
          sortedUsers: mapped.map(el => users[el.index]),
        });
        break;

      case FILTERS.za:
        mapped.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });
        this.setState({
          ...this.state,
          sortedUsers: mapped.map(el => users[el.index]),
        });
        break;

      default:
        this.setState({ ...this.setState });
    }
  }

  renderUserContent() {
    if (!this.state.isCreateMode && !this.state.isEditMode) {
      return (
        <UsersList
          users={this.state.sortedUsers}
          onDeactivate={this.onDeactivate}
          edit={this.onUserEdit}
        ></UsersList>
      );
    }

    if (this.state.isCreateMode || this.state.isEditMode) {
      return (
        <UserCreate
          cb={this.onUserCreated}
          user={
            this.state.currentUser
              ? this.state.currentUser
              : { name: "", lastName: "", age: "" }
          }
          title={this.state.currentUser ? "Edit User" : "Create user"}
        ></UserCreate>
      );
    }
  }

  onUserCreate() {
    this.setState({ ...this.state, isCreateMode: true });
  }

  onUserCreated(user) {
    if (!user.id) {
      this.setState({
        ...this.state,
        users: [...this.state.users, { ...user, id: Date.now() }],
        isCreateMode: false,
      });
    } else {
      this.setState({
        ...this.state,
        users: [...this.state.users.map((u) => (u.id === user.id ? user : u))],
        isCreateMode: false,
        isEditMode: false,
        currentUser: null,
      });
    }
  }

  onDeactivate(id) {
    this.setState({
      ...this.state,
      users: this.state.users.map((u) => {
        if (u.id === id) {
          u.isActive = false;
        }
        return u;
      }),
      sortedUsers: this.state.users.map((u) => {
        if (u.id === id) {
          return { ...u, isActive: false };
        } else {
          return u;
        }
      }),
    });
  }

  onUserEdit(user) {
    this.setState({
      ...this.state,
      currentUser: user,
      isEditMode: true,
    });
  }
}