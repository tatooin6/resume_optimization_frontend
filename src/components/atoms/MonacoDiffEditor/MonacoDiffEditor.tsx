import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
const MonacoDiffEditorContainerID = "MonacoDiffEditorContainer";

interface MonacoEditorTypes {
  id?: string;
  language?: string;
  // onKeyDown?: Function;
  // onKeyUp?: Function;
  saveText?: Function;
  tabSize?: number;
  text: string;
  result: string;
  theme?: string;
}

export const MonacoDiffEditor: React.FC<MonacoEditorTypes> = ({
  id = MonacoDiffEditorContainerID,
  language = "markdown",
  saveText,
  tabSize = 4,
  text,
  result,
  theme = "vs-dark",
}) => {
  const divEl = useRef<HTMLDivElement>(null);
  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(
    null,
  );

  useEffect(() => {
    if (divEl.current) {
      const originalModel = monaco.editor.createModel(text, language);
      const modifiedModel = monaco.editor.createModel(result, language);
      diffEditorRef.current = monaco.editor.createDiffEditor(divEl.current, {
        originalEditable: true, // left panel
        readOnly: true, // right panel
        autoClosingOvertype: "auto",
        wordWrap: "on",
        fontSize: 16,
        lineHeight: 24,
        minimap: {
          enabled: false,
        },
        theme,
      });

      diffEditorRef.current.setModel({
        original: originalModel,
        modified: modifiedModel,
      });
    }
    return () => {
      diffEditorRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (diffEditorRef.current) {
      const modifiedModel = diffEditorRef.current.getModel()?.modified;
      console.log(result ? result : "default");
      if (modifiedModel)
        modifiedModel.setValue(result ? result : "default right text");
    }
  }, [result]);

  useEffect(() => {
    if (diffEditorRef.current) {
      const originalModel = diffEditorRef.current.getModel()?.original;
      if (originalModel)
        originalModel.setValue(text ? text : "default left text");
    }
  }, [text]);

  return (
    <div
      id={id}
      className="w-full max-w-screen-xl h-[500px] mx-auto dark:bg-background-dark bg-background border dark: border-primary-dark border-primary"
      ref={divEl}
      style={{ height: "600px" }}
    ></div>
  );
};
