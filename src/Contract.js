import web3 from "web3";
import TodoContract from "./contracts/TodoList.json";
export const load = async () => {
  const { Contract, account, Web3 } = await loadWeb3();
  const tasks=await loadTask(Contract,account)
  return { tasks,account,Contract};
};
const loadWeb3 = async () => {
  if (window.ethereum) {
    let account = "";
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        account = accounts[0];
      })
      .catch((err) => {
        console.log(err);
      });
    const Web3 = new web3(window.ethereum);
    const networkId = await Web3.eth.net.getId();
    const Contract = new Web3.eth.Contract(
      TodoContract.abi,
      TodoContract.networks[networkId].address
    );
    return { Contract, account, Web3 };
  } else {
    console.log("Not have wallet!");
  }
};
const loadTask = async (contract, address) => {
  const taskCount=await contract.methods.taskCount(address).call()
  console.log(taskCount);
  const tasks = [];
  for (let i = 0; i < taskCount; i++) {
      tasks.push(await contract.methods.Tasks(address,i).call())
  }
  return tasks
};
