// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract TodoList{
    struct Task{
        uint id;
        string name;
        bool completed;
    }
    event taskCreated(
        uint id,
        string name,
        bool completed
    );
    event taskCompleted(
        uint id,
        bool completed
    );
    mapping(address=>mapping(uint =>Task)) public Tasks;
    mapping(address=>uint) public taskCount;

    constructor(){
        createTask("hello world");
    }
    function createTask(string memory _name) public{
        uint task_number=taskCount[msg.sender];
        Tasks[msg.sender][task_number]=Task(task_number,_name,false);
        emit taskCreated(task_number, _name, false);
        taskCount[msg.sender]++;
    }
    function changeTaskStatus(uint _id) public{
        Task memory task=Tasks[msg.sender][_id];
        task.completed=true;
        Tasks[msg.sender][_id]=task;
        emit taskCompleted(_id, true);
    }
}