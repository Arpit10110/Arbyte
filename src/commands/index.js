import chalk from "chalk";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { drawBanner } from "../utils/banner.js";
import chalkAnimation from "chalk-animation";
import { greeting_constants, loading_constants } from "../constants/constant.js";
import Conf from 'conf';
import { get_user , get_ai_data, take_ai_input, main_menu, change_ai } from "../controller/controller.js";
import { take_input } from "../utils/take_inputs.js";
import { v4 as uuidv4 } from 'uuid'

const config = new Conf({projectName: 'arbyte'});

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  readFileSync(join(__dirname, "../../package.json"), "utf-8"),
);

export const version = () => {
  console.log(chalk.italic.hex("#22d3ee")(`Arbyte v${pkg.version}`));
};

export const info = async () => {
  drawBanner({
    title: "Arbyte",
    subtitle: "What's up Bitches",
    version: pkg.version,
  });
  console.log("----------------------------------------------------------\n")
  console.log(chalk.italic.hex("#ffffff")("⚡ AI Coding Companion \n"))
  console.log(chalk.italic.hex("#ffffff")("Version     : v0.1.0"))
  console.log(chalk.italic.hex("#ffffff")("Creator     : Arpit Agrahari \n"))
  console.log(chalk.italic.hex("#ffffff")("License     : MIT \n"))
  // some good font like  insted of italic and bold 
  console.log(chalk.italic.hex("#ffffff")("An open-source AI coding assistant for your terminal.\nBuilt for developers who love shipping fast.\n"))
    console.log(chalk.italic.hex("#ffffff")("Features: \n"))
    console.log(chalk.italic.hex("#ffffff")("• AI Chat"))
    console.log(chalk.italic.hex("#ffffff")("• AI Agent"))
    console.log(chalk.italic.hex("#ffffff")("• Read & Write Files"))
    console.log(chalk.italic.hex("#ffffff")("• Multi-LLM Support"))
    console.log(chalk.italic.hex("#ffffff")("• Extensible Tool System \n"))
    console.log(chalk.italic.hex("#ffffff")("Made with ❤️ by Arpit Agrahari \n"))
};



export const  wakeup = async()=>{
    try {
        console.log(" \n ############################################## \n");
        const loading = loading_constants[Math.floor(Math.random() * loading_constants.length)];
        const loadingAnimation = chalkAnimation.neon(loading);
        await new Promise(resolve => setTimeout(resolve, 2000));
        loadingAnimation.stop();
        drawBanner({
            title: "Arbyte",
            subtitle: "What's up Bitches",
            version: pkg.version,
        }); 
        //idhar user name 
        const user =  get_user(config);
        if (user.success){
            const greeting = greeting_constants[Math.floor(Math.random() * greeting_constants.length)];
            console.log(chalk.hex("#ffffff") (`${greeting} ${user.user}`));
        }else{
            const greeting = greeting_constants[Math.floor(Math.random() * greeting_constants.length)];
            console.log(chalk.hex("#ffffff") (`${greeting}`));
        }
        if(user.success==false && user.message=="User not found"){
            const input = await take_input("What should I call you?", "John Doe", "user", config);
            if(input.success){
                console.log(chalk.green(input.message));
            }else{
                console.log(chalk.red(input.message));
            }
        }
        else if (user.success==false && user.message!="User not found"){
            console.log(chalk.red(user.message));
        }
        // idhar ai check karo konsa hai
        const ai = get_ai_data(config);
        if(ai.success==false && ai.message=="AI not found"){
            const ai_input = await take_ai_input(config);
            if(ai_input.success){
                console.log(chalk.green(ai_input.message));
            }else{
                console.log(chalk.red(ai_input.message));
            }
        }
        else if (ai.success==false && ai.message!="AI not found"){
            console.log(chalk.red(ai.message));
        }

        console.log("\n ------------------------------------------------------------ \n")
         console.log(` Selected ${chalk.green(ai.ai.ai_type)} as AI provider and ${chalk.yellow(ai.ai.model)} as model`);
        console.log("\n ------------------------------------------------------------ \n")


        //idhar se hoga main loop 

        while(true){
        let main_menu_result = await main_menu();
        if(main_menu_result.menu=="change_ai"){
            await change_ai(config);
        }
        else if(main_menu_result.menu=="ai_chat"){
            const ai_config = config.get('ai');
            await ai_chat(ai_config);
            // ai_chat(config,main_menu_result);
        }
        else if(main_menu_result.menu=="ai_agent"){
            // ai_agent(config,main_menu_result);
        }
        else if(main_menu_result.menu=="exit"){
            break;
        }
        }
    } catch (error) {
        console.error(chalk.red(error));
    }
}