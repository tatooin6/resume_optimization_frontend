import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
const MonacoDiffEditorContainerID = "MonacoDiffEditorContainer";

interface MonacoEditorTypes {
  id?: string;
  language?: string;
  text: string;
  theme?: string;
}

export const MonacoDiffEditor: React.FC<MonacoEditorTypes> = ({
  id = MonacoDiffEditorContainerID,
  language = "markdown",
  text,
  theme = "vs-dark",
}) => {
  const divEl = useRef<HTMLDivElement>(null);
  let diffEditor: monaco.editor.IStandaloneDiffEditor;
  useEffect(() => {
    if (divEl.current) {
      const originalModel = monaco.editor.createModel(
        text, // "heLLo world!",
        "markdown",
      );
      const modifiedModel = monaco.editor.createModel(
        "hello Tato!",
        "markdown",
      );
      diffEditor = monaco.editor.createDiffEditor(divEl.current, {
        originalEditable: true, // left panel
        readOnly: true, // right panel
        autoClosingOvertype: "auto",
        wordWrap: "on",
        fontSize: 16,
        theme: "vs-dark",
      });
      diffEditor.setModel({
        original: originalModel,
        modified: modifiedModel,
      });
    }
    return () => {
      diffEditor.dispose();
    };
  }, []);
  return (
    <div
      id={id}
      className="w-full max-w-screen-xl h-[500px] mx-auto dark:bg-background-dark bg-background border dark: border-primary-dark border-primary"
      ref={divEl}
      style={{ height: "600px" }}
    ></div>
  );
};
