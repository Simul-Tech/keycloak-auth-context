const Logger: (enabled: boolean) => Console = (enabled = false) => {
    if (enabled) return console;

  };
  
  export default Logger;
  