import { useState, useRef } from "react";

import FileUpload from "../atoms/FileUpload";
import FormField, { InputType } from "../molecules/FormField";
import Button, { ButtonType } from "../atoms/Button";
import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";

import { useResumeContext, ActionTypes } from "../../contexts/ResumeContext";
import { uploadResume, pollTask } from "../../services/OptimizationService";

const ResumeUploadSection = () => {
  const { state, dispatch } = useResumeContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const processPdf = async (selectedFile: File | null) => {
    if (!selectedFile) {
      console.error("No file was found.");
      return;
    }
    setIsProcessing(true);
    const fileURL = URL.createObjectURL(selectedFile);

    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";
      const pdf = await pdfjsLib.getDocument(fileURL).promise;
      const pages = pdf.numPages;
      let extractedText = "";

      for (let pageNum = 0; pageNum < pages; pageNum++) {
        const page = await pdf.getPage(pageNum + 1);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;

        if (canvas) {
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const context = canvas.getContext("2d");
          if (context) {
            await page.render({
              canvasContext: context,
              viewport,
            }).promise;
            // OCR process
            const {
              data: { text: pageText },
            } = await Tesseract.recognize(canvas.toDataURL(), "eng", {
              logger: (m) => console.log(m),
            });
            extractedText += pageText;
          }
        }
      }
      dispatch({ type: ActionTypes.SET_MARKDOWN_TEXT, payload: extractedText });
    } catch (error) {
      console.error(`Found error on processing pdf: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpload = async () => {
    setIsOptimizing(true);

    try {
      const response = await uploadResume({
        resume_md: state.markdownText,
        job_description: state.jobDescription,
      });
      if (response && response.task_id) {
        pollTask(response.task_id, (result: string) =>
          dispatch({ type: ActionTypes.SET_OUTPUT_TEXT, payload: result }),
        );
      } else {
        console.log("No response available.");
      }
    } catch (err) {
      console.error("Error trying to upload resume.", err);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="my-4">
        <FileUpload />
      </div>

      <div className="my-4">
        <Button
          action={() => processPdf(state.selectedFile)}
          label="Convert to .md"
          isDisabled={isProcessing || state.selectedFile === null}
          type={ButtonType.Accent}
        />
      </div>
      <div>
        <FormField
          label="Job Description"
          placeholder="Insert Job Description"
          type={InputType.TextArea}
        />
      </div>
      <div className="mt-6">
        <Button
          action={handleUpload}
          label={isOptimizing ? "Optimizing" : "Optimize"}
          isDisabled={
            state.markdownText === "" ||
            state.jobDescription === "" ||
            state.selectedFile === null
          }
          type={ButtonType.Secondary}
        />
      </div>
    </div>
  );
};

export default ResumeUploadSection;
