import dotenv from 'dotenv';

const path = (()=>{
  switch (process.env.NODE_ENV){
    case "test" : return "./.env.test"; 
    case "dev" : return "./.env";
    case "production" : return "";
  }
})();

dotenv.config({path});