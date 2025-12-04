import { Phone } from 'lucide-react'

export const LoginFooter = () => {
    return (
        <footer className="w-full py-3 bg-gray-600 text-white flex flex-col items-center">
            <p className='text-2xl'>แจ้งปัญหาใช้งาน</p>
            <p className='flex items-center gap-2 text-lg'><Phone fill='white' color='white' size={18} /> 065-5162600</p>
            <p className='text-lg'>@hack_2016</p>
            <p className='text-lg'>© สงวนลิขสิทธิ์ 2568 บริษัท โปโลเมคเกอร์ จำกัด</p>
        </footer>
    )
}
