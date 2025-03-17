import { useState, useEffect, useRef } from "react";
import { ThemeSwitcher } from "../components/atoms/ThemeSwitcher";
import FileUpload from "../components/atoms/FileUpload";
import FormField, { InputType } from "../components/molecules/FormField";
import Button, { ButtonType } from "../components/atoms/Button";
import Label from "../components/atoms/Label";
import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";

const Home = () => {
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const processPdf = async () => {
    setIsProcessing(true);
    const pdfPath = "../../public/resume_eng.pdf";

    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";
      const pdf = await pdfjsLib.getDocument(pdfPath).promise;
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
      setOutput(extractedText);
    } catch (error) {
      console.error(`Found error on processing pdf: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="flex flex-row justify-between">
        <h1 className="flex flex-row text-3xl font-sans font-thin text-text dark:text-secondary">
          <img src="logo.svg" className="pr-3" alt="logo" />
          Resume Optimizer
        </h1>
        <ThemeSwitcher />
      </div>

      <div className="flex md:flex-row flex-col h-dvh flex-1 items-center justify-between">
        <div className="flex flex-col justify-center items-start h-fit my-8 p-6 md:w-1/3 md-full bg-gray-400 dark:bg-primary-dark rounded-lg">
          <div className="my-4">
            <FileUpload />
          </div>

          <div className="my-4">
            <Button
              action={() => alert("Secondary")}
              label="Convert to .md"
              isDisabled={false}
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
              action={() => processPdf()}
              label="Optimize"
              isDisabled={isProcessing}
              type={ButtonType.Secondary}
            />
            <Label text={isProcessing ? "Processing..." : "Start OCR"} />
          </div>
        </div>

        <div className="bg-accent md:w-2/3 w-full flex-grow flex items-center justify-center h-full">
          <span>{output}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
