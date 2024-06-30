#! /usr/bin/env node
//---------------------------------imports objects
import inquirer from "inquirer";
import chalk from "chalk";


//------------------------------------main variables
let todolist: string[] = [];
let condition = true;

//-----------------------------intro heading
console.log(chalk.bgBlue("\n\t Welcome to Ahzam Ansari - Todo-List Application"));

//---------------------------- main function to select the option  
let main = async () => {
    while (condition) {
      let option = await inquirer.prompt([
        {
          name: "choice",
          type: "list",
          message: "Select an option:",
          choices: ["Add Task","View Todo-List", "Delete Task", "Update Task", "Exit",],
        },
      ]);
        if(option.choice === "Add Task"){
            await addtask()
        }else if(option.choice === "View Todo-List"){
            await viewtask()
        }else if(option.choice === "Delete Task"){
            await deletetask()
        }else if (option.choice === "Update Task"){
            await updatetask()
        }else if(option.choice === "Exit"){
            condition = false;
        }
    };
};


//--------------------------------First option add task funtion to add the task in todo list
let addtask = async () => {
    let newtask = await inquirer.prompt([
      {
        name: "task",
        type: "input",
        message: "Enter Your New Task",
      },
    ]);
    todolist.push(newtask.task);
    console.log(`\n ${newtask.task} task added succesfully in todo-list`);
  };


//-----------------------------Second option viewtask to see the todo list
let viewtask = () => {
    console.log("\n Your Todo-List: \n");
    todolist.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`)
    })
};


//---------------------------------------Third option delete task to delete the task from todo list
let deletetask = async () => {
    await viewtask()
    let taskindex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index number You want to delete",
        },
    ]);
    let deletedtask = todolist.splice(taskindex.index - 1, 1);
    console.log(`\n ${deletedtask} this task has been deleted successfully from tode list`)
}


//------------------------------------Fourth option to update task in the todo list
let updatetask = async () => {
    await viewtask()
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index number' you want to update",
        },
        {
            name: "new_task",
            type: "input",
            message: "Now Enter new task name: ",
        },
    ]);
    todolist[update_task_index.index -1 ] = update_task_index.new_task
    console.log(`\n Task at index no. ${update_task_index.index - 1} updated successfully [for update check "view todo-list"]`)
}

//-------------------------------Call the function
main();