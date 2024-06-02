import { makeAutoObservable } from "mobx";
import { v4 as uuid } from "uuid";

export default class Forms {
  forms = [];
  selectedCollection = null;

  constructor(value) {
    makeAutoObservable(this);
  }

  addForm(form) {
    this.forms.push(form);
  }

  getForm(id, index) {
    if (id) {
      let i = this.forms.findIndex((t) => t.id === id);
      if (i >= 0) return this.forms[i];
    }
    if (index) return this.forms[index];
    return null;
  }

  getSubTabIndex(id, index) {
    let i = this.forms.findIndex((t) => t.id === id);
    if (i >= 0) {
      return this.forms[index];
    }
  }

  deleteForm(id) {
    if (id) {
      let i = this.forms.findIndex((t) => t.id === id);
      if (i >= 0) return this.forms.splice(i, 1);
    }
  }

  setMainFormValues(key, value, id) {
    let i = this.forms.findIndex((t) => t.id === id);
    if (i >= 0) {
      this.forms[i][key] = value;
    }
    this.forms = JSON.parse(JSON.stringify(this.forms));
  }

  removeFormParam(tabId, id) {
    let i = this.forms.findIndex((t) => t.id === tabId);
    if (i >= 0) {
      let j = this.forms[i].params.findIndex((t) => t.id === id);
      if (j >= 0) {
        this.forms[i].params.splice(j, 1);
      }
      this.forms = JSON.parse(JSON.stringify(this.forms));
    }
  }

  getFormParam(tabId, id) {
    let tab = this.getForm(tabId);
    if (tab) {
      let i = tab.params.findIndex((t) => t.id === id);
      if (i >= 0) return tab.params[i];
    }
    return null;
  }

  setFormParam(tabId, id, key, value) {
    let i = this.forms.findIndex((t) => t.id === tabId);
    if (i >= 0) {
      let j = this.forms[i].params.findIndex((t) => t.id === id);
      if (j >= 0) {
        this.forms[i].params[j][key] = value;
      }

      this.forms = JSON.parse(JSON.stringify(this.forms));
    }
  }

  addFormParam(id) {
    let i = this.forms.findIndex((t) => t.id === id);
    if (i >= 0) {
      this.forms[i]["params"].push({
        id: uuid(),
        key: "",
        value: "",
        desc: "",
      });
    }
    this.forms = JSON.parse(JSON.stringify(this.forms));
  }

  setBody(id, body) {
    let i = this.forms.findIndex((t) => t.id === id);
    if (i >= 0) {
      this.forms[i]["body"] = body;
    }
    this.forms = JSON.parse(JSON.stringify(this.forms));
  }

  setCode(id, code) {
    let i = this.forms.findIndex((t) => t.id === id);
    if (i >= 0) {
      this.forms[i]["code"] = code;
    }
    this.forms = JSON.parse(JSON.stringify(this.forms));
  }

  setResponse(id, response) {
    let i = this.forms.findIndex((t) => t.id === id);
    if (i >= 0) {
      this.forms[i]["response"] = response;
      this.forms[i]["response_key"] = uuid();
    }
    this.forms = JSON.parse(JSON.stringify(this.forms));
  }

  setMarkdown(id, markdown) {
    let i = this.forms.findIndex((t) => t.id === id);
    if (i >= 0) {
      this.forms[i]["markdown"] = markdown;
      this.forms[i]["markdown_key"] = uuid();
    }
    // this.forms = JSON.parse(JSON.stringify(this.forms));
  }

  addFormHeader(id) {
    let i = this.forms.findIndex((t) => t.id === id);
    if (i >= 0) {
      this.forms[i]["headers"].push({
        id: uuid(),
        key: "",
        value: "",
        desc: "",
      });
    }
    this.forms = JSON.parse(JSON.stringify(this.forms));
  }

  removeFormHeader(tabId, id) {
    let i = this.forms.findIndex((t) => t.id === tabId);
    if (i >= 0) {
      let j = this.forms[i].headers.findIndex((t) => t.id === id);
      if (j >= 0) {
        this.forms[i].headers.splice(j, 1);
      }

      this.forms = JSON.parse(JSON.stringify(this.forms));
    }
  }
  getFormHeader(tabId, id) {
    let tab = this.getForm(tabId);
    if (tab) {
      let i = tab.headers.findIndex((t) => t.id === id);
      if (i >= 0) return tab.headers[i];
    }
    return null;
  }

  setFormHeader(tabId, id, key, value) {
    let i = this.forms.findIndex((t) => t.id === tabId);
    if (i >= 0) {
      let j = this.forms[i].headers.findIndex((t) => t.id === id);
      if (j >= 0) {
        this.forms[i].headers[j][key] = value;
      }
      this.forms = JSON.parse(JSON.stringify(this.forms));
    }
  }
  setSelectedCollection(item, id) {
    let response =
      item.response && item.response.length > 0 ? item.response[0].body : "{}";
    let headers = item.request.header.map((v) => ({
      id: uuid(),
      key: v.key,
      value: v.value,
      desc: v.type,
    }));

    if (
      item.request.auth &&
      item.request.auth.bearer &&
      item.request.auth.bearer.length > 0
    ) {
      headers.push({
        id: uuid(),
        key: "authorization",
        value: "bearer " + item.request.auth.bearer[0].value,
        desc: item.request.auth.bearer[0].type,
      });
    }

    let params = item.request.url.query.map((v) => ({
      id: uuid(),
      key: v.key,
      value: v.value,
      desc: v.type,
    }));

    this.selectedCollection = {
      id: id,
      name: item.name,
      method: item.request.method,
      url: item.request.url.raw,
      params: params,
      headers: headers,
      body:
        typeof item.request.body.raw === "string"
          ? JSON.parse(item.request.body.raw)
          : item.request.body.raw,
      // response: typeof response === "string" ? JSON.parse(response) : response,
    };
  }

  //Get request code
  createPythonRequest(path, method, params, headers, body) {
    let _headers = "";

    let i;
    for (i in headers) {
      _headers += `'${headers[i].key}':'${headers[i].value}',`;
    }

    let request = `
    import requests
    import json \n
    url = ${path}
    payload = ${JSON.stringify(body)}
    headers = {${_headers}}
    response = requests.request('${method}', url=url , headers=headers, json=payload)
    print(response.text.encode('utf8'))`;
    return request;
  }
  createCURLRequest(path, method, params, headers, body) {
    let _headers = "";
    let _params = "?";
    let i;
    for (i in headers) {
      _headers += `--header '${headers[i].key}: ${headers[i].value}' `;
    }
    for (i in params) {
      _params += `${i}=${params[i]}&`;
    }
    let request = `
    curl --location --request ${method} '${
      path + _params.slice(0, -1)
    }' ${_headers} --data-raw '${JSON.stringify(body)}'
    `;

    return request;
  }
  createAxiosRequest(path, method, params, headers, body) {
    let _headers = "";

    let _params = "?";
    let i;
    for (i in params) {
      _params += `${i}=${params[i]}&`;
    }

    for (i in headers) {
      _headers += `'${headers[i].key}':'${headers[i].value}',`;
    }
    let request = `
    let axios = require('axios')
    let data = JSON.stringify(${JSON.stringify(body)})

    let config = {
      method: '${method}',
      url: '${path + _params.slice(0, -1)}',
      headers: {${_headers}}
      data : data
    };

    axios(config)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
    `;

    return request;
  }
  createOKHttpRequest(path, method, params, headers, body) {
    let _headers = "";
    let _params = "?";
    let i;
    for (i in params) {
      _params += `${i}=${params[i]}&`;
    }
    for (i in headers) {
      _headers += `.addHeader("${headers[i].key}", "${headers[i].value}")\n\t`;
    }
    let request = `
    OkHttpClient client = new OkHttpClient().newBuilder().build();
    MediaType mediaType = MediaType.parse("application/json");
    RequestBody body = RequestBody.create(mediaType, "${JSON.stringify(body)}");
    Request request = new Request.Builder()
      .url("${path + _params.slice(0, -1)}")
      .method("${method}", body)
      ${_headers}
      .build();
    Response response = client.newCall(request).execute();
    `;

    return request;
  }
  createURLSessionRequest(path, method, params, headers, body) {
    let _headers = "";
    let _params = "?";
    let i;
    for (i in params) {
      _params += `${i}=${params[i]}&`;
    }
    for (i in headers) {
      _headers += `request.addValue("${headers[i].value}", forHTTPHeaderField: "${headers[i].key}")\n      `;
    }
    let request = `
    import Foundation
    let semaphore = DispatchSemaphore (value: 0)
    let parameters = "${JSON.stringify(body)}"
    let postData = parameters.data(using: .utf8)

    let request = URLRequest(url: URL(string: "${
      path + _params.slice(0, -1)
    }")!,timeoutInterval: Double.infinity)
    ${_headers}

    request.httpMethod = "${method}"
    request.httpBody = postData

    let task = URLSession.shared.dataTask(with: request) { data, response, error in 
      guard let data = data else {
        print(String(describing: error))
        return
      }
      print(String(data: data, encoding: .utf8)!)
      semaphore.signal()
    }

    task.resume()
    semaphore.wait()
    `;

    return request;
  }
  //End get request code
}
