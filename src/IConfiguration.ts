export interface IConfigurationSection {
    allowToggleMode: boolean;
    isCamelNavigationOnByDefault: boolean;
  } 
  

  export let DefaultConfigurationSection : IConfigurationSection = {
    allowToggleMode: true,
    isCamelNavigationOnByDefault: true
  }