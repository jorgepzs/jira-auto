import * as cron from "node-cron";
import { JiraService } from "./jiraService";
const jiraEpic = process.env.JIRA_EPIC_KEY;

export class Main {
  async jiraSchedule() {
    cron.schedule("*/10 * * * * *", async () => {
      try {
        let jiraService = new JiraService();

        // Goal -> Get Task unstarted in JIRA
        let getTask = await jiraService.getTask();
        console.log("\n getTasks::Init \n");

        if (getTask.data.total == 0)
          throw new Error(`\n In the epic ${jiraEpic} there are no unstarted tasks 
        getTasks::End`);

        console.log("Unstarted Task: ", getTask.data.issues[0]);

        console.log("\n getTasks::End");

        // Goal -> Comment Task unstarted in JIRA
        const taskID = getTask.data.issues[0].id;
        let commentTask = await jiraService.commentTasks(taskID);

        console.log("\n CommentTasks::Init");

        console.log(`\n Inserted Comment: ${commentTask.data.body}`);

        console.log("\n CommentTasks::End");

        // Goal -> Comment Task unstarted in JIRA

        let startTask = await jiraService.startTasks(taskID);

        console.log("\n StartTask::Init");

        let taskSummary = getTask.data.issues[0].fields.summary;

        console.log(`\n task ${taskSummary} has been changed to in progess`);

        console.log("\n StartTask::End");
      } catch (error) {
        console.log(`Error: ${error.message}`);

        return error;
      }
    });
  }
}
