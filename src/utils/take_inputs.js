import { text } from '@clack/prompts';

export const take_input = async(message , placeholder ,  save_key , config )=>{
    try {
        const input = await text({
            message: message,
            placeholder: placeholder,
          })
          if(input){
            config.set(save_key, input);
            return{
                success: true,
                message: "✔️ saved successfully",
            }
          }else{
            return{
                success: false,
                message: "Input not saved",
            }
          }
    } catch (error) {
        return{
            success: false,
            message: error.message,
        }
    }
}