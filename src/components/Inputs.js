import React, { Component } from "react";
import BodyTab from "./BodyTab";
import ParamTab from "./ParamTab";
import HeadersTab from "./HeadersTab";
import { inject, observer } from "mobx-react";
import Response from "./response/Response";
import { Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";
import Markdown from "./Markdown";
import CodeModal from "./CodeModal";

toast.configure();

@inject("FormsStore")
@observer
class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendRequest: false,
      fieldError: false,
      baseURL: "http://31.25.91.46",
    };
  }

  sendRequest() {
    const urlValue = this.props.FormsStore.getForm(this.props.id).url;
    if (this.state.sendRequest) return;
    if (urlValue == "") {
      this.setState({ fieldError: true });
    } else {
      this.setState({ sendRequest: true });
      this.setState({ fieldError: false });
      let data = JSON.parse(
        JSON.stringify(this.props.FormsStore.getForm(this.props.id))
      );

      let url = data.url.toString().replace("{URL_BASE}", this.state.baseURL);
      let params = data.params;
      let headers = {};
      let body = JSON.stringify(data.body);
      data.headers.forEach((v) => {
        if (v.key && v.value) headers[v.key.toString()] = v.value.toString();
      });

      const options = {
        method: data.method,
        headers: headers,
      };
      if (
        data.method === "POST" ||
        data.method === "PUT" ||
        data.method === "PATCH"
      ) {
        options["body"] = body;
      }

      fetch(url, options)
        .then((res) => {
          if (res.status <= 300) {
            toast.success(`response status: ${res.status} | ${res.statusText}`);
          } else if (res.status <= 400) {
            toast.warning(`response status: ${res.status} | ${res.statusText}`);
          } else if (res.status >= 400) {
            toast.warning(`response status: ${res.status} | ${res.statusText}`);
          } else if (res.status >= 500) {
            toast.error(`response status: ${res.status} | ${res.statusText}`);
          }
          return res.json();
        })
        .then((response) => {
          this.props.FormsStore.setResponse(this.props.id, response);
          this.setState({ sendRequest: false });
        })
        .catch((err) => {
          // console.log(err.message);
          if (err.message.includes("Failed to fetch"))
            toast.error("wrong URL,enter correct URL");
          if (err.message.includes("Failed to parse URL"))
            toast.error("wrong URL,enter correct URL");
          if (err.message.includes("Unexpected token < in JSON at position 0"))
            toast.error("wrong body request data, enter correct body");
          if (err.message.includes("Unexpected token < in JSON at position 1"))
            toast.error("wrong body request data, enter correct body");
          if (err.message.includes("Unexpected string in JSON"))
            toast.error("wrong headers sets, enter correct headers");
          this.setState({ sendRequest: false });
        });
    }
  }

  render() {
    return (
      <>
        <form className="row gx-2 mt-4">
          <div className="col-lg-2">
            <div className="form-control-wrap ">
              <div className="form-control-select">
                <select
                  value={this.props.FormsStore.getForm(this.props.id).method}
                  onChange={(v) =>
                    this.props.FormsStore.setMainFormValues(
                      "method",
                      v.target.value,
                      this.props.id
                    )
                  }
                  className="form-control"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="PATCH">PATCH</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="form-group">
              <div className="form-control-wrap">
                <input
                  type="url"
                  value={this.props.FormsStore.getForm(this.props.id).url}
                  onInput={(v) =>
                    this.props.FormsStore.setMainFormValues(
                      "url",
                      v.target.value,
                      this.props.id
                    )
                  }
                  className={`form-control ${this.state.fieldError && "error"}`}
                  placeholder="Enter request url"
                  autoFocus
                />
              </div>
            </div>
          </div>

          <div className="col-lg-2">
            <button
              type="button"
              onClick={() => this.sendRequest()}
              className="btn btn-primary btn-block"
            >
              {this.state.sendRequest ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <span> Send </span>
              )}
            </button>
          </div>
          <div className="col-md-1">
            <CodeModal formID={this.props.id} />
          </div>
        </form>

        <div>
          <Tabs className="my-4">
            <Tab eventKey="params" title="Params">
              <div className="d-flex justify-content-between">
                <span className="align-self-center color-body">
                  <b>Query Params</b>
                </span>
                <button
                  className="btn"
                  onClick={() => {
                    this.props.FormsStore.addFormParam(this.props.id);
                  }}
                >
                  <em
                    className="icon ni ni-plus plus_icon align-self-center mr-2"
                    title="Add Tab"
                  ></em>
                  Add param
                </button>
              </div>
              {this.props.FormsStore.getForm(this.props.id).params.map(
                (v, index) => (
                  <ParamTab key={index} id={v.id} tabId={this.props.id} />
                )
              )}
            </Tab>
            <Tab eventKey="headers" title="Headers">
              <div className="d-flex justify-content-between">
                <span className="align-self-center color-body">
                  <b>Headers</b>
                </span>
                <button
                  className="btn"
                  onClick={() => {
                    this.props.FormsStore.addFormHeader(this.props.id);
                  }}
                >
                  <em
                    className="icon ni ni-plus plus_icon align-self-center mr-2"
                    title="Add Tab"
                  ></em>
                  Add header
                </button>
              </div>
              {this.props.FormsStore.getForm(this.props.id).headers.map(
                (v, index) => (
                  <HeadersTab key={index} id={v.id} tabId={this.props.id} />
                )
              )}
            </Tab>
            <Tab eventKey="body" title="Body">
              <span className="color-body">
                <b>Body</b>
              </span>
              <BodyTab tabId={this.props.id} />
            </Tab>
          </Tabs>
        </div>
        <Response tabId={this.props.id} />
        {/* <Markdown tabId={this.props.id} /> */}
      </>
    );
  }
}

export default Inputs;
