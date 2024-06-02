import React from "react";
import "../App.css";
import { v4 as uuid } from "uuid";
import Inputs from "./Inputs";
import { inject, observer } from "mobx-react";
import { reaction } from "mobx";

@inject("FormsStore")
@observer
class Tabs extends React.Component {
  constructor(props) {
    super(props);

    let firstId = uuid();

    props.FormsStore.addForm({
      id: firstId,
      method: "GET",
      url: "",
      params: [],
      headers: [],
      body: {},
      response: {},
    });

    this.state = {
      tabs: [
        {
          id: firstId,
          name: "Untitled Request",
          content: <Inputs id={firstId} />,
        },
      ],
      currentTab: {
        id: firstId,
        name: "Untitled Request",
        content: <Inputs id={firstId} />,
      },
      editMode: false,
      editTabNameMode: false,
    };
  }

  componentDidMount() {
    this.selectedCollectionReaction = reaction(
      () => this.props.FormsStore.selectedCollection,
      () => {
        this.handleSelectedCollectionTab(
          this.props.FormsStore.selectedCollection
        );
      }
    );
  }

  componentWillUnmount() {
    if (this.selectedCollectionReaction) this.selectedCollectionReaction();
  }

  handleDoubleClick = () => {
    this.setState({
      editTabNameMode: true,
    });
  };

  handleEditTabName = (e) => {
    const { currentTab, tabs } = this.state;

    const updatedTabs = tabs.map((tab) => {
      if (tab.id === currentTab.id) {
        return {
          ...tab,
          name: e.target.value,
        };
      } else {
        return tab;
      }
    });

    this.setState({
      tabs: updatedTabs,
      currentTab: {
        ...currentTab,
        name: e.target.value,
      },
    });
  };

  handleOnBlur = () => {
    this.setState({
      editTabNameMode: false,
    });
  };

  createTabs = () => {
    const { tabs, currentTab, editTabNameMode } = this.state;

    const allTabs = tabs.map((tab, xid) => {
      return (
        <div className="d-flex" key={xid}>
          <li className="nav-item d-flex">
            {editTabNameMode && currentTab.id === tab.id ? (
              <div className="form-control-wrap">
                <input
                  value={tab.name}
                  onBlur={this.handleOnBlur}
                  onChange={this.handleEditTabName}
                  className="form-control form-control-lg"
                />
              </div>
            ) : (
              <a
                className={
                  currentTab.id === tab.id ? "nav-link active" : "nav-link"
                }
                onClick={() => this.handleSelectTab(tab)}
                onDoubleClick={() => this.handleDoubleClick(tab)}
              >
                {tab.name}
              </a>
            )}
          </li>
        </div>
      );
    });

    return <ul className="nav nav-tabs mt-4">{allTabs}</ul>;
  };

  handleSelectTab = (tab) => {
    this.setState({
      currentTab: tab,
      editMode: false,
      editTabNameMode: false,
    });
  };

  /*
   * handle selected collection tabs
   */
  handleSelectedCollectionTab = (collection) => {
    let tab = this.props.FormsStore.getForm(collection.id);

    if (!tab) {
      this.props.FormsStore.addForm({
        id: collection.id,
        method: collection.method,
        url: collection.url,
        params: collection.params,
        headers: collection.headers,
        body: collection.body,
        response: collection.response,
      });
    }

    const newTabObject = {
      id: collection.id,
      name: collection.name,
      content: <Inputs id={collection.id} />,
    };

    this.setState({
      tabs: !!tab ? [...this.state.tabs] : [...this.state.tabs, newTabObject],
      currentTab: newTabObject,
      editMode: false,
      editTabNameMode: false,
    });
  };

  handleAddTab = () => {
    const { tabs } = this.state;
    let id = uuid();

    this.props.FormsStore.addForm({
      id: id,
      method: "GET",
      url: "",
      params: [],
      headers: [],
      body: {},
      response: {},
    });

    const newTabObject = {
      id: id,
      name: `Untitled Request`,
      content: <Inputs id={id} />,
    };

    this.setState({
      tabs: [...tabs, newTabObject],
      currentTab: newTabObject,
      editMode: false,
      editTabNameMode: false,
    });
  };

  //Method to delete tab

  handleDeleteTab = (tabToDelete) => {
    const { tabs } = this.state;
    const tabToDeleteIndex = tabs.findIndex((tab) => tab.id === tabToDelete.id);

    let id = null;
    if (tabToDeleteIndex >= 0) id = tabs[tabToDeleteIndex].id;

    this.props.FormsStore.deleteForm(id);
    const updatedTabs = tabs.filter((tab, index) => {
      return index !== tabToDeleteIndex;
    });

    const previousTab =
      tabs[tabToDeleteIndex - 1] || tabs[tabToDeleteIndex + 1] || {};

    this.setState({
      tabs: updatedTabs,
      editMode: false,
      editTabNameMode: false,
      currentTab: previousTab,
    });
  };

  render() {
    const { tabs, currentTab } = this.state;
    return (
      <div className="container my-4">
        <div>
          <div className="d-flex justify-content-between">
            <em
              onClick={this.handleAddTab}
              className="icon ni ni-plus plus_icon align-self-center mr-5"
              title="Add Tab"
            ></em>
            {tabs.length !== 1 && (
              <div>
                <button
                  className="btn btn-dim btn-outline-danger"
                  onClick={() => this.handleDeleteTab(currentTab)}
                >
                  Remove Tab
                </button>
              </div>
            )}
          </div>
          {this.createTabs()}
          <div className="tab-content">
            {
              <>
                <div>
                  <b>{currentTab.name}</b>
                  {currentTab.content}
                </div>
              </>
            }
          </div>
        </div>
        <p className="text-muted mt-5">
          Developed by <a href="https://github.com/ashomidi/" target="_blank">@ashomidi</a>
        </p>
      </div>
    );
  }
}

export default Tabs;
