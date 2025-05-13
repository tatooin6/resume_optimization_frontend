import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
const MonacoDiffEditorContainerID = "MonacoDiffEditorContainer";

interface MonacoEditorTypes {
  id?: string;
  language?: string;
  text: string;
  result: string;
  theme?: string;
}

/**
 * MonacoDiffEditor
 *
 * Renders a side-by-side diff editor using Monaco.
 *
 * TODO(antonio pantoja): 
 *   There is a known bug in Vite apps where Monaco cannot locate its web workers,
 *   resulting in console errors like:
 *     • "Uncaught (in promise) Canceled: Canceled"
 *
 *   This is an upstream issue in monaco-editor:
 *   https://github.com/microsoft/monaco-editor/issues/4702
 *   https://github.com/y-scope/yscope-log-viewer/pull/159
 *   https://github.com/microsoft/monaco-editor/issues/4859
 *   https://github.com/cardstack/boxel/commit/7cacc9e15020696b89e07e4badd4f6a124975109
 *
 *   For now we ship with the built-in fallback and ignore these console errors.
 *   Revisit this comment once the upstream fix is published or a proper
 *   worker configuration is possible in Vite.
 */
export const MonacoDiffEditor: React.FC<MonacoEditorTypes> = ({
  id = MonacoDiffEditorContainerID,
  language = "markdown",
  text,
  result,
  theme = "vs-dark",
}) => {
  const divEl = useRef<HTMLDivElement>(null);
  let diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(
    null,
  );

  useEffect(() => {
    if (divEl.current) {
      const originalModel = monaco.editor.createModel(text,language,);
      const modifiedModel = monaco.editor.createModel(result,language,);
      
      diffEditorRef.current = monaco.editor.createDiffEditor(divEl.current, {
        originalEditable: true,
        readOnly: true,
        autoClosingOvertype: "auto",
        wordWrap: "on",
        fontSize: 16,
        minimap: {enabled: false},
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

  // Update right-hand side when `result` changes
  useEffect(() => {
      if (diffEditorRef.current) {
        const modifiedModel = diffEditorRef.current.getModel()?.modified;
        const textToSet = result ?? "default right text";
        if (modifiedModel)
          modifiedModel.setValue(textToSet); // <== Line that introduced bug
      }

  }, [result]);
  
   // Update left-hand side when `text` changes
  useEffect(() => {
    if (diffEditorRef.current) {
      const originalModel = diffEditorRef.current.getModel()?.original;
      const textToSet = text ?? "default left text";
      if (originalModel) {
        originalModel.setValue(textToSet);
      }
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
