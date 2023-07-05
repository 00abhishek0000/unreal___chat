import Avatar from '@/app/components/Avatar'
import userOtherUser from '@/app/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import ProfileDrawer from './ProfileDrawer'
import AvatarGroup from '@/app/components/AvatarGroup'
import useActiveList from '@/app/hooks/useActiveList'

interface HeaderProps {
  conversation: Conversation & {
    users : User[] 
  }
}

const Header: React.FC<HeaderProps> = ({conversation}) => {
    const {members} = useActiveList();
    const otherUser = userOtherUser(conversation);
    const [drawerOpen,setDrawerOpen] = useState(false);

    const isActive = members.indexOf(otherUser.email!)!==-1


    const statusText = useMemo(()=>{
        if(conversation.isGroup){
            return `${conversation.users.length} members`;
        }

        return isActive ? 'Active' : 'Offline';
    },[conversation,isActive])
  return(
        <>
        <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={()=>setDrawerOpen(false)}/>
        <div className='bg-white w-full flex border-b-[1px] py-3 px-4 sm:px-4 items-center justify-between shodow-sm'>
            <div className='flex gap-3 items-center'>
                    <Link className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer" href="/conversations">
                    <HiChevronLeft size={32}/>
                    </Link>

                    {conversation.isGroup ? <AvatarGroup users={conversation.users}/> : <Avatar user={otherUser} />}

                    
                    <div className='flex flex-col '>
                        <div>
                            {conversation.name || otherUser.name}
                        </div>
                        <div className='text-sm font-light text-neutral-500'>
                            {statusText}
                        </div>
                    </div>
            </div>
            <HiEllipsisHorizontal size={32} onClick={()=>setDrawerOpen(true)} className='text-sky-500 cursor-pointer hover:text-sky-600 transition'/>
        </div>
        </>
        
  )
}

export default Header