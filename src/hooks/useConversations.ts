import { useDatabase } from '@/database/hooks/useDatabase.ts';
import { TABLE_CONVERSATION } from '@/database/schemas';


export ConversationProps:{

}
const useConversations = () => {
  const {create} = useDatabase(TABLE_CONVERSATION)
  const setConversation  = (conversation:)=>{

    create()
  }

}
export default useConversations;