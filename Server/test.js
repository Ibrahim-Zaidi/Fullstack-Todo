const username = "FFFFFm , zaidi ";
console.log(username.split(" "));

const splited = username.split(" ");
const newUsername = splited
  .filter((part) => part !== "")
  .join(" ")
  .toLowerCase();

console.log(newUsername);
