// Convierte los objetos de una lista al formato {name,value}
export const objToOptions = (listObj = [], name, value) =>
  (listObj || []).reduce(
    (listOption, obj) =>
      listOption.concat({ name: obj[name], value: obj[value] }),
    []
  );

// For http request

// URL Query to Object
export const queryToObj = (query) =>
  query
    .replace("?", "")
    .split("&")
    .reduce((response, parameter) => {
      const [name, value] = parameter.split("=");
      return { ...response, [name]: value };
    }, {});

// Object to URL Query
export const objToQuery = (obj) =>
  "?" +
  Object.keys(obj || {})
    .map((key) =>
      obj[key] !== undefined && obj[key] !== null && obj[key] !== false
        ? `${key}=${obj[key]}`
        : ""
    )
    .filter((x) => x)
    .join("&");

// Search Object with "Active" props to Object
export const searchPropToObj = (searchProp) => {
  const newSerch = {};
  Object.keys(searchProp)
    .filter((prop) => 1 + prop.indexOf("Active") && searchProp[prop])
    .forEach((prop) => {
      const valueProp = prop.replace("Active", "");
      if (searchProp[valueProp] !== -1)
        newSerch[valueProp] = searchProp[valueProp];
    });
  return newSerch;
};
