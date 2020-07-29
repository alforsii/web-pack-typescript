export const formData = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll("input");
  let values: { [prop: string]: string } = {};

  inputs.forEach((input) => {
    values[input.id] = input.value;
  });
  return values;
};

// in JS code above looks something like this...

// export const formData = (form) => {
//   const inputs = form.querySelectorAll("input");
//   let values = {};

//   inputs.forEach((input) => {
//     values[input.id] = input.value;
//   });
//   return values;
// };
