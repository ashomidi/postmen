import React from "react";
import stores from "../data/stores";

function HeadersTab(props) {
  return (
    <div>
      <table id="HeadersTable" className="table table-bordered mt-3">
        <thead>
          <tr>
            <th scope="col">KEY</th>
            <th scope="col">VALUE</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">
              <button
                onClick={() =>
                  stores.FormsStore.removeFormHeader(props.tabId, props.id)
                }
                className="btn border-0 p-0 crossIcon"
              >
                <em className="icon ni ni-cross"></em>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                value={
                  stores.FormsStore.getFormHeader(props.tabId, props.id).key
                }
                onInput={(v) =>
                  stores.FormsStore.setFormHeader(
                    props.tabId,
                    props.id,
                    "key",
                    v.target.value
                  )
                  
                }
                type="text"
                className="form-control form-control-sm"
                placeholder="Key"
              />
            </td>
            <td>
              <input
                value={
                  stores.FormsStore.getFormHeader(props.tabId, props.id).value
                }
                onInput={(v) =>
                  stores.FormsStore.setFormHeader(
                    props.tabId,
                    props.id,
                    "value",
                    v.target.value
                  )
                }
                type="text"
                className="form-control form-control-sm"
                placeholder="Value"
              />
            </td>
            <td>
              <input
                value={
                  stores.FormsStore.getFormHeader(props.tabId, props.id).desc
                }
                onInput={(v) =>
                  stores.FormsStore.setFormHeader(
                    props.tabId,
                    props.id,
                    "desc",
                    v.target.value
                  )
                }
                type="text"
                className="form-control form-control-sm"
                placeholder="Description"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HeadersTab;
