import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

interface uploadResumeParams {
  resume_md: string;
  job_description: string;
}

const uploadResume = async ({
  resume_md,
  job_description,
}: uploadResumeParams): Promise<{ task_id: string; status: string }> => {
  if (!API_URL) return { task_id: "", status: "FAILED" };

  try {
    const response = await axios.post(`${API_URL}/upload_resume/`, {
      resume_md,
      job_description,
    });
    return response.data;
  } catch (err) {
    console.error("Error found when attempting to request resume.", err);
    return { task_id: "", status: "FAILED" };
  }
};

const getTaskStatus = async (
  taskId: string,
): Promise<{ task_id: string; status: string; result: string } | void> => {
  try {
    const response = await axios.get(`${API_URL}/task_status/${taskId}`);
    return response.data;
  } catch (err) {
    console.error(`Error checking status of the task with id ${taskId}`, err);
    throw Error;
  }
};

const pollTask = async (taskId: string, callback: (taskId: string) => void) => {
  if (!API_URL) return;
  let status = "STARTED";
  let attempts = 0;
  const maxAttempts = 30;

  while (status === "STARTED" && attempts < maxAttempts) {
    try {
      const taskStatus = await getTaskStatus(taskId);

      if (!taskStatus) {
        console.log("No task status received, retrying...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        attempts += 1;
        continue;
      }

      status = taskStatus.status;
      if (status === "SUCCESS") {
        break;
      } else if (status === "FAILED") {
        callback("Task failed");
        break;
      }

      attempts += 1;
      console.log("Waiting for task to complete...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      console.error("Error during polling", error);
      callback("Polling error occurred");
      break;
    }
  }

  if (attempts >= maxAttempts) {
    console.error("Max attempts reached. Task did not complete.");
    callback("Task processing timed out");
  }
};

export { uploadResume, pollTask };
