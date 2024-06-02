import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import stores from "../../data/stores";

function Response(props) {
  return (
    <div className="mt-5" id="response">
      <b>Response</b>
      <div className="mt-3">
        <JSONInput
          id="a_unique_id"
          key={
            stores.FormsStore.getForm(props.tabId).response_key
              ? stores.FormsStore.getForm(props.tabId).response_key
              : stores.FormsStore.getForm(props.tabId).id
          }
          placeholder={stores.FormsStore.getForm(props.tabId).response}
          onChange={(j) => stores.FormsStore.setResponse(props.tabId, j)}
          locale={locale}
          height="400px"
          width="100%"
          viewOnly
        />
      </div>
    </div>
  );
}

export default Response;
