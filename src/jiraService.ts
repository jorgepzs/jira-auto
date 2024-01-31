import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();
const baseUrlJira = process.env.JIRA_BASE_URL;
const jiraProject = process.env.JIRA_PROJECT;
const jiraEpic = process.env.JIRA_EPIC_KEY;
const jiraUsername = process.env.JIRA_USERNAME;
const jiraPassword = process.env.JIRA_PASSWORD;

export class JiraService {
  async getTask(): Promise<any> {
    try {
      const tasks = await axios.post(
        `${baseUrlJira}/rest/api/2/search`,
        {
          jql: `project=${jiraProject} AND status != 'in progress' & parent = ${jiraEpic}`,
          maxResults: 1,
          fields: ["summary"],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: jiraUsername,
            password: jiraPassword,
          },
        }
      );

      return tasks;
    } catch (error) {
      console.log(`Error: ${error.message}`);

      return error;
    }
  }
  async commentTasks(taskID: number): Promise<any> {
    try {
      const comment = await axios.post(
        `${baseUrlJira}/rest/api/2/issue/${taskID}/comment`,
        {
          body: "Sua Task ainda nao foi iniciada, alteraremos o status dela para in Progress ",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: jiraUsername,
            password: jiraPassword,
          },
        }
      );

      return comment;
    } catch (error) {
      console.log(`Error: ${error.message}`);

      return error;
    }
  }
  async startTasks(taskID: number): Promise<any> {
    try {
      const start = await axios.post(
        `${baseUrlJira}/rest/api/2/issue/${taskID}/transitions`,
        {
          transition: { id: 21 },
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: jiraUsername,
            password: jiraPassword,
          },
        }
      );

      return start.data;
    } catch (error) {
      console.log(`Error: ${error.message}`);

      return error;
    }
  }
}
