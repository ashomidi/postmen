import { Modal, Tabs, Tab } from "react-bootstrap";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import stores from "../data/stores";

function CodeModal(props) {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState("python");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a
        onClick={handleShow}
        className="btn btn-dim btn-outline-dark btn-sm btn-block"
      >
        <em className="icon ni ni-terminal"></em>
      </a>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
            <Tab eventKey="python" title="Python (requests)">
              <SyntaxHighlighter language="python" style={docco}>
                {stores.FormsStore.createPythonRequest(
                  stores.FormsStore.getForm(props.formID).url,
                  stores.FormsStore.getForm(props.formID).method,
                  stores.FormsStore.getForm(props.formID).params,
                  stores.FormsStore.getForm(props.formID).headers,
                  stores.FormsStore.getForm(props.formID).body
                )}
              </SyntaxHighlighter>
            </Tab>
            <Tab eventKey="curl" title="Curl">
              <SyntaxHighlighter style={docco}>
                {stores.FormsStore.createCURLRequest(
                  stores.FormsStore.getForm(props.formID).url,
                  stores.FormsStore.getForm(props.formID).method,
                  stores.FormsStore.getForm(props.formID).params,
                  stores.FormsStore.getForm(props.formID).headers,
                  stores.FormsStore.getForm(props.formID).body
                )}
              </SyntaxHighlighter>
            </Tab>
            <Tab eventKey="axios" title="Node js (axios)">
              <SyntaxHighlighter language="javascript" style={docco}>
                {stores.FormsStore.createAxiosRequest(
                  stores.FormsStore.getForm(props.formID).url,
                  stores.FormsStore.getForm(props.formID).method,
                  stores.FormsStore.getForm(props.formID).params,
                  stores.FormsStore.getForm(props.formID).headers,
                  stores.FormsStore.getForm(props.formID).body
                )}
              </SyntaxHighlighter>
            </Tab>
            <Tab eventKey="okhttp" title="Java (okhttp)">
              <SyntaxHighlighter language="java" style={docco}>
                {stores.FormsStore.createOKHttpRequest(
                  stores.FormsStore.getForm(props.formID).url,
                  stores.FormsStore.getForm(props.formID).method,
                  stores.FormsStore.getForm(props.formID).params,
                  stores.FormsStore.getForm(props.formID).headers,
                  stores.FormsStore.getForm(props.formID).body
                )}
              </SyntaxHighlighter>
            </Tab>
            <Tab eventKey="urlsession" title="Swift (URLSession)">
              <SyntaxHighlighter language="swift" style={docco}>
                {stores.FormsStore.createURLSessionRequest(
                  stores.FormsStore.getForm(props.formID).url,
                  stores.FormsStore.getForm(props.formID).method,
                  stores.FormsStore.getForm(props.formID).params,
                  stores.FormsStore.getForm(props.formID).headers,
                  stores.FormsStore.getForm(props.formID).body
                )}
              </SyntaxHighlighter>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CodeModal;
