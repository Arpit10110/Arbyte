import { text , select } from '@clack/prompts';
import chalk from "chalk";

export const get_user = (config)=>{
 try {
    const user = config.get('user');
    if(!user){
        return {
            success: false,
            message: "User not found",
        }
    }
        return {
            success: true,
            message: "User found",
            user: user,
        }
 } catch (error) {
    return {
        success: false,
        message: error.message,
    }
 }
}

export const get_ai_data = (config)=>{
    try {
        const ai = config.get('ai');
        if(!ai){
            return {
                success: false,
                message: "AI not found",
            }
        }
        return {
            success: true,
            message: "AI found",
            ai: ai,
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
        }
    }
}


export const take_ai_input = async(config)=>{
     try {
        const ai_type = await select({
            message: 'Choose a AI provider:',
            options: [
              { value: 'OpenRouter', label: 'OpenRouter', },
              { value: 'Gemini', label: 'Gemini' },
            ],
          });
          let model = "";
          if(ai_type=="OpenRouter"){
            model = await select({
                message: 'Choose a model:',
                options: [
                  { value: 'gpt-4o', label: 'gpt-4o' },
                  { value: 'gpt-4o-mini', label: 'gpt-4o-mini' },
                  {value:"gemini-2.5-flash", label: "gemini-2.5-flash"},
                  {value:"gemini-2.5-flash-lite", label: "gemini-2.5-flash-lite"},
                ],
              });
          }
          else if(ai_type=="Gemini"){
            model = await select({
                message: 'Choose a model:',
                options: [
                  { value: 'gemini-2.5-flash', label: 'gemini-2.5-flash' },
                  { value: 'gemini-2.5-flash-lite', label: 'gemini-2.5-flash-lite' },
                ],
              });
          }
          const api_key = await text({
            message: 'Enter your API key:',
            placeholder: 'Enter your API key',
          });
          const ai_data = {
            ai_type: ai_type,
            model: model,
            api_key: api_key,
          }
          config.set('ai', ai_data);
          return {
            success: true,
            message: "✔️ saved successfully",
            ai_data: ai_data,
          }
     } catch (error) {
        return {
            success: false,
            message: error.message,
        }
     }
}

export const main_menu = async()=>{
    try {
        const menu = await select({
            message: 'Choose an option:',
            options: [
              { value: 'chat', label: 'Chat' },
              { value: 'agent', label: 'Agent' },
              {value:"change_ai", label: "Change AI Provider & Model" },
              { value: 'exit', label: 'Exit' },
            ],
          });
          return {
            success: true,
            message: "✔️ selected successfully",
            menu: menu,
          }
    } catch (error) {
        return {
            success: false,
            message: error.message,
        }
    }
}

export const change_ai = async(config)=>{
    config.delete('ai');
    const change_ai_result = await take_ai_input(config);
    if(change_ai_result.success){
        console.log("\n ------------------------------------------------------------ \n")
        console.log(` Selected ${chalk.green(change_ai_result.ai_data.ai_type)} as AI provider and ${chalk.yellow(change_ai_result.ai_data.model)} as model`);
        console.log("\n ----------------------------------------------------------- \n")
    }else{
        console.log(chalk.red(change_ai_result.message));
    }
}


export const ai_chat = async(config)=>{
  try {
    
  } catch (error) {
    console.error(chalk.red(error));
  }
}