import { formData } from "./form";
import "./styles/style.scss";
import "./styles.css";

const form = document.querySelector("form")!; // ! - means that this form definitely return a value which is not null, else TS gives use error

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = formData(form);
  console.log("data", data);
});
