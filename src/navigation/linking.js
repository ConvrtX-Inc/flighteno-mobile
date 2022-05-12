const config = {
    screens: {
      HomeScreen: {
        path: "HomeScreen",
      },
      
      LatestTransactions: "LatestTransactions",
      Settings: "Settings",
      BottomTab: "BottomTab",
    },
  };
  
  const linking = {
    prefixes: ["flighteno://app"],
    config,
  };
  
  export default linking;