import { JsonEditor as Editor } from "jsoneditor-react";
import stores from "../data/stores";

function BodyTab(props) {
  return (
    <div>
      <div className="mt-3">
        <Editor
          key={stores.FormsStore.getForm(props.tabId).id}
          value={stores.FormsStore.getForm(props.tabId).body}
          onChange={(j) => stores.FormsStore.setBody(props.tabId, j)}
        />
      </div>
    </div>
  );
}

export default BodyTab;
