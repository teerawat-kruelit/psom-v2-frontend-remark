import { Phone } from 'lucide-react'

export const LoginFooter = () => {
  return (
    <footer className="flex w-full flex-col items-center bg-gray-600 py-3 text-white">
      <p className="text-2xl">แจ้งปัญหาใช้งาน</p>
      <p className="flex items-center gap-2 text-lg">
        <Phone fill="white" color="white" size={18} /> 065-5162600
      </p>
      <p className="text-lg">@hack_2016</p>
      <p className="text-lg">© สงวนลิขสิทธิ์ 2568 บริษัท โปโลเมคเกอร์ จำกัด</p>
    </footer>
  )
}
