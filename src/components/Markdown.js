import { useState, useEffect } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

function Markdown(props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const getMarkdownPreview = (tabName) => {
      fetch(
        `http://31.25.91.46/pigeon/media/documents/Gorilla/1.0.0/${tabName}.md`
      )
        .then((res) => res.text())
        .then((respond) => setValue(respond));
    };
    getMarkdownPreview(props.tabName);
  }, []);

  return (
    <>
      <MarkdownPreview source={value} />
    </>
  );
}

export default Markdown;
